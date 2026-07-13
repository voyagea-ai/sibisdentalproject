"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { registerGsap, ScrollTrigger } from "@/lib/gsap";
import { IMPLANT_SEQUENCE } from "@/lib/hero-sequence";
import { createFrameLoader, type FrameLoader } from "@/lib/frame-loader";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { BookButton, LinkButton } from "@/components/ui/Button";
import { MaskReveal, Reveal } from "@/components/ui/Reveal";

const LABELS = [
  { at: 0.16, text: "Implant fixture" },
  { at: 0.44, text: "Abutment" },
  { at: 0.72, text: "Restoration" },
];

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}
function smoothstep(a: number, b: number, x: number) {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
}

export function ImplantExperience() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    registerGsap();
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;
    const cnv: HTMLCanvasElement = canvas;
    const cx: CanvasRenderingContext2D = context;

    let loader: FrameLoader | null = null;
    let drawn = -1;

    function size() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = cnv.clientWidth || 600;
      const h = cnv.clientHeight || 600;
      cnv.width = Math.round(w * dpr);
      cnv.height = Math.round(h * dpr);
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function drawContain(img: HTMLImageElement) {
      const cw = cnv.clientWidth || 600;
      const ch = cnv.clientHeight || 600;
      cx.clearRect(0, 0, cw, ch);
      const scale = Math.min(cw / img.width, ch / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      cx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    }
    function drawAt(p: number) {
      if (!loader) return;
      const idx = loader.nearest(Math.round(p * (IMPLANT_SEQUENCE.count - 1)));
      if (idx === drawn) return;
      const img = loader.images[idx];
      if (img) {
        drawContain(img);
        drawn = idx;
      }
    }
    function overlays(p: number) {
      LABELS.forEach((l, i) => {
        const el = labelRefs.current[i];
        if (!el) return;
        const o = smoothstep(l.at, l.at + 0.06, p) * (1 - smoothstep(0.9, 1, p));
        el.style.opacity = String(o);
        el.style.transform = `translateY(${(1 - o) * 8}px)`;
      });
      if (ctaRef.current) {
        const o = smoothstep(0.82, 0.94, p);
        ctaRef.current.style.opacity = String(o);
        ctaRef.current.style.transform = `translateY(${(1 - o) * 14}px)`;
      }
    }

    size();
    loader = createFrameLoader({
      dir: IMPLANT_SEQUENCE.dir,
      count: IMPLANT_SEQUENCE.count,
      priorityCount: 6,
      onFirstFrame: (img) => {
        drawContain(img);
        drawn = 0;
      },
    });

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        drawAt(self.progress);
        overlays(self.progress);
      },
    });

    const ro = new ResizeObserver(() => {
      size();
      drawn = -1;
      drawAt(st.progress);
    });
    ro.observe(canvas);
    overlays(0);

    return () => {
      st.kill();
      ro.disconnect();
      loader?.destroy();
    };
  }, [reduced]);

  if (reduced) {
    return (
      <section id="implant-feature" data-nav-theme="dark" className="bg-bg-dark py-24 text-text-light">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-5">Dental Implants</p>
            <h2 className="font-serif text-display-md text-text-light text-balance">
              Rebuilding Confidence, One Smile at a Time
            </h2>
            <p className="mt-6 max-w-lg text-white/70">
              Dental implant treatment begins with careful evaluation and
              personalised planning. Schedule a consultation to understand whether
              implants may be suitable for you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <BookButton variant="gold" source="implant-reduced" treatment="Dental Implants">
                Book an Implant Consultation
              </BookButton>
              <LinkButton href="/dental-implants" variant="ghost" className="text-text-light">
                Learn About Dental Implants
              </LinkButton>
            </div>
          </div>
          <Image
            src="/images/implant-components.webp"
            alt="Illustration of a dental implant system: fixture, abutment and ceramic crown"
            width={1000}
            height={563}
            className="rounded-3xl border border-hair-light"
          />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="implant-feature"
      data-nav-theme="dark"
      className="relative bg-bg-dark text-text-light"
      style={{ height: "320vh" }}
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="container-x grid w-full items-center gap-8 lg:grid-cols-2">
          <div className="relative z-10 order-2 lg:order-1">
            <p className="eyebrow mb-5">Dental Implants</p>
            <h2 className="font-serif text-display-md text-text-light text-balance">
              <MaskReveal lines={["Rebuilding Confidence,", "One Smile at a Time"]} />
            </h2>
            <Reveal delay={0.1} className="mt-6 max-w-lg text-white/70">
              Dental implant treatment begins with careful evaluation and
              personalised planning. Schedule a consultation to understand whether
              implants may be suitable for you.
            </Reveal>
            <div className="mt-7 flex flex-col gap-2">
              {LABELS.map((l, i) => (
                <div
                  key={l.text}
                  ref={(el) => {
                    labelRefs.current[i] = el;
                  }}
                  className="flex items-center gap-3 opacity-0"
                >
                  <span className="h-px w-8 bg-champagne" aria-hidden />
                  <span className="text-sm text-white/80">{l.text}</span>
                </div>
              ))}
            </div>
            <div ref={ctaRef} className="mt-8 flex flex-wrap gap-3 opacity-0">
              <BookButton variant="gold" source="implant-section" treatment="Dental Implants">
                Book an Implant Consultation
              </BookButton>
              <LinkButton href="/dental-implants" variant="ghost" className="text-text-light">
                Learn About Dental Implants <ArrowRight className="h-4 w-4" aria-hidden />
              </LinkButton>
            </div>
          </div>

          <div className="order-1 flex justify-center lg:order-2">
            <canvas
              ref={canvasRef}
              className="aspect-square w-[min(80vw,520px)]"
              aria-label="A dental implant assembling: fixture, abutment and restoration coming together"
              role="img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
