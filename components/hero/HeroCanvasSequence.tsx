"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { clinic } from "@/content/clinic";
import { BookButton } from "@/components/ui/Button";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";
import { getDeviceTier } from "@/lib/device";
import { HERO_SEQUENCES } from "@/lib/hero-sequence";
import { createFrameLoader, type FrameLoader } from "@/lib/frame-loader";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ReducedMotionFallback } from "./ReducedMotionFallback";

const SCROLL_VH = 440; // pinned scroll length (~4x viewport)

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}
function smoothstep(a: number, b: number, x: number) {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
}
/** Opacity for a band that ramps in after `start` and out before `end`. */
function band(p: number, start: number, end: number, fade = 0.04) {
  return smoothstep(start, start + fade, p) * (1 - smoothstep(end - fade, end, p));
}

const ORBIT_WORDS = ["Precision", "Comfort", "Technology", "Care"];

export function HeroCanvasSequence({
  onReady,
  onProgress,
}: {
  onReady?: () => void;
  onProgress?: (pct: number) => void;
}) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  // Overlay band refs
  const heroRef = useRef<HTMLDivElement>(null);
  const band1Ref = useRef<HTMLDivElement>(null);
  const band2Ref = useRef<HTMLDivElement>(null);
  const band3Ref = useRef<HTMLDivElement>(null);
  const band4Ref = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (reduced || !mounted) return;
    registerGsap();

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;
    // Aliases whose types exclude null, so nested closures stay type-safe.
    const cnv: HTMLCanvasElement = canvas;
    const cx: CanvasRenderingContext2D = context;

    const tier = getDeviceTier();
    const manifest = HERO_SEQUENCES[tier];
    let loader: FrameLoader | null = null;
    let readyFired = false;
    let currentDrawn = -1;

    const fireReady = () => {
      if (readyFired) return;
      readyFired = true;
      onReady?.();
    };
    // Failsafe: never let the loader block the page for more than 4.5s.
    const failsafe = window.setTimeout(fireReady, 4500);

    function sizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = cnv.clientWidth || window.innerWidth;
      const h = cnv.clientHeight || window.innerHeight;
      cnv.width = Math.round(w * dpr);
      cnv.height = Math.round(h * dpr);
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawCover(img: HTMLImageElement) {
      const cw = cnv.clientWidth || window.innerWidth;
      const ch = cnv.clientHeight || window.innerHeight;
      const scale = Math.max(cw / img.width, ch / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      cx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    }

    function drawFrameForProgress(p: number) {
      if (!loader) return;
      const target = Math.round(p * (manifest.count - 1));
      const idx = loader.nearest(target);
      if (idx === currentDrawn) return;
      const img = loader.images[idx];
      if (img) {
        drawCover(img);
        currentDrawn = idx;
      }
    }

    function updateOverlays(p: number) {
      // Opening hero text: full at top, fades as we enter.
      const heroOut = 1 - smoothstep(0.05, 0.16, p);
      if (heroRef.current) {
        heroRef.current.style.opacity = String(heroOut);
        heroRef.current.style.transform = `translateY(${(1 - heroOut) * -26}px)`;
      }
      if (scrollHintRef.current) {
        scrollHintRef.current.style.opacity = String(1 - smoothstep(0.02, 0.1, p));
      }

      const setBand = (
        ref: React.RefObject<HTMLDivElement | null>,
        start: number,
        end: number,
      ) => {
        if (!ref.current) return;
        const o = band(p, start, end);
        ref.current.style.opacity = String(o);
        ref.current.style.transform = `translateY(${(1 - o) * 22}px)`;
      };
      setBand(band1Ref, 0.14, 0.26);
      setBand(band2Ref, 0.27, 0.42);
      setBand(band3Ref, 0.67, 0.82);

      // Orbit words (0.42–0.67), revealed one at a time.
      const orbitVisible = band(p, 0.42, 0.68, 0.03);
      if (band4Ref.current) band4Ref.current.style.opacity = String(orbitVisible);
      ORBIT_WORDS.forEach((_, i) => {
        const el = wordRefs.current[i];
        if (!el) return;
        const wStart = 0.44 + i * 0.052;
        const o = smoothstep(wStart, wStart + 0.03, p) * orbitVisible;
        el.style.opacity = String(o);
        el.style.transform = `translateY(${(1 - o) * 16}px)`;
      });

      // Final message + circular light expansion (0.82–1.0).
      const finalO = band(p, 0.83, 1.0, 0.05);
      if (finalRef.current) {
        finalRef.current.style.opacity = String(finalO);
        finalRef.current.style.transform = `translateY(${(1 - finalO) * 18}px)`;
      }
      if (lightRef.current) {
        const grow = smoothstep(0.82, 1.0, p); // 0 → 1
        const scale = 0.05 + grow * 22;
        lightRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
        lightRef.current.style.opacity = String(smoothstep(0.82, 0.9, p));
      }
    }

    function render(p: number) {
      drawFrameForProgress(p);
      updateOverlays(p);
    }

    sizeCanvas();

    loader = createFrameLoader({
      dir: manifest.dir,
      count: manifest.count,
      onFirstFrame: (img) => {
        drawCover(img);
        currentDrawn = 0;
        fireReady();
      },
      onProgress: (loaded, total) => onProgress?.(loaded / total),
    });

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => render(self.progress),
    });

    // Resize handling
    const ro = new ResizeObserver(() => {
      sizeCanvas();
      currentDrawn = -1;
      render(st.progress);
      ScrollTrigger.refresh();
    });
    ro.observe(canvas);

    // Desktop cursor glow (dark hero only)
    const onMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.left = `${e.clientX}px`;
      glowRef.current.style.top = `${e.clientY}px`;
    };
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (!isTouch) window.addEventListener("mousemove", onMove, { passive: true });

    render(0);

    return () => {
      window.clearTimeout(failsafe);
      st.kill();
      ro.disconnect();
      if (!isTouch) window.removeEventListener("mousemove", onMove);
      loader?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, mounted]);

  if (reduced) return <ReducedMotionFallback />;

  return (
    <section
      ref={sectionRef}
      id="welcome"
      className="relative bg-bg-dark"
      style={{ height: `${SCROLL_VH}vh` }}
      aria-label="Cinematic introduction to the clinic"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-bg-dark text-text-light">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />

        {/* Legibility gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg-dark/45 via-transparent to-bg-dark/70" />

        {/* Cursor glow (desktop) */}
        <div
          ref={glowRef}
          aria-hidden
          className="pointer-events-none absolute z-10 hidden h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 mix-blend-screen md:block"
          style={{
            background:
              "radial-gradient(circle, rgba(238,234,225,0.35) 0%, rgba(200,179,138,0.12) 35%, transparent 68%)",
          }}
        />

        {/* Screen-reader summary — essential info is not locked inside the canvas */}
        <div className="sr-only">
          <h1>Advanced Dentistry. Designed Around You.</h1>
          <p>
            {clinic.name}. Precision dental care, implant expertise and a
            thoughtfully comfortable experience in Palani.
          </p>
        </div>

        {/* Opening hero text */}
        <div
          ref={heroRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20"
        >
          <div className="container-x pb-20 sm:pb-24">
            <p className="eyebrow mb-5 text-champagne">{clinic.name}</p>
            <p
              aria-hidden
              className="max-w-4xl font-serif text-display-lg leading-[0.98] text-text-light text-balance"
            >
              Advanced Dentistry.
              <br />
              Designed Around You.
            </p>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
              Precision dental care, implant expertise and a thoughtfully
              comfortable experience in Palani.
            </p>
            <div className="pointer-events-auto mt-8 flex flex-wrap gap-3">
              <BookButton variant="gold" source="hero">
                Book an Appointment
              </BookButton>
              <a
                href="#doctor"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-medium text-text-light transition hover:border-white/70"
              >
                Explore the Experience <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollHintRef}
          className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex flex-col items-center gap-2 text-white/70"
        >
          <span className="text-[0.68rem] uppercase tracking-eyebrow">Scroll to enter</span>
          <ChevronDown className="h-4 w-4 animate-pulse-ring" aria-hidden />
        </div>

        {/* Reveal bands */}
        <RevealBand innerRef={band1Ref} text="A new kind of dental experience." />
        <RevealBand innerRef={band2Ref} text="Created for comfort." />
        <RevealBand
          innerRef={band3Ref}
          text="Every smile begins with careful understanding."
        />

        {/* Orbit words */}
        <div
          ref={band4Ref}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            {ORBIT_WORDS.map((w, i) => (
              <div
                key={w}
                ref={(el) => {
                  wordRefs.current[i] = el;
                }}
                className="flex items-center gap-3"
              >
                <span className="h-px w-8 bg-champagne/50 sm:w-12" aria-hidden />
                <span
                  className="font-serif text-3xl text-text-light sm:text-5xl"
                  style={{ textShadow: "0 2px 40px rgba(16,19,20,0.6)" }}
                >
                  {w}
                </span>
                <span className="h-px w-8 bg-champagne/50 sm:w-12" aria-hidden />
              </div>
            ))}
          </div>
        </div>

        {/* Final message + CTA */}
        <div
          ref={finalRef}
          className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-6"
        >
          <div className="max-w-2xl text-center">
            <p className="font-serif text-display-md text-charcoal text-balance">
              Let&rsquo;s create a healthier, more confident smile.
            </p>
            <div className="pointer-events-auto mt-8 flex justify-center">
              <a
                href="#doctor"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-charcoal px-7 py-3.5 text-sm font-medium text-text-light transition hover:opacity-90"
              >
                Meet Dr. Sibi <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
        </div>

        {/* Circular examination-light expansion into next section */}
        <div
          ref={lightRef}
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[38%] z-20 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
          style={{
            background:
              "radial-gradient(circle, #ffffff 0%, #fbf9f4 55%, #f3efe6 100%)",
            boxShadow: "0 0 120px 60px rgba(255,255,255,0.5)",
          }}
        />
      </div>
    </section>
  );
}

function RevealBand({
  innerRef,
  text,
}: {
  innerRef: React.RefObject<HTMLDivElement | null>;
  text: string;
}) {
  return (
    <div
      ref={innerRef}
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6 opacity-0"
    >
      <p
        className="max-w-2xl text-center font-serif text-display-md text-text-light text-balance"
        style={{ textShadow: "0 2px 40px rgba(16,19,20,0.6)" }}
      >
        {text}
      </p>
    </div>
  );
}
