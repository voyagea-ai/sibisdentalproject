import Link from "next/link";
import { Phone, MessageCircle, Instagram, MapPin } from "lucide-react";
import { clinic, primaryNav, footerLegalNav } from "@/content/clinic";
import { buildWhatsAppLink, telLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer
      data-nav-theme="dark"
      className="grain relative overflow-hidden bg-bg-dark text-text-light"
    >
      {/* Subtle animated lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[80%] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(200,179,138,0.18) 0%, transparent 70%)",
        }}
      />
      <div className="container-x relative z-10 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 font-serif">
                S
              </span>
              <span className="font-serif text-xl">{clinic.name}</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              Precision dental care, implant expertise and a thoughtfully comfortable
              experience in Palani. {clinic.doctor.name}, {clinic.doctor.qualification} —{" "}
              {clinic.doctor.roles.join(" & ")}.
            </p>
            <div className="mt-6 flex flex-col gap-3 text-sm text-white/70">
              <a href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 hover:text-champagne">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-champagne" aria-hidden />
                <span>{clinic.address.full}</span>
              </a>
              <a href={telLink} className="flex items-center gap-2 hover:text-champagne">
                <Phone className="h-4 w-4 text-champagne" aria-hidden />
                {clinic.phone.display}
              </a>
              <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-champagne">
                <MessageCircle className="h-4 w-4 text-champagne" aria-hidden />
                WhatsApp
              </a>
              <a href={clinic.social.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-champagne">
                <Instagram className="h-4 w-4 text-champagne" aria-hidden />
                {clinic.social.instagramHandle}
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="text-sm">
            <h2 className="mb-4 text-xs uppercase tracking-eyebrow text-champagne">Explore</h2>
            <ul className="space-y-2.5">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/70 transition hover:text-text-light">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/book-appointment" className="text-white/70 transition hover:text-text-light">
                  Book Appointment
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Legal" className="text-sm">
            <h2 className="mb-4 text-xs uppercase tracking-eyebrow text-champagne">Information</h2>
            <ul className="space-y-2.5">
              {footerLegalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/70 transition hover:text-text-light">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-white/40">
              Clinic hours: {clinic.hours}
            </p>
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {clinic.name}. All rights reserved.
          </p>
          <p>{clinic.credit.text}</p>
        </div>
      </div>
    </footer>
  );
}
