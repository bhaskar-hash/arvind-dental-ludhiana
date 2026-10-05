import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { DigitalWorkflow } from "@/components/Sections";
import { buildDentistSchema } from "@/lib/schema";
import { business, photoReviewUrl } from "@/lib/business";
import { doctor } from "@/lib/doctor";
import { clinicGallery } from "@/lib/site";
import { btn, container, eyebrow, h2 } from "@/lib/styles";

export const metadata: Metadata = {
  title: `About ${doctor.name}`,
  description: `${doctor.name}, ${doctor.credentials} — ${doctor.role} at ${business.name}, ${business.addressLocality}. Dental implants, full mouth rehabilitation, crowns & bridges and smile design.`,
  alternates: { canonical: `${business.siteUrl}/about` },
};

export default function AboutPage() {
  return (
    <main>
      <JsonLd data={{ "@context": "https://schema.org", ...buildDentistSchema() }} />

      {/* Hero */}
      <section className="overflow-hidden bg-brand-warm pb-24 pt-20">
        <div className={`${container} flex flex-wrap items-center gap-16`}>
          <div className="flex min-w-0 flex-[1_1_340px] justify-center">
            <div className="relative w-full max-w-[400px]">
              <div aria-hidden className="absolute -left-7 -top-7 bottom-7 right-7 rounded-[30px] border-2 border-brand-gold" />
              <picture>
                <source srcSet={doctor.photo.webp} type="image/webp" />
                <img
                  src={doctor.photo.fallback}
                  width={doctor.photo.width}
                  height={doctor.photo.height}
                  alt={doctor.photo.alt}
                  fetchPriority="high"
                  className="relative block aspect-[3/4] w-full rounded-[28px] object-cover object-top shadow-[0_30px_60px_-24px_rgba(43,10,15,0.45)]"
                />
              </picture>
            </div>
          </div>
          <div className="min-w-0 flex-[1_1_520px]">
            <p className={`hero-in hero-in-1 ${eyebrow}`}>Meet your dentist</p>
            <h1 className="hero-in hero-in-2 font-headline text-[clamp(2.5rem,5vw,3.9rem)] font-extrabold leading-[1.04] tracking-[-0.02em]">
              {doctor.name}
            </h1>
            <p className="mt-3.5 font-body text-[17px] font-semibold text-brand-red">{doctor.credentials}</p>
            <p className="mt-1 font-body text-base text-brand-muted">{doctor.role}</p>
            <p className="hero-in hero-in-3 mt-6 max-w-[600px] font-body text-[19px] text-[#3E3536]">{doctor.intro}</p>
            <div className="hero-in hero-in-4 mt-8 flex flex-wrap gap-3">
              <Link href={business.bookHref} className={btn.primary}>
                Book a consultation
              </Link>
              <a href={photoReviewUrl} className={btn.outline}>
                Send photos for review
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Education + expertise */}
      <section className="py-24">
        <div className={`${container} grid gap-14 lg:grid-cols-2`}>
          <Reveal>
            <p className={eyebrow}>Education &amp; training</p>
            <h2 className={h2}>Trained as a specialist in restoring and replacing teeth</h2>
            <ol className="mt-9">
              {doctor.education
                .slice()
                .reverse()
                .map((e, i, all) => (
                  <li key={e.institution} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${
                          i === 0 ? "bg-brand-red text-white" : "bg-brand-blush text-brand-red"
                        }`}
                      >
                        <Icon name="cap" size={22} strokeWidth={1.8} />
                      </span>
                      {i < all.length - 1 ? <span aria-hidden className="min-h-10 w-0.5 flex-1 bg-brand-line" /> : null}
                    </div>
                    <div className={i < all.length - 1 ? "pb-8" : ""}>
                      <p className="mt-1.5 font-headline text-[21px] font-bold">{e.qualification.split(",")[0]}</p>
                      {e.qualification.includes(",") ? (
                        <p className="mt-0.5 font-body text-base font-semibold text-brand-red">{e.qualification.split(", ").slice(1).join(", ")}</p>
                      ) : null}
                      <p className="mt-1 font-body text-base text-brand-muted">
                        {e.institution}, {e.location}
                      </p>
                    </div>
                  </li>
                ))}
            </ol>
          </Reveal>
          <Reveal delay={1}>
            <p className={eyebrow}>Areas of expertise</p>
            <h2 className={h2}>What Dr. Sahu does every day</h2>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {doctor.expertise.map((x) => (
                <li key={x} className="rounded-full bg-brand-blush px-[18px] py-2.5 font-body text-[15px] font-semibold">
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-8 font-body text-[17px] text-[#3E3536]">{doctor.approach}</p>
          </Reveal>
        </div>
      </section>

      {/* Digital work */}
      <section className="bg-brand-warm py-24">
        <div className={container}>
          <DigitalWorkflow />
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24">
        <Reveal className="mx-auto max-w-[900px] px-6 text-center">
          <p className={eyebrow}>His philosophy</p>
          <p className="font-headline text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-[1.3]">
            “Every patient deserves a treatment plan that is scientifically sound, aesthetically
            pleasing, and designed around their individual needs.”
          </p>
        </Reveal>
      </section>

      {/* Punjabi message */}
      <section className="bg-brand-maroon py-24 text-white">
        <div className="mx-auto max-w-[900px] px-6">
          <p lang="pa" className="mb-5 font-gurmukhi text-[15px] font-semibold tracking-[0.04em] text-brand-gold">
            ਡਾ. ਸਾਹੂ ਦਾ ਸੁਨੇਹਾ
          </p>
          <blockquote>
            <p lang="pa" className="font-gurmukhi text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-[1.75] text-brand-gold-light">
              “{doctor.punjabi.quote}”
            </p>
            <div className="mt-7 flex flex-col gap-3.5">
              {doctor.punjabi.paragraphs.map((p) => (
                <p key={p} lang="pa" className="font-gurmukhi text-lg font-medium leading-[1.95] text-[#EADAD7]">
                  {p}
                </p>
              ))}
            </div>
          </blockquote>
          <p className="mt-8 font-body text-[15px] text-[#CDB8B5]">
            — {doctor.name}, {doctor.credentials}
          </p>
        </div>
      </section>

      {/* The clinic */}
      <section className="py-24">
        <div className={container}>
          <p className={eyebrow}>The clinic</p>
          <h2 className={h2}>Inside RedCity Dental Care</h2>
          <div className={`mt-10 grid gap-[18px] ${clinicGallery.length > 1 ? "sm:grid-cols-2 lg:grid-cols-4" : ""}`}>
            {clinicGallery.map((p) => (
              <picture key={p.fallback}>
                <source srcSet={p.webp} type="image/webp" />
                <img
                  src={p.fallback}
                  width={p.width}
                  height={p.height}
                  alt={p.alt}
                  loading="lazy"
                  className={`block w-full rounded-[20px] object-cover ${clinicGallery.length > 1 ? "aspect-[4/3]" : "aspect-[16/9]"}`}
                />
              </picture>
            ))}
          </div>
          <p className="mt-5 font-body text-base text-brand-muted">
            {business.streetAddress}, {business.addressLocality}, {business.addressRegion} {business.postalCode} ·{" "}
            <a href={`tel:${business.telephone}`} className="font-semibold text-brand-red">
              {business.telephoneDisplay}
            </a>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-red py-20 text-white">
        <div className={`${container} flex flex-wrap items-center justify-between gap-8`}>
          <div className="min-w-0 flex-[1_1_480px]">
            <h2 className="font-headline text-[clamp(1.75rem,3.2vw,2.5rem)] font-extrabold leading-[1.15]">
              Talk to Dr. Sahu about your smile
            </h2>
            <p className="mt-3.5 font-body text-[17px] text-[#F7E3E1]">
              Book a consultation, or send 3 photos on WhatsApp for his personal opinion first.
              Dr. Sahu will personally review your photos and send you a voice message — this is
              not an automated diagnosis.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={business.bookHref} className={btn.white}>
              Book a consultation
            </Link>
            <a href={photoReviewUrl} className={btn.whiteOutline}>
              Send photos on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
