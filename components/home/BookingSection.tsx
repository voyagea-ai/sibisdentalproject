"use client";

import { MessageCircle, Phone, CalendarClock } from "lucide-react";
import { AppointmentForm } from "@/components/appointments/AppointmentForm";
import { buildWhatsAppLink, telLink } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import { MaskReveal } from "@/components/ui/Reveal";

export function BookingSection() {
  return (
    <section
      id="appointment"
      data-nav-theme="light"
      className="relative overflow-hidden bg-ivory py-24 sm:py-32"
    >
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <p className="eyebrow mb-5">Appointment</p>
          <h2 className="font-serif text-display-md text-charcoal text-balance">
            <MaskReveal lines={["Let's Take Care", "of Your Smile"]} />
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
            Request an appointment in less than a minute. The clinic will contact
            you to confirm the date and time.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_clicked", { source: "booking-section" })}
              className="flex items-center gap-3 rounded-2xl border border-hair-dark bg-white/60 p-4 transition hover:border-champagne"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white">
                <MessageCircle className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block font-medium text-charcoal">WhatsApp the clinic</span>
                <span className="block text-sm text-muted">Fastest way to reach us</span>
              </span>
            </a>
            <a
              href={telLink}
              onClick={() => track("call_clicked", { source: "booking-section" })}
              className="flex items-center gap-3 rounded-2xl border border-hair-dark bg-white/60 p-4 transition hover:border-champagne"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal text-text-light">
                <Phone className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block font-medium text-charcoal">Call now</span>
                <span className="block text-sm text-muted">Speak with the clinic directly</span>
              </span>
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-hair-dark bg-white/60 p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-2 text-sm text-champagne">
            <CalendarClock className="h-4 w-4" aria-hidden />
            <span className="font-medium">Appointment request form</span>
          </div>
          <AppointmentForm />
        </div>
      </div>
    </section>
  );
}
