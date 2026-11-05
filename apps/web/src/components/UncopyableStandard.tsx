import Link from "next/link";
import { Icon } from "@/components/Icon";
import { photoReviewUrl } from "@/lib/business";
import { routineFees } from "@/lib/pricing";

const PILLARS = [
  {
    num: "01",
    icon: "receipt" as const,
    title: "100% Published Fee Transparency",
    subtitle: "Why other clinics won't copy this",
    body: "Most dental clinics in Ludhiana conceal their fees online so they can charge patients based on appearances or neighborhood. We publish our baseline fees openly for everyone: Check-up ₹300, Digital RVG X-ray ₹200, Cleaning ₹1,000, Crowns from ₹2,000. Zero hidden costs, zero chairside bargaining.",
  },
  {
    num: "02",
    icon: "cap" as const,
    title: "MDS Prosthodontist Leadership",
    subtitle: "Why other clinics cannot copy this",
    body: "Over 80% of dental clinics in Punjab are operated by BDS general practitioners performing implants after short weekend courses. Dr. Arvind Sahu completed 3 years of full-time hospital residency earning an MDS in Prosthodontics & Crown and Bridge (Reg. No. 20407A) — the protected dental specialty for replacing teeth and restoring bites.",
  },
  {
    num: "03",
    icon: "shield" as const,
    title: "Written Manufacturer Warranties",
    subtitle: "Why cut-price clinics won't copy this",
    body: "Many clinics cut costs using unbranded local dental labs that offer zero documentation. At RedCity, our genuine titanium dental implants come with written warranties of up to lifetime*, and monolithic zirconia crowns include manufacturer laboratory authentication cards.",
  },
  {
    num: "04",
    icon: "mic" as const,
    title: "Direct Doctor Voice Triage on WhatsApp",
    subtitle: "Why corporate clinics won't copy this",
    body: "Instead of frustrating automated chatbots or receptionists pushing immediate paid appointments, send 3 photos of your teeth to +91 76268 58230. Dr. Arvind Sahu personally reviews them and sends a clear clinical voice note explaining your realistic options before you spend on travel.",
  },
];

export function UncopyableStandard() {
  return (
    <section className="bg-brand-ink py-20 text-white sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-10">
          <div className="max-w-2xl">
            <span className="font-body text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">
              The RedCity Practice Standard
            </span>
            <h2 className="mt-3 font-headline text-[clamp(2.1rem,4vw,3.2rem)] font-extrabold leading-[1.08] text-white">
              The 4 commitments <span className="text-brand-gold">other clinics won&apos;t offer</span>
            </h2>
            <p className="mt-4 font-body text-base text-[#CDB8B5] leading-relaxed">
              In a crowded dental market where prices are hidden and claims are inflated, RedCity Dental is built on verifiable clinical ethics, specialist training, and radical transparency.
            </p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/5 p-4 text-center sm:text-left">
            <span className="block font-headline text-2xl font-bold text-brand-gold">
              ₹{routineFees.checkup}
            </span>
            <span className="font-body text-xs text-[#CDB8B5]">
              Objective Specialist Consultation
            </span>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {PILLARS.map((p) => (
            <div
              key={p.num}
              className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition-all hover:border-brand-gold/40 hover:bg-white/[0.07] sm:p-8"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gold/15 text-brand-gold">
                    <Icon name={p.icon} size={24} strokeWidth={1.8} />
                  </span>
                  <span className="font-headline text-3xl font-extrabold text-white/20">
                    {p.num}
                  </span>
                </div>
                <h3 className="mt-5 font-headline text-2xl font-bold text-white leading-snug">
                  {p.title}
                </h3>
                <span className="mt-1 block font-body text-xs font-bold uppercase tracking-wider text-brand-gold">
                  {p.subtitle}
                </span>
                <p className="mt-3.5 font-body text-[15px] leading-relaxed text-[#CDB8B5]">
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Second Opinion Callout Banner */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-brand-gold/30 bg-gradient-to-r from-brand-maroon to-[#260b10] p-7 sm:p-9">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-gold/20 px-3 py-1 font-body text-xs font-bold uppercase tracking-wider text-brand-gold">
              <Icon name="shield" size={14} />
              Unbiased Second Opinions
            </span>
            <h4 className="mt-3 font-headline text-2xl font-bold text-white">
              Already have an expensive treatment quote from another clinic?
            </h4>
            <p className="mt-2 font-body text-sm text-[#E3D1CE] leading-relaxed">
              Book a ₹300 objective diagnostic evaluation with Dr. Arvind Sahu. We review your case with high-resolution digital RVG imaging (₹200) with zero pressure to book treatment.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href={photoReviewUrl} className="inline-flex items-center gap-2 rounded-xl bg-brand-gold px-6 py-3.5 font-body text-sm font-bold text-brand-ink shadow-lg hover:brightness-105">
              <Icon name="camera" size={18} />
              Send Photos for Voice Triage
            </a>
            <Link href="/cost-and-payment" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3.5 font-body text-sm font-semibold text-white hover:bg-white/10">
              See All Published Fees
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
