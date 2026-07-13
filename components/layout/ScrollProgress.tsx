"use client";

import { useEffect, useState } from "react";
import { scrollSections } from "@/content/clinic";

/**
 * Small vertical progress rail (desktop) highlighting the active homepage
 * section. Uses IntersectionObserver on section anchors.
 */
export function ScrollProgress() {
  const [active, setActive] = useState<string>(scrollSections[0].id);

  useEffect(() => {
    const els = scrollSections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section progress"
      className="fixed left-6 top-1/2 z-[70] hidden -translate-y-1/2 flex-col gap-4 xl:flex"
    >
      {scrollSections.map((s) => {
        const isActive = active === s.id;
        return (
          <a key={s.id} href={`#${s.id}`} className="group flex items-center gap-3" aria-label={s.label}>
            <span
              className={`h-2 w-2 rounded-full border transition-all duration-300 ${
                isActive
                  ? "scale-150 border-champagne bg-champagne shadow-[0_0_10px_rgba(200,179,138,0.7)]"
                  : "border-muted/50 bg-transparent group-hover:border-champagne"
              }`}
            />
            {/* Labels appear on hover only, so they never overlap hero text. */}
            <span className="rounded-full bg-charcoal/70 px-2 py-0.5 text-[10px] uppercase tracking-wide text-text-light opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
              {s.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
