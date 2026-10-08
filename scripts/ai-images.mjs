#!/usr/bin/env node
/**
 * AI image helper for the RedCity website.
 *
 *   node scripts/ai-images.mjs            # write AI_IMAGE_PROMPTS.md and the prompt guide page, show which images are missing
 *   node scripts/ai-images.mjs --optimize # crop, resize and convert finished images to .jpg (macOS `sips`)
 *   node scripts/ai-images.mjs --json     # print every slot as JSON (used to build the prompt guide page)
 *
 * Reads the slots from apps/web/src/lib/illustration-prompts.ts (Node 23.6+
 * runs TypeScript directly). Images live under apps/web/public/<slot.file>.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "apps/web/public");
const { slots, STYLE, RULES, GUARDRAILS, GROUP_TITLES, fullPrompt } = await import(
  path.join(root, "apps/web/src/lib/illustration-prompts.ts")
);

const EXTS = ["webp", "jpg", "jpeg", "png"];
const found = (slot) => EXTS.map((e) => `${slot.file}.${e}`).filter((f) => fs.existsSync(path.join(publicDir, f)));

const guideData = () => ({ slots: slots.map((s) => ({ ...s, prompt: fullPrompt(s), done: found(s).length > 0 })), STYLE, RULES, GUARDRAILS, GROUP_TITLES });

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(guideData(), null, 2));
  process.exit(0);
}

if (process.argv.includes("--optimize")) {
  // For each slot with a .png or an oversized/odd-shaped .jpg: centre-crop to the
  // slot's aspect, resize to its exact size, and save as <file>.jpg.
  for (const slot of slots) {
    const src = ["png", "jpeg", "jpg"].map((e) => path.join(publicDir, `${slot.file}.${e}`)).find((f) => fs.existsSync(f));
    if (!src) continue;
    const out = path.join(publicDir, `${slot.file}.jpg`);
    const info = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", src]).toString();
    const w = Number(/pixelWidth: (\d+)/.exec(info)[1]);
    const h = Number(/pixelHeight: (\d+)/.exec(info)[1]);
    if (w === slot.width && h === slot.height && src === out) continue;
    const target = slot.width / slot.height;
    const [cw, ch] = w / h > target ? [Math.round(h * target), h] : [w, Math.round(w / target)];
    const tmp = `${out}.tmp.jpg`;
    execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "85", "-c", String(ch), String(cw), src, "--out", tmp], { stdio: "ignore" });
    execFileSync("sips", ["-z", String(slot.height), String(slot.width), tmp, "--out", out], { stdio: "ignore" });
    fs.rmSync(tmp);
    if (src !== out) fs.rmSync(src);
    console.log(`optimised  ${slot.file}.jpg  (${w}x${h} → ${slot.width}x${slot.height})`);
  }
}

// Write the Antigravity task file.
const groups = [...new Set(slots.map((s) => s.group))];
const done = slots.filter((s) => found(s).length);
let md = `# RedCity Dental — AI image prompts

Generated from \`apps/web/src/lib/illustration-prompts.ts\` by \`node scripts/ai-images.mjs\`. Edit prompts there, not here.

**${done.length} of ${slots.length} images done.**

## Task for the Antigravity agent

For every image below that is not ticked:

1. Generate the image with Gemini using the prompt exactly as written, at the aspect ratio given.
2. Look at the result before saving. Regenerate if the teeth look wrong (extra, missing, merged or oddly shaped teeth, strange gums), if any text, letters or watermark appear, if hands or faces are distorted, or if it looks like a real photograph of a real patient.
3. Save it as a JPG at the exact path and size given (for example \`apps/web/public/ai/articles/teeth-whitening-myths.jpg\`, 1600×900). A PNG at the same path is fine too: run \`node scripts/ai-images.mjs --optimize\` afterwards to crop, resize and convert it.
4. When all are saved, run \`node scripts/ai-images.mjs\` to update this checklist, then \`pnpm --filter @redcity/web build\` to check the site still builds.

Each image appears on the website automatically on the next deploy, in the place listed. Until then the site shows its current icon panel, so images can be added one at a time. The "Service catalogue" images are not on the website: they are the artwork for the catalogue cards and PDF described in \`CATALOGUE_BRIEF.md\`.

## Never generate these with AI

${GUARDRAILS.map((g) => `- ${g}`).join("\n")}

These must always be real photos, with the patient's written consent where a patient is shown.

## House style (already included in every prompt)

- **3D render:** ${STYLE.render}
- **Illustration:** ${STYLE.illustration}
- **Every image:** ${RULES}
`;
for (const g of groups) {
  md += `\n## ${GROUP_TITLES[g]}\n`;
  for (const s of slots.filter((x) => x.group === g)) {
    md += `
### ${found(s).length ? "[x]" : "[ ]"} ${s.title}

- **Shows on:** ${s.where}
- **Save as:** \`apps/web/public/${s.file}.jpg\` — ${s.width}×${s.height} (${s.aspect})
- **Alt text (already in the site):** ${s.alt}

\`\`\`text
${fullPrompt(s)}
\`\`\`
`;
  }
}
fs.writeFileSync(path.join(root, "AI_IMAGE_PROMPTS.md"), md);

// Rebuild the prompt guide page with the current prompts and done status.
const guideDir = path.join(root, "guides/redcity-ai-image-prompts");
const template = path.join(guideDir, "template.html");
if (fs.existsSync(template)) {
  const json = JSON.stringify(guideData()).replace(/</g, "\\u003c");
  fs.writeFileSync(path.join(guideDir, "index.html"), fs.readFileSync(template, "utf8").replace("__DATA__", () => json));
}

console.log(`\nAI_IMAGE_PROMPTS.md written — ${done.length} of ${slots.length} images done.\n`);
for (const s of slots) console.log(`${found(s).length ? "  ✓" : "  ·"}  ${s.file}  (${s.width}x${s.height})`);
