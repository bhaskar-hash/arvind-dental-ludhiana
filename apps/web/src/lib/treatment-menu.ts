/**
 * How patients find treatments: by what's bothering them first, then by
 * treatment group. Shared by the header's Treatments menu, the home page and
 * the /services index so the three never drift apart.
 */

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export interface Concern {
  id: string;
  /** In the patient's own words. */
  title: string;
  /** Shorter form for menus. */
  short: string;
  body: string;
  href: string;
  /** ServiceIcon slug, or "smile". */
  icon: string;
  urgent?: boolean;
}

export const concerns: Concern[] = [
  {
    id: "pain",
    title: "My tooth hurts",
    short: "My tooth hurts",
    body: "Fillings, gum care or root canal treatment, recommended only after the real cause is found.",
    href: "/services/root-canal-treatment",
    icon: "root-canal-treatment",
  },
  {
    id: "missing",
    title: "I'm missing one or more teeth",
    short: "I'm missing teeth",
    body: "Dental implants, bridges or dentures, with the pros, cons and costs of each explained.",
    href: "/services/dental-implants",
    icon: "dental-implants",
  },
  {
    id: "dentures",
    title: "My dentures are loose or sore",
    short: "My dentures are loose",
    body: "Better-fitting dentures, or overdentures held firmly in place by implants.",
    href: "/services/dentures-bridges",
    icon: "dentures-bridges",
  },
  {
    id: "smile",
    title: "I want a brighter, more even smile",
    short: "I want a better smile",
    body: "Whitening, veneers, bonding or a full smile design, planned around your face.",
    href: "/services#improve-your-smile",
    icon: "smile",
  },
  {
    id: "kids",
    title: "My child needs a dentist",
    short: "My child needs a dentist",
    body: "Gentle check-ups, fillings and sealants, and a calm, positive first visit.",
    href: "/services/paediatric-dentistry",
    icon: "paediatric-dentistry",
  },
  {
    id: "emergency",
    title: "I need help today",
    short: "I need help today",
    body: "Severe pain, swelling, or a broken or knocked-out tooth. Call us and we'll see you as soon as we can.",
    href: "/services/emergency-dental-care",
    icon: "emergency-dental-care",
    urgent: true,
  },
];

export interface MenuItem {
  label: string;
  href: string;
  /** The group's lead treatment, shown in bold. */
  lead?: boolean;
  badge?: string;
}

export interface MenuGroup {
  id: string;
  title: string;
  items: MenuItem[];
}

const more = (name: string) => `/services#${slugify(name)}`;

export const menuGroups: MenuGroup[] = [
  {
    id: "replace-missing-teeth",
    title: "Replace missing teeth",
    items: [
      { label: "Dental implants", href: "/services/dental-implants", lead: true, badge: "Up to lifetime warranty*" },
      { label: "Implant-supported overdentures", href: "/services/dentures-bridges" },
      { label: "Bridges", href: "/services/dentures-bridges" },
      { label: "Complete & partial dentures", href: "/services/dentures-bridges" },
      { label: "Full mouth rehabilitation", href: more("Full Mouth Rehabilitation") },
      { label: "Crowns (Zirconia & PFM)", href: "/services/crowns" },
    ],
  },
  {
    id: "treat-and-protect",
    title: "Treat & protect",
    items: [
      { label: "Root canal treatment", href: "/services/root-canal-treatment", lead: true },
      { label: "Check-ups & digital X-rays", href: more("Routine Check-ups") },
      { label: "Teeth cleaning (scaling)", href: more("Teeth Cleaning (Scaling)") },
      { label: "Fillings & sealants", href: more("Fillings & Sealants") },
      { label: "Laser gum treatment", href: "/services/laser-dentistry" },
      { label: "Extractions & wisdom teeth", href: more("Tooth Extractions") },
      { label: "Kids' dentistry", href: "/services/paediatric-dentistry" },
    ],
  },
  {
    id: "improve-your-smile",
    title: "Improve your smile",
    items: [
      { label: "Teeth whitening", href: "/services/teeth-whitening", lead: true },
      { label: "Veneers", href: "/services/veneers" },
      { label: "Smile makeover & design", href: more("Smile Makeover") },
      { label: "Dental bonding", href: more("Dental Bonding") },
      { label: "Teeth reshaping", href: more("Teeth Reshaping") },
      { label: "Mouth & night guards", href: more("Mouth Guards & Night Guards") },
    ],
  },
];
