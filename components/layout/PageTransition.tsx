"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Soft circular dental-light wipe between routes. Fast enough that navigation
 * never feels delayed. Disabled for reduced motion.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [key, setKey] = useState(pathname);

  useEffect(() => setKey(pathname), [pathname]);

  if (reduced) return <>{children}</>;

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        <motion.div
          key={`wipe-${key}`}
          className="pointer-events-none fixed inset-0 z-[150]"
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
          style={{
            background:
              "radial-gradient(circle at 50% 42%, rgba(251,249,244,0.9) 0%, rgba(243,239,230,0.6) 30%, transparent 62%)",
          }}
        />
      </AnimatePresence>
    </>
  );
}
