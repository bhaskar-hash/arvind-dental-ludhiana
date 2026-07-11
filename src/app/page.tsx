'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Star,
  Zap,
  CheckCircle2,
  Calendar,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  Activity,
  Heart,
  PhoneCall,
  Check
} from 'lucide-react';
import { dataService, OperatingHours, BeforeAfterGallery } from '@/lib/dataService';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import TreatmentEstimator from '@/components/TreatmentEstimator';

export default function Home() {
  const [hours, setHours] = useState<OperatingHours[]>([]);
  const [gallery, setGallery] = useState<BeforeAfterGallery[]>([]);

  // Inline lead capture states
  const [quickPhone, setQuickPhone] = useState('');
  const [quickSubmitted, setQuickSubmitted] = useState(false);
  const [bottomPhone, setBottomPhone] = useState('');
  const [bottomSubmitted, setBottomSubmitted] = useState(false);

  useEffect(() => {
    const config = dataService.getCMSConfig();
    setHours(config.hours);
    setGallery(config.gallery);
  }, []);

  const triggerBooking = () => {
    window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  const openWhatsApp = () => {
    const link = dataService.getWhatsAppLink('+918847651364', 'Patient', 'Local OPD Consultation');
    window.open(link, '_blank');
  };

  const handleQuickSubmit = (e: React.FormEvent, phoneNum: string, type: 'hero' | 'bottom') => {
    e.preventDefault();
    if (!phoneNum.trim()) return;
    
    dataService.addAppointment({
      patientName: `Quick Callback Lead (${type})`,
      email: 'not-provided@ludhianadental.com',
      phone: phoneNum,
      date: new Date().toISOString().split('T')[0],
      time: 'Immediate Callback Requested',
      treatment: 'Prosthodontics / Implants',
      message: `Urgent callback requested via homepage quick input (${type} form).`,
    });

    if (type === 'hero') {
      setQuickSubmitted(true);
      setQuickPhone('');
    } else {
      setBottomSubmitted(true);
      setBottomPhone('');
    }
  };

  const stats = [
    { label: 'Google Rating', value: '4.9★', detail: 'Based on 1,250+ Reviews' },
    { label: 'Implant Success', value: '99.2%', detail: '5,000+ Implants Placed' },
    { label: 'Happy Patients', value: '15,000+', detail: 'Ludhiana Residents Served' },
    { label: 'MDS Specialists', value: '8+', detail: 'Qualified MDS Doctors' },
  ];

  const treatments = [
    {
      title: 'Prosthetic Dental Implants',
      desc: 'Replace missing teeth permanently with biocompatible titanium implants. We use premium Nobel Biocare (Sweden) and Straumann (Switzerland) systems with lifetime warranty options.',
      features: ['99.2% Implant Success Rate', 'Lifetime Global Warranty', 'Guided 3D Planning & Sinus Lift'],
      link: '/services/implants',
      badge: 'Implantology'
    },
    {
      title: 'Full Mouth Rehabilitation',
      desc: 'Advanced full-arch restorations using All-on-4 and All-on-6 protocols. Restores full chewing capacity and facial structure for complex cases.',
      features: ['Custom hybrid titanium bridges', 'Completed in 5-7 Days Express', 'Done by Senior MDS Prosthodontist'],
      link: '/services/implants',
      badge: 'Prosthodontics'
    },
    {
      title: 'Smile Designing & Veneers',
      desc: 'High-translucency ceramic veneers (IPS E-Max) and custom crown fabrications to correct gaps, stains, and misalignments.',
      features: ['CAD/CAM Digital Milling', 'IPS E-Max Ceramic Veneers', 'Translucent Natural Shade matching'],
      link: '/services/smile-designing',
      badge: 'Esthetic Dentistry'
    },
    {
      title: 'Painless Laser Root Canal',
      desc: 'Single-sitting endodontic therapy utilizing advanced dental lasers for canal sterilization and immediate pain relief.',
      features: ['Drill-Free Cavity Cleanups', 'Completed in 45 Minutes', 'Microscopic Canal Sealing'],
      link: '/services/root-canal',
      badge: 'Endodontics'
    }
  ];

  const sterilizationSteps = [
    { title: 'Chemical Disinfection', desc: 'Instruments undergo a chemical bath to neutralize active contaminants.' },
    { title: 'Ultrasonic Scrubbing', desc: 'High-frequency cavitation bubbles scrub jointed tools on a microscopic scale.' },
    { title: 'Aseptic Sealing', desc: 'Dried instruments are hermetically sealed inside sterilization indicator pouches.' },
    { title: 'Class-B Autoclaving', desc: 'Subjected to fractionated vacuum steam at 134°C to destroy all microbial spores.' },
    { title: 'UV Sterile Storage', desc: 'Pouches are maintained in UV-C cabinets to prevent post-cycle contamination.' },
    { title: 'Patient Verification', desc: 'The sterilization chemical indicator seal is broken open in front of your eyes.' }
  ];

  const testimonials = [
    {
      name: 'Gurpreet Singh',
      location: 'Model Town, Ludhiana',
      quote: 'Outstanding treatment for my dental implants. The MDS implantologist spent hours explaining the process in detail. Having a dedicated WhatsApp support channel made the scheduling completely stress-free.',
      rating: 5
    },
    {
      name: 'Dr. Amrit Pal Kaur',
      location: 'Sarabha Nagar, Ludhiana',
      quote: 'As a healthcare practitioner, hygiene is critical to me. Arvind Dental uses rigid Class-B autoclaves with clear indicator tape. The laser root canal was completely painless and super efficient.',
      rating: 5
    },
    {
      name: 'Harvinder Sodhi',
      location: 'Civil Lines, Ludhiana',
      quote: 'Best dental clinic in Ludhiana. The staff is polite, and the clinic is spotless. Got my crowns done in 3 days. Painless single-sitting root canal is highly recommended.',
      rating: 5
    }
  ];

  return (
    <div className="relative bg-white text-slate-800">
      
      {/* 1. HERO SECTION WITH QUICK LEAD CAPTURE */}
      <section className="relative min-h-[92vh] flex items-center bg-white border-b border-slate-100 overflow-hidden pt-16 pb-24 md:py-32">
        {/* Background Gradients */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px]"></div>
          <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-gold-400/5 rounded-full blur-[140px]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.015)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-80"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Copy */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-gold-50/50 border border-gold-455/25 px-4 py-1.5 rounded-full">
                <Sparkles className="h-3.5 w-3.5 text-gold-400" />
                <span className="text-[10px] font-bold tracking-widest text-gold-500 uppercase font-sans">
                  Ludhiana's Best Speciality Dental Clinic
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight font-display">
                Ludhiana's Leading <br />
                <span className="bg-gradient-to-r from-gold-400 via-gold-500 to-blue-600 bg-clip-text text-transparent">
                  MDS Specialist Clinic
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-505 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans font-light">
                Experience premium, pain-free dental implants, single-sitting root canals, and custom Zirconia crowns. Led by **Dr. Arvind Singh (MDS Prosthodontics)** and our team of senior MDS specialists in Model Town.
              </p>

              {/* Frictionless Callback Capture (Acquisition) */}
              <div className="max-w-md mx-auto lg:mx-0 bg-slate-50 border border-slate-200/80 p-5 rounded-2xl space-y-3 shadow-inner">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center justify-center lg:justify-start">
                  <PhoneCall className="h-3.5 w-3.5 text-gold-400 mr-1.5 animate-pulse" />
                  Request callback in 15 Minutes:
                </span>
                
                {!quickSubmitted ? (
                  <form onSubmit={(e) => handleQuickSubmit(e, quickPhone, 'hero')} className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="tel"
                      required
                      value={quickPhone}
                      onChange={(e) => setQuickPhone(e.target.value)}
                      placeholder="Enter mobile / WhatsApp number"
                      className="flex-grow bg-white border border-slate-205 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-gold-400 font-mono"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-5 py-3 rounded-xl transition-all uppercase tracking-widest font-display whitespace-nowrap active:scale-95"
                    >
                      Call Me
                    </button>
                  </form>
                ) : (
                  <div className="text-xs text-green-600 font-semibold flex items-center justify-center lg:justify-start bg-green-500/10 p-2.5 rounded-lg border border-green-500/25">
                    <Check className="h-4 w-4 mr-2" />
                    Number logged. Our receptionist will ring you shortly!
                  </div>
                )}
              </div>

              {/* Secondary Actions link */}
              <div className="flex justify-center lg:justify-start items-center space-x-6 text-xs font-semibold uppercase tracking-widest font-display">
                <button
                  onClick={triggerBooking}
                  className="text-blue-600 hover:text-blue-700 flex items-center hover:underline"
                >
                  <Calendar className="h-4 w-4 mr-1.5" />
                  Detailed schedule booking
                </button>
                <button
                  onClick={openWhatsApp}
                  className="text-slate-655 hover:text-slate-900 flex items-center hover:underline"
                >
                  <MessageSquare className="h-4 w-4 mr-1.5 text-green-500" />
                  Direct WhatsApp Chat
                </button>
              </div>

              {/* USP row */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-100 max-w-lg mx-auto lg:mx-0">
                <div className="text-center lg:text-left space-y-1">
                  <div className="text-gold-500 font-bold text-xs flex items-center justify-center lg:justify-start tracking-wider uppercase font-display">
                    <ShieldCheck className="h-4 w-4 text-gold-455 mr-1.5 flex-shrink-0" />
                    MDS Specialists
                  </div>
                  <span className="text-[10px] text-slate-550 block font-light">8+ Experienced MDS Doctors</span>
                </div>
                <div className="text-center lg:text-left space-y-1">
                  <div className="text-gold-500 font-bold text-xs flex items-center justify-center lg:justify-start tracking-wider uppercase font-display">
                    <Zap className="h-4 w-4 text-gold-455 mr-1.5 flex-shrink-0" />
                    Single Session RCT
                  </div>
                  <span className="text-[10px] text-slate-555 block font-light">Laser-Assisted Root Canals</span>
                </div>
                <div className="text-center lg:text-left space-y-1">
                  <div className="text-gold-500 font-bold text-xs flex items-center justify-center lg:justify-start tracking-wider uppercase font-display">
                    <CheckCircle2 className="h-4 w-4 text-gold-455 mr-1.5 flex-shrink-0" />
                    Class B Autoclave
                  </div>
                  <span className="text-[10px] text-slate-555 block font-light">100% Infection-Free Sterilization</span>
                </div>
              </div>
            </div>

            {/* Hero Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-[390px] aspect-[4/5] rounded-[2.5rem] bg-white border border-slate-200/80 shadow-2xl p-8 flex flex-col justify-between luxury-glow">
                <div className="relative z-20 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="bg-gold-50 text-gold-500 border border-gold-250/20 text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md">
                      Model Town, Ludhiana
                    </span>
                    <span className="flex items-center text-[10px] text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
                      Open Today
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 font-display">Painless Dental Care</h3>
                    <p className="text-xs text-slate-500">Advanced laser endodontics and implant dentistry in Punjab.</p>
                  </div>
                </div>

                <div className="relative z-20 bg-slate-50/80 border border-slate-100 p-5 rounded-2xl space-y-3 backdrop-blur-md">
                  <span className="text-[9px] uppercase font-bold text-gold-400 tracking-widest block">
                    Our Clinic Features:
                  </span>
                  <ul className="space-y-2 text-xs text-slate-600 font-light">
                    <li className="flex items-center">
                      <ChevronRight className="h-3 w-3 text-gold-400 mr-2 flex-shrink-0" />
                      Free Consultation for Senior Citizens
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="h-3 w-3 text-gold-400 mr-2 flex-shrink-0" />
                      Single-sitting Painless laser Root Canal
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="h-3 w-3 text-gold-400 mr-2 flex-shrink-0" />
                      Metal-Free Zirconia Crowns (10-Yr warranty)
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="h-3 w-3 text-gold-400 mr-2 flex-shrink-0" />
                      Certified Clear Invisible Braces/Aligners
                    </li>
                  </ul>
                </div>

                <div className="relative z-20 pt-4 border-t border-slate-100 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] text-slate-550 block uppercase font-semibold">Treatments starting from</span>
                    <span className="text-xl font-bold text-slate-900 font-mono">₹3,500</span>
                  </div>
                  <button
                    onClick={triggerBooking}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2.5 rounded-full flex items-center transition-all hover:scale-105 active:scale-95"
                  >
                    View Treatments
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="bg-slate-50 border-y border-slate-200/60 relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center space-y-1.5 border-r border-slate-200 last:border-r-0">
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
                  {stat.value}
                </div>
                <div className="text-[10px] font-bold text-gold-400 uppercase tracking-widest font-sans">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-500 font-light">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TREATMENT ESTIMATOR (OUT OF THE BOX ACQUISITION) */}
      <section className="bg-slate-50/30 py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-wider font-semibold text-gold-400">
              Interactive Diagnostic Tool
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">Estimate Your Treatment & Cost</h2>
            <p className="text-sm text-slate-505 font-light">
              Use our quick selector tool below to select your dental concern, upload an optional scan, and get an estimated cost range.
            </p>
          </div>
          <TreatmentEstimator />
        </div>
      </section>

      {/* 4. TREATMENTS SECTION */}
      <section className="bg-white py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-20">
            <span className="text-xs uppercase tracking-wider font-semibold text-gold-400">
              Expert Clinical Scope
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Prosthodontics & Implant Specialties
            </h2>
            <p className="text-sm text-slate-505 font-light leading-relaxed">
              We specialize in restoring missing teeth structures, heavy jawbone recessions, and full smile makeovers. Every procedure is lead by certified MDS surgeons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {treatments.map((t) => (
              <div
                key={t.title}
                className="bg-white border border-slate-200/80 rounded-[2rem] p-8 hover:border-gold-400/30 transition-all flex flex-col justify-between group relative overflow-hidden luxury-glow"
              >
                <div className="absolute right-0 top-0 w-32 h-32 bg-gold-400/5 rounded-full blur-3xl group-hover:bg-gold-400/10 transition-all"></div>
                
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <span className="bg-slate-50 border border-slate-200 text-[9px] text-gold-450 font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-lg">
                      {t.badge}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-gold-455 transition-colors font-display">
                    {t.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-light">{t.desc}</p>
                  
                  <ul className="space-y-2 pt-2">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-center text-xs text-slate-700 font-light">
                        <CheckCircle2 className="h-4 w-4 text-gold-400 mr-2 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 flex items-center justify-between border-t border-slate-100 mt-8">
                  <Link
                    href={t.link}
                    className="text-xs text-gold-400 group-hover:text-gold-300 font-bold flex items-center uppercase tracking-widest font-display"
                  >
                    Explore Procedure
                    <ArrowRight className="h-3.5 w-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button
                    onClick={triggerBooking}
                    className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold px-4.5 py-2.5 rounded-full text-slate-755 transition-colors hover:border-gold-455/20"
                  >
                    Check Availability
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BEFORE / AFTER COMPARISON SLIDER */}
      <section className="bg-slate-50/50 py-24 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs uppercase tracking-wider font-semibold text-gold-400">
              Transformations
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">Clinical Makeover Portfolio</h2>
            <p className="text-sm text-slate-550 font-light">
              Interactive clinical case files showing restorations and veneer designs done right here in Ludhiana.
            </p>
          </div>

          {gallery.length > 0 ? (
            <div className="space-y-8">
              {gallery.map((item) => (
                <BeforeAfterSlider
                  key={item.id}
                  beforeImage={item.beforeUrl}
                  afterImage={item.afterUrl}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-slate-550 text-sm">Loading transformation gallery...</div>
          )}
        </div>
      </section>

      {/* 6. 6-STEP STERILIZATION PROTOCOL */}
      <section className="bg-white py-28 border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-20">
            <span className="text-xs uppercase tracking-wider font-semibold text-gold-400 bg-gold-40/5 border border-gold-455/15 px-4 py-1.5 rounded-full font-display">
              Clinical Hygiene Auditing
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              The 6-Step Sterilization Loop
            </h2>
            <p className="text-sm text-slate-505 font-light leading-relaxed">
              We operate under a strict zero-infection policy. Every instrument pouch is sealed, autoclave-disinfected, and broken open directly in front of you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sterilizationSteps.map((step, idx) => (
              <div
                key={step.title}
                className="bg-white border border-slate-200/80 rounded-[2rem] p-8 space-y-4 relative luxury-glow"
              >
                <div className="absolute right-6 top-6 h-8 w-8 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold text-gold-400 flex items-center justify-center font-mono">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-display">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-light">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION */}
      <section className="bg-slate-50/50 py-28 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-20">
            <span className="text-xs uppercase tracking-wider font-semibold text-gold-400">
              Patient Feedback
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">Endorsed Locally</h2>
            <p className="text-sm text-slate-500 font-light">
              Read detailed testimonials from patients who got their dental work done at our clinic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white border border-slate-200/80 rounded-[2rem] p-8 flex flex-col justify-between relative luxury-glow"
              >
                <div className="space-y-4">
                  <div className="flex space-x-1.5 text-gold-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold-400 stroke-gold-455" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-650 italic font-light leading-relaxed">"{t.quote}"</p>
                </div>
                <div className="pt-6 border-t border-slate-100 mt-8 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm font-display">{t.name}</h4>
                    <span className="text-xs text-slate-500 font-light">{t.location}</span>
                  </div>
                  <span className="text-[9px] text-gold-455 bg-gold-400/5 border border-gold-455/20 font-bold px-2.5 py-1 rounded uppercase tracking-wider font-sans">
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA LEAD BANNER WITH QUICK INLINE INPUT */}
      <section className="bg-white py-24 border-t border-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gold-455/5 blur-3xl -z-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display font-black">Book Your Consultation Today</h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed font-light">
            Don't delay your dental health. Type in your mobile number below, and Dr. Arvind's receptionist will call you within 15 minutes to answer pricing questions and book your schedule.
          </p>

          <div className="max-w-md mx-auto bg-slate-50 border border-slate-200/80 p-5 rounded-2xl space-y-3 shadow-inner">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center justify-center">
              <PhoneCall className="h-3.5 w-3.5 text-gold-400 mr-1.5 animate-pulse" />
              Quick callback request:
            </span>
            
            {!bottomSubmitted ? (
              <form onSubmit={(e) => handleQuickSubmit(e, bottomPhone, 'bottom')} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="tel"
                  required
                  value={bottomPhone}
                  onChange={(e) => setBottomPhone(e.target.value)}
                  placeholder="Enter 10-digit mobile number"
                  className="flex-grow bg-white border border-slate-205 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-gold-400 font-mono"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-5 py-3 rounded-xl transition-all uppercase tracking-widest font-display whitespace-nowrap active:scale-95"
                >
                  Call Me
                </button>
              </form>
            ) : (
              <div className="text-xs text-green-600 font-semibold flex items-center justify-center bg-green-500/10 p-2.5 rounded-lg border border-green-500/25">
                <Check className="h-4 w-4 mr-2" />
                Callback logged! We will call you shortly.
              </div>
            )}
          </div>

          <div className="flex justify-center items-center space-x-6 text-xs font-semibold uppercase tracking-widest font-display">
            <button
              onClick={triggerBooking}
              className="text-blue-650 hover:text-blue-800 flex items-center hover:underline"
            >
              Detailed Booking Form
            </button>
            <button
              onClick={openWhatsApp}
              className="text-slate-655 hover:text-slate-900 flex items-center hover:underline"
            >
              WhatsApp Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
