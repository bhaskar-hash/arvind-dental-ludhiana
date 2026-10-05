import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, buttonVariants } from "@redcity/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DraftBanner } from "@/components/DraftBanner";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { MembershipPlans } from "@/components/MembershipPlans";
import { Reveal } from "@/components/Reveal";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { business } from "@/lib/business";
import { formatRupees, payment, priceGuide, pricingApproved } from "@/lib/pricing";
import { buildFaqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Cost & Payment — Dental Prices, Membership Plans & Savings Calculator",
  description: `Clear dental prices at ${business.name}, ${business.addressLocality}: a price guide, membership plans for 3, 6 or 12 months, and a calculator showing whether a membership saves you money.`,
  alternates: { canonical: `${business.siteUrl}/cost-and-payment` },
  robots: pricingApproved ? undefined : { index: false, follow: false },
};

const EYEBROW = "font-body text-brand-red font-bold text-xs tracking-[0.16em] uppercase mb-3";
const H2 = "font-headline text-3xl sm:text-4xl font-bold leading-tight";

const COST_FAQS = [
  {
    question: "Can you tell me the price over the phone?",
    answer:
      "We can share starting prices, like those in the price guide. An exact figure needs an examination, because it depends on your teeth, gums and bone.",
  },
  {
    question: "Will the cost change once treatment starts?",
    answer:
      "You agree the plan and its cost before we begin. If something new comes up, Dr. Sahu explains it and your options first, and nothing extra is done without your agreement.",
  },
  {
    question: "Is a cheaper option always worse?",
    answer:
      "Not necessarily. A PFM crown, for example, is a good, strong choice for back teeth. Dr. Sahu tells you honestly where paying more makes a difference and where it doesn't.",
  },
  {
    question: "Is the membership dental insurance?",
    answer:
      "No. It's a prepaid membership: set visits are included and you pay member prices on treatment. It does not pay for treatment the way insurance does.",
  },
  {
    question: "Does my health insurance cover dental treatment?",
    answer:
      "Many health policies don't cover routine dental treatment, though some cover dental care after an accident or under an OPD add-on. Check your policy; we provide itemised bills and treatment records for your claim.",
  },
];

const PROMISES = [
  "A written estimate before treatment starts",
  "Every option explained, with its cost",
  "Nothing extra without your agreement",
];

const JUMP = [
  { href: "#prices", label: "Price guide" },
  { href: "#membership", label: "Membership plans" },
  { href: "#calculator", label: "Savings calculator" },
  { href: "#pay", label: "Ways to pay" },
];

