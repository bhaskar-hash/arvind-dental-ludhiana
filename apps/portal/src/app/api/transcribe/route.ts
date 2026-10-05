import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: doctor } = await supabase
    .from("doctors")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!doctor) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { storage_path } = await request.json();

  const response = await fetch(`${process.env.API_INTERNAL_URL}/internal/transcribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-webhook-secret": process.env.API_INTERNAL_SECRET ?? "",
    },
    body: JSON.stringify({ storage_path }),
  });

  if (!response.ok) {
    const detail = await response.text();
    return NextResponse.json({ error: detail }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
