import { implantFromFee, routineFees } from "./pricing";

/**
 * Landing pages for paid ads (/lp/<slug>), in the card layout Dr. Sahu sent on
 * 14 Nov 2026, with basic information only. They are noindex and show no menu.
 *
 * Every line stays inside the NMC / Dental Council rules: facts, fees and
 * process only. No "best", "advanced", "affordable", "free", offers, reviews,
 * before/after photos or the doctor's photo. Dr. Sahu asked that X-ray charges
 * not be mentioned. Treatments not on the main site (All-on-4/6, E-max, digital
 * smile design) come from his own mockup.
 *
 * The implant starting fee comes from `implantFromFee` in pricing.ts; show it
 * only as "from", with the footnote that the final cost depends on the case.
 *
 * Ad links should carry UTM tags so the WhatsApp message names the campaign, e.g.
 * /lp/dental-implants?utm_source=google&utm_medium=cpc&utm_campaign=implants
 */

export type FeatureIcon = "digital" | "smile" | "degree" | "care" | "estimate";

export interface LandingCard {
  /** Form value chosen when the card is tapped; must be one of `treatments`. */
  treatment: string;
  tag: string;
  title: string;
  body: string;
  points: string[];
  /** Illustration slot id (lib/illustration-prompts.ts). */
  image: string;
}

export interface LandingPage {
  slug: string;
  /** Browser tab title. */
  title: string;
  description: string;
  location: string;
  /** Two-tone headline: first line dark, second line red. */
  headline: [string, string];
  sub: string;
  heroNote: string;
  /** Optional price chip under the hero buttons, e.g. "Dental implants from ₹18,000 per implant". */
  priceChip?: { label: string; amount: string; note: string };
  /** Extra line for the small print at the bottom of the page. */
  footnote?: string;
  features: { icon: FeatureIcon; label: string }[];
  cardsHeading: [string, string];
  cardsSub: string;
  cards: LandingCard[];
  /** Options in the form's treatment list. */
  treatments: string[];
  greeting: string;
  button: string;
}

const fee = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const IMPLANT_FOOTNOTE = `Implant fees shown are starting fees per implant. The final cost depends on the number of implants, the implant option and any bone grafting, and is given in writing before treatment starts.`;
const LOCATION = "South Model Gram, Ludhiana";

