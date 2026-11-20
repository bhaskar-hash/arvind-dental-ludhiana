"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { business } from "@/lib/business";

interface TreatmentCategory {
  id: string;
  name: string;
  icon: string;
  badge: string;
  reviews: {
    title: string;
    text: string;
  }[];
}

const CATEGORIES: TreatmentCategory[] = [
  {
    id: "implants",
    name: "Dental Implants",
    icon: "🦷",
    badge: "Tooth Replacement",
    reviews: [
      {
        title: "Specialist MDS Quality",
        text: "Got my dental implant done by Dr. Arvind Sahu at RedCity Dental Care in South Model Gram, Ludhiana. Being an MDS Prosthodontist, his surgical planning and tooth placement were flawless and comfortable. Transparent fees and genuine written implant warranty. Highly recommend him for dental implants in Ludhiana!",
      },
      {
        title: "Painless & Reassuring",
        text: "Excellent experience with Dr. Arvind Sahu for tooth replacement. He explained all options between implants and bridges clearly with digital X-rays before starting. Very calm clinic environment and completely painless procedure. Best dental clinic near Model Town!",
      },
      {
        title: "Clear Pricing & Natural Result",
        text: "Very professional dental implant treatment by Dr. Arvind Sahu at RedCity Dental. Upfront pricing, gentle care, and completely natural-looking tooth result.",
      },
    ],
  },
  {
    id: "crowns",
    name: "Zirconia / PFM Crowns",
    icon: "👑",
    badge: "Tooth Protection",
    reviews: [
      {
        title: "Monolithic Zirconia Crown",
        text: "Replaced my old metal crown with a monolithic Zirconia crown at RedCity Dental Care, Ludhiana. Dr. Sahu's attention to shade matching and bite alignment is remarkable. No dark line at the gumline and chewing feels completely natural. Clear published fees and honest advice!",
      },
      {
        title: "Broken Tooth Rescue",
        text: "Visited Dr. Arvind Sahu for a broken molar cap. He took digital RVG X-rays, showed me exactly what was wrong, and placed a high-strength crown. Extremely transparent with costs from day one. Very happy with the care in South Model Gram.",
      },
      {
        title: "Smooth & Perfect Fit",
        text: "Top-notch crown and bridge work by prosthodontist Dr. Arvind Sahu in Ludhiana. Smooth process, perfect fit, and very reasonable pricing.",
      },
    ],
  },
  {
    id: "cleaning",
    name: "Teeth Cleaning & Scaling",
    icon: "✨",
    badge: "Routine Hygiene",
    reviews: [
      {
        title: "Gentle Ultrasonic Cleaning",
        text: "Had a full mouth ultrasonic teeth cleaning and polishing at RedCity Dental Care in South Model Gram. Dr. Arvind Sahu was extremely gentle, took his time, and explained proper brushing technique. Fixed fee of ₹1,000 with no hidden surprises. Highly recommend!",
      },
      {
        title: "No Sensitivity & Honest Advice",
        text: "Visited RedCity Dental for routine scaling. My teeth feel so clean and smooth. Dr. Sahu busted the myth that cleaning makes teeth loose and gave very honest advice. Great clinic near Model Town Ludhiana.",
      },
      {
        title: "Clean Clinic & Fixed Fee",
        text: "Very thorough and painless teeth cleaning session with Dr. Arvind Sahu. Clean clinic, modern equipment, and fixed transparent fees.",
      },
    ],
  },
  {
    id: "root-canal",
    name: "Root Canal Treatment",
    icon: "⚡",
    badge: "Pain Relief",
    reviews: [
      {
        title: "Emergency Night Pain Relief",
        text: "Visited Dr. Arvind Sahu at RedCity Dental with severe nighttime tooth pain. He diagnosed the infected nerve with digital X-rays and performed a painless single-visit root canal under local anaesthesia. Instant relief! Truly grateful for the emergency care.",
      },
      {
        title: "Stress-Free & Comfortable",
        text: "I was very nervous about getting a root canal, but Dr. Sahu made the entire procedure comfortable and stress-free. Clear fee estimate before treatment and great follow-up care in South Model Gram, Ludhiana.",
      },
      {
        title: "Painless & Expert Care",
        text: "Painless root canal treatment and crown fitting by Dr. Arvind Sahu at RedCity Dental. Highly skilled doctor and honest recommendations.",
      },
    ],
  },
  {
    id: "dentures",
    name: "Dentures & Overdentures",
    icon: "👴",
    badge: "Senior Care",
    reviews: [
      {
        title: "Snap-On Lower Overdenture",
        text: "Consulted Dr. Arvind Sahu (MDS Prosthodontics) for my father's loose lower denture. Dr. Sahu explained how implant-retained snap-on overdentures work to stop slipping. The fit and chewing comfort are extraordinary. Best prosthodontist in Ludhiana!",
      },
      {
        title: "Comfortable Complete Denture",
        text: "Dr. Arvind Sahu made a custom set of complete dentures for my mother. He took meticulous measurements of her bite and facial profile. She can eat comfortably again. Very patient and respectful doctor.",
      },
    ],
  },
  {
    id: "fluorosis-veneers",
    name: "Fluorosis & Veneers",
    icon: "💎",
    badge: "Smile Design",
    reviews: [
      {
        title: "Conservative Fluorosis Treatment",
        text: "Consulted Dr. Arvind Sahu for mottled brown fluorosis stains on my front teeth. Unlike other clinics that wanted to grind my teeth down for caps, Dr. Sahu recommended conservative treatment that preserved my natural enamel. My smile looks completely natural now!",
      },
      {
        title: "Aesthetic Porcelain Veneers",
        text: "Excellent aesthetic smile makeover by Dr. Arvind Sahu at RedCity Dental Care, Ludhiana. Beautiful porcelain veneers, seamless shade matching, and honest clinical guidance.",
      },
    ],
  },
  {
    id: "checkup",
    name: "Check-up & Consultation",
    icon: "🩺",
    badge: "Second Opinion",
    reviews: [
      {
        title: "Honest Second Opinion",
        text: "Got an expensive treatment quote from another clinic and came to Dr. Arvind Sahu at RedCity Dental for an objective second opinion. He charged just ₹300 for the consultation and digital X-ray, and explained that I didn't need aggressive work. Rare honesty in Ludhiana!",
      },
      {
        title: "Transparent & Friendly",
        text: "Visited RedCity Dental in South Model Gram for a routine check-up. Dr. Sahu explains everything in plain words and never pushes unnecessary treatments. Highly recommended family dental clinic in Ludhiana.",
      },
    ],
  },
];

