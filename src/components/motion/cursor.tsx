"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@/lib/use-media-query";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";

/**
 * A soft ring that trails the pointer and opens into a label over any
 * element with `data-cursor="Label"`. Fine pointers only; the normal
 * system cursor stays visible.
 */
export function Cursor() {
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = fine && !reduce;
  const pathname = usePathname();
  // Remember which page a label belongs to so it clears on navigation.
  const [hit, setHit] = useState<{ label: string | null; path: string }>({ label: null, path: "" });
  const label = hit.path === pathname ? hit.label : null;
  const [down, setDown] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      setHit({ label: target?.dataset.cursor ?? null, path: window.location.pathname });
    };
    const press = () => setDown(true);
    const release = () => setDown(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[90]"
    >
      <motion.div
        animate={{
          width: label ? 96 : 30,
          height: label ? 96 : 30,
          scale: down ? 0.85 : 1,
          backgroundColor: label ? "rgba(10,10,10,1)" : "rgba(10,10,10,0)",
          borderColor: label ? "rgba(10,10,10,1)" : "rgba(156,127,69,0.7)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border"
      >
        <AnimatePresence>
          {label ? (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="text-[0.625rem] uppercase tracking-[0.18em] text-white"
            >
              {label}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
