import Link from "next/link";
import { Badge, Card, CardDescription, CardTitle } from "@redcity/ui";
import { requireDoctor } from "@/lib/require-doctor";
import { MarkBookedButton } from "@/components/mark-booked-button";
import type { CaseRow } from "@/lib/types";

export default async function DoctorQueuePage() {
  const { supabase, doctor } = await requireDoctor();

  const [{ data: cases }, { data: awaitingBooking }] = await Promise.all([
    supabase
      .from("cases")
      .select("*, family_members(full_name), case_triage(priority, possible_flags)")
      .eq("status", "queued")
      .order("created_at", { ascending: true }),
    supabase
      .from("cases")
      .select("*, family_members(full_name)")
      .eq("status", "sent")
      .order("created_at", { ascending: true }),
  ]);

  const sorted = [...(cases ?? [])].sort((a: CaseRow, b: CaseRow) => {
    const pa = a.case_triage?.[0]?.priority ?? -1;
    const pb = b.case_triage?.[0]?.priority ?? -1;
    return pb - pa;
  });

  return (
    <main className="min-h-screen bg-white px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-headline text-2xl font-bold text-brand-black">
          Review queue
        </h1>
        <p className="font-body text-sm opacity-70 mt-1">
          Signed in as {doctor.full_name}
        </p>

        <div className="mt-8 flex flex-col gap-3">
          {sorted.length === 0 ? (
            <Card variant="light">
              <CardTitle>Nothing to review</CardTitle>
              <CardDescription>New cases will appear here.</CardDescription>
            </Card>
          ) : (
            sorted.map((c: CaseRow) => {
              const triage = c.case_triage?.[0];
              return (
                <Link key={c.id} href={`/doctor/cases/${c.id}`}>
                  <Card
                    variant="light"
                    className="flex items-center justify-between hover:bg-black/5 transition-colors"
                  >
                    <div>
                      <CardTitle className="text-base">
                        {c.family_members?.full_name ?? "Unknown patient"}
                      </CardTitle>
                      <CardDescription>
                        {new Date(c.created_at).toLocaleString()}
                      </CardDescription>
                    </div>
                    {triage ? (
                      <Badge variant={triage.priority >= 6 ? "red" : "gold"}>
                        Priority {triage.priority}
                      </Badge>
                    ) : (
                      <Badge variant="dark">Not yet triaged</Badge>
                    )}
                  </Card>
                </Link>
              );
            })
          )}
        </div>

        {awaitingBooking && awaitingBooking.length > 0 ? (
          <div className="mt-10">
            <h2 className="font-headline text-lg font-bold">
              Awaiting booking confirmation
            </h2>
            <div className="mt-4 flex flex-col gap-3">
              {awaitingBooking.map((c: CaseRow) => (
                <Card
                  key={c.id}
                  variant="light"
                  className="flex items-center justify-between"
                >
                  <div>
                    <CardTitle className="text-base">
                      {c.family_members?.full_name ?? "Unknown patient"}
                    </CardTitle>
                    <CardDescription>
                      {new Date(c.created_at).toLocaleString()}
                    </CardDescription>
                  </div>
                  <MarkBookedButton caseId={c.id} />
                </Card>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
