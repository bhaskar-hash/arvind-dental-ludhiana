"use client";

import { useId, useState } from "react";
import { Icon } from "@/components/Icon";
import { beforeAfterCredit, type BeforeAfterCase } from "@/lib/site";

function CasePhoto({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    <picture>
      <source srcSet={`${src}.webp`} type="image/webp" />
      <img src={`${src}.jpg`} alt={alt} draggable={false} className={className} />
    </picture>
  );
}

/** Drag-to-compare slider. Only ever given real cases Dr. Sahu has approved. */
export function BeforeAfter({ cases }: { cases: BeforeAfterCase[] }) {
  const [index, setIndex] = useState(0);
  const [split, setSplit] = useState(50);
  const id = useId();
  if (!cases.length) return null;

  const c = cases[index];
  const pick = (i: number) => {
    setIndex((i + cases.length) % cases.length);
    setSplit(50);
  };

  return (
    <div className="mx-auto max-w-[860px]">
      {cases.length > 1 ? (
        <div role="tablist" aria-label="Choose a case" className="mb-5 flex flex-wrap justify-center gap-2">
          {cases.map((x, i) => (
            <button
              key={x.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              onClick={() => pick(i)}
              className={`min-h-[40px] rounded-full px-4 font-body text-sm font-semibold transition-colors ${
                i === index
                  ? "bg-brand-red text-white"
                  : "border-[1.5px] border-brand-line bg-white text-brand-ink hover:border-brand-red"
              }`}
            >
              {x.treatment}
            </button>
          ))}
        </div>
      ) : null}

      <div className="relative aspect-[4/3] select-none overflow-hidden rounded-3xl bg-brand-blush">
        <CasePhoto src={c.after.src} alt={c.after.alt} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
          <CasePhoto src={c.before.src} alt={c.before.alt} className="h-full w-full object-cover" />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-brand-ink px-3 py-1.5 font-body text-[13px] font-bold text-white">
          Before
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-brand-red px-3 py-1.5 font-body text-[13px] font-bold text-white">
          After
        </span>
        <div className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-white" style={{ left: `${split}%` }} aria-hidden />
        <span
          className="pointer-events-none absolute top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-red shadow-lg"
          style={{ left: `${split}%` }}
          aria-hidden
        >
          <Icon name="compare" size={24} strokeWidth={2.2} />
        </span>
        <label htmlFor={id} className="sr-only">
          Drag to compare before and after: {c.treatment}
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={split}
          onChange={(e) => setSplit(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>

      <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-[1_1_320px]">
          <p className="font-body text-[17px] font-bold">{c.treatment}</p>
          <p className="font-body text-[15px] text-brand-muted">{c.detail}</p>
        </div>
        {cases.length > 1 ? (
          <div className="flex items-center gap-2.5">
            <span className="font-body text-sm text-brand-muted" aria-live="polite">
              {index + 1} of {cases.length}
            </span>
            <button type="button" onClick={() => pick(index - 1)} aria-label="Previous case" className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-brand-line bg-white">
              <Icon name="arrowLeft" size={18} strokeWidth={2.2} />
            </button>
            <button type="button" onClick={() => pick(index + 1)} aria-label="Next case" className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-red text-white">
              <Icon name="arrow" size={18} strokeWidth={2.2} />
            </button>
          </div>
        ) : null}
      </div>
      <p className="mt-3 font-body text-xs text-brand-muted">{beforeAfterCredit}</p>
    </div>
  );
}
