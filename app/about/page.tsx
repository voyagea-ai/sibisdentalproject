import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Gallery } from "@/components/gallery/Gallery";
import { LocationSection } from "@/components/LocationSection";
import { CTASection } from "@/components/ui/CTASection";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About the Clinic | Dental Care in Palani",
  description:
    "About Dr. Sibi's Dental Care and Implant Center in Palani — our care philosophy, comfort-focused approach, technology and thoughtful treatment planning.",
  path: "/about",
});

const values = [
  {
    title: "Care philosophy",
    body: "We believe good dentistry begins with listening. Every visit starts with understanding your needs and explaining the options clearly, without pressure.",
  },
  {
    title: "Comfort-focused approach",
    body: "A calm, welcoming environment designed to make dental visits feel less overwhelming — from the moment you arrive to your follow-up care.",
  },
  {
    title: "Technology",
    body: "Considered use of modern dental technology supports precise, well-informed and comfortable care.",
  },
  {
    title: "Treatment planning",
    body: "Careful, personalised planning shaped around your comfort, your goals and your long-term dental health.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        titleLines={["A Better Dental", "Experience Begins Here"]}
        subtitle="Precision dental care, implant expertise and a thoughtfully comfortable experience in Palani."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
        image="/images/room.webp"
      />

      <section data-nav-theme="light" className="bg-bg-light py-20 sm:py-24">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5">Introduction</p>
            <h2 className="font-serif text-display-md text-charcoal text-balance">
              Designed for comfort. Built around your smile.
            </h2>
            <p className="mt-6 leading-relaxed text-muted">
              Dr. Sibi&rsquo;s Dental Care and Implant Center is a modern dental
              practice in Palani led by {`Dr. V. Sibikumar`}, a prosthodontist and
              implantologist. Our focus is calm, clear and considered care — from
              routine check-ups to advanced restoration and implant treatment.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal
                as="div"
                key={v.title}
                delay={0.06 * i}
                className="rounded-3xl border border-hair-dark bg-white/50 p-8"
              >
                <h3 className="font-serif text-xl text-charcoal">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Gallery heading />
      <LocationSection />
      <CTASection source="about" />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
    </>
  );
}
