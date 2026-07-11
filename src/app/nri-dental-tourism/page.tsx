'use client';

import {
  Compass,
  Plane,
  Award,
  ChevronRight,
  ShieldCheck,
  Zap,
  MessageSquare
} from 'lucide-react';
import { dataService } from '@/lib/dataService';
import TreatmentEstimator from '@/components/TreatmentEstimator';

export default function NRITourismPage() {
  const timelineSteps = [
    { day: 'Day 01', title: 'Arrival & 3D Mapping', desc: 'Complimentary airport pickup from Amritsar (ATQ). Clinical checkup, 3D CBCT digital bone-mapping, and final treatment timeline approval.' },
    { day: 'Day 02', title: 'Implant Placement / Prep', desc: 'Painless laser-guided implant insertion or micro-shaving for veneers. Highly precise, taking under 2 hours. Temporary crowns fitted.' },
    { day: 'Day 03 - 05', title: 'Lab Crafting & Local Tour', desc: 'While our digital lab mills your permanent Zirconia crowns, enjoy a fully guided tour of Amritsar (Golden Temple) or local heritage shopping.' },
    { day: 'Day 06', title: 'Permanent Crown Fitting', desc: 'Temporary crowns removed. Permanent high-translucency Zirconia crowns securely bonded. Bite calibration and alignment check.' },
    { day: 'Day 07', title: 'Final Review & Departure', desc: 'Final clinical inspection, review of clinical warranty certificates (lifetime on select implants), and complimentary transfer back to the airport.' }
  ];

  const openWhatsApp = () => {
    const link = dataService.getWhatsAppLink('+918847651364', 'NRI Patient', 'NRI Dental Tourism Package');
    window.open(link, '_blank');
  };

  return (
    <div className="bg-luxury-55 min-h-screen py-20 bg-white text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-wider font-semibold text-gold-400">
            Dental Tourism Hub
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl font-display">
            Save Up to 80% on Premium Care
          </h1>
          <p className="text-sm text-slate-500 font-light leading-relaxed">
            Combine your winter visit to Punjab with state-of-the-art dental treatments. Fully customized, express treatment timelines for NRIs from Canada, USA, UK, and Australia.
          </p>
        </div>

        {/* 1. OUT OF THE BOX INTERACTIVE DIAGNOSTIC CALCULATOR */}
        <div className="mb-20">
          <TreatmentEstimator />
        </div>

        {/* 2. Hospitality / Concierge details */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-[2.5rem] p-8 md:p-12 mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center luxury-glow">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] text-gold-450 uppercase tracking-widest font-bold block font-display">
              Concierge Assistance
            </span>
            <h2 className="text-3xl font-bold text-slate-900 font-display">Full Travel Coordination</h2>
            <p className="text-sm text-slate-500 leading-relaxed font-light">
              We bridge clinical excellence with comfortable hospitality. Our coordination team manages your trip to Punjab from start to finish.
            </p>
            
            <div className="space-y-4 pt-4 border-t border-slate-200/60">
              <div className="flex items-start space-x-3">
                <Plane className="h-5 w-5 text-gold-450 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-display">Airport Transfers</h4>
                  <p className="text-xs text-slate-550 font-light leading-normal">Pick-up and drop-off coordination directly from Amritsar (ATQ) or Chandigarh Airport.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Compass className="h-5 w-5 text-gold-450 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-display">5-Star Stays</h4>
                  <p className="text-xs text-slate-555 font-light leading-normal">Corporate discount coordination at leading hotels (Hyatt Regency, Radisson Blu) located near the clinic.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Award className="h-5 w-5 text-gold-450 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-display">Global Warranties</h4>
                  <p className="text-xs text-slate-555 font-light leading-normal">Lifetime implant warranty certificates directly valid from Straumann & Nobel Biocare internationally.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action box */}
          <div className="lg:col-span-5 bg-white border border-slate-200/80 p-8 rounded-3xl space-y-4 text-center">
            <h4 className="text-md font-bold text-slate-900 font-display">Connect with Expat Desk</h4>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Speak directly with our clinical supervisor to map out your flight dates and dental requirements.
            </p>
            <button
              onClick={openWhatsApp}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl text-xs uppercase tracking-widest font-display flex items-center justify-center transition-colors"
            >
              <MessageSquare className="h-4 w-4 text-white mr-2" />
              Chat via WhatsApp
            </button>
          </div>
        </div>

        {/* 3. 7-Day Express Timeline Layout */}
        <div className="space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-wider font-semibold text-gold-400">
              The Protocol
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 font-display tracking-tight">Express 7-Day Treatment Timeline</h2>
            <p className="text-sm text-slate-500 font-light">
              We coordinate clinical slots beforehand so you can land, get treated, and fly back within a week.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {timelineSteps.map((step) => (
              <div
                key={step.day}
                className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 hover:border-gold-400/20 transition-colors flex flex-col justify-between luxury-glow"
              >
                <div className="space-y-2">
                  <span className="text-xs font-extrabold text-gold-400 bg-gold-450/5 px-2.5 py-1 rounded-full inline-block border border-gold-450/15 font-mono">
                    {step.day}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug font-display">{step.title}</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-light">{step.desc}</p>
                </div>
                <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400 flex items-center font-light">
                  <ShieldCheck className="h-3.5 w-3.5 text-gold-500 mr-1.5" />
                  MDS Supervised
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
