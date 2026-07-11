'use client';

import {
  ShieldCheck,
  Star,
  Award,
  BookOpen,
  Calendar,
  MessageSquare,
  Sparkles,
  Users
} from 'lucide-react';
import { dataService } from '@/lib/dataService';

export default function DoctorsPage() {
  const triggerBooking = () => {
    window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  const openWhatsApp = (doctorName: string) => {
    const link = dataService.getWhatsAppLink('+918847651364', 'Patient', `Consultation with ${doctorName}`);
    window.open(link, '_blank');
  };

  const doctors = [
    {
      name: 'Dr. Arvind Singh',
      role: 'Founder & Senior MDS Implantologist',
      experience: '28+ Years Experience',
      education: 'BDS, MDS Oral & Maxillofacial Prosthodontics (GDC Amritsar)',
      bio: 'Dr. Arvind is a pioneer of computer-guided implant surgeries and full mouth rehabilitation in Punjab. With over 28 years of dental experience, he specializes in treating complex bone-grafting cases and fast-turnaround implantations for international NRI patients.',
      specialties: [
        'Computer-Guided Dental Implants',
        'All-On-4 & All-On-6 Reconstruction',
        'Sinus Lift & Bone Grafting',
        'Full Mouth Porcelain Restorations'
      ],
      photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=450',
      certifications: ['Fellow of International Congress of Oral Implantologists (ICOI, USA)', 'Life Member of Indian Prosthodontic Society (IPS)']
    },
    {
      name: 'Dr. Gurinder Kaur Grewal',
      role: 'Senior MDS Conservative Dentist & Endodontist',
      experience: '15+ Years Experience',
      education: 'BDS, MDS Conservative Dentistry & Endodontics (PGIMER Chandigarh)',
      bio: 'Dr. Gurinder is a specialist in microscopic endodontics and cosmetic dentistry. She focuses on painless, single-sitting root canals using advanced dental lasers, digital smile designing (veneers), and preserving natural tooth structure.',
      specialties: [
        'Single-Session Laser Root Canal (RCT)',
        'IPS E-Max Veneers & Laminates',
        'Laser Gum Reshaping & Contouring',
        'Microscopic Endodontic Retreatment'
      ],
      photo: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400&h=450',
      certifications: ['Certified Digital Smile Designer (DSD, Spain)', 'Certified Laser Endodontist specialist']
    }
  ];

  return (
    <div className="bg-luxury-950 min-h-screen py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-wider font-semibold text-gold-400">
            Clinical Leadership
          </span>
          <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl font-display">
            Our Senior MDS Specialists
          </h1>
          <p className="text-sm text-slate-405 font-light leading-relaxed">
            Unlike standard general practices, all high-value procedures (Implants, Veneers, Root Canals) at Arvind Dental are carried out exclusively by Master-qualified (MDS) dental surgeons.
          </p>
        </div>

        {/* Doctor Profiles List */}
        <div className="space-y-16">
          {doctors.map((doc, idx) => (
            <div
              key={doc.name}
              className="bg-luxury-900 border border-gold-400/10 rounded-[2.5rem] p-8 md:p-12 hover:border-gold-400/20 transition-all flex flex-col lg:flex-row gap-8 lg:gap-12 relative overflow-hidden luxury-glow"
            >
              {/* Background gradient */}
              <div className="absolute right-0 top-0 h-32 w-32 bg-gold-500/5 rounded-full blur-3xl"></div>

              {/* Photo Box */}
              <div className="w-full lg:w-72 flex-shrink-0">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-slate-800 shadow-lg">
                  <img
                    src={doc.photo}
                    alt={doc.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-950 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 bg-luxury-950/90 border border-slate-800 p-3 rounded-2xl backdrop-blur-sm">
                    <span className="text-[9px] text-gold-400 font-bold uppercase tracking-widest block font-display">
                      Active Practice
                    </span>
                    <span className="text-xs text-white font-semibold flex items-center mt-0.5">
                      <ShieldCheck className="h-4 w-4 text-emerald-400 mr-1" />
                      Licensed MDS Surgeon
                    </span>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="flex-grow space-y-6 flex flex-col justify-between">
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="bg-gold-500/10 text-gold-400 border border-gold-500/20 text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded">
                        {doc.experience}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight font-display">{doc.name}</h2>
                    <p className="text-sm font-semibold text-slate-400">{doc.role}</p>
                    <p className="text-xs text-slate-500 font-medium flex items-center pt-1">
                      <BookOpen className="h-3.5 w-3.5 text-gold-400 mr-2" />
                      {doc.education}
                    </p>
                  </div>

                  <p className="text-sm text-slate-405 font-light leading-relaxed border-t border-slate-950 pt-4">
                    {doc.bio}
                  </p>

                  {/* Specialties grid */}
                  <div className="space-y-2">
                    <span className="text-[9px] uppercase font-bold text-gold-400 tracking-widest block">
                      Clinical Focus:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-350 font-light">
                      {doc.specialties.map((spec) => (
                        <div key={spec} className="flex items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-gold-400 mr-2.5 flex-shrink-0"></span>
                          {spec}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="space-y-2 border-t border-slate-950 pt-4">
                    <span className="text-[9px] uppercase font-bold text-gold-400 tracking-widest block">
                      Certifications & Affiliations:
                    </span>
                    <div className="space-y-2 text-xs text-slate-400 font-light">
                      {doc.certifications.map((cert) => (
                        <div key={cert} className="flex items-start">
                          <Award className="h-4 w-4 text-gold-400 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-950 mt-6">
                  <button
                    onClick={triggerBooking}
                    className="flex-grow bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full text-xs uppercase tracking-wider font-display transition-colors"
                  >
                    Consult with {doc.name.split(' ')[1]}
                  </button>
                  <button
                    onClick={() => openWhatsApp(doc.name)}
                    className="flex-grow bg-luxury-950 border border-slate-800 hover:border-gold-400/20 text-slate-350 font-semibold py-3 rounded-full text-xs uppercase tracking-wider font-display flex items-center justify-center transition-colors"
                  >
                    <MessageSquare className="h-4 w-4 text-green-500 mr-2" />
                    WhatsApp Chat
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
