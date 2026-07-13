import type { Metadata } from "next";
import { clinic } from "@/content/clinic";
import type { FAQ } from "@/content/faqs";

const SITE = clinic.siteUrl;

const LOCAL_KEYWORDS = [
  "dentist in Palani",
  "dental clinic in Palani",
  "implant dentist in Palani",
  "prosthodontist in Palani",
  "dental implant consultation in Palani",
  "Dr. Sibi dental clinic",
  "dental care in Palani",
];

/** Shared metadata builder for consistent, unique per-page SEO. */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}): Metadata {
  const url = `${SITE}${opts.path}`;
  const ogImage = opts.ogImage || "/images/og-default.jpg";
  return {
    title: opts.title,
    description: opts.description,
    keywords: LOCAL_KEYWORDS,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: opts.title,
      description: opts.description,
      siteName: clinic.name,
      locale: "en_IN",
      images: [{ url: ogImage, width: 1200, height: 630, alt: clinic.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [ogImage],
    },
  };
}

/** MedicalBusiness + Dentist LocalBusiness JSON-LD. Verified fields only. */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Dentist", "MedicalBusiness", "LocalBusiness"],
    "@id": `${SITE}#clinic`,
    name: clinic.name,
    url: SITE,
    telephone: clinic.phone.display,
    image: `${SITE}/images/og-default.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${clinic.address.line1}, ${clinic.address.line2}, ${clinic.address.line3}`,
      addressLocality: clinic.address.city,
      addressRegion: clinic.address.state,
      postalCode: clinic.address.postalCode,
      addressCountry: clinic.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: clinic.address.geo.latitude,
      longitude: clinic.address.geo.longitude,
    },
    sameAs: [clinic.social.instagramUrl],
    medicalSpecialty: ["Prosthodontics", "Dentistry"],
    // Sample opening hours (portfolio build). Ratings intentionally omitted — no
    // fake aggregate ratings or review counts are ever added.
    openingHoursSpecification: clinic.hoursStructured.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE}#doctor`,
    name: clinic.doctor.name,
    honorificSuffix: clinic.doctor.qualification,
    jobTitle: clinic.doctor.roles.join(" & "),
    worksFor: { "@id": `${SITE}#clinic` },
    url: `${SITE}/doctor`,
  };
}

export function faqJsonLd(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE}${item.path}`,
    })),
  };
}
