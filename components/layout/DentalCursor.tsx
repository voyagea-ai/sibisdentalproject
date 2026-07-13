"use client";

import { useEffect, useRef } from "react";

/**
 * Soft circular dental-light glow that follows the cursor on desktop dark
 * sections. Low opacity, never blocks clicks, disabled on touch and reduced
 * motion. The hero (#welcome) renders its own integrated glow, so this one
 * stays hidden there to avoid doubling up.
 */
export function DentalCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none)").matches;
    if (reduced || touch) return;

    const el = ref.current;
    if (!el) return;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.left = `${e.clientX}px`;
        el.style.top = `${e.clientY}px`;
        // Show only over dark sections, but not over the hero.
        let node = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
        let dark = false;
        while (node) {
          if (node.id === "welcome") {
            dark = false;
            break;
          }
          if (node.dataset?.navTheme === "dark") {
            dark = true;
            break;
          }
          if (node.dataset?.navTheme === "light") break;
          node = node.parentElement;
        }
        el.style.opacity = dark ? "1" : "0";
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed z-[60] hidden h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 mix-blend-screen transition-opacity duration-500 md:block"
      style={{
        background:
          "radial-gradient(circle, rgba(238,234,225,0.22) 0%, rgba(200,179,138,0.08) 40%, transparent 70%)",
      }}
    />
  );
}
