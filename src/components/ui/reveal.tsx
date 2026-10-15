"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Lifts and un-blurs content as it scrolls into view.
 * `delay` is in milliseconds. Respects reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  id,
  y = 36,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  id?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      id={id}
      className={cn(className)}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 1, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
