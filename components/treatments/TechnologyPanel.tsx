"use client";

import { useEffect, useRef } from "react";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { MaskReveal } from "@/components/ui/Reveal";

const PANELS = [
  {
    n: "01",
    title: "Thoughtful treatment planning",
    body: "Every plan begins with careful evaluation and a clear explanation of the options available to you.",
    image: "/images/room.webp",
  },
  {
    n: "02",
    title: "Modern dental technology",
    body: "Considered use of technology supports precise, comfortable and well-informed care.",
    image: "/images/hero-poster.webp",
  },
  {
    n: "03",
    title: "Clean and organised environment",
    body: "A hygienic, calm and organised setting designed to help visits feel less overwhelming.",
    image: "/images/corridor.webp",
  },
  {
    n: "04",
    title: "Clear patient communication",
    body: "You are guided through each step so you can understand your options before making decisions.",
    image: "/images/hero-reduced.webp",
  },
  {
    n: "05",
    title: "Personalised treatment options",
    body: "Care is shaped around your individual needs, comfort and long-term dental health.",
    image: "/images/room.webp",
  },
];

export function TechnologyPanel() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    registerGsap();
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getDistance = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      return () => {
        tween.kill();
      };
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  if (reduced) {
    return (
      <section data-nav-theme="dark" className="bg-bg-dark py-24 text-text-light">
        <div className="container-x">
          <p className="eyebrow mb-5">Comfort &amp; Technology</p>
          <h2 className="max-w-2xl font-serif text-display-md text-text-light text-balance">
            Advanced Care Without the Clinical Anxiety
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {PANELS.map((p) => (
              <div key={p.n} className="rounded-3xl border border-hair-light p-8">
                <span className="font-serif text-3xl text-champagne">{p.n}</span>
                <h3 className="mt-3 font-serif text-xl">{p.title}</h3>
                <p className="mt-2 text-sm text-white/65">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      data-nav-theme="dark"
      className="relative overflow-hidden bg-bg-dark text-text-light"
      aria-label="Comfort and technology"
    >
      <div className="flex h-[100svh] flex-col justify-center">
        <div className="container-x mb-8 shrink-0">
          <p className="eyebrow mb-4">Comfort &amp; Technology</p>
          <h2 className="max-w-2xl font-serif text-display-md text-text-light text-balance">
            <MaskReveal lines={["Advanced Care Without", "the Clinical Anxiety"]} />
          </h2>
        </div>
        <div ref={trackRef} className="flex h-[62vh] w-max items-stretch gap-5 pl-6 pr-[20vw] sm:pl-14">
          {PANELS.map((p) => (
            <article
              key={p.n}
              className="relative flex h-full w-[78vw] shrink-0 overflow-hidden rounded-3xl border border-hair-light sm:w-[46vw] lg:w-[38vw]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${p.image}')` }}
                aria-hidden
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/40 to-bg-dark/20" />
              <div className="relative z-10 mt-auto p-8">
                <span className="font-serif text-4xl text-champagne">{p.n}</span>
                <h3 className="mt-3 font-serif text-2xl text-text-light">{p.title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/75">{p.body}</p>
                <div className="mt-5 h-px w-full bg-white/15">
                  <div className="h-px bg-champagne" style={{ width: `${(Number(p.n) / PANELS.length) * 100}%` }} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
