"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { captureSource } from "@/lib/attribution";
import { gtagEvent } from "@/lib/gtag";
import { business } from "@/lib/business";

/**
 * One listener for every call, WhatsApp and Book button on the site, so no
 * button needs its own tracking code. Events only go to Google Analytics when
 * NEXT_PUBLIC_GA_MEASUREMENT_ID is set; until then this only records the
 * visit's source for the forms (lib/attribution.ts).
 */
export function AnalyticsEvents() {
  const pathname = usePathname();
  const firstView = useRef(true);

  useEffect(() => {
    captureSource();
  }, []);

  useEffect(() => {
    const bookPath = business.bookHref.split("#")[0];
    const placementOf = (a: HTMLAnchorElement) =>
      a.dataset.placement ??
      (a.closest('nav[aria-label="Quick actions"]')
        ? "sticky_bar"
        : a.closest("header")
          ? "header"
          : a.closest("footer")
            ? "footer"
            : "page");

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const params = { placement: placementOf(a), page_path: window.location.pathname };
      if (href.startsWith("tel:")) gtagEvent({ action: "call_click", params });
      else if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) gtagEvent({ action: "whatsapp_click", params });
      else if (href === business.bookHref || href.startsWith(`${bookPath}#book`)) gtagEvent({ action: "book_click", params });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Page views for client-side navigations. The first view is sent by the GA
  // config itself, so it is skipped here to avoid counting it twice.
  useEffect(() => {
    if (firstView.current) {
      firstView.current = false;
      return;
    }
    gtagEvent({ action: "page_view", params: { page_path: pathname } });
  }, [pathname]);

  return null;
}
