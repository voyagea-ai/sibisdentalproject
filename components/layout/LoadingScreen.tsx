"use client";

import { useEffect, useState } from "react";
import { clinic } from "@/content/clinic";

/**
 * Minimal loading screen. Only waits for the critical opening frames — the
 * parent hides it as soon as the hero can paint. Shows a fine circular
 * dental-light outline, a percentage, and the clinic name.
 */
export function LoadingScreen({
  visible,
  progress,
}: {
  visible: boolean;
  progress: number;
}) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (!visible) {
      const t = window.setTimeout(() => setGone(true), 700);
      return () => window.clearTimeout(t);
    }
  }, [visible]);

  if (gone) return null;

  const pct = Math.round(progress * 100);
  const circumference = 2 * Math.PI * 46;

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg-dark transition-opacity duration-700 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      role="status"
      aria-live="polite"
      aria-hidden={!visible}
    >
      <div className="relative flex h-28 w-28 items-center justify-center">
        <svg className="h-28 w-28 -rotate-90" viewBox="0 0 100 100" aria-hidden>
          <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="#c8b38a"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            style={{ transition: "stroke-dashoffset 0.3s ease" }}
          />
        </svg>
        <span className="absolute font-serif text-2xl text-text-light">{pct}%</span>
      </div>
      <p className="mt-8 text-sm text-white/60">Preparing your experience…</p>
      <p className="mt-2 text-xs uppercase tracking-eyebrow text-champagne">
        {clinic.name}
      </p>
    </div>
  );
}
