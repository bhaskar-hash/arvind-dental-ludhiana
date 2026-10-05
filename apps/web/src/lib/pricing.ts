/**
 * Prices, membership plans and the savings maths behind /cost-and-payment.
 *
 * Approved by Dr. Sahu on 2026-10-06 (see the "RedCity Dental Membership
 * Plan" doc). Setting `pricingApproved` back to false hides the page again:
 * draft banner, noindex, and out of the sitemap and navigation.
 */

export const pricingApproved = true;

export type Term = 3 | 6 | 12;
export const TERMS: Term[] = [3, 6, 12];

/** Normal pay-as-you-go fees for routine visits, as approved by Dr. Sahu. */
export const routineFees = {
  checkup: 300,
  cleaning: 1000,
  xray: 200,
};

/** Routine care per person over a term: a check-up and cleaning every 6 months. */
export const routinePerTerm: Record<
  Term,
  { checkups: number; cleanings: number; xrays: number }
> = {
  3: { checkups: 1, cleanings: 0, xrays: 1 },
  6: { checkups: 1, cleanings: 1, xrays: 1 },
  12: { checkups: 2, cleanings: 2, xrays: 2 },
};

export type PlanId = "basic" | "advanced" | "pro" | "family";

export interface Plan {
  id: PlanId;
  name: string;
  suits: string;
  price: Record<Term, number>;
  includesCleanings: boolean;
  includesXrays: boolean;
  /** Discount on routine visits the plan doesn't include (Basic's "member price"). */
  routineDiscount: number;
  /** Fillings, root canals, extractions. */
  generalDiscount: number;
  /** Crowns, bridges, dentures, implants — 6 and 12-month terms only. */
  majorDiscount: number;
  highlights: string[];
  family?: {
    adults: number;
    children: number;
    extraMember: Record<Term, number>;
  };
}

export const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    suits: "Healthy teeth, regular check-ups",
    price: { 3: 199, 6: 299, 12: 499 },
    includesCleanings: false,
    includesXrays: false,
    routineDiscount: 0.1,
    generalDiscount: 0.1,
    majorDiscount: 0,
    highlights: [
      "Check-up with Dr. Sahu every 6 months",
      "Consultations for a new problem",
      "10% off cleanings, X-rays and general treatment",
    ],
  },
  {
    id: "advanced",
    name: "Advanced",
    suits: "Cleanings and lower treatment costs",
    price: { 3: 749, 6: 1399, 12: 2499 },
    includesCleanings: true,
    includesXrays: true,
    routineDiscount: 0,
    generalDiscount: 0.15,
    majorDiscount: 0.1,
    highlights: [
      "Check-ups, cleanings and X-rays included",
      "15% off fillings, root canals and extractions",
      "10% off crowns, bridges, dentures and implants*",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    suits: "In treatment, or planning bigger work",
    price: { 3: 1049, 6: 1899, 12: 3499 },
    includesCleanings: true,
    includesXrays: true,
    routineDiscount: 0,
    generalDiscount: 0.2,
    majorDiscount: 0.15,
    highlights: [
      "Everything in Advanced",
      "20% off general treatment, 15% off crowns, bridges, dentures and implants*",
      "Priority WhatsApp replies and a same-day emergency slot during clinic hours",
    ],
  },
  {
    id: "family",
    name: "Family with Pro",
    suits: "The whole family on Pro",
    price: { 3: 2999, 6: 5499, 12: 9999 },
    includesCleanings: true,
    includesXrays: true,
    routineDiscount: 0,
    generalDiscount: 0.2,
    majorDiscount: 0.15,
    highlights: [
      "Pro benefits for 2 adults and 2 children under 18",
      "Fluoride or sealants for children when clinically advised",
      "Add more family members at a member rate",
    ],
    family: {
      adults: 2,
      children: 2,
      extraMember: { 3: 749, 6: 1399, 12: 2499 },
    },
  },
];

export interface PriceGuideItem {
  item: string;
  /** Rupees, or null when it can only be quoted after an examination. */
  price: number | null;
  from?: boolean;
  unit?: string;
  includes: string;
  varies: string;
}

/**
 * The public price guide. Crown prices are the clinic's own published
 * starting prices; routine fees mirror `routineFees` (assumed — see above).
 * Everything else is quoted after examination until Dr. Sahu supplies figures.
 */
