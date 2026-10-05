import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireDoctor() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: doctor } = await supabase
    .from("doctors")
    .select("id, full_name")
    .eq("id", user.id)
    .maybeSingle();

  if (!doctor) {
    redirect("/");
  }

  return { supabase, doctor, userId: user.id };
}
