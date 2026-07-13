import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Gallery } from "@/components/gallery/Gallery";
import { TreatmentStories } from "@/components/gallery/BeforeAfterSlider";
import { CTASection } from "@/components/ui/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Gallery | Inside the Clinic",
  description:
    "A glimpse inside Dr. Sibi's Dental Care and Implant Center in Palani. Verified clinic photographs will be added as they are supplied.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        titleLines={["Inside the Clinic"]}
        subtitle="An editorial look at the clinic. Real, verified photographs will be published as they are supplied."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Gallery", href: "/gallery" },
        ]}
        image="/images/corridor.webp"
      />
      <Gallery heading={false} />
      <TreatmentStories />
      <CTASection source="gallery" />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ])}
      />
    </>
  );
}
