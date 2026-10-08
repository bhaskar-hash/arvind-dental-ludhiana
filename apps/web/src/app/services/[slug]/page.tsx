import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { treatmentHero } from "@/lib/illustrations";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Icon } from "@/components/Icon";
import { AiImage } from "@/components/AiImage";
import { ImplantIllustration } from "@/components/ImplantIllustration";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { DigitalWorkflow, PhotoReviewCta } from "@/components/Sections";
import { ServiceIcon } from "@/components/ServiceIcon";
import { blogPosts } from "@/lib/blog";
import { business, photoReviewUrl } from "@/lib/business";
import { pricingApproved } from "@/lib/pricing";
import { buildServiceSchemaGraph } from "@/lib/schema";
import { getServiceBySlug, relatedServices, services } from "@/lib/services";
import { btn, container, eyebrow, h2 } from "@/lib/styles";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.metaDescription,
    alternates: { canonical: `${business.siteUrl}/services/${service.slug}` },
    openGraph: {
      title: service.name,
      description: service.metaDescription,
      url: `${business.siteUrl}/services/${service.slug}`,
      type: "website",
    },
  };
}

const CHECK = <Icon name="check" size={24} strokeWidth={2.4} className="mt-0.5 shrink-0 text-brand-red" />;

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const isImplant = service.slug === "dental-implants";
  const relatedPosts = blogPosts.filter((p) => p.relatedService === service.slug);
  const heroImage = treatmentHero(service.slug);
  const related = (relatedServices[service.slug] ?? [])
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  // Sections alternate white / warm in render order, starting after the warm
  // hero. Each section calls nextBg() once for its own className.
  let warm = true;
  const nextBg = () => {
    warm = !warm;
    return warm ? "bg-brand-warm" : "";
  };

  return (
    <main>
      <JsonLd data={buildServiceSchemaGraph(service)} />

      {/* Hero */}
      <section className="overflow-hidden bg-brand-warm pb-24">
        <Breadcrumbs
          width="max-w-6xl"
          items={[
            { name: "Home", path: "/" },
            { name: "Treatments", path: "/services" },
            { name: service.shortName, path: `/services/${service.slug}` },
          ]}
        />
        <div className={`${container} mt-10 flex flex-wrap items-center gap-14`}>
          <div className="min-w-0 flex-[1_1_520px]">
            {service.eyebrow ? <p className={`hero-in hero-in-1 ${eyebrow}`}>{service.eyebrow}</p> : null}
            <h1 className="hero-in hero-in-2 font-headline text-[clamp(2.3rem,4.6vw,3.6rem)] font-extrabold leading-[1.06] tracking-[-0.02em]">
              {service.headline ?? service.name}
            </h1>
            <p className="hero-in hero-in-3 mt-5 max-w-[580px] font-body text-[19px] text-brand-muted">{service.intro}</p>
            <div className="hero-in hero-in-4 mt-8 flex flex-wrap gap-3">
              {service.slug === "emergency-dental-care" ? (
                <>
                  <a href={`tel:${business.telephone}`} className={btn.primary}>
                    <Icon name="phone" size={18} />
                    Call {business.telephoneShort}
                  </a>
                  <a href={business.whatsappUrl} className={btn.outline}>
                    WhatsApp us
                  </a>
                </>
              ) : (
                <>
                  <a href={photoReviewUrl} className={btn.primary}>
                    {isImplant ? "Ask if implants could work for you" : "Get Dr. Sahu's opinion on your photos"}
                  </a>
                  <a href={`tel:${business.telephone}`} className={btn.outline}>
                    Call {business.telephoneShort}
                  </a>
                </>
              )}
            </div>
            {service.warrantyHeadline ? (
              <div className="mt-8 inline-flex items-center gap-4 rounded-[18px] bg-brand-maroon px-[22px] py-[18px] text-white">
                <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[14px] bg-brand-gold text-brand-maroon">
                  <Icon name="shield" size={26} strokeWidth={1.8} />
                </span>
                <span className="flex flex-col font-body leading-snug">
                  <strong className="text-[17px]">Up to lifetime warranty* on your implant</strong>
                  <span className="text-sm text-[#E3D1CE]">
                    5-year, 10-year or lifetime, depending on the implant option.{" "}
                    <Link href="/policies#implant-warranty" className="font-semibold text-brand-gold-light underline">
                      *See the warranty policy
                    </Link>
                  </span>
                </span>
              </div>
            ) : null}
          </div>
          <div className="flex min-w-0 flex-[1_1_340px] justify-center">
            {isImplant ? (
              <ImplantIllustration />
            ) : heroImage ? (
              <AiImage
                image={heroImage}
                priority
                className="block aspect-square w-full max-w-[420px] rounded-[28px] object-cover shadow-[0_30px_60px_-32px_rgba(43,10,15,0.4)]"
              />
            ) : (
              <div className="flex aspect-square w-full max-w-[360px] items-center justify-center rounded-[28px] border border-brand-line bg-white shadow-[0_30px_60px_-32px_rgba(43,10,15,0.4)]">
                <span className="flex h-40 w-40 items-center justify-center rounded-full bg-brand-red text-white shadow-lg shadow-brand-red/30">
                  <ServiceIcon slug={service.slug} className="h-20 w-20" />
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Is this for me? */}
      {service.forYou ? (
        <section className={`py-24 ${nextBg()}`}>
          <div className={`${container} flex flex-wrap items-start gap-12`}>
            <Reveal className="min-w-0 flex-[1_1_380px]">
              <p className={eyebrow}>Is this for me?</p>
              <h2 className={h2}>{service.forYou.heading}</h2>
              {service.forYou.note ? <p className="mt-4 font-body text-[17px] text-brand-muted">{service.forYou.note}</p> : null}
            </Reveal>
            <ul className="flex min-w-0 flex-[1_1_520px] flex-col gap-[18px] rounded-3xl bg-brand-warm p-8 font-body text-[17px]">
              {service.forYou.points.map((p) => (
                <li key={p} className="flex items-start gap-3.5">
                  {CHECK}
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Causes (root canal) */}
      {service.reasons ? (
        <section className={`py-24 ${nextBg()}`}>
          <div className={container}>
            <Reveal className="max-w-[760px]">
              <p className={eyebrow}>The right diagnosis first</p>
              <h2 className={h2}>{service.reasonsHeading ?? "What could be causing it"}</h2>
            </Reveal>
            <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {service.reasons.map((r, i) => (
                <Reveal key={r.label} delay={i % 3}>
                  <div className="h-full rounded-[22px] border border-brand-line bg-white p-7">
                    <h3 className="font-headline text-xl font-bold">{r.label}</h3>
                    <p className="mt-2 font-body text-base text-brand-muted">{r.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            {service.callout ? (
              <p className="mt-8 rounded-[20px] bg-brand-maroon px-7 py-6 font-body text-[17px] text-white">{service.callout}</p>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* How it's built */}
      {service.parts ? (
        <section className={`py-24 ${nextBg()}`}>
          <div className={container}>
            <Reveal className="max-w-[720px]">
              <p className={eyebrow}>How an implant is built</p>
              <h2 className={h2}>{service.parts.heading}</h2>
            </Reveal>
            <div className="mt-11 grid gap-5 md:grid-cols-3">
              {service.parts.items.map((p, i) => (
                <Reveal key={p.title} delay={i}>
                  <div className="h-full rounded-[22px] border border-brand-line bg-white p-[30px]">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-red font-body text-lg font-bold text-white">{i + 1}</span>
                    <h3 className="mt-4 font-headline text-[22px] font-bold">{p.title}</h3>
                    <p className="mt-2 font-body text-base text-brand-muted">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Dr. Sahu's digital workflow (implants) */}
      {isImplant ? (
        <section className={`py-24 ${nextBg()}`}>
          <div className={container}>
            <DigitalWorkflow heading="Planned digitally, made precisely" />
          </div>
        </section>
      ) : null}

      {/* Options + comparison */}
      {service.options || service.comparisonTable ? (
        <section className={`py-24 ${nextBg()}`}>
          <div className={container}>
            {service.options ? (
              <>
                <Reveal>
                  <p className={eyebrow}>Your options</p>
                  <h2 className={h2}>{service.options.heading}</h2>
                </Reveal>
                <div className="mt-11 grid gap-5 md:grid-cols-3">
                  {service.options.items.map((o) => (
                    <div key={o.title} className="rounded-[22px] border border-brand-line bg-white p-[30px]">
                      <h3 className="font-headline text-[22px] font-bold">{o.title}</h3>
                      <p className="mt-2.5 font-body text-base text-brand-muted">{o.body}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : null}
            {service.comparisonTable ? (
              <div className={service.options ? "mt-[72px]" : ""}>
                {service.options ? (
                  <h3 className="font-headline text-[26px] font-bold">{service.comparisonHeading}</h3>
                ) : (
                  <Reveal>
                    <p className={eyebrow}>Compare your choices</p>
                    <h2 className={h2}>{service.comparisonHeading ?? "Compare your options"}</h2>
                  </Reveal>
                )}
                <div className="mt-6 overflow-x-auto rounded-[20px] border border-brand-line bg-white">
                  <table className="w-full min-w-[640px] border-collapse text-left font-body text-base">
                    <thead>
                      <tr className="bg-brand-warm">
                        {service.comparisonTable.columns.map((c, i) => (
                          <th key={c || "label"} scope="col" className={`px-[22px] py-[18px] font-headline text-lg ${i === 1 ? "text-brand-red" : ""}`}>
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {service.comparisonTable.rows.map((r) => (
                        <tr key={r.label} className="border-t border-brand-line">
                          <th scope="row" className="px-[22px] py-4 align-top font-semibold">{r.label}</th>
                          {r.values.map((v, i) => (
                            <td key={i} className="px-[22px] py-4 align-top text-brand-muted">{v}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {service.comparisonTable.footnote ? (
                  <p className="mt-3 font-body text-sm text-brand-muted">{service.comparisonTable.footnote}</p>
                ) : null}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Benefits + trust (root canal) */}
      {service.benefits || service.trustPoints ? (
        <section className={`py-24 ${nextBg()}`}>
          <div className={`${container} grid gap-6 md:grid-cols-2`}>
            {service.benefits ? (
              <div className="rounded-[22px] border border-brand-line bg-white p-8">
                <h2 className="font-headline text-2xl font-bold">Why we save natural teeth</h2>
                <ul className="mt-5 flex flex-col gap-3 font-body text-[17px]">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3">{CHECK}{b}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {service.trustPoints ? (
              <div className="rounded-[22px] border border-brand-line bg-white p-8">
                <h2 className="font-headline text-2xl font-bold">How Dr. Sahu decides</h2>
                <ul className="mt-5 flex flex-col gap-3 font-body text-[17px]">
                  {service.trustPoints.map((t) => (
                    <li key={t} className="flex items-start gap-3">{CHECK}{t}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Cost factors */}
      {service.costFactors ? (
        <section className={`py-24 ${nextBg()}`}>
          <div className={container}>
            <Reveal className="max-w-[760px]">
              <p className={eyebrow}>Cost</p>
              <h2 className={h2}>What affects the cost?</h2>
              <p className="mt-4 font-body text-[17px] text-brand-muted">{service.costFactors.lead}</p>
            </Reveal>
            <div className="mt-10 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
              {service.costFactors.items.map((f, i) => (
                <div key={f.title} className={`rounded-[20px] p-[26px] ${warm ? "bg-white" : "bg-brand-warm"}`}>
                  <p className="font-headline text-3xl font-extrabold text-brand-red">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 font-body text-lg font-bold">{f.title}</h3>
                  <p className="mt-1.5 font-body text-[15px] text-brand-muted">{f.body}</p>
                </div>
              ))}
            </div>
            {pricingApproved ? (
              <Link href="/cost-and-payment" className={`${btn.outline} mt-7 min-h-[50px]`}>
                Cost &amp; payment options
              </Link>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* FAQs */}
      <section className={`py-24 ${nextBg()}`}>
        <div className="mx-auto max-w-3xl px-6">
          <p className={eyebrow}>Questions patients ask</p>
          <h2 className={h2}>{service.shortName} questions</h2>
          <div className="mt-8">
            <FaqAccordion faqs={service.faqs} />
          </div>
        </div>
      </section>

      {/* Related */}
      <section className={`py-[88px] ${nextBg()}`}>
        <div className={container}>
          {relatedPosts.length ? (
            <div className="mb-14">
              <h2 className="font-headline text-[30px] font-extrabold">Read more from Dr. Sahu</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {relatedPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex items-center justify-between gap-4 rounded-[18px] border border-brand-line bg-white p-5 font-body font-semibold hover:border-brand-red">
                    {post.title}
                    <Icon name="arrow" size={18} strokeWidth={2.2} className="shrink-0 text-brand-red transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
          <h2 className="font-headline text-[30px] font-extrabold">Related treatments</h2>
          <div className="mt-7 grid gap-[18px] md:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/services/${r.slug}`} className="flex items-center gap-4 rounded-[18px] border border-brand-line bg-white p-5 text-brand-ink hover:border-brand-red">
                <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-brand-red text-white">
                  <ServiceIcon slug={r.slug} className="h-[26px] w-[26px]" />
                </span>
                <span className="font-body text-[17px] font-bold">{r.shortName}</span>
              </Link>
            ))}
          </div>
          {service.closingLine ? (
            <p className="mt-14 text-center font-headline text-xl font-bold">{service.closingLine}</p>
          ) : null}
        </div>
      </section>

      <PhotoReviewCta heading={isImplant ? "Wondering if an implant could work for you?" : undefined} />
    </main>
  );
}
