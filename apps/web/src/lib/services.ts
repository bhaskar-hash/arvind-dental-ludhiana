import { business } from "./business";

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface LabeledPoint {
  label: string;
  description: string;
}

export interface ComparisonTable {
  columns: string[];
  rows: { label: string; values: string[] }[];
  footnote?: string;
}

export interface TitledText {
  title: string;
  body: string;
}

export interface Service {
  slug: string;
  name: string;
  /** Title for search results and browser tabs, when it should differ from `name`. */
  metaTitle?: string;
  shortName: string;
  metaDescription: string;
  intro: string;
  /**
   * Kept for reference only: the practice decided the site has no "What to
   * expect" content, so treatment pages never render this.
   */
  whatToExpect: { title: string; body: string }[];
  faqs: ServiceFaq[];

  /** Patient-centred hero: the concern it answers, and a plain-words headline. */
  eyebrow?: string;
  headline?: string;
  /** "Could this be right for you?" checklist. */
  forYou?: { heading: string; points: string[]; note?: string };
  /** How the treatment is built (implants: crown, abutment, fixture). */
  parts?: { heading: string; items: TitledText[] };
  options?: { heading: string; items: TitledText[] };
  comparisonHeading?: string;
  costFactors?: { lead: string; items: TitledText[] };

  // Optional richer content blocks, populated where real source content exists.
  featureList?: string[];
  warrantyHeadline?: string;
  warrantySubhead?: string;
  warrantyFinePrint?: string;

  reasonsHeading?: string;
  reasons?: LabeledPoint[];
  callout?: string;
  benefits?: string[];
  trustPoints?: string[];
  closingLine?: string;

  comparisonTable?: ComparisonTable;
}

