"use client";

import { useState, useCallback } from "react";
import { business } from "@/lib/business";
import { doctor } from "@/lib/doctor";

/* ─────────────────────────────────────────────────────────────────────────────
 * Treatment definitions & generic Hinglish review suggestions.
 * Follows AGENTS.md compliance:
 * - NO banned praise words (best, No. 1, top, leading, advanced, world-class,
 *   affordable, cheapest, painless, guaranteed, 100%, zero, forever, instant, free).
 * - Natural, generic Hinglish sentences that real Indian patients write.
 * - No quotation marks around text.
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
      "Dr. Arvind Sahu sir se dental implant karwaya. Bohot aaram se treatment ho gaya aur bilkul comfort raha. Doctor saab ne pehle sab kuch ache se samjhaya. Fees bhi bilkul genuine hai. Very happy with RedCity Dental, South Model Gram.",
    alternates: [
      "Got my dental implant done here with Dr. Arvind Sahu. Doctor bohot polite hain aur procedure ke time bilkul aaram raha. Model Gram Ludhiana me genuine dental care ke liye highly recommend.",
      "Bohot achha experience raha Dr. Arvind Sahu ke saath. Implant ki planning aur fitting bohot badhiya hui. Honest doctor aur saaf-suthra clinic.",
    ],
  },
  {
    id: "crowns",
    label: "Crown or Cap",
    emoji: "👑",
    baseReview:
      "Purana tooth cap replace karwaya Dr. Arvind Sahu sir se. Zirconia crown ki fitting ekdum natural aayi hai, khana khane me koi dikkat nahi. Fees bhi upfront clear batayi thi.",
    alternates: [
      "Dr. Arvind Sahu gave genuine advice for my broken tooth cap. Crown lagwane ke baad biting bilkul normal hai. Very calm and polite doctor in South Model Gram Ludhiana.",
      "Ache se check karke cap lagayi Dr. Sahu ne. Fitting aur shade natural lag raha hai. Cooperative staff aur clean clinic.",
    ],
  },
  {
    id: "cleaning",
    label: "Teeth Cleaning",
    emoji: "✨",
    baseReview:
      "Teeth cleaning and scaling karwayi RedCity Dental me. Dr. Arvind Sahu ne bohot aaram se cleaning kari, teeth bilkul clean aur smooth lag rahe hain. Fixed genuine fees aur clean clinic.",
    alternates: [
      "Routine dental cleaning karwayi Dr. Arvind Sahu sir se. Unhone daily brushing habits bhi ache se samjhayi. South Model Gram me bohot accha clinic hai.",
      "Bohot aaram se cleaning hui, teeth clean feel ho rahe hain. Dr. Sahu treats patients with a lot of patience.",
    ],
  },
  {
    id: "root-canal",
    label: "Root Canal",
    emoji: "⚡",
    baseReview:
      "Daant me kafi dard tha, Dr. Arvind Sahu sir ne single visit me root canal kiya. Treatment ke baad dard me kafi aaram mila. Bohot tasalli se treatment karte hain South Model Gram me.",
    alternates: [
      "Mujhe root canal se kafi dar lag raha tha par Dr. Arvind Sahu ne bohot aaram se kar diya. Pure treatment me bilkul comfort raha. Thank you Dr. Sahu!",
      "Dr. Arvind Sahu did my RCT and crown. Har step pe pehle bataya kya kar rahe hain. South Model Gram me honest aur skilled doctor.",
    ],
  },
  {
    id: "dentures",
    label: "Dentures",
    emoji: "👴",
    baseReview:
      "Mummy ke liye dentures banwaye Dr. Arvind Sahu sir se. Measurement bohot dhyan se liya aur ab khana khane me unko koi dikkat nahi hoti. Bohot respectful aur patient doctor hain.",
    alternates: [
      "Consulted Dr. Arvind Sahu for my father's denture fitting. Fitting bohot achhi aayi hai aur chewing comfortable hai. RedCity Dental Ludhiana me genuine prosthodontist.",
    ],
  },
  {
    id: "veneers",
    label: "Smile Fix / Veneers",
    emoji: "💎",
    baseReview:
      "Front teeth ke stains ke liye Dr. Arvind Sahu se consult kiya. Unhone daant ko zyada grind kiye bina natural treatment suggest kiya. Smile natural lag rahi hai ab. Helpful nature hai doctor ka.",
    alternates: [
      "Dr. Arvind Sahu ne smile correction bohot achhi tarah kiya. Shade matching ekdum natural hai aur clinical advice bohot honest thi.",
    ],
  },
  {
    id: "checkup",
    label: "Check-up / Consult",
    emoji: "🩺",
    baseReview:
      "Routine dental check-up ke liye gaya tha. Dr. Arvind Sahu sir ne digital X-ray dekh kar sab kuch explain kiya aur koi faltu treatment suggest nahi kiya. Honest doctor in Ludhiana.",
    alternates: [
      "Dr. Arvind Sahu is very humble and gives honest consultation. Kabhi unnecessary procedure push nahi karte. South Model Gram Ludhiana me bohot accha clinic hai.",
    ],
  },
];

interface HighlightTag {
  id: string;
  label: string;
  phrase: string;
}

const HIGHLIGHT_TAGS: HighlightTag[] = [
  { id: "gentle", label: "Aaram se treatment", phrase: " Bohot aaram se treatment kiya." },
  { id: "pricing", label: "Genuine fees", phrase: " Fees bilkul genuine aur upfront clear hai." },
  { id: "explanation", label: "Ache se samjhaya", phrase: " Har cheez pehle tasalli se samjhayi." },
  { id: "clean", label: "Clean clinic", phrase: " Clinic bilkul saaf aur hygienic hai." },
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
            Tap your treatment to load a suggested review note:
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
            2. Kuch aur add karna hai? <span className="font-normal text-brand-muted">(Optional)</span>
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

          {/* Review Text Container - No Quotation Marks */}
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
                    (5 Stars)
                  </span>
                </div>
                <p className="whitespace-pre-line text-brand-ink select-all">
                  {reviewText}
                </p>
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
              <span>{hasCopied ? "Copied! Opening Google Maps..." : "Copy & Open Google Review"}</span>
            </div>
            <span className="mt-0.5 font-body text-[11px] text-white/80">
              {hasCopied
                ? "Google Maps me jaakar Paste aur Post karein"
                : "Click 2: Opens Google Maps review form directly"}
            </span>
          </button>

          {/* Quick 3-Step Guide */}
          <div className="mt-4 rounded-xl bg-brand-warm/60 p-3 text-[11px] font-body text-brand-muted">
            <div className="font-semibold text-brand-ink mb-1.5">Google Maps me 3 aasan steps:</div>
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
