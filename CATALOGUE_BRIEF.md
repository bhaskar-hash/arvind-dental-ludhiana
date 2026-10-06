# RedCity Dental — service catalogue brief for Gemini

A brief for the Gemini agent in Antigravity to build Dr. Arvind Sahu's service catalogue: 20 square cards for WhatsApp Business, Google and Instagram, and a printable PDF catalogue. Everything it needs is in this file or in the repository.

**Source of truth.** Facts here are copied from the website code. If anything here disagrees with these files, the files win. Stop and say so rather than guessing:

- `apps/web/src/lib/business.ts` (name, address, phone)
- `apps/web/src/lib/doctor.ts` (bio, credentials, Punjabi message)
- `apps/web/src/lib/pricing.ts` (fees and memberships)
- `apps/web/src/lib/policies.ts` (warranty)

## Task for the Antigravity agent

Work through Parts 1 to 6 in order.

1. Run `pnpm ai-images` and generate every missing image in the **Service catalogue** section of `AI_IMAGE_PROMPTS.md`, following that file's own rules. Save each one to its exact path, then run `pnpm ai-images:optimize` and `pnpm ai-images` again.
2. Create `guides/redcity-catalogue/` and save the JSON in Part 4 there as `catalogue.json`, unchanged.
3. Build the 20 cards (Part 5A) and the PDF (Part 5B) from `catalogue.json`. Every word, price and phone number on them comes from that file, typed in HTML. Never let the image model draw any text.
4. Run every check in Part 6 and fix what fails.
5. Show me each card and the PDF. Ask me before you commit, push or deploy anything, and before starting Part 5C.

---

## Part 1 — What to make

| Deliverable | Size | Save to | Used for |
|---|---|---|---|
| 19 service cards + 1 "Meet Dr. Sahu" card | 1080 × 1080 px JPG | `guides/redcity-catalogue/cards/<id>.jpg` | WhatsApp Business catalogue, Google Business Profile products, Instagram and WhatsApp Status |
| Printable catalogue | A4 portrait, 9 pages, PDF | `guides/redcity-catalogue/RedCity-Dental-Catalogue.pdf` | Reception desk, WhatsApp attachment, print |
| (Part 5C, only when asked) Updated WhatsApp setup guide | — | `guides/redcity-whatsapp-guide/` | Replaces its old catalogue images and old phone number |

## Part 2 — Rules that are never broken

**Accuracy**

- Phone is **+91 76268 58230** (short form 76268 58230) and WhatsApp is `https://wa.me/917626858230`. The old number 88476 51364 must not appear anywhere.
- Prices come only from Part 4. Anything without a price says **"Price after examination"**. Never estimate one.
- Opening hours aren't confirmed. Write "Call or WhatsApp for today's hours" and never invent hours.
- Implant warranty wording, exactly: **"Up to lifetime warranty\*"**, with the footnote "\*5-year, 10-year or lifetime, depending on the implant option. Breakage and failure from poor hygiene aren't covered." Never write "10-year warranty" on its own.
- The photo review always carries this exact sentence: **"Dr. Sahu will personally review your photos and send you a voice message — this is not an automated diagnosis."**
- Memberships always carry "This is a membership plan, not dental insurance."

**Images**

- AI artwork only from the list in Part 3, and only as illustrations.
- Never AI-generate or use:
  - before-and-after pictures or treatment results
  - a real-looking patient
  - Dr. Sahu, the team, the clinic building, its rooms or its equipment
  - X-rays or records presented as a patient's
  - certificates, ratings, reviews or testimonial faces
  - another brand's logo
- Real photos of Dr. Sahu and the clinic come only from the files in Part 3.
- The before/after case photos in `apps/web/public/cases/` are **not** used in this catalogue.

**Words to avoid** (Dental Council advertising norms and consumer law)

- "best", "No. 1", "top", "leading", "guaranteed", "100%", "painless", "permanent", "cheapest", "free", "miracle", "risk-free"
- Comparisons with other clinics
- Patient testimonials

## Part 3 — Brand kit and image assets

**Colours**

