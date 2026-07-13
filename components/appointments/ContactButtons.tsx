"use client";

import { MessageCircle, Phone } from "lucide-react";
import { clinic } from "@/content/clinic";
import { buildWhatsAppLink, telLink } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

export function WhatsAppButton({
  className = "",
  label = "WhatsApp",
  source = "generic",
  name,
  date,
}: {
  className?: string;
  label?: string;
  source?: string;
  name?: string;
  date?: string;
}) {
  return (
    <a
      href={buildWhatsAppLink({ name, date })}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_clicked", { source })}
      className={className}
      aria-label={`Message ${clinic.name} on WhatsApp`}
    >
      <MessageCircle className="h-4 w-4" aria-hidden />
      {label}
    </a>
  );
}

export function CallButton({
  className = "",
  label = "Call Now",
  source = "generic",
}: {
  className?: string;
  label?: string;
  source?: string;
}) {
  return (
    <a
      href={telLink}
      onClick={() => track("call_clicked", { source })}
      className={className}
      aria-label={`Call ${clinic.name} at ${clinic.phone.display}`}
    >
      <Phone className="h-4 w-4" aria-hidden />
      {label}
    </a>
  );
}
