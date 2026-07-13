"use client";

import { MapPin, Navigation, Phone, MessageCircle, Instagram, Clock } from "lucide-react";
import { clinic } from "@/content/clinic";
import { buildWhatsAppLink, telLink } from "@/lib/whatsapp";
import { BookButton } from "@/components/ui/Button";
import { track } from "@/lib/analytics";

export function LocationSection() {
  const actions = [
    { label: "Open in Google Maps", href: clinic.mapsUrl, icon: MapPin, external: true },
    {
      label: "Get Directions",
      href: clinic.directionsUrl,
      icon: Navigation,
      external: true,
      onClick: () => track("directions_clicked", { source: "location" }),
    },
    { label: "Call Now", href: telLink, icon: Phone, onClick: () => track("call_clicked", { source: "location" }) },
    { label: "WhatsApp", href: buildWhatsAppLink(), icon: MessageCircle, external: true, onClick: () => track("whatsapp_clicked", { source: "location" }) },
    { label: clinic.social.instagramHandle, href: clinic.social.instagramUrl, icon: Instagram, external: true },
  ];

  return (
    <section
      id="location"
      data-nav-theme="light"
      className="relative overflow-hidden bg-bg-light py-24 sm:py-28"
    >
      <div className="container-x grid gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow mb-5">Location</p>
          <h2 className="font-serif text-display-md text-charcoal text-balance">
            Visit the Clinic in Palani
          </h2>
          <address className="mt-8 not-italic">
            <p className="font-serif text-xl text-charcoal">{clinic.name}</p>
            <p className="mt-2 max-w-xs text-muted">
              {clinic.address.line1}
              <br />
              {clinic.address.line2}
              <br />
              {clinic.address.line3}
              <br />
              {clinic.address.city}, {clinic.address.state} {clinic.address.postalCode}
            </p>
            <a href={telLink} className="mt-4 inline-block font-medium text-charcoal hover:text-champagne">
              {clinic.phone.display}
            </a>
          </address>

          <p className="mt-6 flex items-center gap-2 text-sm text-muted">
            <Clock className="h-4 w-4 text-champagne" aria-hidden />
            Clinic hours: {clinic.hours}
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {actions.map((a) => (
              <a
                key={a.label}
                href={a.href}
                onClick={a.onClick}
                {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-hair-dark px-4 py-2 text-sm text-charcoal transition hover:bg-charcoal hover:text-text-light"
              >
                <a.icon className="h-4 w-4" aria-hidden />
                {a.label}
              </a>
            ))}
            <BookButton variant="gold" source="location" className="!min-h-[44px] !py-2">
              Book Appointment
            </BookButton>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-hair-dark">
          <iframe
            title={`Map showing the location of ${clinic.name}`}
            src={clinic.mapEmbedUrl}
            className="h-full min-h-[360px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