| Token | Hex | Use |
|---|---|---|
| Brand red | `#A61C2E` | Prices, accents, buttons |
| Red dark | `#7D1523` | Hover/pressed, deep accents |
| Maroon | `#2B0A0F` | Footer bar, dark pages |
| Gold | `#D4AF37` | Badges, thin rules |
| Gold light | `#F2D98A` | Phone number on maroon |
| Ink | `#1F1718` | Headings and body text |
| Muted | `#5E5456` | Secondary text, fine print |
| Warm cream | `#FBF6F4` | Page and card background |
| Blush | `#F6ECE9` | Soft panels |
| Line | `#EADFDC` | Borders and dividers |

**Fonts** (Google Fonts):

- **Roboto Slab** 700/800 for headings
- **Inter** 400/500/600/700 for text
- **Noto Sans Gurmukhi** 500 for Dr. Sahu's Punjabi message

Load them with:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Gurmukhi:wght@500&family=Roboto+Slab:wght@700;800&display=swap" rel="stylesheet">
```

**Real photos and logos** (under `apps/web/public/`):

| File | Size | Notes |
|---|---|---|
| `redcity-logo.png` | 560 × 169 | Logo for cards and page footers |
| `redcity-logo-full.png` | 900 × 329 | Full logo for the PDF cover |
| `dr-arvind-sahu.jpg` | 379 × 511 | Dr. Sahu's real portrait. Low resolution: show it no larger than 420 × 566 px on a card or 6 cm wide in print. Ask Dr. Sahu for a sharper photo before printing. |
| `clinic-exterior.jpg` | 1447 × 1087 | The real clinic building, for the "Visit us" page |

**AI artwork for each card** (under `apps/web/public/`). Files marked *new* are made in step 1 from `AI_IMAGE_PROMPTS.md`.

| Card id | Artwork |
|---|---|
| photo-review | `ai/catalogue/photo-review.jpg` *(new)* |
| checkup | `ai/catalogue/checkup.jpg` *(new)* |
| cleaning | `ai/catalogue/cleaning.jpg` *(new)* |
| digital-xray | `ai/catalogue/digital-xray.jpg` *(new)* |
| dental-implants | `ai/catalogue/implants.jpg` *(new)* |
| dentures-bridges | `ai/treatments/dentures-bridges.jpg` |
| full-mouth-rehabilitation | `ai/catalogue/full-mouth-rehabilitation.jpg` *(new)* |
| root-canal-treatment | `ai/treatments/root-canal-treatment.jpg` |
| crowns | `ai/treatments/crowns.jpg` |
| emergency-dental-care | `ai/treatments/emergency-dental-care.jpg` |
| laser-dentistry | `ai/treatments/laser-dentistry.jpg` |
| veneers | `ai/treatments/veneers.jpg` |
| teeth-whitening | `ai/treatments/teeth-whitening.jpg` |
| smile-makeover | `ai/catalogue/smile-makeover.jpg` *(new)* |
| paediatric-dentistry | `ai/treatments/paediatric-dentistry.jpg` |
| membership-basic, membership-advanced, membership-pro | `ai/catalogue/membership.jpg` *(new)* |
| membership-family | `ai/catalogue/membership-family.jpg` *(new)* |
| PDF cover | `ai/catalogue/cover.jpg` *(new)* |
| meet-dr-sahu | `dr-arvind-sahu.jpg` (real photo, no AI) |

## Part 4 — Catalogue content (copy word for word)

Save this as `guides/redcity-catalogue/catalogue.json`. The fields are:

- `name`: the card title and the WhatsApp item name
- `line`: the short line under the title
- `price`: the price line on the card
- `waPrice`: the number to type in WhatsApp's or Google's price field (empty means leave the field blank)
- `badge` and `fine`: optional; a gold badge and a fine-print line
- `description`: the WhatsApp and Google item description
- `link`: the item's website link
- `collection`: the WhatsApp collection

The links use the current live site. When `redcitydentalcare.com` goes live, change `site` and rebuild.

```json
{
  "site": "https://redcity-web-lac.vercel.app",
  "clinic": {
    "name": "RedCity Dental Care & Implant Centre",
    "doctor": "Dr. Arvind Sahu",
    "credentials": "BDS, MDS (Prosthodontics & Crown & Bridge)",
    "credentialsShort": "MDS (Prosthodontics)",
    "role": "Prosthodontist & Oral Implantologist",
    "address": "47 A/1, South Model Gram, Ludhiana, Punjab 141002",
    "landmark": "Near South Model Town",
    "phone": "+91 76268 58230",
    "phoneShort": "76268 58230",
    "whatsapp": "https://wa.me/917626858230",
    "maps": "https://maps.app.goo.gl/aw86VcC2PLQ8iETQ8",
    "languages": "English · ਪੰਜਾਬੀ · हिंदी",
    "hours": "Call or WhatsApp for today's hours",
    "payment": "UPI (Google Pay, PhonePe, Paytm), debit and credit cards, cash. Bigger treatments can be paid in stages.",
    "pricesAsOf": "Prices as of October 2026. Final cost is confirmed after examination."
  },
  "collections": ["Start here", "Replace missing teeth", "Pain & repair", "Smile", "Children", "Memberships"],
  "items": [
    {
      "id": "photo-review", "collection": "Start here",
      "name": "Online Photo Review",
      "line": "Not sure what you need? Send us 3 photos.",
      "price": "Send 3 photos on WhatsApp", "waPrice": "",
      "fine": "Dr. Sahu will personally review your photos and send you a voice message — this is not an automated diagnosis.",
      "description": "Not sure what you need? Send 3 photos of your teeth on WhatsApp: your front smile, your upper teeth and your lower teeth. Dr. Sahu will personally review your photos and send you a voice message — this is not an automated diagnosis.",
      "link": "/#photo-review"
    },
    {
      "id": "checkup", "collection": "Start here",
      "name": "Check-up with Dr. Sahu",
      "line": "A full examination, and honest advice on what needs doing",
      "price": "₹300", "waPrice": "300",
      "description": "A full examination of your teeth and gums by Dr. Arvind Sahu, MDS (Prosthodontics), with honest advice on what, if anything, needs doing. Most people need a check-up every 6 months. Fee: ₹300.",
      "link": "/cost-and-payment#prices"
    },
    {
      "id": "cleaning", "collection": "Start here",
      "name": "Teeth Cleaning (Scaling & Polishing)",
      "line": "Removes the tartar and stains that brushing can't",
      "price": "₹1,000", "waPrice": "1000",
      "fine": "Heavy build-up may need a second visit.",
      "description": "Professional cleaning removes the hardened tartar and stains that brushing can't, to keep your gums healthy and your breath fresh. Fee: ₹1,000. Heavy build-up may need a second visit.",
      "link": "/cost-and-payment#prices"
    },
    {
      "id": "digital-xray", "collection": "Start here",
      "name": "Digital X-ray",
      "line": "Low-radiation, and taken only when needed",
      "price": "₹200 per X-ray", "waPrice": "200",
      "description": "Digital X-rays show decay, roots and bone that can't be seen in an examination. We take them only when they're needed to diagnose. Fee: ₹200 per X-ray.",
      "link": "/cost-and-payment#prices"
    },
    {
      "id": "dental-implants", "collection": "Replace missing teeth",
      "name": "Dental Implants",
      "line": "Fixed, natural-looking replacement for missing teeth",
      "price": "Price after examination", "waPrice": "",
      "badge": "Up to lifetime warranty*",
      "fine": "*5-year, 10-year or lifetime, depending on the implant option. Breakage and failure from poor hygiene aren't covered.",
      "description": "A fixed, natural-looking replacement for one missing tooth or many, planned by Dr. Arvind Sahu, MDS (Prosthodontics). Up to lifetime warranty*: 5-year, 10-year or lifetime, depending on the implant option. *Breakage and failure from poor hygiene aren't covered. Dr. Sahu will tell you whether implants suit you after an examination.",
      "link": "/services/dental-implants"
    },
    {
      "id": "dentures-bridges", "collection": "Replace missing teeth",
      "name": "Dentures & Bridges",
      "line": "Comfortable, natural-looking replacement teeth",
      "price": "Price after examination", "waPrice": "",
      "description": "Comfortable, natural-looking replacement for missing teeth: complete dentures, partial dentures, overdentures and fixed bridges, made to fit you.",
      "link": "/services/dentures-bridges"
    },
    {
      "id": "full-mouth-rehabilitation", "collection": "Replace missing teeth",
      "name": "Full Mouth Rehabilitation",
      "line": "One complete plan to restore chewing, comfort and looks",
      "price": "Price after examination", "waPrice": "",
      "description": "For worn, broken or missing teeth across the whole mouth: one complete plan to restore chewing, comfort and appearance. This is the work Dr. Sahu's prosthodontics training is built for.",
      "link": "/services#full-mouth-rehabilitation"
    },
    {
      "id": "root-canal-treatment", "collection": "Pain & repair",
      "name": "Root Canal Treatment",
      "line": "Right diagnosis first, and RCT only when it's needed",
      "price": "Price after examination", "waPrice": "",
      "description": "Not every toothache needs a root canal. Dr. Sahu first finds the real cause of the pain and recommends root canal treatment only when it's needed to save the tooth.",
      "link": "/services/root-canal-treatment"
    },
    {
      "id": "crowns", "collection": "Pain & repair",
      "name": "Dental Crowns (Zirconia & PFM)",
      "line": "Protect and restore a damaged tooth",
      "price": "PFM from ₹2,000 · Zirconia from ₹4,000*", "waPrice": "",
      "fine": "*Per tooth. Final cost may vary depending on clinical requirements.",
      "description": "Crowns protect and restore damaged or root-canal-treated teeth. PFM crowns from ₹2,000 and Zirconia crowns from ₹4,000 per tooth*. Dr. Sahu will explain the difference in strength, appearance and cost. *Final cost may vary depending on clinical requirements.",
      "link": "/services/crowns"
    },
    {
      "id": "emergency-dental-care", "collection": "Pain & repair",
      "name": "Emergency Dental Care",
      "line": "Severe toothache, swelling or a broken tooth?",
      "price": "Call 76268 58230", "waPrice": "",
      "description": "Severe toothache, a broken or knocked-out tooth, or swelling? Call or WhatsApp +91 76268 58230 and we'll see you as early as we can. For heavy bleeding, an injury after an accident, or swelling that makes it hard to breathe or swallow, go to the nearest hospital emergency department.",
      "link": "/services/emergency-dental-care"
    },
    {
      "id": "laser-dentistry", "collection": "Pain & repair",
      "name": "Laser Dentistry",
      "line": "Precise, minimally invasive gum treatment",
      "price": "Price after examination", "waPrice": "",
      "description": "Precise, minimally invasive laser treatment for selected gum and soft-tissue procedures, where Dr. Sahu advises it suits you.",
      "link": "/services/laser-dentistry"
    },
    {
      "id": "veneers", "collection": "Smile",
      "name": "Veneers",
      "line": "Custom shells to improve shape, spacing or colour",
      "price": "Price after examination", "waPrice": "",
      "description": "Thin, custom-made shells bonded to the front of the teeth to improve their shape, spacing or colour, planned around your smile after a consultation.",
      "link": "/services/veneers"
    },
    {
      "id": "teeth-whitening", "collection": "Smile",
      "name": "Teeth Whitening",
      "line": "Dentist-supervised, natural-looking results",
      "price": "Price after examination", "waPrice": "",
      "description": "Professional, dentist-supervised whitening for a brighter smile, with realistic, natural-looking results. Dr. Sahu checks your teeth first so whitening is safe for you.",
      "link": "/services/teeth-whitening"
    },
    {
      "id": "smile-makeover", "collection": "Smile",
      "name": "Smile Makeover",
      "line": "Treatments planned together around your smile",
      "price": "Price after examination", "waPrice": "",
      "description": "Whitening, veneers, crowns or reshaping, planned together around your face and your smile after a consultation with Dr. Sahu.",
      "link": "/services#smile-makeover"
    },
    {
      "id": "paediatric-dentistry", "collection": "Children",
      "name": "Kids' Dentistry",
      "line": "Gentle check-ups and a calm first visit",
      "price": "Price after examination", "waPrice": "",
      "description": "Gentle check-ups, fillings and sealants for children, with a calm and positive first visit.",
      "link": "/services/paediatric-dentistry"
    },
    {
      "id": "membership-basic", "collection": "Memberships",
      "name": "Basic Membership",
      "line": "A check-up with Dr. Sahu every 6 months",
      "price": "₹499 a year", "priceAlt": "or ₹299 for 6 months · ₹199 for 3 months", "waPrice": "499",
      "fine": "This is a membership plan, not dental insurance.",
      "description": "For healthy teeth. A check-up with Dr. Sahu every 6 months, consultations for a new problem, and 10% off cleanings, X-rays and general treatment. 12 months ₹499 · 6 months ₹299 · 3 months ₹199. This is a membership plan, not dental insurance.",
      "link": "/cost-and-payment#membership"
    },
    {
      "id": "membership-advanced", "collection": "Memberships",
      "name": "Advanced Membership",
      "line": "Check-ups, cleanings and X-rays included",
      "price": "₹2,499 a year", "priceAlt": "or ₹1,399 for 6 months · ₹749 for 3 months", "waPrice": "2499",
      "fine": "*On 6 and 12-month memberships. A membership plan, not dental insurance.",
      "description": "Check-ups, cleanings and X-rays included, 15% off fillings, root canals and extractions, and 10% off crowns, bridges, dentures and implants*. 12 months ₹2,499 · 6 months ₹1,399 · 3 months ₹749. *Larger discounts on crowns, bridges, dentures and implants apply to 6 and 12-month memberships. Discounts apply to the clinic's fees; lab work and implant parts are charged at the normal price. This is a membership plan, not dental insurance.",
      "link": "/cost-and-payment#membership"
    },
    {
      "id": "membership-pro", "collection": "Memberships",
      "name": "Pro Membership",
      "line": "For people in treatment or planning bigger work",
      "price": "₹3,499 a year", "priceAlt": "or ₹1,899 for 6 months · ₹1,049 for 3 months", "waPrice": "3499",
      "fine": "*On 6 and 12-month memberships. A membership plan, not dental insurance.",
      "description": "Everything in Advanced, plus 20% off general treatment, 15% off crowns, bridges, dentures and implants*, priority WhatsApp replies and a same-day emergency slot during clinic hours. 12 months ₹3,499 · 6 months ₹1,899 · 3 months ₹1,049. *Larger discounts on crowns, bridges, dentures and implants apply to 6 and 12-month memberships. Discounts apply to the clinic's fees; lab work and implant parts are charged at the normal price. This is a membership plan, not dental insurance.",
      "link": "/cost-and-payment#membership"
    },
    {
      "id": "membership-family", "collection": "Memberships",
      "name": "Family with Pro",
      "line": "Pro benefits for 2 adults and 2 children",
      "price": "₹9,999 a year", "priceAlt": "or ₹5,499 for 6 months · ₹2,999 for 3 months", "waPrice": "9999",
      "fine": "Children under 18. A membership plan, not dental insurance.",
      "description": "Pro benefits for 2 adults and 2 children under 18, with fluoride or sealants for children when clinically advised. Add more family members at a member rate: ₹2,499 for 12 months, ₹1,399 for 6 months or ₹749 for 3 months each. 12 months ₹9,999 · 6 months ₹5,499 · 3 months ₹2,999. This is a membership plan, not dental insurance.",
      "link": "/cost-and-payment#membership"
    }
  ],
  "meetDrSahu": {
    "id": "meet-dr-sahu",
    "title": "Meet Dr. Arvind Sahu",
    "credentials": "BDS, MDS (Prosthodontics & Crown & Bridge)",
    "role": "Prosthodontist & Oral Implantologist",
    "quote": "ਹਰ ਮੁਸਕਾਨ ਦੀ ਆਪਣੀ ਇੱਕ ਕਹਾਣੀ ਹੁੰਦੀ ਹੈ, ਅਤੇ ਮੇਰਾ ਮਕਸਦ ਉਸ ਮੁਸਕਾਨ ਨੂੰ ਹੋਰ ਖੂਬਸੂਰਤ ਬਣਾਉਣਾ ਹੈ।"
  }
}
```

For the PDF's "Meet Dr. Sahu" page, take the full bio (intro, education, expertise, approach, philosophy) and the full Punjabi message from `apps/web/src/lib/doctor.ts`, word for word. The Punjabi is Dr. Sahu's own message, not a translation, so never edit or translate it.

## Part 5 — How to build it

### 5A. The 20 cards (1080 × 1080)

Write one HTML template that reads `catalogue.json` and renders each item, then screenshot each one with Chrome (installed at `/Applications/Google Chrome.app`). A small Node script in `guides/redcity-catalogue/build.mjs` is fine. Use no new npm dependencies.

**Service card layout** (all sizes in px):

- **Canvas:** 1080 × 1080, background `#FBF6F4`.
- **Artwork:** the top 1080 × 560, `object-fit: cover; object-position: center 45%`. Nothing is drawn over the artwork except the badge.
- **Badge** (only when `badge` is set): gold pill `#D4AF37` with `#2B0A0F` text, Inter 700 24 px, padding 10 × 22, radius 999. Sits 32 px from the left, overlapping the bottom edge of the artwork by half its height.
- **Text panel:** white `#FFFFFF`, from y = 560 to y = 984, padding 44 px top and 56 px left and right:
  - `name`: Roboto Slab 800, 58 px, line height 1.08, `#1F1718`, at most 2 lines.
  - `line`: Inter 500, 29 px, `#5E5456`, 14 px below the name, at most 2 lines.
  - `price`: Inter 700, 34 px, `#A61C2E`, 20 px below. When the price is "Price after examination", use Inter 600, 28 px, `#5E5456` instead.
  - `priceAlt` (memberships): Inter 500, 22 px, `#5E5456`, under the price.
  - `fine`: Inter 400, 18 px, `#5E5456`, pinned to the bottom of the panel, at most 2 lines.
