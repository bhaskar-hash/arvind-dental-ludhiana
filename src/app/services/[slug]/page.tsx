'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Calendar,
  MessageSquare,
  Clock,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Heart,
  Activity,
  FlameKindling,
  ArrowLeft
} from 'lucide-react';
import { dataService } from '@/lib/dataService';

interface ServiceDetail {
  title: string;
  subtitle: string;
  tagline: string;
  duration: string;
  qualification: string;
  overview: string;
  symptoms: string[];
  steps: { title: string; desc: string }[];
  technology: string[];
  recovery: string;
}

const SERVICE_DATA: Record<string, ServiceDetail> = {
  implants: {
    title: 'Advanced Dental Implants',
    subtitle: 'Permanent single, multiple, and full-arch teeth restorations with FDA-approved Korean and Swiss titanium implant systems.',
    tagline: 'MDS Oral Implantology specialist care in Ludhiana, Punjab.',
    duration: '7 Days Express restoration cycle available for NRI travellers',
    qualification: 'Lead by MDS Oral & Maxillofacial Implantologist',
    overview: 'Dental implants are the gold standard for replacing missing teeth. They look, feel, and function exactly like natural teeth. Using computerized 3D CBCT scans, we map your jaw structure, place titanium posts painlessly, and secure high-translucency Zirconia crowns. Restoring 100% chew capacity and aesthetics.',
    symptoms: [
      'Single or multiple missing teeth due to cavities or trauma.',
      'Loose or uncomfortable dentures that slip while speaking or eating.',
      'Jawbone shrinkage (bone resorption) causing premature facial aging.',
      'Difficulty chewing hard foods like nuts or apples.'
    ],
    steps: [
      { title: 'Step 1: 3D Imaging & Planning', desc: 'Pre-op CBCT scan to measure jawbone density and map nerve routes in 3D.' },
      { title: 'Step 2: Painless Implant Placement', desc: 'Minimally invasive placement of titanium implant under local anesthesia (drill-free laser assist).' },
      { title: 'Step 3: Osseointegration & Lab Scan', desc: 'Implant fuses with the bone. Digital intraoral scans are sent to CAD/CAM lab for crown crafting.' },
      { title: 'Step 4: Custom Crown Placement', desc: 'Securement of custom high-translucency Zirconia crown, matching your natural teeth shading.' }
    ],
    technology: [
      'FDA-approved Nobel Biocare (Sweden) & Straumann (Switzerland) premium systems',
      'Computer-Guided Surgical Templates (for micro-precision placement)',
      'Intraoral digital scanners (no messy paste impressions)'
    ],
    recovery: 'Very minimal post-op discomfort. Laser healing technology reduces swelling, allowing patients to resume normal soft diet within 24-48 hours.'
  },
  'smile-designing': {
    title: 'Digital Smile Designing (DSD)',
    subtitle: 'Restore confidence with porcelain and composite veneers, laser gum contouring, and advanced aesthetic adjustments.',
    tagline: 'Tailor-made smile transformations in 5 to 7 days.',
    duration: '5 - 7 Days full smile alignment and cosmetic restoration',
    qualification: 'Lead by MDS Aesthetic & Conservative Dentists',
    overview: 'Using Digital Smile Design, we map your facial proportions, lips, and gum lines to design a custom smile that complements your look. We use ultra-thin E-Max porcelain veneers or high-strength composite bonding to correct gaps, chips, stains, and minor misalignments, delivering a radiant, natural translucency.',
    symptoms: [
      'Chipped, cracked, or naturally worn down front teeth.',
      'Dark stains or tetracycline discoloration that teeth whitening cannot fix.',
      'Uneven gaps between front teeth (diastema) affecting confidence.',
      '“Gummy smile” where excess gum tissue makes teeth look short.'
    ],
    steps: [
      { title: 'Step 1: Smile Consultation & Mockup', desc: 'Digital photos and 3D mockups allow you to preview your new smile on screen before we start.' },
      { title: 'Step 2: Conservative Preparation', desc: 'Micro-shaving of enamel (less than 0.5mm) is done painlessly under magnification.' },
      { title: 'Step 3: Digital Scanning & CAD/CAM', desc: 'High-speed intraoral scanning maps the prepped teeth. Custom veneers are milled in hours.' },
      { title: 'Step 4: Veneer Bonding & Fitting', desc: 'Adhesion of custom veneers using dual-cure composite resins, sealed with laser curing.' }
    ],
    technology: [
      'IPS E-Max Lithium Disilicate Porcelain (ultra-strong, natural translucency)',
      'Digital Smile Design (DSD) simulation software',
      'Laser Gum Contouring (water-lase for bloodless gum shaping)'
    ],
    recovery: 'Zero recovery downtime. Patients leave the chair with a brand-new smile. Minor temperature sensitivity for 2-3 days is normal.'
  },
  'root-canal': {
    title: 'Laser Root Canal Treatment (RCT)',
    subtitle: 'Save infected teeth painlessly with rotary endodontics and medical dental lasers. Single-sitting treatment.',
    tagline: 'High-precision, drill-free single sitting root canals in Ludhiana.',
    duration: 'Single Session (approx. 45 - 60 minutes)',
    qualification: 'Lead by MDS Endodontist Speciality Surgeon',
    overview: 'Severe tooth decay or cracks can infect the tooth pulp, causing intense pain. Our specialist MDS Endodontist performs root canals using computerized rotary files to thoroughly clean canals, followed by laser sterilization to kill 99.9% of bacteria. Completed in a single sitting and sealed with custom ceramic crowns.',
    symptoms: [
      'Severe, throbbing tooth pain that worsens when lying down or chewing.',
      'Extreme sensitivity to hot and cold foods that lingers for minutes.',
      'Swelling or pimples on the gums surrounding the painful tooth.',
      'Darkening or greyish discoloration of a decayed tooth.'
    ],
    steps: [
      { title: 'Step 1: Complete Anesthesia & Access', desc: 'Advanced computerized local anesthesia is applied. Access to infected pulp is opened painlessly.' },
      { title: 'Step 2: Rotary Pulp Extraction', desc: 'Computerized rotary endodontic files clean and shape the narrow root canals quickly.' },
      { title: 'Step 3: Laser Disinfection Loop', desc: 'Dental laser fiber is inserted to sterilize canals, reaching microscopic tubules.' },
      { title: 'Step 4: Hermetic Seal & CAD Crown', desc: 'Canals are filled with Gutta-Percha, and prepped for a custom CAD/CAM ceramic crown.' }
    ],
    technology: [
      'Diode Dental Laser (for microscopic sterilization and bio-stimulation)',
      'Apex Locators & Rotary Endodontic Systems (reduces treatment time to 45 mins)',
      'Digital Radiography (90% lower radiation exposure)'
    ],
    recovery: 'Immediate relief from throbbing tooth pain. Mild soreness when chewing is normal for 3-4 days and managed with standard local analgesics.'
  }
};

