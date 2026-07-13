import type { ReactNode } from "react";
import { Reveal, MaskReveal } from "./Reveal";

/**
 * Editorial section heading with an eyebrow, mask-revealed title lines and
 * optional supporting copy. `titleLines` lets long headings clip line by line.
 */
export function SectionHeading({
  eyebrow,
  titleLines,
  title,
  copy,
  align = "left",
  tone = "dark",
  as = "h2",
  className = "",
}: {
  eyebrow?: string;
  titleLines?: string[];
  title?: string;
  copy?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const Tag = as;
  const lines = titleLines ?? (title ? [title] : []);
  const textColor = tone === "light" ? "text-text-light" : "text-charcoal";
  const copyColor = tone === "light" ? "text-white/70" : "text-muted";
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start";

  return (
    <div className={`flex max-w-2xl flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <Reveal className="eyebrow mb-5">{eyebrow}</Reveal>
      )}
      <Tag className={`text-display-md ${textColor} text-balance`}>
        <MaskReveal lines={lines} />
      </Tag>
      {copy && (
        <Reveal delay={0.15} className={`mt-6 text-base leading-relaxed ${copyColor} max-w-xl`}>
          {copy}
        </Reveal>
      )}
    </div>
  );
}
