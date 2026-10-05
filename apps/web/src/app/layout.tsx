import type { Metadata } from "next";
import { Roboto_Slab, Inter, Noto_Sans_Gurmukhi } from "next/font/google";
import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/gtag";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyActions } from "@/components/StickyActions";
import "./globals.css";

const headlineFont = Roboto_Slab({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-headline",
});
const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});
// Neither Inter nor Roboto Slab ship Gurmukhi glyphs, so Dr. Sahu's Punjabi
// message would otherwise fall back to whatever the OS happens to have.
const gurmukhiFont = Noto_Sans_Gurmukhi({
  subsets: ["gurmukhi", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-gurmukhi",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://redcitydentalcare.com",
  ),
  title: {
    default: "Dental Implant, Best Prosthodontist in Ludhiana | RedCity Dental Care",
    template: "%s | RedCity Dental Care & Implant Centre",
  },
  description:
    "RedCity Dental Care & Implant Centre, South Model Gram, Ludhiana — Dr. Arvind Sahu, MDS (Prosthodontics). Complete Care, Advanced Care, Personalized Care.",
  keywords: [
    "dentist Ludhiana",
    "dental implant Ludhiana",
    "best prosthodontist in Ludhiana",
    "root canal treatment Ludhiana",
    "dental clinic South Model Gram",
  ],
  openGraph: {
    type: "website",
    siteName: "RedCity Dental Care & Implant Centre",
    title: "Dental Implant, Best Prosthodontist in Ludhiana | RedCity Dental Care",
    description:
      "Complete Care · Advanced Care · Personalized Care — Dr. Arvind Sahu, MDS (Prosthodontics), South Model Gram, Ludhiana.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${headlineFont.variable} ${bodyFont.variable} ${gurmukhiFont.variable} font-body antialiased bg-white text-brand-ink`}
      >
        <SiteHeader />
        {children}
        <SiteFooter />
        <StickyActions />
        {GA_MEASUREMENT_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
                window.gtag = gtag;
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