export const priceGuide: PriceGuideItem[] = [
  {
    item: "Check-up with Dr. Sahu",
    price: routineFees.checkup,
    includes: "Examination and advice on what, if anything, needs doing",
    varies: "—",
  },
  {
    item: "Digital X-ray",
    price: routineFees.xray,
    unit: "per X-ray",
    includes: "Taken only when needed to diagnose",
    varies: "How many views are needed",
  },
  {
    item: "Cleaning (scaling and polishing)",
    price: routineFees.cleaning,
    includes: "Removing tartar and stains from all teeth",
    varies: "Heavy build-up may need a second visit",
  },
  {
    item: "Fillings",
    price: null,
    includes: "Tooth-coloured filling of a cavity",
    varies: "Size of the cavity and the material",
  },
  {
    item: "Root canal treatment",
    price: null,
    includes: "Cleaning and sealing the inside of the tooth",
    varies: "Which tooth, how many roots, and whether a crown is needed after",
  },
  {
    item: "Zirconia crown",
    price: 4000,
    from: true,
    unit: "per tooth",
    includes: "Metal-free crown with the most natural look",
    varies: "Clinical requirements",
  },
  {
    item: "PFM crown",
    price: 2000,
    from: true,
    unit: "per tooth",
    includes: "Metal base with tooth-coloured porcelain",
    varies: "Clinical requirements",
  },
  {
    item: "Dental implants",
    price: null,
    includes: "Implant, abutment and crown, with the warranty for your option",
    varies: "Number of implants, implant option, and any bone grafting",
  },
  {
    item: "Dentures",
    price: null,
    includes: "Custom-made complete or partial dentures",
    varies: "Full or partial, and the material",
  },
  {
    item: "Teeth whitening",
    price: null,
    includes: "Dentist-supervised whitening",
    varies: "Shade change wanted and sensitivity",
  },
];

/** Quick-add amounts the calculator offers. Only prices the clinic publishes. */
export const quickAddMajor = [
  { label: "Zirconia crown", amount: 4000 },
  { label: "PFM crown", amount: 2000 },
];

/** Accepted payment methods. Add `emi` here if the clinic starts offering EMI. */
export const payment = {
  methods: ["UPI (Google Pay, PhonePe, Paytm)", "Debit and credit cards", "Cash"],
  stagedPayments: true,
  emi: null as null | { partner: string; minimum: number },
};

export interface CalcInput {
  adults: number;
  children: number;
  term: Term;
  routine: boolean;
  /** Fillings, root canals, extractions (₹ total for everyone covered). */
  generalTreatment: number;
  /** Crowns, bridges, dentures, implants (₹ total for everyone covered). */
  majorTreatment: number;
}

export interface CalcRow {
  id: "none" | PlanId;
  name: string;
  /** Membership fees. */
  fees: number;
  /** Routine visits still paid for. */
  routine: number;
  /** Treatment after member discounts. */
  treatment: number;
  total: number;
  /** Positive = cheaper than paying as you go. */
  saving: number;
}

const rupees = (n: number) => Math.round(n);

/**
 * Compares paying as you go with each membership for the same care.
 * Family with Pro is only offered when two or more people are covered.
 */
export function compareOptions(input: CalcInput): CalcRow[] {
  const people = Math.max(1, input.adults + input.children);
  const visits = routinePerTerm[input.term];
  const general = Math.max(0, input.generalTreatment);
  const major = Math.max(0, input.majorTreatment);
  const majorAllowed = input.term >= 6;

  const routineFull = input.routine
    ? people *
      (visits.checkups * routineFees.checkup +
        visits.cleanings * routineFees.cleaning +
        visits.xrays * routineFees.xray)
    : 0;
  const payAsYouGo = routineFull + general + major;

  const rows: CalcRow[] = [
    {
      id: "none",
      name: "No membership",
      fees: 0,
      routine: rupees(routineFull),
      treatment: rupees(general + major),
      total: rupees(payAsYouGo),
      saving: 0,
    },
  ];

  for (const plan of plans) {
    if (plan.family && people < 2) continue;

    let fees: number;
    if (plan.family) {
      const extra =
        Math.max(0, input.adults - plan.family.adults) +
        Math.max(0, input.children - plan.family.children);
      fees = plan.price[input.term] + extra * plan.family.extraMember[input.term];
    } else {
      fees = plan.price[input.term] * people;
    }

    // Check-ups are included in every plan.
    const routine = input.routine
      ? people *
        (1 - plan.routineDiscount) *
        ((plan.includesCleanings ? 0 : visits.cleanings * routineFees.cleaning) +
          (plan.includesXrays ? 0 : visits.xrays * routineFees.xray))
      : 0;

    const treatment =
      general * (1 - plan.generalDiscount) +
      major * (1 - (majorAllowed ? plan.majorDiscount : 0));

    const total = fees + routine + treatment;
    rows.push({
      id: plan.id,
      name: plan.name,
      fees: rupees(fees),
      routine: rupees(routine),
      treatment: rupees(treatment),
      total: rupees(total),
      saving: rupees(payAsYouGo - total),
    });
  }

  return rows;
}

export const formatRupees = (n: number) =>
  `₹${Math.round(n).toLocaleString("en-IN")}`;
