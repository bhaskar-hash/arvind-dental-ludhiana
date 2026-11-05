"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { whatsappLink } from "@/lib/business";
import { routineFees } from "@/lib/pricing";

interface Scenario {
  id: string;
  icon: string;
  label: string;
  badge: string;
  title: string;
  description: string;
  specialistAdvantage: string;
  options: {
    name: string;
    pros: string;
    fee: string;
    highlight?: boolean;
  }[];
  warrantyText?: string;
  serviceHref: string;
  serviceLabel: string;
  whatsappMessage: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "missing-teeth",
    icon: "🦷",
    label: "Missing Tooth",
    badge: "Tooth Replacement",
    title: "Missing One or Multiple Teeth: Implants vs Fixed Bridges",
    description:
      "When a tooth is lost, the surrounding bone begins to shrink and neighboring teeth tip into the empty space. Replacing the root stops bone loss and restores full chewing ability.",
    specialistAdvantage:
      "Dr. Arvind Sahu (MDS Prosthodontics) plans implant positioning in 3D to ensure bite load is distributed evenly across your jaw joints.",
    options: [
      {
        name: "Titanium Dental Implant",
        pros: "Standalone titanium post in jawbone. Preserves 100% of adjacent healthy teeth with zero cutting.",
        fee: "Quoted after clinical exam & X-ray",
        highlight: true,
      },
      {
        name: "3-Unit Fixed Bridge",
        pros: "Fast tooth replacement anchored to neighboring teeth. Requires grinding down two adjacent healthy teeth.",
        fee: "Crown fees per unit (from ₹2,000 PFM / ₹4,000 Zirconia)",
      },
      {
        name: "Snap-On Implant Overdenture",
        pros: "For multiple missing teeth or full jaw. 2 to 4 implants securely click the plate in place, ending slippage.",
        fee: "Itemized written estimate after consultation",
      },
    ],
    warrantyText: "Up to lifetime written warranty* on genuine titanium implant fixtures.",
    serviceHref: "/services/dental-implants",
    serviceLabel: "Learn about Dental Implants",
    whatsappMessage:
      "Hi Dr. Sahu, I have missing teeth and would like your specialist advice on dental implants vs bridges.",
  },
  {
    id: "damaged-crown",
    icon: "👑",
    label: "Crowns & Caps",
    badge: "Tooth Protection",
    title: "Broken Tooth, Root Canal Cap, or Replacing Old Metal Crowns",
    description:
      "Teeth that have undergone root canal treatment or large fractures become brittle. Full-coverage crowns protect them from cracking under everyday chewing pressure.",
    specialistAdvantage:
      "Unlike general clinics that use unbranded local labs, Dr. Sahu uses precision CAD/CAM milled monolithic zirconia that eliminates black gumlines forever.",
    options: [
      {
        name: "Monolithic Zirconia (CAD/CAM Metal-Free)",
        pros: "100% biocompatible, extreme fracture resistance, seamless natural translucency. No black line at gumline.",
        fee: "From ₹4,000 per tooth",
        highlight: true,
      },
      {
        name: "Porcelain-Fused-to-Metal (PFM)",
        pros: "Time-tested durable porcelain over inner metal substructure. Economical option for posterior back molars.",
        fee: "From ₹2,000 per tooth",
      },
    ],
    warrantyText: "Monolithic zirconia crowns come with authentic manufacturer lab warranty cards.",
    serviceHref: "/services/crowns",
    serviceLabel: "Compare Crown Materials",
    whatsappMessage:
      "Hi Dr. Sahu, I need advice on choosing between Zirconia and PFM crowns for my tooth.",
  },
  {
    id: "fluorosis-stains",
    icon: "✨",
    label: "Punjab Fluorosis",
    badge: "Enamel Restoration",
    title: "Brown Mottled Stains from Groundwater Fluoride in Punjab",
    description:
      "High fluoride in Punjab groundwater causes intrinsic enamel hypomineralisation. Standard chemical bleach fails because the stain is locked inside the enamel matrix.",
    specialistAdvantage:
      "Conservative clinical triage: Dr. Sahu assesses stain depth to remove superficial brown bands without unnecessary tooth cutting.",
    options: [
      {
        name: "Enamel Microabrasion",
        pros: "Non-invasive compound buffing outermost <100µm of enamel. Gently erases superficial brown streaks without drilling.",
        fee: "Consultation ₹300 + Clinical assessment",
        highlight: true,
      },
      {
        name: "Direct Composite Edge Bonding",
        pros: "Single-visit chairside resin layering to mask surface pits and localized brown patches while keeping natural tooth structure.",
        fee: "Itemized chairside quote",
      },
      {
        name: "Custom Porcelain Veneers",
        pros: "Ultra-thin ceramic shells bonded to front teeth for severe, deep mottled discoloration. Permanently stain-resistant.",
        fee: "Custom cosmetic smile plan",
      },
    ],
    warrantyText: "Evidence-based conservative protocols designed to protect your natural enamel.",
    serviceHref: "/blog/dental-fluorosis-treatment-punjab",
    serviceLabel: "Read Fluorosis Treatment Guide",
    whatsappMessage:
      "Hi Dr. Sahu, I have brown fluorosis stains on my teeth and would like your opinion on conservative treatment.",
  },
  {
    id: "severe-toothache",
    icon: "⚡",
    label: "Toothache Relief",
    badge: "Emergency Triage",
    title: "Severe Night Toothache, Throbbing Pain, or Cheek Swelling",
    description:
      "Acute throbbing pain that worsens when lying down indicates pulpitis or periapical infection. Prompt diagnosis prevents infection from spreading into facial spaces.",
    specialistAdvantage:
      "Objective digital RVG imaging (₹200) pinpoints the exact nerve status. We never push for a root canal if a conservative sedative filling can save the vital pulp.",
    options: [
      {
        name: "Vital Pulp Therapy / Protective Filling",
        pros: "If the nerve is inflamed but reversible, medicated biological base protects the tooth without root canal.",
        fee: "Consultation ₹300 + Digital RVG ₹200",
      },
      {
        name: "Single-Visit Modern Root Canal",
        pros: "Complete local anaesthesia numbs the tooth immediately. Infected pulp removed and sealed with sterile gutta-percha.",
        fee: "Quoted transparently after RVG radiograph",
        highlight: true,
      },
    ],
    warrantyText: "Instant pain relief with local anaesthesia; crown protection recommended post-RCT.",
    serviceHref: "/services/emergency-dental-care",
    serviceLabel: "Emergency Dental Care Details",
    whatsappMessage:
      "Hi Dr. Sahu, I have an urgent severe toothache in Ludhiana and need advice on immediate care.",
  },
  {
    id: "worn-teeth-bite",
    icon: "📐",
    label: "Worn Teeth & Bite",
    badge: "Full-Mouth Rehabilitation",
    title: "Shortened Flat Teeth, Night Grinding (Bruxism), & Collapsed Bite",
    description:
      "Years of clenching or missing back teeth collapse your vertical bite height, causing facial sagging, muscle tension, and constantly chipping front teeth.",
    specialistAdvantage:
      "This is Dr. Sahu's primary postgraduate specialty (MDS Prosthodontics). We reconstruct your bite using semi-adjustable articulators and trial provisionals before permanent teeth are placed.",
    options: [
      {
        name: "Reversible Trial Phase (Occlusal Overlays)",
        pros: "Wear temporary composite overlays for 4 to 8 weeks to test chewing comfort, speech, and jaw joint relaxation.",
        fee: "Diagnostic phase (Exam ₹300, RVG ₹200)",
      },
      {
        name: "Comprehensive Restorative Phase",
        pros: "Permanent reconstruction using monolithic zirconia crowns, ceramic onlays, and implants for missing back teeth.",
        fee: "Comprehensive staged treatment plan",
        highlight: true,
      },
    ],
    warrantyText: "Custom hard occlusal night guard provided post-rehabilitation to protect new restorations.",
    serviceHref: "/services/full-mouth-rehabilitation",
    serviceLabel: "Explore Full-Mouth Rehabilitation",
    whatsappMessage:
      "Hi Dr. Sahu, my teeth are worn down and flat from grinding. I'd like your specialist opinion on restoring my bite.",
  },
  {
    id: "loose-denture",
    icon: "🧲",
    label: "Loose Denture Fix",
    badge: "Implant Overdentures",
    title: "Lower Denture Keeps Moving or Slipping While Eating",
    description:
      "Upper dentures hold by roof-of-mouth suction, but lower dentures rest on a narrow, shrinking jawbone. Adhesives and messy pastes fail to keep lower plates stable during meals.",
    specialistAdvantage:
      "Snap-on overdentures click onto 2 to 4 small titanium implants using locator abutments. You eat apples, roti, and nuts with zero movement and snap them out easily for cleaning.",
    options: [
      {
        name: "2-Implant Snap-On Locator Overdenture",
        pros: "Minimal surgical intervention. Locks the lower plate securely in place; stops gum sores and speech embarrassment.",
        fee: "Itemized written estimate after consultation",
        highlight: true,
      },
      {
        name: "Precision Denture Relining",
        pros: "Resurfacing the fitting surface of your existing denture to match current gum contours.",
        fee: "Routine laboratory reline fee",
      },
    ],
    warrantyText: "Dr. Sahu ensures custom lip support and natural phonetics for confident smiling.",
    serviceHref: "/blog/snap-on-dentures-overdentures",
    serviceLabel: "Read Snap-On Denture Guide",
    whatsappMessage:
      "Hi Dr. Sahu, my lower denture keeps slipping when I chew. I'd like your advice on snap-on overdentures.",
  },
];

