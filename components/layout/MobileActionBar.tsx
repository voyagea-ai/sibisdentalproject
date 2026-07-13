"use client";

import { Phone, MessageCircle, CalendarClock } from "lucide-react";
import { useAppointment } from "@/components/appointments/appointment-context";
import { buildWhatsAppLink, telLink } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

/**
 * Persistent bottom action bar on mobile — Call, WhatsApp, Book always reachable.
 */
export function MobileActionBar() {
  const { openAppointment } = useAppointment();
  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] border-t border-hair-dark bg-bg-light/95 backdrop-blur-md lg:hidden">
      <div
        className="grid grid-cols-3"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <a
          href={telLink}
          onClick={() => track("call_clicked", { source: "mobile-bar" })}
          className="flex min-h-[60px] flex-col items-center justify-center gap-1 text-charcoal"
        >
          <Phone className="h-5 w-5" aria-hidden />
          <span className="text-[11px] font-medium">Call</span>
        </a>
        <a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_clicked", { source: "mobile-bar" })}
          className="flex min-h-[60px] flex-col items-center justify-center gap-1 border-x border-hair-dark text-charcoal"
        >
          <MessageCircle className="h-5 w-5" aria-hidden />
          <span className="text-[11px] font-medium">WhatsApp</span>
        </a>
        <button
          type="button"
          onClick={() => {
            track("appointment_button_clicked", { source: "mobile-bar" });
            openAppointment();
          }}
          className="flex min-h-[60px] flex-col items-center justify-center gap-1 bg-[linear-gradient(135deg,#d8c49b,#b89f72)] text-charcoal"
        >
          <CalendarClock className="h-5 w-5" aria-hidden />
          <span className="text-[11px] font-medium">Book</span>
        </button>
      </div>
    </div>
  );
}
