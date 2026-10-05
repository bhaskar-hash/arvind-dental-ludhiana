import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { BookingForm } from "@/components/RequestForms";
import { buildDentistSchema } from "@/lib/schema";
import { business } from "@/lib/business";
import { clinicPhoto } from "@/lib/doctor";
import { btn, container, eyebrow, h2 } from "@/lib/styles";

export const metadata: Metadata = {
  title: `Visit Us in ${business.addressLocality} — Address, Directions & Booking`,
  description: `${business.name}, ${business.streetAddress}, ${business.addressLocality}. Directions, how to find the clinic, and booking a consultation.`,
  alternates: { canonical: `${business.siteUrl}/location` },
};

const MAP_QUERY = `${business.googleListedName}, ${business.streetAddress}, ${business.addressLocality}, ${business.addressRegion} ${business.postalCode}`;

export default function LocationPage() {
  const tel = `tel:${business.telephone}`;
  return (
    <main>
      <JsonLd data={{ "@context": "https://schema.org", ...buildDentistSchema() }} />

      {/* Hero */}
      <section className="bg-brand-warm pb-[88px] pt-20">
        <div className={`${container} flex flex-wrap items-center gap-14`}>
          <div className="min-w-0 flex-[1_1_420px]">
            <p className={`hero-in hero-in-1 ${eyebrow}`}>Visit us</p>
            <h1 className="hero-in hero-in-2 font-headline text-[clamp(2.5rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
              Look for the red building on South Model Gram.
            </h1>
            <p className="hero-in hero-in-3 mt-5 font-body text-[19px] text-brand-muted">
              {business.streetAddress}, {business.addressLocality}, {business.addressRegion} {business.postalCode}
            </p>
            <div className="hero-in hero-in-4 mt-8 flex flex-wrap gap-3">
              <a href={business.googleBusinessUrl} target="_blank" rel="noopener noreferrer" className={btn.primary}>
                <Icon name="navigate" size={18} />
                Get directions
              </a>
              <a href={tel} className={btn.outline}>
                Call {business.telephoneShort}
              </a>
            </div>
          </div>
          <div className="min-w-0 flex-[1_1_520px]">
            <picture>
              <source srcSet={clinicPhoto.webp} type="image/webp" />
              <img
                src={clinicPhoto.fallback}
                width={clinicPhoto.width}
                height={clinicPhoto.height}
                alt={clinicPhoto.alt}
                fetchPriority="high"
                className="block aspect-[4/3] w-full rounded-[26px] object-cover shadow-[0_30px_60px_-30px_rgba(43,10,15,0.45)]"
              />
            </picture>
          </div>
        </div>
      </section>

      {/* Info cards */}
      <section className="py-20">
        <div className={`${container} grid gap-5 sm:grid-cols-2 lg:grid-cols-4`}>
          <div className="rounded-[22px] border border-brand-line p-7">
            <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-brand-blush text-brand-red">
              <Icon name="clock" size={22} />
            </span>
            <h2 className="mb-2 mt-4 font-headline text-[21px] font-bold">Clinic hours</h2>
            {business.openingHours.length ? (
              <ul className="font-body text-[15px] text-brand-muted">
                {business.openingHours.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            ) : (
              <p className="font-body text-[15px] text-brand-muted">
                Call us for today&apos;s hours:{" "}
                <a href={tel} className="font-semibold text-brand-red">
                  {business.telephoneShort}
                </a>
              </p>
            )}
          </div>
          <div className="rounded-[22px] border border-brand-line p-7">
            <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-brand-blush text-brand-red">
              <Icon name="phone" size={22} />
            </span>
            <h2 className="mb-2 mt-4 font-headline text-[21px] font-bold">Call or WhatsApp</h2>
            <a href={tel} className="block font-body text-xl font-bold text-brand-red">
              {business.telephoneDisplay}
            </a>
            <p className="mt-1.5 font-body text-[15px] text-brand-muted">In English, Punjabi or Hindi.</p>
          </div>
          <div className="rounded-[22px] border border-brand-line p-7">
            <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-brand-blush text-brand-red">
              <Icon name="pin" size={22} />
            </span>
            <h2 className="mb-2 mt-4 font-headline text-[21px] font-bold">Finding us</h2>
            <p className="font-body text-[15px] text-brand-muted">
              A red three-storey building with the RedCity signboard. {business.landmark}.
            </p>
          </div>
          <div className="rounded-[22px] bg-brand-red p-7 text-white">
            <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#8E1626]">
              <Icon name="alert" size={22} />
            </span>
            <h2 className="mb-2 mt-4 font-headline text-[21px] font-bold">Dental emergency?</h2>
            <p className="font-body text-[15px] text-[#F7E3E1]">
              Severe pain, swelling, or a broken or knocked-out tooth: call us first.
            </p>
            <Link href="/resources#emergency" className="mt-3 inline-flex font-body font-bold text-white underline">
              First-aid guide
            </Link>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-24">
        <div className={container}>
          <div className="overflow-hidden rounded-3xl border border-brand-line">
            <iframe
              title={`Map showing ${business.name}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[380px] w-full sm:h-[440px]"
            />
          </div>
          <a
            href={business.googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 font-body font-semibold text-brand-red"
          >
            Open in Google Maps <Icon name="arrow" size={16} strokeWidth={2.2} />
          </a>
        </div>
      </section>

      {/* Booking */}
      <section id="book" className="scroll-mt-20 bg-brand-warm py-24">
        <div className={`${container} flex flex-wrap items-start gap-14`}>
          <div className="min-w-0 flex-[1_1_380px]">
            <p className={eyebrow}>Book a consultation</p>
            <h2 className={h2}>Choose a time that suits you. We&apos;ll confirm it with you.</h2>
            <p className="mt-4 font-body text-[17px] text-brand-muted">
              Prefer to talk now? Call{" "}
              <a href={tel} className="font-bold text-brand-red">
                {business.telephoneShort}
              </a>
              , or message us on WhatsApp.
            </p>
            <a href={business.whatsappUrl} className={`${btn.wa} mt-6`}>
              <Icon name="chat" size={19} />
              Message on WhatsApp
            </a>
          </div>
          <div className="min-w-0 flex-[1_1_480px]">
            <BookingForm />
          </div>
        </div>
      </section>
    </main>
  );
}
