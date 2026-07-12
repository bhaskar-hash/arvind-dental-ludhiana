export interface Appointment {
  id: string;
  patientName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  treatment: string;
  message: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  notes?: string;
}

export interface OperatingHours {
  day: string;
  hours: string;
  closed: boolean;
}

export interface TreatmentPrice {
  id: string;
  name: string;
  price: string;
  category: string;
}

export interface BeforeAfterGallery {
  id: string;
  title: string;
  description: string;
  beforeUrl: string;
  afterUrl: string;
}

export interface MouthScan {
  id: string;
  patientName: string;
  phone: string;
  frontBiteUrl: string;
  upperArchUrl: string;
  lowerArchUrl: string;
  status: 'Pending Review' | 'Reviewed';
  aiReport?: string;
  doctorVoiceNotes?: string;
  doctorTranscription?: string;
  createdAt: string;
  scanFor?: 'myself' | 'family';
  familyRelation?: string;
  familyMemberName?: string;
  email?: string;
  sendReminders?: boolean;
}

export interface CMSConfig {
  hours: OperatingHours[];
  prices: TreatmentPrice[];
  gallery: BeforeAfterGallery[];
}

const DEFAULT_HOURS: OperatingHours[] = [
  { day: 'Monday', hours: '9:30 AM - 7:30 PM', closed: false },
  { day: 'Tuesday', hours: '9:30 AM - 7:30 PM', closed: false },
  { day: 'Wednesday', hours: '9:30 AM - 7:30 PM', closed: false },
  { day: 'Thursday', hours: '9:30 AM - 7:30 PM', closed: false },
  { day: 'Friday', hours: '9:30 AM - 7:30 PM', closed: false },
  { day: 'Saturday', hours: '9:30 AM - 5:00 PM', closed: false },
  { day: 'Sunday', hours: 'Closed', closed: true },
];

const DEFAULT_PRICES: TreatmentPrice[] = [
  { id: '1', name: 'Dental Implants (Titanium)', price: 'Starts at ₹12,000*', category: 'Implantology' },
  { id: '2', name: 'Zirconia Crown (100% Metal-Free)', price: 'Starts at ₹4,000*', category: 'Prosthodontics' },
  { id: '3', name: 'PFM Crown (Porcelain-Fused-Metal)', price: 'Starts at ₹2,000*', category: 'Prosthodontics' },
  { id: '4', name: 'Laser Root Canal (RCT)', price: 'Starts at ₹3,500*', category: 'Endodontics' },
  { id: '5', name: 'Clear Invisible Aligners', price: 'Starts at ₹45,000*', category: 'Orthodontics' },
];

const DEFAULT_GALLERY: BeforeAfterGallery[] = [
  {
    id: 'g1',
    title: 'Full Mouth Reconstruction',
    description: 'All-on-4 hybrid titanium restoration on upper jaw, replacing failing bridges.',
    beforeUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=400',
    afterUrl: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'g2',
    title: 'IPS E-Max Porcelain Veneers',
    description: 'Alignment correction and shape redesign of upper front teeth.',
    beforeUrl: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=400',
    afterUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=400'
  }
];

export const dataService = {
  // CMS Setup
  getCMSConfig: (): CMSConfig => {
    if (typeof window === 'undefined') return { hours: DEFAULT_HOURS, prices: DEFAULT_PRICES, gallery: DEFAULT_GALLERY };
    const saved = localStorage.getItem('arvind_cms_config');
    if (saved) return JSON.parse(saved);
    const initial = { hours: DEFAULT_HOURS, prices: DEFAULT_PRICES, gallery: DEFAULT_GALLERY };
    localStorage.setItem('arvind_cms_config', JSON.stringify(initial));
    return initial;
  },

  saveCMSConfig: (config: CMSConfig) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('arvind_cms_config', JSON.stringify(config));
  },

  // Appointment lead management
  getAppointments: (): Appointment[] => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('arvind_appointments');
    if (saved) return JSON.parse(saved);
    
    // Seed some initial demo leads
    const initial: Appointment[] = [
      {
        id: '1',
        patientName: 'Ramanpreet Grewal',
        email: 'raman@gmail.com',
        phone: '+91 98142-32104',
        date: '2026-07-15',
        time: '11:30 AM',
        treatment: 'Laser Root Canal (RCT)',
        message: 'Sensitivity and throbbing pain in lower molar.',
        status: 'Pending'
      },
      {
        id: '2',
        patientName: 'Harinder Sodhi',
        email: 'harinder@yahoo.com',
        phone: '+91 98725-54321',
        date: '2026-07-16',
        time: '04:00 PM',
        treatment: 'Single Tooth Implant (Osstem)',
        message: 'Missing back tooth, looking for implant replacement.',
        status: 'Confirmed'
      }
    ];
    localStorage.setItem('arvind_appointments', JSON.stringify(initial));
    return initial;
  },

  addAppointment: (apt: Omit<Appointment, 'id' | 'status'>): Appointment => {
    const list = dataService.getAppointments();
    const newApt: Appointment = {
      ...apt,
      id: Math.random().toString(36).substr(2, 9),
      status: 'Pending'
    };
    list.unshift(newApt);
    localStorage.setItem('arvind_appointments', JSON.stringify(list));
    return newApt;
  },

  updateAppointmentStatus: (id: string, status: Appointment['status']) => {
    const list = dataService.getAppointments();
    const updated = list.map(item => item.id === id ? { ...item, status } : item);
    localStorage.setItem('arvind_appointments', JSON.stringify(updated));
  },

  // Dental Mouth Photo Monitoring Service
  getMouthScans: (): MouthScan[] => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('arvind_mouth_scans');
    if (saved) return JSON.parse(saved);

    // Seed initial demo scans
    const initial: MouthScan[] = [
      {
        id: 'scan-1',
        patientName: 'Amrik Singh Dhillon',
        phone: '+91 94630-12345',
        frontBiteUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=150',
        upperArchUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=150',
        lowerArchUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=150',
        status: 'Pending Review',
        aiReport: 'AI Analysis: Potential calculus build-up detected on upper molar margins. Gums show mild irritation on lower incisors.',
        createdAt: '2026-07-11T12:00:00.000Z'
      }
    ];
    localStorage.setItem('arvind_mouth_scans', JSON.stringify(initial));
    return initial;
  },

  addMouthScan: (scan: Omit<MouthScan, 'id' | 'status' | 'createdAt'>): MouthScan => {
    const list = dataService.getMouthScans();
    const newScan: MouthScan = {
      ...scan,
      id: 'scan-' + Math.random().toString(36).substr(2, 9),
      status: 'Pending Review',
      createdAt: new Date().toISOString()
    };
    list.unshift(newScan);
    localStorage.setItem('arvind_mouth_scans', JSON.stringify(list));
    return newScan;
  },

  updateMouthScanReport: (id: string, voiceUrl: string, transcription: string) => {
    const list = dataService.getMouthScans();
    const updated = list.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: 'Reviewed' as const,
          doctorVoiceNotes: voiceUrl,
          doctorTranscription: transcription
        };
      }
      return item;
    });
    localStorage.setItem('arvind_mouth_scans', JSON.stringify(updated));
  },

  // WhatsApp generation link helper
  getWhatsAppLink: (phone: string, name: string, details: string) => {
    const formattedPhone = phone.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Hello Dr. Arvind, I registered on your portal.\n\n*Name:* ${name}\n*Query:* ${details}\n\nPlease coordinate my slot callback.`
    );
    return `https://wa.me/918847651364?text=${text}`;
  }
};
export type { Appointment as LocalAppointment };
