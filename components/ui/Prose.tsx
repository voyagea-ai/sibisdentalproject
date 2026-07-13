import type { ReactNode } from "react";

/** Readable long-form content column with consistent typographic rhythm. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="prose-clinic max-w-2xl space-y-5 text-[15px] leading-relaxed text-muted [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-charcoal [&_h3]:mt-6 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:text-charcoal [&_a]:text-charcoal [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-charcoal [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
      {children}
    </div>
  );
}
