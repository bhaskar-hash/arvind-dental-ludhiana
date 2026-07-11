'use client';

import { useState } from 'react';
import {
  Sparkles,
  Plane,
  Compass,
  Award,
  ChevronRight,
  ShieldCheck,
  Zap,
  MessageSquare,
  DollarSign,
  Calendar
} from 'lucide-react';
import { dataService } from '@/lib/dataService';
import TreatmentEstimator from '@/components/TreatmentEstimator';

export default function NRIGlobalLanding() {
  const openWhatsApp = () => {
    const link = dataService.getWhatsAppLink('+918847651364', 'Expat Patient', 'Global Dental Package query');
    window.open(link, '_blank');
  };

  const timelineSteps = [
    { day: 'Day 01', title: 'Arrival & 3D CBCT Scan', desc: 'Pickup from Amritsar Airport (ATQ). Direct 3D CBCT scan mapping and physical bite analysis at the clinic.' },
    { day: 'Day 02', title: 'Implant Fitting / Veneer prep', desc: 'Painless titanium post fitting or cosmetic veneer micro-preparation. Completed under 2 hours. Temporary crowns secured.' },
    { day: 'Day 03 - 05', title: 'CAD/CAM Lab Milling', desc: 'Explore Golden Temple or heritage shopping while our computer lab mills your permanent translucent Zirconia bridges.' },
    { day: 'Day 06', title: 'Permanent Crown Bond', desc: 'Temporary crowns swapped. Permanent Zirconia prostheses fitted, balanced, and calibrated for an exact bite.' },
    { day: 'Day 07', title: 'Final Warranty & Return', desc: 'Clinical inspection, lifetime global warranty certificate hand-over, and drop-off back to the airport.' }
  ];

  return (
    <div className="bg-white min-h-screen py-20 text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200/50 px-4 py-1 rounded-full">
            <Plane className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest text-blue-700 uppercase font-sans">
              Expat Dental Tourism Desk (USA, Canada, UK, Aus)
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl font-display">
            Save Up to 80% on Restorations
          </h1>
          <p className="text-sm text-slate-500 font-light leading-relaxed">
            High-translucency Zirconia crowns, aesthetic veneers, and lifetime-warranted implants fitted under an express 7-day timeline. Pay in USD/CAD/GBP with massive savings.
          </p>
        </div>

        {/* 1. INTERACTIVE ESTIMATOR & FILE UPLOADER */}
        <div className="mb-20">
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs uppercase tracking-wider font-semibold text-gold-400">
              Interactive Calculator
            </span>
            <h2 className="text-2xl font-bold text-slate-900 font-display">Estimate Your Savings Instantly</h2>
            <p className="text-xs text-slate-550 font-light max-w-md mx-auto">
              Select your concern, upload an X-ray scan, and compare West Coast average pricing vs. our clinical rates in Ludhiana.
            </p>
          </div>
          <TreatmentEstimator />
        </div>

        {/* 2. PRICE COMPARISON MATRIX */}
        <div className="bg-slate-50 border border-slate-205 rounded-[2.5rem] p-8 md:p-12 mb-20">
          <div className="text-center space-y-2 mb-10 max-w-xl mx-auto">
            <span className="text-[10px] uppercase font-bold text-gold-455 tracking-wider block font-display">Financial Arbitrage</span>
            <h3 className="text-2xl font-bold text-slate-900 font-display">Cost Matrix: USA/Canada vs. Punjab</h3>
            <p className="text-xs text-slate-550 font-light leading-relaxed">
              Verify average savings across popular prosthetic and cosmetic treatments. Identical implant brands, a fraction of the cost.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 text-left shadow-sm">
              <h4 className="font-bold text-slate-900 font-display text-sm">Single Swiss Implant</h4>
              <p className="text-xs text-slate-500 font-light leading-relaxed">Single Straumann implant post + Zirconia crown.</p>
              <div className="border-t border-slate-100 pt-3 space-y-1">
                <span className="text-[10px] text-red-500 font-mono block">USA/Canada: $4,500 USD</span>
                <span className="text-xs font-bold text-green-600 font-mono block">Arvind Dental: $600 USD</span>
              </div>
            </div>
            <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 text-left shadow-sm">
              <h4 className="font-bold text-slate-900 font-display text-sm">Full Arch Restoration</h4>
              <p className="text-xs text-slate-500 font-light leading-relaxed">All-on-4 hybrid prosthetic bridge reconstruction.</p>
              <div className="border-t border-slate-100 pt-3 space-y-1">
                <span className="text-[10px] text-red-500 font-mono block">USA/Canada: $28,000 USD</span>
                <span className="text-xs font-bold text-green-600 font-mono block">Arvind Dental: $3,800 USD</span>
              </div>
            </div>
            <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 text-left shadow-sm">
              <h4 className="font-bold text-slate-900 font-display text-sm">IPS E-Max Veneers (Set of 8)</h4>
              <p className="text-xs text-slate-500 font-light leading-relaxed">Cosmetic smile correction porcelain laminates.</p>
              <div className="border-t border-slate-100 pt-3 space-y-1">
                <span className="text-[10px] text-red-500 font-mono block">USA/Canada: $12,000 USD</span>
                <span className="text-xs font-bold text-green-600 font-mono block">Arvind Dental: $1,600 USD</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. 7-DAY EXPRESS PROTOCOL */}
        <div className="space-y-12 mb-20">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-wider font-semibold text-gold-400">
              The Workflow
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 font-display">Express 7-Day Treatment Timeline</h2>
            <p className="text-sm text-slate-500 font-light leading-relaxed">
              We coordinate clinical bookings weeks before you land so you can complete your restoration and return within 7 days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {timelineSteps.map((step) => (
              <div
                key={step.day}
                className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 flex flex-col justify-between shadow-sm hover:border-gold-400/25 transition-colors"
              >
                <div className="space-y-2">
                  <span className="text-xs font-extrabold text-gold-400 bg-gold-455/5 px-2.5 py-1 rounded-full inline-block border border-gold-455/15 font-mono">
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

        {/* 4. CONCIERGE PACKAGE */}
        <div className="bg-slate-50 border border-slate-205 rounded-[2.5rem] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center luxury-glow">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] text-gold-450 uppercase tracking-widest font-bold block font-display">
              Hospitality & Travel Support
            </span>
            <h2 className="text-3xl font-bold text-slate-900 font-display">Expat Concierge Coordination</h2>
            <p className="text-sm text-slate-500 leading-relaxed font-light">
              We handle travel details so you can focus on your recovery. Our team coordinates transfers, lodging, and local sightseeing.
            </p>
            
            <div className="space-y-4 pt-4 border-t border-slate-200/60">
              <div className="flex items-start space-x-3">
                <Plane className="h-5 w-5 text-gold-455 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-display">Airport Pickups</h4>
                  <p className="text-xs text-slate-550 font-light leading-normal">Complimentary transfer from Amritsar International Airport (ATQ) or Chandigarh Airport directly to Ludhiana.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Compass className="h-5 w-5 text-gold-455 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-display">Hotel Discounts</h4>
                  <p className="text-xs text-slate-550 font-light leading-normal">Special clinical rates at partner hotels (Radisson Blu, Hyatt Regency) situated within 10 minutes of our facility.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Award className="h-5 w-5 text-gold-455 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-display">Lifetime Warranties</h4>
                  <p className="text-xs text-slate-550 font-light leading-normal">Your Straumann and Nobel implants carry international lifetime replacement certificates valid in the US, Canada, UK, and Australia.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white border border-slate-205 p-8 rounded-3xl space-y-4 text-center">
            <h4 className="text-md font-bold text-slate-900 font-display">Speak with Expat Coordinator</h4>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Message us on WhatsApp to coordinate your travel calendar, submit OPG scans, and secure slot bookings.
            </p>
            <button
              onClick={openWhatsApp}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl text-xs uppercase tracking-widest font-display flex items-center justify-center transition-colors"
            >
              <MessageSquare className="h-4 w-4 text-white mr-2" />
              WhatsApp Consultation
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