export function TreatmentExplorer() {
  const [activeId, setActiveId] = useState<string>("missing-teeth");
  const scenario = SCENARIOS.find((s) => s.id === activeId) ?? SCENARIOS[0];

  return (
    <div className="rounded-[28px] border border-brand-line bg-white p-6 shadow-sm sm:p-9">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 pb-6 border-b border-brand-line">
        {SCENARIOS.map((s) => {
          const isSelected = s.id === activeId;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveId(s.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-body text-sm font-semibold transition-all ${
                isSelected
                  ? "bg-brand-red text-white shadow-md shadow-brand-red/20 scale-[1.02]"
                  : "bg-brand-warm text-brand-ink hover:bg-brand-blush hover:text-brand-red"
              }`}
            >
              <span>{s.icon}</span>
              <span>{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Scenario Card */}
      <div className="mt-7">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-brand-blush px-3 py-1 font-body text-xs font-bold uppercase tracking-wider text-brand-red">
            {scenario.badge}
          </span>
          <span className="font-body text-xs text-brand-muted">
            Initial Exam: ₹{routineFees.checkup} · RVG Digital X-ray: ₹{routineFees.xray}
          </span>
        </div>

        <h3 className="mt-3 font-headline text-[clamp(1.5rem,2.8vw,2rem)] font-extrabold leading-tight text-brand-ink">
          {scenario.title}
        </h3>

        <p className="mt-3 font-body text-base text-brand-muted leading-relaxed max-w-3xl">
          {scenario.description}
        </p>

        {/* Specialist Advantage Callout */}
        <div className="mt-6 rounded-2xl border border-brand-red/20 bg-brand-warm/60 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-red text-white text-sm font-bold">
              MDS
            </span>
            <div>
              <strong className="block font-headline text-base text-brand-ink">
                The Prosthodontic Specialist Advantage
              </strong>
              <p className="mt-1 font-body text-sm text-brand-muted leading-relaxed">
                {scenario.specialistAdvantage}
              </p>
            </div>
          </div>
        </div>

        {/* Clinical Options Grid */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scenario.options.map((opt) => (
            <div
              key={opt.name}
              className={`flex flex-col rounded-2xl border p-4 sm:p-5 transition-all ${
                opt.highlight
                  ? "border-brand-red bg-brand-blush/30 shadow-sm"
                  : "border-brand-line bg-white"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-headline text-base font-bold text-brand-ink">
                  {opt.name}
                </span>
                {opt.highlight ? (
                  <span className="rounded-md bg-brand-red px-2 py-0.5 text-[11px] font-bold uppercase text-white">
                    Recommended
                  </span>
                ) : null}
              </div>
              <p className="mt-2.5 font-body text-sm text-brand-muted leading-snug flex-1">
                {opt.pros}
              </p>
              <div className="mt-4 pt-3 border-t border-brand-line/60">
                <span className="block font-body text-[11px] uppercase tracking-wider text-brand-muted font-bold">
                  Published Fee Guideline
                </span>
                <span className="font-headline text-sm font-bold text-brand-red">
                  {opt.fee}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-brand-ink p-5 text-white sm:p-6">
          <div>
            <span className="block font-headline text-lg font-bold text-brand-gold">
              Have Dr. Sahu Review Your Specific Teeth
            </span>
            <span className="block font-body text-sm text-[#CDB8B5] mt-0.5">
              Send 3 smile photos on WhatsApp. Dr. Sahu replies with a personal voice note — no receptionist, no automated bots.
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={whatsappLink(scenario.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-wa px-5 py-3 font-body text-sm font-bold text-white shadow-md hover:brightness-105"
            >
              <Icon name="chat" size={17} />
              Ask Dr. Sahu on WhatsApp
            </a>
            <Link
              href={scenario.serviceHref}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-4 py-3 font-body text-sm font-semibold text-white hover:bg-white/20"
            >
              {scenario.serviceLabel}
              <Icon name="arrow" size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
