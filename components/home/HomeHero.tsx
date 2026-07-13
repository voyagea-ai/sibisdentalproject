"use client";

import { useState } from "react";
import { HeroCanvasSequence } from "@/components/hero/HeroCanvasSequence";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Homepage hero wrapper. Shows the minimal loading screen only while the
 * critical opening frames load; reduced-motion users skip it entirely.
 */
export function HomeHero() {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <>
      {!reduced && <LoadingScreen visible={!ready} progress={progress} />}
      <HeroCanvasSequence onReady={() => setReady(true)} onProgress={setProgress} />
    </>
  );
}
