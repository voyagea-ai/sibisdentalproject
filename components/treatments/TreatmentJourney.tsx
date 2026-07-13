"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { treatments } from "@/content/treatments";
import { MaskReveal, Reveal } from "@/components/ui/Reveal";
import { BookButton } from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

// R3F is loaded only on the client, only for this section.
const ScrollTooth = dynamic(() => import("./ScrollTooth"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse rounded-full bg-ivory/40" aria-hidden />
  ),
});

export function TreatmentJourney() {
  return (
    <section
      id="treatments"
      data-nav-theme="light"
      className="relative overflow-hidden bg-ivory py-24 sm:py-32"
    >
      <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Sticky 3D form + heading */}
        <div className="lg:sticky lg:top-28 lg:h-[70vh]">
          <p className="eyebrow mb-5">Treatment Journey</p>
          <h2 className="font-serif text-display-md text-charcoal text-balance">
            <MaskReveal lines={["Care for Every", "Stage of Your Smile"]} />
          </h2>
          <Reveal delay={0.1} className="mt-6 max-w-md text-base leading-relaxed text-muted">
            From preventive care to advanced restoration, every treatment begins
            with understanding your needs.
          </Reveal>
          <div className="pointer-events-none mx-auto mt-8 h-52 w-52 sm:h-64 sm:w-64">
            <ScrollTooth />
          </div>
          <p className="mt-2 text-center text-[11px] uppercase tracking-eyebrow text-muted lg:text-left">
            Every treatment begins with understanding
          </p>
        </div>

        {/* Vertical treatment journey */}
        <ol className="relative border-l border-hair-dark">
          {treatments.map((t, i) => (
            <li key={t.slug} className="relative pl-8 pb-10 last:pb-0 sm:pl-10">
              <span
                aria-hidden
                className="absolute -left-[6.5px] top-1.5 h-3 w-3 rounded-full border border-champagne bg-ivory"
              />
              <Reveal y={16}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-medium tabular-nums text-champagne">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1 font-serif text-2xl text-charcoal">{t.title}</h3>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
                      {t.shortDescription}
                    </p>
                  </div>
                  <Link
                    href={`/treatments/${t.slug}`}
                    onClick={() => track("treatment_viewed", { slug: t.slug })}
                    aria-label={`Learn about ${t.title}`}
                    className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hair-dark text-charcoal transition hover:bg-charcoal hover:text-text-light"
                  >
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
                <div className="mt-3 flex flex-wrap gap-3 text-xs">
                  <a
                    href={buildWhatsAppLink({
                      message: `Hello Dr. Sibi's Dental Care and Implant Center. I would like to discuss ${t.title}.`,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("whatsapp_clicked", { source: `treatment-${t.slug}` })}
                    className="inline-flex items-center gap-1.5 text-champagne transition hover:text-charcoal"
                  >
                    <MessageCircle className="h-3.5 w-3.5" aria-hidden /> Discuss this treatment
                  </a>
                  <BookButton
                    variant="ghost"
                    source={`treatment-${t.slug}`}
                    treatment={t.title}
                    className="!min-h-0 !px-3 !py-1 !text-xs text-charcoal"
                  >
                    Book Appointment
                  </BookButton>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
