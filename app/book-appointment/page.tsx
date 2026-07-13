import type { Metadata } from "next";
import { MessageCircle, Phone, Clock } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { AppointmentForm } from "@/components/appointments/AppointmentForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { clinic } from "@/content/clinic";
import { buildWhatsAppLink, telLink } from "@/lib/whatsapp";

export const metadata: Metadata = pageMetadata({
  title: "Book an Appointment | Dental Care in Palani",
  description:
    "Request an appointment at Dr. Sibi's Dental Care and Implant Center in Palani. The clinic will contact you to confirm your date and time.",
  path: "/book-appointment",
});

export default function BookAppointmentPage() {
  return (
    <>
      <PageHeader
        eyebrow="Appointment"
        titleLines={["Request an", "Appointment"]}
        subtitle="It takes less than a minute. Submitting this form sends a request — the clinic will contact you to confirm your preferred date and time."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Book Appointment", href: "/book-appointment" },
        ]}
      />

      <section data-nav-theme="light" className="bg-bg-light py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <h2 className="font-serif text-2xl text-charcoal">Prefer to talk?</h2>
            <p className="mt-3 text-sm text-muted">
              Reach the clinic directly — often the fastest way to arrange a visit.
            </p>
            <div className="mt-6 space-y-3">
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-hair-dark bg-white/60 p-4 transition hover:border-champagne"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white">
                  <MessageCircle className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <span className="block font-medium text-charcoal">WhatsApp the clinic</span>
                  <span className="block text-sm text-muted">{clinic.phone.display}</span>
                </span>
              </a>
              <a href={telLink} className="flex items-center gap-3 rounded-2xl border border-hair-dark bg-white/60 p-4 transition hover:border-champagne">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal text-text-light">
                  <Phone className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <span className="block font-medium text-charcoal">Call now</span>
                  <span className="block text-sm text-muted">{clinic.phone.display}</span>
                </span>
              </a>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm text-muted">
              <Clock className="h-4 w-4 text-champagne" aria-hidden />
              Clinic hours: {clinic.hours}
            </p>
          </div>

          <div className="rounded-3xl border border-hair-dark bg-white/60 p-6 sm:p-8">
            <AppointmentForm />
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Book Appointment", path: "/book-appointment" },
        ])}
      />
    </>
  );
}
