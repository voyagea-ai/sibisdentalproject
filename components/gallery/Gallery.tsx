import Image from "next/image";
import { MaskReveal, Reveal } from "@/components/ui/Reveal";

/**
 * Editorial clinic gallery.
 *
 * NOTE: For this portfolio build the tiles use polished interior/portrait
 * visualisations. They are premium design assets, not verified photographs of
 * the actual clinic — a single tasteful footnote makes that clear, and real
 * clinic photography should replace them before a live launch
 * (see CONTENT-CHECKLIST.md).
 */

const TILES = [
  { src: "/images/gallery-exterior.webp", label: "Exterior", span: "sm:col-span-2 sm:row-span-2", ratio: "" },
  { src: "/images/gallery-reception.webp", label: "Reception", span: "", ratio: "" },
  { src: "/images/room.webp", label: "Treatment room", span: "", ratio: "" },
  { src: "/images/gallery-equipment.webp", label: "Equipment", span: "", ratio: "" },
  { src: "/images/gallery-consultation.webp", label: "Consultation area", span: "", ratio: "" },
  { src: "/images/corridor.webp", label: "Clinic details", span: "sm:col-span-2", ratio: "" },
  { src: "/images/doctor-portrait.webp", label: "Dr. V. Sibikumar", span: "", ratio: "" },
];

export function Gallery({ heading = true }: { heading?: boolean }) {
  return (
    <section
      id="gallery"
      data-nav-theme="light"
      className="relative overflow-hidden bg-ivory py-24 sm:py-32"
    >
      <div className="container-x">
        {heading && (
          <div className="max-w-2xl">
            <p className="eyebrow mb-5">Inside the Clinic</p>
            <h2 className="font-serif text-display-md text-charcoal text-balance">
              <MaskReveal lines={["Inside the Clinic"]} />
            </h2>
            <Reveal delay={0.1} className="mt-6 text-sm text-muted">
              A glimpse of the calm, considered spaces where your care takes place.
            </Reveal>
          </div>
        )}

        <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[220px] sm:grid-cols-4">
          {TILES.map((t) => (
            <figure
              key={t.src + t.label}
              className={`group relative overflow-hidden rounded-2xl border border-hair-dark ${t.span}`}
            >
              <Image
                src={t.src}
                alt={`${t.label} — Dr. Sibi's Dental Care and Implant Center`}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-70" />
              <figcaption className="absolute inset-x-0 bottom-0 px-4 py-3 text-xs uppercase tracking-wide text-white/90">
                {t.label}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-6 text-xs text-muted">
          Interior design visualisations shown. Verified clinic photography will be
          added.
        </p>
      </div>
    </section>
  );
}
