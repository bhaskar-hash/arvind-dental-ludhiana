"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/Icon";
import { business, photoReviewUrl } from "@/lib/business";
import { concerns, menuGroups } from "@/lib/treatment-menu";
import { pricingApproved } from "@/lib/pricing";

type NavItem = { label: string; href: string; match: (p: string) => boolean };

const NAV: NavItem[] = [
  { label: "Why RedCity", href: "/about", match: (p) => p.startsWith("/about") },
  ...(pricingApproved
    ? [{ label: "Cost & Payment", href: "/cost-and-payment", match: (p: string) => p.startsWith("/cost-and-payment") }]
    : []),
  { label: "Visit Us", href: "/location", match: (p) => p.startsWith("/location") },
  { label: "Resources", href: "/resources", match: (p) => p.startsWith("/resources") || p.startsWith("/blog") },
];

function TopBar() {
  return (
    <div className="bg-brand-maroon text-[#F3E7E4] font-body text-[13px]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-6 py-2">
        <span className="inline-flex items-center gap-2">
          <Icon name="globe" size={15} />
          <span>
            <span className="hidden sm:inline">We speak </span>
            {business.languages.map((l, i) => (
              <span key={l}>
                {i > 0 ? " · " : ""}
                <span lang={i === 1 ? "pa" : i === 2 ? "hi" : undefined} className={i === 1 ? "font-gurmukhi" : undefined}>
                  {l}
                </span>
              </span>
            ))}
          </span>
        </span>
        <span className="inline-flex flex-wrap items-center gap-x-6 gap-y-1">
          <span className="hidden items-center gap-2 md:inline-flex">
            <Icon name="pin" size={15} />
            {business.streetAddress}, {business.addressLocality}
          </span>
          <a href={`tel:${business.telephone}`} className="inline-flex items-center gap-2 font-semibold text-white">
            <Icon name="phone" size={15} />
            {business.telephoneDisplay}
          </a>
        </span>
      </div>
    </div>
  );
}

function TreatmentsPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-7 pt-8">
      <div className="grid gap-8 lg:grid-cols-4">
        <nav aria-label="Treatments by concern" className="rounded-2xl bg-brand-warm p-5">
          <p className="mb-2 font-body text-xs font-bold uppercase tracking-[0.14em] text-brand-red">
            What&apos;s bothering you?
          </p>
          <ul>
            {concerns.map((c) => (
              <li key={c.id}>
                <Link
                  href={c.href}
                  onClick={onNavigate}
                  className={`flex min-h-[40px] items-center justify-between gap-3 font-body text-[15px] font-semibold hover:text-brand-red ${
                    c.urgent ? "text-brand-red" : "text-brand-ink"
                  }`}
                >
                  {c.short}
                  <Icon name="chevronRight" size={14} strokeWidth={2.2} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {menuGroups.map((g) => (
          <nav key={g.id} aria-label={g.title} className="lg:pt-5">
            <p className="mb-2 font-body text-xs font-bold uppercase tracking-[0.14em] text-brand-muted">
              {g.title}
            </p>
            <ul>
              {g.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={`flex min-h-[40px] items-center gap-2 font-body text-[15px] text-brand-ink hover:text-brand-red ${
                      item.lead ? "font-semibold" : ""
                    }`}
                  >
                    {item.label}
                    {item.badge ? (
                      <span className="rounded-full bg-brand-gold-light px-2 py-0.5 text-[11px] font-bold text-brand-maroon">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mt-7 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-brand-maroon px-6 py-4 text-white">
        <span className="flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-gold text-brand-maroon">
            <Icon name="camera" size={22} />
          </span>
          <span className="font-body">
            <strong className="block text-base">Not sure which treatment you need?</strong>
            <span className="text-sm text-[#E3D1CE]">
              Send 3 photos and Dr. Sahu replies personally — not an automated diagnosis.
            </span>
          </span>
        </span>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/services"
            onClick={onNavigate}
            className="inline-flex min-h-[46px] items-center rounded-xl border border-white/40 px-5 font-body text-sm font-semibold text-white hover:bg-white/10"
          >
            All treatments
          </Link>
          <a
            href={photoReviewUrl}
            className="inline-flex min-h-[46px] items-center rounded-xl bg-white px-5 font-body text-sm font-bold text-brand-red"
          >
            Send photos
          </a>
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [treatmentsOpen, setTreatmentsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation and on Escape.
  useEffect(() => {
    setMenuOpen(false);
    setTreatmentsOpen(false);
  }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setTreatmentsOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => {
    setTreatmentsOpen(false);
    setMenuOpen(false);
  };
  const treatmentsActive = pathname.startsWith("/services");
  const linkClass = (active: boolean) =>
    `inline-flex items-center gap-1.5 border-b-2 py-2.5 font-body text-[15px] font-semibold transition-colors ${
      active ? "border-brand-red text-brand-red" : "border-transparent text-brand-ink hover:text-brand-red"
    }`;

  return (
    <>
      <TopBar />
      {treatmentsOpen ? (
        <div className="fixed inset-0 z-30 hidden bg-brand-ink/40 lg:block" aria-hidden onClick={() => setTreatmentsOpen(false)} />
      ) : null}
      <header
        className={`site-header sticky top-0 z-40 border-b border-brand-line bg-white ${scrolled ? "is-scrolled" : ""}`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3">
          <Link href="/" className="shrink-0" aria-label={`${business.name}, home`}>
            <picture>
              <source srcSet="/redcity-logo.webp" type="image/webp" />
              <img src="/redcity-logo.png" width={560} height={169} alt={business.name} className="h-9 w-auto sm:h-11" />
            </picture>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
            <Link href={NAV[0].href} className={linkClass(NAV[0].match(pathname))}>
              {NAV[0].label}
            </Link>
            <button
              type="button"
              aria-expanded={treatmentsOpen}
              aria-controls="treatments-menu"
              onClick={() => setTreatmentsOpen((v) => !v)}
              className={linkClass(treatmentsActive || treatmentsOpen)}
            >
              Treatments
              <Icon
                name="chevronDown"
                size={14}
                strokeWidth={2.4}
                className={`transition-transform ${treatmentsOpen ? "rotate-180" : ""}`}
              />
            </button>
            {NAV.slice(1).map((n) => (
              <Link key={n.href} href={n.href} className={linkClass(n.match(pathname))}>
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={`tel:${business.telephone}`}
              aria-label={`Call the clinic on ${business.telephoneShort}`}
              className="hidden min-h-[46px] items-center gap-2 rounded-xl border-[1.5px] border-brand-line px-4 font-body text-[15px] font-semibold text-brand-ink hover:border-brand-red sm:inline-flex"
            >
              <Icon name="phone" size={17} className="text-brand-red" />
              <span className="hidden xl:inline">{business.telephoneShort}</span>
              <span className="xl:hidden">Call</span>
            </a>
            <Link
              href={business.bookHref}
              className="hidden min-h-[46px] items-center rounded-xl bg-brand-red px-5 font-body text-[15px] font-semibold text-white hover:bg-brand-red-dark sm:inline-flex"
            >
              Book a consultation
            </Link>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-red text-white lg:hidden"
            >
              <Icon name={menuOpen ? "close" : "menu"} size={20} strokeWidth={2.2} />
            </button>
          </div>
        </div>

        {/* Desktop treatments menu */}
        {treatmentsOpen ? (
          <div
            id="treatments-menu"
            className="absolute inset-x-0 top-full hidden border-t border-brand-line bg-white shadow-[0_30px_50px_-20px_rgba(31,23,24,0.35)] lg:block"
          >
            <TreatmentsPanel onNavigate={close} />
          </div>
        ) : null}

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          hidden={!menuOpen}
          className="max-h-[calc(100vh-64px)] overflow-y-auto border-t border-brand-line bg-white lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col px-6 pb-6 pt-3 font-body">
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-brand-red">
              What&apos;s bothering you?
            </p>
            <ul className="mt-1">
              {concerns.map((c) => (
                <li key={c.id}>
                  <Link
                    href={c.href}
                    onClick={close}
                    className={`flex min-h-[44px] items-center justify-between border-b border-brand-line text-[15px] font-semibold ${
                      c.urgent ? "text-brand-red" : "text-brand-ink"
                    }`}
                  >
                    {c.short}
                    <Icon name="chevronRight" size={14} />
                  </Link>
                </li>
              ))}
            </ul>
            {menuGroups.map((g) => (
              <details key={g.id} className="group border-b border-brand-line">
                <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between text-[15px] font-semibold text-brand-ink">
                  {g.title}
                  <Icon name="chevronDown" size={14} className="transition-transform group-open:rotate-180" />
                </summary>
                <ul className="pb-2">
                  {g.items.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} onClick={close} className="flex min-h-[40px] items-center pl-3 text-sm text-brand-muted hover:text-brand-red">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
            {[{ label: "All treatments", href: "/services" }, ...NAV].map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={close}
                className="flex min-h-[48px] items-center border-b border-brand-line text-[15px] font-semibold text-brand-ink"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href={business.bookHref}
              onClick={close}
              className="mt-5 flex min-h-[52px] items-center justify-center rounded-xl bg-brand-red font-semibold text-white"
            >
              Book a consultation
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
