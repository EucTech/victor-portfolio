"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export interface HoverRow {
  href: string;
  title: string;
  meta?: string;
  body: string;
}

/**
 * Large editorial rows. On hover a black panel sweeps up from the bottom,
 * the title slides and the arrow turns.
 */
export function HoverRows({ rows }: { rows: HoverRow[] }) {
  return (
    <ul className="border-t border-line">
      {rows.map((row, i) => (
        <motion.li
          key={row.href}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.9, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="border-b border-line"
        >
          <Link
            href={row.href}
            className="group relative grid items-center gap-3 overflow-hidden px-2 py-7 md:grid-cols-12 md:gap-8 md:px-6 md:py-10"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-bottom scale-y-0 rounded-[1.25rem] bg-ink transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
            />
            <span className="relative text-[0.6875rem] tabular-nums text-gold-deep transition-colors duration-500 group-hover:text-gold md:col-span-1">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="relative font-display text-[1.875rem] leading-none text-ink transition-all duration-500 group-hover:translate-x-2 group-hover:text-white md:col-span-4 md:text-[2.75rem]">
              {row.title}
            </span>
            <span className="relative text-[0.9375rem] leading-relaxed text-muted transition-colors duration-500 group-hover:text-white/70 md:col-span-5">
              {row.body}
            </span>
            <span className="relative flex items-center justify-between gap-4 md:col-span-2 md:justify-end">
              {row.meta ? (
                <span className="text-[0.75rem] text-muted transition-colors duration-500 group-hover:text-white/60">
                  {row.meta}
                </span>
              ) : null}
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-500 group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold">
                <ArrowUpRight className="size-4" strokeWidth={1.5} />
              </span>
            </span>
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}
