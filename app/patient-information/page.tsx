import type { Metadata } from "next";
import { Check, Info } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CTASection } from "@/components/ui/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { visitFaqs } from "@/content/faqs";

export const metadata: Metadata = pageMetadata({
  title: "Patient Information | Your Visit, Made Simple",
  description:
    "Preparing for your first visit to Dr. Sibi's Dental Care and Implant Center in Palani — what to bring, the appointment process and what to expect.",
  path: "/patient-information",
});

const bring = [
  "Any previous dental records or X-rays you may have",
  "A list of current medications",
  "Details of any relevant medical history",
  "A form of identification",
];

const expectations = [
  "A discussion of your dental history and any concerns",
  "A careful, unhurried examination",
  "A clear explanation of any suitable options",
  "Answers to your questions before any decisions are made",
];

/**
 * Illustrative sample content for this portfolio build. Payment, aftercare,
 * emergency and cancellation details must be confirmed/approved by the clinic
 * (aftercare by the dentist) before a real launch — see CONTENT-CHECKLIST.md.
 */
const placeholders = [
  {
    title: "Payment information",
    body: "The clinic accepts cash, UPI and major debit and credit cards. Treatment costs are discussed and confirmed during your consultation, before any treatment begins.",
  },
  {
    title: "Aftercare information",
    body: "You will receive personalised aftercare guidance tailored to your treatment, along with clear instructions for a comfortable recovery and who to contact with any questions.",
  },
  {
    title: "Emergency guidance",
    body: "For urgent dental concerns during clinic hours, call the clinic directly. Outside clinic hours, or in a medical emergency, please contact appropriate local emergency services.",
  },
  {
    title: "Cancellation policy",
    body: "If you need to reschedule, we kindly ask for at least 24 hours' notice so the clinic can offer the slot to another patient. Contact us by phone or WhatsApp.",
  },
];

export default function PatientInformationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Patient Experience"
        titleLines={["Your Visit,", "Made Simple"]}
        subtitle="Everything you need to feel prepared and comfortable for your appointment."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Patient Information", href: "/patient-information" },
        ]}
      />

      <section data-nav-theme="light" className="bg-bg-light py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl text-charcoal">Preparing for your first visit</h2>
            <p className="mt-4 leading-relaxed text-muted">
              Arriving a little early gives you time to settle in. If you can, bring
              any information that helps the clinic understand your dental history.
            </p>
            <h3 className="mt-8 font-serif text-xl text-charcoal">What to bring</h3>
            <ul className="mt-4 space-y-3">
              {bring.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-champagne" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-charcoal">The appointment process</h2>
            <ol className="mt-4 space-y-3 border-l border-hair-dark">
              {["Request an appointment", "Receive confirmation from the clinic", "Visit the clinic in Palani", "Consultation and examination", "Understand your options"].map((s, i) => (
                <li key={s} className="relative pl-6 text-sm text-muted">
                  <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border border-champagne bg-bg-light" aria-hidden />
                  <span className="text-champagne">{String(i + 1).padStart(2, "0")}</span> — {s}
                </li>
              ))}
            </ol>
            <h3 className="mt-8 font-serif text-xl text-charcoal">Consultation expectations</h3>
            <ul className="mt-4 space-y-3">
              {expectations.map((e) => (
                <li key={e} className="flex items-start gap-2.5 text-sm text-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-champagne" aria-hidden />
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="container-x mt-16">
          <div className="grid gap-4 sm:grid-cols-2">
            {placeholders.map((p) => (
              <div key={p.title} className="rounded-2xl border border-hair-dark bg-white/50 p-6">
                <div className="flex items-center gap-2 text-champagne">
                  <Info className="h-4 w-4" aria-hidden />
                  <h3 className="text-sm font-medium">{p.title}</h3>
                </div>
                <p className="mt-2 text-sm text-muted">{p.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 max-w-3xl">
            <h2 className="font-serif text-2xl text-charcoal">Frequently asked questions</h2>
            <div className="mt-6">
              <FAQAccordion faqs={visitFaqs} />
            </div>
          </div>
        </div>
      </section>

      <CTASection source="patient-information" />
      <JsonLd data={faqJsonLd(visitFaqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Patient Information", path: "/patient-information" },
        ])}
      />
    </>
  );
}
