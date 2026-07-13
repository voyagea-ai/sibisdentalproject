import type { FAQ } from "@/content/faqs";

/**
 * Accessible FAQ list built on native <details>/<summary> — keyboard friendly
 * and works without JavaScript.
 */
export function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  return (
    <div className="divide-y divide-hair-dark border-y border-hair-dark">
      {faqs.map((f) => (
        <details key={f.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg text-charcoal">
            {f.question}
            <span
              aria-hidden
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-hair-dark text-muted transition group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
