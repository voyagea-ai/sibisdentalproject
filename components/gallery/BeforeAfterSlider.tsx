"use client";

import { useRef, useState } from "react";
import { treatmentCases } from "@/content/testimonials";

/**
 * Interactive drag comparison slider. Reusable for real, consented before/after
 * cases when they are supplied. It never fabricates clinical outcomes — the
 * homepage uses the "coming soon" state until approved cases exist.
 */
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before",
  afterAlt = "After",
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const move = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-3xl border border-hair-dark"
      onMouseMove={(e) => e.buttons === 1 && move(e.clientX)}
      onTouchMove={(e) => move(e.touches[0].clientX)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={afterSrc} alt={afterAlt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={beforeSrc} alt={beforeAlt} className="absolute inset-0 h-full w-full object-cover" style={{ width: `${10000 / pos}%`, maxWidth: "none" }} />
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Compare before and after"
        className="absolute inset-x-0 bottom-4 mx-auto w-[80%] accent-champagne"
      />
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-white"
        style={{ left: `${pos}%` }}
        aria-hidden
      />
    </div>
  );
}

/**
 * Treatment Stories with an interactive drag comparison.
 *
 * NOTE: The case shown is an ILLUSTRATIVE SAMPLE for this portfolio build
 * (see content/testimonials.ts). Real before/after cases must use genuine,
 * clinic-approved photographs with patient consent — see CONTENT-CHECKLIST.md.
 */
export function TreatmentStories() {
  const c = treatmentCases[0];
  return (
    <section
      data-nav-theme="light"
      className="relative overflow-hidden bg-bg-light py-24 sm:py-28"
    >
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow mb-5">Treatment Stories</p>
          <h2 className="font-serif text-display-md text-charcoal text-balance">
            Restoring Function. Rebuilding Confidence.
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-muted">
            Drag the slider to see the kind of natural, confident result thoughtful
            treatment can help achieve.
          </p>
          <span className="mt-6 inline-block rounded-full bg-ivory px-3 py-1 text-[11px] uppercase tracking-wide text-muted">
            {c.category}
          </span>
          <p className="mt-4 max-w-md text-xs text-muted">
            Illustrative example — representative of general outcomes, not a specific
            patient case.
          </p>
        </div>
        <div>
          <BeforeAfterSlider
            beforeSrc={c.before}
            afterSrc={c.after}
            beforeAlt="A natural smile before cosmetic treatment (illustrative)"
            afterAlt="A brighter, even smile after cosmetic treatment (illustrative)"
          />
          <div className="mt-3 flex justify-between text-xs uppercase tracking-wide text-muted">
            <span>Before</span>
            <span>After</span>
          </div>
        </div>
      </div>
    </section>
  );
}
