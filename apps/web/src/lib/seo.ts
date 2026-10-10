/**
 * The default social-preview image (WhatsApp, Facebook, LinkedIn, X and
 * Google use it when a page is shared). The file is public/og-default.jpg,
 * 1200×630, built from the clinic's real exterior photo and logo.
 *
 * Pages that set their own `openGraph` replace the layout's, so they add
 * `images` themselves. Use `ogImagesFor` for that.
 */
export const defaultOgImage = {
  url: "/og-default.jpg",
  width: 1200,
  height: 630,
  alt: "RedCity Dental Care & Implant Centre, South Model Gram, Ludhiana",
};

/** A page's own image if it has one (e.g. an article cover), otherwise the default. */
export function ogImagesFor(image?: { src: string; width: number; height: number; alt: string } | null) {
  return image
    ? [{ url: image.src, width: image.width, height: image.height, alt: image.alt }]
    : [defaultOgImage];
}
