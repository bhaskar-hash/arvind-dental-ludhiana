import Link from "next/link";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { BeforeAfter } from "@/components/BeforeAfter";
import { GoogleG, Icon, Stars } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { CallbackForm } from "@/components/RequestForms";
import { Reveal } from "@/components/Reveal";
import { ConcernGrid, PhotoReviewCta } from "@/components/Sections";
import { ServiceIcon } from "@/components/ServiceIcon";
import { business, photoReviewUrl } from "@/lib/business";
import { clinicPhoto, doctor } from "@/lib/doctor";
import { payment, pricingApproved } from "@/lib/pricing";
import { buildDentistSchema } from "@/lib/schema";
import { beforeAfterCases, introVideoUrl, reviews } from "@/lib/site";
import { btn, container, eyebrow, h2, lead } from "@/lib/styles";
import { slugify } from "@/lib/treatment-menu";
import { illustration } from "@/lib/illustrations";
import { AiImage } from "@/components/AiImage";

const TREATMENTS = [
  { slug: "dental-implants", href: "/services/dental-implants", name: "Dental Implants", body: "A fixed, natural-looking replacement for one tooth or many.", badge: "Up to lifetime warranty*" },
  { slug: "crowns", href: `/services#${slugify("Full Mouth Rehabilitation")}`, name: "Full Mouth Rehabilitation", body: "Rebuilding many worn, broken or missing teeth with one plan." },
  { slug: "root-canal-treatment", href: "/services/root-canal-treatment", name: "Root Canal Treatment", body: "Saving an infected tooth, only when it is truly needed." },
  { slug: "crowns", href: "/services/crowns", name: "Crowns & Bridges", body: "Zirconia and PFM crowns, from ₹2,000 per tooth*." },
  { slug: "veneers", href: "/services/veneers", name: "Veneers & Smile Design", body: "Improving shape, spacing and colour, planned around your face." },
  { slug: "dentures-bridges", href: "/services/dentures-bridges", name: "Dentures & Overdentures", body: "Comfortable, natural-looking replacements for missing teeth." },
];

function Photo({ webp, fallback, width, height, alt, className }: { webp: string; fallback: string; width: number; height: number; alt: string; className: string }) {
  return (
    <picture>
      <source srcSet={webp} type="image/webp" />
      <img src={fallback} width={width} height={height} alt={alt} loading="lazy" className={className} />
    </picture>
  );
}

