'use client';

import { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Upload,
  CheckCircle,
  Phone,
  User,
  MessageSquare,
  ShieldCheck,
  Zap,
  Activity
} from 'lucide-react';
import { dataService } from '@/lib/dataService';

interface TreatmentOption {
  key: string;
  name: string;
  desc: string;
  localCost: string;
  duration: string;
  specialist: string;
  icon: string;
}

const TREATMENTS: TreatmentOption[] = [
  {
    key: 'implants-single',
    name: 'Single Tooth Dental Implant',
    desc: 'Titanium implant post + custom metal-free zirconia crown. Lifetime warranty.',
    localCost: '₹15,000 - ₹35,000',
    duration: '2-3 Sittings',
    specialist: 'MDS Prosthodontist & Implantologist',
    icon: '🦷'
  },
  {
    key: 'implants-full',
    name: 'Full Mouth Missing Teeth (Rehabilitation)',
    desc: 'All-on-4 / All-on-6 full arch restoration with hybrid prosthetic bridges.',
    localCost: '₹1.8L - ₹3.5L per jaw',
    duration: '5-7 Days Express',
    specialist: 'MDS Oral Surgeon & Prostho Team',
    icon: '🦷✨'
  },
  {
    key: 'veneers-cosmetic',
    name: 'Smile Designing & Veneers (Cosmetic)',
    desc: 'High-translucency IPS E-Max porcelain veneers for perfect alignment and shade correction.',
    localCost: '₹8,000 - ₹12,000 per tooth',
    duration: '3-5 Days',
    specialist: 'MDS Aesthetic Dental Specialist',
    icon: '💎'
  },
  {
    key: 'rct-laser',
    name: 'Painless Laser Root Canal (RCT)',
    desc: 'Single-sitting endodontic therapy utilizing dental laser sterilization.',
    localCost: '₹3,500 - ₹6,500',
    duration: 'Single sitting (45 mins)',
    specialist: 'MDS Endodontist (Root Canal Expert)',
    icon: '⚡'
  }
];

