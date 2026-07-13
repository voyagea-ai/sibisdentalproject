"use client";

import type { ReactNode } from "react";
import { AppointmentProvider } from "@/components/appointments/AppointmentProvider";
import { SmoothScroll } from "./SmoothScroll";

/** Client-side global providers: smooth scroll + booking modal context. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <AppointmentProvider>
      <SmoothScroll />
      {children}
    </AppointmentProvider>
  );
}