export default function Home() {
  const diagnosisImage = illustration("home-diagnosis");
  const reviewLine = business.googleReviewCount
    ? `${business.googleReviewCount} patient reviews`
    : "Rated by patients on Google";

  return (
    <main>
      <JsonLd data={{ "@context": "https://schema.org", ...buildDentistSchema() }} />

      {/* Hero */}
      <section className="overflow-hidden bg-brand-warm pb-24 pt-16 sm:pt-[72px]">
        <div className={`${container} flex flex-wrap items-center gap-14`}>
          <div className="min-w-0 flex-[1_1_520px]">
            <p className="hero-in hero-in-1 inline-flex items-center gap-2.5 rounded-full border border-brand-line bg-white px-4 py-2 font-body text-sm font-semibold text-brand-muted">
              <span className="h-2 w-2 rounded-full bg-brand-red" aria-hidden />
              Prosthodontist-led dental clinic in South Model Gram, Ludhiana
            </p>
            <h1 className="hero-in hero-in-2 mt-6 font-headline text-[clamp(2.5rem,5.2vw,4.1rem)] font-extrabold leading-[1.04] tracking-[-0.02em]">
              Specialist dental care, <span className="text-brand-red">planned around you.</span>
            </h1>
            <p className="hero-in hero-in-3 mt-5 max-w-[560px] font-body text-[19px] text-brand-muted">
              {doctor.name} listens first, explains every option and what it costs in plain words,
              and recommends only the treatment you actually need.
            </p>
            <div className="hero-in hero-in-4 mt-8 flex flex-wrap gap-3">
              <a href={photoReviewUrl} className={btn.primary}>
                <Icon name="camera" size={19} />
                Get Dr. Sahu&apos;s opinion on your photos
              </a>
              <a href={`tel:${business.telephone}`} className={btn.outline}>
                <Icon name="phone" size={18} />
                Call {business.telephoneShort}
              </a>
            </div>
            <p className="mt-3.5 font-body text-sm text-brand-muted">
              Send 3 photos on WhatsApp and Dr. Sahu replies with a personal voice message — this
              is not an automated diagnosis.
            </p>
            <div className="mt-9 flex flex-wrap gap-x-9 gap-y-5 border-t border-brand-line pt-7">
              <div className="flex items-center gap-3">
                <Stars />
                <span className="flex flex-col font-body leading-snug">
                  <strong className="text-[15px]">{business.googleRating.toFixed(1)} on Google</strong>
                  <span className="text-[13px] text-brand-muted">{reviewLine}</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blush text-brand-red">
                  <Icon name="shield" />
                </span>
                <span className="flex flex-col font-body leading-snug">
                  <strong className="text-[15px]">Up to lifetime warranty*</strong>
                  <span className="text-[13px] text-brand-muted">on dental implants</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blush text-brand-red">
                  <Icon name="globe" />
                </span>
                <span className="flex flex-col font-body leading-snug">
                  <strong className="text-[15px]">
                    English · <span lang="pa" className="font-gurmukhi">ਪੰਜਾਬੀ</span> · <span lang="hi">हिंदी</span>
                  </strong>
                  <span className="text-[13px] text-brand-muted">Talk to us in your language</span>
                </span>
              </div>
            </div>
          </div>

          <div className="hero-in hero-in-5 flex min-w-0 flex-[1_1_380px] justify-center">
            <div className="relative w-full max-w-[420px]">
              <div aria-hidden className="absolute -right-12 -top-10 h-[340px] w-[340px] rounded-full bg-[#F3DEDA]" />
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
              <div className="absolute inset-x-[18px] bottom-[18px] rounded-2xl bg-white px-[18px] py-3.5 shadow-[0_12px_30px_-12px_rgba(43,10,15,0.35)]">
                <strong className="block font-headline text-lg">{doctor.name}</strong>
                <span className="font-body text-[13px] text-brand-muted">BDS, MDS (Prosthodontics) · Oral Implantologist</span>
              </div>
              <div className="absolute left-2 top-14 flex max-w-[236px] items-center gap-3 rounded-2xl bg-white px-4 py-3.5 shadow-[0_16px_36px_-14px_rgba(43,10,15,0.4)] sm:-left-10">
                <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-brand-wa text-white">
                  <Icon name="mic" />
                </span>
                <span className="font-body text-[13px] leading-snug text-brand-muted">
                  <strong className="block text-sm text-brand-ink">Personal voice replies</strong>
                  From Dr. Sahu himself, on WhatsApp
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What brings you in */}
      <section className="py-24">
        <div className={container}>
          <Reveal className="max-w-[720px]">
            <p className={eyebrow}>Start with what&apos;s bothering you</p>
            <h2 className={h2}>What brings you in today?</h2>
            <p className={lead}>
              Choose what sounds like you. We&apos;ll show you the options, explained simply, so
              you can decide with confidence.
            </p>
          </Reveal>
          <div className="mt-11">
            <ConcernGrid />
          </div>
        </div>
      </section>

      {/* Trust band */}
      <section className="bg-brand-maroon py-[72px] text-white">
        <div className={container}>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              { value: <AnimatedCounter to={5} decimals={1} />, label: "Google rating", sub: business.googleReviewCount ? `From ${business.googleReviewCount} patient reviews` : "Rated by patients" },
              { value: "Lifetime", label: "Implant warranty, up to*", sub: "5-year, 10-year or lifetime options" },
              { value: "MDS", label: "Prosthodontics specialist", sub: "Restoring and replacing teeth" },
              { value: <AnimatedCounter to={20} suffix="+" />, label: "Treatments under one roof", sub: "From check-ups to full-mouth rehabilitation" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-headline text-[clamp(2.25rem,4vw,3.25rem)] font-extrabold leading-none text-brand-gold">{s.value}</p>
                <p className="mt-3 font-body text-base font-semibold">{s.label}</p>
                <p className="mt-0.5 font-body text-sm text-[#CDB8B5]">{s.sub}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-[#4A2229] pt-8 font-body text-[15px]">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#CDB8B5]">Trained at</span>
            {doctor.education.map((e) => (
                <span key={e.institution} className="inline-flex items-center gap-2.5">
                  <Icon name="cap" className="text-brand-gold" strokeWidth={1.8} />
                  <span>
                    <strong>{e.institution}</strong>, {e.location} · {e.qualification.startsWith("Bachelor") ? "BDS" : "MDS, Prosthodontics & Crown and Bridge"}
                  </span>
                </span>
              ))}
          </div>
        </div>
      </section>

      {/* Why RedCity */}
      <section className="py-[104px]">
        <div className={container}>
          <Reveal className="max-w-[760px]">
            <p className={eyebrow}>Why patients choose RedCity</p>
            <h2 className={h2}>Specialist skill. Honest advice. Clear costs.</h2>
          </Reveal>
          <div className="mt-12 grid gap-7 md:grid-cols-3">
            <Reveal as="article" className="flex flex-col gap-3.5">
              <Photo webp={doctor.photo.webp} fallback={doctor.photo.fallback} width={doctor.photo.width} height={doctor.photo.height} alt={doctor.photo.alt} className="aspect-[4/3] w-full rounded-[20px] object-cover object-[50%_18%]" />
              <h3 className="mt-2 font-headline text-[23px] font-bold leading-tight">A specialist for complex cases</h3>
              <p className="font-body text-base text-brand-muted">
                Prosthodontics is the specialty of restoring and replacing teeth. Dr. Sahu plans
                implants, full-mouth rehabilitation and dentures himself.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 font-body font-semibold text-brand-red">
                Meet Dr. Sahu <Icon name="arrow" size={16} strokeWidth={2.2} />
              </Link>
            </Reveal>
            <Reveal as="article" delay={1} className="flex flex-col gap-3.5">
              {diagnosisImage ? (
                <AiImage image={diagnosisImage} className="aspect-[4/3] w-full rounded-[20px] object-cover" />
              ) : (
                <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 rounded-[20px] bg-brand-blush text-brand-red">
                  <Icon name="search" size={64} strokeWidth={1.3} />
                  <span className="font-body text-sm font-semibold text-brand-muted">The real cause, found first</span>
                </div>
              )}
              <h3 className="mt-2 font-headline text-[23px] font-bold leading-tight">The right diagnosis comes first</h3>
              <p className="font-body text-base text-brand-muted">
                Not every toothache needs a root canal. You&apos;ll see what we see, understand
                why, and decide together.
              </p>
              <Link href="/blog/signs-you-might-need-a-root-canal" className="inline-flex items-center gap-2 font-body font-semibold text-brand-red">
                Signs you might need a root canal <Icon name="arrow" size={16} strokeWidth={2.2} />
              </Link>
            </Reveal>
            <Reveal as="article" delay={2} className="flex flex-col gap-3.5">
              <Photo {...clinicPhoto} className="aspect-[4/3] w-full rounded-[20px] object-cover" />
              <h3 className="mt-2 font-headline text-[23px] font-bold leading-tight">Know the cost before you begin</h3>
              <p className="font-body text-base text-brand-muted">
                Dr. Sahu explains each option and what it costs before treatment starts, so there
                are no surprises later.
              </p>
              {pricingApproved ? (
                <Link href="/cost-and-payment" className="inline-flex items-center gap-2 font-body font-semibold text-brand-red">
                  Cost &amp; payment <Icon name="arrow" size={16} strokeWidth={2.2} />
                </Link>
              ) : (
                <Link href="/services/crowns" className="inline-flex items-center gap-2 font-body font-semibold text-brand-red">
                  Compare crown options and prices <Icon name="arrow" size={16} strokeWidth={2.2} />
                </Link>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Treatments */}
      <section className="bg-brand-warm py-[104px]">
        <div className={container}>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <Reveal className="max-w-[680px]">
              <p className={eyebrow}>Treatments</p>
              <h2 className={h2}>Restore, repair and brighten, all under one roof</h2>
            </Reveal>
            <Link href="/services" className={`${btn.outline} min-h-[48px]`}>
              See all 20+ treatments
            </Link>
          </div>
          <div className="mt-11 grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
            {TREATMENTS.map((t, i) => (
              <Reveal key={t.name} delay={i % 3} className="h-full">
                <Link href={t.href} className="group flex h-full flex-col rounded-[22px] border border-brand-line bg-white p-3.5 pb-6 hover-lift">
                  <span className="relative flex h-[150px] items-center justify-center rounded-2xl bg-brand-blush">
                    <span className="badge-pop flex h-[78px] w-[78px] items-center justify-center rounded-full bg-brand-red text-white">
                      <ServiceIcon slug={t.slug} className="h-[38px] w-[38px]" />
                    </span>
                    {t.badge ? (
                      <span className="absolute right-3 top-3 rounded-full bg-brand-maroon px-2.5 py-1 font-body text-xs font-bold text-brand-gold-light">
                        {t.badge}
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-5 px-3 font-headline text-[22px] font-bold">{t.name}</span>
                  <span className="mt-2 px-3 font-body text-[15px] text-brand-muted">{t.body}</span>
                  <span className="mt-4 px-3 font-body text-[15px] font-semibold text-brand-red">Learn more</span>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3.5">
            <a href={photoReviewUrl} className={btn.primary}>
              Ask if implants could work for you
            </a>
            <span className="font-body text-sm text-brand-muted">
              *Final cost depends on your clinical needs. Warranty period depends on the implant option; terms apply.
            </span>
          </div>
        </div>
      </section>

      {/* Before & after — only with real, consented cases */}
      {beforeAfterCases.length ? (
        <section id="results" className="py-[104px]">
          <div className={container}>
            <Reveal className="mx-auto max-w-[720px] text-center">
              <p className={eyebrow}>Before &amp; after</p>
              <h2 className={h2}>
                Real patients. <span className="text-brand-red">Real results.</span>
              </h2>
              <p className={`${lead} mx-auto`}>
                Cases Dr. Sahu treated during his specialist MDS training, shown with each
                patient&apos;s permission. Drag the slider to compare.
              </p>
            </Reveal>
            <div className="mt-11">
              <BeforeAfter cases={beforeAfterCases} />
            </div>
          </div>
        </section>
      ) : null}

      {/* A note from Dr. Sahu */}
      <section className={`py-[104px] ${beforeAfterCases.length ? "bg-brand-warm" : ""}`}>
        <div className={`${container} flex flex-wrap items-center gap-14`}>
          <div className="relative aspect-[16/10] min-w-0 flex-[1_1_480px] overflow-hidden rounded-3xl bg-brand-maroon">
            {introVideoUrl ? (
              <iframe
                src={introVideoUrl}
                title="Dr. Sahu introduces himself"
                loading="lazy"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <Photo webp={doctor.photo.webp} fallback={doctor.photo.fallback} width={doctor.photo.width} height={doctor.photo.height} alt={doctor.photo.alt} className="absolute inset-0 h-full w-full object-cover object-[50%_20%]" />
            )}
          </div>
          <Reveal className="min-w-0 flex-[1_1_420px]">
            <p className={eyebrow}>A note from Dr. Sahu</p>
            <blockquote>
              <p lang="pa" className="font-gurmukhi text-[clamp(1.4rem,2.4vw,1.7rem)] font-semibold leading-[1.75]">
                “{doctor.punjabi.quote}”
              </p>
              <p lang="pa" className="mt-4 font-gurmukhi text-[17px] font-medium leading-[1.9] text-brand-muted">
                {doctor.punjabi.paragraphs[2]}
              </p>
            </blockquote>
            <p className="mt-6 border-t border-brand-line pt-5 font-body text-base text-brand-muted">
              <strong className="text-brand-ink">Dr. Sahu&apos;s philosophy:</strong> every patient
              deserves a treatment plan that is scientifically sound, aesthetically pleasing, and
              designed around their individual needs.
            </p>
            <Link href="/about" className="mt-5 inline-flex items-center gap-2 font-body font-semibold text-brand-red">
              Read Dr. Sahu&apos;s story <Icon name="arrow" size={16} strokeWidth={2.2} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Cost */}
      <section className={`py-[104px] ${beforeAfterCases.length ? "" : "bg-brand-warm"}`}>
        <div className={container}>
          <Reveal className="max-w-[720px]">
            <p className={eyebrow}>Cost &amp; payment</p>
            <h2 className={h2}>A healthier smile is within reach</h2>
            <p className={lead}>We talk about cost openly, before any treatment starts.</p>
          </Reveal>
          <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "receipt" as const, title: "A clear estimate first", body: "Before treatment starts, you'll know your options and what each one costs." },
              { icon: "scale" as const, title: "Choices explained", body: "Zirconia crowns from ₹4,000 or PFM from ₹2,000 per tooth*. We explain the difference in strength, look and price." },
              { icon: "card" as const, title: "Easy ways to pay", body: `${payment.methods.map((m) => m.split(" (")[0]).join(", ")}${payment.stagedPayments ? ". Longer treatment can be paid in stages." : "."}` },
            ].map((c) => (
              <div key={c.title} className={`${beforeAfterCases.length ? "bg-brand-warm" : "bg-white"} rounded-[20px] p-7`}>
                <span className={`flex h-12 w-12 items-center justify-center rounded-[14px] ${beforeAfterCases.length ? "bg-white" : "bg-brand-blush"} text-brand-red`}>
                  <Icon name={c.icon} size={24} strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 font-headline text-xl font-bold">{c.title}</h3>
                <p className="mt-2 font-body text-[15px] text-brand-muted">{c.body}</p>
              </div>
            ))}
            <div className="rounded-[20px] bg-brand-maroon p-7 text-white">
              <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-brand-gold text-brand-maroon">
                <Icon name="shield" size={24} strokeWidth={1.8} />
              </span>
              <h3 className="mt-4 font-headline text-xl font-bold">Up to lifetime implant warranty*</h3>
              <p className="mt-2 font-body text-[15px] text-[#E3D1CE]">
                5-year, 10-year or lifetime, depending on your implant option. *Breakage and failure from poor hygiene aren&apos;t covered.
              </p>
              <Link href="/policies#implant-warranty" className="mt-3 inline-flex font-body text-sm font-semibold text-brand-gold hover:underline">
                Read the warranty policy
              </Link>
            </div>
          </div>
          {pricingApproved ? (
            <Link href="/cost-and-payment" className="mt-8 inline-flex items-center gap-2 font-body font-semibold text-brand-red">
              See costs &amp; payment options <Icon name="arrow" size={16} strokeWidth={2.2} />
            </Link>
          ) : null}
        </div>
      </section>

      {/* Call back */}
      <section className={`py-[104px] ${beforeAfterCases.length ? "bg-brand-warm" : ""}`}>
        <div className={`${container} flex flex-wrap items-start gap-14`}>
          <Reveal className="min-w-0 flex-[1_1_400px]">
            <p className={eyebrow}>Have a question?</p>
            <h2 className={h2}>Tell us what&apos;s bothering you. We&apos;ll call you back.</h2>
            <ul className="mt-7 flex flex-col gap-3.5 font-body text-[17px]">
              {["A call from the RedCity team, not a call centre", "In English, Punjabi or Hindi", "No obligation to book"].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <Icon name="check" size={22} strokeWidth={2.4} className="mt-0.5 shrink-0 text-brand-wa" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 inline-flex items-center gap-3.5 rounded-2xl border border-brand-line bg-white px-[18px] py-3.5">
              <span className="font-headline text-3xl font-extrabold leading-none">{business.googleRating.toFixed(1)}</span>
              <span className="flex flex-col gap-1">
                <Stars />
                <span className="font-body text-[13px] text-brand-muted">{reviewLine}</span>
              </span>
            </div>
          </Reveal>
          <div className="min-w-0 flex-[1_1_440px]">
            <CallbackForm />
          </div>
        </div>
      </section>

      {/* Visit */}
      <section className={`py-[104px] ${beforeAfterCases.length ? "" : "bg-brand-warm"}`}>
        <div className={`${container} flex flex-wrap items-center gap-14`}>
          <div className="relative min-w-0 flex-[1_1_480px]">
            <Photo {...clinicPhoto} className="block aspect-[4/3] w-full rounded-3xl object-cover" />
            <span className="absolute bottom-[18px] left-[18px] inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-body text-sm font-semibold shadow-[0_10px_24px_-10px_rgba(0,0,0,0.35)]">
              <Icon name="pin" size={16} className="text-brand-red" />
              Look for the red building
            </span>
          </div>
          <Reveal className="min-w-0 flex-[1_1_380px]">
            <p className={eyebrow}>Visit the clinic</p>
            <h2 className={h2}>Find us in South Model Gram</h2>
            <div className="mt-7 flex flex-col gap-[18px] font-body">
              {[
                { icon: "pin" as const, title: "Address", body: <>{business.streetAddress}, {business.addressLocality}, {business.addressRegion} {business.postalCode}</> },
                { icon: "clock" as const, title: "Clinic hours", body: business.openingHours.length ? business.openingHours.join(" · ") : "Call us for today's hours" },
                { icon: "phone" as const, title: "Call or WhatsApp", body: <a href={`tel:${business.telephone}`} className="font-semibold text-brand-red">{business.telephoneDisplay}</a> },
              ].map((r) => (
                <div key={r.title} className="flex gap-3.5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blush text-brand-red">
                    <Icon name={r.icon} />
                  </span>
                  <span>
                    <strong className="block">{r.title}</strong>
                    <span className="text-brand-muted">{r.body}</span>
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={business.googleBusinessUrl} target="_blank" rel="noopener noreferrer" className={btn.primary}>
                <Icon name="navigate" size={18} />
                Get directions
              </a>
              <Link href="/location" className={btn.outline}>
                Plan your visit
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className={`scroll-mt-20 py-[104px] ${beforeAfterCases.length ? "bg-brand-warm" : ""}`}>
        <div className={container}>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <Reveal>
              <p className={eyebrow}>Patient reviews</p>
              <h2 className={h2}>In our patients&apos; own words</h2>
            </Reveal>
            <a href={business.googleBusinessUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[48px] items-center gap-2.5 rounded-xl border-[1.5px] border-brand-line bg-white px-5 font-body font-semibold text-brand-ink hover:border-brand-red">
              <GoogleG />
              Read all reviews on Google
            </a>
          </div>
          {reviews.length ? (
            <div className="mt-11 grid gap-5 md:grid-cols-3">
              {reviews.map((r) => (
                <figure key={r.name + r.text.slice(0, 12)} className="flex flex-col gap-4 rounded-[20px] border border-brand-line bg-white p-7">
                  <Stars />
                  <blockquote className="font-body text-[17px] leading-relaxed">“{r.text}”</blockquote>
                  <figcaption className="mt-auto font-body text-sm text-brand-muted">
                    <strong className="text-brand-ink">{r.name}</strong> · Google review
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <div className="mt-11 flex flex-wrap items-center gap-6 rounded-3xl border border-brand-line bg-white p-8">
              <span className="font-headline text-6xl font-extrabold leading-none">{business.googleRating.toFixed(1)}</span>
              <span className="flex flex-col gap-2">
                <Stars size={20} />
                <span className="font-body text-base text-brand-muted">
                  {reviewLine}. We don&apos;t write our own testimonials — our patients do, on
                  Google, where we can&apos;t edit a word.
                </span>
              </span>
            </div>
          )}
        </div>
      </section>

      <PhotoReviewCta />
    </main>
  );
}
