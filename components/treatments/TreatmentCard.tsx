"use client";

import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import type { Treatment } from "@/content/treatments";
import { BookButton } from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

export function TreatmentCard({ treatment }: { treatment: Treatment }) {
  return (
    <article className="group flex flex-col rounded-3xl border border-hair-dark bg-white/50 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-champagne hover:shadow-[0_18px_50px_-24px_rgba(21,24,25,0.35)]">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-ivory px-3 py-1 text-[11px] uppercase tracking-wide text-muted">
          {treatment.category}
        </span>
        <Link
          href={`/treatments/${treatment.slug}`}
          onClick={() => track("treatment_viewed", { slug: treatment.slug })}
          aria-label={`Learn about ${treatment.title}`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-hair-dark text-charcoal transition group-hover:bg-charcoal group-hover:text-text-light"
        >
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
      <h3 className="mt-5 font-serif text-2xl text-charcoal">
        <Link href={`/treatments/${treatment.slug}`} onClick={() => track("treatment_viewed", { slug: treatment.slug })}>
          {treatment.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {treatment.shortDescription}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3 text-xs">
        <a
          href={buildWhatsAppLink({
            message: `Hello Dr. Sibi's Dental Care and Implant Center. I would like to discuss ${treatment.title}.`,
          })}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_clicked", { source: `card-${treatment.slug}` })}
          className="inline-flex items-center gap-1.5 text-champagne transition hover:text-charcoal"
        >
          <MessageCircle className="h-3.5 w-3.5" aria-hidden /> Discuss
        </a>
        <BookButton
          variant="ghost"
          source={`card-${treatment.slug}`}
          treatment={treatment.title}
          className="!min-h-0 !px-3 !py-1 !text-xs text-charcoal"
        >
          Book Appointment
        </BookButton>
      </div>
    </article>
  );
}
