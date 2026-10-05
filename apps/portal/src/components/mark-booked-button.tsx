"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@redcity/ui";
import { createClient } from "@/lib/supabase/client";
import { gtagEvent } from "@/lib/gtag";

export function MarkBookedButton({ caseId }: { caseId: string }) {
  const router = useRouter();
  const supabase = createClient();
  const [saving, setSaving] = useState(false);

  async function markBooked() {
    setSaving(true);
    await supabase.from("cases").update({ status: "booked" }).eq("id", caseId);
    gtagEvent({ action: "case_booked", params: { case_id: caseId } });
    setSaving(false);
    router.refresh();
  }

  return (
    <Button size="sm" variant="outline" onClick={markBooked} disabled={saving}>
      {saving ? "Saving…" : "Mark as booked"}
    </Button>
  );
}
