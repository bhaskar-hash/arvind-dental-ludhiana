"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge, Button, Card, CardDescription, CardTitle } from "@redcity/ui";
import { createClient } from "@/lib/supabase/client";
import { PHOTO_TYPES, type CasePhoto, type DoctorNote } from "@/lib/types";

type PhotoWithUrl = (CasePhoto & { url: string | null }) | null;

const MAX_RECORDING_MS = 30_000;

export function CaseReview({
  caseId,
  familyMemberName,
  photos,
  existingNote,
}: {
  caseId: string;
  familyMemberName: string;
  photos: PhotoWithUrl[];
  existingNote: DoctorNote | null;
}) {
  const router = useRouter();
  const supabase = createClient();

  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(!!existingNote);
  const [transcript, setTranscript] = useState<string | null>(
    existingNote?.transcript ?? null,
  );

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const stopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function startRecording() {
    setError(null);
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setError("Couldn't access your microphone. Check your browser's permission settings and try again.");
      return;
    }
    const recorder = new MediaRecorder(stream);
    chunksRef.current = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      setAudioBlob(blob);
      setAudioPreviewUrl(URL.createObjectURL(blob));
      stream.getTracks().forEach((t) => t.stop());
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
    setRecording(true);

    stopTimerRef.current = setTimeout(() => {
      if (recorder.state === "recording") recorder.stop();
      setRecording(false);
    }, MAX_RECORDING_MS);
  }

  function stopRecording() {
    if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
    mediaRecorderRef.current?.stop();
    setRecording(false);
  }

  async function saveNote() {
    if (!audioBlob) return;
    setSaving(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setSaving(false);
      setError("Your session expired. Please sign in again.");
      return;
    }

    const storagePath = `${caseId}/note-${Date.now()}.webm`;

    const { error: uploadError } = await supabase.storage
      .from("doctor-audio")
      .upload(storagePath, audioBlob, { contentType: "audio/webm" });

    if (uploadError) {
      setSaving(false);
      setError(uploadError.message);
      return;
    }

    const { data: signed } = await supabase.storage
      .from("doctor-audio")
      .createSignedUrl(storagePath, 60 * 60 * 24 * 7);

    let noteTranscript: string | null = null;
    try {
      const res = await fetch("/api/transcribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storage_path: storagePath }),
      });
      if (res.ok) {
        const data = await res.json();
        noteTranscript = data.transcript ?? null;
      }
    } catch {
      // Transcription is best-effort here; the doctor's audio note is what
      // actually gets sent to the patient, so a transcription hiccup
      // shouldn't block completing the review.
    }

    const { error: insertError } = await supabase.from("doctor_notes").insert({
      case_id: caseId,
      audio_url: signed?.signedUrl ?? storagePath,
      transcript: noteTranscript,
      created_by: user.id,
    });

    if (insertError) {
      setSaving(false);
      setError(insertError.message);
      return;
    }

    await supabase.from("cases").update({ status: "reviewed" }).eq("id", caseId);

    setTranscript(noteTranscript);
    setSaving(false);
    setSaved(true);
  }

  return (
    <main className="min-h-screen bg-white px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-headline text-2xl font-bold text-brand-black">
          {familyMemberName}
        </h1>
        <p className="font-body text-sm opacity-70 mt-1">Case {caseId}</p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {PHOTO_TYPES.map((pt, i) => {
            const photo = photos[i];
            return (
              <div key={pt.type} className="flex flex-col gap-1">
                {photo?.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photo.url}
                    alt={pt.label}
                    className="aspect-square w-full rounded-md object-cover border border-black/10"
                  />
                ) : (
                  <div className="aspect-square w-full rounded-md bg-black/5 flex items-center justify-center font-body text-xs opacity-50">
                    Missing
                  </div>
                )}
                <span className="font-body text-xs text-center opacity-70">
                  {pt.label}
                </span>
              </div>
            );
          })}
        </div>

        <Card variant="light" className="mt-6">
          <CardTitle>Voice note</CardTitle>
          <CardDescription>
            Up to 30 seconds. This is what gets sent to the patient on
            WhatsApp.
          </CardDescription>

          {saved ? (
            <div className="mt-4">
              <Badge variant="gold">Saved</Badge>
              {transcript ? (
                <p className="font-body text-sm mt-3 opacity-80">
                  Transcript: {transcript}
                </p>
              ) : (
                <p className="font-body text-sm mt-3 opacity-50">
                  Transcript unavailable.
                </p>
              )}
            </div>
          ) : (
            <div className="mt-4 flex flex-col gap-3">
              {!recording && !audioBlob ? (
                <Button onClick={startRecording}>Start recording</Button>
              ) : null}
              {recording ? (
                <Button variant="outline" onClick={stopRecording}>
                  Stop recording
                </Button>
              ) : null}
              {audioPreviewUrl ? (
                <audio controls src={audioPreviewUrl} className="w-full" />
              ) : null}
              {error ? (
                <p className="font-body text-sm text-brand-red">{error}</p>
              ) : null}
              {audioBlob && !recording ? (
                <Button onClick={saveNote} disabled={saving}>
                  {saving ? "Saving…" : "Save note & mark reviewed"}
                </Button>
              ) : null}
            </div>
          )}
        </Card>

        <Button
          variant="outline"
          className="mt-6"
          onClick={() => router.push("/doctor")}
        >
          Back to queue
        </Button>
      </div>
    </main>
  );
}
