"use client";

import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { AppointmentContext } from "./appointment-context";
import { AppointmentModal } from "./AppointmentModal";

/**
 * Provides global access to the fast booking modal. Any component can call
 * `openAppointment()` from the `useAppointment` hook.
 */
export function AppointmentProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [prefillTreatment, setPrefillTreatment] = useState<string | undefined>();

  const openAppointment = useCallback((opts?: { treatment?: string }) => {
    if (opts?.treatment) setPrefillTreatment(opts.treatment);
    setOpen(true);
  }, []);

  const closeAppointment = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, prefillTreatment, openAppointment, closeAppointment }),
    [open, prefillTreatment, openAppointment, closeAppointment],
  );

  return (
    <AppointmentContext.Provider value={value}>
      {children}
      <AppointmentModal
        open={open}
        onClose={closeAppointment}
        prefillTreatment={prefillTreatment}
      />
    </AppointmentContext.Provider>
  );
}
