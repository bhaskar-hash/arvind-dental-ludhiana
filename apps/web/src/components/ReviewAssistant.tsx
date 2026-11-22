"use client";

import { useState, useRef } from "react";
import { business } from "@/lib/business";
import { doctor } from "@/lib/doctor";

/* ─────────────────────────────────────────────────────────────────────────────
 * RedCity Dental Care — Google Review Experience
 *
 * Complies with:
 * 1. Google Business Profile Review Policy:
 *    - Never gating or filtering reviews.
 *    - Never forcing or pre-selecting a 5-star rating.
 *    - Patient maintains 100% control over words, rating, and submission.
 *    - Direct link to Google Maps is primary and prominent.
 * 2. AGENTS.md / NMC Dental Regulations:
 *    - Zero banned praise words (best, No. 1, top, leading, advanced,
 *      world-class, affordable, cheapest, painless, guaranteed, 100%, zero,
 *      forever, instant, free).
 *    - Factual clinic details only (Dr. Arvind Sahu, MDS Prosthodontics,
 *      South Model Gram, Ludhiana).
 * ───────────────────────────────────────────────────────────────────────── */

interface TopicOption {
  id: string;
  label: string;
  emoji: string;
  starterText: string;
}

const TOPIC_OPTIONS: TopicOption[] = [
  {
    id: "implants",
    label: "Dental Implant",
    emoji: "🦷",
    starterText:
      "Dr. Arvind Sahu sir se dental implant karwaya. Procedure ke dauran kafi comfort raha aur doctor saab ne pehle sab kuch tasalli se samjhaya. Fees upfront clear thi. RedCity Dental, South Model Gram Ludhiana me achha experience raha.",
  },
  {
    id: "crowns",
    label: "Crown or Cap",
    emoji: "👑",
    starterText:
      "Tooth cap fitting karwayi Dr. Arvind Sahu sir se. Zirconia crown ki fitting natural aayi hai aur chewing me koi dikkat nahi. Fees aur procedure pehle clear bataya tha. South Model Gram Ludhiana.",
  },
  {
    id: "cleaning",
    label: "Teeth Cleaning",
    emoji: "✨",
    starterText:
      "Teeth cleaning and scaling karwayi RedCity Dental me. Dr. Arvind Sahu ne bohot aaram se cleaning kari aur daily brushing tips bhi samjhaye. Clean clinic aur genuine fees.",
  },
  {
    id: "root-canal",
    label: "Root Canal",
    emoji: "⚡",
    starterText:
      "Daant me dard tha, Dr. Arvind Sahu sir ne root canal kiya. Har step pe pehle explain kiya kya kar rahe hain. Treatment ke baad aaram mila. South Model Gram me skilled doctor hain.",
  },
  {
    id: "dentures",
    label: "Dentures",
    emoji: "👴",
    starterText:
      "Dentures ke liye Dr. Arvind Sahu sir se consult kiya. Measurement dhyan se liya aur fitting comfortable aayi hai. Bohot respectful aur patient doctor hain RedCity Dental Ludhiana me.",
  },
  {
    id: "veneers",
    label: "Smile Fix / Veneers",
    emoji: "💎",
    starterText:
      "Front teeth treatment ke liye Dr. Arvind Sahu se consult kiya. Unhone daant ko zyada grind kiye bina natural treatment suggest kiya. Advice bohot honest thi.",
  },
  {
    id: "checkup",
    label: "Check-up / Consult",
    emoji: "🩺",
    starterText:
      "Routine dental check-up ke liye gaya tha. Dr. Arvind Sahu sir ne X-ray dekh kar sab kuch ache se explain kiya aur koi faltu treatment suggest nahi kiya. Honest consultation in Ludhiana.",
  },
];

