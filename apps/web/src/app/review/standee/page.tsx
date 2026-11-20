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
    <main className="min-h-screen bg-[#F4EFEB] py-8 sm:py-14 print:bg-white print:p-0">
      {/* Clinic Tools Control Bar (Hidden when printed) */}
      <div className="mx-auto max-w-4xl px-6 print:hidden">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-brand-line bg-white p-5 shadow-sm">
          <div>
            <span className="font-body text-xs font-bold uppercase tracking-wider text-brand-red">
              Clinic Reception Kit
            </span>
            <h1 className="mt-1 font-headline text-xl font-bold text-brand-ink">
              Google Review Counter Standee Card
            </h1>
            <p className="mt-0.5 font-body text-xs text-brand-muted">
              Display this on the reception desk or billing counter. Patients scan to get 1-tap review recommendations.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <PrintButton />
            <a
              href={qrImageSrc}
              download="redcity-review-assistant-qr.png"
              className="inline-flex items-center gap-1.5 rounded-xl border border-brand-line bg-brand-warm px-4 py-2.5 font-body text-xs font-semibold text-brand-ink hover:bg-white"
            >
              Download QR (PNG)
            </a>
            <a
              href="/qr/redcity-review-assistant-qr.svg"
              download="redcity-review-assistant-qr.svg"
              className="inline-flex items-center gap-1.5 rounded-xl border border-brand-line bg-brand-warm px-4 py-2.5 font-body text-xs font-semibold text-brand-ink hover:bg-white"
            >
              Download QR (SVG)
            </a>
          </div>
        </div>
      </div>

      {/* The Printable Standee Card */}
      <div className="mx-auto w-full max-w-[440px] px-4 print:max-w-none print:p-0">
        <div className="overflow-hidden rounded-[32px] border-[3px] border-brand-maroon bg-white shadow-2xl print:m-0 print:border-none print:shadow-none">
          {/* Top Banner */}
          <div className="bg-brand-maroon px-8 py-8 text-center text-white">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gold font-headline text-2xl font-black text-brand-maroon shadow-md">
              RC
            </div>
            <h2 className="mt-4 font-headline text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              {business.name}
            </h2>
            <p className="mt-1 font-body text-sm font-semibold text-brand-gold">
              {doctor.name} · {doctor.credentialsShort}
            </p>
            <p className="mt-0.5 font-body text-xs text-[#E3D1CE]">
              {business.streetAddress}, {business.addressLocality}
            </p>
          </div>

          {/* Main Card Body */}
          <div className="px-8 py-7 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blush px-3.5 py-1 font-body text-xs font-bold uppercase tracking-wider text-brand-red">
              ⭐⭐⭐⭐⭐ Share Your Experience
            </span>

            <h3 className="mt-3.5 font-headline text-xl font-black text-brand-ink sm:text-2xl leading-tight">
              Scan with your phone camera for 1-Tap review suggestions
            </h3>

            {/* QR Code Container */}
            <div className="mx-auto my-6 flex w-full max-w-[240px] flex-col items-center justify-center rounded-3xl border-2 border-brand-maroon/20 bg-brand-warm/40 p-4 shadow-inner">
              <picture>
                <source srcSet={qrImageSrc} type="image/png" />
                <img
                  src={qrImageSrc}
                  alt="Scan QR code to review RedCity Dental Care on Google"
                  width={220}
                  height={220}
                  className="rounded-2xl"
                />
              </picture>
              <span className="mt-2.5 font-body text-[11px] font-bold uppercase tracking-wider text-brand-maroon">
                redcitydental.com/review
              </span>
            </div>

            {/* 3 Simple Steps */}
            <div className="rounded-2xl bg-brand-warm/60 p-4 text-left font-body text-xs text-brand-ink">
              <span className="block font-bold text-brand-red mb-2 uppercase tracking-wider text-[11px]">
                How to review in 10 seconds:
              </span>
              <ol className="space-y-2">
                <li className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-maroon font-headline font-bold text-white text-[11px]">
                    1
                  </span>
                  <span>Point your phone camera at the QR code above</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-maroon font-headline font-bold text-white text-[11px]">
                    2
                  </span>
                  <span>Tap your treatment to pick a ready-made review note</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-maroon font-headline font-bold text-white text-[11px]">
                    3
                  </span>
                  <span>Tap <strong>Copy &amp; Open</strong>, paste 5 stars in Google &amp; post!</span>
                </li>
              </ol>
            </div>

            <p className="mt-5 font-body text-[11px] text-brand-muted">
              Thank you for trusting RedCity Dental Care. Your feedback helps other Ludhiana families find ethical dentistry.
            </p>
          </div>

          {/* Footer Ribbon */}
          <div className="border-t border-brand-line bg-brand-warm/40 py-3 text-center font-body text-[11px] text-brand-muted">
            Telephone: {business.telephoneDisplay} · Near South Model Town, Ludhiana
          </div>
        </div>
      </div>

      {/* Direct Google Maps Fallback Box (For printing an alternative direct-to-maps card) */}
      <div className="mx-auto mt-12 max-w-md px-6 text-center print:hidden">
        <div className="rounded-2xl border border-brand-line bg-white p-5 text-left">
          <span className="font-headline text-sm font-bold text-brand-ink block">
            Alternative: Direct Google Maps QR
          </span>
          <p className="font-body text-xs text-brand-muted mt-1">
            If you ever need a QR code that opens Google Maps directly without the review assistant helper:
          </p>
          <div className="mt-3 flex items-center gap-4">
            <picture>
              <source srcSet={directMapsQrSrc} type="image/png" />
              <img
                src={directMapsQrSrc}
                alt="Direct Google Maps QR"
                width={90}
                height={90}
                className="rounded-xl border border-brand-line"
              />
            </picture>
            <div className="text-xs font-body text-brand-muted">
              <span className="font-semibold text-brand-ink block">Direct Write-Review Link:</span>
              <span className="break-all text-[11px] font-mono">{business.googleWriteReviewUrl}</span>
              <a
                href={directMapsQrSrc}
                download="redcity-direct-google-maps-qr.png"
                className="mt-2 inline-block font-semibold text-brand-red underline"
              >
                Download Direct QR
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 text-xs font-body text-brand-muted">
          <Link href="/review" className="text-brand-red underline">
            ← Test the mobile Review Assistant page
          </Link>
        </div>
      </div>
    </main>
  );
}
