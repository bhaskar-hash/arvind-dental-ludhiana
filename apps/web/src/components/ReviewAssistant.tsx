"use client";

import { useState, useCallback, useRef } from "react";
import { business } from "@/lib/business";

/* ─────────────────────────────────────────────────────────────────────────────
 * Review suggestion data — one entry per treatment the clinic offers.
 * Each has 2-3 keyword-rich starting-point texts the patient can use as-is,
 * shuffle through, or edit before posting on Google Maps.
 *
 * NOTE: These are suggested review texts for patients, not clinic marketing
 * copy. Keep them factual, avoid banned praise words from AGENTS.md, and
 * never compare with other clinics.
 * ───────────────────────────────────────────────────────────────────────── */

interface Treatment {
  id: string;
  label: string;
  emoji: string;
  suggestions: string[];
}

const TREATMENTS: Treatment[] = [
  {
    id: "implants",
    label: "Dental Implant",
    emoji: "🦷",
    suggestions: [
      "Got my dental implant done by Dr. Arvind Sahu at RedCity Dental Care in South Model Gram, Ludhiana. Being an MDS Prosthodontist, his surgical planning and implant placement were excellent. Transparent fees and genuine written implant warranty. Highly recommend for dental implants in Ludhiana!",
      "Great experience with Dr. Arvind Sahu for tooth replacement at RedCity Dental. He explained all options between implants and bridges clearly with digital X-rays before starting. Very calm clinic environment and comfortable procedure. Recommended for dental care near Model Town!",
      "Very professional dental implant treatment by Dr. Arvind Sahu at RedCity Dental. Upfront pricing, gentle care, and completely natural-looking tooth result.",
    ],
  },
  {
    id: "crowns",
    label: "Crown or Cap",
    emoji: "👑",
    suggestions: [
      "Replaced my old metal crown with a monolithic Zirconia crown at RedCity Dental Care, Ludhiana. Dr. Sahu's attention to shade matching and bite alignment is remarkable. No dark line at the gumline and chewing feels completely natural. Clear published fees and honest advice!",
      "Visited Dr. Arvind Sahu for a broken molar cap. He took digital RVG X-rays, showed me exactly what was wrong, and placed a high-strength crown. Extremely transparent with costs from day one. Very happy with the care in South Model Gram.",
      "Excellent crown and bridge work by prosthodontist Dr. Arvind Sahu in Ludhiana. Smooth process, perfect fit, and very reasonable pricing.",
    ],
  },
  {
    id: "cleaning",
    label: "Teeth Cleaning",
    emoji: "✨",
    suggestions: [
      "Had a full mouth ultrasonic teeth cleaning and polishing at RedCity Dental Care in South Model Gram. Dr. Arvind Sahu was extremely gentle, took his time, and explained proper brushing technique. Fixed fee with no hidden surprises. Highly recommend!",
      "Visited RedCity Dental for routine scaling. My teeth feel so clean and smooth. Dr. Sahu busted the myth that cleaning makes teeth loose and gave very honest advice. Great clinic near Model Town, Ludhiana.",
      "Very thorough teeth cleaning session with Dr. Arvind Sahu. Clean clinic, modern equipment, and fixed transparent fees.",
    ],
  },
  {
    id: "root-canal",
    label: "Root Canal",
    emoji: "⚡",
    suggestions: [
      "Visited Dr. Arvind Sahu at RedCity Dental with severe nighttime tooth pain. He diagnosed the infected nerve with digital X-rays and performed a comfortable single-visit root canal under local anaesthesia. Quick relief! Truly grateful for the emergency care.",
      "I was very nervous about getting a root canal, but Dr. Sahu made the entire procedure comfortable and stress-free. Clear fee estimate before treatment and great follow-up care in South Model Gram, Ludhiana.",
      "Comfortable root canal treatment and crown fitting by Dr. Arvind Sahu at RedCity Dental. Highly skilled doctor and honest recommendations.",
    ],
  },
  {
    id: "dentures",
    label: "Dentures",
    emoji: "👴",
    suggestions: [
      "Consulted Dr. Arvind Sahu (MDS Prosthodontics) for my father's loose lower denture. Dr. Sahu explained how implant-retained snap-on overdentures work to stop slipping. The fit and chewing comfort are extraordinary. Excellent prosthodontist in Ludhiana!",
      "Dr. Arvind Sahu made a custom set of complete dentures for my mother. He took meticulous measurements of her bite and facial profile. She can eat comfortably again. Very patient and respectful doctor at RedCity Dental Care.",
    ],
  },
  {
    id: "veneers",
    label: "Veneers / Smile Fix",
    emoji: "💎",
    suggestions: [
      "Consulted Dr. Arvind Sahu for fluorosis stains on my front teeth. He recommended conservative treatment that preserved my natural enamel instead of grinding them down for caps. My smile looks completely natural now! Great dentist at RedCity Dental Care, Ludhiana.",
      "Excellent aesthetic smile makeover by Dr. Arvind Sahu at RedCity Dental Care, Ludhiana. Beautiful porcelain veneers, seamless shade matching, and honest clinical guidance.",
    ],
  },
  {
    id: "checkup",
    label: "Check-up",
    emoji: "🩺",
    suggestions: [
      "Came to Dr. Arvind Sahu at RedCity Dental for a second opinion. He charged just ₹300 for the consultation and digital X-ray, and explained that I didn't need aggressive work. Rare honesty in Ludhiana!",
      "Visited RedCity Dental in South Model Gram for a routine check-up. Dr. Sahu explains everything in plain words and never pushes unnecessary treatments. Highly recommended family dental clinic in Ludhiana.",
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────── */

export function ReviewAssistant() {
  const [treatmentId, setTreatmentId] = useState<string | null>(null);
  const [suggestionIdx, setSuggestionIdx] = useState(0);
  const [customText, setCustomText] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const reviewRef = useRef<HTMLDivElement>(null);

  const treatment = TREATMENTS.find((t) => t.id === treatmentId);
  const displayText =
    customText ?? (treatment ? treatment.suggestions[suggestionIdx] : "");

  /* ── Handlers ── */

  const pickTreatment = useCallback((id: string) => {
    const t = TREATMENTS.find((t) => t.id === id)!;
    setTreatmentId(id);
    setSuggestionIdx(Math.floor(Math.random() * t.suggestions.length));
    setCustomText(null);
    setEditing(false);
    setCopied(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        reviewRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  }, []);

  const shuffle = useCallback(() => {
    if (!treatment) return;
    setSuggestionIdx((i) => (i + 1) % treatment.suggestions.length);
    setCustomText(null);
    setCopied(false);
  }, [treatment]);

  const toggleEdit = useCallback(() => {
    setEditing((prev) => {
      if (!prev) setCustomText(displayText);
      return !prev;
    });
  }, [displayText]);

  const goBack = useCallback(() => {
    setTreatmentId(null);
    setCustomText(null);
    setEditing(false);
    setCopied(false);
  }, []);

  const copyAndPost = useCallback(async () => {
    const url = business.googleWriteReviewUrl;
    try {
      await navigator.clipboard.writeText(displayText);
      setCopied(true);
      setTimeout(() => {
        window.open(url, "_blank", "noopener,noreferrer");
      }, 600);
    } catch {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }, [displayText]);

  /* ── Step 1: Pick treatment ── */

  if (!treatmentId) {
    return (
      <div className="mx-auto max-w-md px-1">
        <div className="mb-7 text-center">
          <span
            className="inline-block text-5xl leading-none"
            role="img"
            aria-label="Thank you"
          >
            🙏
          </span>
          <h2 className="mt-3 font-headline text-2xl font-extrabold text-brand-ink sm:text-3xl">
            What did you visit for?
          </h2>
          <p className="mt-1.5 font-body text-sm text-brand-muted">
            Tap your treatment — we&apos;ll write the review for you
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {TREATMENTS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => pickTreatment(t.id)}
              className="group flex flex-col items-center gap-2.5 rounded-2xl border-2 border-brand-line/80 bg-white px-3 py-5 shadow-sm transition-all duration-150 active:scale-95 hover:border-brand-red/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
            >
              <span className="text-3xl leading-none transition-transform duration-150 group-active:scale-90">
                {t.emoji}
              </span>
              <span className="font-body text-[13px] font-semibold leading-snug text-brand-ink text-center">
                {t.label}
              </span>
            </button>
          ))}
        </div>

        {/* Direct link for people who don't need help */}
        <p className="mt-7 text-center">
          <a
            href={business.googleWriteReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs text-brand-muted underline decoration-brand-line underline-offset-2 hover:text-brand-ink"
          >
            Skip — write directly on Google Maps →
          </a>
        </p>
      </div>
    );
  }

  /* ── Step 2: Review card + 1-tap post ── */

  if (!treatment) return null;

  return (
    <div ref={reviewRef} className="mx-auto max-w-md px-1">
      {/* Back + treatment badge */}
      <div className="mb-4 flex items-center gap-2.5">
        <button
          type="button"
          onClick={goBack}
          aria-label="Change treatment"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-line bg-white font-body text-xl text-brand-muted transition-colors hover:border-brand-red/40 hover:text-brand-ink active:scale-95"
        >
          ‹
        </button>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blush px-4 py-2 font-body text-sm font-bold text-brand-red">
          <span>{treatment.emoji}</span>
          <span>{treatment.label}</span>
        </span>
      </div>

      {/* Review card */}
      <div className="overflow-hidden rounded-3xl border-2 border-brand-line bg-white shadow-lg">
        {/* Review body */}
        <div className="p-5 sm:p-6">
          <div className="mb-3.5 flex items-center justify-between">
            <span className="font-body text-[11px] font-bold uppercase tracking-widest text-brand-muted">
              Suggested review
            </span>
            <span className="text-sm leading-none" aria-label="5 stars">
              ⭐⭐⭐⭐⭐
            </span>
          </div>

          {editing ? (
            <textarea
              value={displayText}
              onChange={(e) => {
                setCustomText(e.target.value);
                setCopied(false);
              }}
              rows={6}
              autoFocus
              className="w-full resize-none rounded-xl border border-brand-line bg-brand-warm/30 p-3.5 font-body text-[15px] leading-relaxed text-brand-ink outline-none transition-colors focus:border-brand-red focus:bg-white"
            />
          ) : (
            <blockquote className="font-body text-[15px] leading-relaxed text-brand-ink">
              &ldquo;{displayText}&rdquo;
            </blockquote>
          )}

          {/* Secondary actions */}
          <div className="mt-4 flex items-center gap-1 border-t border-brand-line/50 pt-3">
            <button
              type="button"
              onClick={shuffle}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 font-body text-xs font-semibold text-brand-muted transition-colors hover:bg-brand-warm hover:text-brand-ink active:scale-95"
            >
              <span className="text-sm">🔄</span> Different
            </button>
            <span className="text-brand-line/60 select-none">·</span>
            <button
              type="button"
              onClick={toggleEdit}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 font-body text-xs font-semibold text-brand-muted transition-colors hover:bg-brand-warm hover:text-brand-ink active:scale-95"
            >
              {editing ? (
                <>
                  <span className="text-sm">✓</span> Done
                </>
              ) : (
                <>
                  <span className="text-sm">✏️</span> Edit
                </>
              )}
            </button>
          </div>
        </div>

        {/* CTA footer */}
        <div className="border-t-2 border-brand-line/50 bg-brand-warm/40 p-4 sm:p-5">
          <button
            type="button"
            onClick={copyAndPost}
            className={`flex w-full items-center justify-center gap-2.5 rounded-2xl py-4 font-body text-[15px] font-bold text-white shadow-lg transition-all duration-200 active:scale-[0.97] ${
              copied
                ? "bg-[#0B7A55] shadow-[#0B7A55]/20"
                : "bg-brand-red shadow-brand-red/25 hover:brightness-110"
            }`}
          >
            {copied ? (
              <>
                <span className="text-xl leading-none">✓</span>
                <span>Copied! Paste on Google &amp; post</span>
              </>
            ) : (
              <>
                <span className="text-xl leading-none">⭐</span>
                <span>Copy &amp; Post on Google</span>
              </>
            )}
          </button>

          {copied ? (
            <div className="mt-3 rounded-xl border border-green-200 bg-green-50 p-3 text-center">
              <p className="font-body text-xs font-semibold text-green-800">
                Google Maps is opening — tap the review box, long-press →
                Paste, then Post! 🎉
              </p>
            </div>
          ) : (
            <p className="mt-2.5 text-center font-body text-[11px] text-brand-muted">
              Takes less than 10 seconds · text copies automatically
            </p>
          )}
        </div>
      </div>

      {/* Fallback link */}
      <p className="mt-6 text-center">
        <a
          href={business.googleWriteReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-xs text-brand-muted underline decoration-brand-line underline-offset-2 hover:text-brand-ink"
        >
          Write your own review on Google Maps →
        </a>
      </p>
    </div>
  );
}
