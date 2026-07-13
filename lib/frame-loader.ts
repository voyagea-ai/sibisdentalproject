import { framePath } from "./hero-sequence";

export interface FrameLoader {
  images: (HTMLImageElement | undefined)[];
  loaded: boolean[];
  count: number;
  /** Nearest loaded frame index to `target` (prefers <= target). */
  nearest: (target: number) => number;
  destroy: () => void;
}

/**
 * Progressive image-sequence loader. Loads the opening frames first (so the
 * hero can paint and the page can reveal quickly), then streams the remaining
 * frames with limited concurrency. Reports progress and first-frame readiness.
 */
export function createFrameLoader(opts: {
  dir: string;
  count: number;
  priorityCount?: number;
  concurrency?: number;
  onFirstFrame?: (img: HTMLImageElement) => void;
  onProgress?: (loaded: number, total: number) => void;
}): FrameLoader {
  const { dir, count } = opts;
  const priorityCount = opts.priorityCount ?? Math.min(12, count);
  const concurrency = opts.concurrency ?? 6;

  const images: (HTMLImageElement | undefined)[] = new Array(count);
  const loaded: boolean[] = new Array(count).fill(false);
  let loadedTotal = 0;
  let destroyed = false;
  let firstFired = false;

  // Build a priority-ordered queue: opening frames first, then the rest.
  const order: number[] = [];
  for (let i = 0; i < priorityCount; i++) order.push(i);
  for (let i = priorityCount; i < count; i++) order.push(i);

  let cursor = 0;

  function loadOne(index: number): Promise<void> {
    return new Promise((resolve) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (destroyed) return resolve();
        images[index] = img;
        loaded[index] = true;
        loadedTotal += 1;
        opts.onProgress?.(loadedTotal, count);
        if (!firstFired && index === 0) {
          firstFired = true;
          opts.onFirstFrame?.(img);
        }
        resolve();
      };
      img.onerror = () => {
        // Count errors as progress so the loader can never hang.
        loadedTotal += 1;
        opts.onProgress?.(loadedTotal, count);
        resolve();
      };
      img.src = framePath(dir, index);
    });
  }

  async function worker() {
    while (!destroyed && cursor < order.length) {
      const idx = order[cursor++];
      await loadOne(idx);
    }
  }

  // Kick off the first frame immediately, then the pooled workers.
  loadOne(0).then(() => {
    for (let i = 0; i < concurrency; i++) worker();
  });

  function nearest(target: number): number {
    const t = Math.max(0, Math.min(count - 1, target));
    if (loaded[t]) return t;
    for (let d = 1; d < count; d++) {
      if (t - d >= 0 && loaded[t - d]) return t - d;
      if (t + d < count && loaded[t + d]) return t + d;
    }
    return 0;
  }

  return {
    images,
    loaded,
    count,
    nearest,
    destroy: () => {
      destroyed = true;
    },
  };
}
