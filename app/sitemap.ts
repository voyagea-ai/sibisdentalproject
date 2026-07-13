import type { MetadataRoute } from "next";
import { clinic } from "@/content/clinic";
import { treatments } from "@/content/treatments";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = clinic.siteUrl;
  const now = new Date();

  const staticPaths = [
    "",
    "/about",
    "/doctor",
    "/treatments",
    "/dental-implants",
    "/patient-information",
    "/gallery",
    "/contact",
    "/book-appointment",
    "/privacy-policy",
    "/terms",
    "/medical-disclaimer",
    "/accessibility",
  ];

  const staticEntries = staticPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const treatmentEntries = treatments.map((t) => ({
    url: `${base}/treatments/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...treatmentEntries];
}
