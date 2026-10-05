import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { FamilyDashboard } from "@/components/family-dashboard";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: doctor } = await supabase
    .from("doctors")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (doctor) {
    redirect("/doctor");
  }

  const [{ data: familyMembers }, { data: cases }] = await Promise.all([
    supabase
      .from("family_members")
      .select("*")
      .eq("patient_id", user.id)
      .order("created_at", { ascending: true }),
    supabase
      .from("cases")
      .select("*, family_members(full_name)")
      .eq("patient_id", user.id)
      .order("created_at", { ascending: false }),
  ]);

  return (
    <FamilyDashboard
      familyMembers={familyMembers ?? []}
      cases={cases ?? []}
    />
  );
}
