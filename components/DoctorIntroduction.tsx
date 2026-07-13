import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { clinic } from "@/content/clinic";
import { Reveal, MaskReveal } from "@/components/ui/Reveal";
import { BookButton, LinkButton } from "@/components/ui/Button";

const credentials = [
  { label: "Doctor", value: clinic.doctor.name },
  { label: "Qualification", value: clinic.doctor.qualification },
  { label: "Focus", value: clinic.doctor.roles[0] },
  { label: "Also", value: clinic.doctor.roles[1] },
  { label: "Location", value: clinic.address.city },
];

export function DoctorIntroduction() {
  return (
    <section
      id="doctor"
      data-nav-theme="light"
      className="relative overflow-hidden bg-bg-light py-24 sm:py-32"
    >
      <div className="container-x grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* Portrait with vertical glass mask */}
        <Reveal className="relative mx-auto w-full max-w-md" y={30}>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-hair-dark">
            <Image
              src={clinic.doctor.portrait}
              alt={`Portrait of ${clinic.doctor.name}, ${clinic.doctor.roles.join(" and ")}`}
              fill
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)",
              }}
            />
          </div>
          <div className="mt-4 flex items-center gap-3 text-sm text-muted">
            <span className="h-px w-8 bg-champagne" />
            {clinic.doctor.name}, {clinic.doctor.qualification}
          </div>
        </Reveal>

        <div className="relative">
          {/* Thin architectural line */}
          <div aria-hidden className="absolute -left-6 top-0 hidden h-full w-px bg-hair-dark lg:block" />
          <p className="eyebrow mb-5">The Doctor</p>
          <h2 className="font-serif text-display-md text-charcoal text-balance">
            <MaskReveal lines={["Expertise Behind", "Every Smile"]} />
          </h2>
          <Reveal delay={0.1} className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            {clinic.doctor.name} brings a thoughtful approach to prosthodontics and
            implant dentistry, combining careful treatment planning with clear
            communication and patient-centred care.
          </Reveal>

          <dl className="mt-9 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3">
            {credentials.map((c, i) => (
              <Reveal as="div" key={c.label} delay={0.08 * i}>
                <dt className="text-[11px] uppercase tracking-wide text-champagne">{c.label}</dt>
                <dd className="mt-1 font-serif text-lg text-charcoal">{c.value}</dd>
              </Reveal>
            ))}
          </dl>

          <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-hair-dark pt-8 sm:grid-cols-4">
            {clinic.stats.map((s) => (
              <div key={s.label}>
                <dd className="font-serif text-3xl text-charcoal">{s.value}</dd>
                <dt className="mt-1 text-xs text-muted">{s.label}</dt>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <LinkButton href="/doctor" variant="primary">
              Meet the Doctor <ArrowRight className="h-4 w-4" aria-hidden />
            </LinkButton>
            <BookButton variant="ghost" source="doctor-section" className="text-charcoal">
              Book a Consultation
            </BookButton>
          </div>
        </div>
      </div>
    </section>
  );
}
