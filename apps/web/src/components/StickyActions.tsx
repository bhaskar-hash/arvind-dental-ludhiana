"use client";

import Link from "next/link";
import { Icon } from "@/components/Icon";
import { business } from "@/lib/business";

export function StickyActions() {
  return (
    <>
      {/* Mobile: full-width bottom action bar */}
      <nav
        aria-label="Quick actions"
        className="fixed inset-x-0 bottom-0 z-50 grid h-[68px] grid-cols-3 font-body text-[13px] font-semibold text-white shadow-[0_-8px_24px_rgba(0,0,0,0.15)] md:hidden"
      >
        <a
          href={`tel:${business.telephone}`}
          className="flex flex-col items-center justify-center gap-1 bg-brand-ink"
        >
          <Icon name="phone" size={20} />
          Call
        </a>
        <a
          href={business.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 bg-brand-wa"
        >
          <Icon name="chat" size={20} />
          WhatsApp
        </a>
        <Link
          href={business.bookHref}
          className="flex flex-col items-center justify-center gap-1 bg-brand-red"
        >
          <Icon name="calendar" size={20} />
          Book
        </Link>
      </nav>
      {/* Spacer so the mobile bar never covers footer content */}
      <div className="h-[68px] bg-brand-footer md:hidden" aria-hidden />

      {/* Desktop: floating WhatsApp button */}
      <a
        href={business.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-placement="floating"
        className="fixed bottom-6 right-6 z-50 hidden items-center gap-2 rounded-full bg-brand-wa px-5 py-3 font-body text-sm font-semibold text-white shadow-lg hover:brightness-110 md:flex"
      >
        <Icon name="chat" size={18} />
        Chat on WhatsApp
      </a>
    </>
  );
}
