"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/Icon";
import { business, photoReviewUrl } from "@/lib/business";
import { concerns, menuGroups } from "@/lib/treatment-menu";
import { pricingApproved } from "@/lib/pricing";
import { policiesApproved } from "@/lib/policies";

/**
 * Two-row header modelled on smartarchesdental.com: logo, languages, phone and
 * the booking button on top; the four menu items in a bar below, each opening
 * a full-width panel (intro, links, featured card). The four item names stay
 * exactly as they are: Treatments, Prices & plans, About, Visit us.
 */

type MenuId = "treatments" | "prices" | "about" | "visit";
type MenuLink = { label: string; href: string; external?: boolean; badge?: string; strong?: boolean; urgent?: boolean };
type Panel = {
  id: MenuId;
  label: string;
  href: string;
  match: (p: string) => boolean;
  intro: string;
  /** Quick links shown inside the intro block (Treatments: "What's bothering you?"). */
  quick?: { title: string; links: MenuLink[] };
  primary: { label: string; href: string };
  secondary: { label: string; href: string; external?: boolean };
  columns: { title?: string; links: MenuLink[] }[];
  feature?: {
    img: { src: string; webp?: string; width: number; height: number; alt: string; position?: string };
    title: string;
    body: string;
    href: string;
  };
};

const PANELS: Panel[] = [
  {
    id: "treatments",
    label: "Treatments",
    href: "/services",
    match: (p) => p.startsWith("/services"),
    intro: "Every treatment is planned by Dr. Sahu, a specialist in restoring and replacing teeth.",
    quick: {
      title: "What's bothering you?",
      links: concerns.map((c) => ({ label: c.short, href: c.href, urgent: c.urgent })),
    },
    primary: { label: "All treatments", href: "/services" },
    secondary: { label: "Send photos for an opinion", href: photoReviewUrl, external: true },
    columns: [
      ...menuGroups.map((g) => ({
        title: g.title,
        links: g.items.map((i) => ({ label: i.label, href: i.href, badge: i.badge, strong: i.lead })),
      })),
    ],
  },
  ...(pricingApproved
    ? [
        {
          id: "prices" as const,
          label: "Prices & plans",
          href: "/cost-and-payment",
          match: (p: string) => p.startsWith("/cost-and-payment") || p.startsWith("/policies"),
          intro: "Clear prices before anything starts, memberships that lower the cost of routine care, and a calculator to see what you'd save.",
          primary: { label: "See prices & plans", href: "/cost-and-payment" },
          secondary: policiesApproved
            ? { label: "Patient policies", href: "/policies" }
            : { label: "Savings calculator", href: "/cost-and-payment#calculator" },
          columns: [
            {
              links: [
                { label: "Price guide", href: "/cost-and-payment#prices" },
                { label: "Membership plans", href: "/cost-and-payment#membership" },
                { label: "Savings calculator", href: "/cost-and-payment#calculator" },
                { label: "Ways to pay", href: "/cost-and-payment#pay" },
              ],
            },
            ...(policiesApproved
              ? [
                  {
                    links: [
                      { label: "Implant warranty", href: "/policies#implant-warranty" },
                      { label: "Rescheduling", href: "/policies#rescheduling" },
                      { label: "Refunds", href: "/policies#refunds" },
                      { label: "If your plan changes", href: "/policies#plan-changes" },
                    ],
                  },
                ]
              : []),
          ],
          feature: {
            img: { src: "/ai/articles/dental-implant-cost-factors.jpg", width: 1600, height: 900, alt: "Illustration of a couple reviewing a dental estimate" },
            title: "What affects the cost of an implant",
            body: "The number of implants, the implant option and any bone grafting, explained plainly.",
            href: "/blog/dental-implant-cost-factors",
          },
        },
      ]
    : []),
  {
    id: "about",
    label: "About",
    href: "/about",
    match: (p) => p.startsWith("/about") || p.startsWith("/resources") || p.startsWith("/blog") || p.startsWith("/dental-camps"),
    intro: "Dr. Arvind Sahu, MDS (Prosthodontics), listens first, explains every option and what it costs, and recommends only what you need.",
    primary: { label: "Meet Dr. Sahu", href: "/about" },
    secondary: { label: "Read reviews on Google", href: business.googleBusinessUrl, external: true },
    columns: [
      {
        links: [
          { label: "Meet Dr. Sahu", href: "/about" },
          { label: "Training & expertise", href: "/about#training" },
          { label: "Patient reviews", href: "/#reviews" },
        ],
      },
      {
        links: [
          { label: "Questions & answers", href: "/resources" },
          { label: "Articles", href: "/blog" },
          { label: "Dental camps for organisations", href: "/dental-camps" },
        ],
      },
    ],
    feature: {
      img: { src: "/dr-arvind-sahu.jpg", webp: "/dr-arvind-sahu.webp", width: 379, height: 511, alt: "Dr. Arvind Sahu", position: "50% 18%" },
      title: "Meet Dr. Arvind Sahu",
      body: "BDS, MDS (Prosthodontics & Crown & Bridge). Prosthodontist & Oral Implantologist.",
      href: "/about",
    },
  },
  {
    id: "visit",
    label: "Visit us",
    href: "/location",
    match: (p) => p.startsWith("/location"),
    intro: `${business.streetAddress}, ${business.addressLocality}. Look for the red building, ${business.landmark.toLowerCase()}.`,
    primary: { label: "Book a consultation", href: business.bookHref },
    secondary: { label: "Get directions", href: business.googleBusinessUrl, external: true },
    columns: [
      {
        links: [
          { label: "Address & map", href: "/location" },
          { label: "Book a consultation", href: business.bookHref },
          { label: `Call ${business.telephoneShort}`, href: `tel:${business.telephone}` },
          { label: "WhatsApp us", href: business.whatsappUrl, external: true },
        ],
      },
      {
        links: [
          { label: "Emergency dental care", href: "/services/emergency-dental-care", urgent: true },
          { label: "Dental emergency first aid", href: "/resources#emergency" },
        ],
      },
    ],
    feature: {
      img: { src: "/clinic-exterior.jpg", webp: "/clinic-exterior.webp", width: 1447, height: 1087, alt: "The RedCity Dental Care building on South Model Gram, Ludhiana" },
      title: "Look for the red building",
      body: business.openingHours.length ? business.openingHours.join(" · ") : "Call or WhatsApp for today's hours.",
      href: "/location",
    },
  },
];

