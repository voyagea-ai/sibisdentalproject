"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarPlus,
  Check,
  Loader2,
  MessageCircle,
  Phone,
  TriangleAlert,
} from "lucide-react";
import { appointmentSchema, type AppointmentInput } from "@/lib/validation";
import { treatments } from "@/content/treatments";
import { buildCalendarLink, buildWhatsAppLink, telLink } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

const treatmentOptions = [
  "General consultation",
  ...treatments.map((t) => t.title),
  "Other / not sure",
];

const timeOptions = [
  "Morning (9am – 12pm)",
  "Afternoon (12pm – 4pm)",
  "Evening (4pm – 8pm)",
  "Flexible",
];

export function AppointmentForm({
  defaultTreatment,
  compact = false,
  onSuccess,
}: {
  defaultTreatment?: string;
  compact?: boolean;
  onSuccess?: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const startedRef = useRef(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AppointmentInput>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      patientType: "new",
      treatment: defaultTreatment || "",
      company: "",
    },
  });

  useEffect(() => {
    if (defaultTreatment) {
      reset((prev) => ({ ...prev, treatment: defaultTreatment }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultTreatment]);

  const values = watch();

  function markStarted() {
    if (!startedRef.current) {
      startedRef.current = true;
      track("appointment_form_started");
    }
  }

  async function onSubmit(data: AppointmentInput) {
    if (status === "submitting") return; // prevent duplicate submissions
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      track("appointment_form_completed");
      onSuccess?.();
    } catch (err) {
      setStatus("error");
      setErrorMsg((err as Error).message);
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-hair-dark bg-white/70 p-8 text-center" role="status" aria-live="polite">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#d8c49b,#b89f72)] text-charcoal">
          <Check className="h-7 w-7" aria-hidden />
        </div>
        <h3 className="font-serif text-2xl text-charcoal">Request received</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          Your appointment request has been received. The clinic will contact you
          to confirm your preferred date and time. This is a request, not a
          confirmed appointment.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href={buildWhatsAppLink({ name: values.fullName, date: values.preferredDate })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_clicked", { source: "form-success" })}
            className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp the clinic
          </a>
          <a
            href={telLink}
            onClick={() => track("call_clicked", { source: "form-success" })}
            className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-charcoal px-5 py-2.5 text-sm font-medium text-text-light transition hover:opacity-90"
          >
            <Phone className="h-4 w-4" aria-hidden /> Call the clinic
          </a>
          <a
            href={buildCalendarLink({
              date: values.preferredDate,
              treatment: values.treatment,
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-hair-dark px-5 py-2.5 text-sm font-medium text-charcoal transition hover:bg-charcoal hover:text-text-light"
          >
            <CalendarPlus className="h-4 w-4" aria-hidden /> Add to calendar (tentative)
          </a>
        </div>
      </div>
    );
  }

  const fieldClass =
    "w-full rounded-xl border border-hair-dark bg-white/70 px-4 py-3 text-sm text-charcoal placeholder:text-muted/70 outline-none transition focus:border-champagne focus:ring-2 focus:ring-champagne/30";
  const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted";
  const errClass = "mt-1 text-xs text-red-600";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onFocusCapture={markStarted}
      noValidate
      className="space-y-4"
      aria-describedby="appointment-note"
    >
      {/* Honeypot — visually hidden, off-screen, not focusable */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
        </label>
      </div>

      <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
        <div>
          <label className={labelClass} htmlFor="fullName">
            Full name *
          </label>
          <input
            id="fullName"
            className={fieldClass}
            autoComplete="name"
            aria-invalid={!!errors.fullName}
            {...register("fullName")}
          />
          {errors.fullName && <p className={errClass}>{errors.fullName.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            Phone number *
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            className={fieldClass}
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          {errors.phone && <p className={errClass}>{errors.phone.message}</p>}
        </div>
      </div>

      <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
        <div>
          <label className={labelClass} htmlFor="preferredDate">
            Preferred date *
          </label>
          <input
            id="preferredDate"
            type="date"
            className={fieldClass}
            aria-invalid={!!errors.preferredDate}
            {...register("preferredDate")}
          />
          {errors.preferredDate && (
            <p className={errClass}>{errors.preferredDate.message}</p>
          )}
        </div>
        <div>
          <label className={labelClass} htmlFor="preferredTime">
            Preferred time *
          </label>
          <select
            id="preferredTime"
            className={fieldClass}
            aria-invalid={!!errors.preferredTime}
            defaultValue=""
            {...register("preferredTime")}
          >
            <option value="" disabled>
              Select a time
            </option>
            {timeOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.preferredTime && (
            <p className={errClass}>{errors.preferredTime.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="treatment">
          Treatment or concern *
        </label>
        <select
          id="treatment"
          className={fieldClass}
          aria-invalid={!!errors.treatment}
          defaultValue={defaultTreatment || ""}
          {...register("treatment")}
        >
          <option value="" disabled>
            Select a treatment or concern
          </option>
          {treatmentOptions.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {errors.treatment && <p className={errClass}>{errors.treatment.message}</p>}
      </div>

      <fieldset>
        <legend className={labelClass}>Are you a new or existing patient? *</legend>
        <div className="flex gap-3">
          {(["new", "existing"] as const).map((val) => (
            <label
              key={val}
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-hair-dark bg-white/60 px-4 py-3 text-sm capitalize text-charcoal transition has-[:checked]:border-champagne has-[:checked]:bg-champagne/10"
            >
              <input type="radio" value={val} className="accent-champagne" {...register("patientType")} />
              {val} patient
            </label>
          ))}
        </div>
        {errors.patientType && <p className={errClass}>{errors.patientType.message}</p>}
      </fieldset>

      <details className="group">
        <summary className="cursor-pointer list-none text-xs font-medium text-champagne">
          + Add email or a message (optional)
        </summary>
        <div className="mt-4 space-y-4">
          <div>
            <label className={labelClass} htmlFor="email">
              Email (optional)
            </label>
            <input
              id="email"
              type="email"
              inputMode="email"
              className={fieldClass}
              autoComplete="email"
              {...register("email")}
            />
            {errors.email && <p className={errClass}>{errors.email.message}</p>}
          </div>
          <div>
            <label className={labelClass} htmlFor="message">
              Additional message (optional)
            </label>
            <textarea
              id="message"
              rows={3}
              className={fieldClass}
              placeholder="Anything you'd like the clinic to know"
              {...register("message")}
            />
            {errors.message && <p className={errClass}>{errors.message.message}</p>}
          </div>
        </div>
      </details>

      <label className="flex items-start gap-3 text-sm text-muted">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 accent-champagne"
          aria-invalid={!!errors.consent}
          {...register("consent")}
        />
        <span>
          I agree to be contacted by {`Dr. Sibi's Dental Care and Implant Center`} regarding
          my appointment request.
        </span>
      </label>
      {errors.consent && <p className={errClass}>{errors.consent.message}</p>}

      {status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-charcoal px-6 py-4 text-sm font-medium text-text-light transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending request…
          </>
        ) : (
          "Request appointment"
        )}
      </button>

      <p id="appointment-note" className="text-center text-xs text-muted">
        Submitting sends an appointment <strong>request</strong> — not a confirmed
        appointment. The clinic will contact you to confirm.
      </p>
    </form>
  );
}
