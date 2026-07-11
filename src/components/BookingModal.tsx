'use client';

import { useState, useEffect } from 'react';
import { X, Calendar, User, Phone, CheckCircle, MessageSquare } from 'lucide-react';
import { dataService, TreatmentPrice } from '@/lib/dataService';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [prices, setPrices] = useState<TreatmentPrice[]>([]);
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    treatment: 'Dental Implants',
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [createdApt, setCreatedApt] = useState<any>(null);

  useEffect(() => {
    const config = dataService.getCMSConfig();
    setPrices(config.prices);
    if (config.prices.length > 0) {
      setFormData(prev => ({ ...prev, treatment: config.prices[0].name }));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = dataService.addAppointment({
      patientName: formData.patientName,
      email: 'not-provided@ludhianadental.com', // simplified
      phone: formData.phone,
      date: new Date().toISOString().split('T')[0], // sets today automatically
      time: 'Immediate Callback Requested', // sets immediate callback
      treatment: formData.treatment,
      message: 'Urgent callback requested via 15-minute quick form.',
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

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setCreatedApt(null);
    setFormData({
      patientName: '',
      phone: '',
      treatment: prices[0]?.name || 'Dental Implants',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={handleResetAndClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col text-slate-850">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-900 flex items-center font-display">
            <Calendar className="h-5 w-5 text-gold-450 mr-2" />
            15-Min Callback Request
          </h2>
          <button
            onClick={handleResetAndClose}
            className="text-slate-400 hover:text-slate-650 p-1 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <p className="text-xs text-slate-500 font-light leading-normal">
                No complex schedules or emails required. Fill in your name and phone, and our MDS doctor or receptionist will call you back within 15 minutes to confirm details.
              </p>

              {/* Full Name */}
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Your Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.patientName}
                    onChange={e => setFormData({ ...formData, patientName: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/50 transition-all font-light"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-[10px] font-semibold text-slate-550 uppercase tracking-wider mb-1.5">
                  WhatsApp / Call Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 98765-43210"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/50 transition-all font-light font-mono"
                  />
                </div>
              </div>

              {/* Select Treatment */}
              <div>
                <label className="block text-[10px] font-semibold text-slate-455 uppercase tracking-wider mb-1.5">
                  Interested Treatment
                </label>
                <select
                  value={formData.treatment}
                  onChange={e => setFormData({ ...formData, treatment: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs text-slate-850 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/50 transition-all cursor-pointer font-light"
                >
                  {prices.map(price => (
                    <option key={price.id} value={price.name}>
                      {price.name}
                    </option>
                  ))}
                  <option value="Prosthetic Consultation">Prosthodontics / Implants</option>
                  <option value="General Checkup">General Consultation / Cleaning</option>
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl shadow-lg transition-all hover:scale-[1.01] active:scale-95 text-xs uppercase tracking-wider font-display"
              >
                Request Callback Now
              </button>
            </form>
          ) : (
            <div className="text-center py-8 px-4 space-y-4">
              <CheckCircle className="h-14 w-14 text-gold-400 mx-auto animate-bounce" />
              <h3 className="text-xl font-bold text-slate-900 font-display">Request Submitted!</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-light">
                Thank you, <span className="font-semibold text-slate-850">{formData.patientName}</span>. Your callback request for <span className="font-semibold text-slate-700">{formData.treatment}</span> is queued. Our clinical assistant will reach you shortly on <span className="font-mono text-slate-700 font-semibold">{formData.phone}</span>.
              </p>
              
              <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl text-left text-xs text-slate-550 leading-relaxed font-light">
                <span className="text-[9px] uppercase font-bold text-gold-550 tracking-wider block mb-1">
                  Want instant answers?
                </span>
                Click the button below to text Dr. Arvind directly on WhatsApp.
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleWhatsAppRedirect}
                  className="flex-1 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider font-display transition-all"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Text Doctor Now
                </button>
                <button
                  onClick={handleResetAndClose}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider font-display transition-all border border-slate-200"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
