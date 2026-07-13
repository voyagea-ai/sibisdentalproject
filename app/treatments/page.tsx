import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { TreatmentDirectory } from "@/components/treatments/TreatmentDirectory";
import { CTASection } from "@/components/ui/CTASection";
import { MedicalDisclaimer } from "@/components/ui/MedicalDisclaimer";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Dental Treatments in Palani",
  description:
    "Explore dental treatments at Dr. Sibi's Dental Care and Implant Center in Palani — from preventive care to implants, crowns, dentures and prosthodontic care.",
  path: "/treatments",
});

export default function TreatmentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Treatments"
        titleLines={["Care for Every", "Stage of Your Smile"]}
        subtitle="From preventive care to advanced restoration, every treatment begins with understanding your needs."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Treatments", href: "/treatments" },
        ]}
      />
      <section data-nav-theme="light" className="bg-bg-light py-20 sm:py-24">
        <div className="container-x">
          <TreatmentDirectory />
          <MedicalDisclaimer className="mt-14" />
        </div>
      </section>
      <CTASection source="treatments" />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Treatments", path: "/treatments" },
        ])}
      />
    </>
  );
}
