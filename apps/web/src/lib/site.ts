/**
 * Content that only appears once the clinic supplies the real thing. Each
 * section that reads these renders nothing (or an honest fallback) while the
 * list is empty or the value is null — never a placeholder or invented copy.
 */

export interface Review {
  /** First name as shown on Google. */
  name: string;
  /** Quoted exactly as written on Google, with the reviewer's permission. */
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

/** TODO(business-content): 3 real Google reviews, quoted exactly. */
export const reviews: Review[] = [];

export interface BeforeAfterCase {
  id: string;
  treatment: string;
  detail: string;
  /** Service slug, so treatment pages show their own cases. */
  service: string;
  /** Image base paths under /public (served as .webp with a .jpg fallback). */
  before: { src: string; alt: string };
  after: { src: string; alt: string };
}

/** Shown under every case. Keeps where and how they were treated clear. */
export const beforeAfterCredit =
  "Treated by Dr. Sahu during his MDS at Seema Dental College & Hospital, Rishikesh, and shared with the patient's permission. Results vary from person to person.";

/**
 * Real patients only, approved by Dr. Sahu (2026-10-06) from his MDS case
 * presentation. Inside-the-mouth photos only: no faces, names, initials or
 * ages. Case 7 is deliberately excluded. Never stock, edited or AI-generated
 * images. Sections that show these are hidden while the list is empty.
 */
export const beforeAfterCases: BeforeAfterCase[] = [
  {
    id: "case2",
    treatment: "Zirconia bridge with digital smile design",
    detail: "Two missing upper side teeth replaced with a zirconia bridge, planned with digital smile design.",
    service: "crowns",
    before: { src: "/cases/case2-before", alt: "Before: gaps where the two upper side teeth are missing" },
    after: { src: "/cases/case2-after", alt: "After: the gaps filled with a zirconia bridge" },
  },
  {
    id: "case6",
    treatment: "Implant-supported teeth",
    detail: "Missing back teeth replaced with implants and cemented crowns.",
    service: "dental-implants",
    before: { src: "/cases/case6-before", alt: "Before: missing back teeth on both sides" },
    after: { src: "/cases/case6-after", alt: "After: implant-supported crowns in place of the missing teeth" },
  },
  {
    id: "case3",
    treatment: "Full-mouth rehabilitation with PFM crowns",
    detail: "Worn, sensitive teeth rebuilt with PFM crowns after a planned bite assessment.",
    service: "crowns",
    before: { src: "/cases/case3-before", alt: "Before: worn and discoloured teeth" },
    after: { src: "/cases/case3-after", alt: "After: the teeth restored with PFM crowns" },
  },
  {
    id: "case9",
    treatment: "Two front-tooth implants",
    detail: "Two missing upper front teeth replaced with implants and a digitally designed restoration.",
    service: "dental-implants",
    before: { src: "/cases/case9-before", alt: "Before: two missing upper front teeth with implants placed" },
    after: { src: "/cases/case9-after", alt: "After: two new front teeth on the implants" },
  },
  {
    id: "case5",
    treatment: "Upper complete denture",
    detail: "A toothless upper jaw restored with a complete denture, alongside a lower telescopic partial denture.",
    service: "dentures-bridges",
    before: { src: "/cases/case5-before", alt: "Before: the toothless upper jaw" },
    after: { src: "/cases/case5-after", alt: "After: the upper complete denture in place" },
  },
  {
    id: "case10",
    treatment: "Complete dentures after a jaw defect",
    detail: "Complete dentures for both jaws, designed around a defect in the lower jaw.",
    service: "dentures-bridges",
    before: { src: "/cases/case10-before", alt: "Before: no teeth in either jaw" },
    after: { src: "/cases/case10-after", alt: "After: complete dentures in place" },
  },
];

/** TODO(business-content): Dr. Sahu's 1-minute introduction (YouTube embed URL). */
export const introVideoUrl: string | null = null;

/**
 * Dr. Sahu's own digital prosthodontics work, from a full-arch implant case
 * he treated during his MDS at Seema Dental College & Hospital (from his case
 * presentation). Lab and design images only — nothing that identifies the
 * patient. Always shown with that credit so it isn't read as RedCity's own
 * in-house equipment.
 */
export const digitalWorkflow = {
  credit:
    "From a full-arch implant case Dr. Sahu treated during his MDS at Seema Dental College & Hospital, Rishikesh.",
  steps: [
    { src: "/work/digital-implant-plan", title: "Implants planned digitally", body: "Each implant's position and angle is set on a 3D model of the jaw before treatment." },
    { src: "/work/digital-bar-design", title: "Framework designed on screen", body: "A custom bar that joins the implants is designed to fit precisely." },
    { src: "/work/printed-framework", title: "Metal framework 3D-printed", body: "The bar is made by laser metal printing (DMLS) for an accurate, strong fit." },
    { src: "/work/zirconia-bridge", title: "Finished with zirconia teeth", body: "Individual zirconia crowns complete a fixed, natural-looking full arch." },
  ],
};

/** Photos of the clinic. Add reception / treatment room / sterilisation shots here. */
export const clinicGallery = [
  {
    webp: "/clinic-exterior.webp",
    fallback: "/clinic-exterior.jpg",
    width: 1447,
    height: 1087,
    alt: "The RedCity Dental Care building on South Model Gram, Ludhiana — a red-panelled three-storey clinic with the RedCity signboard above the entrance",
  },
];
