# RedCity ads: ₹10,000 a month, target ₹20,000 of treatment (2x ROAS)

**Check first:** the Dental Council rules restrict dentists' advertising. Dr. Sahu should confirm with the Punjab Dental Council that factual paid ads are allowed before spending. The ads below stay factual (name, degree, service, fee, address), but that does not make them approved.

## The system

Ad → landing page → WhatsApp, call or form → the WhatsApp message carries a **Ref** (RC-G-4821) → clinic logs the Ref in the tracker → visit → treatment value → ROAS.

- Implant ads go to: `https://www.redcitydental.com/lp/dental-implants?utm_source=google&utm_medium=cpc&utm_campaign=implants`
- Check-up ads go to: `https://www.redcitydental.com/lp/dental-check-up?utm_source=google&utm_medium=cpc&utm_campaign=checkup`
- For Meta, use `utm_source=meta&utm_medium=paid_social`.
- Tracker: `guides/redcity-ads/RedCity-Ads-Tracker.xlsx` (copy it to Google Drive; never commit a filled copy).

## Budget (per month)

- Google Search, implants: ₹5,000 (~₹165/day)
- Google Search, check-up: ₹2,000 (~₹65/day)
- Meta (Facebook + Instagram), implants: ₹3,000 (~₹100/day)

## Google Search setup

- Location: 8 km around the clinic, "people in" the area, not "interested in".
- Keywords (phrase match): "dental implants ludhiana", "implant dentist ludhiana", "missing tooth replacement", "dentures ludhiana", "dentist near me", "dental clinic near me", "tooth pain dentist", "root canal ludhiana".
- Negative keywords: free, course, job, jobs, salary, college, admission, BDS, MDS course, equipment, lab, wholesale, pdf.
- Call extension: 76268 58230. Location extension: link the Google Business Profile.
- Headlines: Dental Implants in Ludhiana · Prosthodontist, MDS · Examination Fee ₹300 · Written Estimate First · South Model Gram, Ludhiana · Implant, Bridge or Denture · Book on WhatsApp · Call 76268 58230
- Descriptions: "Implant consultation with Dr. Arvind Sahu, MDS (Prosthodontics). X-ray if needed." · "Your options and a written cost estimate before any treatment starts. Book on WhatsApp."

## Meta setup

- Location: Ludhiana, 10 km around the clinic. Age 35+ for implants.
- Image: the clinic front, or an AI illustration labelled "AI illustration". Not Dr. Sahu's photo.
- Text: "Missing a tooth? Dr. Arvind Sahu, MDS (Prosthodontics), explains implant, bridge and denture options and gives a written estimate before treatment. South Model Gram, Ludhiana. Examination ₹300."
- Button: "Learn more", going to the implant landing page.

## Never in an ad

"Best", "No.1", "painless", "guaranteed", "free", discounts, offers, "limited time", reviews or star ratings, before/after photos, the doctor's photo, patient stories, the lifetime warranty.

## Switch on conversion tracking (Vercel → Settings → Environment Variables, Production)

- `NEXT_PUBLIC_GOOGLE_ADS_ID` = AW-xxxxxxxxx (Google Ads → Goals → Conversions → new "Website" conversion, category "Submit lead form")
- `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` = that conversion's label
- `NEXT_PUBLIC_META_PIXEL_ID` = from Meta Events Manager
- Redeploy. Calls, WhatsApp taps and form sends then count as conversions, and the privacy page updates itself.

## Weekly routine (15 minutes, Monday)

- Type last week's spend into **Weekly spend**.
- Log every new Ref in **Lead log**, and mark visits and treatment value.
- Pause any keyword or ad that spent ₹2,000 with no visit.
- Move the money to whatever brought visits.
- Judge ROAS on 60–90 days: implant value arrives weeks after the enquiry.

## When it's working

The **Summary** tab shows "On target": treatment value ≥ 2 × spend. ₹10,000 spent needs ₹20,000 of treatment started. If the average implant case is worth more than ₹20,000, one implant patient a month from the ads meets the target. Nothing here guarantees that result; the tracker shows whether it is happening.