export const landingPages: LandingPage[] = [
  {
    slug: "dental-check-up",
    title: "Dental Clinic in South Model Gram, Ludhiana",
    description: `Dental clinic in South Model Gram, Ludhiana: check-ups, root canals, crowns, implants and smile makeovers with Dr. Arvind Sahu, MDS. Check-up ${fee(routineFees.checkup)}.`,
    location: LOCATION,
    headline: ["Your smile.", "Our priority."],
    sub: "Check-ups, root canals, crowns, implants and smile makeovers with Dr. Arvind Sahu, MDS (Prosthodontics). Fees are explained before treatment.",
    heroNote: `Check-up ${fee(routineFees.checkup)} · Implants from ${fee(implantFromFee)} · Open Mon–Sat 10 am–8 pm, Sun 10 am–2 pm`,
    footnote: IMPLANT_FOOTNOTE,
    features: [
      { icon: "digital", label: "Digital dentistry" },
      { icon: "smile", label: "Smile design" },
      { icon: "degree", label: "MDS prostho\u00addontist" },
      { icon: "care", label: "Personalised care" },
    ],
    cardsHeading: ["Our dental", "treatments"],
    cardsSub: "Tap a treatment to book a consultation for it.",
    cards: [
      {
        treatment: "Dental implants",
        tag: "Dental implants",
        title: "Dental implants, standard to premium",
        body: "Fixed replacement for one, several or all teeth.",
        points: ["Single, multiple or full-arch", "All-on-4 / All-on-6 if suitable", `From ${fee(implantFromFee)} per implant`],
        image: "cat-implants",
      },
      {
        treatment: "Smile makeover",
        tag: "Aesthetic dentistry",
        title: "Smile design & makeover",
        body: "Your new smile is planned before treatment starts.",
        points: ["Digital smile design", "Veneers and whitening"],
        image: "cat-smile-makeover",
      },
      {
        treatment: "Root canal",
        tag: "Root canal",
        title: "Root canal treatment",
        body: "Tooth pain checked and treated, keeping your own tooth where possible.",
        points: ["Under local anaesthesia", "Crown when needed"],
        image: "rct",
      },
      {
        treatment: "Crowns & bridges",
        tag: "Crowns & bridges",
        title: "Zirconia & E-max crowns",
        body: "Tooth-coloured crowns and bridges, priced per tooth.",
        points: ["Zirconia from ₹4,000", "PFM from ₹2,000"],
        image: "crowns",
      },
      {
        treatment: "Dentures",
        tag: "Dentures",
        title: "Dentures & overdentures",
        body: "Complete or partial dentures, or dentures held by implants.",
        points: ["Made to fit your bite"],
        image: "dentures",
      },
      {
        treatment: "Check-up or cleaning",
        tag: "General dentistry",
        title: "Check-ups, cleaning & fillings",
        body: "Routine care for the whole family, children included.",
        points: [`Check-up ${fee(routineFees.checkup)}`, `Cleaning ${fee(routineFees.cleaning)}`],
        image: "cat-checkup",
      },
    ],
    treatments: [
      "Dental implants",
      "Smile makeover",
      "Root canal",
      "Crowns & bridges",
      "Dentures",
      "Check-up or cleaning",
      "Tooth pain",
      "Not sure yet",
    ],
    greeting: "Hi, I'd like to book a consultation at RedCity Dental Care.",
    button: "Request appointment",
  },
  {
    slug: "dental-implants",
    title: "Dental Implant Consultation in Ludhiana",
    description:
      `Dental implants from ${fee(implantFromFee)}: consultation with Dr. Arvind Sahu, MDS (Prosthodontics), South Model Gram, Ludhiana. Written estimate before treatment.`,
    location: LOCATION,
    headline: ["Missing teeth?", "See if implants suit you."],
    sub: "An implant consultation with Dr. Arvind Sahu, MDS (Prosthodontics), the specialty that plans tooth replacement. Standard and premium implant options, and a written estimate before treatment.",
    priceChip: { label: "Dental implants from", amount: fee(implantFromFee), note: "per implant" },
    heroNote: `Examination ${fee(routineFees.checkup)} · Open Mon–Sat 10 am–8 pm, Sun 10 am–2 pm`,
    footnote: IMPLANT_FOOTNOTE,
    features: [
      { icon: "degree", label: "MDS prostho\u00addontist" },
      { icon: "digital", label: "Digital dentistry" },
      { icon: "estimate", label: "Written estimate" },
      { icon: "care", label: "Personalised care" },
    ],
    cardsHeading: ["Implant", "options"],
    cardsSub: "Tap the one closest to your situation.",
    cards: [
      {
        treatment: "Single tooth implant",
        tag: "One missing tooth",
        title: "Single tooth implant",
        body: "Replaces one tooth without cutting the teeth beside it.",
        points: ["Implant, abutment and crown", `From ${fee(implantFromFee)} per implant`],
        image: "cat-implants",
      },
      {
        treatment: "Several missing teeth",
        tag: "Several missing teeth",
        title: "Implant-supported bridge",
        body: "A few implants hold a fixed bridge for several teeth.",
        points: ["Fixed, not removable"],
        image: "crowns",
      },
      {
        treatment: "Full arch (All-on-4 / All-on-6)",
        tag: "All teeth in a jaw",
        title: "All-on-4 / All-on-6",
        body: "A fixed set of teeth on 4 or 6 implants.",
        points: ["When the bone allows", "Planned around your bite"],
        image: "cat-full-mouth",
      },
      {
        treatment: "Implant overdenture",
        tag: "Loose denture",
        title: "Implant overdenture",
        body: "Your denture clips onto implants so it stays in place.",
        points: ["Removable for cleaning"],
        image: "dentures",
      },
    ],
    treatments: [
      "Single tooth implant",
      "Several missing teeth",
      "Full arch (All-on-4 / All-on-6)",
      "Implant overdenture",
      "Not sure yet",
    ],
    greeting: "Hi, I'd like a dental implant consultation at RedCity Dental Care.",
    button: "Request implant consultation",
  },
];

export function getLandingPage(slug: string) {
  return landingPages.find((p) => p.slug === slug);
}
