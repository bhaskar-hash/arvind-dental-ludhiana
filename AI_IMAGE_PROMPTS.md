# RedCity Dental — AI image prompts

Generated from `apps/web/src/lib/illustration-prompts.ts` by `node scripts/ai-images.mjs`. Edit prompts there, not here.

**23 of 28 images done.**

## Task for the Antigravity agent

For every image below that is not ticked:

1. Generate the image with Gemini using the prompt exactly as written, at the aspect ratio given.
2. Look at the result before saving. Regenerate if the teeth look wrong (extra, missing, merged or oddly shaped teeth, strange gums), if any text, letters or watermark appear, if hands or faces are distorted, or if it looks like a real photograph of a real patient.
3. Save it as a JPG at the exact path and size given (for example `apps/web/public/ai/articles/teeth-whitening-myths.jpg`, 1600×900). A PNG at the same path is fine too: run `node scripts/ai-images.mjs --optimize` afterwards to crop, resize and convert it.
4. When all are saved, run `node scripts/ai-images.mjs` to update this checklist, then `pnpm --filter @redcity/web build` to check the site still builds.

Each image appears on the website automatically on the next deploy, in the place listed. Until then the site shows its current icon panel, so images can be added one at a time.

## Never generate these with AI

- Before-and-after pictures, or any picture of a treatment result
- A real-looking patient presented as a RedCity case, or a face with a 'perfect smile' claim
- Dr. Sahu, the team, or anyone presented as clinic staff
- The clinic building, reception, treatment rooms or equipment presented as RedCity's
- X-rays, scans or charts presented as a real patient's records
- Certificates, awards, ratings, reviews or testimonial faces
- Another brand's logo or product, or any readable text

These must always be real photos, with the patient's written consent where a patient is shown.

## House style (already included in every prompt)