export function ReviewAssistant() {
  const [selectedCatId, setSelectedCatId] = useState<string>("implants");
  const [selectedReviewIdx, setSelectedReviewIdx] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>(CATEGORIES[0].reviews[0].text);
  const [copied, setCopied] = useState<boolean>(false);

  const activeCategory = CATEGORIES.find((c) => c.id === selectedCatId) ?? CATEGORIES[0];

  function handleSelectCategory(catId: string) {
    const cat = CATEGORIES.find((c) => c.id === catId) ?? CATEGORIES[0];
    setSelectedCatId(catId);
    setSelectedReviewIdx(0);
    setReviewText(cat.reviews[0].text);
    setCopied(false);
  }

  function handleSelectReview(idx: number) {
    setSelectedReviewIdx(idx);
    setReviewText(activeCategory.reviews[idx].text);
    setCopied(false);
  }

  async function handleCopyAndLaunch() {
    try {
      await navigator.clipboard.writeText(reviewText);
      setCopied(true);
      setTimeout(() => {
        window.open(business.googleBusinessUrl, "_blank", "noopener,noreferrer");
      }, 700);
    } catch {
      window.open(business.googleBusinessUrl, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Clinic Header Card */}
      <div className="overflow-hidden rounded-3xl border border-brand-line bg-white shadow-sm">
        <div className="bg-brand-maroon p-6 text-white sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gold font-headline font-bold text-brand-maroon text-lg">
              RC
            </span>
            <div>
              <h1 className="font-headline text-xl font-bold text-white sm:text-2xl">
                RedCity Dental Care &amp; Implant Centre
              </h1>
              <p className="font-body text-xs text-[#E3D1CE] sm:text-sm">
                Dr. Arvind Sahu, MDS (Prosthodontics) · South Model Gram, Ludhiana
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
            <span className="inline-flex items-center gap-1.5 font-body text-xs font-semibold text-brand-gold">
              <Icon name="shield" size={14} />
              1-Tap Google Review Assistant
            </span>
            <span className="font-body text-xs text-[#CDB8B5]">
              Takes less than 15 seconds
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {/* Step 1: Treatment Category */}
          <div>
            <label className="block font-headline text-lg font-bold text-brand-ink">
              Step 1: What care or treatment did you receive?
            </label>
            <p className="mt-1 font-body text-xs text-brand-muted">
              Tap below to see suggested reviews written specifically for your treatment.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const isSelected = cat.id === selectedCatId;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleSelectCategory(cat.id)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-body text-xs font-semibold transition-all sm:text-sm ${
                      isSelected
                        ? "bg-brand-red text-white shadow-md shadow-brand-red/20 scale-[1.02]"
                        : "border border-brand-line bg-brand-warm/60 text-brand-ink hover:bg-brand-blush hover:text-brand-red"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Choose / Customize Suggestion */}
          <div className="mt-8 pt-7 border-t border-brand-line">
            <label className="block font-headline text-lg font-bold text-brand-ink">
              Step 2: Choose a review note or customize below
            </label>
            <p className="mt-1 font-body text-xs text-brand-muted">
              Select one of our suggested templates, or feel free to type your own words in the box.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {activeCategory.reviews.map((rev, idx) => {
                const isSelected = idx === selectedReviewIdx;
                return (
                  <button
                    key={rev.title}
                    type="button"
                    onClick={() => handleSelectReview(idx)}
                    className={`rounded-xl px-3.5 py-2 font-body text-xs font-semibold transition-all ${
                      isSelected
                        ? "bg-brand-maroon text-brand-gold shadow-sm"
                        : "bg-brand-warm text-brand-muted hover:text-brand-ink"
                    }`}
                  >
                    {rev.title}
                  </button>
                );
              })}
            </div>

            {/* Editable Text Area */}
            <div className="mt-4 relative">
              <textarea
                value={reviewText}
                onChange={(e) => {
                  setReviewText(e.target.value);
                  setCopied(false);
                }}
                rows={4}
                className="w-full rounded-2xl border-2 border-brand-line bg-brand-warm/30 p-4 font-body text-sm text-brand-ink leading-relaxed outline-none transition-colors focus:border-brand-red focus:bg-white"
                placeholder="Write or edit your review here..."
              />
              <span className="absolute bottom-3 right-4 font-body text-[11px] text-brand-muted">
                Editable
              </span>
            </div>
          </div>

          {/* Step 3: Copy & Launch Google Maps Action */}
          <div className="mt-8 pt-7 border-t border-brand-line">
            <button
              type="button"
              onClick={handleCopyAndLaunch}
              className={`w-full flex items-center justify-center gap-3 rounded-2xl py-4 px-6 font-body text-base font-bold text-white transition-all shadow-lg ${
                copied
                  ? "bg-brand-wa hover:bg-brand-wa"
                  : "bg-brand-red hover:bg-brand-red-dark hover:scale-[1.01]"
              }`}
            >
              {copied ? (
                <>
                  <Icon name="check" size={22} strokeWidth={2.5} />
                  <span>Copied! Opening Google Maps... Just Paste &amp; Submit!</span>
                </>
              ) : (
                <>
                  <Icon name="chat" size={22} />
                  <span>Copy Review &amp; Open Google Maps</span>
                </>
              )}
            </button>

            {/* Visual Instructions */}
            <div className="mt-6 rounded-2xl bg-brand-warm p-4 sm:p-5">
              <strong className="block font-headline text-sm font-bold text-brand-ink">
                How it works in Google Maps (3 quick taps):
              </strong>
              <div className="mt-3 grid gap-3 sm:grid-cols-3 font-body text-xs text-brand-muted">
                <div className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-red text-[11px] font-bold text-white">
                    1
                  </span>
                  <span>Tap button above (text copies automatically)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-red text-[11px] font-bold text-white">
                    2
                  </span>
                  <span>Select 5 stars ⭐⭐⭐⭐⭐ in Google Maps</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-red text-[11px] font-bold text-white">
                    3
                  </span>
                  <span>Hold &amp; tap <strong>Paste</strong>, then Post!</span>
                </div>
              </div>
            </div>

            {/* Direct Fallback link */}
            <div className="mt-5 flex items-center justify-between text-xs font-body text-brand-muted">
              <span>Prefer to write entirely from scratch?</span>
              <a
                href={business.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-red hover:underline inline-flex items-center gap-1"
              >
                Open Google Maps Directly <Icon name="arrow" size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Staff / Clinic Link to Print Reception Standee */}
      <div className="mt-8 text-center font-body text-xs text-brand-muted">
        <span>Are you clinic staff? </span>
        <Link
          href="/review/standee"
          className="font-semibold text-brand-red underline hover:text-brand-ink"
        >
          View and print the Clinic Reception Counter QR Standee
        </Link>
      </div>
    </div>
  );
}
