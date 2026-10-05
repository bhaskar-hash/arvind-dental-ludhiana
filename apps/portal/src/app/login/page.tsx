"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, CardDescription, CardTitle } from "@redcity/ui";
import { createClient } from "@/lib/supabase/client";

type Step = "phone" | "otp";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function sendOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ phone });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setStep("otp");
  }

  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      phone,
      token: otp,
      type: "sms",
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-brand-band px-4">
      <Card variant="light" className="w-full max-w-sm">
        <CardTitle>RedCity Dental Care</CardTitle>
        <CardDescription>
          Sign in with your phone number to manage your family&apos;s cases.
        </CardDescription>

        {step === "phone" ? (
          <form onSubmit={sendOtp} className="mt-6 flex flex-col gap-4">
            <label className="font-body text-sm">
              Phone number
              <input
                type="tel"
                required
                placeholder="+91XXXXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 font-body text-base"
              />
            </label>
            {error ? (
              <p className="font-body text-sm text-brand-red">{error}</p>
            ) : null}
            <Button type="submit" disabled={loading}>
              {loading ? "Sending code…" : "Send code"}
            </Button>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="mt-6 flex flex-col gap-4">
            <label className="font-body text-sm">
              Enter the code sent to {phone}
              <input
                type="text"
                inputMode="numeric"
                required
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 font-body text-base"
              />
            </label>
            {error ? (
              <p className="font-body text-sm text-brand-red">{error}</p>
            ) : null}
            <Button type="submit" disabled={loading}>
              {loading ? "Verifying…" : "Verify"}
            </Button>
            <button
              type="button"
              onClick={() => setStep("phone")}
              className="font-body text-sm opacity-60 underline"
            >
              Use a different number
            </button>
          </form>
        )}
      </Card>
    </main>
  );
}
