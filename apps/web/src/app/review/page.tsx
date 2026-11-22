import type { Metadata } from "next";
import { ReviewAssistant } from "@/components/ReviewAssistant";
import { business } from "@/lib/business";
import { doctor } from "@/lib/doctor";
import { container } from "@/lib/styles";

export const metadata: Metadata = {
  title: `Share Your Feedback | ${doctor.name} at ${business.name}`,
  description: `Leave your honest feedback for Dr. Arvind Sahu at RedCity Dental Care in Ludhiana. Write a review directly on Google Maps or use our optional writing assistant.`,
  alternates: { canonical: `${business.siteUrl}/review` },
  robots: { index: false, follow: true }, // Utility page for patients in clinic
};

export default function ReviewPage() {
  return (
    <main className="min-h-screen bg-brand-warm/50 py-6 sm:py-14">
      <div className={container}>
        <ReviewAssistant />
      </div>
    </main>
  );
}
