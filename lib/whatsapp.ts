import { clinic } from "@/content/clinic";

/**
 * Build a WhatsApp click-to-chat link with a pre-filled, dynamically
 * populated message. Never puts sensitive data in the URL beyond what the
 * user typed for their own request.
 */
export function buildWhatsAppLink(opts?: {
  name?: string;
  date?: string;
  message?: string;
}): string {
  const base = `https://wa.me/${clinic.phone.whatsapp}`;
  const name = opts?.name?.trim();
  const date = opts?.date?.trim();

  let text: string;
  if (opts?.message) {
    text = opts.message;
  } else if (name || date) {
    text = `Hello ${clinic.name}. I would like to request an appointment. My name is ${
      name || "[Name]"
    }, and my preferred date is ${date || "[Date]"}.`;
  } else {
    text = `Hello ${clinic.name}. I would like to request an appointment.`;
  }

  return `${base}?text=${encodeURIComponent(text)}`;
}

export const telLink = `tel:${clinic.phone.tel}`;

/** Google Calendar "tentative" event link for a requested slot. */
export function buildCalendarLink(opts: {
  date?: string;
  time?: string;
  treatment?: string;
}): string {
  const { date, time, treatment } = opts;
  const title = encodeURIComponent(
    `Dental appointment (requested) — ${clinic.shortName}`,
  );
  const details = encodeURIComponent(
    `Appointment request${
      treatment ? ` for ${treatment}` : ""
    }. This is tentative until the clinic confirms. Clinic: ${clinic.phone.display}.`,
  );
  const location = encodeURIComponent(clinic.address.full);

  // Build a loose all-day / timed window when we have a date.
  let dates = "";
  if (date) {
    const d = date.replace(/-/g, "");
    if (time) {
      const [h, m] = time.split(":");
      const start = `${d}T${(h || "10").padStart(2, "0")}${(m || "00").padStart(2, "0")}00`;
      const endH = String((parseInt(h || "10", 10) + 1) % 24).padStart(2, "0");
      const end = `${d}T${endH}${(m || "00").padStart(2, "0")}00`;
      dates = `&dates=${start}/${end}`;
    } else {
      dates = `&dates=${d}/${d}`;
    }
  }

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}${dates}`;
}
