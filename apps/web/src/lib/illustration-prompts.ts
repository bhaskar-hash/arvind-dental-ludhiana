/**
 * Every AI image slot on the site: where it shows, the file it must be saved
 * as, its size, and the Gemini prompt that makes it. This is the single
 * source of truth for the website (lib/illustrations.ts), the Antigravity
 * task file (AI_IMAGE_PROMPTS.md, via `node scripts/ai-images.mjs`) and the
 * prompt guide page.
 *
 * AI images are ONLY for illustrations and explainers. Never for patients,
 * treatment results, before/afters, Dr. Sahu, the team or the clinic itself
 * — those must always be real photos (see GUARDRAILS).
 */

export type ImageStyle = "render" | "illustration";

export interface ImageSlot {
  id: string;
  group: "treatments" | "articles" | "first-aid" | "photo-guide" | "home";
  /** Short name shown in the guide. */
  title: string;
  /** Where it appears on the site. */
  where: string;
  /** Path under apps/web/public, without extension. Save as .jpg (and .webp if you can). */
  file: string;
  width: number;
  height: number;
  /** Gemini aspect-ratio setting. */
  aspect: "1:1" | "4:3" | "16:9";
  style: ImageStyle;
  /** What the image shows, in plain words. The style and rules are added automatically. */
  scene: string;
  /** Alt text the website uses. */
  alt: string;
}

export const STYLE: Record<ImageStyle, string> = {
  render:
    "Render it as a soft, matte 3D clay-style illustration: smooth rounded forms, gentle diffused studio light from the upper left, soft contact shadows, on a warm cream background (#FBF6F4). Teeth are natural ivory and gums a soft healthy pink. Use small accents only in deep red (#A61C2E), maroon (#2B0A0F) and muted gold (#D4AF37). Calm, premium and clinical, with generous empty space around the subject.",
  illustration:
    "Draw it as a warm, modern editorial illustration: clean flat shapes, soft shading and a subtle paper-grain texture, in a limited palette of cream (#FBF6F4), blush pink (#F6ECE9), deep red (#A61C2E), maroon (#2B0A0F) and muted gold (#D4AF37). People are Indian, with natural skin tones, friendly simple faces and everyday clothes. Calm and reassuring, never frightening or gory.",
};

export const RULES =
  "The image contains no words, letters, numbers, logos, watermarks or signatures. Teeth look anatomically believable: the right number, evenly shaped, with natural gums. It is clearly an illustration, not a photograph of a real patient or a real clinic.";

/** Things never to generate with AI for this site. */
export const GUARDRAILS = [
  "Before-and-after pictures, or any picture of a treatment result",
  "A real-looking patient presented as a RedCity case, or a face with a 'perfect smile' claim",
  "Dr. Sahu, the team, or anyone presented as clinic staff",
  "The clinic building, reception, treatment rooms or equipment presented as RedCity's",
  "X-rays, scans or charts presented as a real patient's records",
  "Certificates, awards, ratings, reviews or testimonial faces",
  "Another brand's logo or product, or any readable text",
];