export default function CostAndPaymentPage() {
  const phoneHref = `tel:${business.telephone}`;

  return (
    <main>
      <JsonLd data={{ "@context": "https://schema.org", ...buildFaqSchema(COST_FAQS) }} />

      {pricingApproved ? null : (
        <DraftBanner>
          Membership prices, discounts and the routine fees used in the calculator are
          proposals. This page is hidden from search engines and menus until approved.
        </DraftBanner>
      )}

      <Breadcrumbs
        width="max-w-6xl"
        items={[
          { name: "Home", path: "/" },
          { name: "Cost & Payment", path: "/cost-and-payment" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 pt-10 pb-16">
        <div className="max-w-6xl mx-auto">
          <p className={EYEBROW}>Cost &amp; payment</p>
          <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] max-w-3xl">
            Clear costs, explained <span className="text-brand-red">before you begin.</span>
          </h1>
          <p className="font-body text-lg opacity-75 mt-5 max-w-2xl">
            Know what your treatment costs, see whether a membership would save you money, and
            choose how to pay, all before anything starts.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3 max-w-4xl">
            {PROMISES.map((p) => (
              <li
                key={p}
                className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 font-body text-sm font-semibold"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B7A55" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0">
                  <path d="m5 12 5 5 9-10" />
                </svg>
                {p}
              </li>
            ))}
          </ul>
          <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">
            {JUMP.map((j) => (
              <a
                key={j.href}
                href={j.href}
                className="inline-flex min-h-[40px] items-center rounded-full bg-brand-red/5 px-4 font-body text-sm font-semibold text-brand-red hover:bg-brand-red/10"
              >
                {j.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Price guide */}
      <section id="prices" className="px-6 py-16 bg-[#fbf6f5] scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className={EYEBROW}>Price guide</p>
            <h2 className={H2}>What common treatments cost</h2>
            <p className="font-body text-base opacity-75 mt-3 max-w-2xl">
              Starting prices, what each includes, and what can change it. Where a price
              depends on what we find, Dr. Sahu quotes it after your examination.
            </p>
          </Reveal>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-black/10 bg-white">
            <table className="w-full min-w-[720px] border-collapse text-left font-body text-sm">
              <thead>
                <tr className="border-b border-black/10">
                  <th scope="col" className="px-5 py-4 font-headline text-base">Treatment</th>
                  <th scope="col" className="px-5 py-4 font-headline text-base">Price</th>
                  <th scope="col" className="px-5 py-4 font-headline text-base">What&apos;s included</th>
                  <th scope="col" className="px-5 py-4 font-headline text-base">What can change it</th>
                </tr>
              </thead>
              <tbody>
                {priceGuide.map((row) => (
                  <tr key={row.item} className="border-b border-black/5 last:border-0">
                    <th scope="row" className="px-5 py-4 align-top font-semibold">
                      {row.item}
                    </th>
                    <td className="px-5 py-4 align-top whitespace-nowrap">
                      {row.price === null ? (
                        <span className="opacity-60">After examination</span>
                      ) : (
                        <>
                          {row.from ? <span className="opacity-60">from </span> : null}
                          <span className="font-headline text-base font-bold">
                            {formatRupees(row.price)}
                          </span>
                          {row.unit ? (
                            <span className="block text-xs opacity-60">{row.unit}</span>
                          ) : null}
                        </>
                      )}
                    </td>
                    <td className="px-5 py-4 align-top opacity-75">{row.includes}</td>
                    <td className="px-5 py-4 align-top opacity-75">{row.varies}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-body text-xs opacity-60 mt-3">
            *Final treatment cost may vary depending on clinical requirements.
          </p>
        </div>
      </section>

      {/* Cost of waiting */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className={EYEBROW}>Prevention pays</p>
            <h2 className={H2}>Why a check-up costs less than waiting</h2>
          </Reveal>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                when: "Found at a check-up",
                what: "A small cavity usually needs only a filling.",
                color: "bg-[#0B7A55]",
                badge: "Simple & Low Cost",
                badgeColor: "bg-[#0B7A55]/10 text-[#0B7A55]",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M12 3.5c-2 0-2.8 1-4.4 1S5 3.8 4.4 5.3C3.6 7.2 4 9.5 4.8 12c.7 2.2.8 5.6 1.7 6.9.7 1 1.6.4 2-1 .4-1.6.6-3.6 1.5-3.6h.1" />
                    <path d="m9 12 2 2 4-4" strokeWidth={2.4} />
                  </svg>
                ),
              },
              {
                when: "Left for months",
                what: "Decay can reach the nerve and cause pain or infection. The tooth may then need a root canal.",
                color: "bg-[#D97706]",
                badge: "Pain & Extra Visits",
                badgeColor: "bg-[#D97706]/10 text-[#D97706]",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M12 9v4M12 17h.01" strokeWidth={2.4} />
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  </svg>
                ),
              },
              {
                when: "After a root canal",
                what: "A back tooth often needs a crown to protect it, from ₹2,000 per tooth*.",
                color: "bg-brand-red",
                badge: "Restoration Needed",
                badgeColor: "bg-brand-red/10 text-brand-red",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M4 9l3 3 5-6 5 6 3-3-1.5 9h-13L4 9Z" />
                    <path d="M6.5 18h11" strokeWidth={1.2} />
                  </svg>
                ),
              },
            ].map((s) => (
              <li key={s.when} className="relative flex flex-col rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-sm ${s.color}`}
                  >
                    {s.icon}
                  </span>
                  <span className={`rounded-full px-2.5 py-1 font-body text-xs font-bold ${s.badgeColor}`}>
                    {s.badge}
                  </span>
                </div>
                <p className="font-headline text-lg font-bold mt-4">{s.when}</p>
                <p className="font-body text-sm opacity-75 mt-2">{s.what}</p>
              </li>
            ))}
          </ol>

          <p className="font-body text-base opacity-80 mt-6 max-w-2xl">
            Regular check-ups find problems while they&apos;re small, simpler and cheaper to
            fix. That&apos;s what our memberships are built around.
          </p>
        </div>
      </section>

      {/* Membership */}
      <section id="membership" className="px-6 py-16 bg-[#fbf6f5] scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className={EYEBROW}>Membership plans</p>
            <h2 className={H2}>Regular care for one simple fee</h2>
            <p className="font-body text-base opacity-75 mt-3 max-w-2xl">
              Choose 3, 6 or 12 months. Basic and Advanced pay for themselves with the
              included visits alone; Pro pays off when you&apos;re having treatment. The
              calculator below shows exactly which suits you.
            </p>
          </Reveal>
          <div className="mt-8">
            <MembershipPlans />
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="px-6 py-16 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className={EYEBROW}>Savings calculator</p>
            <h2 className={H2}>Will a membership save you money?</h2>
            <p className="font-body text-base opacity-75 mt-3 max-w-2xl">
              Tell us who&apos;s covered and the care you expect. We compare every option
              with paying as you go, and we&apos;ll tell you honestly if a membership
              isn&apos;t worth it.
            </p>
          </Reveal>
          <div className="mt-8">
            <SavingsCalculator />
          </div>
        </div>
      </section>

      {/* Ways to pay */}
      <section id="pay" className="px-6 py-16 bg-[#fbf6f5] scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className={EYEBROW}>Ways to pay</p>
            <h2 className={H2}>Pay in the way that suits you</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-white border border-black/10 p-6">
              <p className="font-headline text-lg font-bold">At the clinic</p>
              <ul className="mt-3 flex flex-col gap-1.5 font-body text-sm opacity-80">
                {payment.methods.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
            {payment.stagedPayments ? (
              <div className="rounded-2xl bg-white border border-black/10 p-6">
                <p className="font-headline text-lg font-bold">Pay in stages</p>
                <p className="mt-3 font-body text-sm opacity-80">
                  For longer treatment like implants, pay at each stage rather than all at
                  once.
                </p>
              </div>
            ) : null}
            {payment.emi ? (
              <div className="rounded-2xl bg-white border border-black/10 p-6">
                <p className="font-headline text-lg font-bold">EMI</p>
                <p className="mt-3 font-body text-sm opacity-80">
                  Through {payment.emi.partner}, on treatment over{" "}
                  {formatRupees(payment.emi.minimum)}.
                </p>
              </div>
            ) : null}
            <div className="rounded-2xl bg-white border border-black/10 p-6">
              <p className="font-headline text-lg font-bold">Insurance &amp; reimbursement</p>
              <p className="mt-3 font-body text-sm opacity-80">
                Itemised bills and treatment records for your insurer or employer claim.
              </p>
            </div>
            <div className="rounded-2xl bg-brand-band text-white p-6">
              <p className="font-headline text-lg font-bold">Implant warranty</p>
              <p className="mt-3 font-body text-sm text-white/75">
                5-year, 10-year or lifetime, depending on your implant option. Covers implant
                failure; not breakage or failure from poor hygiene.
              </p>
              <Link
                href="/policies#implant-warranty"
                className="mt-4 inline-flex font-body text-sm font-semibold text-brand-gold hover:underline"
              >
                Read the warranty policy →
              </Link>
            </div>
          </div>
          <p className="font-body text-sm opacity-75 mt-6">
            Rescheduling, refunds and changes to a treatment plan are covered in our{" "}
            <Link href="/policies" className="font-semibold text-brand-red hover:underline">
              patient policies
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className={H2}>Questions about cost</h2>
          </Reveal>
          <div className="mt-6">
            <FaqAccordion faqs={COST_FAQS} />
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Know before you go"
        heading="Want to know what your treatment would cost?"
        subheading="Send 3 photos on WhatsApp: Dr. Sahu will personally review your photos and send you a voice message — this is not an automated diagnosis. Or call to book an examination."
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <a href={business.whatsappUrl} className={buttonVariants({ variant: "gold", size: "lg" })}>
              WhatsApp us
            </a>
            <a
              href={phoneHref}
              className={buttonVariants({ variant: "ghost", size: "lg" }) + " border-2 border-white/40"}
            >
              Call {business.telephoneDisplay}
            </a>
          </div>
        }
      />
    </main>
  );
}
