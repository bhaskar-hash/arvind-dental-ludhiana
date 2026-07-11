# Premium Dental Clinic Website & Lead CRM (Ludhiana, Punjab)

A modern, high-converting, fully functional web application designed for premium dental clinics in Ludhiana, Punjab, India. Features a client-side database, dedicated NRI dental tourism portal, and secure doctor dashboard to manage appointments and patient treatment logs.

---

## 🚀 Key Features

### 1. Patient Frontend
* **Stunning Aesthetic Homepage:** Sleek clinical blues, clean typography (Geist), interactive hover micro-animations, and trust-building sections (6-Step Sterilization loop, Google rating metrics).
* **Speciality Service Guides:** Dedicated page routes for high-value services (Dental Implants, Smile Designing/Veneers, Painless Laser Root Canal) detailing symptoms, procedures, and technology.
* **Interactive Before & After Sliders:** Touch-friendly slider component matching visual results of surgical implants and cosmetic veneers.
* **NRI Dental Tourism Hub:** Localized features targeting Punjabi expats:
  * Dynamic West vs. India cost calculator showing up to 80% net savings.
  * Express 7-Day Treatment Timeline.
  * Travel, hotel, airport pickup, and warranty coordination information.
* **Sticky CTA Actions:** Floating WhatsApp and Call buttons for direct mobile check-ins.

### 2. Secure Admin Lead CRM (`/admin`)
* **Secure Login Gate:** Mock credentials set up for live review (`admin@ludhianadental.com` / `admin123`).
* **Lead Pipeline:** Pipeline board sorted by status (`Pending`, `Confirmed`, `Completed`). Move leads through the pipeline with one click.
* **Patient Database Logs:** Select any patient record, search by phone, and write custom editable clinical treatment notes.
* **CMS Settings Editor:** Update services prices (INR/USD) and clinic opening hours directly from the UI. Changes update patient pages in real-time.

---

## 🛠️ Tech Stack & Architecture

* **Framework:** Next.js 16+ (App Router)
* **Language:** TypeScript (Strict Type Safety)
* **Styling:** Tailwind CSS (Modern Grid Layouts)
* **Icons:** Lucide React
* **Database Layer:** Local storage service (`dataService.ts`) handles zero-dependency in-browser persistence. Swappable service interface for cloud databases.

---

## 💻 Getting Started Locally

### 1. Installation
Clone the repository, open a terminal, and run:
```bash
npm install
```

### 2. Running Dev Server
Launch the development environment:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to view the application.

### 3. Build & Compile
Build optimization for production:
```bash
npm run build
```

---

## 📂 Project Structure

```text
├── src/
│   ├── app/                      # Next.js App Router Pages
│   │   ├── page.tsx              # Homepage
│   │   ├── layout.tsx            # Global layout & SEO Metadata
│   │   ├── admin/                # Secure admin login
│   │   │   ├── dashboard/        # Lead CRM and CMS dashboard
│   │   ├── contact/              # Detailed form, timings, maps
│   │   ├── doctors/              # MDS clinical team profiles
│   │   ├── nri-dental-tourism/   # Cost comparisons and travel guides
│   │   └── services/             # Specialty listings
│   │       └── [slug]/           # Dynamic details (Implants, Veneers, RCT)
│   ├── components/               # Reusable UI Blocks
│   │   ├── AppLayout.tsx         # Client layout wrapper
│   │   ├── Navbar.tsx            # Responsive navigation header
│   │   ├── Footer.tsx            # Informative footer widget
│   │   ├── BookingModal.tsx      # Priority booking modal
│   │   ├── BeforeAfterSlider.tsx # Interactive comparison slider
│   │   └── WhatsAppButton.tsx    # Sticky floating messaging actions
│   └── lib/
│       └── dataService.ts        # In-memory & local-storage CRM engine
├── research_notes.md             # Competitor scraping notes
└── package.json                  # Dependencies configuration
```

---

## 🔧 Scaling to a Real Database Backend

The data layer is isolated in `src/lib/dataService.ts`. To scale this to a cloud serverless database (Supabase or Firebase):

### A. Integrating Supabase (Recommended)
1. Install Supabase Client:
   ```bash
   npm install @supabase/supabase-js
   ```
2. Configure `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
3. Update `src/lib/dataService.ts` database calls (e.g. `getAppointments`, `addAppointment`) to execute `supabase.from('appointments').select('*')` instead of reading/writing to `localStorage`.

### B. Integrating Firebase
1. Install Firebase SDK:
   ```bash
   npm install firebase
   ```
2. Set up Firebase database client in `src/lib/firebaseConfig.ts`.
3. Use Firestore hooks (`addDoc`, `collection`) in `dataService.ts` to push bookings directly to Firestore.

---

## ☁️ Zero-Cost Infrastructure Deployments

This project is built to run on the Vercel/Supabase free tier with **₹0/month running cost**:

1. **Host Frontend:** Deploy directly on [Vercel](https://vercel.com) by connecting this git repository. Vercel automatically compiles and delivers Next.js serverless routes on their Edge CDN.
2. **Database Hosting:** Deploy a free project on [Supabase](https://supabase.com) (includes 500MB database, more than enough to hold ~100,000 lead records).
3. **Domain Name:** Purchase domain tags (e.g., `ludhianadental.in` or `ludhianadental.com`) via GoDaddy/Namecheap for around **$10/year (₹800/year)** and point DNS nameservers to Vercel.