export const slots: ImageSlot[] = [
  // ── Treatment page heroes (replace the icon tile beside each headline) ──
  {
    id: "rct",
    group: "treatments",
    title: "Root canal treatment",
    where: "Root canal treatment page, beside the headline",
    file: "ai/treatments/root-canal-treatment",
    width: 1200, height: 1200, aspect: "1:1", style: "render",
    scene:
      "A single lower molar tooth shown in a clean vertical cross-section, revealing the enamel, the dentine and the pulp chamber with two root canals running down into the roots. The canals glow softly in deep red, as if being cleaned and sealed. The tooth floats slightly above the background with a soft shadow beneath it.",
    alt: "Illustration of a molar cut in half, showing the root canals inside the tooth",
  },
  {
    id: "veneers",
    group: "treatments",
    title: "Veneers",
    where: "Veneers page, beside the headline",
    file: "ai/treatments/veneers",
    width: 1200, height: 1200, aspect: "1:1", style: "render",
    scene:
      "One upper front tooth seen at a slight angle, with a thin, slightly translucent porcelain veneer shell hovering just in front of it, about to be bonded onto its front surface. The veneer catches a soft highlight that shows how thin it is.",
    alt: "Illustration of a thin porcelain veneer about to be fitted onto a front tooth",
  },
  {
    id: "crowns",
    group: "treatments",
    title: "Crowns",
    where: "Crowns page, beside the headline",
    file: "ai/treatments/crowns",
    width: 1200, height: 1200, aspect: "1:1", style: "render",
    scene:
      "A prepared back-tooth stump set in a small section of pink gum, with a smooth, natural-looking white zirconia crown descending onto it from above, aligned to fit exactly. A faint gold outline traces the fit line between crown and tooth.",
    alt: "Illustration of a dental crown being placed onto a prepared tooth",
  },
  {
    id: "laser",
    group: "treatments",
    title: "Laser dentistry",
    where: "Laser dentistry page, beside the headline",
    file: "ai/treatments/laser-dentistry",
    width: 1200, height: 1200, aspect: "1:1", style: "render",
    scene:
      "A model of a row of lower front teeth in healthy pink gums, with a slim, soft beam of red light touching the gum line at one tooth. The beam comes from outside the frame, so no device or brand is visible. Precise, gentle and calm.",
    alt: "Illustration of a soft laser beam treating the gum line",
  },
  {
    id: "whitening",
    group: "treatments",
    title: "Teeth whitening",
    where: "Teeth whitening page, beside the headline",
    file: "ai/treatments/teeth-whitening",
    width: 1200, height: 1200, aspect: "1:1", style: "render",
    scene:
      "A fan-shaped dental shade guide with tooth-shaped tabs graded from warm ivory to bright natural white, laid on the surface beside a single healthy, bright tooth model. The brightest tab and the tooth share a soft glow.",
    alt: "Illustration of a tooth shade guide next to a bright tooth",
  },
  {
    id: "dentures",
    group: "treatments",
    title: "Dentures & bridges",
    where: "Dentures & bridges page, beside the headline",
    file: "ai/treatments/dentures-bridges",
    width: 1200, height: 1200, aspect: "1:1", style: "render",
    scene:
      "A complete upper and lower denture set with natural-looking teeth on soft pink gum-coloured bases, resting slightly open on the surface. Beside it sits a small three-tooth bridge.",
    alt: "Illustration of a complete denture set and a small dental bridge",
  },
  {
    id: "emergency",
    group: "treatments",
    title: "Emergency care",
    where: "Emergency dental care page, beside the headline",
    file: "ai/treatments/emergency-dental-care",
    width: 1200, height: 1200, aspect: "1:1", style: "render",
    scene:
      "A single front tooth with a small chip broken off its edge, the chipped piece resting beside it, next to a small glass of milk and a neatly folded white gauze pad. A small maroon first-aid cross sits on the surface.",
    alt: "Illustration of a chipped tooth beside a glass of milk and gauze",
  },
  {
    id: "kids",
    group: "treatments",
    title: "Kids' dentistry",
    where: "Kids' dentistry page, beside the headline",
    file: "ai/treatments/paediatric-dentistry",
    width: 1200, height: 1200, aspect: "1:1", style: "illustration",
    scene:
      "A cheerful Indian girl about seven years old sits in a dental chair, smiling and holding a child's toothbrush. A dentist appears only as a gloved hand holding up a small mirror for her to see her teeth. A soft toy tooth sits on the tray.",
    alt: "Illustration of a smiling child in a dental chair holding a toothbrush",
  },

  // ── Article covers (blog cards, Resources page and the top of each article) ──
  {
    id: "article-root-canal-signs",
    group: "articles",
    title: "Signs you might need a root canal",
    where: "Article cover: Signs You Might Need a Root Canal",
    file: "ai/articles/signs-you-might-need-a-root-canal",
    width: 1600, height: 900, aspect: "16:9", style: "illustration",
    scene:
      "An Indian adult at a kitchen table pauses mid-sip of a hot cup of chai and holds one cheek, wincing slightly at tooth sensitivity. Morning light comes through a window.",
    alt: "Illustration of a person holding their cheek after sipping hot tea",
  },
  {
    id: "article-implants-vs-bridges",
    group: "articles",
    title: "Implants vs. bridges",
    where: "Article cover: Dental Implants vs. Bridges",
    file: "ai/articles/dental-implants-vs-bridges",
    width: 1600, height: 900, aspect: "16:9", style: "render",
    scene:
      "Two jaw-section models side by side. On the left, a single dental implant with its crown sits in the bone between two natural teeth. On the right, a three-tooth bridge rests on two shaped neighbouring teeth over a gap.",
    alt: "Illustration comparing a dental implant with a dental bridge",
  },
  {
    id: "article-implant-cost",
    group: "articles",
    title: "What affects implant cost",
    where: "Article cover: What Affects the Cost of Dental Implants?",
    file: "ai/articles/dental-implant-cost-factors",
    width: 1600, height: 900, aspect: "16:9", style: "illustration",
    scene:
      "A tidy desk seen from above: a printed treatment estimate shown only as blank lines and boxes, a small dental implant model, a calculator, a pen and a cup of chai.",
    alt: "Illustration of a treatment estimate, an implant model and a calculator on a desk",
  },
  {
    id: "article-veneers-vs-crowns",
    group: "articles",
    title: "Veneers vs. crowns",
    where: "Article cover: Veneers vs. Crowns",
    file: "ai/articles/veneers-vs-crowns",
    width: 1600, height: 900, aspect: "16:9", style: "render",
    scene:
      "Two upper front tooth models side by side: the left one has a thin veneer shell on its front surface only, the right one is fully covered by a crown. A thin gold line separates the two.",
    alt: "Illustration comparing a veneer with a crown",
  },
  {
    id: "article-rct-aftercare",
    group: "articles",
    title: "Root canal aftercare",
    where: "Article cover: 10 Tips for a Smooth Recovery After a Root Canal",
    file: "ai/articles/root-canal-aftercare-tips",
    width: 1600, height: 900, aspect: "16:9", style: "illustration",
    scene:
      "An Indian adult resting comfortably on a sofa at home with a soft meal of khichdi in a bowl, a glass of water and a soft-bristled toothbrush on the side table.",
    alt: "Illustration of a person resting at home with a soft meal after dental treatment",
  },
  {
    id: "article-laser",
    group: "articles",
    title: "What is laser dentistry",
    where: "Article cover: What Is Laser Dentistry?",
    file: "ai/articles/what-is-laser-dentistry",
    width: 1600, height: 900, aspect: "16:9", style: "render",
    scene:
      "A wide, calm composition of a gum-and-teeth model on the right, with a single slim beam of soft red light entering from the left edge and touching the gum line. No device is visible.",
    alt: "Illustration of a gentle laser beam on a model of teeth and gums",
  },
  {
    id: "article-choose-dentist",
    group: "articles",
    title: "Choosing a dentist in Ludhiana",
    where: "Article cover: How to Choose the Right Dentist in Ludhiana",
    file: "ai/articles/how-to-choose-a-dentist-in-ludhiana",
    width: 1600, height: 900, aspect: "16:9", style: "illustration",
    scene:
      "A Punjabi family of three sits together on a sofa at home, looking at a phone and a printed leaflet and talking calmly about choosing a dentist. A window shows a soft city skyline.",
    alt: "Illustration of a family at home deciding on a dentist together",
  },
  {
    id: "article-implants-long-term",
    group: "articles",
    title: "Life with implants",
    where: "Article cover: Life With Dental Implants",
    file: "ai/articles/living-with-dental-implants-long-term",
    width: 1600, height: 900, aspect: "16:9", style: "illustration",
    scene:
      "An older Indian couple laughing together at a dining table, the man biting into a crisp apple and the woman tearing a roti, both relaxed and confident.",
    alt: "Illustration of an older couple enjoying a meal together",
  },
  {
    id: "article-whitening-myths",
    group: "articles",
    title: "Whitening myths",
    where: "Article cover: 5 Teeth Whitening Myths",
    file: "ai/articles/teeth-whitening-myths",
    width: 1600, height: 900, aspect: "16:9", style: "render",
    scene:
      "A neat row of home whitening myths laid out on the surface: half a lemon, a small bowl of baking soda, a pinch of charcoal powder and a strawberry, with a dental shade guide set slightly apart at the end of the row.",
    alt: "Illustration of lemon, baking soda, charcoal and a strawberry beside a shade guide",
  },
  {
    id: "article-denture-care",
    group: "articles",
    title: "Denture care",
    where: "Article cover: How to Care for Your Dentures",
    file: "ai/articles/denture-care-guide",
    width: 1600, height: 900, aspect: "16:9", style: "render",
    scene:
      "A denture soaking in a clear glass of water on a clean bathroom shelf, beside a soft denture brush and a small folded towel.",
    alt: "Illustration of a denture soaking in a glass of water beside a denture brush",
  },
  {
    id: "article-first-aid",
    group: "articles",
    title: "Dental emergency first aid",
    where: "Article cover: Dental Emergency First Aid",
    file: "ai/articles/dental-emergency-first-aid",
    width: 1600, height: 900, aspect: "16:9", style: "render",
    scene:
      "A calm first-aid arrangement: a small glass of milk, a folded white gauze pad, an ice pack wrapped in a cloth and a smartphone lying face down, set out neatly on the surface.",
    alt: "Illustration of dental first-aid items: milk, gauze, an ice pack and a phone",
  },
  {
    id: "article-childs-first-visit",
    group: "articles",
    title: "Child's first dental visit",
    where: "Article cover: Your Child's First Dental Visit",
    file: "ai/articles/childs-first-dental-visit",
    width: 1600, height: 900, aspect: "16:9", style: "illustration",
    scene:
      "An Indian mother and her young son walk hand in hand along a bright path towards a friendly door with a simple tooth-shaped sign. The boy holds a plush toy tooth and looks curious, not scared.",
    alt: "Illustration of a parent and child walking to a dental visit together",
  },

  // ── Emergency first aid (Resources page cards) ──
  {
    id: "aid-knocked-out",
    group: "first-aid",
    title: "Knocked-out tooth",
    where: "Resources page, first-aid card: Knocked-out tooth",
    file: "ai/first-aid/knocked-out-tooth",
    width: 1200, height: 900, aspect: "4:3", style: "illustration",
    scene:
      "Close-up of two hands carefully holding a knocked-out front tooth by its white crown, never touching the root, about to place it into a small glass of milk.",
    alt: "Illustration of a knocked-out tooth held by its crown over a glass of milk",
  },
  {
    id: "aid-toothache",
    group: "first-aid",
    title: "Severe toothache",
    where: "Resources page, first-aid card: Severe toothache",
    file: "ai/first-aid/toothache",
    width: 1200, height: 900, aspect: "4:3", style: "illustration",
    scene:
      "An Indian adult sitting on a sofa, holding a cold compress wrapped in a cloth against the outside of one cheek, with a glass of warm salt water on the table beside them.",
    alt: "Illustration of a person holding a cold compress to their cheek",
  },
  {
    id: "aid-broken",
    group: "first-aid",
    title: "Broken or chipped tooth",
    where: "Resources page, first-aid card: Broken or chipped tooth",
    file: "ai/first-aid/broken-tooth",
    width: 1200, height: 900, aspect: "4:3", style: "illustration",
    scene:
      "A small broken piece of tooth resting in a little cup of milk on a table, beside a stick of sugar-free chewing gum and a glass of warm water.",
    alt: "Illustration of a broken tooth piece saved in a cup of milk",
  },
  {
    id: "aid-bleeding",
    group: "first-aid",
    title: "Bleeding that won't stop",
    where: "Resources page, first-aid card: Bleeding that won't stop",
    file: "ai/first-aid/bleeding",
    width: 1200, height: 900, aspect: "4:3", style: "illustration",
    scene:
      "An Indian adult sitting upright and calm, gently biting on a folded clean gauze pad, with a simple wall clock behind them to suggest waiting fifteen minutes.",
    alt: "Illustration of a person biting on gauze to stop bleeding",
  },

  // ── How to take the 3 photos (the "Send us 3 photos" band on many pages) ──
  {
    id: "photo-front",
    group: "photo-guide",
    title: "Photo 1: front smile",
    where: "'Send us 3 photos' band, tile 1",
    file: "ai/photo-guide/front-smile",
    width: 800, height: 800, aspect: "1:1", style: "illustration",
    scene:
      "A young Indian woman stands by a bright window holding a smartphone at arm's length, taking a photo of her natural smile with her teeth together.",
    alt: "Illustration of a woman photographing her smile with a phone",
  },
  {
    id: "photo-upper",
    group: "photo-guide",
    title: "Photo 2: upper teeth",
    where: "'Send us 3 photos' band, tile 2",
    file: "ai/photo-guide/upper-teeth",
    width: 800, height: 800, aspect: "1:1", style: "illustration",
    scene:
      "An Indian man tilts his head back with his mouth open wide, holding a smartphone below his chin and pointing it up to photograph his upper teeth, in good daylight.",
    alt: "Illustration of a man photographing his upper teeth with a phone",
  },
  {
    id: "photo-lower",
    group: "photo-guide",
    title: "Photo 3: lower teeth",
    where: "'Send us 3 photos' band, tile 3",
    file: "ai/photo-guide/lower-teeth",
    width: 800, height: 800, aspect: "1:1", style: "illustration",
    scene:
      "An Indian man tilts his head down with his mouth open wide, holding a smartphone above and pointing it down to photograph his lower teeth, in good daylight.",
    alt: "Illustration of a man photographing his lower teeth with a phone",
  },

  // ── Home page ──
  {
    id: "home-diagnosis",
    group: "home",
    title: "The right diagnosis comes first",
    where: "Home page, 'Why patients choose RedCity', middle card",
    file: "ai/home/diagnosis-first",
    width: 1600, height: 1200, aspect: "4:3", style: "illustration",
    scene:
      "A calm, honest conversation in a dental surgery: an Indian patient sits upright in the chair, listening, while a dentist shown only from behind points to a dental X-ray on a monitor. The dentist's face is not visible.",
    alt: "Illustration of a dentist explaining an X-ray to a patient",
  },
];

export const GROUP_TITLES: Record<ImageSlot["group"], string> = {
  treatments: "Treatment pages",
  articles: "Article covers",
  "first-aid": "Emergency first aid",
  "photo-guide": "How to take the 3 photos",
  home: "Home page",
};

/** The full prompt to paste into Gemini for a slot. */
export function fullPrompt(slot: ImageSlot): string {
  return `${slot.scene} ${STYLE[slot.style]} ${RULES} Aspect ratio ${slot.aspect}.`;
}
