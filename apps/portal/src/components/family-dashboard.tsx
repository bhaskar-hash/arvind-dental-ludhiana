"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge, Button, Card, CardDescription, CardTitle } from "@redcity/ui";
import { createClient } from "@/lib/supabase/client";
import { gtagEvent } from "@/lib/gtag";
import type { CaseRow, CaseStatus, FamilyMember } from "@/lib/types";

const STATUS_LABEL: Record<CaseStatus, string> = {
  queued: "Waiting for review",
  reviewed: "Reviewed by Dr. Sahu",
  sent: "Voice message sent",
  booked: "Appointment booked",
};

export function FamilyDashboard({
  familyMembers,
  cases,
}: {
  familyMembers: FamilyMember[];
  cases: CaseRow[];
}) {
  const router = useRouter();
  const supabase = createClient();

  const [selectedId, setSelectedId] = useState<string | null>(
    familyMembers[0]?.id ?? null,
  );
  const [showAddForm, setShowAddForm] = useState(familyMembers.length === 0);
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("self");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const casesForSelected = useMemo(
    () => cases.filter((c) => c.family_member_id === selectedId),
    [cases, selectedId],
  );

  async function addFamilyMember(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setSaving(false);
      setError("Your session expired. Please sign in again.");
      return;
    }

    const { data, error } = await supabase
      .from("family_members")
      .insert({ patient_id: user.id, full_name: name, relationship })
      .select()
      .single();

    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }

    setName("");
    setShowAddForm(false);
    setSelectedId(data.id);
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-white px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-headline text-2xl font-bold text-brand-black">
          RedCity Dental Care
        </h1>
        <p className="font-body text-sm opacity-70 mt-1">
          Manage your family&apos;s cases and photo intake.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {familyMembers.map((member) => (
            <button
              key={member.id}
              onClick={() => setSelectedId(member.id)}
              className={`rounded-full px-4 py-2 font-body text-sm font-medium transition-colors ${
                selectedId === member.id
                  ? "bg-brand-red text-white"
                  : "bg-black/5 text-brand-black hover:bg-black/10"
              }`}
            >
              {member.full_name}
            </button>
          ))}
          <button
            onClick={() => setShowAddForm((v) => !v)}
            className="rounded-full px-4 py-2 font-body text-sm font-medium border border-dashed border-black/20 text-brand-black/70 hover:bg-black/5"
          >
            + Add family member
          </button>
        </div>

        {showAddForm ? (
          <Card variant="light" className="mt-4">
            <form onSubmit={addFamilyMember} className="flex flex-col gap-4">
              <label className="font-body text-sm">
                Full name
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 font-body text-base"
                  placeholder="e.g. Priya Sahu"
                />
              </label>
              <label className="font-body text-sm">
                Relationship to you
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 font-body text-base"
                >
                  <option value="self">Self</option>
                  <option value="spouse">Spouse</option>
                  <option value="child">Child</option>
                  <option value="parent">Parent</option>
                  <option value="other">Other</option>
                </select>
              </label>
              {error ? (
                <p className="font-body text-sm text-brand-red">{error}</p>
              ) : null}
              <Button type="submit" disabled={saving}>
                {saving ? "Saving…" : "Add family member"}
              </Button>
            </form>
          </Card>
        ) : null}

        {selectedId ? (
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="font-headline text-lg font-bold">Cases</h2>
              <Button
                size="sm"
                onClick={() => {
                  gtagEvent({ action: "start_photo_intake" });
                  router.push(`/cases/new?member=${selectedId}`);
                }}
              >
                Start new case
              </Button>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              {casesForSelected.length === 0 ? (
                <Card variant="light">
                  <CardTitle>No cases yet</CardTitle>
                  <CardDescription>
                    Start a new case to send Dr. Sahu photos for personal
                    review.
                  </CardDescription>
                </Card>
              ) : (
                casesForSelected.map((c) => (
                  <Card
                    key={c.id}
                    variant="light"
                    className="flex items-center justify-between"
                  >
                    <span className="font-body text-sm">
                      {new Date(c.created_at).toLocaleDateString()}
                    </span>
                    <Badge variant={c.status === "queued" ? "gold" : "red"}>
                      {STATUS_LABEL[c.status]}
                    </Badge>
                  </Card>
                ))
              )}
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
