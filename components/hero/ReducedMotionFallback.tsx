"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { clinic } from "@/content/clinic";
import { BookButton, LinkButton } from "@/components/ui/Button";

/**
 * Static, information-complete hero for reduced-motion users and as a graceful
 * fallback if the canvas sequence cannot load. All information and booking
 * actions remain available — nothing essential lives only in the animation.
 */
export function ReducedMotionFallback() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-bg-dark text-text-light">
      <Image
        src="/images/hero-reduced.webp"
        alt="A calm, modern dental treatment room with an ergonomic chair beneath a soft overhead examination light"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/40 to-bg-dark/70" />
      <div className="container-x relative z-10 py-28">
        <p className="eyebrow mb-6">{clinic.name}</p>
        <h1 className="max-w-4xl font-serif text-display-lg text-text-light text-balance">
          Advanced Dentistry. Designed Around You.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
          Precision dental care, implant expertise and a thoughtfully comfortable
          experience in Palani.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <BookButton variant="gold" source="hero-reduced">
            Book an Appointment
          </BookButton>
          <LinkButton href="/doctor" variant="ghost" className="text-text-light">
            Meet Dr. Sibi <ArrowRight className="h-4 w-4" aria-hidden />
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