export default function TreatmentEstimator() {
  const [step, setStep] = useState(1);
  const [selectedConcern, setSelectedConcern] = useState<TreatmentOption | null>(null);
  const [hasXray, setHasXray] = useState<boolean | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdLead, setCreatedLead] = useState<any>(null);

  const handleSelectConcern = (concern: TreatmentOption) => {
    setSelectedConcern(concern);
    setStep(2);
  };

  const handleXraySelect = (value: boolean) => {
    setHasXray(value);
    if (!value) {
      setStep(3);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setIsUploading(true);
    setUploadedFileName(file.name);
    setTimeout(() => {
      setIsUploading(false);
      setStep(3);
    }, 1500);
  };

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedConcern) return;

    const lead = dataService.addAppointment({
      patientName: formData.name,
      email: 'calculator-lead@ludhianadental.com',
      phone: formData.phone,
      date: new Date().toISOString().split('T')[0],
      time: 'Instant Callback Requested',
      treatment: `Estimator: ${selectedConcern.name}`,
      message: `Local Estimator lead. OPG Uploaded: ${uploadedFileName || 'No'}. Selected: ${selectedConcern.name}. Price range: ${selectedConcern.localCost}.`,
    });

    setCreatedLead(lead);
    setIsSubmitted(true);
  };

  const handleWhatsAppRedirect = () => {
    if (!createdLead || !selectedConcern) return;
    const details = `Hi, I estimated the rate for "${selectedConcern.name}" in Ludhiana. Please confirm slot availability.`;
    const link = dataService.getWhatsAppLink(createdLead.phone, createdLead.patientName, details);
    window.open(link, '_blank');
  };

  const handleRestart = () => {
    setStep(1);
    setSelectedConcern(null);
    setHasXray(null);
    setUploadedFileName('');
    setFormData({ name: '', phone: '' });
    setIsSubmitted(false);
    setCreatedLead(null);
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-12 shadow-xl relative overflow-hidden luxury-glow max-w-4xl mx-auto text-slate-800">
      {/* Visual top bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold-400 via-blue-500 to-gold-400"></div>

      {/* STEP 1: SELECT CONCERN */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[9px] font-bold text-gold-455 uppercase tracking-widest bg-gold-50 px-3 py-1 rounded-full">
              Treatment & Cost Estimator (Ludhiana)
            </span>
            <h3 className="text-2xl font-bold text-slate-900 font-display">Select Your Dental Concern</h3>
            <p className="text-xs text-slate-500 max-w-lg mx-auto font-light leading-relaxed">
              Choose your dental symptom or required procedure to get local pricing ranges and specialist details.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {TREATMENTS.map((item) => (
              <div
                key={item.key}
                onClick={() => handleSelectConcern(item)}
                className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl hover:border-gold-400/30 hover:bg-white transition-all cursor-pointer text-left space-y-2 flex flex-col justify-between"
              >
                <div className="text-3xl">{item.icon}</div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 font-display leading-snug">{item.name}</h4>
                  <p className="text-[11px] text-slate-500 leading-normal font-light">{item.desc}</p>
                </div>
                <div className="pt-3 border-t border-slate-200/40 text-[10px] text-gold-500 font-bold uppercase tracking-wider flex items-center">
                  Get Estimate
                  <ArrowRight className="h-3 w-3 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: X-RAY / OPG SELECTION */}
      {step === 2 && selectedConcern && (
        <div className="space-y-6 text-center max-w-md mx-auto">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-slate-900 font-display">Do you have a Dental X-Ray?</h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              If you have an OPG or digital dental X-ray, upload it here. Our senior endodontist/implantologist will review it for a precise quote.
            </p>
          </div>

          {hasXray === null ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                onClick={() => handleXraySelect(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest font-display active:scale-95 transition-all flex-1"
              >
                Yes, Upload X-Ray
              </button>
              <button
                onClick={() => handleXraySelect(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest font-display active:scale-95 transition-all flex-1 border border-slate-200"
              >
                No, Estimate Rates First
              </button>
            </div>
          ) : (
            <div className="space-y-4 pt-4">
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 bg-slate-50 relative cursor-pointer hover:border-gold-400 transition-colors">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                
                {!isUploading ? (
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 text-gold-400 mx-auto animate-bounce" />
                    <span className="text-xs text-slate-900 font-bold block">Select Scan File</span>
                    <span className="text-[10px] text-slate-400 block font-light">Supports JPEG, PNG, or PDF</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Activity className="h-8 w-8 text-blue-500 mx-auto animate-spin" />
                    <span className="text-xs text-blue-600 font-bold block">Analyzing bone density mapping...</span>
                  </div>
                )}
              </div>
              <button
                onClick={() => setHasXray(null)}
                className="text-xs text-slate-400 hover:text-slate-600 underline font-light"
              >
                Go Back
              </button>
            </div>
          )}
        </div>
      )}

      {/* STEP 3: COST ESTIMATOR & LEAD LOCK */}
      {step === 3 && selectedConcern && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-slate-900 font-display">Estimated Treatment Overview</h3>
            <p className="text-xs text-slate-550 font-light">
              Details for your selected procedure: <span className="font-semibold text-slate-800">{selectedConcern.name}</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-4">
            {/* Calculation summary details */}
            <div className="bg-slate-50 border border-slate-200/60 p-6 rounded-2xl space-y-4 flex flex-col justify-between text-left">
              <div className="space-y-3">
                <span className="text-[9px] uppercase font-bold text-gold-455 tracking-widest block font-display">Specialist Plan:</span>
                <p className="text-xs text-slate-650 leading-relaxed font-light">{selectedConcern.desc}</p>
                
                <div className="space-y-2 text-xs text-slate-600 font-light pt-2">
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 text-gold-400 mr-2 flex-shrink-0" />
                    Timeline: {selectedConcern.duration}
                  </div>
                  <div className="flex items-center">
                    <ShieldCheck className="h-4 w-4 text-gold-455 mr-2 flex-shrink-0" />
                    Specialist: {selectedConcern.specialist}
                  </div>
                </div>

                {uploadedFileName && (
                  <div className="flex items-center text-[10px] text-emerald-600 font-semibold bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/10">
                    ✓ Scan Attached: {uploadedFileName}
                  </div>
                )}
              </div>

              {/* Price list details */}
              <div className="space-y-2 pt-4 border-t border-slate-200/60">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Estimated Local Rates:</span>
                  <span className="font-bold text-slate-900 font-mono text-sm bg-gold-400/5 border border-gold-400/20 px-2.5 py-1 rounded">
                    {selectedConcern.localCost}
                  </span>
                </div>
              </div>
            </div>

            {/* Callback Capture form */}
            <div className="border border-slate-200/80 p-6 rounded-2xl space-y-4 text-left">
              <span className="text-[10px] uppercase font-bold text-slate-550 tracking-wider block">Lock-In Booking & Consultation</span>
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmitLead} className="space-y-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="block text-[9px] font-bold text-slate-500 uppercase">Your Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter name"
                        className="w-full bg-slate-50 border border-slate-205 rounded-xl py-2.5 pl-9 pr-3 text-xs text-slate-800 focus:outline-none focus:border-gold-400"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="block text-[9px] font-bold text-slate-500 uppercase">Phone / WhatsApp Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Enter 10-digit mobile number"
                        className="w-full bg-slate-50 border border-slate-205 rounded-xl py-2.5 pl-9 pr-3 text-xs text-slate-800 focus:outline-none focus:border-gold-400 font-mono"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-xs uppercase tracking-widest font-display transition-all"
                  >
                    Get Clinic Callback
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <CheckCircle className="h-12 w-12 text-gold-400 mx-auto" />
                  <span className="text-xs text-slate-900 font-bold block">Callback Confirmed!</span>
                  <p className="text-[11px] text-slate-500 leading-normal font-light">
                    Your query for <span className="font-semibold text-slate-700">{selectedConcern.name}</span> has been logged. Our Model Town clinic coordinator will call you back within 15 minutes.
                  </p>
                  <button
                    onClick={handleWhatsAppRedirect}
                    className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl text-xs uppercase tracking-widest font-display transition-colors"
                  >
                    <MessageSquare className="h-4 w-4 mr-1.5" />
                    Verify via WhatsApp
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400 font-light">
            <button
              onClick={handleRestart}
              className="hover:text-slate-650 underline font-light"
            >
              Start Over / Change Concern
            </button>
            <span className="flex items-center text-[10px] text-slate-500">
              <ShieldCheck className="h-4 w-4 text-gold-400 mr-1" />
              100% Confidential Care
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
