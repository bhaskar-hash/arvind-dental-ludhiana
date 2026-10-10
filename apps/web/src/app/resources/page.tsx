import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { AiImage, ArticleCover } from "@/components/AiImage";
import { blogPosts } from "@/lib/blog";
import { business } from "@/lib/business";
import { illustration } from "@/lib/illustrations";
import { buildFaqSchema } from "@/lib/schema";
import { btn, container, eyebrow, h2 } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Dental Questions & Emergency First Aid",
  description: `Answers to the questions patients ask ${business.name} most, plain-English dental guides from Dr. Sahu, and what to do in a dental emergency.`,
  alternates: { canonical: `${business.siteUrl}/resources` },
};

const FAQ_GROUPS = [
  {
    id: "booking",
    title: "Booking & visits",
    faqs: [
      {
        question: "How do I book an appointment?",
        answer: `Call ${business.telephoneDisplay}, message us on WhatsApp, or request a time online and we'll confirm it with you.`,
      },
      {
        question: "Can I send photos before I visit?",
        answer:
          "Yes. Send 3 photos on WhatsApp: your smile from the front, your upper teeth and your lower teeth. Dr. Sahu will personally review your photos and send you a voice message — this is not an automated diagnosis. You can then book a visit if you need one.",
      },
      {
        question: "Where exactly is the clinic?",
        answer: `${business.streetAddress}, ${business.addressLocality}, ${business.addressRegion} ${business.postalCode}, near South Model Town. Look for the red building with the RedCity signboard.`,
      },
    ],
  },
  {
    id: "cost",
    title: "Cost",
    faqs: [
      {
        question: "Can you tell me the price over the phone?",
        answer:
          "We can share starting prices, for example crowns from ₹2,000 per tooth. An exact figure needs an examination, because it depends on your teeth, gums and bone.",
      },
      {
        question: "Is there a warranty on dental implants?",
        answer:
          "Yes. Depending on the implant option, your implant carries a 5-year, 10-year or lifetime warranty against implant failure. Breakage, and failure caused by poor oral hygiene, are not covered.",
      },
    ],
  },
  {
    id: "treatments",
    title: "Treatments",
    faqs: [
      {
        question: "Does every toothache mean I need a root canal?",
        answer:
          "No. Cavities, gum problems, sensitivity, grinding and even sinus issues can all cause tooth pain without needing a root canal. The right diagnosis comes first, because an unnecessary root canal can weaken a tooth.",
      },
      {
        question: "Is getting a dental implant painful?",
        answer:
          "The implant is placed under local anaesthesia. Most patients describe the recovery as similar to having a tooth taken out, managed with routine aftercare.",
      },
    ],
  },
  {
    id: "children",
    title: "Children",
    faqs: [
      {
        question: "Do you treat children?",
        answer:
          "Yes. We offer gentle check-ups, fillings and sealants for children, and take time to make the first visit calm and positive.",
      },
    ],
  },
];

const FEATURED_ARTICLES = [
  "signs-you-might-need-a-root-canal",
  "dental-implants-vs-bridges",
  "dental-implant-cost-factors",
  "veneers-vs-crowns",
  "teeth-whitening-myths",
  "denture-care-guide",
];

const FIRST_AID = [
  {
    image: "aid-knocked-out",
    title: "Knocked-out tooth",
    body: "Hold it by the crown, never the root. Rinse gently, don't scrub. Keep it in milk or back in its socket, and come in within the hour.",
  },
  {
    image: "aid-toothache",
    title: "Severe toothache",
    body: "Rinse with warm salt water and floss gently. Use a cold compress on the cheek. Never put aspirin against the gum.",
  },
  {
    image: "aid-broken",
    title: "Broken or chipped tooth",
    body: "Save every piece in milk or water. Rinse with warm water and cover sharp edges with sugar-free gum.",
  },
  {
    image: "aid-bleeding",
    title: "Bleeding that won't stop",
    body: "Press clean, damp gauze firmly for 15 minutes without checking. If it continues, call us.",
  },
];