export const services: Service[] = [
  {
    slug: "dental-implants",
    name: "Dental Implants in Ludhiana",
    metaTitle: "Dental Implants in Ludhiana by a Prosthodontist",
    shortName: "Dental Implants",
    metaDescription:
      "Dental implants in Ludhiana with Dr. Arvind Sahu, MDS (Prosthodontics). A 5-year, 10-year or lifetime warranty on the implant, depending on your option.",
    intro:
      "A dental implant replaces a missing tooth's root with a titanium post, topped with a custom crown. Because prosthodontics — the restoration and replacement of teeth — is Dr. Sahu's specialty area of training, implant planning at RedCity Dental Care covers the full arc from the initial scan to the final crown.",
    eyebrow: "For missing teeth",
    headline: "Missing a tooth? Replace it with a fixed, natural-looking implant.",
    forYou: {
      heading: "Could an implant be right for you?",
      points: [
        "You've lost a tooth and would rather not wear a removable denture.",
        "Your bridge or denture feels loose or uncomfortable.",
        "You'd prefer not to have healthy neighbouring teeth shaped for a bridge.",
        "A gap is affecting how you chew, speak or smile.",
      ],
      note: "Whether an implant suits you depends on your bone, gums and general health. Dr. Sahu checks this in person before recommending anything.",
    },
    parts: {
      heading: "Three parts that work together like a natural tooth",
      items: [
        { title: "The crown", body: "The visible tooth, custom-made to match the shape and shade of your own teeth and adjusted for your bite." },
        { title: "The abutment", body: "A small connector that joins the crown to the implant, sitting just at the gum line." },
        { title: "The implant fixture", body: "A titanium post in the jawbone that takes the place of the root. This is the part your implant warranty covers." },
      ],
    },
    options: {
      heading: "One tooth, several, or a full arch",
      items: [
        { title: "Single-tooth implant", body: "One implant and crown replace one missing tooth, without touching the teeth beside it." },
        { title: "Implant-supported bridge", body: "Two or more implants hold a fixed bridge to replace several missing teeth in a row." },
        { title: "Implant-supported overdenture", body: "A full denture that clips onto implants, so it stays firmly in place when you eat and talk." },
      ],
    },
    comparisonHeading: "Implant, bridge or denture?",
    comparisonTable: {
      columns: ["", "Implant", "Bridge", "Denture"],
      rows: [
        { label: "Fixed or removable", values: ["Fixed", "Fixed", "Removable"] },
        { label: "Neighbouring teeth", values: ["Left untouched", "Shaped to hold the bridge", "Left untouched"] },
        { label: "When you chew", values: ["Closest to a natural tooth", "Stable", "Can move unless implant-supported"] },
        { label: "Daily care", values: ["Brush and floss like your own teeth", "Clean under the bridge", "Remove and clean daily"] },
      ],
    },
    costFactors: {
      lead: "Implant cost isn't one fixed number. The only reliable way to know yours is an examination and imaging, and Dr. Sahu explains the full cost before anything begins.",
      items: [
        { title: "How many teeth", body: "One implant, several, or a full arch." },
        { title: "Materials", body: "The implant system and the crown you choose." },
        { title: "Preparation needed", body: "For example, bone grafting if bone density is low." },
        { title: "Imaging & planning", body: "The scans used to plan the implant's exact position." },
      ],
    },
    warrantyHeadline: "Up to Lifetime Warranty* on Dental Implants",
    warrantySubhead: "We Stand by Our Quality. Always.",
    warrantyFinePrint:
      "*5-year, 10-year or lifetime warranty depending on the implant option. Breakage and failure from poor hygiene are not covered.",
    featureList: [
      "Fixed, natural-looking replacement teeth",
      "Planned by a prosthodontist",
      "Local anaesthesia for comfort during treatment",
      "Every option and fee explained first",
      "Follow-up care and regular check-ups",
    ],
    whatToExpect: [
      {
        title: "Assessment and planning",
        body: "A clinical exam and imaging to check bone density and plan implant position before any surgery is scheduled.",
      },
      {
        title: "Implant placement",
        body: "The titanium post is placed under local anaesthesia. Healing time before the crown stage varies by patient and site.",
      },
      {
        title: "Crown fitting",
        body: "Once the implant has integrated with the bone, a custom crown is fitted and adjusted for bite and appearance.",
      },
    ],
    faqs: [
      {
        question: "How long does the implant process take?",
        answer:
          "Timelines vary by case — bone healing time, number of implants, and whether any preparatory work is needed all affect the schedule. Dr. Sahu outlines an individual timeline during the planning visit.",
      },
      {
        question: "Is getting a dental implant painful?",
        answer:
          "The placement procedure is done under local anaesthesia. Most patients describe the recovery as similar to a tooth extraction, managed with routine aftercare.",
      },
      {
        question: "Who is a candidate for dental implants?",
        answer:
          "Candidacy depends on bone health, gum condition, and overall health, which is why an in-person assessment comes before any treatment plan.",
      },
      {
        question: "Is there a warranty on dental implants?",
        answer:
          "Yes. Depending on the implant option you choose, your implant carries a 5-year, 10-year or lifetime warranty against implant failure. Breakage, and failure caused by poor oral hygiene, are not covered. Your warranty is written on your treatment plan.",
      },
    ],
  },
  {
    slug: "root-canal-treatment",
    name: "Root Canal Treatment (RCT) in Ludhiana",
    shortName: "Root Canal Treatment",
    eyebrow: "For tooth pain",
    headline: "Tooth pain? Find the real cause before choosing a root canal.",
    metaDescription:
      "Every tooth pain does not require RCT. Right diagnosis, right treatment — root canal treatment in Ludhiana at RedCity Dental Care & Implant Centre.",
    intro:
      "Root canal treatment removes infected or inflamed pulp from inside a tooth, then cleans and seals the space — relieving pain and keeping the natural tooth in place rather than extracting it. But not every toothache means you need one.",
    reasonsHeading: "Tooth pain can happen due to many reasons",
    reasons: [
      {
        label: "Cavities",
        description: "Early decay causes pain. Filling can solve the problem.",
      },
      {
        label: "Gum Problems",
        description:
          "Swollen or infected gums can cause pain. Treat the gums, not the nerve.",
      },
      {
        label: "Sensitive Teeth",
        description:
          "Hot, cold, sweet or acidic foods can cause temporary pain. It's not always the nerve.",
      },
      {
        label: "Teeth Grinding",
        description:
          "Clenching or grinding can cause pain in teeth and jaw.",
      },
      {
        label: "Cracked Tooth",
        description: "Small cracks can cause pain. Not every crack means RCT.",
      },
      {
        label: "Other Causes",
        description:
          "Sinus issues, referred pain, or wisdom teeth can also cause tooth pain.",
      },
    ],
    callout:
      "RCT is needed only when the nerve is irreversibly inflamed or infected. Unnecessary RCT can weaken the tooth and is not always the answer. Let's treat wisely. Let's save natural teeth.",
    benefits: [
      "Strong & long lasting",
      "Better function & comfort",
      "Cost effective",
      "Avoids unnecessary treatment",
      "Maintains natural smile",
    ],
    trustPoints: [
      "Thorough examination",
      "Accurate diagnosis",
      "Personalized treatment plan",
      "A plan agreed with you before treatment",
    ],
    closingLine: "Your Smile, Our Responsibility.",
    whatToExpect: [
      {
        title: "Diagnosis",
        body: "An exam and X-ray confirm whether the pulp is affected and whether root canal treatment is the appropriate next step.",
      },
      {
        title: "Cleaning and shaping",
        body: "The infected pulp is removed and the canal is cleaned and shaped, typically under local anaesthesia.",
      },
      {
        title: "Sealing and crown",
        body: "The cleaned canal is sealed, and a crown is usually recommended afterward to protect the tooth long-term.",
      },
    ],
    faqs: [
      {
        question: "Does every tooth pain mean I need a root canal?",
        answer:
          "No. Cavities, gum problems, sensitivity, grinding, small cracks, and even sinus issues can all cause tooth pain without needing RCT. An accurate diagnosis comes first, always.",
      },
      {
        question: "Does a root canal hurt?",
        answer:
          "The procedure itself is done under local anaesthesia, so patients typically feel pressure rather than pain during treatment. Some soreness afterward is normal and manageable.",
      },
      {
        question: "How many visits does root canal treatment take?",
        answer:
          "This depends on the tooth and the extent of infection — some cases are completed in one visit, others need two.",
      },
      {
        question: "Will I need a crown after a root canal?",
        answer:
          "Most root-canal-treated teeth, especially back teeth, are recommended to get a crown afterward since the tooth structure is more brittle once the pulp is removed.",
      },
    ],
  },
  {
    slug: "veneers",
    name: "Dental Veneers in Ludhiana",
    shortName: "Veneers",
    eyebrow: "For a better smile",
    headline: "Veneers that improve the shape, spacing or colour of your teeth.",
    metaDescription:
      "Custom dental veneers in Ludhiana — thin shells bonded to the front of teeth to address shape, spacing, or discoloration, planned by Dr. Arvind Sahu.",
    intro:
      "Veneers are thin custom shells bonded to the front surface of a tooth, used to address shape, spacing, or discoloration that other options don't fully resolve.",
    closingLine: "Stronger. Natural. Beautiful. Smile with Confidence!",
    whatToExpect: [
      {
        title: "Consultation and planning",
        body: "Dr. Sahu reviews your teeth and goals to determine whether veneers, or another restoration, best fit your case.",
      },
      {
        title: "Preparation and impressions",
        body: "A small amount of enamel is typically prepared, and impressions are taken to have the veneers custom-made.",
      },
      {
        title: "Bonding and fitting",
        body: "Veneers are checked for fit and shade, then bonded in place and adjusted for a comfortable bite.",
      },
    ],
    faqs: [
      {
        question: "How long do veneers last?",
        answer:
          "Longevity depends on material, bite habits, and care. Dr. Sahu discusses expected maintenance for your specific case during planning.",
      },
      {
        question: "Are veneers reversible?",
        answer:
          "Traditional veneers require removing a thin layer of enamel, which makes the process not fully reversible — this is covered in detail during your consultation.",
      },
      {
        question: "Can veneers fix crooked teeth?",
        answer:
          "Veneers can improve the appearance of minor spacing or alignment issues, but significant misalignment is usually better addressed with orthodontic treatment first.",
      },
      {
        question: "Veneers or a crown — which do I need?",
        answer:
          "Veneers cover only the front surface and suit cosmetic changes on structurally sound teeth. If the tooth has more significant damage, a crown is usually the better fit — see our crowns page for a full material comparison.",
      },
    ],
  },
  {
    slug: "crowns",
    name: "Dental Crowns in Ludhiana — Zirconia & PFM",
    shortName: "Crowns",
    eyebrow: "For damaged teeth",
    headline: "Crowns that protect a weak tooth and look like your own.",
    comparisonHeading: "Zirconia or PFM crown?",
    metaDescription:
      "Zirconia vs PFM dental crowns in Ludhiana — compare strength, aesthetics, and cost at RedCity Dental Care & Implant Centre.",
    intro:
      "A dental crown is a custom cap placed over a damaged, weakened, or root-canal-treated tooth to restore its strength, shape, and function. The two most common materials — Zirconia and PFM (porcelain-fused-to-metal) — trade off differently on strength, looks, and cost.",
    comparisonTable: {
      columns: ["", "Zirconia Crown", "PFM Crown"],
      rows: [
        {
          label: "Composition",
          values: ["100% metal-free", "Metal base with porcelain"],
        },
        {
          label: "Strength",
          values: [
            "Exceptional — highly durable & fracture resistant",
            "Good — metal base provides durability",
          ],
        },
        {
          label: "Aesthetics",
          values: [
            "Natural translucency, similar to a real tooth",
            "Good — tooth-colored porcelain outside",
          ],
        },
        {
          label: "Biocompatibility",
          values: [
            "Gentle on gums, safe for the body",
            "Contains metal alloy inside",
          ],
        },
        {
          label: "Stain resistance",
          values: [
            "Excellent color stability, long-lasting shine",
            "Prone to staining — metal margin may show over time",
          ],
        },
        {
          label: "Usually used for",
          values: ["Front & back teeth", "Mainly back teeth"],
        },
        {
          label: "Starting price",
          values: ["₹4,000 per tooth*", "₹2,000 per tooth*"],
        },
      ],
      footnote: "*Final treatment cost may vary depending on clinical requirements.",
    },
    closingLine: "Stronger. Natural. Beautiful. Smile with Confidence!",
    whatToExpect: [
      {
        title: "Assessment",
        body: "Dr. Sahu examines the tooth to confirm a crown is the right restoration and checks for any underlying issues first.",
      },
      {
        title: "Preparation and impression",
        body: "The tooth is shaped to hold the crown, and an impression is taken so the crown can be custom-made to fit.",
      },
      {
        title: "Fitting",
        body: "The finished crown is checked for fit, bite, and appearance before being permanently cemented in place.",
      },
    ],
    faqs: [
      {
        question: "Zirconia or PFM — which crown should I choose?",
        answer:
          "Zirconia is metal-free, more stain-resistant, and looks more natural, which is why it's often recommended for front teeth. PFM costs less and remains a solid, durable option, particularly for back teeth. Dr. Sahu can help you weigh the trade-offs for your specific tooth.",
      },
      {
        question: "How long does a crown last?",
        answer:
          "Lifespan varies with material and daily wear, which Dr. Sahu discusses when recommending a crown type for your tooth.",
      },
      {
        question: "Does getting a crown hurt?",
        answer:
          "The preparation is done under local anaesthesia, so the procedure itself shouldn't be painful. Some sensitivity afterward is normal.",
      },
      {
        question: "What's the difference between a crown and a veneer?",
        answer:
          "A crown covers the entire tooth and is generally used for structural damage, while a veneer covers only the front surface and is generally used for cosmetic changes.",
      },
    ],
  },
  {
    slug: "laser-dentistry",
    name: "Laser Dentistry in Ludhiana",
    shortName: "Laser Dentistry",
    eyebrow: "For gum care",
    headline: "Laser dentistry for precise, minimally invasive gum treatment.",
    metaDescription:
      "Laser dentistry in Ludhiana at RedCity Dental Care — precise, minimally invasive treatment for select gum and soft-tissue procedures.",
    intro:
      "Laser dentistry uses focused light energy for select procedures — often soft-tissue work — as an alternative to traditional instruments, aiming for precision and a more comfortable recovery where appropriate.",
    whatToExpect: [
      {
        title: "Evaluation",
        body: "Dr. Sahu determines whether a laser-based approach is suitable for your specific procedure.",
      },
      {
        title: "Treatment",
        body: "The relevant area is treated with the laser under appropriate anaesthesia when needed.",
      },
      {
        title: "Recovery",
        body: "Recovery specifics depend on the procedure performed and are discussed as part of your treatment plan.",
      },
    ],
    faqs: [
      {
        question: "Is laser dentistry painful?",
        answer:
          "Many laser-based soft-tissue procedures involve less discomfort than traditional instruments, though this varies by procedure and patient.",
      },
      {
        question: "What procedures use laser dentistry?",
        answer:
          "Laser tools are commonly used for select gum and soft-tissue procedures. Dr. Sahu will advise if a laser-based approach applies to your treatment.",
      },
      {
        question: "Is laser dentistry safe?",
        answer:
          "When used for appropriate cases by a trained clinician, laser dentistry is a well-established option in modern dental practice.",
      },
    ],
  },
  {
    slug: "teeth-whitening",
    name: "Teeth Whitening in Ludhiana",
    shortName: "Teeth Whitening",
    eyebrow: "For a brighter smile",
    headline: "Teeth whitening, supervised by your dentist.",
    metaDescription:
      "Professional teeth whitening in Ludhiana at RedCity Dental Care — dentist-supervised brightening, with a check first that whitening suits your teeth.",
    intro:
      "Professional teeth whitening lightens stains and discoloration under a dentist's supervision — a safer, more controlled approach than over-the-counter kits, with the shade matched to look natural rather than artificial.",
    whatToExpect: [
      {
        title: "Shade assessment",
        body: "Dr. Sahu checks the cause of the discoloration first — surface stains, ageing, or something internal — since that determines whether whitening will actually help.",
      },
      {
        title: "In-clinic whitening",
        body: "A professional-strength whitening agent is applied with your gums protected, typically completed in a single visit.",
      },
      {
        title: "Aftercare guidance",
        body: "You'll get practical advice on foods, drinks, and habits that affect how long the brighter shade lasts.",
      },
    ],
    faqs: [
      {
        question: "Is teeth whitening safe for enamel?",
        answer:
          "Dentist-supervised whitening uses controlled concentrations with gum protection, which is precisely why in-clinic treatment is safer than unsupervised home kits. Suitability is confirmed during your assessment.",
      },
      {
        question: "How long do whitening results last?",
        answer:
          "It varies with diet and habits — tea, coffee, and tobacco shorten the result. Most patients maintain their shade for months to a couple of years with sensible care.",
      },
      {
        question: "Why didn't over-the-counter whitening work for me?",
        answer:
          "Not all discoloration responds to surface whitening — internal staining or restorations need a different approach, which is what a proper diagnosis identifies before you spend on the wrong treatment.",
      },
    ],
  },
  {
    slug: "dentures-bridges",
    name: "Dentures & Bridges in Ludhiana",
    shortName: "Dentures & Bridges",
    eyebrow: "For missing teeth",
    headline: "Dentures and bridges that fit comfortably and look natural.",
    metaDescription:
      "Custom dentures and bridges in Ludhiana by Dr. Arvind Sahu, MDS (Prosthodontics) — comfortable, natural-looking replacement for missing teeth.",
    intro:
      "Dentures and bridges replace missing teeth without surgery — a bridge anchors a false tooth to neighbouring teeth, while dentures replace several or all teeth with a removable custom fit. Designing them well is exactly what prosthodontics training is for.",
    whatToExpect: [
      {
        title: "Assessment and impressions",
        body: "Dr. Sahu evaluates your bite, gums, and remaining teeth, then takes precise impressions for a custom fit.",
      },
      {
        title: "Custom fabrication",
        body: "Your denture or bridge is custom-made to match your bite, facial structure, and natural tooth shade.",
      },
      {
        title: "Fitting and adjustment",
        body: "The fit is checked and refined — comfort adjustments in the first weeks are a normal part of the process.",
      },
    ],
    faqs: [
      {
        question: "Should I get a denture, bridge, or implant?",
        answer:
          "It depends on how many teeth are missing, the health of neighbouring teeth, bone condition, and budget. As a prosthodontist, Dr. Sahu plans across all three options rather than defaulting to one.",
      },
      {
        question: "Will dentures look natural?",
        answer:
          "Well-made dentures are matched to your facial structure and natural tooth shade. The goal is that no one can tell — that's the standard custom fabrication aims for.",
      },
      {
        question: "How long do bridges last?",
        answer:
          "With good hygiene and regular check-ups, bridges commonly last many years. Longevity depends on the health of the supporting teeth, which is monitored at routine visits.",
      },
    ],
  },
  {
    slug: "full-mouth-rehabilitation",
    name: "Full Mouth Rehabilitation in Ludhiana",
    metaTitle: "Full Mouth Rehabilitation in Ludhiana by a Prosthodontist",
    shortName: "Full Mouth Rehabilitation",
    eyebrow: "For many worn, broken or missing teeth",
    headline: "One plan to rebuild your whole mouth, in stages you can follow.",
    metaDescription:
      "Full mouth rehabilitation in Ludhiana by Dr. Arvind Sahu, MDS (Prosthodontics): one staged plan for many worn, broken or missing teeth, with crowns, bridges, implants or dentures.",
    intro:
      "Full mouth rehabilitation means restoring most or all of the teeth in both jaws with one coordinated plan, instead of fixing one tooth at a time. It is used when teeth are badly worn, broken, decayed or missing across the mouth, and it usually combines several treatments: crowns, bridges, implants, dentures, root canals and gum care. Planning the bite as a whole is the core of prosthodontics, Dr. Sahu's postgraduate specialty.",
    forYou: {
      heading: "Could this be right for you?",
      points: [
        "Many teeth are worn down, for example from grinding or acid erosion, and your bite feels short",
        "Several teeth are broken, heavily filled or missing in both jaws",
        "Your current dentures or bridges no longer fit or function well",
        "Chewing is uncomfortable, or your jaw muscles ache",
        "You want to understand every option before committing to treatment",
      ],
      note: "Only an examination with X-rays can confirm whether you need a full plan or a few targeted treatments.",
    },
    parts: {
      heading: "How a full mouth plan usually runs",
      items: [
        {
          title: "Examination and records",
          body: "A full check of teeth, gums, jaw joints and bite, with X-rays, photographs and models of your teeth.",
        },
        {
          title: "Treatment plan and estimate",
          body: "A written plan with the stages, options at each stage and the cost, explained before anything starts.",
        },
        {
          title: "Make the mouth healthy",
          body: "Gum treatment, fillings, root canals or extractions come first, so the final work is built on a stable base.",
        },
        {
          title: "Test the new bite",
          body: "Where the bite height or shape is changing, temporary crowns or a trial appliance let you try it before the final work is made.",
        },
        {
          title: "Final restorations",
          body: "Crowns, bridges, implants or dentures are completed in planned sections, usually one jaw or one side at a time.",
        },
        {
          title: "Maintenance",
          body: "Regular reviews and cleaning, and often a night guard, help protect the finished work.",
        },
      ],
    },
    whatToExpect: [],
    faqs: [
      {
        question: "What is full mouth rehabilitation?",
        answer:
          "It is a coordinated plan to restore most or all of the teeth in both jaws, combining treatments such as crowns, bridges, implants, dentures and root canals, with the bite planned as a whole.",
      },
      {
        question: "How long does full mouth rehabilitation take?",
        answer:
          "It depends on the treatments involved. A plan using crowns and bridges on your own teeth often runs over several weeks to a few months. Plans with implants take longer, because implants need time to heal into the bone before the final teeth are fitted. Your written plan gives your own timeline.",
      },
      {
        question: "How many visits will I need?",
        answer:
          "Several, spread across the stages: records and planning, preparation, trial of the new bite, and fitting the final work. The plan sets out how many visits each stage needs, which helps if you are travelling from outside Ludhiana or from abroad.",
      },
      {
        question: "How much does full mouth rehabilitation cost?",
        answer:
          "There is no single price, because each plan combines different treatments. The cost depends on how many teeth need crowns, whether implants are used, and the materials chosen. You receive an itemised written estimate after the examination, before any treatment begins.",
      },
      {
        question: "Is it done in one sitting?",
        answer:
          "No. It is done in planned stages so each step can be checked, and so you can get used to changes in your bite gradually.",
      },
    ],
  },
  {
    slug: "emergency-dental-care",
    name: "Emergency Dentist in Ludhiana",
    shortName: "Emergency Care",
    eyebrow: "Need help today?",
    headline: "Severe pain or a broken tooth? Call us first.",
    metaDescription:
      `Dental emergency in Ludhiana? Severe toothache, broken tooth, swelling or a knocked-out tooth: call RedCity Dental Care on ${business.telephoneDisplay}.`,
    intro:
      "Severe toothache, a broken or knocked-out tooth, uncontrolled bleeding, or facial swelling — dental emergencies need prompt attention, and acting quickly often decides whether a tooth can be saved. Call us first; we'll tell you what to do right away.",
    whatToExpect: [
      {
        title: "Call ahead",
        body: "Phone the clinic so we can prepare and give you immediate first-aid guidance for your specific situation.",
      },
      {
        title: "Urgent assessment",
        body: "Pain relief and stabilising the problem come first, followed by an exam and X-ray to see what's actually going on.",
      },
      {
        title: "Treatment plan",
        body: "Some emergencies are fully resolved on the spot; others are stabilised with a definitive treatment planned once the urgent issue is controlled.",
      },
    ],
    faqs: [
      {
        question: "What should I do if a tooth gets knocked out?",
        answer:
          "Hold it by the crown (not the root), rinse gently without scrubbing, and keep it moist — in milk or inside your cheek — while getting to a dentist as fast as possible. Time matters enormously for reimplantation.",
      },
      {
        question: "Is a severe toothache an emergency?",
        answer:
          "Pain that keeps you awake, comes with swelling, or comes with fever should be seen promptly — these can signal an infection that gets harder to treat with delay.",
      },
      {
        question: "What if I break a tooth eating?",
        answer:
          "Save any fragments, rinse with warm water, and call the clinic. Even a painless chip is worth checking, since cracks can deepen if left alone.",
      },
    ],
  },
  {
    slug: "paediatric-dentistry",
    name: "Paediatric Dentistry in Ludhiana",
    shortName: "Kids' Dentistry",
    eyebrow: "For children",
    headline: "Gentle dentistry that helps children feel at ease.",
    metaDescription:
      "Gentle paediatric dentistry in Ludhiana — check-ups, fillings, sealants, and positive first dental visits for kids at RedCity Dental Care.",
    intro:
      "A child's early dental visits shape how they feel about dentists for life. Our paediatric care focuses on gentle, unhurried appointments — check-ups, fillings, and sealants — that build trust rather than fear.",
    whatToExpect: [
      {
        title: "A gentle first visit",
        body: "The first appointment is kept light: a look around, a simple check-up, and letting your child get comfortable with the chair and the doctor.",
      },
      {
        title: "Prevention first",
        body: "Cleanings, fluoride guidance, and sealants on the chewing surfaces of back teeth help stop cavities before they start.",
      },
      {
        title: "Treatment when needed",
        body: "If a filling or other treatment is needed, it's done at the child's pace, with parents involved in every decision.",
      },
    ],
    faqs: [
      {
        question: "When should my child first see a dentist?",
        answer:
          "The general guidance is within six months of the first tooth appearing, or by the first birthday — early visits are short, easy, and catch issues while they're small.",
      },
      {
        question: "Are baby teeth worth treating if they fall out anyway?",
        answer:
          "Yes — baby teeth hold space for adult teeth and matter for eating and speech. Untreated decay in baby teeth can cause pain and affect the adult teeth forming underneath.",
      },
      {
        question: "What are dental sealants?",
        answer:
          "A thin protective coating painted onto the grooves of back teeth, where most childhood cavities start. Applying them is quick and usually comfortable, and needs no injection.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/**
 * Additional treatments offered (from the Google Business Profile list) that
 * don't warrant a full landing page but should be clearly explained. Rendered
 * on the /services index so every treatment on the GBP is covered on-site.
 */
export interface MiniService {
  name: string;
  body: string;
}

export const moreServices: MiniService[] = [
  {
    name: "Routine Check-ups",
    body: "A regular examination catches decay, gum problems, and other issues while they're small and simple to treat. We recommend a check-up every six months for most patients.",
  },
  {
    name: "Teeth Cleaning (Scaling)",
    body: "Professional cleaning removes hardened plaque (tartar) that brushing can't, keeping gums healthy and breath fresh. It's one of the most effective ways to prevent gum disease.",
  },
  {
    name: "Fillings & Sealants",
    body: "Tooth-coloured fillings restore teeth affected by early decay, while sealants add a thin protective coating to the grooves of back teeth to stop cavities before they start.",
  },
  {
    name: "Tooth Extractions",
    body: "When a tooth can't be saved, a careful extraction under local anaesthesia removes it with minimal discomfort — followed by clear aftercare and options to replace it if needed.",
  },
  {
    name: "Oral Surgery",
    body: "Minor oral surgical procedures, including surgical extractions and wisdom-tooth removal, handled with proper planning and post-operative care.",
  },
  {
    name: "Wisdom Tooth Removal",
    body: "Impacted or painful wisdom teeth are assessed with an X-ray and removed when they're causing problems — crowding, pain, repeated infection, or difficulty cleaning.",
  },
  {
    name: "Dental Bonding",
    body: "A quick, minimally invasive way to repair small chips, close minor gaps, or reshape a tooth using tooth-coloured composite — often completed in a single visit.",
  },
  {
    name: "Teeth Reshaping",
    body: "Gentle contouring of uneven or slightly rough tooth edges to improve the look of your smile, usually comfortably and often without anaesthesia.",
  },
  {
    name: "Mouth Guards & Night Guards",
    body: "Custom-fitted guards protect your teeth during sport, or from the wear and jaw strain caused by night-time clenching and grinding (bruxism).",
  },
  {
    name: "Digital Dental X-rays",
    body: "Low-radiation digital X-rays let us see decay, bone levels, and roots that aren't visible in an exam — essential for accurate diagnosis and planning.",
  },
  {
    name: "Smile Makeover",
    body: "A planned combination of treatments — whitening, veneers, crowns, or reshaping — designed together to transform the overall look of your smile.",
  },
];

/** Treatments shown under "Related treatments" on each treatment page. */
export const relatedServices: Record<string, string[]> = {
  "dental-implants": ["crowns", "dentures-bridges", "root-canal-treatment"],
  "root-canal-treatment": ["crowns", "emergency-dental-care", "dental-implants"],
  veneers: ["teeth-whitening", "crowns", "laser-dentistry"],
  crowns: ["root-canal-treatment", "dental-implants", "veneers"],
  "laser-dentistry": ["root-canal-treatment", "teeth-whitening", "paediatric-dentistry"],
  "teeth-whitening": ["veneers", "crowns", "laser-dentistry"],
  "dentures-bridges": ["dental-implants", "full-mouth-rehabilitation", "crowns"],
  "full-mouth-rehabilitation": ["dental-implants", "crowns", "dentures-bridges"],
  "emergency-dental-care": ["root-canal-treatment", "crowns", "dental-implants"],
  "paediatric-dentistry": ["emergency-dental-care", "teeth-whitening", "root-canal-treatment"],
};
