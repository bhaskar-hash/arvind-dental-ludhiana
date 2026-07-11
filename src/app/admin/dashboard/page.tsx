'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  Users,
  Database,
  LogOut,
  HeartPulse,
  Clock,
  Phone,
  Mail,
  User,
  CheckCircle,
  AlertCircle,
  CheckSquare,
  FileText,
  DollarSign,
  TrendingDown,
  RefreshCw,
  Search,
  Camera,
  Mic,
  Square,
  MessageSquare,
  Activity,
  Award
} from 'lucide-react';
import { dataService, LocalAppointment as Appointment, CMSConfig, TreatmentPrice, OperatingHours, MouthScan } from '@/lib/dataService';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'appointments' | 'patients' | 'cms' | 'scans'>('appointments');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [cmsConfig, setCmsConfig] = useState<CMSConfig | null>(null);
  const [mouthScans, setMouthScans] = useState<MouthScan[]>([]);

  // Appointments Tab States
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Confirmed' | 'Completed'>('All');
  const [selectedAptId, setSelectedAptId] = useState<string | null>(null);

  // Patients Tab States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatientPhone, setSelectedPatientPhone] = useState<string | null>(null);
  const [patientNotesInput, setPatientNotesInput] = useState('');

  // Scans Tab States
  const [selectedScanId, setSelectedScanId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recSeconds, setRecSeconds] = useState(0);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionInput, setTranscriptionInput] = useState('');

  // CMS Tab States
  const [cmsPrices, setCmsPrices] = useState<TreatmentPrice[]>([]);
  const [cmsHours, setCmsHours] = useState<OperatingHours[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = sessionStorage.getItem('admin_authenticated');
      if (auth !== 'true') {
        router.push('/admin');
      } else {
        setIsAuthenticated(true);
        loadData();
      }
    }
  }, [router]);

  const loadData = () => {
    const apts = dataService.getAppointments();
    setAppointments(apts);
    if (apts.length > 0 && !selectedAptId) {
      setSelectedAptId(apts[0].id);
    }

    const cms = dataService.getCMSConfig();
    setCmsConfig(cms);
    setCmsPrices(cms.prices);
    setCmsHours(cms.hours);

    const scans = dataService.getMouthScans();
    setMouthScans(scans);
    if (scans.length > 0 && !selectedScanId) {
      setSelectedScanId(scans[0].id);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    router.push('/admin');
  };

  // Appointment Actions
  const handleUpdateStatus = (id: string, status: Appointment['status']) => {
    dataService.updateAppointmentStatus(id, status);
    loadData();
  };

  const selectPatient = (phone: string) => {
    setSelectedPatientPhone(phone);
    const matched = appointments.find(apt => apt.phone === phone);
    if (matched) {
      setPatientNotesInput(matched.notes || '');
    }
  };

  // Save clinical notes for patients
  const handleSaveNotes = () => {
    if (!selectedPatientPhone) return;
    const list = dataService.getAppointments();
    const updated = list.map(apt => {
      if (apt.phone === selectedPatientPhone) {
        return { ...apt, notes: patientNotesInput };
      }
      return apt;
    });
    localStorage.setItem('arvind_appointments', JSON.stringify(updated));
    loadData();
    alert('Patient clinical notes updated successfully!');
  };

  // Save CMS Configurations
  const handleSaveCMS = () => {
    if (!cmsConfig) return;
    dataService.saveCMSConfig({
      hours: cmsHours,
      prices: cmsPrices,
      gallery: cmsConfig.gallery
    });
    alert('CMS configs updated successfully!');
  };

  // Voice recording simulation
  let recInterval: any;
  const startRecording = () => {
    setIsRecording(true);
    setRecSeconds(0);
    recInterval = setInterval(() => {
      setRecSeconds(prev => prev + 1);
    }, 1000);
  };

  const stopRecordingAndTranscribe = () => {
    setIsRecording(false);
    clearInterval(recInterval);
    setIsTranscribing(true);

    // Simulated Whisper transcription delay
    setTimeout(() => {
      setIsTranscribing(false);
      setTranscriptionInput(
        "Hello! I reviewed your teeth photos. Gum margins look healthy, but I detected minor plaque build-up on your lower right molars. Recommend a quick scaling. Please reply to schedule."
      );
    }, 2000);
  };

  const handleSendScanReport = () => {
    if (!selectedScanId || !transcriptionInput.trim()) return;
    dataService.updateMouthScanReport(selectedScanId, 'http://arvinddental.com/audio/diagnosis.mp3', transcriptionInput);
    loadData();

    const selectedScan = mouthScans.find(s => s.id === selectedScanId);
    if (selectedScan) {
      const details = `Here is your doctor diagnostic report:\n\n*Details:* ${transcriptionInput}`;
      const link = dataService.getWhatsAppLink(selectedScan.phone, selectedScan.patientName, details);
      window.open(link, '_blank');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center text-slate-800">
        <div className="text-slate-500 flex items-center space-x-2 text-sm font-light">
          <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />
          <span>Securing authentication...</span>
        </div>
      </div>
    );
  }

  // Filtered Appointments
  const filteredAppointments = appointments.filter(apt => {
    if (statusFilter === 'All') return true;
    return apt.status === statusFilter;
  });

  const selectedApt = appointments.find(apt => apt.id === selectedAptId);
  const selectedScan = mouthScans.find(scan => scan.id === selectedScanId);

  // Group unique patients
  const patientMap = new Map<string, { name: string; email: string; phone: string; notes: string; appointmentsCount: number }>();
  appointments.forEach(apt => {
    const norm = apt.phone.trim();
    if (patientMap.has(norm)) {
      const existing = patientMap.get(norm)!;
      patientMap.set(norm, {
        ...existing,
        appointmentsCount: existing.appointmentsCount + 1,
        notes: apt.notes || existing.notes
      });
    } else {
      patientMap.set(norm, {
        name: apt.patientName,
        email: apt.email,
        phone: apt.phone,
        notes: apt.notes || '',
        appointmentsCount: 1
      });
    }
  });

  const uniquePatients = Array.from(patientMap.values()).filter(p => {
    return p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.phone.includes(searchQuery);
  });

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 flex flex-col font-sans">
      
      {/* 1. Header Bar */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-35 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <HeartPulse className="h-7 w-7 text-gold-455" />
            <div>
              <h1 className="text-md font-bold text-slate-900 leading-tight font-display">Arvind Dental Admin</h1>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold font-sans">Local Patient CRM Dashboard</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-205 px-4 py-2 rounded-xl transition-all"
          >
            <LogOut className="h-4 w-4 mr-1.5 text-red-500" />
            Log Out Panel
          </button>
        </div>
      </header>

      {/* 2. Main Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow flex flex-col w-full">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4 mb-6">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`flex items-center text-xs uppercase tracking-wider font-bold px-5 py-2.5 rounded-full transition-all ${
              activeTab === 'appointments'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-500 hover:text-slate-900 bg-white border border-slate-200'
            }`}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Lead Pipeline ({appointments.length})
          </button>
          
          <button
            onClick={() => setActiveTab('scans')}
            className={`flex items-center text-xs uppercase tracking-wider font-bold px-5 py-2.5 rounded-full transition-all ${
              activeTab === 'scans'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-500 hover:text-slate-900 bg-white border border-slate-200'
            }`}
          >
            <Camera className="h-4 w-4 mr-2" />
            Teeth Scans ({mouthScans.length})
          </button>

          <button
            onClick={() => {
              setActiveTab('patients');
              setSelectedPatientPhone(null);
            }}
            className={`flex items-center text-xs uppercase tracking-wider font-bold px-5 py-2.5 rounded-full transition-all ${
              activeTab === 'patients'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-500 hover:text-slate-900 bg-white border border-slate-200'
            }`}
          >
            <Users className="h-4 w-4 mr-2" />
            Patient Database ({uniquePatients.length})
          </button>
          
          <button
            onClick={() => setActiveTab('cms')}
            className={`flex items-center text-xs uppercase tracking-wider font-bold px-5 py-2.5 rounded-full transition-all ${
              activeTab === 'cms'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-500 hover:text-slate-900 bg-white border border-slate-200'
            }`}
          >
            <Database className="h-4 w-4 mr-2" />
            CMS Manager
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-grow flex flex-col">
          
          {/* TAB 1: APPOINTMENTS PIPELINE */}
          {activeTab === 'appointments' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch flex-grow">
              {/* Left Column */}
              <div className="lg:col-span-5 flex flex-col bg-white border border-slate-205 rounded-3xl p-6 space-y-4 max-h-[70vh]">
                <div className="flex space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                  {(['All', 'Pending', 'Confirmed', 'Completed'] as const).map(pill => (
                    <button
                      key={pill}
                      onClick={() => setStatusFilter(pill)}
                      className={`flex-1 text-[10px] font-bold uppercase py-2 rounded-lg transition-colors ${
                        statusFilter === pill
                          ? 'bg-white text-blue-600 shadow-sm border border-slate-200/60'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {pill}
                    </button>
                  ))}
                </div>

                <div className="overflow-y-auto space-y-3 pr-2 flex-grow">
                  {filteredAppointments.map(apt => (
                    <div
                      key={apt.id}
                      onClick={() => setSelectedAptId(apt.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        selectedAptId === apt.id
                          ? 'bg-blue-50 border-blue-200/80 shadow-sm'
                          : 'bg-white border-slate-200/60 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-bold text-slate-900">{apt.patientName}</h3>
                        <span className={`text-[8px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                          apt.status === 'Pending' ? 'text-amber-600 bg-amber-500/5 border-amber-500/10' :
                          apt.status === 'Confirmed' ? 'text-blue-600 bg-blue-500/5 border-blue-500/10' :
                          'text-emerald-600 bg-emerald-500/5 border-emerald-500/10'
                        }`}>{apt.status}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 pt-1 truncate">{apt.treatment}</p>
                      <div className="flex justify-between items-center text-[10px] text-slate-400 pt-3 mt-1.5 border-t border-slate-100">
                        <span>{apt.date}</span>
                        <span>{apt.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-7 bg-white border border-slate-205 rounded-[2rem] p-8 flex flex-col justify-between">
                {selectedApt ? (
                  <div className="space-y-6 flex-grow flex flex-col justify-between">
                    <div className="space-y-6">
                      <div className="border-b border-slate-100 pb-4 flex justify-between items-start">
                        <div>
                          <h2 className="text-2xl font-bold text-slate-900 font-display">{selectedApt.patientName}</h2>
                          <span className="text-xs text-slate-400">Scheduled Lead Request</span>
                        </div>
                        <span className={`text-xs font-bold uppercase px-3 py-1 rounded border ${
                          selectedApt.status === 'Pending' ? 'text-amber-600 bg-amber-500/5 border-amber-500/10' :
                          selectedApt.status === 'Confirmed' ? 'text-blue-600 bg-blue-500/5 border-blue-500/10' :
                          'text-emerald-600 bg-emerald-500/5 border-emerald-500/10'
                        }`}>{selectedApt.status}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-[9px] uppercase font-bold text-slate-455 block">Treatment:</span>
                          <span className="text-slate-800 font-semibold">{selectedApt.treatment}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase font-bold text-slate-455 block">Scheduled Slot:</span>
                          <span className="text-slate-800 font-semibold">{selectedApt.date} at {selectedApt.time}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase font-bold text-slate-455 block">Phone:</span>
                          <a href={`tel:${selectedApt.phone}`} className="text-blue-600 hover:underline font-mono font-semibold">{selectedApt.phone}</a>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase font-bold text-slate-455 block">Email:</span>
                          <span className="text-slate-600 font-light">{selectedApt.email}</span>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs">
                        <span className="text-[10px] uppercase font-bold text-blue-600 block mb-1">Notes:</span>
                        <p className="text-slate-600 italic">"{selectedApt.message || 'No remarks provided.'}"</p>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-4 mt-6">
                      {selectedApt.status === 'Pending' && (
                        <button
                          onClick={() => handleUpdateStatus(selectedApt.id, 'Confirmed')}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl text-xs flex items-center justify-center transition-colors"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Confirm Slot
                        </button>
                      )}
                      {(selectedApt.status === 'Pending' || selectedApt.status === 'Confirmed') && (
                        <button
                          onClick={() => handleUpdateStatus(selectedApt.id, 'Completed')}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl text-xs flex items-center justify-center transition-colors"
                        >
                          <CheckSquare className="h-4 w-4 mr-2" />
                          Mark Completed
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16 text-slate-400 text-xs flex-grow flex items-center justify-center">
                    Select a lead from the list.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: MOCK DENTAL MONITOR SCANS reviewing panel */}
          {activeTab === 'scans' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch flex-grow">
              {/* Left Column */}
              <div className="lg:col-span-5 flex flex-col bg-white border border-slate-205 rounded-3xl p-6 space-y-4 max-h-[70vh]">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Scans Review Pipeline</h3>
                
                <div className="overflow-y-auto space-y-3 pr-2 flex-grow">
                  {mouthScans.map(scan => (
                    <div
                      key={scan.id}
                      onClick={() => {
                        setSelectedScanId(scan.id);
                        setTranscriptionInput(scan.doctorTranscription || '');
                      }}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        selectedScanId === scan.id
                          ? 'bg-blue-50 border-blue-200/80 shadow-sm'
                          : 'bg-white border-slate-200/60 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{scan.patientName}</h4>
                          {scan.scanFor === 'family' && (
                            <span className="text-[9px] bg-blue-50 text-blue-600 border border-blue-100/60 rounded px-1.5 py-0.5 mt-0.5 inline-block font-semibold">
                              Family: {scan.familyMemberName} ({scan.familyRelation})
                            </span>
                          )}
                        </div>
                        <span className={`text-[8px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                          scan.status === 'Pending Review'
                            ? 'text-amber-600 bg-amber-500/5 border-amber-500/10 animate-pulse'
                            : 'text-emerald-600 bg-emerald-500/5 border-emerald-500/10'
                        }`}>{scan.status}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 pt-1 font-mono">{scan.phone}</p>
                      <span className="text-[9px] text-slate-400 block pt-2 mt-1 border-t border-slate-50">
                        Uploaded: {new Date(scan.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Detailed Diagnosis & Voice Note Recorder */}
              <div className="lg:col-span-7 bg-white border border-slate-205 rounded-[2rem] p-8 flex flex-col justify-between overflow-y-auto max-h-[70vh]">
                {selectedScan ? (
                  <div className="space-y-6">
                    <div className="border-b border-slate-100 pb-4 flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-bold text-slate-900 font-display">
                          {selectedScan.scanFor === 'family'
                            ? `${selectedScan.familyMemberName} (${selectedScan.familyRelation})`
                            : selectedScan.patientName}
                        </h2>
                        <span className="text-xs text-slate-400">
                          {selectedScan.scanFor === 'family'
                            ? `Registered under account holder: ${selectedScan.patientName} (${selectedScan.phone})`
                            : `Patient Account: ${selectedScan.phone}`}
                        </span>
                      </div>
                      <span className={`text-xs font-bold uppercase px-3 py-1 rounded border ${
                        selectedScan.status === 'Pending Review' ? 'text-amber-600 bg-amber-500/5 border-amber-500/10' : 'text-emerald-600 bg-emerald-505/5 border-emerald-505/10'
                      }`}>{selectedScan.status}</span>
                    </div>

                    {/* Displays 3 Photos */}
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase font-bold text-slate-550 block">Uploaded Oral Photos:</span>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1 text-center bg-slate-50 p-2 rounded-xl border border-slate-100">
                          <span className="text-[8px] font-bold text-slate-400 uppercase">1. Front Bite</span>
                          <img src={selectedScan.frontBiteUrl} alt="Front bite" className="aspect-[4/3] object-cover w-full rounded-lg border border-slate-200" />
                        </div>
                        <div className="space-y-1 text-center bg-slate-50 p-2 rounded-xl border border-slate-100">
                          <span className="text-[8px] font-bold text-slate-400 uppercase">2. Upper Arch</span>
                          <img src={selectedScan.upperArchUrl} alt="Upper arch" className="aspect-[4/3] object-cover w-full rounded-lg border border-slate-200" />
                        </div>
                        <div className="space-y-1 text-center bg-slate-50 p-2 rounded-xl border border-slate-100">
                          <span className="text-[8px] font-bold text-slate-400 uppercase">3. Lower Arch</span>
                          <img src={selectedScan.lowerArchUrl} alt="Lower arch" className="aspect-[4/3] object-cover w-full rounded-lg border border-slate-200" />
                        </div>
                      </div>
                    </div>

                    {/* AI report */}
                    <div className="bg-blue-500/5 border border-blue-500/10 p-4 rounded-xl text-xs space-y-1">
                      <span className="text-[10px] uppercase font-bold text-blue-600 block">AI Preliminary scan Audit:</span>
                      <p className="text-slate-650 leading-relaxed font-light">{selectedScan.aiReport}</p>
                    </div>

                    {/* Voice Diagnosis Block */}
                    <div className="border border-slate-200/80 p-5 rounded-2xl space-y-4 bg-slate-50/50">
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                        Dr. Arvind's Voice Notes (Whisper API Integration)
                      </span>

                      {!isRecording ? (
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={startRecording}
                            className="bg-red-500 hover:bg-red-650 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center shadow-md active:scale-95 transition-all"
                          >
                            <Mic className="h-4 w-4 mr-2" />
                            Record Voice Notes
                          </button>
                          <span className="text-[10px] text-slate-400 font-light">Click to record microphone voice analysis memo.</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={stopRecordingAndTranscribe}
                            className="bg-slate-900 hover:bg-slate-950 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center animate-pulse"
                          >
                            <Square className="h-4 w-4 mr-2 text-red-500" />
                            Stop Recording ({recSeconds}s)
                          </button>
                          <span className="text-[10px] text-red-500 font-mono animate-pulse">Capturing audio notes...</span>
                        </div>
                      )}

                      {/* Transcribing loader */}
                      {isTranscribing && (
                        <div className="flex items-center space-x-2 text-xs text-blue-600 font-semibold bg-blue-500/5 p-3 rounded-lg border border-blue-500/10">
                          <Activity className="h-4 w-4 animate-spin" />
                          <span>Whisper API transcribing voice note...</span>
                        </div>
                      )}

                      {/* Output transcription editor */}
                      <div className="space-y-1">
                        <label className="block text-[9px] font-bold text-slate-550 uppercase">Report Transcription</label>
                        <textarea
                          rows={4}
                          value={transcriptionInput}
                          onChange={(e) => setTranscriptionInput(e.target.value)}
                          placeholder="Transcribed voice report details will appear here. Edit as needed."
                          className="w-full bg-white border border-slate-205 rounded-xl p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-gold-400"
                        />
                      </div>

                      <button
                        onClick={handleSendScanReport}
                        disabled={!transcriptionInput.trim()}
                        className="w-full bg-green-500 hover:bg-green-600 disabled:bg-slate-200 text-white font-semibold py-3 rounded-xl text-xs uppercase tracking-widest font-display flex items-center justify-center transition-all"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Send Voice Report via WhatsApp
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16 text-slate-400 text-xs flex-grow flex items-center justify-center">
                    Select a mouth photo scan to review.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PATIENT DATABASE & CLINICAL NOTES */}
          {activeTab === 'patients' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch flex-grow">
              <div className="lg:col-span-5 flex flex-col bg-white border border-slate-205 rounded-3xl p-6 space-y-4 max-h-[70vh]">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search by name or phone..."
                    className="w-full bg-slate-50 border border-slate-205 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-800 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="overflow-y-auto space-y-3 pr-2 flex-grow">
                  {uniquePatients.map(p => (
                    <div
                      key={p.phone}
                      onClick={() => selectPatient(p.phone)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        selectedPatientPhone === p.phone
                          ? 'bg-blue-50 border-blue-200/80 shadow-sm'
                          : 'bg-white border-slate-200/60 hover:border-slate-350'
                      }`}
                    >
                      <h3 className="text-sm font-bold text-slate-900">{p.name}</h3>
                      <p className="text-[11px] text-slate-500 pt-0.5">{p.phone}</p>
                      <div className="flex justify-between items-center text-[9px] text-slate-400 pt-2.5 mt-1 border-t border-slate-100">
                        <span>{p.email}</span>
                        <span className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
                          {p.appointmentsCount} Booking(s)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7 bg-white border border-slate-205 rounded-[2rem] p-8 flex flex-col justify-between">
                {selectedPatientPhone && patientMap.has(selectedPatientPhone) ? (
                  <div className="space-y-6 flex-grow flex flex-col justify-between">
                    <div className="space-y-6">
                      <div className="border-b border-slate-100 pb-4">
                        <h2 className="text-xl font-bold text-slate-900 flex items-center font-display">
                          <User className="h-5 w-5 text-blue-500 mr-2" />
                          {patientMap.get(selectedPatientPhone)!.name}
                        </h2>
                        <span className="text-xs text-slate-450">Clinical Record file</span>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Phone:</span>
                          <span className="text-slate-800 font-semibold font-mono">{patientMap.get(selectedPatientPhone)!.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Email:</span>
                          <span className="text-slate-800 font-semibold">{patientMap.get(selectedPatientPhone)!.email}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Clinical Treatment Notes:</label>
                        <textarea
                          rows={8}
                          value={patientNotesInput}
                          onChange={e => setPatientNotesInput(e.target.value)}
                          placeholder="Write treatment logs..."
                          className="w-full bg-slate-50 border border-slate-205 rounded-2xl p-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all font-mono"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleSaveNotes}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl text-xs transition-colors mt-6"
                    >
                      Save Clinical Notes
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-16 text-slate-400 text-xs flex-grow flex items-center justify-center">
                    Select a patient to view clinical records.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: CMS PRICES & HOURS CONFIGURATION */}
          {activeTab === 'cms' && (
            <div className="bg-white border border-slate-205 rounded-[2rem] p-8 flex flex-col justify-between flex-grow shadow-sm">
              <div className="space-y-8">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center font-display">
                    <Database className="h-5.5 w-5.5 text-blue-500 mr-2" />
                    CMS Settings Module
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage treatment prices and hours dynamically.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Rate List (INR)</h3>
                    <div className="space-y-4 max-h-[45vh] overflow-y-auto pr-2">
                      {cmsPrices.map((price, idx) => (
                        <div key={price.id} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
                          <input
                            type="text"
                            value={price.name}
                            onChange={e => {
                              const updated = [...cmsPrices];
                              updated[idx].name = e.target.value;
                              setCmsPrices(updated);
                            }}
                            className="w-full bg-white border border-slate-205 rounded-lg p-2 text-xs text-slate-800 font-semibold"
                          />
                          <div>
                            <label className="block text-[8px] font-bold text-slate-400 uppercase">Estimated Local Price</label>
                            <input
                              type="text"
                              value={price.price}
                              onChange={e => {
                                const updated = [...cmsPrices];
                                updated[idx].price = e.target.value;
                                setCmsPrices(updated);
                              }}
                              className="w-full bg-white border border-slate-205 rounded-lg p-2 text-xs text-slate-800 font-mono"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Operational Timings</h3>
                    <div className="space-y-3 max-h-[45vh] overflow-y-auto pr-2">
                      {cmsHours.map((hour, idx) => (
                        <div key={hour.day} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-center justify-between gap-4">
                          <span className="text-xs font-semibold text-slate-800 w-24">{hour.day}</span>
                          <input
                            type="text"
                            disabled={hour.closed}
                            value={hour.hours}
                            onChange={e => {
                              const updated = [...cmsHours];
                              updated[idx].hours = e.target.value;
                              setCmsHours(updated);
                            }}
                            className="bg-white border border-slate-205 rounded-lg p-2 text-xs text-slate-800 w-48 text-center disabled:opacity-30 disabled:cursor-not-allowed font-mono"
                          />
                          <label className="flex items-center text-xs text-slate-500 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={hour.closed}
                              onChange={e => {
                                const updated = [...cmsHours];
                                updated[idx].closed = e.target.checked;
                                if (e.target.checked) {
                                  updated[idx].closed = true;
                                  updated[idx].hours = 'Closed';
                                } else {
                                  updated[idx].closed = false;
                                  updated[idx].hours = '09:30 AM - 07:30 PM';
                                }
                                setCmsHours(updated);
                              }}
                              className="mr-1.5 h-3.5 w-3.5 cursor-pointer accent-blue-600"
                            />
                            Closed
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSaveCMS}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-xl text-xs transition-colors mt-8"
              >
                Save CMS Configuration Settings
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
