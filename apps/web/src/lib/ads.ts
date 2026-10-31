/**
 * Ad-platform conversion tags. Each is inert until its ID is set on Vercel:
 *   NEXT_PUBLIC_GOOGLE_ADS_ID          AW-123456789
 *   NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL  the conversion label for "Lead" (Google Ads > Goals)
 *   NEXT_PUBLIC_META_PIXEL_ID          15-16 digit Meta pixel ID
 *
 * Only the kind of action is sent (call, WhatsApp, form). Never send names,
 * numbers, treatments or symptoms: health details must not reach ad platforms.
 */
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "";
export const GOOGLE_ADS_LEAD_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL || "";
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

export type LeadKind = "call" | "whatsapp" | "form";

export function trackLead(kind: LeadKind) {
  if (typeof window === "undefined") return;
  if (GOOGLE_ADS_ID && GOOGLE_ADS_LEAD_LABEL && window.gtag) {
    window.gtag("event", "conversion", { send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LEAD_LABEL}` });
  }
  if (META_PIXEL_ID && window.fbq) {
    window.fbq("track", kind === "form" ? "Lead" : "Contact");
  }
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}
