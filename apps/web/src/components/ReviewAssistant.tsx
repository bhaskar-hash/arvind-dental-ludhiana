"use client";

import { useState, useCallback } from "react";
import { business } from "@/lib/business";
import { doctor } from "@/lib/doctor";

/* ─────────────────────────────────────────────────────────────────────────────
 * Treatment definitions & question-driven review suggestions.
 * Follows AGENTS.md compliance:
 * - NO banned praise words (best, No. 1, top, leading, advanced, world-class,
 *   affordable, cheapest, painless, guaranteed, 100%, zero, forever, instant, free).
 * - Factual, patient-first descriptions of Dr. Sahu's MDS Prosthodontist care.
 * ───────────────────────────────────────────────────────────────────────── */

interface TreatmentOption {
  id: string;
  label: string;
  emoji: string;
  baseReview: string;
  alternates: string[];
}

const TREATMENTS: TreatmentOption[] = [
  {
    id: "implants",
    label: "Dental Implant",
    emoji: "🦷",
    baseReview:
      "Got my dental implant done by Dr. Arvind Sahu at RedCity Dental Care in South Model Gram, Ludhiana. Being an MDS Prosthodontist, his surgical planning and tooth placement were thorough and comfortable. Transparent fees and clear written implant warranty. Highly recommend for dental implants in Ludhiana!",
    alternates: [
      "Great experience with Dr. Arvind Sahu for tooth replacement. He explained all options between implants and bridges clearly with digital X-rays before starting. Very calm clinic environment and comfortable procedure near Model Town, Ludhiana.",
      "Very professional dental implant treatment by Dr. Arvind Sahu at RedCity Dental Care. Upfront published pricing, gentle care, and completely natural-looking tooth result.",
    ],
  },
  {
    id: "crowns",
    label: "Crown or Cap",
    emoji: "👑",
    baseReview:
      "Replaced my damaged cap with a monolithic Zirconia crown at RedCity Dental Care, Ludhiana. Dr. Sahu's attention to shade matching and bite alignment is remarkable. Chewing feels completely natural. Clear published fees and honest advice!",
    alternates: [
      "Visited Dr. Arvind Sahu for a broken molar cap. He took digital RVG X-rays, showed me exactly what was needed, and placed a durable crown. Transparent with costs from day one. Very satisfied with the care in South Model Gram.",
      "Thorough crown and bridge work by prosthodontist Dr. Arvind Sahu in Ludhiana. Smooth process, perfect fit, and reasonable pricing.",
    ],
  },
  {
    id: "cleaning",
    label: "Teeth Cleaning",
    emoji: "✨",
    baseReview:
      "Had a full mouth ultrasonic teeth cleaning and polishing at RedCity Dental Care in South Model Gram. Dr. Arvind Sahu was gentle, took his time, and explained proper daily care. Fixed published fee with no hidden extras. Highly recommend!",
    alternates: [
      "Visited RedCity Dental for routine scaling. My teeth feel very clean and smooth. Dr. Sahu took the time to answer all my questions and gave honest advice. Clean clinic near Model Town, Ludhiana.",
      "Very gentle and thorough teeth cleaning session with Dr. Arvind Sahu. Clean clinic, digital equipment, and transparent fees.",
    ],
  },
  {
    id: "root-canal",
    label: "Root Canal",
    emoji: "⚡",
    baseReview:
      "Visited Dr. Arvind Sahu at RedCity Dental with severe tooth pain. He diagnosed the infected tooth with digital X-rays and performed a comfortable single-visit root canal under local anaesthesia. Quick relief and very gentle procedure. Truly grateful for the emergency care in Ludhiana.",
    alternates: [
      "I was nervous about getting a root canal, but Dr. Sahu made the entire procedure calm and comfortable. Clear fee estimate before treatment and great follow-up care in South Model Gram, Ludhiana.",
      "Comfortable root canal treatment and crown fitting by Dr. Arvind Sahu at RedCity Dental. Skilled doctor and honest recommendations.",
    ],
  },
  {
    id: "dentures",
    label: "Dentures",
    emoji: "👴",
    baseReview:
      "Consulted Dr. Arvind Sahu (MDS Prosthodontics) for my father's loose lower denture. Dr. Sahu explained how implant-retained snap-on overdentures work to prevent slipping. The fit and chewing comfort are remarkable. Highly skilled prosthodontist in Ludhiana!",
    alternates: [
      "Dr. Arvind Sahu made a custom set of complete dentures for my mother. He took meticulous measurements of her bite and facial profile. She can eat comfortably again. Very patient and respectful doctor at RedCity Dental Care.",
    ],
  },
  {
    id: "veneers",
    label: "Smile Fix / Veneers",
    emoji: "💎",
    baseReview:
      "Consulted Dr. Arvind Sahu for mottled fluorosis stains on my front teeth. He recommended conservative treatment that preserved my natural enamel instead of aggressive grinding. My smile looks completely natural now! Great specialist care at RedCity Dental Care, Ludhiana.",
    alternates: [
      "Very happy with my smile makeover by Dr. Arvind Sahu at RedCity Dental Care, Ludhiana. Beautiful porcelain veneers, seamless shade matching, and honest clinical guidance.",
    ],
  },
  {
    id: "checkup",
    label: "Check-up / Consult",
    emoji: "🩺",
    baseReview:
      "Came to Dr. Arvind Sahu at RedCity Dental in South Model Gram for an objective second opinion. He charged just the consultation fee with digital X-ray and explained that I did not need aggressive procedures. Rare honesty and integrity in Ludhiana!",
    alternates: [
      "Visited RedCity Dental in South Model Gram for a routine check-up. Dr. Sahu explains everything in plain words and never pushes unnecessary treatments. Highly recommended family dental clinic in Ludhiana.",
    ],
  },
];

