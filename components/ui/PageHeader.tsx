import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MaskReveal, Reveal } from "./Reveal";

export interface Crumb {
  name: string;
  href: string;
}

/**
 * Standard interior-page header. A calmer, shorter cinematic strip than the
 * homepage hero — a soft room image with editorial typography over it.
 */
export function PageHeader({
  eyebrow,
  titleLines,
  subtitle,
  crumbs = [],
  image = "/images/hero-reduced.webp",
}: {
  eyebrow: string;
  titleLines: string[];
  subtitle?: string;
  crumbs?: Crumb[];
  image?: string;
}) {
  return (
    <header
      data-nav-theme="dark"
      className="relative flex min-h-[62vh] items-end overflow-hidden bg-bg-dark text-text-light"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-55"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/55 to-bg-dark/30" />
      <div className="container-x relative z-10 pb-16 pt-32 sm:pb-20">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/60">
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="h-3 w-3" aria-hidden />}
                  {i < crumbs.length - 1 ? (
                    <Link href={c.href} className="hover:text-champagne">
                      {c.name}
                    </Link>
                  ) : (
                    <span className="text-white/80" aria-current="page">
                      {c.name}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h1 className="max-w-4xl font-serif text-display-lg text-text-light text-balance">
          <MaskReveal lines={titleLines} />
        </h1>
        {subtitle && (
          <Reveal delay={0.15} className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            {subtitle}
          </Reveal>
        )}
      </div>
    </header>
  );
}
