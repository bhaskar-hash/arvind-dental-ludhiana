import { routineFees } from "./pricing";

/**
 * Landing pages for paid ads (/lp/<slug>). They are noindex, show no menu, and
 * every claim stays inside the NMC / Dental Council rules: facts, fees and
 * process only. No offers, discounts, "free", "best", reviews, before/after
 * photos or the doctor's photo.
 *
 * Ad links should carry UTM tags so the WhatsApp message names the campaign, e.g.
 * /lp/dental-implants?utm_source=google&utm_medium=cpc&utm_campaign=implants-nov
 */
export interface LandingPage {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  headline: string;
  sub: string;
  facts: { value: string; label: string }[];
  forYouHeading: string;
  forYou: string[];
  steps: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
  greeting: string;
  button: string;
  /** Treatment page with the full detail, linked once near the end. */
  moreHref: string;
  moreLabel: string;
}

const fee = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const landingPages: LandingPage[] = [
  {
    slug: "dental-implants",
    title: "Dental Implant Consultation in Ludhiana",
    description:
      "Implant consultation with Dr. Arvind Sahu, MDS (Prosthodontics), South Model Gram, Ludhiana. Examination, X-ray and a written estimate before any treatment.",
    eyebrow: "Dental implants · South Model Gram, Ludhiana",
    headline: "Missing teeth? Find out if implants suit you.",
    sub: "A consultation with Dr. Arvind Sahu, MDS (Prosthodontics), the specialty that plans tooth replacement. You leave with your options and a written estimate, before any treatment starts.",
    facts: [
      { value: fee(routineFees.checkup), label: "Examination fee" },
      { value: fee(routineFees.xray), label: "X-ray, if needed" },
      { value: "Written", label: "Estimate before treatment" },
    ],
    forYouHeading: "This consultation is for you if",
    forYou: [
      "One or more teeth are missing, or a tooth needs to come out",
      "Your denture is loose and you want something fixed in place",
      "You were told you need a bridge and want to compare options",
      "You want to know the cost and number of visits before deciding",
    ],
    steps: [
      { title: "Examination", body: "Dr. Sahu checks the gap, your gums and bite, and takes an X-ray if needed." },
      { title: "Your options", body: "Implant, bridge or denture, explained side by side, including what suits your bone and budget." },
      { title: "Written estimate", body: "Cost, number of visits and timeline in writing. You decide in your own time." },
    ],
    faqs: [
      {
        question: "How much does a dental implant cost?",
        answer:
          "It depends on the number of implants, the implant option and whether bone grafting is needed. You get an itemised written estimate after the examination, before any treatment.",
      },
      {
        question: "How many visits does an implant take?",
        answer:
          "Usually a placement visit, a healing period of a few months while the implant joins the bone, then visits to fit the crown. Your estimate lists the visits for your case.",
      },
      {
        question: "Can anyone get an implant?",
        answer:
          "Most adults can, but gum health, bone, diabetes control and smoking all matter. The examination and X-ray show whether an implant suits you or another option is better.",
      },
    ],
    greeting: "Hi, I'd like a dental implant consultation at RedCity Dental Care.",
    button: "Request an implant consultation",
    moreHref: "/services/dental-implants",
    moreLabel: "Read more about dental implants",
  },
  {
    slug: "dental-check-up",
    title: "Dental Check-up in South Model Gram, Ludhiana",
    description: `Dental check-up with Dr. Arvind Sahu, MDS, at RedCity Dental Care, South Model Gram, Ludhiana. Examination fee ${fee(routineFees.checkup)}, fees shown upfront.`,
    eyebrow: "Dental clinic · South Model Gram, Ludhiana",
    headline: `Tooth trouble? Book a check-up. Examination fee ${fee(routineFees.checkup)}.`,
    sub: "Examined by Dr. Arvind Sahu, MDS (Prosthodontics). We find the cause, explain it in plain words and tell you the cost before any treatment.",
    facts: [
      { value: fee(routineFees.checkup), label: "Examination fee" },
      { value: fee(routineFees.xray), label: "X-ray, if needed" },
      { value: fee(routineFees.cleaning), label: "Cleaning (scaling)" },
    ],
    forYouHeading: "Come in for",
    forYou: [
      "Tooth pain, sensitivity or a broken tooth",
      "Bleeding gums or bad breath",
      "A cleaning or a routine check-up",
      "Your child's teeth",
      "A second opinion on a treatment plan",
    ],
    steps: [
      { title: "Examination", body: "A full check of teeth and gums, with an X-ray only if it is needed." },
      { title: "Plain explanation", body: "What is wrong, what happens if you wait, and the treatment options." },
      { title: "Cost first", body: "The fee for any treatment is told before it starts. Nothing is done without your agreement." },
    ],
    faqs: [
      {
        question: "What does the check-up include?",
        answer: `An examination of your teeth and gums by Dr. Sahu for ${fee(routineFees.checkup)}. An X-ray, if needed, is ${fee(routineFees.xray)}.`,
      },
      {
        question: "Can I come the same day?",
        answer: "Call or WhatsApp us and we will give you the earliest time available. For severe pain or swelling, call first.",
      },
      {
        question: "Where is the clinic?",
        answer: "47 A/1, South Model Gram, near South Model Town, Ludhiana. Directions are on our Visit us page.",
      },
    ],
    greeting: "Hi, I'd like to book a dental check-up at RedCity Dental Care.",
    button: "Request a check-up",
    moreHref: "/services",
    moreLabel: "See all treatments",
  },
];

export function getLandingPage(slug: string) {
  return landingPages.find((p) => p.slug === slug);
}
