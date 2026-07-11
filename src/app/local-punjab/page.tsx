'use client';

import { useState } from 'react';
import {
  Sparkles,
  PhoneCall,
  MapPin,
  CheckCircle2,
  Calendar,
  MessageSquare,
  ShieldCheck,
  Zap,
  Activity,
  Heart,
  Navigation
} from 'lucide-react';
import { dataService } from '@/lib/dataService';

export default function LocalPunjabLanding() {
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    dataService.addAppointment({
      patientName: 'Local Punjab Lead',
      email: 'local-patient@ludhianadental.com',
      phone: phone,
      date: new Date().toISOString().split('T')[0],
      time: 'Immediate Callback Requested',
      treatment: 'Local Patient Consultation',
      message: 'Urgent callback requested from Punjab/Ludhiana landing page.',
    });

    setSubmitted(true);
    setPhone('');
  };

  const openWhatsApp = () => {
    const link = dataService.getWhatsAppLink('+918847651364', 'Local Patient', 'OPD Appointment');
    window.open(link, '_blank');
  };

  const localHighlights = [
    { title: '₹0 OPD File Registration', desc: 'No registration fees for new patients booking through the website this week.' },
    { title: 'Opposite Rose Garden', desc: 'Conveniently located on Main Model Town Road, HIG Market with ample free parking.' },
    { title: 'Single-Sitting Root Canal', desc: 'Completed in just 45 minutes using state-of-the-art dental rotary and lasers.' },
    { title: '8+ MDS Specialists', desc: 'Treatment by specialist dentists in Prosthodontics, Endodontics, and Orthodontics.' }
  ];

  return (
    <div className="bg-white min-h-screen py-20 text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-gold-50 border border-gold-455/15 px-3.5 py-1.5 rounded-full">
              <Sparkles className="h-3.5 w-3.5 text-gold-455" />
              <span className="text-[10px] font-bold text-gold-500 uppercase tracking-widest font-display">
                Ludhiana Resident Speciality Hub
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
              Painless Laser Treatments <br />
              <span className="bg-gradient-to-r from-gold-400 via-gold-500 to-blue-600 bg-clip-text text-transparent">
                Arvind Dental Clinic Ludhiana
              </span>
            </h1>
            <p className="text-sm text-slate-500 font-light leading-relaxed max-w-2xl">
              Get premium, pain-free dental implants, single-sitting root canals, and invisible braces in Ludhiana. Led by **Dr. Arvind Singh (MDS Prosthodontics)**. Pay in Indian Rupees (INR) with special local corporate discounts.
            </p>

            {/* Quick Callback Widget */}
            <div className="bg-slate-50 border border-slate-200/80 p-5 rounded-2xl space-y-3 max-w-md mx-auto lg:mx-0 shadow-inner">
              <span className="text-xs font-bold text-slate-900 block font-display">
                Request Callback in 15 Minutes
              </span>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone / WhatsApp number"
                    className="flex-grow bg-white border border-slate-205 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-gold-400 font-mono"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-5 py-3 rounded-xl uppercase tracking-widest font-display whitespace-nowrap active:scale-95"
                  >
                    Call Me
                  </button>
                </form>
              ) : (
                <div className="text-xs text-green-600 font-semibold p-2.5 bg-green-500/10 rounded-lg border border-green-500/20">
                  Number logged. Our coordinator will ring you shortly!
                </div>
              )}
            </div>

            {/* Local Call Action */}
            <div className="flex justify-center lg:justify-start items-center space-x-6 text-xs font-semibold uppercase tracking-widest font-display">
              <a href="tel:+918847651364" className="text-blue-655 hover:underline flex items-center">
                <PhoneCall className="h-4 w-4 mr-1.5" />
                Call Clinic: +91 88476-51364
              </a>
              <button onClick={openWhatsApp} className="text-slate-655 hover:underline flex items-center">
                <MessageSquare className="h-4 w-4 mr-1.5 text-green-500" />
                WhatsApp Appointment
              </button>
            </div>
          </div>

          {/* Right Card: Local Pricing List in INR */}
          <div className="lg:col-span-5 bg-white border border-slate-205 p-8 rounded-[2.5rem] shadow-xl luxury-glow">
            <h3 className="text-lg font-bold text-slate-900 font-display mb-4">Speciality Treatment Rates (INR)</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div>
                  <span className="text-xs font-bold text-slate-900 block font-display">Laser Root Canal (RCT)</span>
                  <span className="text-[10px] text-slate-500 block font-light">Single Sitting micro-endodontics</span>
                </div>
                <span className="font-mono text-sm font-bold text-slate-900">From ₹3,500</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div>
                  <span className="text-xs font-bold text-slate-900 block font-display">Dental Titanium Implant</span>
                  <span className="text-[10px] text-slate-500 block font-light">Korean Osstem post placement</span>
                </div>
                <span className="font-mono text-sm font-bold text-slate-900">From ₹15,000</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div>
                  <span className="text-xs font-bold text-slate-900 block font-display">Zirconia Metal-Free Crown</span>
                  <span className="text-[10px] text-slate-500 block font-light">CAD/CAM milled with 10-Yr warranty</span>
                </div>
                <span className="font-mono text-sm font-bold text-slate-900">From ₹6,000</span>
              </div>
              <div className="flex justify-between items-center pb-1">
                <div>
                  <span className="text-xs font-bold text-slate-900 block font-display">Clear Invisible Aligners</span>
                  <span className="text-[10px] text-slate-500 block font-light">Certified orthodontic alignment</span>
                </div>
                <span className="font-mono text-sm font-bold text-slate-900">From ₹45,000</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-[10px] text-slate-500">
              <ShieldCheck className="h-4 w-4 text-gold-455 mr-1 flex-shrink-0" />
              *CGHS / Central Govt health schemes guidelines followed.
            </div>
          </div>
        </div>

        {/* Local Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {localHighlights.map((item, idx) => (
            <div key={idx} className="bg-slate-50/50 border border-slate-205 rounded-2xl p-6 text-left space-y-2 luxury-glow">
              <div className="h-8 w-8 rounded-full bg-gold-50 border border-gold-455/20 text-xs font-bold text-gold-500 flex items-center justify-center font-mono">
                0{idx + 1}
              </div>
              <h4 className="text-sm font-bold text-slate-900 font-display">{item.title}</h4>
              <p className="text-[11px] text-slate-500 leading-normal font-light">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Local Landmark / Map Direction Callout */}
        <div className="bg-slate-50 border border-slate-205 rounded-[2.5rem] p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center luxury-glow">
          <div className="space-y-4">
            <MapPin className="h-8 w-8 text-gold-455 animate-bounce" />
            <h3 className="text-2xl font-bold text-slate-900 font-display">Clinic Location & Directions</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              We are located in the heart of Ludhiana: **12-B, HIG Flats, Opposite Rose Garden, Main Model Town Road**. 
              If you are driving from Sarabha Nagar, Ferozepur Road, or Civil Lines, take the Model Town exit at the Rose Garden roundabout. Ample secure street parking is available.
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs font-bold text-gold-500 uppercase tracking-widest font-display hover:text-gold-300 transition-colors"
            >
              Get Directions on Google Maps
              <Navigation className="h-4 w-4 ml-1" />
            </a>
          </div>

          <div className="relative aspect-[16/10] bg-white border border-slate-200 rounded-3xl overflow-hidden flex items-center justify-center p-6 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
            <div className="space-y-1 relative z-10">
              <span className="text-xs font-bold text-slate-900 block font-display">Arvind Prosthodontics & Implant Centre</span>
              <span className="text-[10px] text-slate-500 block font-light">Opp. Rose Garden gate, HIG Flats Market</span>
              <span className="text-[10px] text-gold-450 bg-gold-455/5 border border-gold-455/20 inline-block font-semibold px-2 py-0.5 rounded">
                Ludhiana, Punjab
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
