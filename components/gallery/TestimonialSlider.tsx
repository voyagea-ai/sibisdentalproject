"use client";

import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/content/testimonials";

/**
 * Frosted-glass testimonial slider over a blurred clinic background.
 *
 * NOTE: `content/testimonials.ts` holds ILLUSTRATIVE SAMPLE reviews for this
 * portfolio build — replace with verified, clinic-approved reviews before a real
 * launch. No aggregate ratings are shown or added to structured data.
 */
export function TestimonialSlider() {
  const [i, setI] = useState(0);
  const count = testimonials.length;
  const t = testimonials[i];

  const go = (dir: number) => setI((prev) => (prev + dir + count) % count);

  return (
    <section
      data-nav-theme="dark"
      className="relative overflow-hidden bg-bg-dark py-24 text-text-light sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-20 blur-2xl"
        style={{ backgroundImage: "url('/images/gallery-reception.webp')" }}
      />
      <div className="absolute inset-0 bg-bg-dark/70" aria-hidden />

      <div className="container-x relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-5">What Patients Say</p>
          <h2 className="font-serif text-display-md text-text-light text-balance">
            What Patients Say
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          <div className="glass rounded-3xl p-8 text-center sm:p-12" aria-live="polite">
            <Quote className="mx-auto h-8 w-8 text-champagne" aria-hidden />
            <p className="mt-6 font-serif text-2xl leading-snug text-text-light/95 text-balance">
              &ldquo;{t.quote}&rdquo;
            </p>
            <p className="mt-6 text-sm font-medium text-text-light">{t.name}</p>
            <p className="mt-1 text-xs text-white/55">
              {t.treatment ? `${t.treatment} · ` : ""}
              {t.source}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-text-light transition hover:border-champagne"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <div className="flex gap-2" role="tablist" aria-label="Testimonials">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={idx === i}
                  aria-label={`Testimonial ${idx + 1}`}
                  onClick={() => setI(idx)}
                  className={`h-2 w-2 rounded-full transition ${
                    idx === i ? "scale-125 bg-champagne" : "bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-text-light transition hover:border-champagne"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
