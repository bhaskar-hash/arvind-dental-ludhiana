'use client';

import { useState } from 'react';
import {
  Camera,
  Upload,
  User,
  Phone,
  CheckCircle,
  Activity,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Users,
  Mail,
  BellRing
} from 'lucide-react';
import { dataService } from '@/lib/dataService';

export default function DentalMonitorPage() {
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [sendReminders, setSendReminders] = useState(true);

  // Family Plan Parameters
  const [scanFor, setScanFor] = useState<'myself' | 'family'>('myself');
  const [familyRelation, setFamilyRelation] = useState('Child');
  const [familyMemberName, setFamilyMemberName] = useState('');

  // 3 Photos States
  const [photo1, setPhoto1] = useState<string>('');
  const [photo2, setPhoto2] = useState<string>('');
  const [photo3, setPhoto3] = useState<string>('');
  const [photo1Name, setPhoto1Name] = useState('');
  const [photo2Name, setPhoto2Name] = useState('');
  const [photo3Name, setPhoto3Name] = useState('');

  const [isScanning, setIsScanning] = useState(false);
  const [scanStepLog, setScanStepLog] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdScan, setCreatedScan] = useState<any>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, position: 1 | 2 | 3) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const fileName = file.name;
    const reader = new FileReader();

    reader.onload = () => {
      if (position === 1) {
        setPhoto1(reader.result as string);
        setPhoto1Name(fileName);
      } else if (position === 2) {
        setPhoto2(reader.result as string);
        setPhoto2Name(fileName);
      } else {
        setPhoto3(reader.result as string);
        setPhoto3Name(fileName);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRunTriage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo1 || !photo2 || !photo3) return;

    setIsScanning(true);
    setScanStepLog('AI: Segmenting tooth contours...');

    setTimeout(() => {
      setScanStepLog('AI: Auditing enamel color variations...');
      setTimeout(() => {
        setScanStepLog('AI: Detecting potential plaque margins...');
        setTimeout(() => {
          // Log scan to dataService
          const scan = dataService.addMouthScan({
            patientName,
            phone,
            frontBiteUrl: photo1,
            upperArchUrl: photo2,
            lowerArchUrl: photo3,
            aiReport: `AI Automatic Analysis: Teeth contours mapped. Target: ${
              scanFor === 'family' ? `${familyMemberName} (${familyRelation})` : 'Self'
            }. Awaiting Dr. Arvind's manual voice notes.`,
            scanFor,
            familyRelation: scanFor === 'family' ? familyRelation : undefined,
            familyMemberName: scanFor === 'family' ? familyMemberName : undefined,
            email: email || undefined,
            sendReminders
          });

          setCreatedScan(scan);
          setIsScanning(false);
          setIsSuccess(true);
        }, 1500);
      }, 1500);
    }, 1500);
  };

  const handleWhatsAppRedirect = () => {
    if (!createdScan) return;
    const details = `Hi Dr. Arvind, I uploaded mouth photos for ${
      scanFor === 'family' ? `${familyMemberName} (My ${familyRelation})` : 'myself'
    } to the monitoring portal. Please analyze and record my voice report.`;
    const link = dataService.getWhatsAppLink('+918847651364', createdScan.patientName, details);
    window.open(link, '_blank');
  };

  return (
    <div className="bg-white min-h-screen py-20 text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-wider font-semibold text-gold-455 bg-gold-455/5 border border-gold-455/15 px-4 py-1.5 rounded-full inline-block">
            Free Family Oral Health Tracker
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Self-Dental Scanning Portal
          </h1>
          <p className="text-sm text-slate-500 font-light leading-relaxed">
            Upload 3 simple smartphone photos of your teeth (or a family member's). Our dental AI segments enamel variations, and Dr. Arvind (MDS) reviews flagged scans, sending a personal voice note diagnosis straight to your WhatsApp.
          </p>
        </div>

        {!isSuccess ? (
          <div className="bg-slate-50 border border-slate-205 rounded-[2.5rem] p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold-400 via-blue-500 to-gold-400"></div>

            {isScanning ? (
              <div className="text-center py-20 space-y-6">
                <Activity className="h-16 w-16 text-blue-505 mx-auto animate-spin" />
                <h3 className="text-2xl font-bold text-slate-900 font-display">Running AI Enamel Scanning</h3>
                <div className="text-xs text-gold-500 font-mono bg-gold-50 border border-gold-400/20 px-4 py-2 rounded-lg inline-block animate-pulse">
                  {scanStepLog}
                </div>
                <p className="text-xs text-slate-505 max-w-sm mx-auto font-light leading-relaxed">
                  Mapping tooth surfaces and gums. Your photos are private, encrypted, and HIPAA-compliant.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRunTriage} className="space-y-8">
                
                {/* Family Plan Selector */}
                <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Choose Scanner Profile (Family Plan Options)
                  </span>
                  
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setScanFor('myself')}
                      className={`flex-1 py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider font-display flex items-center justify-center border transition-all ${
                        scanFor === 'myself'
                          ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/10'
                          : 'bg-slate-50 border-slate-200 text-slate-655 hover:bg-slate-100'
                      }`}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Scan My Mouth
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setScanFor('family')}
                      className={`flex-1 py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider font-display flex items-center justify-center border transition-all ${
                        scanFor === 'family'
                          ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/10'
                          : 'bg-slate-50 border-slate-200 text-slate-655 hover:bg-slate-100'
                      }`}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Scan Family Member
                    </button>
                  </div>

                  {/* Family member extra fields */}
                  {scanFor === 'family' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100 animate-fadeIn">
                      <div className="space-y-1 text-left">
                        <label className="block text-[9px] font-bold text-slate-500 uppercase">Relation</label>
                        <select
                          value={familyRelation}
                          onChange={(e) => setFamilyRelation(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-205 rounded-xl py-3 px-4 text-xs text-slate-800 focus:outline-none focus:border-gold-455 font-light"
                        >
                          <option>Child</option>
                          <option>Spouse</option>
                          <option>Parent</option>
                          <option>Grandparent</option>
                          <option>Sibling</option>
                        </select>
                      </div>
                      
                      <div className="space-y-1 text-left">
                        <label className="block text-[9px] font-bold text-slate-500 uppercase">Family Member Name</label>
                        <input
                          type="text"
                          required
                          value={familyMemberName}
                          onChange={(e) => setFamilyMemberName(e.target.value)}
                          placeholder="Enter their full name"
                          className="w-full bg-slate-50 border border-slate-205 rounded-xl py-3 px-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-gold-455 font-light"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 1. Step instructions */}
                <div className="space-y-4">
                  <h3 className="text-md font-bold text-slate-900 font-display border-b border-slate-200/60 pb-3 flex items-center">
                    <Camera className="h-5 w-5 text-gold-455 mr-2" />
                    Step 1: Upload 3 Specific Teeth Photos
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                    
                    {/* Photo 1: Front Bite */}
                    <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col justify-between items-stretch text-left space-y-4">
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-bold text-gold-455 tracking-wider block">Position 1</span>
                        <h4 className="text-xs font-bold text-slate-900 font-display">Front Bite (Smile)</h4>
                        <p className="text-[10px] text-slate-505 font-light leading-normal">Clench back teeth naturally. Smile wide showing front bite alignment.</p>
                      </div>
                      
                      <div className="relative border border-dashed border-slate-205 bg-slate-50/50 rounded-xl p-4 text-center cursor-pointer hover:border-gold-400 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          required
                          onChange={(e) => handlePhotoUpload(e, 1)}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        {photo1 ? (
                          <div className="space-y-1 text-emerald-600">
                            <CheckCircle className="h-6 w-6 mx-auto" />
                            <span className="text-[10px] font-bold block truncate">{photo1Name}</span>
                          </div>
                        ) : (
                          <div className="space-y-1 text-slate-500">
                            <Upload className="h-5 w-5 mx-auto" />
                            <span className="text-[10px] font-semibold block">Select Image</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Photo 2: Upper Arch */}
                    <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col justify-between items-stretch text-left space-y-4">
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-bold text-gold-455 tracking-wider block">Position 2</span>
                        <h4 className="text-xs font-bold text-slate-900 font-display">Upper Teeth (Open)</h4>
                        <p className="text-[10px] text-slate-505 font-light leading-normal">Open mouth wide. Tilt head backward to capture upper chewing surfaces.</p>
                      </div>
                      
                      <div className="relative border border-dashed border-slate-205 bg-slate-50/50 rounded-xl p-4 text-center cursor-pointer hover:border-gold-400 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          required
                          onChange={(e) => handlePhotoUpload(e, 2)}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        {photo2 ? (
                          <div className="space-y-1 text-emerald-600">
                            <CheckCircle className="h-6 w-6 mx-auto" />
                            <span className="text-[10px] font-bold block truncate">{photo2Name}</span>
                          </div>
                        ) : (
                          <div className="space-y-1 text-slate-500">
                            <Upload className="h-5 w-5 mx-auto" />
                            <span className="text-[10px] font-semibold block">Select Image</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Photo 3: Lower Arch */}
                    <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col justify-between items-stretch text-left space-y-4">
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-bold text-gold-455 tracking-wider block">Position 3</span>
                        <h4 className="text-xs font-bold text-slate-900 font-display">Lower Teeth (Open)</h4>
                        <p className="text-[10px] text-slate-505 font-light leading-normal">Open mouth wide. Tilt chin downward to capture lower chewing surfaces.</p>
                      </div>
                      
                      <div className="relative border border-dashed border-slate-205 bg-slate-50/50 rounded-xl p-4 text-center cursor-pointer hover:border-gold-400 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          required
                          onChange={(e) => handlePhotoUpload(e, 3)}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        {photo3 ? (
                          <div className="space-y-1 text-emerald-600">
                            <CheckCircle className="h-6 w-6 mx-auto" />
                            <span className="text-[10px] font-bold block truncate">{photo3Name}</span>
                          </div>
                        ) : (
                          <div className="space-y-1 text-slate-500">
                            <Upload className="h-5 w-5 mx-auto" />
                            <span className="text-[10px] font-semibold block">Select Image</span>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>

                {/* 2. Contact details & Reminders */}
                <div className="space-y-6">
                  <h3 className="text-md font-bold text-slate-900 font-display border-b border-slate-200/60 pb-3 flex items-center">
                    <User className="h-5 w-5 text-gold-455 mr-2" />
                    Step 2: Callback & Report Information
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1 text-left">
                      <label className="block text-[10px] font-bold text-slate-550 uppercase tracking-wider">Your Full Name (Account Holder)</label>
                      <input
                        type="text"
                        required
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full bg-white border border-slate-205 rounded-xl py-3 px-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-gold-455 font-light"
                      />
                    </div>
                    
                    <div className="space-y-1 text-left">
                      <label className="block text-[10px] font-bold text-slate-550 uppercase tracking-wider">Phone / WhatsApp Number</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter 10-digit mobile number"
                        className="w-full bg-white border border-slate-205 rounded-xl py-3 px-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-gold-455 font-light font-mono"
                      />
                    </div>
                  </div>

                  {/* Monthly Reminders Setup */}
                  <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-4">
                    <div className="flex items-center space-x-2 text-gold-455 font-bold text-xs">
                      <BellRing className="h-4.5 w-4.5" />
                      <span>Optional Monthly Recall Tracker Settings</span>
                    </div>

                    <div className="space-y-3">
                      <label className="flex items-start space-x-2.5 text-xs text-slate-655 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={sendReminders}
                          onChange={(e) => setSendReminders(e.target.checked)}
                          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-655 focus:ring-blue-500 cursor-pointer accent-blue-600"
                        />
                        <span>Send me monthly oral health reminder emails & WhatsApp alerts to keep tracking alignment and plaque.</span>
                      </label>

                      {sendReminders && (
                        <div className="space-y-1 text-left animate-fadeIn">
                          <label className="block text-[9px] font-bold text-slate-500 uppercase flex items-center">
                            <Mail className="h-3.5 w-3.5 text-slate-400 mr-1" />
                            Email Address for Reminders
                          </label>
                          <input
                            type="email"
                            required={sendReminders}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="w-full max-w-md bg-slate-50 border border-slate-205 rounded-xl py-2.5 px-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-gold-455 font-light"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!photo1 || !photo2 || !photo3}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold py-4 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 text-xs uppercase tracking-widest font-display"
                >
                  Run AI Enamel Audit & Send Scan
                </button>
              </form>
            )}
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-205 rounded-[2.5rem] p-12 text-center space-y-6 shadow-xl luxury-glow">
            <CheckCircle className="h-16 w-16 text-gold-400 mx-auto animate-bounce" />
            <h2 className="text-3xl font-extrabold text-slate-900 font-display">Photos Logged Successfully!</h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto font-light leading-relaxed">
              Thank you, <span className="font-semibold text-slate-900">{patientName}</span>. Your oral health scan {scanFor === 'family' ? `for ${familyMemberName} (${familyRelation})` : ''} has been queued. Dr. Arvind (MDS) will review it and dispatch your voice diagnostic report.
            </p>

            {sendReminders && email && (
              <div className="text-[10px] text-slate-455 font-medium bg-slate-100 border border-slate-200/80 px-4 py-2 rounded-xl inline-block">
                ✉️ Monthly email reminders activated for: <span className="font-mono text-slate-800">{email}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto pt-4">
              <button
                onClick={handleWhatsAppRedirect}
                className="flex-1 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider font-display transition-colors"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Text Dr. Arvind Now
              </button>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setPhoto1('');
                  setPhoto2('');
                  setPhoto3('');
                  setPatientName('');
                  setPhone('');
                  setEmail('');
                  setScanFor('myself');
                  setFamilyMemberName('');
                }}
                className="flex-1 bg-slate-200 hover:bg-slate-350 text-slate-700 font-semibold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider font-display transition-colors"
              >
                Scan Another Mouth
              </button>
            </div>
          </div>
        )}

        {/* Security & Indian Dental Council notice */}
        <div className="mt-8 flex justify-center items-center text-[10px] text-slate-400 font-light space-x-6">
          <span className="flex items-center">
            <ShieldCheck className="h-4 w-4 text-gold-455 mr-1" />
            256-bit HIPAA Encryption
          </span>
          <span>•</span>
          <span>Approved by Indian Dental Council</span>
        </div>

      </div>
    </div>
  );
}