export default function ResourcesPage() {
  const articles = FEATURED_ARTICLES.map((slug) => blogPosts.find((p) => p.slug === slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

  return (
    <main>
      <JsonLd data={{ "@context": "https://schema.org", ...buildFaqSchema(FAQ_GROUPS.flatMap((g) => g.faqs)) }} />

      <section className="bg-brand-warm pb-[72px] pt-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className={`hero-in hero-in-1 ${eyebrow}`}>Resources</p>
          <h1 className="hero-in hero-in-2 font-headline text-[clamp(2.3rem,4.6vw,3.5rem)] font-extrabold leading-[1.06] tracking-[-0.02em]">
            Answers to the questions patients ask most
          </h1>
          <nav aria-label="Jump to" className="hero-in hero-in-3 mt-8 flex flex-wrap justify-center gap-2.5">
            {[
              ...FAQ_GROUPS.map((g) => ({ href: `#${g.id}`, label: g.title })),
              { href: "#articles", label: "Articles" },
              { href: "#emergency", label: "Emergency first aid" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="inline-flex min-h-[44px] items-center rounded-full border-[1.5px] border-brand-line bg-white px-[18px] font-body text-[15px] font-semibold text-brand-ink hover:border-brand-red hover:text-brand-red"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="py-[88px]">
        <div className="mx-auto flex max-w-3xl flex-col gap-14 px-6">
          {FAQ_GROUPS.map((g) => (
            <div key={g.id} id={g.id} className="scroll-mt-24">
              <h2 className="font-headline text-[28px] font-extrabold">{g.title}</h2>
              <div className="mt-5">
                <FaqAccordion faqs={g.faqs} openFirst={false} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="articles" className="scroll-mt-20 bg-brand-warm py-24">
        <div className={container}>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <Reveal>
              <p className={eyebrow}>Articles</p>
              <h2 className={h2}>Plain-English guides from Dr. Sahu</h2>
            </Reveal>
            <Link href="/blog" className={`${btn.outline} min-h-[48px]`}>
              All {blogPosts.length} articles
            </Link>
          </div>
          <div className="mt-10 grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((post, i) => (
              <Reveal key={post.slug} delay={i % 3} className="h-full">
                <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-brand-line bg-white text-brand-ink hover-lift">
                  <ArticleCover slug={post.slug} service={post.relatedService} iconClass="h-14 w-14" />
                  <span className="flex flex-col gap-2 px-[26px] pb-7 pt-6">
                    <span className="font-headline text-[21px] font-bold leading-snug">{post.title}</span>
                    <span className="font-body text-[15px] text-brand-muted">{post.metaDescription}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="emergency" className="scroll-mt-20 py-24">
        <div className={container}>
          <div className="rounded-[28px] border-2 border-brand-red p-[clamp(1.75rem,4vw,3rem)]">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-[640px]">
                <p className={eyebrow}>Dental emergency first aid</p>
                <h2 className={h2}>What to do before you reach the clinic</h2>
              </div>
              <a href={`tel:${business.telephone}`} className={btn.primary}>
                <Icon name="phone" size={18} />
                Call before you travel
              </a>
            </div>
            <div className="mt-9 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
              {FIRST_AID.map((f) => {
                const img = illustration(f.image);
                return (
                  <div key={f.title} className="overflow-hidden rounded-[18px] bg-brand-warm border border-brand-line">
                    {img ? (
                      <AiImage image={img} className="block aspect-[4/3] w-full object-cover" />
                    ) : (
                      <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 bg-brand-blush/60 text-brand-red">
                        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-brand-red shadow-sm">
                          {f.image === "aid-knocked-out" && (
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                              <path d="M12 3.5c-2 0-2.8 1-4.4 1S5 3.8 4.4 5.3C3.6 7.2 4 9.5 4.8 12c.7 2.2.8 5.6 1.7 6.9.7 1 1.6.4 2-1 .4-1.6.6-3.6 1.5-3.6h.1c.9 0 1.1 2 1.5 3.6.4 1.4 1.3 2 2 1 .9-1.3 1-4.7 1.7-6.9.8-2.5 1.2-4.8.4-6.7C16.5 3.8 15 5.5 13.4 4.5c-.5-.6-.9-1-1.4-1Z" />
                              <path d="M19 14v6M16 17h6" strokeWidth={2} />
                            </svg>
                          )}
                          {f.image === "aid-toothache" && (
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                              <circle cx="12" cy="12" r="9" />
                              <path d="M8 15s1.5-2 4-2 4 2 4 2" />
                              <path d="M9 9h.01M15 9h.01" />
                              <path d="M17 5l3 3M20 5l-3 3" strokeWidth={1.5} />
                            </svg>
                          )}
                          {f.image === "aid-broken" && (
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                              <path d="M12 3.5c-2 0-2.8 1-4.4 1S5 3.8 4.4 5.3C3.6 7.2 4 9.5 4.8 12c.7 2.2.8 5.6 1.7 6.9.7 1 1.6.4 2-1 .4-1.6.6-3.6 1.5-3.6h.1" />
                              <path d="M12 4l2 5-3 2 4 3-2 5" strokeWidth={1.5} />
                            </svg>
                          )}
                          {f.image === "aid-bleeding" && (
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                              <rect x="5" y="5" width="14" height="14" rx="3" />
                              <path d="M12 8v8M8 12h8" strokeWidth={2.4} />
                            </svg>
                          )}
                        </span>
                        <span className="font-body text-xs font-bold uppercase tracking-wider text-brand-red">Emergency Care</span>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-body text-lg font-bold">{f.title}</h3>
                      <p className="mt-2 font-body text-[15px] text-brand-muted">{f.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-6 rounded-[14px] bg-brand-maroon px-5 py-4 font-body text-[15px] text-white">
              For heavy bleeding, an injury after an accident, or swelling that makes it hard to
              breathe or swallow, go to the nearest hospital emergency department.
            </p>
            <Link href="/blog/dental-emergency-first-aid" className="mt-5 inline-flex items-center gap-2 font-body font-semibold text-brand-red">
              Read the full first-aid guide <Icon name="arrow" size={16} strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
