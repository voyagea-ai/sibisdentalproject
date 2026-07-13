import type { DeviceTier } from "./device";

export interface SequenceManifest {
  dir: string;
  count: number;
  width: number;
  height: number;
}

/**
 * Frame sequence manifests per device tier. Frames are named
 * `frame-0001.webp` … padded to 4 digits.
 */
export const HERO_SEQUENCES: Record<DeviceTier, SequenceManifest> = {
  desktop: { dir: "/sequences/hero-desktop", count: 160, width: 1600, height: 900 },
  tablet: { dir: "/sequences/hero-tablet", count: 110, width: 1200, height: 675 },
  mobile: { dir: "/sequences/hero-mobile", count: 60, width: 900, height: 506 },
};

export const IMPLANT_SEQUENCE: SequenceManifest = {
  dir: "/sequences/implant",
  count: 54,
  width: 1000,
  height: 563,
};

export function framePath(dir: string, index: number): string {
  const n = String(index + 1).padStart(4, "0");
  return `${dir}/frame-${n}.webp`;
}
