import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AiImage } from "@/components/AiImage";
import { Icon } from "@/components/Icon";
import { QuickBookForm } from "@/components/RequestForms";
import { business } from "@/lib/business";
import { clinicPhoto, doctor } from "@/lib/doctor";
import { illustration } from "@/lib/illustrations";
import { getLandingPage, landingPages, type FeatureIcon } from "@/lib/landing";
import { routineFees } from "@/lib/pricing";
import { pageTitle } from "@/lib/seo";
import { container } from "@/lib/styles";

/**
 * Ads landing page, in the card layout Dr. Sahu sent: a short hero, four
 * feature points, treatment cards that pick the treatment in the form, and a
 * booking form beside the clinic's details. Kept out of search results so it
 * never competes with the treatment pages.
 */

export function generateStaticParams() {
  return landingPages.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getLandingPage(params.slug);
  if (!page) return {};
  return {
    title: pageTitle(page.title),
    description: page.description,
    robots: { index: false, follow: false },
    alternates: { canonical: `${business.siteUrl}/lp/${page.slug}` },
  };
}

const svg = (children: ReactNode) => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {children}
  </svg>
);

const FEATURE_ICONS: Record<FeatureIcon, ReactNode> = {
  digital: svg(
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M9 20h6M12 16v4" />
      <path d="M12 6.8c-.7 0-1 .4-1.6.4s-.9-.3-1.2.2c-.4.6-.2 1.5.1 2.4.3.8.3 2 .6 2.4.3.3.6.1.7-.3.1-.6.2-1.2.6-1.2s.5.6.6 1.2c.1.4.4.6.7.3.3-.4.3-1.6.6-2.4.3-.9.5-1.8.1-2.4-.3-.5-.7-.2-1.2-.2-.4 0-.7-.4-1-.4Z" strokeWidth={1.2} />
    </>,
  ),
  smile: svg(
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 14c1 1.4 2.4 2 4 2s3-.6 4-2" />
      <path d="M9 9.5h.01M15 9.5h.01" strokeWidth={2.2} />
    </>,
  ),
  degree: svg(
    <>
      <path d="m2.5 9 9.5-4.5L21.5 9 12 13.5 2.5 9Z" />
      <path d="M6.5 11v4.2c0 1.3 2.5 2.8 5.5 2.8s5.5-1.5 5.5-2.8V11" />
      <path d="M21.5 9v5" />
    </>,
  ),
  care: svg(
    <>
      <path d="M12 19s-6.5-4-6.5-8.6A3.6 3.6 0 0 1 12 8.2a3.6 3.6 0 0 1 6.5 2.2C18.5 15 12 19 12 19Z" />
      <path d="M9.6 11.6h4.8M12 9.2v4.8" strokeWidth={1.3} />
    </>,
  ),
  estimate: svg(
    <>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4M10 12h5M10 16h5" />
    </>,
  ),
};

const STEPS = [
  { title: "Book", body: "Call, WhatsApp or send the form." },
  { title: "Examination", body: `With Dr. Sahu, ${"₹" + routineFees.checkup.toLocaleString("en-IN")}.` },
  { title: "Your plan", body: "Options and a written estimate." },
];

