export type CaseStatus = "queued" | "reviewed" | "sent" | "booked";
export type PhotoType = "upper_arch" | "lower_arch" | "front_bite";

export interface FamilyMember {
  id: string;
  patient_id: string;
  full_name: string;
  relationship: string;
  date_of_birth: string | null;
  created_at: string;
}

export interface CaseRow {
  id: string;
  patient_id: string;
  family_member_id: string;
  status: CaseStatus;
  consent_given_at: string;
  created_at: string;
  family_members?: { full_name: string } | null;
  case_triage?: { priority: number; possible_flags: string[] }[] | null;
}

export interface CasePhoto {
  id: string;
  case_id: string;
  photo_type: PhotoType;
  storage_path: string;
}

export interface DoctorNote {
  id: string;
  case_id: string;
  audio_url: string | null;
  transcript: string | null;
  created_at: string;
}

export const PHOTO_TYPES: { type: PhotoType; label: string; helpText: string }[] = [
  {
    type: "upper_arch",
    label: "Upper arch",
    helpText: "Bite down gently and photograph your upper teeth from below.",
  },
  {
    type: "lower_arch",
    label: "Lower arch",
    helpText: "Bite down gently and photograph your lower teeth from above.",
  },
  {
    type: "front_bite",
    label: "Front bite",
    helpText: "Bite down normally and photograph straight-on with lips relaxed.",
  },
];
