"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface AppointmentContextValue {
  open: boolean;
  prefillTreatment?: string;
  openAppointment: (opts?: { treatment?: string }) => void;
  closeAppointment: () => void;
}

const AppointmentContext = createContext<AppointmentContextValue | null>(null);

export function useAppointment(): AppointmentContextValue {
  const ctx = useContext(AppointmentContext);
  if (!ctx) {
    // Safe fallback so components never crash if used outside the provider.
    return {
      open: false,
      openAppointment: () => {},
      closeAppointment: () => {},
    };
  }
  return ctx;
}

export { AppointmentContext };
export type { AppointmentContextValue };
