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
        <ReviewAssistant />
      </div>
    </main>
  );
}
