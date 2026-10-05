-- Storage buckets for case photos and doctor voice notes. Both private —
-- access goes through RLS on storage.objects, keyed by the case_id folder prefix.
-- Path convention: {case_id}/{filename}

insert into storage.buckets (id, name, public)
values
  ('case-photos', 'case-photos', false),
  ('doctor-audio', 'doctor-audio', false)
on conflict (id) do nothing;

create policy case_photos_storage_select on storage.objects
  for select using (
    bucket_id = 'case-photos'
    and exists (
      select 1 from cases c
      where c.id::text = (storage.foldername(name))[1]
        and (c.patient_id = auth.uid() or is_doctor())
    )
  );

create policy case_photos_storage_insert on storage.objects
  for insert with check (
    bucket_id = 'case-photos'
    and exists (
      select 1 from cases c
      where c.id::text = (storage.foldername(name))[1]
        and c.patient_id = auth.uid()
    )
  );

create policy doctor_audio_storage_select on storage.objects
  for select using (
    bucket_id = 'doctor-audio'
    and exists (
      select 1 from cases c
      where c.id::text = (storage.foldername(name))[1]
        and (c.patient_id = auth.uid() or is_doctor())
    )
  );

create policy doctor_audio_storage_insert on storage.objects
  for insert with check (
    bucket_id = 'doctor-audio'
    and is_doctor()
    and exists (
      select 1 from cases c
      where c.id::text = (storage.foldername(name))[1]
    )
  );
