import type { Metadata } from "next";
import { Info } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { AppointmentForm } from "@/components/appointments/AppointmentForm";
import { LocationSection } from "@/components/LocationSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { clinic } from "@/content/clinic";
import { buildWhatsAppLink, telLink } from "@/lib/whatsapp";

export const metadata: Metadata = pageMetadata({
  title: "Contact | Book an Appointment in Palani",
  description:
    "Contact Dr. Sibi's Dental Care and Implant Center in Palani. Request an appointment, call, WhatsApp, or get directions to the clinic.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        titleLines={["Let's Take Care", "of Your Smile"]}
        subtitle="Request an appointment in less than a minute, or reach the clinic directly by phone or WhatsApp."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />

      <section data-nav-theme="light" className="bg-bg-light py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <h2 className="font-serif text-2xl text-charcoal">Reach the clinic</h2>
            <div className="mt-6 space-y-3 text-sm">
              <a href={telLink} className="flex items-center justify-between rounded-2xl border border-hair-dark bg-white/60 p-4 transition hover:border-champagne">
                <span className="text-muted">Phone</span>
                <span className="font-medium text-charcoal">{clinic.phone.display}</span>
              </a>
              <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-2xl border border-hair-dark bg-white/60 p-4 transition hover:border-champagne">
                <span className="text-muted">WhatsApp</span>
                <span className="font-medium text-charcoal">{clinic.phone.display}</span>
              </a>
              <a href={clinic.social.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-2xl border border-hair-dark bg-white/60 p-4 transition hover:border-champagne">
                <span className="text-muted">Instagram</span>
                <span className="font-medium text-charcoal">{clinic.social.instagramHandle}</span>
              </a>
            </div>

            <div className="mt-6 rounded-2xl border border-dashed border-hair-dark bg-white/50 p-5">
              <div className="flex items-center gap-2 text-champagne">
                <Info className="h-4 w-4" aria-hidden />
                <h3 className="text-sm font-medium">Clinic hours &amp; emergency policy</h3>
              </div>
              <p className="mt-2 text-sm text-muted">
                Clinic hours: {clinic.hours}. For urgent dental concerns during clinic
                hours, please call the clinic directly. In a medical emergency, or
                outside clinic hours, contact appropriate local emergency services.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-hair-dark bg-white/60 p-6 sm:p-8">
            <h2 className="mb-6 font-serif text-2xl text-charcoal">Appointment request</h2>
            <AppointmentForm />
          </div>
        </div>
      </section>

      <LocationSection />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
    </>
  );
}
