"use client";

import Link from "next/link";
import { forwardRef } from "react";
import type { ReactNode } from "react";
import { useAppointment } from "@/components/appointments/appointment-context";
import { track } from "@/lib/analytics";

type Variant = "primary" | "gold" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-500 ease-soft min-h-[48px] px-7 py-3.5 focus-visible:outline-champagne";

const variants: Record<Variant, string> = {
  primary:
    "bg-charcoal text-text-light hover:-translate-y-0.5 hover:shadow-[0_12px_34px_-12px_rgba(21,24,25,0.55)]",
  gold: "text-charcoal hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-14px_rgba(200,179,138,0.7)] bg-[linear-gradient(135deg,#d8c49b_0%,#c8b38a_55%,#b89f72_100%)]",
  ghost:
    "border border-current/30 hover:border-current/60 hover:-translate-y-0.5",
};

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

/** A link-style CTA. */
export function LinkButton({
  href,
  variant = "primary",
  className = "",
  children,
  onClick,
  ...rest
}: CommonProps & {
  href: string;
  onClick?: () => void;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("https://wa.me");
  if (external) {
    return (
      <a
        href={href}
        className={`${base} ${variants[variant]} ${className}`}
        onClick={onClick}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`} onClick={onClick}>
      {children}
    </Link>
  );
}

/** A button that opens the fast booking modal from anywhere on the site. */
export const BookButton = forwardRef<
  HTMLButtonElement,
  CommonProps & { treatment?: string; source?: string }
>(function BookButton(
  { variant = "gold", className = "", children, treatment, source },
  ref,
) {
  const { openAppointment } = useAppointment();
  return (
    <button
      ref={ref}
      type="button"
      className={`${base} ${variants[variant]} ${className}`}
      onClick={() => {
        track("appointment_button_clicked", source ? { source } : undefined);
        openAppointment({ treatment });
      }}
    >
      {children}
    </button>
  );
});
