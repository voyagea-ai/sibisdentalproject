import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { clinic } from "@/content/clinic";
import { PageHeader } from "@/components/ui/PageHeader";
import { CTASection } from "@/components/ui/CTASection";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, breadcrumbJsonLd, personJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Dr. V. Sibikumar, MDS | Prosthodontist & Implantologist in Palani",
  description:
    "Meet Dr. V. Sibikumar (MDS), prosthodontist and implantologist at Dr. Sibi's Dental Care and Implant Center in Palani. Thoughtful, patient-centred dental care.",
  path: "/doctor",
});

const areasOfFocus = [
  "Prosthodontics",
  "Dental implants",
  "Crowns and bridges",
  "Dentures",
  "Smile restoration",
];

export default function DoctorPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Doctor"
        titleLines={["Expertise Behind", "Every Smile"]}
        subtitle={`${clinic.doctor.name}, ${clinic.doctor.qualification} — ${clinic.doctor.roles.join(" & ")} in ${clinic.address.city}.`}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Doctor", href: "/doctor" },
        ]}
      />

      <section data-nav-theme="light" className="bg-bg-light py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-hair-dark">
              <Image
                src={clinic.doctor.portrait}
                alt={`Portrait of ${clinic.doctor.name}, ${clinic.doctor.roles.join(" and ")}`}
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
                priority
              />
            </div>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between border-b border-hair-dark pb-2">
                <dt className="text-muted">Name</dt>
                <dd className="text-charcoal">{clinic.doctor.name}</dd>
              </div>
              <div className="flex justify-between border-b border-hair-dark pb-2">
                <dt className="text-muted">Qualification</dt>
                <dd className="text-charcoal">{clinic.doctor.qualification}</dd>
              </div>
              <div className="flex justify-between border-b border-hair-dark pb-2">
                <dt className="text-muted">Specialisation</dt>
                <dd className="text-charcoal">{clinic.doctor.roles.join(", ")}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Location</dt>
                <dd className="text-charcoal">{clinic.address.city}</dd>
              </div>
            </dl>
          </div>

          <div className="space-y-10">
            <div>
              <h2 className="font-serif text-2xl text-charcoal">About Dr. Sibi</h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted">
                {clinic.doctor.biography}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-xs uppercase tracking-eyebrow text-champagne">Education</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-muted">
                  {clinic.doctor.education.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-eyebrow text-champagne">Experience</h3>
                <p className="mt-3 text-sm text-muted">
                  {clinic.doctor.experienceYears} of clinical experience in prosthodontics
                  and implant dentistry.
                </p>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-eyebrow text-champagne">Memberships</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-muted">
                  {clinic.doctor.memberships.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-eyebrow text-champagne">Certifications</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-muted">
                  {clinic.doctor.certifications.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-charcoal">Areas of focus</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {areasOfFocus.map((a) => (
                  <li key={a} className="flex items-center gap-2.5 text-sm text-muted">
                    <Check className="h-4 w-4 shrink-0 text-champagne" aria-hidden />
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            <Reveal className="rounded-2xl border border-hair-dark bg-white/50 p-6 text-sm text-muted">
              Care philosophy: every treatment begins with careful evaluation and a
              clear, unhurried conversation — so you understand your options before
              any decisions are made.
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection heading="Book a consultation with Dr. Sibi." source="doctor-page" />
      <JsonLd data={personJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Doctor", path: "/doctor" },
        ])}
      />
    </>
  );
}
