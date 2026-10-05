"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Card, CardDescription, CardTitle } from "@redcity/ui";
import { createClient } from "@/lib/supabase/client";
import { gtagEvent } from "@/lib/gtag";
import { PHOTO_TYPES, type PhotoType } from "@/lib/types";

type Step = "consent" | number | "done";

export function NewCaseWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const memberId = searchParams.get("member");
  const supabase = createClient();

  const [memberName, setMemberName] = useState<string | null>(null);
  const [consented, setConsented] = useState(false);
  const [caseId, setCaseId] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("consent");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!memberId) return;
    supabase
      .from("family_members")
      .select("full_name")
      .eq("id", memberId)
      .single()
      .then(({ data }) => setMemberName(data?.full_name ?? null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberId]);

  if (!memberId) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <Card variant="light" className="max-w-sm text-center">
          <CardTitle>No family member selected</CardTitle>
          <CardDescription>
            Go back and choose who this case is for.
          </CardDescription>
          <Button className="mt-4" onClick={() => router.push("/")}>
            Back to dashboard
          </Button>
        </Card>
      </main>
    );
  }

  async function startCase() {
    setError(null);
    setBusy(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setBusy(false);
      setError("Your session expired. Please sign in again.");
      return;
    }

    const { data, error } = await supabase
      .from("cases")
      .insert({
        patient_id: user.id,
        family_member_id: memberId,
        consent_given_at: new Date().toISOString(),
        consent_version: "v1",
      })
      .select()
      .single();

    setBusy(false);

    if (error) {
      setError(error.message);
      return;
    }

    gtagEvent({ action: "consent_given", params: { case_id: data.id } });
    setCaseId(data.id);
    setStep(0);
  }

  async function uploadPhoto(file: File, photoType: PhotoType) {
    if (!caseId) return;
    setError(null);
    setBusy(true);

    const ext = file.type.split("/")[1] || "jpg";
    const path = `${caseId}/${photoType}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("case-photos")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      setBusy(false);
      setError(uploadError.message);
      return;
    }

    const { error: insertError } = await supabase.from("case_photos").upsert(
      { case_id: caseId, photo_type: photoType, storage_path: path },
      { onConflict: "case_id,photo_type" },
    );

    setBusy(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    const isLastPhoto = typeof step === "number" && step >= PHOTO_TYPES.length - 1;
    if (isLastPhoto) {
      gtagEvent({ action: "case_submitted", params: { case_id: caseId } });
    }
    setStep((s) => (typeof s === "number" && s < PHOTO_TYPES.length - 1 ? s + 1 : "done"));
  }

  if (step === "consent") {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 bg-brand-band">
        <Card variant="light" className="max-w-md">
          <CardTitle>Consent to share photos</CardTitle>
          <CardDescription>
            For {memberName ?? "this family member"}
          </CardDescription>
          <p className="font-body text-sm mt-4">
            By continuing, you consent to RedCity Dental Care collecting and
            securely storing these photos so Dr. Sahu can personally review
            them. Dr. Sahu will personally review your photos and send you a
            voice message — this is not an automated diagnosis. You can
            request deletion of your data at any time.
          </p>
          <label className="font-body text-sm mt-4 flex items-start gap-2">
            <input
              type="checkbox"
              checked={consented}
              onChange={(e) => setConsented(e.target.checked)}
              className="mt-1"
            />
            I have read and agree to the above.
          </label>
          {error ? (
            <p className="font-body text-sm text-brand-red mt-2">{error}</p>
          ) : null}
          <Button
            className="mt-6"
            disabled={!consented || busy}
            onClick={startCase}
          >
            {busy ? "Starting…" : "Continue"}
          </Button>
        </Card>
      </main>
    );
  }

  if (step === "done") {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 bg-brand-band">
        <Card variant="light" className="max-w-md text-center">
          <CardTitle>Case submitted</CardTitle>
          <CardDescription>
            Dr. Sahu will personally review your photos and send you a voice
            message on WhatsApp — this is not an automated diagnosis.
          </CardDescription>
          <Button className="mt-6" onClick={() => router.push("/")}>
            Back to dashboard
          </Button>
        </Card>
      </main>
    );
  }

  const current = PHOTO_TYPES[step];

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-brand-band">
      <Card variant="light" className="max-w-md">
        <p className="font-body text-xs uppercase tracking-widest text-brand-gold">
          Photo {step + 1} of {PHOTO_TYPES.length}
        </p>
        <CardTitle className="mt-1">{current.label}</CardTitle>
        <CardDescription>{current.helpText}</CardDescription>
        <input
          key={current.type}
          type="file"
          accept="image/*"
          capture="environment"
          className="mt-4 font-body text-sm"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) uploadPhoto(file, current.type);
          }}
        />
        {error ? (
          <p className="font-body text-sm text-brand-red mt-2">{error}</p>
        ) : null}
        {busy ? (
          <p className="font-body text-sm opacity-60 mt-2">Uploading…</p>
        ) : null}
      </Card>
    </main>
  );
}
