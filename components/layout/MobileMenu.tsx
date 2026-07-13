"use client";

import Link from "next/link";
import { useEffect } from "react";
import { X, Phone, MessageCircle, Instagram, MapPin } from "lucide-react";
import { primaryNav, clinic } from "@/content/clinic";
import { BookButton } from "@/components/ui/Button";
import { buildWhatsAppLink, telLink } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

/** Premium full-screen mobile menu. */
export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[110] bg-bg-dark text-text-light transition-all duration-500 ease-soft lg:hidden ${
        open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"
      }`}
      aria-hidden={!open}
      role="dialog"
      aria-modal={open}
      aria-label="Menu"
    >
      <div className="flex h-full flex-col overflow-y-auto px-6 pb-8 pt-4">
        <div className="flex items-center justify-between">
          <span className="font-serif text-lg">Dr. Sibi&rsquo;s Dental</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <nav className="mt-8 flex flex-col" aria-label="Mobile primary">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="border-b border-white/10 py-3.5 font-serif text-2xl text-text-light/90 transition hover:text-champagne"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8">
          <BookButton variant="gold" source="mobile-menu" className="w-full">
            Book Appointment
          </BookButton>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <a
              href={telLink}
              onClick={() => track("call_clicked", { source: "mobile-menu" })}
              className="flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/25 py-3 text-sm"
            >
              <Phone className="h-4 w-4" aria-hidden /> Call Now
            </a>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_clicked", { source: "mobile-menu" })}
              className="flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/25 py-3 text-sm"
            >
              <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-auto space-y-4 pt-8 text-sm text-white/60">
          <a
            href={clinic.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2"
          >
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-champagne" aria-hidden />
            <span>{clinic.address.full}</span>
          </a>
          <a
            href={clinic.social.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-champagne"
          >
            <Instagram className="h-4 w-4 text-champagne" aria-hidden />
            {clinic.social.instagramHandle}
          </a>
        </div>
      </div>
    </div>
  );
}
