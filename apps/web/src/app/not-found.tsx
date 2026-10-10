import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { business } from "@/lib/business";
import { btn, container, eyebrow } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

const LINKS = [
  { href: "/services", label: "All treatments" },
  { href: "/cost-and-payment", label: "Prices & plans" },
  { href: "/resources", label: "Questions & answers" },
  { href: "/location", label: "Visit us" },
];

export default function NotFound() {
  return (
    <main className="bg-brand-warm py-24">
      <div className={`${container} max-w-3xl`}>
        <p className={eyebrow}>Page not found</p>
        <h1 className="font-headline text-[clamp(2.2rem,4.5vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.02em]">
          We couldn&apos;t find that page.
        </h1>
        <p className="mt-4 max-w-xl font-body text-lg text-brand-muted">
          The link may be old or mistyped. Try one of these, or call us and we&apos;ll help.
        </p>
        <ul className="mt-8 flex flex-wrap gap-3">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={btn.outline}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className={btn.primary}>
            Go to the home page
          </Link>
          <a href={`tel:${business.telephone}`} className={btn.outline}>
            <Icon name="phone" size={18} />
            Call {business.telephoneShort}
          </a>
        </div>
      </div>
    </main>
  );
}
