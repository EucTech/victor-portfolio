import { cn } from "@/lib/utils";

/**
 * The Roof V mark: a gold roofline over a bold V.
 * The V takes the current text colour, so set `text-ink` on light
 * backgrounds and `text-white` on dark ones. The roof is always gold.
 */
export function BrandMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="14 14 72 72"
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M20 48 L50 22 L80 48"
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M32 46 L50 80 L68 46" fill="none" stroke="currentColor" strokeWidth="5.5" />
    </svg>
  );
}
