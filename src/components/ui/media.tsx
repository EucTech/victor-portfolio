import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Renders a photo when `src` is provided, and an elegant branded
 * placeholder when it is not. This lets the whole site render before
 * real photography exists — drop image paths into the data files and
 * the placeholders disappear.
 */
export function Media({
  src,
  alt,
  className,
  imageClassName,
  priority,
  sizes = "(max-width: 768px) 100vw, 50vw",
  label,
  dark,
}: {
  src?: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  label?: string;
  dark?: boolean;
}) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden bg-cream", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imageClassName)}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        dark ? "bg-ink" : "bg-cream",
        className,
      )}
      role="img"
      aria-label={`${alt} — image pending`}
    >
      <div
        className={cn(
          "absolute inset-0",
          dark
            ? "bg-[radial-gradient(ellipse_at_30%_20%,rgba(192,160,98,0.22),transparent_60%)]"
            : "bg-[radial-gradient(ellipse_at_30%_20%,rgba(192,160,98,0.16),transparent_60%)]",
        )}
      />
      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <span
          className={cn(
            "font-display text-3xl tracking-[0.2em]",
            dark ? "text-white/70" : "text-ink/25",
          )}
        >
          VC
        </span>
        <span
          className={cn(
            "text-[0.625rem] uppercase tracking-[0.2em]",
            dark ? "text-white/40" : "text-ink/30",
          )}
        >
          {label ?? "Image to be added"}
        </span>
      </div>
    </div>
  );
}
