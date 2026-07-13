import { Info } from "lucide-react";
import Link from "next/link";

/** Compact medical disclaimer note for treatment and information pages. */
export function MedicalDisclaimer({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-start gap-3 rounded-2xl border border-hair-dark bg-white/50 p-5 text-sm text-muted ${className}`}
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-champagne" aria-hidden />
      <p>
        The information on this page is educational and does not replace a
        professional consultation. Treatment suitability requires an examination,
        and results differ between patients. Read the full{" "}
        <Link href="/medical-disclaimer" className="text-charcoal underline underline-offset-2">
          medical disclaimer
        </Link>
        .
      </p>
    </div>
  );
}
