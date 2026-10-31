# RedCity ads: ₹10,000 a month, target ₹20,000 of treatment (2x ROAS)

The version to share with Dr. Sahu is `RedCity-Ads-Plan-Dr-Sahu.docx` in this folder.

**Check first:** the Dental Council rules restrict dentists' advertising. Dr. Sahu should confirm with the Punjab State Dental Council that factual paid ads are allowed before spending. The ads below stay factual (name, degree, service, fee, address), but that does not make them approved.

## The system

Ad → landing page → WhatsApp, call or form → the WhatsApp message carries a **Ref** (RC-G-4821) → clinic logs the Ref in the tracker → visit → treatment value → ROAS.

- Implant ads go to: `https://www.redcitydental.com/lp/dental-implants?utm_source=google&utm_medium=cpc&utm_campaign=implants`
- Check-up ads go to: `https://www.redcitydental.com/lp/dental-check-up?utm_source=google&utm_medium=cpc&utm_campaign=checkup`
- For Meta, use `utm_source=meta&utm_medium=paid_social`.
- Tracker: `guides/redcity-ads/RedCity-Ads-Tracker.xlsx` (copy it to Google Drive; never commit a filled copy).

## Budget (per month)

- Google Search + Maps: ₹7,000 (~₹230/day). Implants ₹4,000, clinic nearby ₹1,500, tooth pain/root canal ₹1,500.
- Meta (Facebook + Instagram): ₹3,000 (~₹100/day), educational videos only.
- Raise the total to ₹25,000 only after 2 months on target.
- We help free: no fee, no commission. Ad spend is billed to the clinic's own card on its own Google Ads and Meta accounts, and only if Dr. Sahu decides to run ads. Nobody is ever paid per lead or per patient.

## Google Search setup

- Campaign type: Search with a Location asset (shows the Maps pin). Not a Smart campaign, which writes its own headlines.
- Location: 3–6 km around the clinic, "people in" the area. Model Town, Sarabha Nagar and Civil Lines for implants; Dugri and BRS Nagar for check-ups and root canal; raise mobile bids along Ferozepur Road and Pakhowal Road.
- Ad groups (phrase match):
  - Clinic nearby: "dental clinic near me", "dentist model town ludhiana", "dentist in sarabha nagar" → check-up page
  - Tooth pain and root canal: "root canal treatment ludhiana", "toothache dentist", "wisdom tooth extraction" → check-up page
  - Implants and crowns: "dental implants ludhiana", "implant dentist", "missing tooth replacement", "zirconia crown" → implant page
- NRI families, October to March: add "dental implant consultation ludhiana". No same-day implant claims.
- Negative keywords: free, cheapest, discount, offer, home remedy, government hospital, course, job, jobs, salary, college, admission, BDS, equipment, lab, wholesale, pdf.
- Call extension: 76268 58230. Location extension: link the Google Business Profile.
- Headlines: RedCity Dental, Model Gram · Dr. Arvind Sahu, MDS · Reg. No. 20407A · Dental Implants in Ludhiana · Prosthodontist, MDS · Examination Fee ₹300 · Written Estimate First · South Model Gram, Ludhiana · Implant, Bridge or Denture · Book on WhatsApp · Call 76268 58230
- Descriptions: "Implant consultation with Dr. Arvind Sahu, MDS (Prosthodontics). X-ray if needed." · "Your options and a written cost estimate before any treatment starts. Book on WhatsApp."

## Meta setup: education only

- 45–60 second Reels in Punjabi, Hindi or English, boosted to 5 km around the clinic.
- Topics: filling vs root canal · gum care with diabetes · a knocked-out adult tooth in the first hour.
- No "book now" or offer overlays, no surgery footage, not promotional shots of Dr. Sahu.
- The page bio holds the address, Reg. No. 20407A and the booking link. Profile visits that become WhatsApp chats still carry a Ref via the website.

## Never in an ad

"Best", "No.1", "painless", "guaranteed", "free", discounts, offers, "limited time", reviews or star ratings, before/after photos, the doctor's photo, patient stories, the lifetime warranty.

## Switch on conversion tracking (Vercel → Settings → Environment Variables, Production)

- `NEXT_PUBLIC_GOOGLE_ADS_ID` = AW-xxxxxxxxx (Google Ads → Goals → Conversions → new "Website" conversion, category "Submit lead form")
- `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` = that conversion's label
- `NEXT_PUBLIC_META_PIXEL_ID` = from Meta Events Manager
- Redeploy. Calls, WhatsApp taps and form sends then count as conversions, and the privacy page updates itself.
- Also track in Google Ads: Maps direction requests (Location asset) and calls from ads (call reporting on).

## Weekly routine (15 minutes, Monday)

- Type last week's spend into **Weekly spend**.
- Log every new Ref in **Lead log**, and mark visits and treatment value.
- Pause any keyword or ad that spent ₹2,000 with no visit.
- Move the money to whatever brought visits.
- Judge ROAS on 60–90 days: implant value arrives weeks after the enquiry.

## When it's working

The **Summary** tab shows "On target": treatment value ≥ 2 × spend. ₹10,000 spent needs ₹20,000 of treatment started. If the average implant case is worth more than ₹20,000, one implant patient a month from the ads meets the target. Nothing here guarantees that result; the tracker shows whether it is happening.
