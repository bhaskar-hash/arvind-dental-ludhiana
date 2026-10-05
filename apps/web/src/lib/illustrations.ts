import fs from "node:fs";
import path from "node:path";
import { slots, type ImageSlot } from "./illustration-prompts";

/**
 * Server-only. Finds the AI illustration saved for a slot, checked when the
 * page is built. Until the file exists the slot returns null and the page
 * keeps its current icon panel, so images can be added one at a time: save
 * the file at its path, redeploy, and it appears.
 */

const PUBLIC_DIR = path.join(process.cwd(), "public");

export interface FoundImage {
  webp?: string;
  src: string;
  width: number;
  height: number;
  alt: string;
}

function exists(rel: string) {
  return fs.existsSync(path.join(PUBLIC_DIR, rel));
}

export function illustration(id: string): FoundImage | null {
  const slot: ImageSlot | undefined = slots.find((s) => s.id === id);
  if (!slot) return null;
  const webp = exists(`${slot.file}.webp`) ? `/${slot.file}.webp` : undefined;
  const fallback = ["jpg", "jpeg", "png"].map((ext) => `${slot.file}.${ext}`).find(exists);
  if (!webp && !fallback) return null;
  return {
    webp,
    src: fallback ? `/${fallback}` : (webp as string),
    width: slot.width,
    height: slot.height,
    alt: slot.alt,
  };
}

/** The slot id for an article cover, from the article's slug. */
export function articleCover(slug: string): FoundImage | null {
  const slot = slots.find((s) => s.group === "articles" && s.file.endsWith(`/${slug}`));
  return slot ? illustration(slot.id) : null;
}

/** The slot id for a treatment page hero, from the service slug. */
export function treatmentHero(slug: string): FoundImage | null {
  const slot = slots.find((s) => s.group === "treatments" && s.file.endsWith(`/${slug}`));
  return slot ? illustration(slot.id) : null;
}