- **3D render:** Render it as a soft, matte 3D clay-style illustration: smooth rounded forms, gentle diffused studio light from the upper left, soft contact shadows, on a warm cream background (#FBF6F4). Teeth are natural ivory and gums a soft healthy pink. Use small accents only in deep red (#A61C2E), maroon (#2B0A0F) and muted gold (#D4AF37). Calm, premium and clinical, with generous empty space around the subject.
- **Illustration:** Draw it as a warm, modern editorial illustration: clean flat shapes, soft shading and a subtle paper-grain texture, in a limited palette of cream (#FBF6F4), blush pink (#F6ECE9), deep red (#A61C2E), maroon (#2B0A0F) and muted gold (#D4AF37). People are Indian, with natural skin tones, friendly simple faces and everyday clothes. Calm and reassuring, never frightening or gory.
- **Every image:** The image contains no words, letters, numbers, logos, watermarks or signatures. Teeth look anatomically believable: the right number, evenly shaped, with natural gums. It is clearly an illustration, not a photograph of a real patient or a real clinic.

## Treatment pages

### [x] Root canal treatment

- **Shows on:** Root canal treatment page, beside the headline
- **Save as:** `apps/web/public/ai/treatments/root-canal-treatment.jpg` — 1200×1200 (1:1)
- **Alt text (already in the site):** Illustration of a molar cut in half, showing the root canals inside the tooth

```text
A single lower molar tooth shown in a clean vertical cross-section, revealing the enamel, the dentine and the pulp chamber with two root canals running down into the roots. The canals glow softly in deep red, as if being cleaned and sealed. The tooth floats slightly above the background with a soft shadow beneath it. Render it as a soft, matte 3D clay-style illustration: smooth rounded forms, gentle diffused studio light from the upper left, soft contact shadows, on a warm cream background (#FBF6F4). Teeth are natural ivory and gums a soft healthy pink. Use small accents only in deep red (#A61C2E), maroon (#2B0A0F) and muted gold (#D4AF37). Calm, premium and clinical, with generous empty space around the subject. The image contains no words, letters, numbers, logos, watermarks or signatures. Teeth look anatomically believable: the right number, evenly shaped, with natural gums. It is clearly an illustration, not a photograph of a real patient or a real clinic. Aspect ratio 1:1.
```

### [x] Veneers

- **Shows on:** Veneers page, beside the headline
- **Save as:** `apps/web/public/ai/treatments/veneers.jpg` — 1200×1200 (1:1)
- **Alt text (already in the site):** Illustration of a thin porcelain veneer about to be fitted onto a front tooth

```text
One upper front tooth seen at a slight angle, with a thin, slightly translucent porcelain veneer shell hovering just in front of it, about to be bonded onto its front surface. The veneer catches a soft highlight that shows how thin it is. Render it as a soft, matte 3D clay-style illustration: smooth rounded forms, gentle diffused studio light from the upper left, soft contact shadows, on a warm cream background (#FBF6F4). Teeth are natural ivory and gums a soft healthy pink. Use small accents only in deep red (#A61C2E), maroon (#2B0A0F) and muted gold (#D4AF37). Calm, premium and clinical, with generous empty space around the subject. The image contains no words, letters, numbers, logos, watermarks or signatures. Teeth look anatomically believable: the right number, evenly shaped, with natural gums. It is clearly an illustration, not a photograph of a real patient or a real clinic. Aspect ratio 1:1.
```

### [x] Crowns

- **Shows on:** Crowns page, beside the headline
- **Save as:** `apps/web/public/ai/treatments/crowns.jpg` — 1200×1200 (1:1)
- **Alt text (already in the site):** Illustration of a dental crown being placed onto a prepared tooth

```text
A prepared back-tooth stump set in a small section of pink gum, with a smooth, natural-looking white zirconia crown descending onto it from above, aligned to fit exactly. A faint gold outline traces the fit line between crown and tooth. Render it as a soft, matte 3D clay-style illustration: smooth rounded forms, gentle diffused studio light from the upper left, soft contact shadows, on a warm cream background (#FBF6F4). Teeth are natural ivory and gums a soft healthy pink. Use small accents only in deep red (#A61C2E), maroon (#2B0A0F) and muted gold (#D4AF37). Calm, premium and clinical, with generous empty space around the subject. The image contains no words, letters, numbers, logos, watermarks or signatures. Teeth look anatomically believable: the right number, evenly shaped, with natural gums. It is clearly an illustration, not a photograph of a real patient or a real clinic. Aspect ratio 1:1.
```

### [x] Laser dentistry

- **Shows on:** Laser dentistry page, beside the headline
- **Save as:** `apps/web/public/ai/treatments/laser-dentistry.jpg` — 1200×1200 (1:1)
- **Alt text (already in the site):** Illustration of a soft laser beam treating the gum line

```text
A model of a row of lower front teeth in healthy pink gums, with a slim, soft beam of red light touching the gum line at one tooth. The beam comes from outside the frame, so no device or brand is visible. Precise, gentle and calm. Render it as a soft, matte 3D clay-style illustration: smooth rounded forms, gentle diffused studio light from the upper left, soft contact shadows, on a warm cream background (#FBF6F4). Teeth are natural ivory and gums a soft healthy pink. Use small accents only in deep red (#A61C2E), maroon (#2B0A0F) and muted gold (#D4AF37). Calm, premium and clinical, with generous empty space around the subject. The image contains no words, letters, numbers, logos, watermarks or signatures. Teeth look anatomically believable: the right number, evenly shaped, with natural gums. It is clearly an illustration, not a photograph of a real patient or a real clinic. Aspect ratio 1:1.
```

### [x] Teeth whitening

- **Shows on:** Teeth whitening page, beside the headline
- **Save as:** `apps/web/public/ai/treatments/teeth-whitening.jpg` — 1200×1200 (1:1)
- **Alt text (already in the site):** Illustration of a tooth shade guide next to a bright tooth

```text
A fan-shaped dental shade guide with tooth-shaped tabs graded from warm ivory to bright natural white, laid on the surface beside a single healthy, bright tooth model. The brightest tab and the tooth share a soft glow. Render it as a soft, matte 3D clay-style illustration: smooth rounded forms, gentle diffused studio light from the upper left, soft contact shadows, on a warm cream background (#FBF6F4). Teeth are natural ivory and gums a soft healthy pink. Use small accents only in deep red (#A61C2E), maroon (#2B0A0F) and muted gold (#D4AF37). Calm, premium and clinical, with generous empty space around the subject. The image contains no words, letters, numbers, logos, watermarks or signatures. Teeth look anatomically believable: the right number, evenly shaped, with natural gums. It is clearly an illustration, not a photograph of a real patient or a real clinic. Aspect ratio 1:1.
```

### [x] Dentures & bridges

- **Shows on:** Dentures & bridges page, beside the headline
- **Save as:** `apps/web/public/ai/treatments/dentures-bridges.jpg` — 1200×1200 (1:1)
- **Alt text (already in the site):** Illustration of a complete denture set and a small dental bridge

```text
A complete upper and lower denture set with natural-looking teeth on soft pink gum-coloured bases, resting slightly open on the surface. Beside it sits a small three-tooth bridge. Render it as a soft, matte 3D clay-style illustration: smooth rounded forms, gentle diffused studio light from the upper left, soft contact shadows, on a warm cream background (#FBF6F4). Teeth are natural ivory and gums a soft healthy pink. Use small accents only in deep red (#A61C2E), maroon (#2B0A0F) and muted gold (#D4AF37). Calm, premium and clinical, with generous empty space around the subject. The image contains no words, letters, numbers, logos, watermarks or signatures. Teeth look anatomically believable: the right number, evenly shaped, with natural gums. It is clearly an illustration, not a photograph of a real patient or a real clinic. Aspect ratio 1:1.
```

### [x] Emergency care

- **Shows on:** Emergency dental care page, beside the headline
- **Save as:** `apps/web/public/ai/treatments/emergency-dental-care.jpg` — 1200×1200 (1:1)
- **Alt text (already in the site):** Illustration of a chipped tooth beside a glass of milk and gauze

```text
A single front tooth with a small chip broken off its edge, the chipped piece resting beside it, next to a small glass of milk and a neatly folded white gauze pad. A small maroon first-aid cross sits on the surface. Render it as a soft, matte 3D clay-style illustration: smooth rounded forms, gentle diffused studio light from the upper left, soft contact shadows, on a warm cream background (#FBF6F4). Teeth are natural ivory and gums a soft healthy pink. Use small accents only in deep red (#A61C2E), maroon (#2B0A0F) and muted gold (#D4AF37). Calm, premium and clinical, with generous empty space around the subject. The image contains no words, letters, numbers, logos, watermarks or signatures. Teeth look anatomically believable: the right number, evenly shaped, with natural gums. It is clearly an illustration, not a photograph of a real patient or a real clinic. Aspect ratio 1:1.
```

### [x] Kids' dentistry

- **Shows on:** Kids' dentistry page, beside the headline
- **Save as:** `apps/web/public/ai/treatments/paediatric-dentistry.jpg` — 1200×1200 (1:1)
- **Alt text (already in the site):** Illustration of a smiling child in a dental chair holding a toothbrush

```text
A cheerful Indian girl about seven years old sits in a dental chair, smiling and holding a child's toothbrush. A dentist appears only as a gloved hand holding up a small mirror for her to see her teeth. A soft toy tooth sits on the tray. Draw it as a warm, modern editorial illustration: clean flat shapes, soft shading and a subtle paper-grain texture, in a limited palette of cream (#FBF6F4), blush pink (#F6ECE9), deep red (#A61C2E), maroon (#2B0A0F) and muted gold (#D4AF37). People are Indian, with natural skin tones, friendly simple faces and everyday clothes. Calm and reassuring, never frightening or gory. The image contains no words, letters, numbers, logos, watermarks or signatures. Teeth look anatomically believable: the right number, evenly shaped, with natural gums. It is clearly an illustration, not a photograph of a real patient or a real clinic. Aspect ratio 1:1.
```

## Article covers

### [x] Signs you might need a root canal

- **Shows on:** Article cover: Signs You Might Need a Root Canal
- **Save as:** `apps/web/public/ai/articles/signs-you-might-need-a-root-canal.jpg` — 1600×900 (16:9)
- **Alt text (already in the site):** Illustration of a person holding their cheek after sipping hot tea

```text
An Indian adult at a kitchen table pauses mid-sip of a hot cup of chai and holds one cheek, wincing slightly at tooth sensitivity. Morning light comes through a window. Draw it as a warm, modern editorial illustration: clean flat shapes, soft shading and a subtle paper-grain texture, in a limited palette of cream (#FBF6F4), blush pink (#F6ECE9), deep red (#A61C2E), maroon (#2B0A0F) and muted gold (#D4AF37). People are Indian, with natural skin tones, friendly simple faces and everyday clothes. Calm and reassuring, never frightening or gory. The image contains no words, letters, numbers, logos, watermarks or signatures. Teeth look anatomically believable: the right number, evenly shaped, with natural gums. It is clearly an illustration, not a photograph of a real patient or a real clinic. Aspect ratio 16:9.
```

### [x] Implants vs. bridges

- **Shows on:** Article cover: Dental Implants vs. Bridges
- **Save as:** `apps/web/public/ai/articles/dental-implants-vs-bridges.jpg` — 1600×900 (16:9)
- **Alt text (already in the site):** Illustration comparing a dental implant with a dental bridge

```text
Two jaw-section models side by side. On the left, a single dental implant with its crown sits in the bone between two natural teeth. On the right, a three-tooth bridge rests on two shaped neighbouring teeth over a gap. Render it as a soft, matte 3D clay-style illustration: smooth rounded forms, gentle diffused studio light from the upper left, soft contact shadows, on a warm cream background (#FBF6F4). Teeth are natural ivory and gums a soft healthy pink. Use small accents only in deep red (#A61C2E), maroon (#2B0A0F) and muted gold (#D4AF37). Calm, premium and clinical, with generous empty space around the subject. The image contains no words, letters, numbers, logos, watermarks or signatures. Teeth look anatomically believable: the right number, evenly shaped, with natural gums. It is clearly an illustration, not a photograph of a real patient or a real clinic. Aspect ratio 16:9.
```

### [x] What affects implant cost

- **Shows on:** Article cover: What Affects the Cost of Dental Implants?
- **Save as:** `apps/web/public/ai/articles/dental-implant-cost-factors.jpg` — 1600×900 (16:9)
- **Alt text (already in the site):** Illustration of a treatment estimate, an implant model and a calculator on a desk

```text
A tidy desk seen from above: a printed treatment estimate shown only as blank lines and boxes, a small dental implant model, a calculator, a pen and a cup of chai. Draw it as a warm, modern editorial illustration: clean flat shapes, soft shading and a subtle paper-grain texture, in a limited palette of cream (#FBF6F4), blush pink (#F6ECE9), deep red (#A61C2E), maroon (#2B0A0F) and muted gold (#D4AF37). People are Indian, with natural skin tones, friendly simple faces and everyday clothes. Calm and reassuring, never frightening or gory. The image contains no words, letters, numbers, logos, watermarks or signatures. Teeth look anatomically believable: the right number, evenly shaped, with natural gums. It is clearly an illustration, not a photograph of a real patient or a real clinic. Aspect ratio 16:9.
```

### [x] Veneers vs. crowns

- **Shows on:** Article cover: Veneers vs. Crowns
- **Save as:** `apps/web/public/ai/articles/veneers-vs-crowns.jpg` — 1600×900 (16:9)
- **Alt text (already in the site):** Illustration comparing a veneer with a crown

```text
Two upper front tooth models side by side: the left one has a thin veneer shell on its front surface only, the right one is fully covered by a crown. A thin gold line separates the two. Render it as a soft, matte 3D clay-style illustration: smooth rounded forms, gentle diffused studio light from the upper left, soft contact shadows, on a warm cream background (#FBF6F4). Teeth are natural ivory and gums a soft healthy pink. Use small accents only in deep red (#A61C2E), maroon (#2B0A0F) and muted gold (#D4AF37). Calm, premium and clinical, with generous empty space around the subject. The image contains no words, letters, numbers, logos, watermarks or signatures. Teeth look anatomically believable: the right number, evenly shaped, with natural gums. It is clearly an illustration, not a photograph of a real patient or a real clinic. Aspect ratio 16:9.
```

### [x] Root canal aftercare

- **Shows on:** Article cover: 10 Tips for a Smooth Recovery After a Root Canal
- **Save as:** `apps/web/public/ai/articles/root-canal-aftercare-tips.jpg` — 1600×900 (16:9)
- **Alt text (already in the site):** Illustration of a person resting at home with a soft meal after dental treatment

```text
An Indian adult resting comfortably on a sofa at home with a soft meal of khichdi in a bowl, a glass of water and a soft-bristled toothbrush on the side table. Draw it as a warm, modern editorial illustration: clean flat shapes, soft shading and a subtle paper-grain texture, in a limited palette of cream (#FBF6F4), blush pink (#F6ECE9), deep red (#A61C2E), maroon (#2B0A0F) and muted gold (#D4AF37). People are Indian, with natural skin tones, friendly simple faces and everyday clothes. Calm and reassuring, never frightening or gory. The image contains no words, letters, numbers, logos, watermarks or signatures. Teeth look anatomically believable: the right number, evenly shaped, with natural gums. It is clearly an illustration, not a photograph of a real patient or a real clinic. Aspect ratio 16:9.
```

### [x] What is laser dentistry

- **Shows on:** Article cover: What Is Laser Dentistry?
- **Save as:** `apps/web/public/ai/articles/what-is-laser-dentistry.jpg` — 1600×900 (16:9)
- **Alt text (already in the site):** Illustration of a gentle laser beam on a model of teeth and gums

```text
A wide, calm composition of a gum-and-teeth model on the right, with a single slim beam of soft red light entering from the left edge and touching the gum line. No device is visible. Render it as a soft, matte 3D clay-style illustration: smooth rounded forms, gentle diffused studio light from the upper left, soft contact shadows, on a warm cream background (#FBF6F4). Teeth are natural ivory and gums a soft healthy pink. Use small accents only in deep red (#A61C2E), maroon (#2B0A0F) and muted gold (#D4AF37). Calm, premium and clinical, with generous empty space around the subject. The image contains no words, letters, numbers, logos, watermarks or signatures. Teeth look anatomically believable: the right number, evenly shaped, with natural gums. It is clearly an illustration, not a photograph of a real patient or a real clinic. Aspect ratio 16:9.
```

### [x] Choosing a dentist in Ludhiana

- **Shows on:** Article cover: How to Choose the Right Dentist in Ludhiana
- **Save as:** `apps/web/public/ai/articles/how-to-choose-a-dentist-in-ludhiana.jpg` — 1600×900 (16:9)
- **Alt text (already in the site):** Illustration of a family at home deciding on a dentist together

```text
A Punjabi family of three sits together on a sofa at home, looking at a phone and a printed leaflet and talking calmly about choosing a dentist. A window shows a soft city skyline. Draw it as a warm, modern editorial illustration: clean flat shapes, soft shading and a subtle paper-grain texture, in a limited palette of cream (#FBF6F4), blush pink (#F6ECE9), deep red (#A61C2E), maroon (#2B0A0F) and muted gold (#D4AF37). People are Indian, with natural skin tones, friendly simple faces and everyday clothes. Calm and reassuring, never frightening or gory. The image contains no words, letters, numbers, logos, watermarks or signatures. Teeth look anatomically believable: the right number, evenly shaped, with natural gums. It is clearly an illustration, not a photograph of a real patient or a real clinic. Aspect ratio 16:9.
```

### [x] Life with implants

- **Shows on:** Article cover: Life With Dental Implants
- **Save as:** `apps/web/public/ai/articles/living-with-dental-implants-long-term.jpg` — 1600×900 (16:9)
- **Alt text (already in the site):** Illustration of an older couple enjoying a meal together

```text
An older Indian couple laughing together at a dining table, the man biting into a crisp apple and the woman tearing a roti, both relaxed and confident. Draw it as a warm, modern editorial illustration: clean flat shapes, soft shading and a subtle paper-grain texture, in a limited palette of cream (#FBF6F4), blush pink (#F6ECE9), deep red (#A61C2E), maroon (#2B0A0F) and muted gold (#D4AF37). People are Indian, with natural skin tones, friendly simple faces and everyday clothes. Calm and reassuring, never frightening or gory. The image contains no words, letters, numbers, logos, watermarks or signatures. Teeth look anatomically believable: the right number, evenly shaped, with natural gums. It is clearly an illustration, not a photograph of a real patient or a real clinic. Aspect ratio 16:9.
```

### [x] Whitening myths

- **Shows on:** Article cover: 5 Teeth Whitening Myths
- **Save as:** `apps/web/public/ai/articles/teeth-whitening-myths.jpg` — 1600×900 (16:9)
- **Alt text (already in the site):** Illustration of lemon, baking soda, charcoal and a strawberry beside a shade guide

```text
A neat row of home whitening myths laid out on the surface: half a lemon, a small bowl of baking soda, a pinch of charcoal powder and a strawberry, with a dental shade guide set slightly apart at the end of the row. Render it as a soft, matte 3D clay-style illustration: smooth rounded forms, gentle diffused studio light from the upper left, soft contact shadows, on a warm cream background (#FBF6F4). Teeth are natural ivory and gums a soft healthy pink. Use small accents only in deep red (#A61C2E), maroon (#2B0A0F) and muted gold (#D4AF37). Calm, premium and clinical, with generous empty space around the subject. The image contains no words, letters, numbers, logos, watermarks or signatures. Teeth look anatomically believable: the right number, evenly shaped, with natural gums. It is clearly an illustration, not a photograph of a real patient or a real clinic. Aspect ratio 16:9.
```

### [x] Denture care

- **Shows on:** Article cover: How to Care for Your Dentures
- **Save as:** `apps/web/public/ai/articles/denture-care-guide.jpg` — 1600×900 (16:9)
- **Alt text (already in the site):** Illustration of a denture soaking in a glass of water beside a denture brush

```text
A denture soaking in a clear glass of water on a clean bathroom shelf, beside a soft denture brush and a small folded towel. Render it as a soft, matte 3D clay-style illustration: smooth rounded forms, gentle diffused studio light from the upper left, soft contact shadows, on a warm cream background (#FBF6F4). Teeth are natural ivory and gums a soft healthy pink. Use small accents only in deep red (#A61C2E), maroon (#2B0A0F) and muted gold (#D4AF37). Calm, premium and clinical, with generous empty space around the subject. The image contains no words, letters, numbers, logos, watermarks or signatures. Teeth look anatomically believable: the right number, evenly shaped, with natural gums. It is clearly an illustration, not a photograph of a real patient or a real clinic. Aspect ratio 16:9.
```

### [x] Dental emergency first aid

- **Shows on:** Article cover: Dental Emergency First Aid
- **Save as:** `apps/web/public/ai/articles/dental-emergency-first-aid.jpg` — 1600×900 (16:9)
- **Alt text (already in the site):** Illustration of dental first-aid items: milk, gauze, an ice pack and a phone

```text
A calm first-aid arrangement: a small glass of milk, a folded white gauze pad, an ice pack wrapped in a cloth and a smartphone lying face down, set out neatly on the surface. Render it as a soft, matte 3D clay-style illustration: smooth rounded forms, gentle diffused studio light from the upper left, soft contact shadows, on a warm cream background (#FBF6F4). Teeth are natural ivory and gums a soft healthy pink. Use small accents only in deep red (#A61C2E), maroon (#2B0A0F) and muted gold (#D4AF37). Calm, premium and clinical, with generous empty space around the subject. The image contains no words, letters, numbers, logos, watermarks or signatures. Teeth look anatomically believable: the right number, evenly shaped, with natural gums. It is clearly an illustration, not a photograph of a real patient or a real clinic. Aspect ratio 16:9.
```

### [x] Child's first dental visit

- **Shows on:** Article cover: Your Child's First Dental Visit
- **Save as:** `apps/web/public/ai/articles/childs-first-dental-visit.jpg` — 1600×900 (16:9)
- **Alt text (already in the site):** Illustration of a parent and child walking to a dental visit together

```text
An Indian mother and her young son walk hand in hand along a bright path towards a friendly door with a simple tooth-shaped sign. The boy holds a plush toy tooth and looks curious, not scared. Draw it as a warm, modern editorial illustration: clean flat shapes, soft shading and a subtle paper-grain texture, in a limited palette of cream (#FBF6F4), blush pink (#F6ECE9), deep red (#A61C2E), maroon (#2B0A0F) and muted gold (#D4AF37). People are Indian, with natural skin tones, friendly simple faces and everyday clothes. Calm and reassuring, never frightening or gory. The image contains no words, letters, numbers, logos, watermarks or signatures. Teeth look anatomically believable: the right number, evenly shaped, with natural gums. It is clearly an illustration, not a photograph of a real patient or a real clinic. Aspect ratio 16:9.
```

## Emergency first aid

### [x] Knocked-out tooth

- **Shows on:** Resources page, first-aid card: Knocked-out tooth
- **Save as:** `apps/web/public/ai/first-aid/knocked-out-tooth.jpg` — 1200×900 (4:3)
- **Alt text (already in the site):** Illustration of a knocked-out tooth held by its crown over a glass of milk

```text
Close-up of two hands carefully holding a knocked-out front tooth by its white crown, never touching the root, about to place it into a small glass of milk. Draw it as a warm, modern editorial illustration: clean flat shapes, soft shading and a subtle paper-grain texture, in a limited palette of cream (#FBF6F4), blush pink (#F6ECE9), deep red (#A61C2E), maroon (#2B0A0F) and muted gold (#D4AF37). People are Indian, with natural skin tones, friendly simple faces and everyday clothes. Calm and reassuring, never frightening or gory. The image contains no words, letters, numbers, logos, watermarks or signatures. Teeth look anatomically believable: the right number, evenly shaped, with natural gums. It is clearly an illustration, not a photograph of a real patient or a real clinic. Aspect ratio 4:3.
```

### [x] Severe toothache

- **Shows on:** Resources page, first-aid card: Severe toothache
- **Save as:** `apps/web/public/ai/first-aid/toothache.jpg` — 1200×900 (4:3)
- **Alt text (already in the site):** Illustration of a person holding a cold compress to their cheek

```text
An Indian adult sitting on a sofa, holding a cold compress wrapped in a cloth against the outside of one cheek, with a glass of warm salt water on the table beside them. Draw it as a warm, modern editorial illustration: clean flat shapes, soft shading and a subtle paper-grain texture, in a limited palette of cream (#FBF6F4), blush pink (#F6ECE9), deep red (#A61C2E), maroon (#2B0A0F) and muted gold (#D4AF37). People are Indian, with natural skin tones, friendly simple faces and everyday clothes. Calm and reassuring, never frightening or gory. The image contains no words, letters, numbers, logos, watermarks or signatures. Teeth look anatomically believable: the right number, evenly shaped, with natural gums. It is clearly an illustration, not a photograph of a real patient or a real clinic. Aspect ratio 4:3.
```

### [x] Broken or chipped tooth

- **Shows on:** Resources page, first-aid card: Broken or chipped tooth
- **Save as:** `apps/web/public/ai/first-aid/broken-tooth.jpg` — 1200×900 (4:3)
- **Alt text (already in the site):** Illustration of a broken tooth piece saved in a cup of milk

```text
A small broken piece of tooth resting in a little cup of milk on a table, beside a stick of sugar-free chewing gum and a glass of warm water. Draw it as a warm, modern editorial illustration: clean flat shapes, soft shading and a subtle paper-grain texture, in a limited palette of cream (#FBF6F4), blush pink (#F6ECE9), deep red (#A61C2E), maroon (#2B0A0F) and muted gold (#D4AF37). People are Indian, with natural skin tones, friendly simple faces and everyday clothes. Calm and reassuring, never frightening or gory. The image contains no words, letters, numbers, logos, watermarks or signatures. Teeth look anatomically believable: the right number, evenly shaped, with natural gums. It is clearly an illustration, not a photograph of a real patient or a real clinic. Aspect ratio 4:3.
```

### [ ] Bleeding that won't stop

- **Shows on:** Resources page, first-aid card: Bleeding that won't stop
- **Save as:** `apps/web/public/ai/first-aid/bleeding.jpg` — 1200×900 (4:3)
- **Alt text (already in the site):** Illustration of a person biting on gauze to stop bleeding

```text
An Indian adult sitting upright and calm, gently biting on a folded clean gauze pad, with a simple wall clock behind them to suggest waiting fifteen minutes. Draw it as a warm, modern editorial illustration: clean flat shapes, soft shading and a subtle paper-grain texture, in a limited palette of cream (#FBF6F4), blush pink (#F6ECE9), deep red (#A61C2E), maroon (#2B0A0F) and muted gold (#D4AF37). People are Indian, with natural skin tones, friendly simple faces and everyday clothes. Calm and reassuring, never frightening or gory. The image contains no words, letters, numbers, logos, watermarks or signatures. Teeth look anatomically believable: the right number, evenly shaped, with natural gums. It is clearly an illustration, not a photograph of a real patient or a real clinic. Aspect ratio 4:3.
```

## How to take the 3 photos

### [ ] Photo 1: front smile

- **Shows on:** 'Send us 3 photos' band, tile 1
- **Save as:** `apps/web/public/ai/photo-guide/front-smile.jpg` — 800×800 (1:1)
- **Alt text (already in the site):** Illustration of a woman photographing her smile with a phone

```text
A young Indian woman stands by a bright window holding a smartphone at arm's length, taking a photo of her natural smile with her teeth together. Draw it as a warm, modern editorial illustration: clean flat shapes, soft shading and a subtle paper-grain texture, in a limited palette of cream (#FBF6F4), blush pink (#F6ECE9), deep red (#A61C2E), maroon (#2B0A0F) and muted gold (#D4AF37). People are Indian, with natural skin tones, friendly simple faces and everyday clothes. Calm and reassuring, never frightening or gory. The image contains no words, letters, numbers, logos, watermarks or signatures. Teeth look anatomically believable: the right number, evenly shaped, with natural gums. It is clearly an illustration, not a photograph of a real patient or a real clinic. Aspect ratio 1:1.
```

### [ ] Photo 2: upper teeth

- **Shows on:** 'Send us 3 photos' band, tile 2
- **Save as:** `apps/web/public/ai/photo-guide/upper-teeth.jpg` — 800×800 (1:1)
- **Alt text (already in the site):** Illustration of a man photographing his upper teeth with a phone

```text
An Indian man tilts his head back with his mouth open wide, holding a smartphone below his chin and pointing it up to photograph his upper teeth, in good daylight. Draw it as a warm, modern editorial illustration: clean flat shapes, soft shading and a subtle paper-grain texture, in a limited palette of cream (#FBF6F4), blush pink (#F6ECE9), deep red (#A61C2E), maroon (#2B0A0F) and muted gold (#D4AF37). People are Indian, with natural skin tones, friendly simple faces and everyday clothes. Calm and reassuring, never frightening or gory. The image contains no words, letters, numbers, logos, watermarks or signatures. Teeth look anatomically believable: the right number, evenly shaped, with natural gums. It is clearly an illustration, not a photograph of a real patient or a real clinic. Aspect ratio 1:1.
```

### [ ] Photo 3: lower teeth

- **Shows on:** 'Send us 3 photos' band, tile 3
- **Save as:** `apps/web/public/ai/photo-guide/lower-teeth.jpg` — 800×800 (1:1)
- **Alt text (already in the site):** Illustration of a man photographing his lower teeth with a phone

```text
An Indian man tilts his head down with his mouth open wide, holding a smartphone above and pointing it down to photograph his lower teeth, in good daylight. Draw it as a warm, modern editorial illustration: clean flat shapes, soft shading and a subtle paper-grain texture, in a limited palette of cream (#FBF6F4), blush pink (#F6ECE9), deep red (#A61C2E), maroon (#2B0A0F) and muted gold (#D4AF37). People are Indian, with natural skin tones, friendly simple faces and everyday clothes. Calm and reassuring, never frightening or gory. The image contains no words, letters, numbers, logos, watermarks or signatures. Teeth look anatomically believable: the right number, evenly shaped, with natural gums. It is clearly an illustration, not a photograph of a real patient or a real clinic. Aspect ratio 1:1.
```

## Home page

### [ ] The right diagnosis comes first

- **Shows on:** Home page, 'Why patients choose RedCity', middle card
- **Save as:** `apps/web/public/ai/home/diagnosis-first.jpg` — 1600×1200 (4:3)
- **Alt text (already in the site):** Illustration of a dentist explaining an X-ray to a patient

```text
A calm, honest conversation in a dental surgery: an Indian patient sits upright in the chair, listening, while a dentist shown only from behind points to a dental X-ray on a monitor. The dentist's face is not visible. Draw it as a warm, modern editorial illustration: clean flat shapes, soft shading and a subtle paper-grain texture, in a limited palette of cream (#FBF6F4), blush pink (#F6ECE9), deep red (#A61C2E), maroon (#2B0A0F) and muted gold (#D4AF37). People are Indian, with natural skin tones, friendly simple faces and everyday clothes. Calm and reassuring, never frightening or gory. The image contains no words, letters, numbers, logos, watermarks or signatures. Teeth look anatomically believable: the right number, evenly shaped, with natural gums. It is clearly an illustration, not a photograph of a real patient or a real clinic. Aspect ratio 4:3.
```
