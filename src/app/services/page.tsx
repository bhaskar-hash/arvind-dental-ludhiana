'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  Calendar,
  MessageSquare,
  Clock,
  ArrowRight,
  TrendingDown,
  DollarSign
} from 'lucide-react';
import { dataService, TreatmentPrice } from '@/lib/dataService';

export default function ServicesPage() {
  const [prices, setPrices] = useState<TreatmentPrice[]>([]);

  useEffect(() => {
    const config = dataService.getCMSConfig();
    setPrices(config.prices);
  }, []);

  const triggerBooking = () => {
    window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  const openWhatsApp = (treatment: string) => {
    const link = dataService.getWhatsAppLink('+918847651364', 'Patient', treatment);
    window.open(link, '_blank');
  };

  const serviceCategories = [
    {
      id: 'implants',
      name: 'Premium Dental Implants',
      description: 'Replace missing teeth permanently with biocompatible titanium implants. We use premium Korean (Osstem) and Swiss (Straumann) implants with lifetime warranty options.',
      duration: '7 Days Express (including crowns)',
      qualification: 'MDS Oral Implantologist',
      slug: 'implants',
    },
    {
      id: 'smile-designing',
      name: 'Cosmetic Veneers & Smile Design',
      description: 'Transform chipped, stained, or misaligned teeth into a bright, symmetrical smile with custom composite bonding or translucent porcelain veneers (E-Max).',
      duration: '5 to 7 Days Full Set',
      qualification: 'MDS Aesthetic Dentist',
      slug: 'smile-designing',
    },
    {
      id: 'root-canal',
      name: 'Painless Laser Root Canal (RCT)',
      description: 'Single-sitting endodontic therapy utilizing advanced dental lasers and rotary files. Eliminates infection and pain while saving the natural tooth structure.',
      duration: 'Single Sitting (45 mins)',
      qualification: 'MDS Endodontist Specialist',
      slug: 'root-canal',
    }
  ];

  return (
    <div className="bg-luxury-950 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-wider font-semibold text-gold-400">
            Our Specialties
          </span>
          <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl font-display">
            Treatments & Dynamic Rates
          </h1>
          <p className="text-sm text-slate-400 font-light leading-relaxed">
            Transparent pricing with no hidden charges. Check out our standard rates for Ludhiana locals and exchange estimates for NRIs, saving up to 80% compared to Western countries.
          </p>
        </div>

        {/* Services & Pricing Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Detailed Service Blocks */}
          <div className="lg:col-span-8 space-y-10">
            {serviceCategories.map((service) => (
              <div
                key={service.id}
                className="bg-luxury-900 border border-gold-400/10 rounded-[2rem] p-8 hover:border-gold-400/20 transition-all space-y-6 relative overflow-hidden luxury-glow"
              >
                {/* Visual accent */}
                <div className="absolute right-0 top-0 h-24 w-24 bg-gold-500/5 rounded-full blur-2xl"></div>

                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex items-center text-xs text-slate-300 bg-luxury-950 px-3.5 py-1.5 rounded-full border border-slate-900 font-light">
                      <Clock className="h-3.5 w-3.5 text-gold-400 mr-2 flex-shrink-0" />
                      {service.duration}
                    </span>
                    <span className="flex items-center text-xs text-slate-300 bg-luxury-950 px-3.5 py-1.5 rounded-full border border-slate-900 font-light">
                      <ShieldCheck className="h-3.5 w-3.5 text-gold-400 mr-2 flex-shrink-0" />
                      {service.qualification}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white hover:text-gold-400 transition-colors font-display">
                    {service.name}
                  </h2>
                  <p className="text-sm text-slate-405 font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Subpage CTA */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-950">
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-xs text-gold-455 hover:text-gold-300 font-bold uppercase tracking-widest flex items-center font-display"
                  >
                    Explore Clinical Guide
                    <ArrowRight className="h-3.5 w-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => openWhatsApp(service.name)}
                      className="bg-luxury-950 hover:bg-slate-850 border border-slate-800 p-3 rounded-full text-green-500 hover:text-green-400 transition-colors cursor-pointer"
                      title="Consult on WhatsApp"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </button>
                    <button
                      onClick={triggerBooking}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-5 py-2.5 rounded-full transition-colors uppercase tracking-wider font-display"
                    >
                      Request Slot
                    </button>
                  </div>
                </div>
              </div>
            ))}
          
          {/* CROWN COMPARISON GUIDE (ZIRCONIA VS PFM) */}
          <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 shadow-xl mt-12 space-y-8 luxury-glow">
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <span className="text-xs uppercase tracking-wider font-bold text-gold-455">
                Clinical Comparison
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 font-display">
                Crown Comparison Guide: Zirconia vs. PFM
              </h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Choosing the right dental crown affects aesthetics, durability, and gum health. Read our head-to-head comparison before selecting your prosthetic treatment.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="p-3.5 font-bold text-slate-900 uppercase tracking-wider">Feature</th>
                    <th className="p-3.5 font-bold text-slate-900 uppercase tracking-wider bg-gold-455/5 text-gold-455">
                      Zirconia Crown (Starts at ₹4,000*)
                    </th>
                    <th className="p-3.5 font-bold text-slate-900 uppercase tracking-wider bg-navy-950/5 text-navy-950">
                      PFM Crown (Starts at ₹2,000*)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-light text-slate-655">
                  {[
                    { f: "Material Base", z: "100% Metal-Free (Pure Aesthetics, Maximum Strength)", p: "Metal Base with Porcelain (Cost-Effective Solution)" },
                    { f: "Strength", z: "Exceptional strength; highly durable & fracture resistant", p: "Good strength; metal base provides reliable durability" },
                    { f: "Aesthetics", z: "Superior aesthetics with natural translucency (looks like real teeth)", p: "Good aesthetics with tooth-colored porcelain on the outside" },
                    { f: "Biocompatibility", z: "Fully biocompatible; gentle on gums and safe for the body", p: "Contains metal alloy inside" },
                    { f: "Stain Resistance", z: "Excellent color stability with a long-lasting shine", p: "Prone to staining; metal margin may show over time" },
                    { f: "Best Suited For", z: "Both Front & Back Teeth", p: "Mainly Back Teeth" }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">{row.f}</td>
                      <td className="p-3.5 bg-gold-455/5 font-medium text-slate-800">{row.z}</td>
                      <td className="p-3.5 bg-navy-950/5 text-slate-600">{row.p}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-slate-50 p-4.5 rounded-2xl text-[11px] text-slate-500 font-light leading-relaxed">
              ⚠️ <strong>Note:</strong> Starting rates are per single crown unit. Base rates exclude diagnostic X-rays or custom root canal therapies. Dr. Arvind Sahu (MDS) will recommend the ideal option matching your jawbone bite pattern.
            </div>
          </div>
          </div>

          {/* Right Column: Live Pricing Widget */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200/80 rounded-[2rem] p-6 shadow-xl space-y-6 sticky top-24 luxury-glow">
              <div className="space-y-2 pb-4 border-b border-slate-100">
                <span className="text-[9px] font-bold text-gold-455 uppercase tracking-widest block">
                  Transparency Guarantee
                </span>
                <h3 className="text-lg font-bold text-slate-900 flex items-center font-display">
                  <DollarSign className="h-4.5 w-4.5 text-gold-400 mr-1" />
                  Treatment Rate List
                </h3>
                <p className="text-xs text-slate-500 leading-normal font-light">
                  Standard clinical rates in Indian Rupees (INR) for local treatments.
                </p>
              </div>

              {/* Price Rows */}
              <div className="space-y-4">
                {prices.map((p) => (
                  <div
                    key={p.id}
                    className="flex justify-between items-start space-x-4 py-3.5 border-b border-slate-100 last:border-b-0"
                  >
                    <span className="text-xs text-slate-700 font-medium leading-normal font-light">
                      {p.name}
                    </span>
                    <div className="text-right flex-shrink-0">
                      <span className="text-xs font-bold text-slate-900 block font-mono">{p.price}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quality Compare Note */}
              <div className="bg-slate-50 border border-slate-200/80 p-4.5 rounded-2xl text-xs space-y-2">
                <div className="flex items-center text-gold-455 font-semibold uppercase tracking-wider text-[9px] font-display">
                  <ShieldCheck className="h-4.5 w-4.5 mr-1" />
                  Our Quality Pledge
                </div>
                <p className="text-slate-500 leading-relaxed font-light">
                  All dental implants, root canals, and orthodontic procedures are performed by certified MDS specialists using sterile, single-use, Class-B autoclaved instruments.
                </p>
              </div>

              {/* Quick Consultation CTA */}
              <button
                onClick={triggerBooking}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl text-xs uppercase tracking-widest font-display transition-colors shadow-lg shadow-blue-500/10 active:scale-95"
              >
                Request Callback Booking
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
