import { business } from "./business";
import { doctor, clinicPhoto } from "./doctor";
import { services, type Service } from "./services";
import { ARTICLES_UPDATED, type BlogPost } from "./blog";

export function buildDentistSchema() {
  return {
    "@type": "Dentist",
    "@id": `${business.siteUrl}/#dentist`,
    name: business.name,
    image: [
      `${business.siteUrl}${clinicPhoto.fallback}`,
      `${business.siteUrl}${doctor.photo.fallback}`,
    ],
    logo: `${business.siteUrl}/redcity-logo.png`,
    url: business.siteUrl,
    telephone: business.telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.streetAddress,
      addressLocality: business.addressLocality,
      addressRegion: business.addressRegion,
      postalCode: business.postalCode,
      addressCountry: "IN",
    },
    // Omitted until real coordinates are known: 0,0 would place the clinic in the ocean.
    ...(business.geo.latitude && business.geo.longitude
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: business.geo.latitude,
            longitude: business.geo.longitude,
          },
        }
      : {}),
    ...(business.openingHours.length ? { openingHours: business.openingHours } : {}),
    sameAs: [business.googleBusinessUrl],
    areaServed: {
      "@type": "City",
      name: business.addressLocality,
    },
    founder: {
      "@type": "Person",
      "@id": `${business.siteUrl}/about#doctor`,
      name: doctor.name,
      jobTitle: doctor.role,
      image: `${business.siteUrl}${doctor.photo.fallback}`,
      url: `${business.siteUrl}/about`,
      hasCredential: doctor.credentials,
      ...(doctor.registration ? { identifier: doctor.registration } : {}),
      alumniOf: doctor.education.map((e) => ({
        "@type": "CollegeOrUniversity",
        name: e.institution,
      })),
      knowsAbout: doctor.expertise,
    },
    // Services as plain procedures (not "Offer"s, which describe things for sale).
    availableService: services.map((s) => ({
      "@type": "MedicalProcedure",
      name: s.shortName,
      url: `${business.siteUrl}/services/${s.slug}`,
    })),
    medicalSpecialty: "Dentistry",
    knowsLanguage: ["en", "pa", "hi"],
  };
}

export function buildFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildServiceSchemaGraph(service: Service) {
  return {
    "@context": "https://schema.org",
    "@graph": [buildDentistSchema(), buildFaqSchema(service.faqs)],
  };
}

export function buildArticleSchema(post: BlogPost) {
  return {
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    url: `${business.siteUrl}/blog/${post.slug}`,
    datePublished: ARTICLES_UPDATED,
    dateModified: ARTICLES_UPDATED,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${business.siteUrl}/blog/${post.slug}`,
    },
    author: {
      "@type": "Person",
      name: business.doctorName,
      jobTitle: business.doctorCredentials,
      url: `${business.siteUrl}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: business.name,
      url: business.siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${business.siteUrl}/redcity-logo.png`,
      },
    },
  };
}

export function buildBlogPostSchemaGraph(post: BlogPost) {
  // No FAQPage markup here: the articles are not written as visible Q&A, and
  // markup that doesn't match visible content can be treated as misleading.
  return {
    "@context": "https://schema.org",
    "@graph": [buildDentistSchema(), buildArticleSchema(post)],
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${business.siteUrl}${item.path}`,
    })),
  };
}
