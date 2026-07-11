import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AppLayout from "@/components/AppLayout";

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Arvind Prosthodontics & Implant Centre | Best Dentist Ludhiana",
  description: "Ludhiana's leading MDS Prosthodontics & Implant Specialist clinic. Expert full mouth reconstructions, lifetime warranted implants, custom ceramic veneers, and painless crown fittings in Punjab.",
  keywords: "prosthodontist Ludhiana, dental implants Ludhiana, best dentist in Ludhiana, crown cost Ludhiana, smile makeover Punjab, full mouth rehabilitation Ludhiana",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Local Business SEO structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": "Arvind Prosthodontics & Implant Centre",
    "image": "https://images.unsplash.com/photo-1622253692010-333f2da6031d",
    "@id": "https://ludhianaprosthodontics.com",
    "url": "https://ludhianaprosthodontics.com",
    "telephone": "+918847651364",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "12-B, HIG Flats, Opp. Rose Garden, Main Model Town Road",
      "addressLocality": "Ludhiana",
      "addressRegion": "Punjab",
      "postalCode": "141001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 30.9018,
      "longitude": 75.8573
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:30",
        "closes": "19:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:30",
        "closes": "17:00"
      }
    ],
    "sameAs": [
      "https://facebook.com",
      "https://instagram.com"
    ]
  };

  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-luxury-50 text-slate-800 selection:bg-gold-100 selection:text-gold-700">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}

