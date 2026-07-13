"use client";

import { useCallback, useEffect, useRef } from "react";
import { X, Phone, MessageCircle } from "lucide-react";
import { AppointmentForm } from "./AppointmentForm";
import { buildWhatsAppLink, telLink } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Fast, accessible booking modal. Opens instantly, traps focus, closes on
 * Escape, restores focus to the trigger, and locks background scroll.
 * The form stays mounted so typed information is preserved across open/close.
 */
export function AppointmentModal({
  open,
  onClose,
  prefillTreatment,
}: {
  open: boolean;
  onClose: () => void;
  prefillTreatment?: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const nodes = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    // Focus the first field shortly after open.
    const t = window.setTimeout(() => {
      const first = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      first?.focus();
    }, 40);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(t);
      previouslyFocused.current?.focus?.();
    };
  }, [open, handleKeyDown]);

  return (
    <div
      className={`fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-6 ${
        open ? "" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-modal-title"
        className={`relative my-4 w-full max-w-lg rounded-3xl border border-hair-dark bg-bg-light shadow-2xl transition-all duration-300 ease-soft ${
          open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-hair-dark px-6 py-5 sm:px-8">
          <div>
            <p className="eyebrow mb-1">Book Appointment</p>
            <h2 id="appointment-modal-title" className="font-serif text-2xl text-charcoal">
              Let&rsquo;s take care of your smile
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking form"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hair-dark text-charcoal transition hover:bg-charcoal hover:text-text-light"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="px-6 py-6 sm:px-8">
          <div className="mb-5 flex gap-2">
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_clicked", { source: "modal" })}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-hair-dark px-4 py-2.5 text-sm font-medium text-charcoal transition hover:bg-[#25D366] hover:text-white hover:border-transparent"
            >
              <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
            </a>
            <a
              href={telLink}
              onClick={() => track("call_clicked", { source: "modal" })}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-hair-dark px-4 py-2.5 text-sm font-medium text-charcoal transition hover:bg-charcoal hover:text-text-light"
            >
              <Phone className="h-4 w-4" aria-hidden /> Call now
            </a>
          </div>
          {/* Form stays mounted to preserve typed information across open/close. */}
          <AppointmentForm defaultTreatment={prefillTreatment} compact />
        </div>
      </div>
    </div>
  );
}
