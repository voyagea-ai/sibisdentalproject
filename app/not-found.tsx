import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-bg-dark px-6 text-center text-text-light">
      <div>
        <p className="eyebrow mb-5">404</p>
        <h1 className="font-serif text-display-md text-text-light">
          This page could not be found.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-white/65">
          The page you are looking for may have moved. Let&rsquo;s get you back to
          the clinic.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[linear-gradient(135deg,#d8c49b,#b89f72)] px-7 py-3.5 text-sm font-medium text-charcoal transition hover:opacity-90"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back to home
        </Link>
      </div>
    </section>
  );
}