export default function LandingPage({ params }: { params: { slug: string } }) {
  const page = getLandingPage(params.slug);
  if (!page) notFound();

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-warm via-brand-warm to-white">
        <div className={`${container} grid gap-9 pb-12 pt-7 sm:pt-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-14 lg:pb-16`}>
          <div>
            <p className="inline-flex items-center gap-1.5 rounded-full border border-brand-line bg-white px-3.5 py-1.5 font-body text-[13px] font-semibold text-brand-ink shadow-sm">
              <Icon name="pin" size={15} className="text-brand-red" />
              {page.location}
            </p>
            <h1 className="mt-5 font-headline text-[clamp(2.4rem,8.2vw,3.7rem)] font-extrabold leading-[1.02] tracking-[-0.02em]">
              <span className="block text-brand-ink">{page.headline[0]}</span>
              <span className="block text-brand-red">{page.headline[1]}</span>
            </h1>
            <span aria-hidden className="mt-5 block h-1 w-14 rounded-full bg-brand-red" />
            <p className="mt-5 max-w-[540px] font-body text-[17px] leading-relaxed text-brand-muted sm:text-lg">{page.sub}</p>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              <a
                href="#book"
                className="inline-flex min-h-[54px] items-center justify-center gap-1.5 whitespace-nowrap rounded-2xl bg-brand-red px-2.5 font-body text-[14px] font-semibold text-white shadow-[0_14px_28px_-14px_rgba(166,28,46,0.75)] transition-colors hover:bg-brand-red-dark sm:px-7 sm:text-base"
              >
                <Icon name="calendar" size={18} className="shrink-0" />
                Book consultation
              </a>
              <a
                href={business.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-placement="lp_hero"
                className="inline-flex min-h-[54px] items-center justify-center gap-1.5 whitespace-nowrap rounded-2xl bg-brand-wa px-2.5 font-body text-[14px] font-semibold text-white shadow-[0_14px_28px_-14px_rgba(11,122,85,0.75)] transition hover:brightness-110 sm:px-7 sm:text-base"
              >
                <Icon name="chat" size={18} className="shrink-0" />
                Chat on WhatsApp
              </a>
            </div>
            <p className="mt-4 font-body text-sm text-brand-muted">{page.heroNote}</p>
          </div>

          <figure className="relative pb-6 lg:pb-0">
            <div className="overflow-hidden rounded-[28px] shadow-[0_30px_60px_-32px_rgba(43,10,15,0.55)]">
              <picture>
                <source srcSet={clinicPhoto.webp} type="image/webp" />
                <img
                  src={clinicPhoto.fallback}
                  width={clinicPhoto.width}
                  height={clinicPhoto.height}
                  alt={clinicPhoto.alt}
                  fetchPriority="high"
                  className="block aspect-[4/3] w-full object-cover"
                />
              </picture>
            </div>
            <figcaption className="absolute -bottom-1 left-4 right-4 rounded-2xl border border-brand-line bg-white/95 p-4 shadow-lg backdrop-blur sm:left-auto sm:right-5 sm:w-[320px] lg:-bottom-6">
              <span className="block font-headline text-[17px] font-bold text-brand-ink">{doctor.name}</span>
              <span className="block font-body text-[13px] font-semibold text-brand-red">{doctor.credentials}</span>
              {doctor.registration ? <span className="block font-body text-xs text-brand-muted">{doctor.registration}</span> : null}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Feature points */}
      <section className={`${container} pt-4 lg:pt-10`}>
        <ul className="grid grid-cols-4 overflow-hidden rounded-[22px] border border-brand-line bg-brand-blush/70">
          {page.features.map((f, i) => (
            <li key={f.label} className={`flex flex-col items-center gap-2 px-1.5 py-4 text-center sm:gap-2.5 sm:py-5 ${i ? "border-l border-brand-line" : ""}`}>
              <span className="text-brand-red">{FEATURE_ICONS[f.icon]}</span>
              <span className="font-body text-[12px] font-semibold leading-tight text-brand-ink sm:text-sm">{f.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Treatment cards */}
      <section className="py-12 sm:py-16">
        <div className={container}>
          <div className="text-center">
            <h2 className="flex items-center justify-center gap-3 font-headline text-[clamp(1.55rem,5vw,2.35rem)] font-extrabold leading-tight text-brand-ink">
              <span aria-hidden className="h-0.5 w-8 shrink-0 rounded-full bg-brand-red sm:w-12" />
              <span>
                {page.cardsHeading[0]} <span className="text-brand-red">{page.cardsHeading[1]}</span>
              </span>
              <span aria-hidden className="h-0.5 w-8 shrink-0 rounded-full bg-brand-red sm:w-12" />
            </h2>
            <p className="mt-2 font-body text-[15px] text-brand-muted">{page.cardsSub}</p>
          </div>
          <ul className="mt-8 grid gap-4 lg:grid-cols-2">
            {page.cards.map((c) => {
              const img = illustration(c.image);
              return (
                <li key={c.title}>
                  <a
                    href="#book"
                    data-treatment={c.treatment}
                    className="group flex h-full items-center gap-3 rounded-[22px] border border-brand-line bg-white p-2.5 pr-2 shadow-[0_14px_32px_-26px_rgba(43,10,15,0.55)] transition hover:-translate-y-0.5 hover:border-brand-red/40 hover:shadow-[0_18px_36px_-24px_rgba(166,28,46,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red sm:gap-5 sm:p-4 sm:pr-3.5"
                  >
                    <span className="w-[92px] shrink-0 overflow-hidden rounded-2xl bg-brand-warm sm:w-[132px]">
                      {img ? (
                        <AiImage image={img} className="block aspect-square w-full object-cover" />
                      ) : (
                        <span className="block aspect-square w-full" />
                      )}
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col items-start">
                      <span className="rounded-full bg-brand-red px-2.5 py-[3px] font-body text-[10.5px] font-bold leading-none text-white sm:text-[11px]">{c.tag}</span>
                      <span className="mt-1.5 font-headline text-[16px] font-bold leading-tight text-brand-ink sm:mt-2 sm:text-[19px] sm:leading-snug">{c.title}</span>
                      <span className="mt-1 font-body text-[13px] leading-snug text-brand-muted sm:text-[14.5px]">{c.body}</span>
                      {c.points.length ? (
                        <span className="mt-1.5 flex flex-col gap-0.5 sm:mt-2 sm:gap-1">
                          {c.points.map((pt) => (
                            <span key={pt} className="flex items-start gap-1 font-body text-[12.5px] leading-snug text-brand-ink sm:gap-1.5 sm:text-sm">
                              <Icon name="check" size={15} strokeWidth={2.6} className="mt-px shrink-0 text-brand-red" />
                              {pt}
                            </span>
                          ))}
                        </span>
                      ) : null}
                    </span>
                    <span aria-hidden className="shrink-0 text-brand-red transition-transform group-hover:translate-x-0.5">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 6 6 6-6 6" />
                      </svg>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center font-body text-[15px] text-brand-muted">
            <Icon name="alert" size={17} className="text-brand-red" />
            Tooth pain or swelling today?
            <a href={`tel:${business.telephone}`} data-placement="lp_emergency" className="font-semibold text-brand-red underline underline-offset-2">
              Call {business.telephoneShort}
            </a>
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className={container}>
        <ol className="grid gap-3 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex items-center gap-3.5 rounded-2xl bg-brand-warm px-4 py-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-red font-body text-sm font-bold text-white">{i + 1}</span>
              <span className="font-body text-[15px] leading-snug">
                <strong className="block text-brand-ink">{s.title}</strong>
                <span className="text-brand-muted">{s.body}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* Plan your smile band */}
      <section className={`${container} mt-10`}>
        <div className="flex flex-col gap-5 rounded-[26px] bg-gradient-to-r from-brand-red to-brand-red-dark px-6 py-7 text-white shadow-[0_24px_48px_-28px_rgba(125,21,35,0.8)] sm:flex-row sm:items-center sm:gap-8 sm:px-10 sm:py-8">
          <span aria-hidden className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 sm:flex">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3.5c-2 0-2.8 1-4.4 1S5 3.8 4.4 5.3C3.6 7.2 4 9.5 4.8 12c.7 2.2.8 5.6 1.7 6.9.7 1 1.6.4 2-1 .4-1.6.6-3.6 1.5-3.6h.1c.9 0 1.1 2 1.5 3.6.4 1.4 1.3 2 2 1 .9-1.3 1-4.7 1.7-6.9.8-2.5 1.2-4.8.4-6.7C16.5 3.8 15 5.5 13.4 4.5c-.5-.6-.9-1-1.4-1Z" />
              <path d="M18.5 2.5v3M17 4h3" strokeWidth={1.3} />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-headline text-[26px] font-extrabold leading-tight">Let&apos;s plan your smile</p>
            <p className="mt-1.5 font-body text-[15px] text-white/85">
              Tell us which treatment you are interested in and we will call or WhatsApp you back.
            </p>
          </div>
          <a
            href="#book"
            className="inline-flex min-h-[52px] shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-6 font-body text-base font-bold text-brand-red transition-colors hover:bg-brand-warm"
          >
            {page.button}
            <Icon name="arrow" size={18} strokeWidth={2.4} />
          </a>
        </div>
      </section>

      {/* Booking form and clinic details */}
      <section id="book" className="scroll-mt-20 py-14 sm:py-20">
        <div className={`${container} grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:gap-14`}>
          <div>
            <h2 className="font-headline text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold leading-tight text-brand-ink">Book a consultation</h2>
            <p className="mt-3 max-w-[480px] font-body text-[16px] text-brand-muted">
              Send the form and WhatsApp opens with your request ready. We reply to confirm a time.
            </p>
            <ul className="mt-7 flex flex-col gap-4 font-body text-[15px]">
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-blush text-brand-red">
                  {FEATURE_ICONS.degree}
                </span>
                <span>
                  <strong className="block text-brand-ink">{doctor.name}</strong>
                  <span className="text-brand-muted">
                    {doctor.credentials}
                    {doctor.registration ? ` · ${doctor.registration}` : ""}
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-blush text-brand-red">
                  <Icon name="pin" size={20} />
                </span>
                <span>
                  <strong className="block text-brand-ink">
                    {business.streetAddress}, {business.addressLocality} {business.postalCode}
                  </strong>
                  <span className="text-brand-muted">{business.landmark} · </span>
                  <a href={business.googleBusinessUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-red underline underline-offset-2">
                    Get directions
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-blush text-brand-red">
                  <Icon name="clock" size={20} />
                </span>
                <span>
                  <strong className="block text-brand-ink">{business.openingHours.join(" · ")}</strong>
                  <a href={`tel:${business.telephone}`} data-placement="lp_details" className="font-semibold text-brand-red underline underline-offset-2">
                    Call {business.telephoneShort}
                  </a>
                </span>
              </li>
            </ul>
          </div>
          <QuickBookForm greeting={page.greeting} button={page.button} treatments={page.treatments} />
        </div>
        <p className={`${container} mt-12 font-body text-xs leading-relaxed text-brand-muted`}>
          Treatment is decided only after an examination, and its cost is given in writing before it
          starts. Images marked &ldquo;AI illustration&rdquo; are illustrations, not patient photos.
        </p>
      </section>
    </main>
  );
}
