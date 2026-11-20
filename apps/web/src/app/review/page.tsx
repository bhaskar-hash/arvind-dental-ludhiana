import type { Metadata } from "next";
import { ReviewAssistant } from "@/components/ReviewAssistant";
import { business } from "@/lib/business";
import { doctor } from "@/lib/doctor";
import { container } from "@/lib/styles";

export const metadata: Metadata = {
  title: `Share Your Feedback | ${doctor.name} at ${business.name}`,
  description: `Help other patients in Ludhiana find honest dental care. Choose your treatment to generate a 1-tap review recommendation for Google Maps.`,
  alternates: { canonical: `${business.siteUrl}/review` },
  robots: { index: false, follow: true }, // Utility page for patients in clinic
};

export default function ReviewPage() {
  return (
    <main className="min-h-screen bg-brand-warm/50 py-12 sm:py-20">
      <div className={container}>
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <span className="font-body text-xs font-bold uppercase tracking-[0.16em] text-brand-red">
            Patient Experience
          </span>
          <h1 className="mt-2 font-headline text-3xl font-extrabold text-brand-ink sm:text-4xl">
            Thank you for visiting {doctor.name}
          </h1>
          <p className="mt-2.5 font-body text-base text-brand-muted">
            Your honest review helps other patients in Ludhiana discover ethical, specialist dental care with 100% upfront pricing.
          </p>
        </div>

        <ReviewAssistant />
      </div>
    </main>
  );
}
