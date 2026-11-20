// NOTE: Google's live Business Profile listing name is "Red City Dental Care
// and Implant Centre" (space in "Red City", "and" not "&") — see the
// gap-check note in project memory/chat. Using the confirmed display name
// below per instruction; align one or the other before launch so the NAP
// matches the GBP listing exactly, which is what local SEO ranking and
// schema markup validity both depend on.
//
// PHONE: the clinic number 76268 58230 was supplied directly by the practice.
// The Google listing and the signboard still show 88476 51364 — update the
// Google listing to match, or local ranking suffers from the NAP mismatch.
const telephone = "+917626858230";

// The address Google should treat as THE website: every canonical link, the
// sitemap, robots.txt and the schema read it.
const LIVE_SITE_URL = "https://www.redcitydental.com";

export const business = {
  name: "RedCity Dental Care & Implant Centre",
  googleListedName: "Red City Dental Care and Implant Centre",
  doctorName: "Dr. Arvind Sahu",
  // Compact form, for badges/meta titles where the full string won't fit. The
  // full credentials, education and bio live in `doctor.ts` — update both.
  doctorCredentials: "MDS (Prosthodontics)",
  streetAddress: "47 A/1, South Model Gram",
  addressLocality: "Ludhiana",
  addressRegion: "Punjab",
  postalCode: "141002",
  // E.164 format for tel: links and schema.
  telephone,
  telephoneDisplay: "+91 76268 58230",
  /** Short form for button labels ("Call 76268 58230"). */
  telephoneShort: "76268 58230",
  whatsappUrl:
    `https://wa.me/${telephone.replace(/\D/g, "")}?text=` +
    encodeURIComponent(
      "Hi, I'd like to book a consultation at RedCity Dental Care.",
    ),
  googleBusinessUrl: "https://maps.app.goo.gl/aw86VcC2PLQ8iETQ8",
  /** Opens the Google Maps "Write a review" dialog directly (no extra navigation). */
  googleWriteReviewUrl:
    "https://search.google.com/local/writereview?placeid=ChIJCeVdbG-vgxo5EcdqbCZ8Rv70",
  googleRating: 5.0,
  // TODO(business-content): number of Google reviews — shown next to the
  // rating once known. Leave null rather than guessing.
  googleReviewCount: null as number | null,
  // TODO(business-content): confirm Hindi is spoken at the clinic.
  languages: ["English", "ਪੰਜਾਬੀ", "हिंदी"],
  // Hours as published on the clinic's Google Business Profile (read
  // 14 Nov 2026). Keep both lists in step with the profile.
  openingHours: ["Mon–Sat 10 am–8 pm", "Sun 10 am–2 pm"] as string[],
  /** The same hours in schema.org format, for structured data. */
  openingHoursSchema: ["Mo-Sa 10:00-20:00", "Su 10:00-14:00"] as string[],
  // The pin on the clinic's Google Business Profile (place 0x391a83af6f6c5de5:0xf4fe467c266c6ac7), read 14 Nov 2026.
  geo: { latitude: 30.8910931, longitude: 75.833524 },
  /** A landmark patients can navigate by. */
  landmark: "Near South Model Town",
  // TODO(business-content): social profile URLs. Icons only render for the
  // ones filled in.
  social: {} as Partial<Record<"instagram" | "facebook" | "youtube", string>>,
  /** Where every "Book a consultation" button goes. */
  bookHref: "/location#book",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? LIVE_SITE_URL,
  // The patient portal isn't deployed yet, so no CTA links to it.
  portalUrl:
    process.env.NEXT_PUBLIC_PORTAL_URL ?? "https://app.redcitydental.com",
};

/** A WhatsApp link with a message already typed. */
export function whatsappLink(message: string) {
  return `https://wa.me/${business.telephone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

/** Opening "Send photos on WhatsApp" message. */
export const photoReviewUrl = whatsappLink(
  "Hi Dr. Sahu, I'd like you to review photos of my teeth. I'll send 3 photos: front smile, upper teeth and lower teeth.",
);
