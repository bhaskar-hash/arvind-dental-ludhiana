import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Icon } from "@/components/Icon";
import { BookingForm } from "@/components/RequestForms";
import { business } from "@/lib/business";
import { doctor } from "@/lib/doctor";
import { getLandingPage, landingPages } from "@/lib/landing";
import { btn, container, eyebrow, h2 } from "@/lib/styles";

/**
 * Ads landing page: one offer of action (book, call or WhatsApp), no menu,
 * kept out of search results so it never competes with the treatment pages.
 */

export function generateStaticParams() {
  return landingPages.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getLandingPage(params.slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    robots: { index: false, follow: false },
    alternates: { canonical: `${business.siteUrl}/lp/${page.slug}` },
  };
}

export default function LandingPage({ params }: { params: { slug: string } }) {
  const page = getLandingPage(params.slug);
  if (!page) notFound();

  return (
    <main>
      {/* Hero with the form on the right, so it is visible without scrolling on desktop */}
      <section className="bg-brand-warm pb-16 pt-10 sm:pt-14">
        <div className={`${container} grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)]`}>
          <div>
            <p className={eyebrow}>{page.eyebrow}</p>
            <h1 className="font-headline text-[clamp(2.1rem,4.4vw,3.3rem)] font-extrabold leading-[1.08] tracking-[-0.02em]">
              {page.headline}
            </h1>
            <p className="mt-5 max-w-[560px] font-body text-lg text-brand-muted">{page.sub}</p>
            <dl className="mt-8 grid max-w-[560px] grid-cols-3 gap-3">
              {page.facts.map((f) => (
                <div key={f.label} className="rounded-2xl border border-brand-line bg-white p-4">
                  <dt className="font-body text-xs text-brand-muted">{f.label}</dt>
                  <dd className="mt-1 font-headline text-xl font-bold text-brand-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`tel:${business.telephone}`} data-placement="lp_hero" className={btn.primary}>
                <Icon name="phone" size={18} />
                Call {business.telephoneShort}
              </a>
              <a href={business.whatsappUrl} data-placement="lp_hero" className={btn.wa}>
                <Icon name="chat" size={18} />
                WhatsApp us
              </a>
            </div>
            <p className="mt-6 flex items-start gap-2 font-body text-sm text-brand-muted">
              <Icon name="pin" size={18} className="mt-0.5 shrink-0 text-brand-red" />
              {business.streetAddress}, {business.addressLocality} {business.postalCode} · {business.landmark}
            </p>
          </div>
          <div id="book" className="scroll-mt-24">
            <BookingForm greeting={page.greeting} button={page.button} />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className={`${container} grid gap-12 lg:grid-cols-2`}>
          <div>
            <h2 className={h2}>{page.forYouHeading}</h2>
            <ul className="mt-6 flex flex-col gap-3">
              {page.forYou.map((p) => (
                <li key={p} className="flex items-start gap-3 font-body text-[17px]">
                  <Icon name="check" size={22} strokeWidth={2.4} className="mt-0.5 shrink-0 text-brand-red" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={h2}>What happens at your visit</h2>
            <ol className="mt-6 flex flex-col gap-4">
              {page.steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-red font-body text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="font-body text-[17px]">
                    <strong className="block text-brand-ink">{s.title}</strong>
                    <span className="text-brand-muted">{s.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-brand-warm py-16">
        <div className={`${container} max-w-3xl`}>
          <p className={eyebrow}>Your dentist</p>
          <p className="font-headline text-2xl font-bold">{doctor.name}</p>
          <p className="mt-1 font-body text-brand-muted">
            {doctor.credentials}
            {doctor.registration ? ` · ${doctor.registration}` : ""}
          </p>
          <p className="mt-4 font-body text-[17px] text-brand-muted">
            {business.name}, {business.streetAddress}, {business.addressLocality}.{" "}
            <Link href="/about" className="font-semibold text-brand-red underline">
              About Dr. Sahu
            </Link>
          </p>

          <h2 className={`${h2} mt-14`}>Questions</h2>
          <div className="mt-6">
            <FaqAccordion faqs={page.faqs} />
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#book" className={btn.primary}>
              {page.button}
            </a>
            <Link href={page.moreHref} className="font-body font-semibold text-brand-red underline">
              {page.moreLabel}
            </Link>
          </div>
          <p className="mt-8 font-body text-xs text-brand-muted">
            Treatment is decided only after an examination. Fees shown are the clinic&apos;s standard
            fees; treatment costs are given in writing before treatment starts.
          </p>
        </div>
      </section>
    </main>
  );
}
