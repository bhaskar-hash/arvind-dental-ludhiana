import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DraftBanner } from "@/components/DraftBanner";
import { business } from "@/lib/business";
import {
  implantWarranties,
  policiesApproved,
  policiesLastUpdated,
  refundWorkingDays,
  rescheduleNoticeHours,
  warrantyCheckupMonths,
} from "@/lib/policies";

export const metadata: Metadata = {
  title: "Patient Policies — Implant Warranty, Refunds & Appointments",
  description: `Implant warranty (5-year, 10-year and lifetime), rescheduling, refunds and treatment-plan changes at ${business.name}, ${business.addressLocality}.`,
  alternates: { canonical: `${business.siteUrl}/policies` },
  robots: policiesApproved ? undefined : { index: false, follow: false },
};

const SECTIONS = [
  { id: "implant-warranty", label: "Implant warranty" },
  { id: "rescheduling", label: "Rescheduling" },
  { id: "refunds", label: "Refunds" },
  { id: "plan-changes", label: "If your plan changes" },
];

const H2 = "font-headline text-2xl sm:text-3xl font-bold scroll-mt-24";
const P = "font-body text-base opacity-80 mt-3";

function Tick() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="mt-0.5 shrink-0 text-[#0B7A55]">
      <path d="m5 12 5 5 9-10" />
    </svg>
  );
}

