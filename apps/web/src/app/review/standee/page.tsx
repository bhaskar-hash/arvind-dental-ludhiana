import type { Metadata } from "next";
import Link from "next/link";
import { PrintButton } from "./PrintButton";
import { business } from "@/lib/business";
import { doctor } from "@/lib/doctor";

export const metadata: Metadata = {
  title: `Print Clinic Counter Standee | ${business.name}`,
  description: `Printable QR code counter standee for RedCity Dental clinic reception in Ludhiana.`,
  robots: { index: false, follow: false },
};

export default function StandeePage() {
  const qrImageSrc = "/qr/redcity-review-assistant-qr.png";
  const directMapsQrSrc = "/qr/redcity-direct-google-maps-qr.png";

  return (
    <main className="min-h-screen bg-[#F4EFEB] py-6 sm:py-12 print:bg-white print:p-0">
      {/* ── Clinic Tools Control Bar (Hidden when printed) ── */}
      <div className="mx-auto max-w-4xl px-4 print:hidden">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-brand-line bg-white p-5 shadow-sm">
          <div>
            <span className="font-body text-xs font-bold uppercase tracking-wider text-brand-red">
              Clinic Reception Kit
            </span>
            <h1 className="mt-1 font-headline text-xl font-bold text-brand-ink">
              Reception QR Standee Card
            </h1>
            <p className="mt-0.5 font-body text-xs text-brand-muted">
              Display on the reception desk or billing counter. Ready for 4×6 inch or A5 acrylic stands.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <PrintButton />
            <a
              href={qrImageSrc}
              download="redcity-review-qr.png"
              className="inline-flex items-center gap-1.5 rounded-xl border border-brand-line bg-brand-warm px-4 py-2.5 font-body text-xs font-semibold text-brand-ink hover:bg-white transition-colors"
            >
              Download QR (PNG)
            </a>
            <a
              href="/qr/redcity-review-assistant-qr.svg"
              download="redcity-review-qr.svg"
              className="inline-flex items-center gap-1.5 rounded-xl border border-brand-line bg-brand-warm px-4 py-2.5 font-body text-xs font-semibold text-brand-ink hover:bg-white transition-colors"
            >
              Download QR (SVG)
            </a>
            <Link
              href="/review"
              className="inline-flex items-center gap-1.5 rounded-xl border border-brand-red/30 bg-brand-blush px-4 py-2.5 font-body text-xs font-semibold text-brand-red hover:bg-brand-red hover:text-white transition-colors"
            >
              Preview Review Page →
            </Link>
          </div>
        </div>
      </div>

      {/* ── The Printable Standee Card ── */}
      <div className="mx-auto w-full max-w-[420px] px-4 print:max-w-none print:p-0">
        <div className="overflow-hidden rounded-[28px] border-2 border-brand-maroon/20 bg-white shadow-xl print:m-0 print:border-none print:shadow-none print:rounded-none">
          {/* Top Branding Banner */}
          <div className="bg-brand-maroon px-6 py-6 text-center text-white">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gold font-headline text-xl font-black text-brand-maroon shadow-md">
              RC
            </div>
            <h2 className="mt-3 font-headline text-xl sm:text-2xl font-bold tracking-tight text-white">
              {business.name}
            </h2>
            <p className="mt-1 font-body text-xs font-semibold text-brand-gold">
              {doctor.name} · {doctor.credentialsShort}
            </p>
            <p className="mt-0.5 font-body text-[11px] text-[#E3D1CE]">
              {business.streetAddress}, {business.addressLocality}
            </p>
          </div>

          {/* Main Card Content */}
          <div className="px-6 py-7 text-center">
            {/* Required Heading */}
            <h3 className="font-headline text-2xl sm:text-3xl font-extrabold text-brand-ink tracking-tight">
              Share Your Experience
            </h3>

            {/* Required Short Instruction */}
            <p className="mt-1.5 font-body text-sm font-medium text-brand-muted">
              Scan to leave your honest feedback
            </p>

            {/* QR Code */}
            <div className="mx-auto my-6 flex w-full max-w-[220px] flex-col items-center justify-center rounded-2xl border-2 border-brand-line bg-brand-warm/30 p-4 shadow-sm">
              <picture>
                <source srcSet={qrImageSrc} type="image/png" />
                <img
                  src={qrImageSrc}
                  alt="Scan QR code to leave your honest feedback for RedCity Dental Care"
                  width={190}
                  height={190}
                  className="rounded-xl"
                />
              </picture>
              <span className="mt-2.5 font-body text-[11px] font-bold tracking-wider text-brand-maroon">
                redcitydental.com/review
              </span>
            </div>

            {/* Minimal Help Note */}
            <p className="font-body text-xs text-brand-muted max-w-[280px] mx-auto leading-relaxed">
              Open your phone camera, scan the QR code, and tap <strong>Write a Review</strong> on Google.
            </p>
          </div>

          {/* Minimal Footer */}
          <div className="border-t border-brand-line/70 bg-brand-warm/40 py-3 px-4 text-center font-body text-[11px] text-brand-muted">
            Telephone: {business.telephoneDisplay} · Near South Model Town, Ludhiana
          </div>
        </div>
      </div>

      {/* ── Direct Google Maps Fallback (On-screen helper, hidden on print) ── */}
      <div className="mx-auto mt-10 max-w-md px-4 text-center print:hidden">
        <div className="rounded-2xl border border-brand-line bg-white p-5 text-left">
          <span className="font-headline text-xs font-bold text-brand-ink block uppercase tracking-wider">
            Alternative: Direct-To-Google QR Code
          </span>
          <p className="font-body text-xs text-brand-muted mt-1">
            If you ever need a QR code that bypasses the website completely and opens Google Maps directly:
          </p>
          <div className="mt-3 flex items-center gap-4">
            <picture>
              <source srcSet={directMapsQrSrc} type="image/png" />
              <img
                src={directMapsQrSrc}
                alt="Direct Google Maps QR code"
                width={80}
                height={80}
                className="rounded-xl border border-brand-line"
              />
            </picture>
            <div className="text-xs font-body text-brand-muted">
              <span className="font-semibold text-brand-ink block">Direct Destination:</span>
              <span className="break-all text-[11px] font-mono">{business.googleWriteReviewUrl}</span>
              <a
                href={directMapsQrSrc}
                download="redcity-direct-google-maps-qr.png"
                className="mt-2 inline-block font-semibold text-brand-red underline hover:text-brand-ink"
              >
                Download Direct QR (PNG)
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
