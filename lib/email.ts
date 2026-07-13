import type { AppointmentInput } from "./validation";
import { clinic } from "@/content/clinic";

/**
 * Delivery of appointment requests to the clinic.
 *
 * This is provider-agnostic. If EMAIL_PROVIDER_API_KEY and
 * APPOINTMENT_RECEIVER_EMAIL are configured, it sends via a generic transactional
 * email HTTP API (example: Resend). If not configured, it logs the request
 * server-side so nothing is lost during development. Credentials are read from
 * environment variables only and are never exposed to the client.
 */

export interface DeliveryResult {
  delivered: boolean;
  channel: "email" | "log";
}

function renderText(data: AppointmentInput): string {
  return [
    `New appointment request — ${clinic.name}`,
    ``,
    `Name:            ${data.fullName}`,
    `Phone:           ${data.phone}`,
    `Email:           ${data.email || "—"}`,
    `Preferred date:  ${data.preferredDate}`,
    `Preferred time:  ${data.preferredTime}`,
    `Treatment:       ${data.treatment}`,
    `Patient type:    ${data.patientType}`,
    `Message:         ${data.message || "—"}`,
    ``,
    `This is an appointment REQUEST submitted from the website. Please contact the`,
    `patient to confirm a date and time.`,
  ].join("\n");
}

export async function deliverAppointment(
  data: AppointmentInput,
): Promise<DeliveryResult> {
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY;
  const to = process.env.APPOINTMENT_RECEIVER_EMAIL;
  const from = process.env.APPOINTMENT_SENDER_EMAIL || "appointments@drsibidental.com";

  if (!apiKey || !to) {
    // No provider configured — log securely (no secrets) so the request is not lost.
    // eslint-disable-next-line no-console
    console.info(
      "[appointments] Email not configured; logging request.\n" + renderText(data),
    );
    return { delivered: false, channel: "log" };
  }

  // Example integration with Resend's HTTP API. Swap for any provider.
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email || undefined,
        subject: `Appointment request — ${data.fullName}`,
        text: renderText(data),
      }),
    });

    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.error("[appointments] Email provider returned", res.status);
      return { delivered: false, channel: "email" };
    }
    return { delivered: true, channel: "email" };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[appointments] Email delivery failed", (err as Error).message);
    return { delivered: false, channel: "email" };
  }
}