- **Footer bar:** y = 984 to 1080 (96 px), maroon `#2B0A0F`:
  - left: `redcity-logo.png` 40 px high on a white rounded tile (radius 10, padding 8 × 12)
  - centre: "Dr. Arvind Sahu · MDS (Prosthodontics)", Inter 600, 22 px, white
  - right: "📞 76268 58230", Inter 700, 26 px, `#F2D98A`

If any text doesn't fit, shorten nothing: reduce that card's `name` font size in 2 px steps down to 48 px, and tell me if it still doesn't fit.

**"Meet Dr. Sahu" card layout:**

- **Canvas:** maroon `#2B0A0F`.
- **Portrait:** the real portrait on the right, 420 × 566, radius 24, with a 2 px gold border, vertically centred.
- **Text on the left:**
  - "Meet Dr. Arvind Sahu": Roboto Slab 800, 60 px, white
  - credentials: Inter 600, 24 px, `#F2D98A`
  - role: Inter 500, 26 px, white at 80% opacity
  - Punjabi quote: Noto Sans Gurmukhi 500, 30 px, white, line height 1.5, under a 60 px gold rule
- **Footer bar:** the same as the service cards.

**Render each card:**

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1 --window-size=1080,1080 --virtual-time-budget=8000 \
  --screenshot="guides/redcity-catalogue/cards/<id>.png" "file://$PWD/guides/redcity-catalogue/cards/<id>.html"
