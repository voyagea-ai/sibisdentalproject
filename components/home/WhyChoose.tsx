import { Reveal, MaskReveal } from "@/components/ui/Reveal";

const MOMENTS = [
  {
    title: "Personalised Planning",
    body: "Every patient has different needs. Treatment discussions should begin with careful evaluation and clear explanation.",
  },
  {
    title: "Prosthodontic & Implant Focus",
    body: "Specialised attention to restoring dental function, comfort and appearance.",
  },
  {
    title: "Patient Communication",
    body: "Understand available options before making decisions about treatment.",
  },
  {
    title: "Comfortable Environment",
    body: "A clean, organised and welcoming setting designed to make visits feel less overwhelming.",
  },
];

export function WhyChoose() {
  return (
    <section
      data-nav-theme="dark"
      className="grain relative overflow-hidden bg-bg-dark py-24 text-text-light sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(169,202,210,0.2), transparent 70%)" }}
      />
      <div className="container-x relative z-10">
        <div className="max-w-2xl">
          <p className="eyebrow mb-5">Why Choose the Clinic</p>
          <h2 className="font-serif text-display-md text-text-light text-balance">
            <MaskReveal lines={["Care Built Around", "Clarity and Comfort"]} />
          </h2>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-hair-light bg-white/5 sm:grid-cols-2">
          {MOMENTS.map((m, i) => (
            <Reveal
              as="div"
              key={m.title}
              delay={0.06 * i}
              className="group relative bg-bg-dark p-8 transition-colors duration-500 hover:bg-white/[0.03] sm:p-12"
            >
              <span className="font-serif text-2xl text-champagne">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-serif text-2xl text-text-light">{m.title}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65">{m.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
