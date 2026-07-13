import { BookButton, LinkButton } from "./Button";
import { WhatsAppButton, CallButton } from "@/components/appointments/ContactButtons";

/**
 * Reusable appointment call-to-action band. A visible booking action is always
 * available across the site.
 */
export function CTASection({
  heading = "A better dental experience begins here.",
  copy = "Request an appointment in less than a minute. The clinic will contact you to confirm the date and time.",
  treatment,
  source = "cta",
}: {
  heading?: string;
  copy?: string;
  treatment?: string;
  source?: string;
}) {
  return (
    <section data-nav-theme="dark" className="grain relative overflow-hidden bg-bg-dark py-20 text-text-light sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[70%] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(200,179,138,0.22), transparent 70%)" }}
      />
      <div className="container-x relative z-10 text-center">
        <h2 className="mx-auto max-w-2xl font-serif text-display-md text-text-light text-balance">
          {heading}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-white/70">{copy}</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <BookButton variant="gold" source={source} treatment={treatment}>
            Book an Appointment
          </BookButton>
          <CallButton
            source={source}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm text-text-light transition hover:border-white/60"
          />
          <WhatsAppButton
            source={source}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm text-text-light transition hover:border-white/60"
          />
        </div>
      </div>
    </section>
  );
}