sips -s format jpeg -s formatOptions 90 "guides/redcity-catalogue/cards/<id>.png" --out "guides/redcity-catalogue/cards/<id>.jpg"
```

The virtual time budget lets the Google Fonts load first. Delete the `.png` files after converting. Also make `guides/redcity-catalogue/cards.zip` with all 20 JPGs so the clinic phone can download them at once.

### 5B. The PDF catalogue (A4 portrait, 9 pages)

Build `guides/redcity-catalogue/catalogue.html` as 9 `<section>`s, each exactly 210 mm × 297 mm with `@page { size: A4; margin: 0 }`, `page-break-after: always` and `print-color-adjust: exact`. Print it:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --no-pdf-header-footer \
  --virtual-time-budget=8000 --print-to-pdf="guides/redcity-catalogue/RedCity-Dental-Catalogue.pdf" \
  "file://$PWD/guides/redcity-catalogue/catalogue.html"
```

| Page | Content |
|---|---|
| 1. Cover | `ai/catalogue/cover.jpg` across the top half; `redcity-logo-full.png`; title "Treatments, fees & memberships"; clinic name; phone and address. |
| 2. Meet Dr. Sahu | Real portrait (max 6 cm wide); credentials and role; intro, approach and philosophy; education; expertise as a list of chips; the full Punjabi message in Noto Sans Gurmukhi on a blush panel. |
| 3. Start here | Online Photo Review (with the required sentence), then the check-up, cleaning and X-ray fees as a small price table. |
| 4. Replace missing teeth | Dental Implants (with the warranty badge and footnote), Dentures & Bridges, Full Mouth Rehabilitation. |
| 5. Pain & repair | Root Canal Treatment, Crowns (with the price footnote), Emergency Dental Care (with the hospital advice), Laser Dentistry. |
| 6. Smile & children | Veneers, Teeth Whitening, Smile Makeover, Kids' Dentistry. |
| 7. Memberships | One comparison table: 4 plans × 3 terms (3, 6, 12 months), each plan's highlights from `apps/web/src/lib/pricing.ts`, the extra family member prices, and the membership fine print. |
| 8. Our promises | The implant warranty summary (5-year, 10-year or lifetime by option; what's not covered), payment methods and staged payments, and one line each on rescheduling, refunds and plan changes with the link `/policies`. |
| 9. Visit us | Real `clinic-exterior.jpg`, address and landmark, phone and WhatsApp, Google Maps link, languages, "Call or WhatsApp for today's hours". |

On pages 3 to 6, give each treatment its artwork (square, about 45 mm), its name, `description` and price line, with the full link written out in small text under it. Every page has a slim footer:

> RedCity Dental Care & Implant Centre · 47 A/1, South Model Gram, Ludhiana · +91 76268 58230 · Prices as of October 2026. Final cost is confirmed after examination.

### 5C. Update the WhatsApp setup guide (only when I say so)

In `guides/redcity-whatsapp-guide/`:

1. Replace `assets/catalog-<id>.jpg` with the new cards. The 10 ids already match.
2. Add the 9 new items and the 6 collections to the page's `ITEMS` list.
3. Change step 6 so the price field is filled in where `waPrice` has a value.
4. Rebuild `assets/redcity-whatsapp-images.zip`.
5. Replace every form of the old number (`88476 51364`, `88476-51364`, `8847651364`, `918847651364`) with `76268 58230` / `917626858230`.
6. Replace "10-year warranty" with the wording in Part 2.

Show me the page before it's deployed.

## Part 6 — Checks before you finish

Run these from the repository root. Each must print nothing:

```bash
grep -rn -E "88476|8847651364" guides/redcity-catalogue
grep -rn -i -E "\b(best|no\. ?1|guaranteed|painless|100%|cheapest|free|permanent|risk-free)\b" guides/redcity-catalogue --include=*.json --include=*.html
grep -rn "10-year warranty" guides/redcity-catalogue
```

Then check by eye:

- [ ] 20 JPGs in `cards/`, each exactly 1080 × 1080 (`sips -g pixelWidth -g pixelHeight`).
- [ ] No text is cut off, overlapping or hyphenated, and the fonts loaded (Roboto Slab headings, not Times).
- [ ] Every price matches `apps/web/src/lib/pricing.ts`.
- [ ] Every card's artwork matches its treatment, and no artwork contains text, letters or a watermark.
- [ ] The photo review card shows the full required sentence, and the implants card shows the badge and footnote.
- [ ] The PDF has exactly 9 A4 pages, the Punjabi text renders in Gurmukhi (not boxes), and the portrait isn't stretched or blurry at 100% zoom.
- [ ] Every link opens the right page on the live site.

## Part 7 — Where the clinic uses it

- **WhatsApp Business** (Business tools → Catalog):
  - Add each service item with its card as the image, its `name`, its `waPrice` (blank if empty), its `description`, its full link (`site` + `link`) and its `id` as the item code.
  - Create the 6 collections.
  - The "Meet Dr. Sahu" card is for Status and the profile, not the catalogue.
- **Google Business Profile** (Edit products): the same card, name, collection as the category, price and description. Use the "Learn more" button with the item's link. The listing still shows the old number, so update it first.
- **Instagram and WhatsApp Status:** post the cards as they are.
- **Reception:** print the PDF, or send it as a WhatsApp attachment.