interface HighlightTag {
  id: string;
  label: string;
  phrase: string;
}

const HIGHLIGHT_TAGS: HighlightTag[] = [
  { id: "gentle", label: "Gentle Care", phrase: " Very gentle and comfortable treatment." },
  { id: "pricing", label: "Clear Pricing", phrase: " Transparent upfront pricing with no hidden charges." },
  { id: "explanation", label: "Clear Explanation", phrase: " Explained the diagnosis and treatment options thoroughly." },
  { id: "clean", label: "Hygienic Clinic", phrase: " Modern, hygienic clinic environment." },
];

/** Copy text to clipboard with multi-browser mobile fallbacks. */
function copyToClipboard(text: string): boolean {
  if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(() => {});
  }

  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    return successful;
  } catch {
    return false;
  }
}

export function ReviewAssistant() {
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>("implants");
  const [selectedHighlightId, setSelectedHighlightId] = useState<string | null>(null);
  const [suggestionIdx, setSuggestionIdx] = useState<number>(0);
  const [customText, setCustomText] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  const activeTreatment =
    TREATMENTS.find((t) => t.id === selectedTreatmentId) ?? TREATMENTS[0];

  // Build the review text based on treatment + optional highlight modifier
  const computeActiveText = useCallback(() => {
    if (customText !== null) return customText;
    const baseList = [activeTreatment.baseReview, ...activeTreatment.alternates];
    let base = baseList[suggestionIdx % baseList.length];
    if (selectedHighlightId) {
      const tag = HIGHLIGHT_TAGS.find((h) => h.id === selectedHighlightId);
      if (tag && !base.includes(tag.phrase.trim())) {
        base = `${base}${tag.phrase}`;
      }
    }
    return base;
  }, [activeTreatment, suggestionIdx, selectedHighlightId, customText]);

  const reviewText = computeActiveText();

  // Handlers
  function handleSelectTreatment(id: string) {
    setSelectedTreatmentId(id);
    setSuggestionIdx(0);
    setCustomText(null);
    setIsEditing(false);
    setHasCopied(false);
  }

  function handleToggleHighlight(id: string) {
    setSelectedHighlightId((prev) => (prev === id ? null : id));
    setCustomText(null);
    setHasCopied(false);
  }

  function handleShuffleNote() {
    const baseList = [activeTreatment.baseReview, ...activeTreatment.alternates];
    setSuggestionIdx((prev) => (prev + 1) % baseList.length);
    setCustomText(null);
    setHasCopied(false);
  }

  function handleToggleEdit() {
    setIsEditing((prev) => {
      if (!prev) setCustomText(reviewText);
      return !prev;
    });
  }

  function handleCopyAndLaunch() {
    // 1. Copy text to clipboard immediately in synchronous user gesture
    copyToClipboard(reviewText);
    setHasCopied(true);

    // 2. Open Google Maps review URL
    const directUrl = business.googleWriteReviewUrl;
    try {
      const win = window.open(directUrl, "_blank", "noopener,noreferrer");
      if (!win || win.closed || typeof win.closed === "undefined") {
        window.location.href = directUrl;
      }
    } catch {
      window.location.href = directUrl;
    }
  }

  return (
    <div className="mx-auto max-w-lg px-2 sm:px-0">
      {/* Clinic Header Banner */}
      <div className="mb-5 rounded-3xl border border-brand-line bg-white p-5 shadow-sm text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-gold font-headline font-black text-brand-maroon text-lg shadow-sm">
            RC
          </span>
          <div className="text-left">
            <h1 className="font-headline text-lg font-bold text-brand-ink leading-tight">
              {business.name}
            </h1>
            <p className="font-body text-xs text-brand-muted">
              {doctor.name} · {doctor.credentialsShort} · South Model Gram, Ludhiana
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 border-t border-brand-line/60 pt-3 text-xs font-semibold text-brand-muted">
          <span className="text-amber-500 font-bold tracking-wide">★★★★★ 5.0 on Google</span>
          <span className="text-brand-line">•</span>
          <span className="text-brand-red font-bold">2-Click Review Assistant</span>
        </div>
      </div>

      {/* Main Review Helper Card */}
      <div className="rounded-3xl border border-brand-line bg-white p-5 shadow-sm">
        {/* QUESTION 1: What treatment did you receive? */}
        <div>
          <div className="flex items-center justify-between">
            <label className="font-headline text-sm font-bold text-brand-ink">
              1. What did you visit for today?
            </label>
            <span className="rounded-full bg-brand-blush px-2.5 py-0.5 font-body text-[11px] font-bold text-brand-red">
              Click 1
            </span>
          </div>
          <p className="mt-1 font-body text-xs text-brand-muted">
            Tap your treatment to load a tailored review note:
          </p>

          {/* 1-Tap Treatment Pills */}
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {TREATMENTS.map((t) => {
              const isSelected = t.id === selectedTreatmentId;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleSelectTreatment(t.id)}
                  className={`flex items-center gap-2 rounded-2xl px-3 py-2.5 text-left transition-all active:scale-95 ${
                    isSelected
                      ? "border-2 border-brand-red bg-brand-blush/60 font-bold text-brand-red shadow-sm"
                      : "border border-brand-line bg-white font-medium text-brand-ink hover:bg-brand-warm/60"
                  }`}
                >
                  <span className="text-xl shrink-0 leading-none">{t.emoji}</span>
                  <span className="font-body text-xs leading-tight line-clamp-1">
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* QUESTION 2: What stood out most? (Optional quick tags) */}
        <div className="mt-5 border-t border-brand-line/60 pt-4">
          <label className="block font-headline text-xs font-bold text-brand-ink">
            2. What stood out most? <span className="font-normal text-brand-muted">(Optional)</span>
          </label>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {HIGHLIGHT_TAGS.map((tag) => {
              const isSelected = tag.id === selectedHighlightId;
              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => handleToggleHighlight(tag.id)}
                  className={`rounded-full px-3 py-1 font-body text-[11px] font-semibold transition-all active:scale-95 ${
                    isSelected
                      ? "bg-brand-maroon text-brand-gold shadow-sm"
                      : "border border-brand-line bg-brand-warm/50 text-brand-muted hover:text-brand-ink"
                  }`}
                >
                  {tag.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Review Preview & Options */}
        <div className="mt-5 border-t border-brand-line/70 pt-4">
          <div className="flex items-center justify-between">
            <span className="font-headline text-xs font-bold text-brand-ink">
              Ready-made Google Review
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleShuffleNote}
                className="inline-flex items-center gap-1 rounded-lg bg-brand-warm px-2.5 py-1 font-body text-[11px] font-semibold text-brand-muted hover:text-brand-ink active:scale-95"
                title="Try another version"
              >
                <span>🔄</span> Shuffle
              </button>
              <button
                type="button"
                onClick={handleToggleEdit}
                className="inline-flex items-center gap-1 rounded-lg bg-brand-warm px-2.5 py-1 font-body text-[11px] font-semibold text-brand-muted hover:text-brand-ink active:scale-95"
              >
                <span>✏️</span> {isEditing ? "Done" : "Edit"}
              </button>
            </div>
          </div>

          {/* Review Text Container */}
          <div className="mt-2.5">
            {isEditing ? (
              <textarea
                value={reviewText}
                onChange={(e) => {
                  setCustomText(e.target.value);
                  setHasCopied(false);
                }}
                rows={5}
                className="w-full rounded-2xl border-2 border-brand-red/50 bg-white p-3.5 font-body text-xs text-brand-ink leading-relaxed outline-none focus:border-brand-red"
                placeholder="Type your review note here..."
              />
            ) : (
              <div className="rounded-2xl border border-brand-line/80 bg-brand-warm/40 p-3.5 font-body text-xs leading-relaxed text-brand-ink">
                <div className="mb-1.5 flex items-center gap-1 text-amber-500 text-xs">
                  ★★★★★
                  <span className="ml-1 text-[10px] font-semibold text-brand-muted">
                    (5 Stars Recommended)
                  </span>
                </div>
                &ldquo;{reviewText}&rdquo;
              </div>
            )}
          </div>
        </div>

        {/* CLICK 2: Big Action Button */}
        <div className="mt-5 border-t border-brand-line/70 pt-5">
          <button
            type="button"
            onClick={handleCopyAndLaunch}
            className={`w-full flex flex-col items-center justify-center rounded-2xl py-4 px-6 text-white shadow-lg transition-all active:scale-[0.98] ${
              hasCopied
                ? "bg-[#0B7A55] shadow-[#0B7A55]/25"
                : "bg-brand-red shadow-brand-red/25 hover:bg-brand-red-dark"
            }`}
          >
            <div className="flex items-center gap-2 font-body text-base font-bold">
              <span>{hasCopied ? "✓" : "⭐"}</span>
              <span>{hasCopied ? "Copied! Opening Google Review..." : "Copy & Open Google Review"}</span>
            </div>
            <span className="mt-0.5 font-body text-[11px] text-white/80">
              {hasCopied
                ? "Just tap Paste and Submit in Google Maps"
                : "Click 2: Opens Google Maps review form directly"}
            </span>
          </button>

          {/* Quick 3-Step Guide */}
          <div className="mt-4 rounded-xl bg-brand-warm/60 p-3 text-[11px] font-body text-brand-muted">
            <div className="font-semibold text-brand-ink mb-1.5">When Google Maps opens (3 taps):</div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-white p-1.5 border border-brand-line/50">
                <span className="font-bold text-brand-red block">1</span>
                Tap 5 Stars ⭐
              </div>
              <div className="rounded-lg bg-white p-1.5 border border-brand-line/50">
                <span className="font-bold text-brand-red block">2</span>
                Hold &amp; <strong>Paste</strong>
              </div>
              <div className="rounded-lg bg-white p-1.5 border border-brand-line/50">
                <span className="font-bold text-brand-red block">3</span>
                Tap <strong>Post</strong> 🎉
              </div>
            </div>
          </div>

          {/* Direct Fallback link */}
          <div className="mt-4 text-center">
            <a
              href={business.googleWriteReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-brand-muted underline decoration-brand-line hover:text-brand-red"
            >
              Open Google Review form manually →
            </a>
          </div>
        </div>
      </div>

      {/* Staff Counter Kit Link */}
      <div className="mt-6 text-center font-body text-xs text-brand-muted">
        <a
          href="/review/standee"
          className="text-brand-red underline hover:text-brand-ink"
        >
          Clinic Reception QR Standee Card (Printable) →
        </a>
      </div>
    </div>
  );
}