const Arrow = () => (
  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-blush text-brand-red transition-colors group-hover:bg-brand-red group-hover:text-white">
    <Icon name="chevronRight" size={11} strokeWidth={2.6} />
  </span>
);

function MenuAnchor({ link, onNavigate, className }: { link: MenuLink; onNavigate: () => void; className: string }) {
  const content = (
    <>
      <span className="flex flex-col items-start">
        <span className={link.urgent ? "font-semibold text-brand-red" : link.strong ? "font-semibold" : undefined}>{link.label}</span>
        {link.badge ? (
          <span className="mt-0.5 rounded-full bg-brand-gold-light px-2 py-0.5 text-[11px] font-bold leading-tight text-brand-maroon">
            {link.badge}
          </span>
        ) : null}
      </span>
      <Arrow />
    </>
  );
  if (link.external || link.href.startsWith("tel:")) {
    return (
      <a href={link.href} className={className} {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link href={link.href} onClick={onNavigate} className={className}>
      {content}
    </Link>
  );
}

function MegaPanel({ panel, onNavigate }: { panel: Panel; onNavigate: () => void }) {
  const cols = panel.columns.length;
  return (
    <div className="mx-auto flex max-w-6xl gap-8 px-6 py-8">
      <div className="flex w-[270px] shrink-0 flex-col rounded-2xl bg-brand-blush p-6">
        <p className="font-headline text-[26px] font-extrabold leading-tight text-brand-ink">{panel.label}</p>
        <p className="mt-3 font-body text-[15px] text-brand-muted">{panel.intro}</p>
        {panel.quick ? (
          <div className="mt-5">
            <p className="mb-1 font-body text-xs font-bold uppercase tracking-[0.14em] text-brand-red">{panel.quick.title}</p>
            <ul>
              {panel.quick.links.map((l) => (
                <li key={l.label}>
                  <MenuAnchor
                    link={l}
                    onNavigate={onNavigate}
                    className="group flex min-h-[36px] items-center justify-between gap-2 font-body text-[15px] font-semibold text-brand-ink hover:text-brand-red"
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-6">
          <Link
            href={panel.primary.href}
            onClick={onNavigate}
            className="inline-flex min-h-[44px] items-center rounded-full bg-brand-red px-5 font-body text-sm font-semibold text-white hover:bg-brand-red-dark"
          >
            {panel.primary.label}
          </Link>
          {panel.secondary.external ? (
            <a href={panel.secondary.href} target="_blank" rel="noopener noreferrer" className="font-body text-sm font-semibold text-brand-red underline-offset-4 hover:underline">
              {panel.secondary.label}
            </a>
          ) : (
            <Link href={panel.secondary.href} onClick={onNavigate} className="font-body text-sm font-semibold text-brand-red underline-offset-4 hover:underline">
              {panel.secondary.label}
            </Link>
          )}
        </div>
      </div>

      <div className={`grid min-w-0 flex-1 gap-x-8 gap-y-2 ${cols >= 4 ? "grid-cols-4" : cols === 3 ? "grid-cols-3" : cols === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
        {panel.columns.map((col, i) => (
          <nav key={i} aria-label={col.title ?? `${panel.label} links`} className="min-w-0 pt-1">
            {col.title ? (
              <p className="mb-2 font-body text-xs font-bold uppercase tracking-[0.14em] text-brand-muted">{col.title}</p>
            ) : null}
            <ul>
              {col.links.map((l) => (
                <li key={l.label}>
                  <MenuAnchor
                    link={l}
                    onNavigate={onNavigate}
                    className="group flex min-h-[40px] items-center gap-2 font-body text-[15px] text-brand-ink hover:text-brand-red"
                  />
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {panel.feature ? (
        <Link href={panel.feature.href} onClick={onNavigate} className="group w-[250px] shrink-0">
          <picture>
            {panel.feature.img.webp ? <source srcSet={panel.feature.img.webp} type="image/webp" /> : null}
            <img
              src={panel.feature.img.src}
              width={panel.feature.img.width}
              height={panel.feature.img.height}
              alt={panel.feature.img.alt}
              loading="lazy"
              style={panel.feature.img.position ? { objectPosition: panel.feature.img.position } : undefined}
              className="block aspect-[16/10] w-full rounded-2xl object-cover"
            />
          </picture>
          <p className="mt-3 font-headline text-lg font-bold leading-snug text-brand-ink group-hover:text-brand-red">{panel.feature.title}</p>
          <p className="mt-1 font-body text-sm text-brand-muted">{panel.feature.body}</p>
        </Link>
      ) : null}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState<MenuId | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation, on Escape, and on a click outside the header.
  useEffect(() => {
    setMenuOpen(false);
    setOpen(null);
  }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMenuOpen(false);
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  const close = () => {
    setOpen(null);
    setMenuOpen(false);
  };

  // Panels open on hover with a mouse; the chevron opens them by click, tap or keyboard.
  const hoverOpen = (id: MenuId) => (e: ReactPointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    setOpen(id);
  };
  const hoverKeep = (e: ReactPointerEvent) => {
    if (e.pointerType === "mouse") window.clearTimeout(closeTimer.current);
  };
  const hoverClose = (e: ReactPointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 180);
  };

  const openPanel = PANELS.find((p) => p.id === open);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only z-[60] rounded-xl bg-brand-red px-4 py-3 font-body text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>
      {/* Dims the page while a panel is open; clicks pass through (outside clicks close it). */}
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-0 z-30 hidden bg-brand-ink/25 transition-opacity duration-200 lg:block ${openPanel ? "opacity-100" : "opacity-0"}`}
      />
      <header
        ref={headerRef}
        className={`site-header sticky top-0 z-40 border-b border-brand-line bg-white lg:border-b-0 ${scrolled ? "is-scrolled" : ""}`}
      >
        {/* Row 1: logo, languages, phone, booking */}
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3">
          <Link href="/" className="shrink-0" aria-label={`${business.name}, home`}>
            <picture>
              <source srcSet="/redcity-logo.webp" type="image/webp" />
              <img src="/redcity-logo.png" width={560} height={169} alt={business.name} className="h-9 w-auto sm:h-11" />
            </picture>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <span className="hidden items-center gap-2 rounded-full border border-brand-line px-3.5 py-2 font-body text-[13px] text-brand-muted md:inline-flex">
              <Icon name="globe" size={15} />
              {business.languages.map((l, i) => (
                <span key={l}>
                  {i > 0 ? "· " : ""}
                  <span lang={i === 1 ? "pa" : i === 2 ? "hi" : undefined} className={i === 1 ? "font-gurmukhi" : undefined}>
                    {l}
                  </span>
                </span>
              ))}
            </span>
            <a
              href={`tel:${business.telephone}`}
              aria-label={`Call the clinic on ${business.telephoneShort}`}
              className="hidden items-center gap-2.5 font-body text-[15px] font-bold text-brand-ink hover:text-brand-red sm:inline-flex"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blush text-brand-red">
                <Icon name="phone" size={16} />
              </span>
              {business.telephoneShort}
            </a>
            <Link
              href={business.bookHref}
              className="hidden min-h-[46px] items-center whitespace-nowrap rounded-full bg-brand-red px-6 font-body text-[15px] font-semibold text-white hover:bg-brand-red-dark sm:inline-flex"
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

        {/* Row 2: the four menu items (desktop) */}
        <div className="hidden border-y border-brand-line bg-brand-warm lg:block">
          <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-center gap-12 px-6">
            {PANELS.map((p) => {
              const active = p.match(pathname);
              const isOpen = open === p.id;
              return (
                <div key={p.id} className="flex items-center gap-2" onPointerEnter={hoverOpen(p.id)} onPointerLeave={hoverClose}>
                  <Link
                    href={p.href}
                    className={`whitespace-nowrap border-b-2 py-3 font-body text-[15px] font-semibold transition-colors ${
                      active || isOpen ? "border-brand-red text-brand-red" : "border-transparent text-brand-ink hover:text-brand-red"
                    }`}
                  >
                    {p.label}
                  </Link>
                  <button
                    type="button"
                    aria-label={`${isOpen ? "Close" : "Open"} the ${p.label} menu`}
                    aria-expanded={isOpen}
                    aria-controls={`menu-${p.id}`}
                    onClick={() => setOpen((o) => (o === p.id ? null : p.id))}
                    className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${
                      isOpen ? "border-brand-red bg-brand-red text-white" : "border-brand-line bg-white text-brand-muted hover:text-brand-red"
                    }`}
                  >
                    <Icon name="chevronDown" size={12} strokeWidth={2.6} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                </div>
              );
            })}
          </nav>
        </div>

        {/* The open panel, full width under the menu bar */}
        {openPanel ? (
          <div
            id={`menu-${openPanel.id}`}
            onPointerEnter={hoverKeep}
            onPointerLeave={hoverClose}
            className="absolute inset-x-0 top-full hidden border-b border-brand-line bg-white shadow-[0_30px_50px_-20px_rgba(31,23,24,0.35)] lg:block"
          >
            <MegaPanel panel={openPanel} onNavigate={close} />
          </div>
        ) : null}

        {/* Mobile menu: the same four items, each folding open */}
        <div
          id="mobile-menu"
          hidden={!menuOpen}
          className="max-h-[calc(100vh-64px)] overflow-y-auto border-t border-brand-line bg-white lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col px-6 pb-6 pt-2 font-body">
            {PANELS.map((p) => (
              <details key={p.id} className="group border-b border-brand-line">
                <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between text-[16px] font-semibold text-brand-ink [&::-webkit-details-marker]:hidden">
                  {p.label}
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-brand-line text-brand-muted">
                    <Icon name="chevronDown" size={12} strokeWidth={2.6} className="transition-transform group-open:rotate-180" />
                  </span>
                </summary>
                <div className="pb-4">
                  {p.quick ? (
                    <div>
                      <p className="mt-1 pl-3 text-xs font-bold uppercase tracking-[0.14em] text-brand-red">{p.quick.title}</p>
                      {p.quick.links.map((l) => (
                        <MenuAnchor key={l.label} link={l} onNavigate={close} className="group flex min-h-[42px] items-center gap-2 pl-3 text-[15px] text-brand-ink" />
                      ))}
                    </div>
                  ) : null}
                  {p.columns.map((col, i) => (
                    <div key={i}>
                      {col.title ? (
                        <p className="mt-3 pl-3 text-xs font-bold uppercase tracking-[0.14em] text-brand-muted">{col.title}</p>
                      ) : null}
                      {col.links.map((l) => (
                        <MenuAnchor
                          key={l.label}
                          link={l}
                          onNavigate={close}
                          className="group flex min-h-[42px] items-center gap-2 pl-3 text-[15px] text-brand-ink"
                        />
                      ))}
                    </div>
                  ))}
                  <Link href={p.primary.href} onClick={close} className="mt-2 flex min-h-[42px] items-center pl-3 text-[15px] font-semibold text-brand-red">
                    {p.primary.label} →
                  </Link>
                </div>
              </details>
            ))}
            <p className="mt-4 flex items-center gap-2 text-[13px] text-brand-muted">
              <Icon name="globe" size={15} />
              We speak English · <span lang="pa" className="font-gurmukhi">ਪੰਜਾਬੀ</span> · <span lang="hi">हिंदी</span>
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <a
                href={`tel:${business.telephone}`}
                className="flex min-h-[52px] items-center justify-center gap-2 rounded-full border-[1.5px] border-brand-red font-semibold text-brand-red"
              >
                <Icon name="phone" size={17} />
                Call
              </a>
              <Link
                href={business.bookHref}
                onClick={close}
                className="flex min-h-[52px] items-center justify-center rounded-full bg-brand-red px-3 text-center font-semibold text-white"
              >
                Book a consultation
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
