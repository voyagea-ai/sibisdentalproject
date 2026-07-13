export type DeviceTier = "mobile" | "tablet" | "desktop";

/** Choose a hero asset tier from viewport width and connection hints. */
export function getDeviceTier(): DeviceTier {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  if (w < 640) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

/** Respect the user's data-saver preference / very slow connections. */
export function prefersReducedData(): boolean {
  if (typeof navigator === "undefined") return false;
  const conn = (navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  }).connection;
  if (!conn) return false;
  if (conn.saveData) return true;
  if (conn.effectiveType && /(^|-)2g$/.test(conn.effectiveType)) return true;
  return false;
}
