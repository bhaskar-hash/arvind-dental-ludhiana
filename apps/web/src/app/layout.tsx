import type { Metadata } from "next";
import { Roboto_Slab, Inter, Noto_Sans_Gurmukhi } from "next/font/google";
import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/gtag";
import { GOOGLE_ADS_ID, META_PIXEL_ID } from "@/lib/ads";
import { business } from "@/lib/business";
import { defaultOgImage } from "@/lib/seo";
import { AnalyticsEvents } from "@/components/AnalyticsEvents";
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
  metadataBase: new URL(business.siteUrl),
  title: {
    default: "Dental Implants & Prosthodontics in Ludhiana | RedCity Dental Care",
    template: "%s | RedCity Dental Care",
  },
  description:
    "RedCity Dental Care & Implant Centre, 47 A/1 South Model Gram, Ludhiana. Led by Dr. Arvind Sahu, MDS (Prosthodontics): implants, crowns, dentures, root canals and family dental care.",
  keywords: [
    "dentist Ludhiana",
    "dental implant Ludhiana",
    "prosthodontist Ludhiana",
    "root canal treatment Ludhiana",
    "dental clinic South Model Gram",
  ],
  openGraph: {
    type: "website",
    siteName: "RedCity Dental Care & Implant Centre",
    title: "Dental Implants & Prosthodontics in Ludhiana | RedCity Dental Care",
    description:
      "Implants, crowns, dentures, root canals and family dental care with Dr. Arvind Sahu, MDS (Prosthodontics), South Model Gram, Ludhiana.",
    locale: "en_IN",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [defaultOgImage.url],
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
        <div id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </div>
        <SiteFooter />
        <StickyActions />
        <AnalyticsEvents />
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
                gtag('config', '${GA_MEASUREMENT_ID}');${GOOGLE_ADS_ID ? `\n                gtag('config', '${GOOGLE_ADS_ID}');` : ""}
                window.gtag = gtag;
              `}
            </Script>
          </>
        ) : null}
        {META_PIXEL_ID ? (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
              document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
