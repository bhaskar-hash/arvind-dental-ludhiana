import Link from "next/link";
import { Icon } from "@/components/Icon";
import { ServiceIcon } from "@/components/ServiceIcon";
import { business, photoReviewUrl } from "@/lib/business";
import { AiImage } from "@/components/AiImage";
import { illustration } from "@/lib/illustrations";
import { digitalWorkflow } from "@/lib/site";
import { concerns } from "@/lib/treatment-menu";
import { btn } from "@/lib/styles";

/** "What brings you in today?" — treatments reached by the patient's concern. */
export function ConcernGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {concerns.map((c) =>
        c.urgent ? (
          <a
            key={c.id}
            href={`tel:${business.telephone}`}
            className="group flex flex-col gap-3.5 rounded-[20px] bg-brand-red p-7 text-white hover-lift"
          >
            <span className="flex h-[54px] w-[54px] items-center justify-center rounded-[14px] bg-[#8E1626]">
              <Icon name="alert" size={28} strokeWidth={1.8} />
            </span>
            <span className="font-headline text-[22px] font-bold leading-tight">{c.title}</span>
            <span className="font-body text-[15px] text-[#F7E3E1]">{c.body}</span>
            <span className="mt-auto inline-flex items-center gap-2 font-body text-[15px] font-bold">
              Call {business.telephoneShort}
              <Icon name="arrow" size={16} strokeWidth={2.2} />
            </span>
          </a>
        ) : (
          <Link
            key={c.id}
            href={c.href}
            className="group flex flex-col gap-3.5 rounded-[20px] border border-brand-line bg-white p-7 text-brand-ink hover-lift"
          >
            <span className="flex h-[54px] w-[54px] items-center justify-center rounded-[14px] bg-brand-blush text-brand-red">
              {c.icon === "smile" ? (
                <Icon name="smile" size={28} strokeWidth={1.7} />
              ) : (
                <ServiceIcon slug={c.icon} className="h-7 w-7" />
              )}
            </span>
            <span className="font-headline text-[22px] font-bold leading-tight">{c.title}</span>
            <span className="font-body text-[15px] text-brand-muted">{c.body}</span>
            <span className="mt-auto inline-flex items-center gap-2 font-body text-[15px] font-semibold text-brand-red">
              See my options
              <Icon name="arrow" size={16} strokeWidth={2.2} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ),
      )}
    </div>
  );
}

/** Dr. Sahu's digital workflow, from plan to finished teeth (see lib/site.ts). */
export function DigitalWorkflow({ heading = "Digital dentistry in practice" }: { heading?: string }) {
  return (
    <div>
      <p className="font-body text-[13px] font-bold uppercase tracking-[0.14em] text-brand-red mb-3">
        From plan to finished teeth
      </p>
      <h2 className="font-headline font-extrabold text-[clamp(1.85rem,3.4vw,2.75rem)] leading-[1.12] tracking-[-0.01em]">
        {heading}
      </h2>
      <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {digitalWorkflow.steps.map((s, i) => (
          <li key={s.src} className="overflow-hidden rounded-[22px] border border-brand-line bg-white">
            <picture>
              <source srcSet={`${s.src}.webp`} type="image/webp" />
              <img src={`${s.src}.jpg`} alt={s.title} loading="lazy" width={480} height={360} className="block aspect-[4/3] w-full object-cover" />
            </picture>
            <div className="p-6">
              <span className="font-body text-xs font-bold uppercase tracking-[0.14em] text-brand-muted">Step {i + 1}</span>
              <h3 className="mt-1.5 font-headline text-lg font-bold">{s.title}</h3>
              <p className="mt-1.5 font-body text-[15px] text-brand-muted">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-5 font-body text-sm text-brand-muted">{digitalWorkflow.credit}</p>
    </div>
  );
}

const PHOTO_TILES = [
  {
    image: "photo-front",
    label: "1. Front smile",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M7.5 13h9a4.5 4.5 0 0 1-9 0z" />
        <path d="M9 9h.01M15 9h.01" />
      </>
    ),
  },
  {
    image: "photo-upper",
    label: "2. Upper teeth",
    icon: (
      <>
        <path d="M4 15c2-6 14-6 16 0" />
        <path d="M7 12.5v2M10 11.5v2.5M14 11.5v2.5M17 12.5v2" />
      </>
    ),
  },
  {
    image: "photo-lower",
    label: "3. Lower teeth",
    icon: (
      <>
        <path d="M4 9c2 6 14 6 16 0" />
        <path d="M7 11.5v-2M10 12.5V10M14 12.5V10M17 11.5v-2" />
      </>
    ),
  },
];

/** The closing "send us 3 photos" band. Carries the required review wording. */
export function PhotoReviewCta({
  heading = "Not sure what you need? Send us 3 photos.",
}: {
  heading?: string;
}) {
  return (
    <section id="photo-review" className="scroll-mt-20 bg-brand-red px-6 py-20 text-white sm:py-24">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-12">
        <div className="min-w-0 flex-[1_1_480px]">
          <h2 className="font-headline text-[clamp(2rem,3.8vw,3rem)] font-extrabold leading-[1.1]">{heading}</h2>
          <p className="mt-4 max-w-xl font-body text-lg text-[#F7E3E1]">
            Dr. Sahu will personally review your photos and send you a voice message — this is
            not an automated diagnosis.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={photoReviewUrl} className={btn.white}>
              <Icon name="chat" />
              Send photos on WhatsApp
            </a>
            <a href={`tel:${business.telephone}`} className={btn.whiteOutline}>
              Call {business.telephoneShort}
            </a>
          </div>
        </div>
        <ul className="grid min-w-0 flex-[1_1_340px] grid-cols-3 gap-3.5" aria-label="The 3 photos to send">
          {PHOTO_TILES.map((t) => {
            const img = illustration(t.image);
            return (
              <li key={t.label} className="flex flex-col items-center gap-3 rounded-[18px] bg-white px-3 py-4 text-center text-brand-ink">
                {img ? (
                  <AiImage image={img} className="block aspect-square w-full rounded-xl object-cover" />
                ) : (
                  <span className="flex aspect-square w-full items-center justify-center rounded-xl bg-brand-blush text-brand-red">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      {t.icon}
                    </svg>
                  </span>
                )}
                <span className="font-body text-sm font-bold leading-tight">{t.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
