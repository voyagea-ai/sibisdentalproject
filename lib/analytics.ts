"use client";

/**
 * Privacy-conscious event tracking. This is a thin, provider-agnostic shim:
 * it pushes events to a `dataLayer` if present and logs in development.
 * It NEVER collects sensitive medical information — only interaction names.
 */

export type AnalyticsEvent =
  | "appointment_button_clicked"
  | "appointment_form_started"
  | "appointment_form_completed"
  | "whatsapp_clicked"
  | "call_clicked"
  | "directions_clicked"
  | "treatment_viewed"
  | "implant_consultation_clicked";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function track(event: AnalyticsEvent, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const payload = { event, ...props };
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
  } catch {
    /* no-op */
  }
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", payload);
  }
}
