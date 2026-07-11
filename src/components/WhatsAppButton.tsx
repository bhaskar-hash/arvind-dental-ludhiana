'use client';

import { MessageSquare, PhoneCall } from 'lucide-react';
import { dataService } from '@/lib/dataService';

export default function WhatsAppButton() {
  const whatsappUrl = dataService.getWhatsAppLink('+918847651364', 'Patient', 'General Consultation');

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
      {/* Call Button */}
      <a
        href="tel:+918847651364"
        className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-110 active:scale-95 group relative"
        title="Call Doctor"
      >
        <PhoneCall className="h-6 w-6" />
        <span className="absolute right-14 bg-slate-900 border border-slate-800 text-white text-xs px-2.5 py-1 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          Call Now: +91 88476-51364
        </span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-110 active:scale-95 group relative"
        title="WhatsApp Quick Consult"
      >
        <MessageSquare className="h-6 w-6" />
        <span className="absolute right-14 bg-slate-900 border border-slate-800 text-white text-xs px-2.5 py-1 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          WhatsApp Doctor
        </span>
      </a>
    </div>
  );
}
