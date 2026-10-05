import Link from "next/link";
import { Icon } from "@/components/Icon";
import { business } from "@/lib/business";
import { pricingApproved } from "@/lib/pricing";
import { policiesApproved } from "@/lib/policies";

const COL_HEAD = "font-body text-xs font-bold uppercase tracking-[0.14em] text-brand-gold mb-1";
const LINK = "font-body text-[15px] text-[#E9DAD7] hover:text-white";

export function SiteFooter() {
  const forPatients = [
    { label: "Why RedCity", href: "/about" },
    { label: "Meet Dr. Sahu", href: "/about" },
    { label: "Patient reviews", href: "/#reviews" },
    ...(pricingApproved ? [{ label: "Cost & payment", href: "/cost-and-payment" }] : []),
    ...(policiesApproved ? [{ label: "Patient policies", href: "/policies" }] : []),
  ];
  const socials = (["instagram", "facebook", "youtube"] as const).filter((s) => business.social[s]);

  return (
    <footer className="bg-brand-footer text-[#CDBCB9]">
      <div className="mx-auto max-w-6xl px-6 pb-7 pt-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <span className="self-start rounded-xl bg-white px-3.5 py-2">
              <picture>
                <source srcSet="/redcity-logo.webp" type="image/webp" />
                <img src="/redcity-logo.png" width={560} height={169} alt={business.name} className="h-9 w-auto" />
              </picture>
            </span>
            <p className="font-body text-[15px] text-[#E9DAD7]">
              Honest, specialist dental care for every family in Ludhiana, planned around you.
            </p>
            <div className="flex flex-col gap-1.5 font-body text-sm">
              <span>
                {business.streetAddress}, {business.addressLocality}, {business.addressRegion}{" "}
                {business.postalCode}
              </span>
              <a href={`tel:${business.telephone}`} className="font-semibold text-white">
                {business.telephoneDisplay}
              </a>
              {business.openingHours.length ? <span>{business.openingHours.join(" · ")}</span> : null}
            </div>
          </div>

          <nav aria-label="Treatments" className="flex flex-col gap-2.5">
            <p className={COL_HEAD}>Treatments</p>
            {[
              { label: "Dental implants", href: "/services/dental-implants" },
              { label: "Root canal treatment", href: "/services/root-canal-treatment" },
              { label: "Crowns & bridges", href: "/services/crowns" },
              { label: "Veneers & smile design", href: "/services/veneers" },
              { label: "Dentures", href: "/services/dentures-bridges" },
              { label: "Kids' dentistry", href: "/services/paediatric-dentistry" },
              { label: "Emergency care", href: "/services/emergency-dental-care" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className={LINK}>
                {l.label}
              </Link>
            ))}
          </nav>

          <nav aria-label="For patients" className="flex flex-col gap-2.5">
            <p className={COL_HEAD}>For patients</p>
            {forPatients.map((l) => (
              <Link key={l.label} href={l.href} className={LINK}>
                {l.label}
              </Link>
            ))}
          </nav>

          <nav aria-label="Help" className="flex flex-col gap-2.5">
            <p className={COL_HEAD}>Help</p>
            {[
              { label: "Questions & answers", href: "/resources" },
              { label: "Articles", href: "/blog" },
              { label: "Dental emergency first aid", href: "/resources#emergency" },
              { label: "Visit us", href: "/location" },
              { label: "Book a consultation", href: business.bookHref },
            ].map((l) => (
              <Link key={l.label} href={l.href} className={LINK}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-12 rounded-2xl border border-[#3A2A2C] px-5 py-4 font-body text-[13px] text-[#B7A5A2]">
          Information on this website is general and is not a diagnosis. Dr. Sahu will personally
          review your photos and send you a voice message — this is not an automated diagnosis.
          Treatment is advised only after an examination.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[#3A2A2C] pt-5 font-body text-[13px]">
          <span>
            © {new Date().getFullYear()} {business.name}
          </span>
          <span className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-white">
              Privacy policy
            </Link>
            {policiesApproved ? (
              <Link href="/policies" className="hover:text-white">
                Patient policies
              </Link>
            ) : null}
          </span>
          {socials.length ? (
            <span className="flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s}
                  href={business.social[s]}
                  aria-label={`RedCity on ${s[0].toUpperCase()}${s.slice(1)}`}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#3A2A2C] text-[#E9DAD7] hover:text-white"
                >
                  <Icon name={s} size={18} />
                </a>
              ))}
            </span>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
