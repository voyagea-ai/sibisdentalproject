import { UserRound } from "lucide-react";

/**
 * Elegant labelled placeholder used wherever a real, verified photograph is
 * required but not yet supplied. Never presents generated imagery as a real
 * photo of the clinic or the doctor.
 */
export function PortraitPlaceholder({
  label,
  className = "",
  ratio = "aspect-[4/5]",
}: {
  label: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <div
      className={`relative ${ratio} w-full overflow-hidden rounded-3xl border border-hair-dark bg-[linear-gradient(135deg,#efece5,#e4dfd4)] ${className}`}
      role="img"
      aria-label={label}
    >
      <div className="grain absolute inset-0" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-champagne/40 text-champagne">
          <UserRound className="h-6 w-6" aria-hidden />
        </span>
        <span className="max-w-[70%] text-xs uppercase tracking-eyebrow text-muted">
          {label}
        </span>
      </div>
    </div>
  );
}
