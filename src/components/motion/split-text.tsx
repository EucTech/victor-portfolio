"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Splits a string into words and slides each one up from behind a mask.
 * Use `as` to keep the correct heading level for SEO.
 */
export function SplitText({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.06,
  onView = true,
  wordClassName,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  onView?: boolean;
  wordClassName?: (word: string, index: number) => string | undefined;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const MotionTag = motion[Tag];

  const trigger = onView
    ? { whileInView: "show", viewport: { once: true, margin: "0px 0px -40px 0px" } }
    : { animate: "show" };

  return (
    <MotionTag
      className={cn(className)}
      initial={reduce ? false : "hidden"}
      {...trigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]"
        >
          <motion.span
            className={cn("inline-block will-change-transform", wordClassName?.(word, i))}
            variants={{
              hidden: { y: "110%", rotate: 4 },
              show: {
                y: "0%",
                rotate: 0,
                transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </MotionTag>
  );
}
