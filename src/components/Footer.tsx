'use client';

import Link from 'next/link';
import { HeartPulse, Mail, MapPin, Phone, Clock, Award } from 'lucide-react';
import { useEffect, useState } from 'react';
import { dataService, OperatingHours } from '@/lib/dataService';

export default function Footer() {
  const [hours, setHours] = useState<OperatingHours[]>([]);

  useEffect(() => {
    const config = dataService.getCMSConfig();
    if (config && config.hours) {
      setHours(config.hours);
    }
  }, []);

  return (
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-205/85 mt-auto">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand & Credentials */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <HeartPulse className="h-8 w-8 text-gold-400" />
              <div>
                <span className="text-xl font-bold tracking-tight text-slate-900 block font-display">
                  Arvind <span className="text-gold-455">Dental</span>
                </span>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest block -mt-1 font-semibold">
                  Ludhiana • Best Speciality Care
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-500 font-light leading-relaxed">
              Rated as the best dental clinic in Ludhiana, Punjab. Providing premium prosthodontic restorations, painless laser root canals, and invisible aligners led by certified MDS specialists.
            </p>
            <div className="flex items-center space-x-2 text-xs bg-white border border-slate-200/60 p-3.5 rounded-2xl text-slate-700 font-light luxury-glow">
              <Award className="h-5 w-5 text-gold-400 flex-shrink-0" />
              <span>ISO 9001:2015 Certified & Class-B Autoclave Sterilized Clinic.</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-display">Quick Links</h3>
            <ul className="space-y-3 text-sm font-light">
              <li>
                <Link href="/" className="hover:text-gold-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-gold-400 transition-colors">Treatments Offered</Link>
              </li>
              <li>
                <Link href="/doctors" className="hover:text-gold-400 transition-colors">Our Specialists</Link>
              </li>
              <li>
                <Link href="/dental-monitor" className="hover:text-gold-400 transition-colors font-semibold text-gold-550">Free Oral Scanner</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gold-400 transition-colors">Clinical Blog</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-400 transition-colors">Contact & Booking</Link>
              </li>
              <li>
                <Link href="/admin" className="text-xs text-slate-400 hover:text-gold-400 transition-colors block pt-3 border-t border-slate-200/60">
                  Doctor Login Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Treatments */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-display">Services</h3>
            <ul className="space-y-3 text-sm font-light">
              <li>
                <Link href="/services/implants" className="hover:text-gold-400 transition-colors">Dental Implants</Link>
              </li>
              <li>
                <Link href="/services/smile-designing" className="hover:text-gold-400 transition-colors">Veneers & Smile Designing</Link>
              </li>
              <li>
                <Link href="/services/root-canal" className="hover:text-gold-400 transition-colors">Laser Root Canal (RCT)</Link>
              </li>
              <li>
                <Link href="/services/implants" className="hover:text-gold-450 transition-colors">All-On-4 Full Arch Rehab</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-gold-455 transition-colors">Clear Aligners (Invisalign)</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Hours */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-display">Timings & Address</h3>
            <div className="space-y-4 text-sm font-light">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gold-455 flex-shrink-0 mt-0.5" />
                <span>12-B, HIG Flats, Opp. Rose Garden, Main Model Town Road, Ludhiana, Punjab - 141001</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gold-455 flex-shrink-0" />
                <a href="tel:+918847651364" className="hover:text-slate-900 transition-colors font-mono font-medium">+91 88476-51364</a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gold-455 flex-shrink-0" />
                <a href="mailto:info@ludhianadental.com" className="hover:text-slate-900 transition-colors">info@ludhianadental.com</a>
              </div>
              <div className="flex items-start space-x-3 border-t border-slate-205 pt-3">
                <Clock className="h-5 w-5 text-gold-455 flex-shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  {hours.slice(0, 7).map((item) => (
                    <div key={item.day} className="flex justify-between w-48 font-light">
                      <span className="font-semibold text-slate-700">{item.day}:</span>
                      <span className={item.closed ? 'text-red-500 font-light' : 'text-slate-505 font-mono text-xs'}>
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Copyright Bar */}
      <div className="border-t border-slate-200 bg-slate-100/50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-light">
          <p>© {new Date().getFullYear()} Arvind Dental Clinic. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link href="/" className="hover:text-slate-800 transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-slate-800 transition-colors">Terms of Service</Link>
            <Link href="/admin" className="hover:text-slate-800 transition-colors">Doctor Dashboard</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
