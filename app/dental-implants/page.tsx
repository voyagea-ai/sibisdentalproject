import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ImplantExperience } from "@/components/treatments/ImplantExperience";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { MedicalDisclaimer } from "@/components/ui/MedicalDisclaimer";
import { CTASection } from "@/components/ui/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { implantFaqs } from "@/content/faqs";

export const metadata: Metadata = pageMetadata({
  title: "Dental Implants in Palani | Implant Consultation",
  description:
    "A carefully planned approach to dental implants in Palani with implantologist Dr. V. Sibikumar. Learn about the consultation and general planning stages, then book a consultation.",
  path: "/dental-implants",
});

const planningStages = [
  "Consultation and evaluation of your dental health",
  "Personalised treatment planning",
  "Placement of the implant fixture",
  "A healing period tailored to you",
  "Fitting the abutment and restoration",
  "Follow-up care",
];

const benefits = [
  "Support for a natural-looking restoration",
  "Helps restore chewing comfort and confidence",
  "Designed around your individual anatomy",
  "Planned with your long-term dental health in mind",
];

const questions = [
  "Am I a suitable candidate for implants?",
  "What are the general stages for my situation?",
  "What is the expected timeframe?",
  "What does aftercare involve?",
  "What should I expect during recovery?",
];

export default function DentalImplantsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Dental Implants"
        titleLines={["A Carefully Planned", "Approach to Dental Implants"]}
        subtitle="Implant treatment begins with careful evaluation and personalised planning. Schedule a consultation to understand whether implants may be suitable for you."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Dental Implants", href: "/dental-implants" },
        ]}
      />

      {/* Cinematic assembly animation */}
      <ImplantExperience />

      <section data-nav-theme="light" className="bg-bg-light py-20 sm:py-24">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl text-charcoal">What dental implants are</h2>
            <p className="mt-4 leading-relaxed text-muted">
              A dental implant is a small titanium fixture that acts as a foundation
              for a custom-made restoration, replacing one or more missing teeth.
              Whether implants are appropriate for you is assessed through a
              consultation and examination.
            </p>

            <h2 className="mt-10 font-serif text-2xl text-charcoal">Consultation process</h2>
            <p className="mt-4 leading-relaxed text-muted">
              During a consultation, your dental health is reviewed and the area is
              examined. Dr. Sibi discusses whether implant treatment may be suitable
              and explains the general stages that could be involved.
            </p>

            <h2 className="mt-10 font-serif text-2xl text-charcoal">General planning stages</h2>
            <ol className="mt-4 space-y-3 border-l border-hair-dark">
              {planningStages.map((s, i) => (
                <li key={s} className="relative pl-6 text-sm text-muted">
                  <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border border-champagne bg-bg-light" aria-hidden />
                  <span className="text-champagne">{String(i + 1).padStart(2, "0")}</span> — {s}
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-muted">
              This is a general outline, not an exact representation of every
              patient&rsquo;s treatment.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-charcoal">Potential benefits</h2>
            <ul className="mt-4 grid gap-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-champagne" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-serif text-2xl text-charcoal">
              Questions to ask during a consultation
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {questions.map((q) => (
                <li key={q} className="rounded-xl border border-hair-dark bg-white/50 px-4 py-3">
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="container-x mt-16">
          <h2 className="font-serif text-2xl text-charcoal">Frequently asked questions</h2>
          <div className="mt-6 max-w-3xl">
            <FAQAccordion faqs={implantFaqs} />
          </div>
          <MedicalDisclaimer className="mt-10 max-w-3xl" />
        </div>
      </section>

      <CTASection
        heading="Book an implant consultation."
        copy="Understand whether implants may be suitable for you. The clinic will contact you to confirm your appointment."
        source="dental-implants"
        treatment="Dental Implants"
      />
      <JsonLd data={faqJsonLd(implantFaqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Dental Implants", path: "/dental-implants" },
        ])}
      />
    </>
  );
}
