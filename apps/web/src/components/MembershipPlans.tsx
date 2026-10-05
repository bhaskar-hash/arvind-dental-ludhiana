"use client";

import { useId, useState } from "react";
import { TERMS, plans, formatRupees, type Term, type PlanId } from "@/lib/pricing";
import { whatsappLink } from "@/lib/business";

export function TermPicker({
  term,
  onChange,
  label = "Membership length",
}: {
  term: Term;
  onChange: (term: Term) => void;
  label?: string;
}) {
  const name = useId();
  return (
    <fieldset>
      <legend className="sr-only">{label}</legend>
      <div className="grid grid-cols-3 gap-1 rounded-2xl bg-black/5 p-1 sm:inline-grid sm:auto-cols-auto">
        {TERMS.map((t) => {
          const on = term === t;
          return (
            <label
              key={t}
              className={`relative flex min-h-[48px] cursor-pointer flex-col items-center justify-center gap-0.5 rounded-xl px-3 py-1.5 text-center font-body text-sm font-semibold transition-colors focus-within:ring-2 focus-within:ring-brand-gold sm:flex-row sm:gap-2 sm:px-4 ${
                on
                  ? "bg-brand-red text-white shadow-md shadow-brand-red/25"
                  : "text-brand-black/70 hover:text-brand-black"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={t}
                checked={on}
                onChange={() => onChange(t)}
                className="sr-only"
              />
              {t} months
              {t === 12 ? (
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                    on ? "bg-white/20 text-white" : "bg-brand-red/10 text-brand-red"
                  }`}
                >
                  Best value
                </span>
              ) : null}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function whatsappFor(planName: string, term: Term) {
  return whatsappLink(`Hi, I'd like to know more about the ${planName} membership for ${term} months.`);
}

const Check = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.4}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    className="mt-0.5 shrink-0 text-[#0B7A55]"
  >
    <path d="m5 12 5 5 9-10" />
  </svg>
);

const PLAN_ICONS: Record<PlanId, React.ReactElement> = {
  basic: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  advanced: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.5 2.5L16 9" />
    </svg>
  ),
  pro: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 9l3 3 5-6 5 6 3-3-1.5 9h-13L4 9Z" />
      <path d="M6.5 18h11" strokeWidth={1.2} />
    </svg>
  ),
  family: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

export function MembershipPlans() {
  const [term, setTerm] = useState<Term>(12);

  return (
    <div>
      <TermPicker term={term} onChange={setTerm} />

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => {
          const price = plan.price[term];
          const family = plan.id === "family";
          return (
            <article
              key={plan.id}
              className={`flex flex-col rounded-2xl p-6 ${
                family
                  ? "bg-brand-band text-white"
                  : "bg-white border border-black/10 shadow-lg shadow-black/5"
              }`}
            >
              <span
                className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${
                  family ? "bg-white/15 text-brand-gold" : "bg-brand-blush text-brand-red"
                }`}
              >
                {PLAN_ICONS[plan.id]}
              </span>
              <h3 className="font-headline text-xl font-bold">{plan.name}</h3>
              <p className={`font-body text-sm mt-1 ${family ? "text-white/70" : "opacity-60"}`}>

                {plan.suits}
              </p>

              <p className="mt-5 font-headline text-4xl font-extrabold leading-none">
                {formatRupees(price)}
              </p>
              <p className={`font-body text-sm mt-2 ${family ? "text-white/70" : "opacity-60"}`}>
                for {term} months · about {formatRupees(price / term)} a month
              </p>

              <ul className="mt-5 flex flex-col gap-2.5 font-body text-sm">
                {plan.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5">
                    <Check />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {plan.family ? (
                <p className="mt-4 font-body text-xs text-white/70">
                  Extra family member: {formatRupees(plan.family.extraMember[term])} for{" "}
                  {term} months
                </p>
              ) : null}

              <div className="mt-auto pt-6">
                <a
                  href={whatsappFor(plan.name, term)}
                  className={`flex min-h-[48px] items-center justify-center rounded-xl px-4 font-body text-sm font-semibold transition-colors ${
                    family
                      ? "bg-brand-gold text-brand-black hover:bg-brand-gold/90"
                      : "border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white"
                  }`}
                >
                  Ask about {plan.name}
                </a>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-1.5 font-body text-xs opacity-60">
        <p>
          *Larger discounts on crowns, bridges, dentures and implants apply to 6 and
          12-month memberships. Discounts apply to the clinic&apos;s fees; lab work and
          implant parts are charged at the normal price.
        </p>
        <p>This is a membership plan, not dental insurance.</p>
      </div>
    </div>
  );
}