function Cross() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="mt-0.5 shrink-0 text-brand-red">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function Shield() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default function PoliciesPage() {
  return (
    <main>
      {policiesApproved ? null : (
        <DraftBanner>
          These terms are proposals and are not yet offered to patients. This page is hidden
          from search engines and menus until approved.
        </DraftBanner>
      )}

      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Patient policies", path: "/policies" },
        ]}
      />

      <header className="px-6 pt-10 pb-8 max-w-3xl mx-auto">
        <p className="font-body text-brand-red font-bold text-xs tracking-[0.16em] uppercase">
          Patient policies
        </p>
        <h1 className="font-headline text-4xl sm:text-5xl font-bold mt-3 leading-tight">
          Our promises to you, in plain words
        </h1>
        <p className="font-body text-lg opacity-75 mt-4">
          Your implant warranty, changing an appointment, refunds, and what happens if your
          treatment plan changes.
        </p>
        <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="inline-flex min-h-[40px] items-center rounded-full border border-black/15 px-4 font-body text-sm font-semibold hover:border-brand-red hover:text-brand-red"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </header>

      {/* Implant warranty */}
      <section id="implant-warranty" className="px-6 py-12 bg-[#fbf6f5] scroll-mt-16">
        <div className="max-w-3xl mx-auto">
          <h2 className={H2}>Implant warranty</h2>
          <p className={P}>
            Every implant Dr. Sahu places comes with a written warranty. How long it lasts
            depends on the implant option you choose together; your warranty is written on your
            treatment plan.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {implantWarranties.map((w) => (
              <div
                key={w.id}
                className={`rounded-2xl p-5 ${
                  w.id === "lifetime"
                    ? "bg-brand-band text-white"
                    : "bg-white border border-black/10"
                }`}
              >
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${
                    w.id === "lifetime" ? "bg-brand-gold text-brand-black" : "bg-brand-red/10 text-brand-red"
                  }`}
                >
                  <Shield />
                </span>
                <h3 className="font-headline text-lg font-bold mt-4">{w.label}</h3>
                <p
                  className={`font-body text-sm mt-1 ${
                    w.id === "lifetime" ? "text-white/75" : "opacity-70"
                  }`}
                >
                  {w.period}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white border border-black/10 p-6">
              <h3 className="font-headline text-lg font-bold">What&apos;s covered</h3>
              <ul className="mt-4 flex flex-col gap-3 font-body text-sm">
                <li className="flex gap-3">
                  <Tick />
                  <span>
                    <strong className="font-semibold">Implant failure.</strong> If your implant
                    loosens or does not bond with the bone during your warranty period, we
                    replace the implant and place it again at no charge.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Tick />
                  <span>
                    If a new crown or abutment is also needed, Dr. Sahu explains the cost
                    before starting, so there are no surprises.
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl bg-white border border-black/10 p-6">
              <h3 className="font-headline text-lg font-bold">What&apos;s not covered</h3>
              <ul className="mt-4 flex flex-col gap-3 font-body text-sm">
                <li className="flex gap-3">
                  <Cross />
                  <span>
                    <strong className="font-semibold">Breakage of the implant.</strong> If the
                    implant breaks, its repair or replacement is not covered by the warranty.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Cross />
                  <span>
                    <strong className="font-semibold">Failure from poor oral hygiene.</strong>{" "}
                    If the implant fails because it was not kept clean, for example gum
                    infection around the implant caused by plaque build-up, the warranty does
                    not apply.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <h3 className="font-headline text-xl font-bold mt-10">Keeping your warranty valid</h3>
          <p className={P}>
            Brush and clean around your implant as Dr. Sahu shows you, and come for a check-up
            and professional cleaning at least every {warrantyCheckupMonths} months. These
            visits catch problems early and keep a record that your implant has been looked
            after.
          </p>

          <h3 className="font-headline text-xl font-bold mt-8">How a failure is assessed</h3>
          <p className={P}>
            Dr. Sahu examines the implant, takes X-rays and photos, and explains what he finds
            and why, including whether the warranty applies. You can ask for his findings in
            writing.
          </p>

          <h3 className="font-headline text-xl font-bold mt-8">How to make a claim</h3>
          <ol className="mt-4 flex flex-col gap-3 font-body text-base">
            {[
              <>
                Contact us as soon as your implant feels loose, painful or different:{" "}
                <a href={`tel:${business.telephone}`} className="font-semibold text-brand-red">
                  {business.telephoneDisplay}
                </a>{" "}
                or WhatsApp.
              </>,
              <>Bring your treatment plan, which shows your implant option and warranty.</>,
              <>
                Dr. Sahu examines it. If the warranty applies, we plan the replacement at no
                charge.
              </>,
            ].map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-red font-body text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="opacity-85 pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Rescheduling */}
      <section id="rescheduling" className="px-6 py-12 scroll-mt-16">
        <div className="max-w-3xl mx-auto">
          <h2 className={H2}>Rescheduling and cancelling</h2>
          <ul className="mt-5 flex flex-col gap-3 font-body text-base">
            <li className="flex gap-3">
              <Tick />
              <span className="opacity-85">
                Need a different time? Call or WhatsApp at least {rescheduleNoticeHours} hours
                before. There&apos;s no charge to reschedule with notice.
              </span>
            </li>
            <li className="flex gap-3">
              <Tick />
              <span className="opacity-85">
                Running late? Let us know and we&apos;ll still see you if we can, or offer the
                next available time.
              </span>
            </li>
            <li className="flex gap-3">
              <Tick />
              <span className="opacity-85">
                Longer appointments, such as implant surgery, are set aside just for you, so
                please give as much notice as you can.
              </span>
            </li>
            <li className="flex gap-3">
              <Tick />
              <span className="opacity-85">
                If we ever need to move your appointment, we&apos;ll tell you as early as
                possible and offer the next available time.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Refunds */}
      <section id="refunds" className="px-6 py-12 bg-[#fbf6f5] scroll-mt-16">
        <div className="max-w-3xl mx-auto">
          <h2 className={H2}>Refunds</h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-black/10 bg-white">
            <table className="w-full min-w-[520px] border-collapse text-left font-body text-sm">
              <thead>
                <tr className="bg-[#fbf6f5]">
                  <th scope="col" className="px-5 py-3 font-semibold">If you…</th>
                  <th scope="col" className="px-5 py-3 font-semibold">What happens</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-black/10">
                  <th scope="row" className="px-5 py-4 align-top font-semibold">
                    Paid for treatment that hasn&apos;t started
                  </th>
                  <td className="px-5 py-4 opacity-80">
                    Cancel before it starts and we refund it in full, minus any lab work
                    already ordered for you, such as a custom crown or denture.
                  </td>
                </tr>
                <tr className="border-t border-black/10">
                  <th scope="row" className="px-5 py-4 align-top font-semibold">
                    Stop treatment that&apos;s done in stages
                  </th>
                  <td className="px-5 py-4 opacity-80">
                    You pay only for the stages completed and lab work already ordered.
                    Anything paid beyond that is refunded.
                  </td>
                </tr>
                <tr className="border-t border-black/10">
                  <th scope="row" className="px-5 py-4 align-top font-semibold">
                    Had a consultation or completed treatment
                  </th>
                  <td className="px-5 py-4 opacity-80">
                    Fees for consultations and treatment already done are not refundable.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={P}>
            Refunds go back to the way you paid, within {refundWorkingDays} working days.
          </p>
        </div>
      </section>

      {/* Plan changes */}
      <section id="plan-changes" className="px-6 py-12 scroll-mt-16">
        <div className="max-w-3xl mx-auto">
          <h2 className={H2}>If your treatment plan changes</h2>
          <p className={P}>
            Sometimes Dr. Sahu finds something new once treatment has started. When that
            happens:
          </p>
          <ul className="mt-5 flex flex-col gap-3 font-body text-base">
            {[
              "Nothing extra is done without your agreement. He explains what he found, your options and the cost first.",
              "If the cost changes, you get a revised estimate in writing before going ahead.",
              "If the new plan costs less, you pay less. Anything paid in advance is adjusted or refunded.",
              "You can pause, or ask for a second opinion, before agreeing to a change.",
              "If you decide to stop partway, we make the tooth safe first, for example with a temporary filling or crown, and you pay only for what has been done.",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <Tick />
                <span className="opacity-85">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto rounded-2xl bg-brand-band text-white p-6 sm:p-8">
          <p className="font-headline text-xl font-bold">Questions about these policies?</p>
          <p className="font-body text-sm text-white/75 mt-2">
            Call or WhatsApp{" "}
            <a href={`tel:${business.telephone}`} className="font-semibold text-white underline">
              {business.telephoneDisplay}
            </a>
            , or ask at the front desk. See also{" "}
            <Link href="/cost-and-payment" className="font-semibold text-white underline">
              Cost &amp; Payment
            </Link>
            .
          </p>
          <p className="font-body text-xs text-white/60 mt-4">
            These policies do not limit your rights under the Consumer Protection Act, 2019.
            Last updated {policiesLastUpdated}.
          </p>
        </div>
      </section>
    </main>
  );
}
