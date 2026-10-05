/**
 * Dr. Arvind Sahu's profile content, supplied by the practice directly.
 * Kept separate from `business.ts` (NAP / contact facts) because this is
 * editorial copy that will be revised over time.
 *
 * The Punjabi section is his own words for local patients in Ludhiana — it is
 * NOT a translation of the English bio, so the two are stored independently
 * and rendered as distinct blocks rather than as a language toggle.
 */

export const doctor = {
  name: "Dr. Arvind Sahu",
  credentials: "BDS, MDS (Prosthodontics & Crown & Bridge)",
  /** Short form for tight UI (badges, nav, meta titles). */
  credentialsShort: "MDS (Prosthodontics)",
  role: "Prosthodontist & Oral Implantologist",

  photo: {
    webp: "/dr-arvind-sahu.webp",
    fallback: "/dr-arvind-sahu.jpg",
    width: 379,
    height: 511,
    alt: "Dr. Arvind Sahu, MDS Prosthodontics, at RedCity Dental Care & Implant Centre in Ludhiana",
  },

  intro:
    "Dr. Arvind Sahu is a Prosthodontist and Oral Implantologist dedicated to delivering advanced, personalized dental care with a focus on function, aesthetics, precision, and long-term results.",

  education: [
    {
      qualification: "Bachelor of Dental Surgery (BDS)",
      institution: "Bhojia Dental College",
      location: "Himachal Pradesh",
    },
    {
      qualification: "Master of Dental Surgery (MDS), Prosthodontics & Crown and Bridge",
      institution: "Seema Dental College & Hospital",
      location: "Rishikesh",
    },
  ],

  expertise: [
    "Dental Implants",
    "Full Mouth Rehabilitation",
    "Crowns & Bridges",
    "Smile Design",
    "Esthetic Dentistry",
    "Digital Dentistry",
    "Complete Dentures",
    "Overdentures",
    "Maxillofacial Prosthetics",
  ],

  approach:
    "With a strong interest in implant dentistry and digital prosthodontics, Dr. Sahu integrates modern technology and evidence-based treatment principles to create natural-looking, comfortable, and functional dental restorations.",

  philosophy:
    "His philosophy is simple: every patient deserves a treatment plan that is scientifically sound, aesthetically pleasing, and designed around their individual needs.",

  /** Dr. Sahu's message to patients, in his own words. */
  punjabi: {
    quote:
      "ਹਰ ਮੁਸਕਾਨ ਦੀ ਆਪਣੀ ਇੱਕ ਕਹਾਣੀ ਹੁੰਦੀ ਹੈ, ਅਤੇ ਮੇਰਾ ਮਕਸਦ ਉਸ ਮੁਸਕਾਨ ਨੂੰ ਹੋਰ ਖੂਬਸੂਰਤ ਬਣਾਉਣਾ ਹੈ।",
    paragraphs: [
      "ਮੇਰੇ ਲਈ ਡੈਂਟਲ ਟ੍ਰੀਟਮੈਂਟ ਸਿਰਫ਼ ਦੰਦਾਂ ਦਾ ਇਲਾਜ ਨਹੀਂ—ਇਹ ਤੁਹਾਡੀ ਸਿਹਤ, ਤੁਹਾਡੇ ਆਰਾਮ ਅਤੇ ਤੁਹਾਡੇ ਆਤਮ-ਵਿਸ਼ਵਾਸ ਨਾਲ ਜੁੜਿਆ ਹੋਇਆ ਹੈ।",
      "ਮੈਂ ਹਰ ਮਰੀਜ਼ ਨੂੰ ਧਿਆਨ ਨਾਲ ਸੁਣਨ, ਉਸਦੀ ਸਮੱਸਿਆ ਨੂੰ ਸਮਝਣ ਅਤੇ ਉਸਦੇ ਲਈ ਸਹੀ, ਇਮਾਨਦਾਰ ਅਤੇ ਵਿਅਕਤੀਗਤ ਇਲਾਜ ਦੀ ਯੋਜਨਾ ਬਣਾਉਣ ਵਿੱਚ ਵਿਸ਼ਵਾਸ ਰੱਖਦਾ ਹਾਂ।",
      "ਤੁਹਾਡੇ ਦੰਦ ਸਿਰਫ਼ ਤੁਹਾਡੀ ਮੁਸਕਾਨ ਦਾ ਹਿੱਸਾ ਨਹੀਂ—ਇਹ ਤੁਹਾਡੀ ਪਹਿਚਾਣ ਦਾ ਹਿੱਸਾ ਹਨ।",
      "ਆਓ, ਮਿਲ ਕੇ ਤੁਹਾਡੀ ਮੁਸਕਾਨ ਨੂੰ ਸਿਹਤਮੰਦ, ਕੁਦਰਤੀ ਅਤੇ ਆਤਮ-ਵਿਸ਼ਵਾਸ ਨਾਲ ਭਰਪੂਰ ਬਣਾਈਏ।",
    ],
  },
};

/** The clinic building on South Model Gram — used as a "find us" landmark. */
export const clinicPhoto = {
  webp: "/clinic-exterior.webp",
  fallback: "/clinic-exterior.jpg",
  width: 1447,
  height: 1087,
  alt: "The RedCity Dental Care & Implant Centre building on South Model Gram, Ludhiana — a red-panelled three-storey clinic with the RedCity signage above the entrance",
};
