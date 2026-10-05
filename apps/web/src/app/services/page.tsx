import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { ConcernGrid, PhotoReviewCta } from "@/components/Sections";
import { ServiceIcon } from "@/components/ServiceIcon";
import { business, whatsappLink } from "@/lib/business";
import { buildDentistSchema } from "@/lib/schema";
import { getServiceBySlug, moreServices } from "@/lib/services";
import { container, eyebrow, h2 } from "@/lib/styles";
import { slugify } from "@/lib/treatment-menu";

export const metadata: Metadata = {
  title: "Dental Treatments & Services in Ludhiana",
  description: `Every treatment at ${business.name}, ${business.addressLocality} — implants, root canal, crowns, veneers, whitening, dentures, emergency, kids' dentistry and more.`,
  alternates: { canonical: `${business.siteUrl}/services` },
};

/** Every treatment the clinic lists, grouped as in the header's Treatments menu. */
const GROUPS = [
  {
    id: "replace-missing-teeth",
    title: "Replace missing teeth",
    pages: ["dental-implants", "dentures-bridges", "crowns"],
    more: ["Full Mouth Rehabilitation"],
  },
  {
    id: "treat-and-protect",
    title: "Treat & protect",
    pages: ["root-canal-treatment", "laser-dentistry", "paediatric-dentistry", "emergency-dental-care"],
    more: [
      "Routine Check-ups",
      "Digital Dental X-rays",
      "Teeth Cleaning (Scaling)",
      "Fillings & Sealants",
      "Tooth Extractions",
      "Wisdom Tooth Removal",
      "Oral Surgery",
    ],
  },
  {
    id: "improve-your-smile",
    title: "Improve your smile",
    pages: ["teeth-whitening", "veneers"],
    more: ["Smile Makeover", "Dental Bonding", "Teeth Reshaping", "Mouth Guards & Night Guards"],
  },
];

export default function ServicesIndexPage() {
  return (
    <main>
      <JsonLd data={{ "@context": "https://schema.org", ...buildDentistSchema() }} />

      <section className="bg-brand-warm pb-20 pt-20">
        <div className={container}>
          <p className={`hero-in hero-in-1 ${eyebrow}`}>Treatments</p>
          <h1 className="hero-in hero-in-2 max-w-3xl font-headline text-[clamp(2.4rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
            Every treatment, explained simply
          </h1>
          <p className="hero-in hero-in-3 mt-5 max-w-2xl font-body text-lg text-brand-muted">
            20+ treatments under one roof, each planned by {business.doctorName},{" "}
            {business.doctorCredentials}. Start with what&apos;s bothering you, or browse by
            treatment.
          </p>
          <div className="mt-12">
            <ConcernGrid />
          </div>
        </div>
      </section>

      {GROUPS.map((g, gi) => (
        <section key={g.id} id={g.id} className={`scroll-mt-20 py-24 ${gi % 2 ? "bg-brand-warm" : ""}`}>
          <div className={container}>
            <Reveal>
              <h2 className={h2}>{g.title}</h2>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {g.pages.map((slug, i) => {
                const s = getServiceBySlug(slug);
                if (!s) return null;
                return (
                  <Reveal key={slug} delay={i % 3} className="h-full">
                    <Link href={`/services/${slug}`} className="group flex h-full flex-col rounded-[22px] border border-brand-line bg-white p-7 text-brand-ink hover-lift">
                      <span className="badge-pop flex h-[60px] w-[60px] items-center justify-center rounded-full bg-brand-red text-white">
                        <ServiceIcon slug={slug} className="h-7 w-7" />
                      </span>
                      <span className="mt-5 font-headline text-[22px] font-bold">{s.shortName}</span>
                      <span className="mt-2 font-body text-[15px] text-brand-muted">{s.metaDescription}</span>
                      <span className="mt-auto inline-flex items-center gap-2 pt-4 font-body text-[15px] font-semibold text-brand-red">
                        Learn more <Icon name="arrow" size={16} strokeWidth={2.2} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
              {g.more.map((name) => {
                const m = moreServices.find((x) => x.name === name);
                if (!m) return null;
                return (
                  <div key={name} id={slugify(name)} className="flex scroll-mt-24 flex-col rounded-[22px] border border-brand-line bg-white p-7">
                    <h3 className="font-headline text-xl font-bold">{m.name}</h3>
                    <p className="mt-2 font-body text-[15px] text-brand-muted">{m.body}</p>
                    <a
                      href={whatsappLink(`Hi, I'd like to ask about ${m.name.toLowerCase()} at RedCity Dental Care.`)}
                      className="mt-auto inline-flex items-center gap-2 pt-4 font-body text-[15px] font-semibold text-brand-red"
                    >
                      Ask about this <Icon name="arrow" size={16} strokeWidth={2.2} />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      <PhotoReviewCta heading="Not sure which treatment you need? Send us 3 photos." />
    </main>
  );
}
