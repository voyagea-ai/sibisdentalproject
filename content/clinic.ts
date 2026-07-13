/**
 * Single source of truth for clinic information.
 * Only VERIFIED details are hard-coded. Anything unverified is marked with a
 * `TO_BE_CONFIRMED` placeholder so it is never silently invented.
 * See CONTENT-CHECKLIST.md before launch.
 */

export const TO_BE_CONFIRMED = "To be confirmed" as const;

export const clinic = {
  name: "Dr. Sibi's Dental Care and Implant Center",
  shortName: "Dr. Sibi's Dental Care",
  doctor: {
    name: "Dr. V. Sibikumar",
    qualification: "MDS",
    roles: ["Prosthodontist", "Implantologist"],
    portrait: "/images/doctor-portrait.webp",
    // NOTE: The details below are illustrative sample content for this
    // portfolio build. Replace with the doctor's verified information before a
    // real launch — see CONTENT-CHECKLIST.md.
    biography:
      "Dr. V. Sibikumar is a prosthodontist and implantologist dedicated to restoring smiles with precision and genuine care. After completing his Master of Dental Surgery in Prosthodontics, he focused his practice on dental implants, full-mouth rehabilitation and aesthetic restoration. He founded the clinic in Palani to bring considered, comfortable dental care closer to the community — every treatment beginning with careful planning and a clear, unhurried conversation.",
    education: [
      "Master of Dental Surgery (MDS), Prosthodontics & Crown and Bridge",
      "Bachelor of Dental Surgery (BDS)",
    ],
    experienceYears: "12+ years",
    memberships: [
      "Indian Dental Association (IDA)",
      "Indian Prosthodontic Society (IPS)",
    ],
    certifications: [
      "Certified in Basic & Advanced Oral Implantology",
      "Digital Smile Design workflow",
    ],
    awards: ["Continuing education in digital implant dentistry"],
  },
  phone: {
    display: "+91 88700 83015",
    tel: "+918870083015",
    whatsapp: "918870083015",
  },
  address: {
    line1: "18, Thiruvalluvar Street",
    line2: "Opposite Tamil Ilakkiya Mandram",
    line3: "Shanmugappuram",
    city: "Palani",
    state: "Tamil Nadu",
    postalCode: "624601",
    country: "IN",
    full: "18, Thiruvalluvar Street, Opposite Tamil Ilakkiya Mandram, Shanmugappuram, Palani, Tamil Nadu 624601",
    // Approximate coordinates for Palani town centre — replace with the clinic's
    // exact verified pin before launch (see CONTENT-CHECKLIST.md).
    geo: { latitude: 10.4497, longitude: 77.5216 },
  },
  // Illustrative sample hours for this portfolio build — confirm before launch.
  hours: "Mon – Sat: 10:00 AM – 8:00 PM · Sun: By appointment",
  hoursStructured: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "20:00" },
  ],
  social: {
    instagramHandle: "@kvsibikumar",
    instagramUrl: "https://www.instagram.com/kvsibikumar",
  },
  // Overridable at build time via NEXT_PUBLIC_* env vars.
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://drsibidental.com",
  mapsUrl:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ||
    "https://www.google.com/maps/search/?api=1&query=Dr.+Sibi%27s+Dental+Care+and+Implant+Center+Palani",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent(
      "Dr. Sibi's Dental Care and Implant Center, Thiruvalluvar Street, Shanmugappuram, Palani, Tamil Nadu 624601",
    ),
  mapEmbedUrl:
    "https://www.google.com/maps?q=" +
    encodeURIComponent(
      "Thiruvalluvar Street, Shanmugappuram, Palani, Tamil Nadu 624601",
    ) +
    "&z=15&output=embed",
  // Illustrative sample stats for this portfolio build — confirm before launch.
  stats: [
    { value: "12+", label: "Years of experience" },
    { value: "3,000+", label: "Smiles cared for" },
    { value: "6", label: "Areas of specialised care" },
    { value: "100%", label: "Focus on comfort" },
  ],
  credit: {
    text: "Website designed and developed by PTRI Innovation",
    name: "PTRI Innovation",
  },
} as const;

export type Clinic = typeof clinic;

/** Navigation model shared by header, mobile menu and footer. */
export const primaryNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Doctor", href: "/doctor" },
  { label: "Treatments", href: "/treatments" },
  { label: "Dental Implants", href: "/dental-implants" },
  { label: "Patient Experience", href: "/patient-information" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerLegalNav = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms" },
  { label: "Medical Disclaimer", href: "/medical-disclaimer" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Sitemap", href: "/sitemap.xml" },
] as const;

/** Scroll-progress rail sections on the homepage. */
export const scrollSections = [
  { id: "welcome", label: "Welcome" },
  { id: "doctor", label: "Doctor" },
  { id: "treatments", label: "Treatments" },
  { id: "experience", label: "Experience" },
  { id: "appointment", label: "Appointment" },
] as const;
