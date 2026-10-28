"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/Icon";
import { business } from "@/lib/business";
import { pricingApproved } from "@/lib/pricing";

/**
 * Single-row editorial header, after the Shree Anand Fabrics shell: logo,
 * four text links with a sliding underline, the phone number and a pill
 * booking button. Below 1024px a round menu button opens a full-screen
 * maroon menu with large numbered links. The four item names stay as they
 * are: Treatments, Prices & plans, About, Visit us.
 */

type NavItem = { href: string; label: string; match: (p: string) => boolean };

const NAV: NavItem[] = [
  { href: "/services", label: "Treatments", match: (p) => p.startsWith("/services") },
  ...(pricingApproved
    ? [{ href: "/cost-and-payment", label: "Prices & plans", match: (p: string) => p.startsWith("/cost-and-payment") || p.startsWith("/policies") }]
    : []),
  { href: "/about", label: "About", match: (p) => p.startsWith("/about") },
  { href: "/blog", label: "Blog", match: (p) => p.startsWith("/blog") },
  { href: "/location", label: "Visit us", match: (p) => p.startsWith("/location") },
];

/** Shortcuts shown in the mobile menu, so treatments are one tap away. */
const QUICK = [
  { href: "/services/dental-implants", label: "Implants" },
  { href: "/services/root-canal-treatment", label: "Root canal" },
  { href: "/services/crowns", label: "Crowns" },
  { href: "/services/dentures-bridges", label: "Dentures" },
  { href: "/services/emergency-dental-care", label: "Emergency" },
];

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const header = useRef<HTMLElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // While the full-screen menu is open: lock page scroll, move focus into the
  // menu, close on Escape and keep Tab inside the header.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    header.current?.querySelector<HTMLAnchorElement>("#mnav a[href]")?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
      if (e.key === "Tab" && header.current) {
        const items = Array.from(header.current.querySelectorAll<HTMLElement>("a[href],button:not([disabled])")).filter(
          (el) => el.offsetParent !== null,
        );
        const first = items[0];
        const last = items[items.length - 1];
        if (!first || !last) return;
        const outside = !header.current.contains(document.activeElement);
        if (e.shiftKey && (document.activeElement === first || outside)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (document.activeElement === last || outside)) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only z-[60] rounded-xl bg-brand-red px-4 py-3 font-body text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>
      <header
        ref={header}
        className={`hdr sticky top-0 z-40 border-b transition-colors ${
          open ? "border-transparent bg-brand-maroon text-white" : `bg-brand-warm ${scrolled ? "border-brand-line" : "border-transparent"}`
        }`}
      >
        <div className="relative z-40 mx-auto flex min-h-[72px] max-w-6xl items-center justify-between gap-6 px-6">
          <Link
            href="/"
            aria-label={`${business.name}, home`}
            className={`shrink-0 rounded-xl transition-colors ${open ? "bg-white px-2.5 py-1.5" : ""}`}
          >
            <picture>
              <source srcSet="/redcity-logo.webp" type="image/webp" />
              <img src="/redcity-logo.png" width={560} height={169} alt={business.name} className="h-9 w-auto sm:h-10" />
            </picture>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-6 lg:flex xl:gap-8">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={n.match(pathname) ? "page" : undefined}
                className="nav-link whitespace-nowrap font-body text-[15px] font-medium text-brand-ink hover:text-brand-red aria-[current=page]:text-brand-red"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={`tel:${business.telephone}`}
              aria-label={`Call the clinic on ${business.telephoneShort}`}
              className={`hidden items-center gap-2 px-2 font-body text-[15px] font-semibold xl:inline-flex ${open ? "text-white" : "text-brand-ink hover:text-brand-red"}`}
            >
              <Icon name="phone" size={16} className={open ? "text-brand-gold" : "text-brand-red"} />
              {business.telephoneShort}
            </a>
            <Link href={business.bookHref} className="pill-btn hidden min-h-[44px] items-center px-5 text-[14.5px] sm:inline-flex">
              Book a consultation <span className="arr" aria-hidden>→</span>
            </Link>
            <button
              ref={menuBtn}
              type="button"
              aria-expanded={open}
              aria-controls="mnav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
              className={`menu-btn lg:hidden ${open ? "is-open" : ""}`}
            >
              <span />
              <span />
            </button>
          </div>
        </div>

        {open ? (
          <nav id="mnav" aria-label="Mobile" className="mnav lg:hidden">
            <ol>
              <li>
                <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>
                  Home <small>00</small>
                </Link>
              </li>
              {NAV.map((n, i) => (
                <li key={n.href}>
                  <Link href={n.href} aria-current={n.match(pathname) ? "page" : undefined}>
                    {n.label} <small>{String(i + 1).padStart(2, "0")}</small>
                  </Link>
                </li>
              ))}
            </ol>
            <ul aria-label="Popular treatments" className="mt-6 flex flex-wrap gap-2">
              {QUICK.map((q) => (
                <li key={q.href}>
                  <Link
                    href={q.href}
                    className="inline-flex min-h-[40px] items-center rounded-full border border-white/25 px-4 font-body text-sm text-white hover:bg-white/10"
                  >
                    {q.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mnav-foot">
              <div className="flex flex-wrap gap-3">
                <Link href={business.bookHref} className="pill-btn gold min-h-[52px] px-6">
                  Book a consultation <span className="arr" aria-hidden>→</span>
                </Link>
                <a
                  href={`tel:${business.telephone}`}
                  className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-white/30 px-6 font-body text-[15px] font-semibold text-white"
                >
                  <Icon name="phone" size={17} />
                  Call {business.telephoneShort}
                </a>
              </div>
              <p>
                {business.streetAddress}, {business.addressLocality} · English ·{" "}
                <span lang="pa" className="font-gurmukhi">ਪੰਜਾਬੀ</span> · <span lang="hi">हिंदी</span>
              </p>
            </div>
          </nav>
        ) : null}
      </header>
    </>
  );
}
