import { notFound } from "next/navigation";
import { requireDoctor } from "@/lib/require-doctor";
import { CaseReview } from "@/components/case-review";
import { PHOTO_TYPES, type CasePhoto } from "@/lib/types";

export default async function DoctorCasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: caseId } = await params;
  const { supabase } = await requireDoctor();

  const { data: caseRow } = await supabase
    .from("cases")
    .select("*, family_members(full_name)")
    .eq("id", caseId)
    .maybeSingle();

  if (!caseRow) {
    notFound();
  }

  const { data: photos } = await supabase
    .from("case_photos")
    .select("*")
    .eq("case_id", caseId);

  const photosWithUrls = await Promise.all(
    (photos ?? []).map(async (photo: CasePhoto) => {
      const { data: signed } = await supabase.storage
        .from("case-photos")
        .createSignedUrl(photo.storage_path, 60 * 10);
      return { ...photo, url: signed?.signedUrl ?? null };
    }),
  );

  const orderedPhotos = PHOTO_TYPES.map(
    (pt) => photosWithUrls.find((p) => p.photo_type === pt.type) ?? null,
  );

  const { data: existingNote } = await supabase
    .from("doctor_notes")
    .select("*")
    .eq("case_id", caseId)
    .order("created_at", { ascending: false })
    .maybeSingle();

  return (
    <CaseReview
      caseId={caseId}
      familyMemberName={caseRow.family_members?.full_name ?? "Unknown patient"}
      photos={orderedPhotos}
      existingNote={existingNote ?? null}
    />
  );
}
