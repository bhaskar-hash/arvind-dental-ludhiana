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