const PROMPT_QUESTIONS = [
  "What treatment or procedure did you receive?",
  "How was your consultation with Dr. Sahu?",
  "Were the treatment steps and fees clearly explained?",
  "How was the clinic comfort and atmosphere?",
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
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [reviewText, setReviewText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [showAssistant, setShowAssistant] = useState<boolean>(false);
  const assistantRef = useRef<HTMLDivElement>(null);

  const directGoogleReviewUrl = business.googleWriteReviewUrl;

  // Handle direct launch
  function handleOpenDirectGoogle() {
    window.open(directGoogleReviewUrl, "_blank", "noopener,noreferrer");
  }

  // Handle selecting an open-ended topic starter
  function handleSelectTopic(topic: TopicOption) {
    setSelectedTopicId(topic.id);
    setReviewText(topic.starterText);
    setCopied(false);
  }

  // Handle copying review text
  function handleCopyText() {
    if (!reviewText.trim()) return;
    copyToClipboard(reviewText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  // Handle copying and opening Google Review
  function handleCopyAndOpenGoogle() {
    if (reviewText.trim()) {
      copyToClipboard(reviewText);
      setCopied(true);
    }
    window.open(directGoogleReviewUrl, "_blank", "noopener,noreferrer");
  }

  function toggleAssistant() {
    const nextState = !showAssistant;
    setShowAssistant(nextState);
    if (nextState) {
      setTimeout(() => {
        assistantRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }

  return (
    <div className="mx-auto max-w-xl px-3 sm:px-0">
      {/* ── Clinic Header Banner ── */}
      <div className="mb-5 overflow-hidden rounded-3xl border border-brand-line bg-white p-6 shadow-sm text-center">
        <div className="flex items-center justify-center gap-3.5">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gold font-headline font-black text-brand-maroon text-xl shadow-sm">
            RC
          </span>
          <div className="text-left">
            <h1 className="font-headline text-lg sm:text-xl font-bold text-brand-ink leading-tight">
              {business.name}
            </h1>
            <p className="font-body text-xs text-brand-muted mt-0.5">
              {doctor.name} · {doctor.credentialsShort} · South Model Gram, Ludhiana
            </p>
          </div>
        </div>

        <p className="mt-4 text-xs font-body text-brand-muted border-t border-brand-line/60 pt-3">
          Your honest review helps other patients in Ludhiana find reliable dental care.
        </p>
      </div>

      {/* ── PRIMARY ACTION: Direct 1-Tap Google Review ── */}
      <div className="overflow-hidden rounded-3xl border-2 border-brand-red/40 bg-gradient-to-b from-white to-brand-warm/60 p-6 sm:p-7 shadow-md text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blush px-3.5 py-1 font-body text-xs font-bold text-brand-red uppercase tracking-wider">
          Quick Review (1-Click)
        </span>

        <h2 className="mt-3 font-headline text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight">
          Write a Google Review
        </h2>
        <p className="mt-1.5 font-body text-xs sm:text-sm text-brand-muted max-w-md mx-auto">
          Tap below to open Google Maps directly and share your honest experience with Dr. Arvind Sahu.
        </p>

        <div className="mt-6">
          <a
            href={directGoogleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleOpenDirectGoogle}
            className="w-full inline-flex items-center justify-center gap-3 rounded-2xl bg-brand-red hover:bg-brand-red-dark py-4 px-6 text-white font-body text-base font-bold shadow-lg shadow-brand-red/25 transition-all active:scale-[0.98]"
          >
            <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
            </svg>
            <span>Write a Google Review</span>
          </a>
        </div>

        <p className="mt-3 font-body text-[11px] text-brand-muted">
          Opens Google Maps review form directly on your phone or computer.
        </p>
      </div>

      {/* ── DIVIDER / DISCOVERY FOR OPTIONAL ASSISTANT ── */}
      <div className="my-6 text-center">
        <div className="relative flex items-center justify-center">
          <div className="border-t border-brand-line w-full"></div>
          <span className="bg-brand-warm/50 px-4 font-body text-xs font-semibold text-brand-muted uppercase tracking-wider">
            OR
          </span>
          <div className="border-t border-brand-line w-full"></div>
        </div>

        <button
          type="button"
          onClick={toggleAssistant}
          className="mt-3 inline-flex items-center gap-2 rounded-full border border-brand-line bg-white px-5 py-2.5 font-body text-xs font-semibold text-brand-ink shadow-sm hover:border-brand-red/50 hover:text-brand-red transition-all"
        >
          <span>✍️</span>
          <span>{showAssistant ? "Hide Writing Assistant" : "Need help with ideas? Use our Review Assistant"}</span>
          <span>{showAssistant ? "▲" : "▼"}</span>
        </button>
      </div>

      {/* ── SECONDARY ACTION: Optional Review Assistant ── */}
      {showAssistant && (
        <div
          ref={assistantRef}
          className="rounded-3xl border border-brand-line bg-white p-6 shadow-sm transition-all"
        >
          <div className="flex items-center justify-between border-b border-brand-line/60 pb-3">
            <div>
              <span className="font-body text-[11px] font-bold text-brand-red uppercase tracking-wider">
                Optional Helper
              </span>
              <h3 className="font-headline text-lg font-bold text-brand-ink">
                Review Writing Assistant
              </h3>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedTopicId(null);
                setReviewText("");
                setCopied(false);
              }}
              className="text-xs font-body text-brand-muted hover:text-brand-ink underline"
            >
              Clear
            </button>
          </div>

          <p className="mt-3 font-body text-xs text-brand-muted">
            Tap a treatment to load a suggested starter note, or answer the prompts below in your own words. You can edit every word before copying.
          </p>

          {/* Open-Ended Topic Chips */}
          <div className="mt-4">
            <span className="block font-headline text-xs font-bold text-brand-ink mb-2">
              Select treatment for quick starter ideas:
            </span>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {TOPIC_OPTIONS.map((t) => {
                const isSelected = t.id === selectedTopicId;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleSelectTopic(t)}
                    className={`flex items-center gap-2 rounded-2xl px-3 py-2.5 text-left text-xs font-body transition-all active:scale-95 ${
                      isSelected
                        ? "border-2 border-brand-red bg-brand-blush/60 font-bold text-brand-red shadow-sm"
                        : "border border-brand-line bg-brand-warm/30 font-medium text-brand-ink hover:bg-white"
                    }`}
                  >
                    <span className="text-base shrink-0 leading-none">{t.emoji}</span>
                    <span className="truncate">{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Open-Ended Writing Prompts */}
          <div className="mt-5 rounded-2xl bg-brand-warm/60 p-3.5 border border-brand-line/60">
            <span className="block font-headline text-xs font-bold text-brand-ink mb-1.5">
              Open-ended questions to help guide you:
            </span>
            <ul className="space-y-1 font-body text-[11px] text-brand-muted list-disc list-inside">
              {PROMPT_QUESTIONS.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </div>

          {/* Editable Text Area */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="review-textarea" className="font-headline text-xs font-bold text-brand-ink">
                Your Review Text:
              </label>
              <span className="text-[11px] font-body text-brand-muted">
                Fully editable · You are in control
              </span>
            </div>
            <textarea
              id="review-textarea"
              value={reviewText}
              onChange={(e) => {
                setReviewText(e.target.value);
                setCopied(false);
              }}
              rows={5}
              placeholder="Write your honest thoughts here (in English, Hindi, or Hinglish)..."
              className="w-full rounded-2xl border-2 border-brand-line bg-white p-3.5 font-body text-xs text-brand-ink leading-relaxed outline-none focus:border-brand-red transition-colors"
            />
          </div>

          {/* Assistant Action Buttons */}
          <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={handleCopyText}
              disabled={!reviewText.trim()}
              className={`flex-1 inline-flex items-center justify-center gap-2 rounded-2xl py-3 px-4 font-body text-xs font-bold transition-all ${
                copied
                  ? "bg-[#0B7A55] text-white shadow-sm"
                  : reviewText.trim()
                  ? "border border-brand-line bg-brand-warm text-brand-ink hover:bg-white"
                  : "border border-brand-line/50 bg-gray-50 text-gray-400 cursor-not-allowed"
              }`}
            >
              <span>{copied ? "✓" : "📋"}</span>
              <span>{copied ? "Copied to Clipboard!" : "Copy Review Text"}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyAndOpenGoogle}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-red hover:bg-brand-red-dark py-3 px-4 font-body text-xs font-bold text-white shadow-md shadow-brand-red/20 transition-all active:scale-98"
            >
              <span>⭐</span>
              <span>{reviewText.trim() ? "Copy & Open Google" : "Open Google Reviews"}</span>
            </button>
          </div>

          {/* 3-Step Instruction for Google Maps */}
          <div className="mt-4 rounded-xl bg-brand-warm/60 p-3 text-[11px] font-body text-brand-muted">
            <span className="font-semibold text-brand-ink block mb-1">
              How to submit on Google Maps:
            </span>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-white p-1.5 border border-brand-line/40">
                <span className="font-bold text-brand-red block">1</span>
                Select your rating
              </div>
              <div className="rounded-lg bg-white p-1.5 border border-brand-line/40">
                <span className="font-bold text-brand-red block">2</span>
                Paste your text
              </div>
              <div className="rounded-lg bg-white p-1.5 border border-brand-line/40">
                <span className="font-bold text-brand-red block">3</span>
                Tap <strong>Post</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Policy & Ethical Transparency Notice ── */}
      <div className="mt-8 text-center px-4 font-body text-[11px] text-brand-muted">
        <p>
          Google Reviews are hosted directly on Google. You have full control over your feedback and star rating. RedCity Dental Care does not filter, alter, or incentivize reviews.
        </p>
      </div>

      {/* ── Clinic Staff Reception Link ── */}
      <div className="mt-4 text-center font-body text-xs text-brand-muted">
        <a
          href="/review/standee"
          className="text-brand-red underline hover:text-brand-ink"
        >
          Clinic Reception Counter Standee (Printable) →
        </a>
      </div>
    </div>
  );
}
