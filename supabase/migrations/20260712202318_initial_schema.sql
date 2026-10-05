-- RedCity Dental Care — initial schema
-- Roles: patient (default, self-serve via phone OTP) and doctor (manually provisioned).
-- Compliance: `case_triage` holds internal AI vision output (possible_flags, priority) as a
-- doctor-only sort key. It has no patient RLS policy at all — patients get zero rows, by
-- default-deny, not by application-layer filtering. Never expose this table to patient-facing code.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------

create type case_status as enum ('queued', 'reviewed', 'sent', 'booked');
create type photo_type as enum ('upper_arch', 'lower_arch', 'front_bite');

-- ---------------------------------------------------------------------------
-- Roles
-- ---------------------------------------------------------------------------

-- Every phone-OTP signup becomes a patient by default (public self-serve path).
create table patients (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz not null default now()
);

-- Doctor accounts are provisioned manually (one-time insert by the founder), never via
-- public signup. There is no staff/admin tier — only patient and doctor.
create table doctors (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  created_at timestamptz not null default now()
);

create function is_doctor()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (select 1 from doctors d where d.id = auth.uid());
$$;

-- Auto-create a patients row for every new auth user. Doctor promotion is a manual
-- insert into `doctors` afterwards — this trigger only ever creates patients.
create function handle_new_patient_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.patients (id, phone)
  values (new.id, new.phone)
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_patient_user();

-- ---------------------------------------------------------------------------
-- Family members
-- ---------------------------------------------------------------------------

create table family_members (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references patients (id) on delete cascade,
  full_name text not null,
  relationship text not null default 'self',
  date_of_birth date,
  created_at timestamptz not null default now()
);

create index family_members_patient_id_idx on family_members (patient_id);

-- ---------------------------------------------------------------------------
-- Cases
-- ---------------------------------------------------------------------------

-- consent_given_at is NOT NULL by design: a case cannot exist without a recorded DPDP
-- consent timestamp. Build the consent gate before the upload UI, not after.
create table cases (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references patients (id) on delete cascade,
  family_member_id uuid not null references family_members (id) on delete cascade,
  status case_status not null default 'queued',
  consent_given_at timestamptz not null,
  consent_version text not null default 'v1',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index cases_patient_id_idx on cases (patient_id);
create index cases_family_member_id_idx on cases (family_member_id);
create index cases_status_idx on cases (status);

-- ---------------------------------------------------------------------------
-- Case photos
-- ---------------------------------------------------------------------------

create table case_photos (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases (id) on delete cascade,
  photo_type photo_type not null,
  storage_path text not null,
  created_at timestamptz not null default now(),
  unique (case_id, photo_type)
);

create index case_photos_case_id_idx on case_photos (case_id);

-- ---------------------------------------------------------------------------
-- Case triage (INTERNAL ONLY — doctor queue sort key, never patient-facing)
-- ---------------------------------------------------------------------------

create table case_triage (
  case_id uuid primary key references cases (id) on delete cascade,
  possible_flags jsonb not null default '[]'::jsonb,
  priority integer not null default 0,
  model text not null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Doctor notes
-- ---------------------------------------------------------------------------

create table doctor_notes (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases (id) on delete cascade,
  audio_url text,
  transcript text,
  created_by uuid not null references doctors (id),
  created_at timestamptz not null default now()
);

create index doctor_notes_case_id_idx on doctor_notes (case_id);

-- ---------------------------------------------------------------------------
-- WhatsApp log
-- ---------------------------------------------------------------------------

create table whatsapp_log (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases (id) on delete cascade,
  message_type text not null,
  status text not null default 'queued',
  provider_message_id text,
  sent_at timestamptz,
  created_at timestamptz not null default now()
);

create index whatsapp_log_case_id_idx on whatsapp_log (case_id);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table patients enable row level security;
alter table doctors enable row level security;
alter table family_members enable row level security;
alter table cases enable row level security;
alter table case_photos enable row level security;
alter table case_triage enable row level security;
alter table doctor_notes enable row level security;
alter table whatsapp_log enable row level security;

-- patients: a patient sees/edits only their own row; doctor sees all.
create policy patients_select_own on patients
  for select using (id = auth.uid() or is_doctor());
create policy patients_update_own on patients
  for update using (id = auth.uid());

-- doctors: doctor can read the doctor roster; no patient access.
create policy doctors_select_doctor_only on doctors
  for select using (is_doctor());

-- family_members: owner patient or doctor.
create policy family_members_select on family_members
  for select using (patient_id = auth.uid() or is_doctor());
create policy family_members_insert on family_members
  for insert with check (patient_id = auth.uid());
create policy family_members_update on family_members
  for update using (patient_id = auth.uid());
create policy family_members_delete on family_members
  for delete using (patient_id = auth.uid());

-- cases: owner patient (read + create their own) or doctor (read + update status).
create policy cases_select on cases
  for select using (patient_id = auth.uid() or is_doctor());
create policy cases_insert on cases
  for insert with check (patient_id = auth.uid() and consent_given_at is not null);
create policy cases_update_doctor on cases
  for update using (is_doctor());

-- case_photos: visible to the owning patient and doctor; insert restricted to the case owner.
create policy case_photos_select on case_photos
  for select using (
    exists (
      select 1 from cases c
      where c.id = case_photos.case_id
        and (c.patient_id = auth.uid() or is_doctor())
    )
  );
create policy case_photos_insert on case_photos
  for insert with check (
    exists (
      select 1 from cases c
      where c.id = case_photos.case_id and c.patient_id = auth.uid()
    )
  );

-- case_triage: DOCTOR ONLY. No patient policy exists — default-deny applies to patients.
create policy case_triage_doctor_only on case_triage
  for all using (is_doctor()) with check (is_doctor());

-- doctor_notes: patient can read their own case's notes; only doctors can write.
create policy doctor_notes_select on doctor_notes
  for select using (
    exists (
      select 1 from cases c
      where c.id = doctor_notes.case_id
        and (c.patient_id = auth.uid() or is_doctor())
    )
  );
create policy doctor_notes_write_doctor_only on doctor_notes
  for insert with check (is_doctor());
create policy doctor_notes_update_doctor_only on doctor_notes
  for update using (is_doctor());

-- whatsapp_log: doctor/service-role visibility only — operational log, not patient UI.
create policy whatsapp_log_doctor_only on whatsapp_log
  for select using (is_doctor());
