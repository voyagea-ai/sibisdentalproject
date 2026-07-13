import {
  CalendarCheck,
  BadgeCheck,
  MapPin,
  Stethoscope,
  ClipboardList,
  FileText,
  Sparkles,
  HeartPulse,
} from "lucide-react";
import { Reveal, MaskReveal } from "@/components/ui/Reveal";

const STEPS = [
  { icon: CalendarCheck, title: "Request an appointment", body: "Send a quick request online, by phone or WhatsApp." },
  { icon: BadgeCheck, title: "Receive confirmation", body: "The clinic contacts you to confirm a date and time." },
  { icon: MapPin, title: "Visit the clinic", body: "Arrive at a calm, welcoming reception in Palani." },
  { icon: Stethoscope, title: "Consultation & examination", body: "A careful, unhurried assessment of your needs." },
  { icon: ClipboardList, title: "Understand your options", body: "Clear explanations of the choices available to you." },
  { icon: FileText, title: "Receive a personalised plan", body: "A plan shaped around your comfort and goals." },
  { icon: Sparkles, title: "Begin treatment", body: "Treatment proceeds at a pace that suits you." },
  { icon: HeartPulse, title: "Follow-up care", body: "Ongoing support to look after your smile." },
];

export function PatientJourney() {
  return (
    <section
      id="experience"
      data-nav-theme="light"
      className="relative overflow-hidden bg-bg-light py-24 sm:py-32"
    >
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow mb-5">Patient Journey</p>
          <h2 className="font-serif text-display-md text-charcoal text-balance">
            <MaskReveal lines={["Your Visit,", "Made Simple"]} />
          </h2>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal as="div" key={s.title} delay={0.05 * (i % 4)} className="relative">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-hair-dark text-champagne">
                  <s.icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="text-[11px] font-medium tabular-nums text-muted">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 font-serif text-lg text-charcoal">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
