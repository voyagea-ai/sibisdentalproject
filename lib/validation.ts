import { z } from "zod";

/**
 * Appointment request schema. Intentionally light — the public website must NOT
 * collect detailed medical history. Includes a honeypot (`company`) for spam.
 */
export const appointmentSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(80, "Name is too long"),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(20, "Please enter a valid phone number")
    .regex(/^[+()\d\s-]+$/, "Please enter a valid phone number"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email")
    .max(120)
    .optional()
    .or(z.literal("")),
  preferredDate: z.string().trim().min(1, "Please choose a preferred date"),
  preferredTime: z.string().trim().min(1, "Please choose a preferred time"),
  treatment: z
    .string()
    .trim()
    .min(1, "Please select a treatment or concern")
    .max(120),
  patientType: z.enum(["new", "existing"], {
    errorMap: () => ({ message: "Please tell us if you are a new or existing patient" }),
  }),
  message: z.string().trim().max(600, "Message is too long").optional().or(z.literal("")),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please agree to be contacted about your request" }),
  }),
  // Honeypot — must be empty. Bots tend to fill every field.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;

/** Basic sanitisation: collapse whitespace and strip angle brackets. */
export function sanitize(value: string): string {
  return value.replace(/[<>]/g, "").replace(/\s+/g, " ").trim();
}
