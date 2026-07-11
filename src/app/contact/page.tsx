'use client';

import { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  MessageSquare,
  Sparkles,
  Map,
  Navigation,
  Globe,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { dataService, OperatingHours, TreatmentPrice } from '@/lib/dataService';

interface FAQItem {
  question: string;
  answer: string;
}

interface LanguageFAQs {
  en: FAQItem[];
  pa: FAQItem[];
  hi: FAQItem[];
}

export default function ContactPage() {
  const [hours, setHours] = useState<OperatingHours[]>([]);
  const [prices, setPrices] = useState<TreatmentPrice[]>([]);
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    treatment: '',
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [createdApt, setCreatedApt] = useState<any>(null);

  // Multilingual FAQ States
  const [activeLang, setActiveLang] = useState<'en' | 'pa' | 'hi'>('en');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  useEffect(() => {
    const config = dataService.getCMSConfig();
    setHours(config.hours);
    setPrices(config.prices);
    if (config.prices.length > 0) {
      setFormData({
        patientName: '',
        phone: '',
        treatment: config.prices[0].name,
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = dataService.addAppointment({
      patientName: formData.patientName,
      email: 'not-provided@ludhianadental.com',
      phone: formData.phone,
      date: new Date().toISOString().split('T')[0],
      time: 'Immediate Callback Requested',
      treatment: formData.treatment,
      message: 'Urgent callback requested via 15-minute contact form.',
    });
    setCreatedApt(result);
    setIsSuccess(true);
  };

  const handleWhatsAppRedirect = () => {
    if (!createdApt) return;
    const link = dataService.getWhatsAppLink(
      createdApt.phone,
      createdApt.patientName,
      createdApt.treatment
    );
    window.open(link, '_blank');
  };

  const handleResetForm = () => {
    setIsSuccess(false);
    setCreatedApt(null);
    setFormData({
      patientName: '',
      phone: '',
      treatment: prices[0]?.name || '',
    });
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  // Structured multi-language FAQ data
  const faqs: LanguageFAQs = {
    en: [
      {
        question: "Does the dental restoration procedure hurt?",
        answer: "No. With our advanced dental lasers and computerized anesthesia delivery, procedures like single-sitting root canals and implant fittings are completely painless and stress-free."
      },
      {
        question: "What is the warranty on dental implants?",
        answer: "We offer lifetime global warranties on premium Swiss Straumann and Swedish Nobel Biocare systems. If you fly back to Canada or the UK, any partner clinic can service it."
      },
      {
        question: "How long does a full smile makeover take?",
        answer: "For NRI patients, we offer a 7-day express timeline. Your digital 3D mapping is done on Day 1, and custom milled Zirconia crowns or veneers are bonded by Day 6."
      }
    ],
    pa: [
      {
        question: "ਕੀ ਇਲਾਜ ਦੌਰਾਨ ਦਰਦ ਹੁੰਦਾ ਹੈ? (Ki treatment vich dard hunda hai?)",
        answer: "ਬਿਲਕੁਲ ਨਹੀਂ। ਸਾਡੀ ਲੇਜ਼ਰ ਤਕਨੀਕ ਅਤੇ ਸੀਨੀਅਰ ਐਮ.ਡੀ.ਐਸ. ਡਾਕਟਰਾਂ ਦੀ ਦੇਖ-ਰੇਖ ਵਿੱਚ ਸਾਰੇ ਇਲਾਜ (ਜਿਵੇਂ ਕਿ ਰੂਟ ਕੈਨਾਲ ਅਤੇ ਇਮਪਲਾਂਟ) ਬਿਨਾਂ ਦਰਦ ਦੇ ਕੀਤੇ ਜਾਂਦੇ ਹਨ।"
      },
      {
        question: "ਇਮਪਲਾਂਟ ਦੀ ਵਾਰੰਟੀ ਕਿੰਨੀ ਹੈ?",
        answer: "ਅਸੀਂ ਸਵਿਸ ਸਟ੍ਰਾਮੈਨ ਇਮਪਲਾਂਟ 'ਤੇ ਲਾਈਫਟਾਈਮ (ਉਮਰ ਭਰ ਦੀ) ਗਲੋਬਲ ਵਾਰੰਟੀ ਦਿੰਦੇ ਹਾਂ। ਕੈਨੇਡਾ ਜਾਂ ਯੂ.ਕੇ. ਵਿੱਚ ਵੀ ਇਸਦੀ ਵਾਰੰਟੀ ਵੈਧ ਰਹੇਗੀ।"
      },
      {
        question: "ਇਲਾਜ ਵਿੱਚ ਕਿੰਨੇ ਦਿਨ ਲੱਗਦੇ ਹਨ?",
        answer: "ਐਨ.ਆਰ.ਆਈ. ਮਰੀਜ਼ਾਂ ਲਈ ਸਾਡੇ ਕੋਲ ਖਾਸ 7-ਦਿਨਾਂ ਦਾ ਐਕਸਪ੍ਰੈਸ ਇਲਾਜ ਕੋਰਸ ਹੈ, ਜਿਸ ਵਿੱਚ 3D ਸਕੈਨ ਤੋਂ ਲੈ ਕੇ ਕ੍ਰਾਊਨ ਫਿਟਿੰਗ ਤੱਕ ਦਾ ਕੰਮ ਇੱਕ ਹਫ਼ਤੇ ਵਿੱਚ ਪੂਰਾ ਹੁੰਦਾ ਹੈ।"
      }
    ],
    hi: [
      {
        question: "क्या डेंटल ट्रीटमेंट में दर्द होता है?",
        answer: "बिल्कुल नहीं। हमारे आधुनिक लेज़र-असिस्टेड डेंटिस्ट्री और सीनियर डॉक्टरों की निगरानी में सभी इलाज बिना किसी दर्द के और बहुत आराम से पूरे किए जाते हैं।"
      },
      {
        question: "दांत के इंप्लांट की क्या वारंटी होती है?",
        answer: "हम स्विस और स्वीडिश इंप्लांट्स पर आजीवन (Lifetime) ग्लोबल वारंटी प्रदान करते हैं, जो विदेशों (कनाडा, यूके) में भी मान्य रहती है।"
      },
      {
        question: "इलाज पूरा होने में कितना समय लगता है?",
        answer: "बाहर से आने वाले मरीजों के लिए हमारे पास 7-दिन का एक्सप्रेस पैकेज है, जिसमें जांच, प्लानिंग और पक्के दांत लगाना एक ही हफ्ते में पूरा हो जाता है।"
      }
    ]
  };

  return (
    <div className="bg-luxury-50 min-h-screen py-20 bg-white text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-wider font-semibold text-gold-400">
            Contact Clinic
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl font-display">
            Schedule Your Priority Callback
          </h1>
          <p className="text-sm text-slate-500 font-light leading-relaxed">
            Enter your details below to get a call from our senior coordinator or find our prosthodontics clinic location on Model Town Road, Ludhiana.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          {/* Left Column: Contact info & Operating Hours */}
          <div className="lg:col-span-5 space-y-8">
            {/* Contact Card */}
            <div className="bg-white border border-slate-205 rounded-[2rem] p-6 space-y-6 luxury-glow">
              <h2 className="text-xl font-bold text-slate-900 font-display">Direct Contacts</h2>
              <div className="space-y-4 text-sm text-slate-600 font-light">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gold-400 flex-shrink-0 mt-0.5" />
                  <span>12-B, HIG Flats, Opp. Rose Garden, Main Model Town Road, Ludhiana, Punjab - 141001</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gold-400 flex-shrink-0" />
                  <a href="tel:+918847651364" className="hover:text-slate-900 transition-colors font-mono font-medium">+91 88476-51364</a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gold-400 flex-shrink-0" />
                  <a href="mailto:info@ludhianadental.com" className="hover:text-slate-900 transition-colors">info@ludhianadental.com</a>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-white border border-slate-205 rounded-[2rem] p-6 space-y-4 luxury-glow">
              <h2 className="text-xl font-bold text-slate-900 flex items-center font-display">
                <Clock className="h-5 w-5 text-gold-400 mr-2" />
                Clinic Hours
              </h2>
              <div className="space-y-3 text-sm">
                {hours.map((item) => (
                  <div key={item.day} className="flex justify-between border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
                    <span className="font-semibold text-slate-600 font-light">{item.day}</span>
                    <span className={item.closed ? 'text-red-500 font-light' : 'text-slate-500 font-mono text-xs'}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Google Map Mock/Embed Block */}
            <div className="bg-white border border-slate-205 rounded-[2rem] p-6 space-y-4 luxury-glow">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900 flex items-center font-display">
                  <Map className="h-5 w-5 text-gold-400 mr-2" />
                  Location Locator
                </h2>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gold-400 hover:text-gold-300 flex items-center font-semibold uppercase tracking-widest font-display"
                >
                  <Navigation className="h-3.5 w-3.5 mr-1" />
                  Navigate
                </a>
              </div>
              
              {/* Visual Map Placeholder */}
              <div className="relative w-full aspect-[16/10] bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 flex items-center justify-center text-center p-6">
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>
                <div className="space-y-2 relative z-10">
                  <MapPin className="h-8 w-8 text-gold-400 mx-auto animate-bounce" />
                  <span className="text-xs text-slate-900 font-bold block font-display">Arvind Prosthodontics Clinic</span>
                  <span className="text-[10px] text-slate-500 block font-light">Opposite Rose Garden, HIG Market, Model Town Road</span>
                  <span className="text-[10px] text-gold-400 bg-gold-400/5 px-2.5 py-0.5 rounded border border-gold-400/20 inline-block font-semibold">
                    Ludhiana, Punjab
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Simplified Booking Form */}
          <div className="lg:col-span-7 bg-white border border-slate-205 rounded-[2rem] p-8 relative overflow-hidden luxury-glow">
            <div className="absolute right-0 top-0 h-24 w-24 bg-gold-500/5 rounded-full blur-2xl"></div>

            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center font-display">
                    <Sparkles className="h-5 w-5 text-gold-400 mr-2" />
                    Quick Callback Request
                  </h2>
                  <p className="text-xs text-slate-500 font-light font-sans">
                    Skip emails and dates. Give us your name and phone, and our clinical assistant will call you back in 15 minutes to confirm.
                  </p>
                </div>

                {/* Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.patientName}
                    onChange={e => setFormData({ ...formData, patientName: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/50 transition-all font-light"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Phone Number (WhatsApp Preferred)
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 98765-43210"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/50 transition-all font-light font-mono"
                  />
                </div>

                {/* Select Treatment */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Interested Treatment
                  </label>
                  <select
                    value={formData.treatment}
                    onChange={e => setFormData({ ...formData, treatment: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-xs text-slate-800 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/50 transition-all cursor-pointer font-light"
                  >
                    {prices.map(price => (
                      <option key={price.id} value={price.name}>
                        {price.name}
                      </option>
                    ))}
                    <option value="Prosthetic Consultation">Prosthodontics Consultation</option>
                    <option value="General Consultation">General Checkup / Cleaning</option>
                  </select>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 text-xs uppercase tracking-wider font-display"
                >
                  Request 15-Min Callback
                </button>
              </form>
            ) : (
              <div className="text-center py-12 space-y-6">
                <CheckCircle className="h-16 w-16 text-gold-400 mx-auto animate-pulse" />
                <h3 className="text-2xl font-bold text-slate-900 font-display">Callback Scheduled!</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-md mx-auto font-light">
                  Thank you, <span className="text-slate-900 font-semibold">{formData.patientName}</span>. Your request for <span className="text-slate-700 font-semibold">{formData.treatment}</span> is registered. Our lead receptionist will call you shortly on <span className="font-mono text-slate-900 font-semibold">{formData.phone}</span>.
                </p>

                <div className="bg-slate-50 border border-slate-200/80 p-4.5 rounded-2xl text-left max-w-md mx-auto text-xs text-slate-500 leading-relaxed font-light">
                  <span className="text-[10px] uppercase font-bold text-gold-455 block mb-1 font-display">
                    Connect instantly?
                  </span>
                  Click the WhatsApp button below to text our receptionist directly with your name and details.
                </div>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
                  <button
                    onClick={handleWhatsAppRedirect}
                    className="flex-1 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider font-display transition-all"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat on WhatsApp
                  </button>
                  <button
                    onClick={handleResetForm}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-755 font-semibold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider font-display transition-all border border-slate-200"
                  >
                    Reset Form
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* 4. PREMIUM POLISHED FAQ ACCORDION WITH SEGMENTED SWITCHER */}
        <div className="border-t border-slate-100 pt-16 mt-8 max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-[10px] uppercase tracking-widest font-bold text-gold-455 bg-gold-455/5 border border-gold-455/15 px-3.5 py-1.5 rounded-full inline-block font-display">
              Patient Help Desk
            </span>
            <h3 className="text-2xl font-bold text-slate-900 font-display">Frequently Asked Questions</h3>
            
            {/* Segmented language switcher */}
            <div className="inline-flex p-1 bg-slate-100 rounded-full border border-slate-200/40">
              <button
                onClick={() => { setActiveLang('en'); setOpenFaqIdx(null); }}
                className={`px-5 py-1.5 rounded-full text-xs font-semibold font-display transition-all uppercase tracking-wider ${
                  activeLang === 'en'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                English
              </button>
              <button
                onClick={() => { setActiveLang('pa'); setOpenFaqIdx(null); }}
                className={`px-5 py-1.5 rounded-full text-xs font-semibold font-display transition-all uppercase tracking-wider ${
                  activeLang === 'pa'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                ਪੰਜਾਬੀ
              </button>
              <button
                onClick={() => { setActiveLang('hi'); setOpenFaqIdx(null); }}
                className={`px-5 py-1.5 rounded-full text-xs font-semibold font-display transition-all uppercase tracking-wider ${
                  activeLang === 'hi'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>

          {/* Interactive Accordion items */}
          <div className="space-y-3">
            {faqs[activeLang].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center px-6 py-4.5 text-left focus:outline-none hover:bg-slate-50/50 transition-colors"
                >
                  <span className="text-sm font-bold text-slate-900 font-display pr-4">
                    {faq.question}
                  </span>
                  {openFaqIdx === idx ? (
                    <ChevronUp className="h-4 w-4 text-gold-455 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openFaqIdx === idx ? 'max-h-40 border-t border-slate-100' : 'max-h-0'
                  }`}
                >
                  <p className="p-6 text-xs text-slate-550 leading-relaxed font-light bg-slate-50/30">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
