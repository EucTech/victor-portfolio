"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Grid2x2, X } from "lucide-react";
import type { PropertyImage } from "@/data/properties";
import { Media } from "./ui/media";
import { cn } from "@/lib/utils";
import { useIsClient } from "@/lib/use-media-query";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Bento grid of the first five photos. Any photo opens a full screen
 * viewer with keyboard, swipe and thumbnail navigation.
 */
export function PropertyGallery({ images, name }: { images: PropertyImage[]; name: string }) {
  const [open, setOpen] = useState<number | null>(null);

  if (!images.length) {
    return (
      <Media src="" alt={name} label="Main photo" className="aspect-[16/9] w-full rounded-[2rem]" />
    );
  }

  const tiles = images.slice(0, 5);

  return (
    <>
      <div className="grid gap-2.5 md:h-[72vh] md:grid-cols-4 md:grid-rows-2">
        {tiles.map((img, i) => (
          <motion.button
            key={img.src}
            type="button"
            onClick={() => setOpen(i)}
            data-cursor="Open"
            initial={{ opacity: 0, y: 30, clipPath: "inset(12% 12% 12% 12% round 2rem)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 1.5rem)" }}
            transition={{ duration: 1.2, delay: 0.15 + i * 0.08, ease }}
            className={cn(
              "group relative overflow-hidden rounded-[1.5rem] bg-stone",
              i === 0 ? "aspect-[4/3] md:col-span-2 md:row-span-2 md:aspect-auto" : "hidden md:block",
            )}
            aria-label={`Open photo ${i + 1}: ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={i === 0}
              sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "25vw"}
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
            />
            {i === tiles.length - 1 && images.length > tiles.length ? (
              <span className="absolute inset-0 flex items-center justify-center bg-ink/45 text-[0.8125rem] uppercase tracking-[0.16em] text-white backdrop-blur-[2px]">
                +{images.length - tiles.length} photos
              </span>
            ) : null}
          </motion.button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen(0)}
        className="mt-4 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-[0.8125rem] text-ink transition-colors hover:border-ink"
      >
        <Grid2x2 className="size-4" strokeWidth={1.5} />
        View all {images.length} photos
      </button>

      <Lightbox images={images} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </>
  );
}

function Lightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: PropertyImage[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const mounted = useIsClient();
  const [dir, setDir] = useState(1);

  const go = useCallback(
    (step: number) => {
      if (index === null) return;
      setDir(step);
      onIndex((index + step + images.length) % images.length);
    },
    [index, images.length, onIndex],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, go, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {index !== null ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[95] flex flex-col bg-white"
          data-lenis-prevent
        >
          <div className="flex items-center justify-between px-5 py-4 md:px-8">
            <p className="text-[0.8125rem] tabular-nums text-muted">
              <span className="text-ink">{String(index + 1).padStart(2, "0")}</span> /{" "}
              {String(images.length).padStart(2, "0")}
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close photo viewer"
              autoFocus
              className="flex size-11 items-center justify-center rounded-full bg-ink text-white transition-transform duration-500 hover:rotate-90"
            >
              <X className="size-5" strokeWidth={1.5} />
            </button>
          </div>

          <div className="relative flex-1 overflow-hidden px-4 md:px-24">
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={index}
                custom={dir}
                variants={{
                  enter: (d: number) => ({ x: `${d * 30}%`, opacity: 0, scale: 0.96 }),
                  center: { x: 0, opacity: 1, scale: 1 },
                  exit: (d: number) => ({ x: `${d * -30}%`, opacity: 0, scale: 0.96 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(1);
                  else if (info.offset.x > 80) go(-1);
                }}
                className="relative size-full cursor-grab active:cursor-grabbing"
              >
                <Image
                  src={images[index].src}
                  alt={images[index].alt}
                  fill
                  sizes="100vw"
                  className="pointer-events-none select-none rounded-[1.25rem] object-contain"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="glass absolute left-3 top-1/2 hidden size-14 -translate-y-1/2 items-center justify-center rounded-full text-ink shadow-lg md:left-6 md:flex"
            >
              <ArrowLeft className="size-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 hidden size-14 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-white shadow-lg md:right-6 md:flex"
            >
              <ArrowRight className="size-5" strokeWidth={1.5} />
            </button>
          </div>

          <p className="px-5 pt-4 text-center text-[0.875rem] text-ink-soft">{images[index].alt}</p>

          <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 py-4 md:justify-center">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => {
                  setDir(i > index ? 1 : -1);
                  onIndex(i);
                }}
                aria-label={`Show photo ${i + 1}`}
                className={cn(
                  "relative h-14 w-20 shrink-0 overflow-hidden rounded-lg transition-all duration-300",
                  i === index ? "ring-2 ring-ink ring-offset-2" : "opacity-50 hover:opacity-100",
                )}
              >
                <Image src={img.src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
