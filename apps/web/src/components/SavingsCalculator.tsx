"use client";

import { useId, useMemo, useState } from "react";
import {
  compareOptions,
  formatRupees,
  quickAddMajor,
  routinePerTerm,
  type Term,
} from "@/lib/pricing";
import { TermPicker } from "@/components/MembershipPlans";

function Stepper({
  label,
  hint,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}) {
  const id = useId();
  const btn =
    "flex h-11 w-11 items-center justify-center rounded-xl border border-black/15 bg-white text-lg font-semibold text-brand-black transition-colors hover:border-brand-red hover:text-brand-red disabled:opacity-30 disabled:hover:border-black/15 disabled:hover:text-brand-black";
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p id={id} className="font-body text-sm font-semibold">
          {label}
        </p>
        {hint ? <p className="font-body text-xs opacity-60">{hint}</p> : null}
      </div>
      <div role="group" aria-labelledby={id} className="flex items-center gap-3">
        <button
          type="button"
          className={btn}
          aria-label={`Fewer ${label.toLowerCase()}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
        >
          −
        </button>
        <output aria-live="polite" className="w-6 text-center font-headline text-xl font-bold">
          {value}
        </output>
        <button
          type="button"
          className={btn}
          aria-label={`More ${label.toLowerCase()}`}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
        >
          +
        </button>
      </div>
    </div>
  );
}

function RupeeInput({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="font-body text-sm font-semibold">
        {label}
      </label>
      <p className="font-body text-xs opacity-60">{hint}</p>
      <div className="mt-2 flex items-center rounded-xl border-[1.5px] border-black/15 bg-white focus-within:border-brand-red focus-within:ring-2 focus-within:ring-brand-red/15">
        <span className="pl-4 font-body text-base opacity-60" aria-hidden>
          ₹
        </span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="0"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, "").slice(0, 7))}
          className="min-h-[48px] w-full rounded-xl bg-transparent px-2 font-body text-base outline-none"
        />
      </div>
    </div>
  );
}

const toNumber = (v: string) => Number(v) || 0;

export function SavingsCalculator() {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [term, setTerm] = useState<Term>(12);
  const [routine, setRoutine] = useState(true);
  const [general, setGeneral] = useState("");
  const [major, setMajor] = useState("");
  const routineId = useId();

  const rows = useMemo(
    () =>
      compareOptions({
        adults,
        children,
        term,
        routine,
        generalTreatment: toNumber(general),
        majorTreatment: toNumber(major),
      }),
    [adults, children, term, routine, general, major],
  );

  const best = rows.reduce((a, b) => (b.total < a.total ? b : a));
  const maxTotal = Math.max(...rows.map((r) => r.total), 1);
  const visits = routinePerTerm[term];
  const people = adults + children;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start">
      {/* Inputs */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-6 rounded-2xl border border-black/10 bg-white p-6 shadow-lg shadow-black/5"
      >
        <div className="flex flex-col gap-4">
          <p className="font-headline text-lg font-bold">Who&apos;s covered?</p>
          <Stepper label="Adults" value={adults} min={1} max={8} onChange={setAdults} />
          <Stepper
            label="Children"
            hint="Under 18"
            value={children}
            min={0}
            max={8}
            onChange={setChildren}
          />
        </div>

        <div className="flex flex-col gap-3 border-t border-black/10 pt-5">
          <p className="font-headline text-lg font-bold">For how long?</p>
          <TermPicker term={term} onChange={setTerm} label="Period to compare" />
        </div>

        <div className="flex flex-col gap-5 border-t border-black/10 pt-5">
          <p className="font-headline text-lg font-bold">What care do you expect?</p>

          <label htmlFor={routineId} className="flex cursor-pointer items-start gap-3">
            <input
              id={routineId}
              type="checkbox"
              checked={routine}
              onChange={(e) => setRoutine(e.target.checked)}
              className="mt-0.5 h-5 w-5 shrink-0 accent-brand-red"
            />
            <span className="font-body text-sm">
              <span className="font-semibold">Regular check-ups and cleanings</span>
              <span className="block text-xs opacity-60">
                Per person: {visits.checkups} check-up{visits.checkups > 1 ? "s" : ""}
                {visits.cleanings
                  ? `, ${visits.cleanings} cleaning${visits.cleanings > 1 ? "s" : ""}`
                  : ""}{" "}
                and {visits.xrays} X-ray{visits.xrays > 1 ? "s" : ""} in {term} months
              </span>
            </span>
          </label>

          <RupeeInput
            label="Fillings, root canals, extractions"
            hint="Total for everyone, from your treatment estimate if you have one"
            value={general}
            onChange={setGeneral}
          />

          <div>
            <RupeeInput
              label="Crowns, bridges, dentures, implants"
              hint="Total for everyone"
              value={major}
              onChange={setMajor}
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {quickAddMajor.map((q) => (
                <button
                  key={q.label}
                  type="button"
                  onClick={() => setMajor(String(toNumber(major) + q.amount))}
                  className="min-h-[36px] rounded-full border border-brand-red/30 bg-brand-red/5 px-3 font-body text-xs font-semibold text-brand-red hover:bg-brand-red/10"
                >
                  + {q.label} from {formatRupees(q.amount)}
                </button>
              ))}
              {toNumber(major) > 0 ? (
                <button
                  type="button"
                  onClick={() => setMajor("")}
                  className="min-h-[36px] rounded-full px-3 font-body text-xs font-semibold opacity-60 hover:opacity-100"
                >
                  Clear
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </form>

      {/* Results */}
      <div className="flex flex-col gap-4">
        <div
          aria-live="polite"
          className={`rounded-2xl p-6 ${
            best.id === "none" ? "bg-[#F2EFEE] text-brand-black" : "bg-brand-band text-white"
          }`}
        >
          {best.id === "none" ? (
            <>
              <p className="font-body text-xs font-bold uppercase tracking-[0.14em] opacity-60">
                Our honest answer
              </p>
              <p className="mt-2 font-headline text-2xl font-bold">
                Paying as you go is cheapest for this.
              </p>
              <p className="mt-2 font-body text-sm opacity-75">
                A membership wouldn&apos;t save you money on this care. If your needs change,
                you can join at any time.
              </p>
            </>
          ) : (
            <>
              <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-brand-gold">
                Best for {people === 1 ? "you" : "your family"}
              </p>
              <p className="mt-2 font-headline text-2xl font-bold">
                {best.name} saves you {formatRupees(best.saving)}
              </p>
              <p className="mt-2 font-body text-sm text-white/75">
                over {term} months, compared with paying as you go for the same care.
              </p>
            </>
          )}
        </div>

        <ul className="flex flex-col gap-3">
          {rows.map((r) => {
            const isBest = r.id === best.id;
            return (
              <li
                key={r.id}
                className={`rounded-2xl border bg-white p-4 ${
                  isBest ? "border-brand-red ring-2 ring-brand-red/20" : "border-black/10"
                }`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="font-body font-semibold">
                    {r.name}
                    {isBest ? (
                      <span className="ml-2 rounded-full bg-brand-red px-2 py-0.5 text-[11px] font-bold text-white">
                        Cheapest
                      </span>
                    ) : null}
                  </p>
                  <p className="font-headline text-lg font-bold">{formatRupees(r.total)}</p>
                </div>
                <div className="mt-2 h-2 rounded-full bg-black/5" aria-hidden>
                  <div
                    className={`h-2 rounded-full ${isBest ? "bg-brand-red" : "bg-black/25"}`}
                    style={{ width: `${(r.total / maxTotal) * 100}%` }}
                  />
                </div>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 font-body text-xs">
                  <span className="opacity-60">
                    {r.id === "none"
                      ? `Visits ${formatRupees(r.routine)} · Treatment ${formatRupees(r.treatment)}`
                      : `Membership ${formatRupees(r.fees)} · Visits ${formatRupees(r.routine)} · Treatment ${formatRupees(r.treatment)}`}
                  </span>
                  {r.id === "none" ? null : r.saving > 0 ? (
                    <span className="font-semibold text-[#0B7A55]">
                      Saves {formatRupees(r.saving)}
                    </span>
                  ) : r.saving < 0 ? (
                    <span className="font-semibold opacity-60">
                      Costs {formatRupees(-r.saving)} more
                    </span>
                  ) : (
                    <span className="font-semibold opacity-60">Same cost</span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        <p className="font-body text-xs opacity-60">
          Estimates using the clinic&apos;s standard fees and the member discounts shown above.
          Your actual treatment and its cost are confirmed only after an examination. This is a
          membership plan, not dental insurance.
        </p>
      </div>
    </div>
  );
}
