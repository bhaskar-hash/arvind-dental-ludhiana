# Rules for AI agents editing the RedCity Dental site

Dr. Arvind Sahu's dental registration depends on these rules. They come from the NMC Ethical Advertising Guidelines (6 Oct 2026), the Dental Council rules and Dr. Sahu himself. Breaking them can lead to a warning or suspension of his registration.

## Never add

- Praise words: best, No. 1, top, leading, advanced, world-class, affordable, cheapest, painless, guaranteed, 100%, zero, forever, instant.
- Free, discounts, offers, "limited time".
- Reviews, ratings, testimonials, patient stories, before/after photos.
- Dr. Sahu's photo anywhere except /about.
- Comparisons with other clinics or dentists ("other clinics", "corporate", "cut-price", "weekend courses"), or statistics about them.
- X-ray charges. Dr. Sahu asked on 14 Nov 2026 that they not be mentioned.
- Clinic facts not already in `apps/web/src/lib` (equipment, brands, labs, CAD/CAM, CBCT, procedures, travel times, prices). Ask the website team first.
- "Diagnosis", "triage" or "diagnostic tool" for the WhatsApp photo review. Keep this sentence as it is: "Dr. Sahu will personally review your photos and send you a voice message — this is not an automated diagnosis."
- AI images without the "AI illustration" label. Use the `AiImage` component, which adds it.

## Facts

- Clinic facts live in `apps/web/src/lib/` (`business.ts`, `doctor.ts`, `pricing.ts`, `services.ts`). Use them; don't retype them.
- Quote prices only from `pricing.ts`.
- Show the doctor's name, qualifications and "Registration No. 20407A" together.
- Keep the four menu items: Treatments, Prices & plans, About, Visit us.

## Before you push or deploy

- Run `git fetch` and look at what changed on `origin/main`.
- Run `pnpm --filter @redcity/web build`.
- `NEXT_PUBLIC_SITE_URL` must stay `https://www.redcitydental.com`.
