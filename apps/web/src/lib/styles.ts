/** Shared class strings from the design canvas style guide. */

export const container = "mx-auto max-w-6xl px-6";

export const eyebrow =
  "font-body text-[13px] font-bold uppercase tracking-[0.14em] text-brand-red mb-3";

export const h1 =
  "font-headline font-extrabold text-[clamp(2.4rem,5vw,4rem)] leading-[1.05] tracking-[-0.02em] text-brand-ink";

export const h2 =
  "font-headline font-extrabold text-[clamp(1.85rem,3.4vw,2.75rem)] leading-[1.12] tracking-[-0.01em] text-brand-ink";

export const lead = "font-body text-lg text-brand-muted mt-4 max-w-2xl";

const btnBase =
  "inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-xl px-6 font-body text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2";

export const btn = {
  primary: `${btnBase} bg-brand-red text-white hover:bg-brand-red-dark`,
  outline: `${btnBase} border-[1.5px] border-brand-red bg-white text-brand-red hover:bg-brand-red hover:text-white`,
  wa: `${btnBase} bg-brand-wa text-white hover:brightness-110`,
  /** On red or dark grounds. */
  white: `${btnBase} bg-white font-bold text-brand-red hover:bg-brand-warm`,
  whiteOutline: `${btnBase} border-[1.5px] border-white text-white hover:bg-white/10`,
  gold: `${btnBase} bg-brand-gold font-bold text-brand-maroon hover:bg-brand-gold-light`,
};

export const card = "rounded-[20px] border border-brand-line bg-white";

export const field =
  "min-h-[52px] w-full rounded-xl border-[1.5px] border-[#D9CBC8] bg-white px-4 font-body text-base text-brand-ink outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/15";
