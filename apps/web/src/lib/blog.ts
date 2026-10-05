export interface BlogSection {
  heading: string;
  body: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  relatedService?: string;
  sections: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "signs-you-might-need-a-root-canal",
    title: "Signs You Might Need a Root Canal (And What Happens Next)",
    metaDescription:
      "Common signs of tooth pulp infection, and what a root canal appointment actually involves — from a Ludhiana prosthodontist's perspective.",
    relatedService: "root-canal-treatment",
    sections: [
      {
        heading: "Common warning signs",
        body: "Lingering sensitivity to hot or cold, a dull ache that doesn't go away, tenderness when chewing, or swelling near a tooth can all point to an issue with the tooth's inner pulp. None of these on their own confirm you need a root canal — only an exam and X-ray can do that — but they're worth getting checked rather than waiting out.",
      },
      {
        heading: "Why dentists try to save the tooth",
        body: "A root canal removes the infected or inflamed pulp inside a tooth and seals the space, which relieves the pain and lets you keep your natural tooth instead of having it extracted. Keeping the natural tooth generally means better long-term chewing function and less shifting of neighbouring teeth.",
      },
      {
        heading: "What the appointment involves",
        body: "After confirming the diagnosis with an X-ray, the tooth is numbed, the infected pulp is cleaned out, and the canal is shaped and sealed. Many cases are completed in one visit; more complex ones may need two. A crown is often recommended afterward, especially on back teeth, since the tooth becomes more brittle once the pulp is gone.",
      },
      {
        heading: "When to get it checked",
        body: "Tooth pain rarely gets better on its own. If something feels off, it's worth booking an exam early — smaller problems are generally easier and less involved to treat than ones left to progress.",
      },
    ],
  },
  {
    slug: "dental-implants-vs-bridges",
    title: "Dental Implants vs. Bridges: Which Is Right for You?",
    metaDescription:
      "A comparison of dental implants and bridges for replacing a missing tooth — how each works, and what tends to influence the choice.",
    relatedService: "dental-implants",
    sections: [
      {
        heading: "How each option works",
        body: "A dental implant replaces the tooth's root with a titanium post topped with a crown, standing on its own. A bridge instead spans the gap by anchoring a false tooth to the two teeth on either side of it, which need to be shaped down to support it.",
      },
      {
        heading: "What tends to influence the decision",
        body: "Implants don't rely on neighbouring teeth for support, which is often a plus if those teeth are otherwise healthy. Bridges can be a reasonable option when the adjacent teeth already need crowns anyway, or when implant surgery isn't suitable for a particular patient. Bone health, gum condition, and overall health all factor into which option actually applies to you.",
      },
      {
        heading: "Making the decision",
        body: "There isn't a single right answer for everyone — it depends on your bite, bone density, budget, and the condition of the surrounding teeth. An in-person exam is really the only way to know which option fits your case.",
      },
    ],
  },
  {
    slug: "dental-implant-cost-factors",
    title: "What Affects the Cost of Dental Implants?",
    metaDescription:
      "The factors that typically affect dental implant cost — number of implants, materials, and any preparatory treatment needed — explained plainly.",
    relatedService: "dental-implants",
    sections: [
      {
        heading: "Why implant pricing varies so much",
        body: "Implant cost isn't one fixed number — it depends on how many teeth are being replaced, the materials used for the implant and crown, and whether any preparatory work like bone grafting is needed first.",
      },
      {
        heading: "What's usually included",
        body: "A full implant typically includes the diagnostic imaging and planning, the surgical placement of the titanium post, the healing period, and the custom crown fitted on top. Some cases also need additional procedures beforehand if bone density is low.",
      },
      {
        heading: "Getting an accurate estimate",
        body: "Because so much depends on individual anatomy and treatment needs, the only reliable way to get a real number is a consultation and imaging — general price ranges you find online won't reflect your specific case.",
      },
    ],
  },
  {
    slug: "veneers-vs-crowns",
    title: "Veneers vs. Crowns: What's the Difference?",
    metaDescription:
      "Veneers and crowns solve different problems. Here's how they differ, and how a dentist decides which one fits a given tooth.",
    relatedService: "veneers",
    sections: [
      {
        heading: "Coverage and purpose",
        body: "A veneer is a thin shell bonded only to the front surface of a tooth, mainly used for cosmetic changes like shape, spacing, or discoloration. A crown covers the entire tooth and is generally used when there's structural damage or after a root canal.",
      },
      {
        heading: "How much of the tooth is involved",
        body: "Veneers require preparing a thin layer of the front surface. Crowns require reshaping the tooth all the way around, since the crown needs to fit over it completely.",
      },
      {
        heading: "Which one fits your case",
        body: "If the tooth is structurally sound and the concern is purely cosmetic, a veneer is often considered. If there's a crack, large filling, or the tooth is weakened, a crown is generally the more appropriate option. An exam is the only way to know for sure.",
      },
    ],
  },
  {
    slug: "root-canal-aftercare-tips",
    title: "10 Tips for a Smooth Recovery After a Root Canal",
    metaDescription:
      "Practical aftercare tips for the days following root canal treatment, to keep recovery comfortable and protect the treated tooth.",
    relatedService: "root-canal-treatment",
    sections: [
      {
        heading: "In the first 24-48 hours",
        body: "1. Avoid chewing on the treated side until numbness fully wears off, to prevent accidentally biting your cheek or tongue. 2. Stick to soft foods for a day or two. 3. Take any medication exactly as advised. 4. Mild soreness is normal; it should ease within a few days.",
      },
      {
        heading: "Protecting the tooth long-term",
        body: "5. If a crown was recommended, schedule that follow-up — an unprotected root-canal-treated tooth is more prone to cracking. 6. Keep up your regular brushing and flossing routine around the area. 7. Avoid chewing ice or very hard foods on that tooth. 8. Don't skip your check-up visits.",
      },
      {
        heading: "When to call the dentist",
        body: "9. Pain that worsens instead of easing, or swelling that doesn't settle, is worth a call rather than waiting it out. 10. If a temporary filling falls out before your crown appointment, contact the clinic promptly rather than leaving the tooth exposed.",
      },
    ],
  },
  {
    slug: "what-is-laser-dentistry",
    title: "What Is Laser Dentistry, and Is It Right for You?",
    metaDescription:
      "An overview of laser dentistry — what it's typically used for, how it differs from traditional instruments, and how to know if it applies to your treatment.",
    relatedService: "laser-dentistry",
    sections: [
      {
        heading: "The basic idea",
        body: "Laser dentistry uses focused light energy instead of traditional instruments for certain procedures, most often soft-tissue work involving the gums. It's one tool among several a dentist may use, not a replacement for every kind of treatment.",
      },
      {
        heading: "Where it's typically used",
        body: "Laser tools are commonly applied to select gum and soft-tissue procedures, where their precision can mean less disruption to surrounding tissue for the right cases.",
      },
      {
        heading: "Is it right for you?",
        body: "Whether a laser-based approach applies depends on the specific procedure and your individual case — it isn't the right tool for everything. That's a decision made during an in-person evaluation, not something to assume in advance.",
      },
    ],
  },
  {
    slug: "how-to-choose-a-dentist-in-ludhiana",
    title: "How to Choose the Right Dentist in Ludhiana",
    metaDescription:
      "What to actually look for when choosing a dentist in Ludhiana — credentials, communication, and follow-up, not just proximity.",
    sections: [
      {
        heading: "Start with credentials and specialty",
        body: "General dentistry covers a lot of ground, but some treatments — implants, crowns, full-mouth rehabilitation — benefit from a dentist with specific postgraduate training in prosthodontics, the branch focused on restoring and replacing teeth.",
      },
      {
        heading: "How they communicate matters",
        body: "A good sign is whether a clinic explains findings and options clearly, rather than rushing straight to treatment. Ask how much of the review and follow-up is done by the dentist personally versus handed off.",
      },
      {
        heading: "Follow-up is part of the care",
        body: "Dental treatment often isn't a single visit — how a clinic handles follow-up, whether that's a phone call, a message, or a scheduled review, says a lot about the overall standard of care you can expect.",
      },
    ],
  },
  {
    slug: "living-with-dental-implants-long-term",
    title: "Life With Dental Implants: Caring for Them Long-Term",
    metaDescription:
      "How dental implants typically hold up over time, and the everyday habits that help keep them functioning well for years.",
    relatedService: "dental-implants",
    sections: [
      {
        heading: "Daily care",
        body: "Implants don't get cavities, but the gum and bone around them still need care. Regular brushing, flossing (or an interdental brush around the implant), and routine check-ups matter just as much as they do for natural teeth.",
      },
      {
        heading: "What can affect longevity",
        body: "Grinding habits, smoking, and untreated gum disease elsewhere in the mouth can all affect how well an implant holds up over time. Your dentist will flag any of these during routine visits if they're a concern for your case.",
      },
      {
        heading: "Routine monitoring",
        body: "Periodic check-ups let your dentist catch small issues — like early gum inflammation around the implant — before they become bigger ones. Long-term success is generally a combination of the initial placement and consistent aftercare.",
      },
    ],
  },
  {
    slug: "teeth-whitening-myths",
    title: "5 Teeth Whitening Myths That Waste Your Money",
    metaDescription:
      "Lemon juice, charcoal, one-size-fits-all kits — a Ludhiana dentist separates whitening facts from the myths that damage enamel or empty wallets.",
    relatedService: "teeth-whitening",
    sections: [
      {
        heading: "Myth 1: Lemon juice or baking soda whitens teeth",
        body: "Acidic home remedies erode enamel — the very layer that makes teeth look white. Any short-term brightening comes at the cost of thinner, more sensitive teeth that stain faster later.",
      },
      {
        heading: "Myth 2: Charcoal toothpaste is a safe daily whitener",
        body: "Charcoal is abrasive. Used daily, it scrubs away surface stains and enamel together. Whatever whitening effect it has is mechanical scratching, not actual shade change.",
      },
      {
        heading: "Myth 3: All discoloration responds to whitening",
        body: "Whitening agents work on stains within the tooth surface. Discoloration from old fillings, root canal treatment, or certain medications doesn't respond — those cases need veneers, crowns, or internal bleaching. This is why diagnosis comes before treatment.",
      },
      {
        heading: "Myth 4: Stronger gel means better results",
        body: "Higher concentrations without gum protection mean chemical burns, not whiter teeth. In-clinic whitening uses professional strengths precisely because the gums are isolated first.",
      },
      {
        heading: "Myth 5: Whitening results are permanent",
        body: "No whitening lasts forever — tea, coffee, and tobacco all re-stain over time. Realistic expectations, set by a dentist who examines your actual teeth, beat marketing promises every time.",
      },
    ],
  },
  {
    slug: "denture-care-guide",
    title: "How to Care for Your Dentures: A Practical Daily Guide",
    metaDescription:
      "Daily cleaning, overnight storage, and the warning signs of a worn denture — practical denture care advice from a Ludhiana prosthodontist.",
    relatedService: "dentures-bridges",
    sections: [
      {
        heading: "Daily cleaning, done right",
        body: "Rinse dentures after meals and brush them daily with a soft denture brush — not regular toothpaste, which is too abrasive for acrylic. Clean over a folded towel or a basin of water; dentures crack when dropped on hard surfaces.",
      },
      {
        heading: "Overnight care",
        body: "Most dentures should be kept moist overnight — soaked in water or a denture solution — so the material doesn't dry out and warp. Giving your gums a nightly rest from the denture also keeps the tissue healthier.",
      },
      {
        heading: "Don't skip the gums",
        body: "Brush your gums, tongue, and palate with a soft brush every morning before wearing the denture. Healthy tissue underneath is what makes a denture comfortable to wear.",
      },
      {
        heading: "When to see your dentist",
        body: "A denture that rocks, rubs sore spots, or suddenly fits loosely needs professional adjustment — never home-fix it with adhesive layering or filing. Bone and gums change over the years, and dentures need periodic relining to match.",
      },
    ],
  },
  {
    slug: "dental-emergency-first-aid",
    title: "Dental Emergency First Aid: What to Do Before You Reach the Clinic",
    metaDescription:
      "Knocked-out tooth, severe toothache, broken tooth, swelling — step-by-step first aid for the minutes before you reach a dentist in Ludhiana.",
    relatedService: "emergency-dental-care",
    sections: [
      {
        heading: "Knocked-out tooth: minutes matter",
        body: "Pick the tooth up by the crown, never the root. If dirty, rinse gently for a few seconds — don't scrub. Keep it moist: back in its socket if possible, otherwise in milk or inside your cheek. Then get to a dentist immediately; reimplantation works best within the first hour.",
      },
      {
        heading: "Severe toothache",
        body: "Rinse with warm salt water and use dental floss to clear anything lodged between teeth. A cold compress on the cheek helps swelling. Don't place aspirin against the gum — it burns the tissue. Pain with swelling or fever needs same-day attention.",
      },
      {
        heading: "Broken or chipped tooth",
        body: "Save every fragment in milk or water. Rinse your mouth with warm water, and cover any sharp edge with sugar-free chewing gum or dental wax if it's cutting your tongue. Even painless chips deserve a check — cracks deepen.",
      },
      {
        heading: "Bleeding that won't stop",
        body: "Press a clean, damp gauze on the site with firm, continuous pressure for 15 minutes without peeking. If bleeding continues beyond that, call the clinic — and keep the head elevated in the meantime.",
      },
      {
        heading: "The one rule for every emergency",
        body: "Call before you travel. A quick phone call means the clinic can prepare and can talk you through the right first aid for your exact situation on the way in.",
      },
    ],
  },
  {
    slug: "childs-first-dental-visit",
    title: "Your Child's First Dental Visit: How to Prepare",
    metaDescription:
      "When to schedule a child's first dental visit, what actually happens, and how parents in Ludhiana can set kids up for a lifetime of easy check-ups.",
    relatedService: "paediatric-dentistry",
    sections: [
      {
        heading: "When to go",
        body: "The general guidance is within six months of the first tooth, or by the first birthday. That sounds early, but early visits are short and simple — and they catch bottle-related decay while it's still reversible.",
      },
      {
        heading: "What actually happens",
        body: "The first visit is mostly familiarisation: a lap exam or a short ride in the chair, a look at the teeth and gums, and guidance for parents on brushing, fluoride, and feeding habits. No drills, no surprises.",
      },
      {
        heading: "How to prepare your child",
        body: "Keep it casual — 'the doctor is going to count your teeth' works better than lengthy reassurance, which signals there's something to fear. Avoid passing on your own dental anxieties, and never use the dentist as a threat for not brushing.",
      },
      {
        heading: "Building the habit",
        body: "Regular check-ups every six months from early childhood make dental visits ordinary rather than scary. Kids who grow up with routine visits become adults who don't postpone care until something hurts.",
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