export default function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const detail = SERVICE_DATA[slug];

  if (!detail) {
    notFound();
  }

  const triggerBooking = () => {
    window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  const openWhatsApp = () => {
    const link = dataService.getWhatsAppLink('+918847651364', 'Patient', detail.title);
    window.open(link, '_blank');
  };

  return (
    <div className="bg-luxury-950 min-h-screen py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          href="/services"
          className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-white uppercase tracking-wider mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to all treatments
        </Link>

        {/* Hero Block */}
        <div className="space-y-6 pb-12 border-b border-slate-900">
          <div className="inline-flex items-center space-x-2 bg-luxury-900 border border-gold-400/10 px-4 py-1.5 rounded-full">
            <Sparkles className="h-4 w-4 text-gold-400" />
            <span className="text-xs font-semibold tracking-wider text-gold-300 uppercase font-sans">
              {detail.qualification}
            </span>
          </div>

          <h1 className="text-4xl font-extrabold text-white sm:text-5xl leading-tight font-display">
            {detail.title}
          </h1>
          
          <p className="text-lg text-slate-300 font-light leading-relaxed max-w-3xl">
            {detail.subtitle}
          </p>

          <div className="flex flex-wrap gap-4 text-xs">
            <span className="flex items-center text-slate-350 bg-luxury-900 border border-slate-850 px-4 py-2.5 rounded-xl font-light">
              <Clock className="h-4 w-4 text-gold-450 mr-2" />
              {detail.duration}
            </span>
            <span className="flex items-center text-slate-350 bg-luxury-900 border border-slate-850 px-4 py-2.5 rounded-xl font-light">
              <ShieldCheck className="h-4 w-4 text-gold-455 mr-2" />
              {detail.tagline}
            </span>
          </div>
        </div>

        {/* Two Column Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-12">
          
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Overview */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center font-display">
                <Activity className="h-5 w-5 text-gold-400 mr-2" />
                Procedure Overview
              </h2>
              <p className="text-sm text-slate-400 font-light leading-relaxed">
                {detail.overview}
              </p>
            </div>

            {/* Symptoms */}
            <div className="space-y-4 bg-luxury-900/40 border border-gold-400/10 p-6 sm:p-8 rounded-[2rem] luxury-glow">
              <h2 className="text-xl font-bold text-white flex items-center font-display">
                <Heart className="h-5 w-5 text-red-500 mr-2" />
                Clinical Indications
              </h2>
              <p className="text-xs text-slate-500 font-light">
                Schedule a priority evaluation if you experience any of the following:
              </p>
              <ul className="space-y-3 pt-2">
                {detail.symptoms.map((s, idx) => (
                  <li key={idx} className="flex items-start text-xs text-slate-300 font-light">
                    <ChevronRight className="h-4 w-4 text-gold-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center font-display">
                <Clock className="h-5 w-5 text-gold-450 mr-2" />
                Step-by-Step Clinical Process
              </h2>
              <div className="space-y-6 border-l border-slate-800 pl-4 ml-2">
                {detail.steps.map((step, idx) => (
                  <div key={idx} className="relative space-y-1">
                    <div className="absolute -left-[24.5px] top-1.5 h-2.5 w-2.5 rounded-full bg-gold-400 border border-luxury-950"></div>
                    <h3 className="text-sm font-bold text-white font-display">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar Tools */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Tech Box */}
            <div className="bg-luxury-900 border border-gold-400/10 rounded-[2rem] p-6 space-y-4 luxury-glow">
              <h3 className="text-sm font-bold text-white flex items-center font-display">
                <FlameKindling className="h-4.5 w-4.5 text-gold-400 mr-2" />
                Advanced Tools Used
              </h3>
              <ul className="space-y-3">
                {detail.technology.map((tech, idx) => (
                  <li key={idx} className="text-xs text-slate-400 border-b border-slate-950 pb-2 last:border-b-0 font-light">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            {/* Recovery Box */}
            <div className="bg-luxury-900 border border-gold-400/10 rounded-[2rem] p-6 space-y-3 luxury-glow">
              <h3 className="text-sm font-bold text-white font-display">
                Healing & Recovery
              </h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                {detail.recovery}
              </p>
            </div>

            {/* Action Box */}
            <div className="bg-luxury-900 border border-gold-400/20 rounded-[2rem] p-6 text-center space-y-4 backdrop-blur-md luxury-glow">
              <h4 className="text-sm font-bold text-white font-display">Direct Consultation</h4>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Consult with our senior MDS specialists. Share clinical files or travel dates.
              </p>
              <div className="space-y-3">
                <button
                  onClick={triggerBooking}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl text-xs uppercase tracking-wider font-display transition-colors"
                >
                  Book Appointment Slot
                </button>
                <button
                  onClick={openWhatsApp}
                  className="w-full bg-luxury-950 border border-slate-800 hover:border-gold-400/20 text-slate-200 font-semibold py-3.5 rounded-xl text-xs flex items-center justify-center transition-colors font-display"
                >
                  <MessageSquare className="h-4 w-4 text-green-500 mr-2" />
                  Chat on WhatsApp
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
