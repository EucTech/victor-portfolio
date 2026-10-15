"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Tilts its content in 3D toward the pointer, with a soft light sweep.
 * Touch devices and reduced motion get a flat card.
 */
export function Tilt({
  children,
  className,
  max = 8,
  glare = true,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 160, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const light = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.32), transparent 55%)`;

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }

  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div className={cn("[perspective:1200px]", className)}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full will-change-transform"
      >
        {children}
        {glare ? (
          <motion.div
            aria-hidden="true"
            style={{ background: light }}
            className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 mix-blend-soft-light transition-opacity duration-500 [.group:hover_&]:opacity-100"
          />
        ) : null}
      </motion.div>
    </div>
  );
}
