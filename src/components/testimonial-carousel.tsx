"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (embla) setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect).on("reInit", onSelect);
    return () => {
      embla.off("select", onSelect).off("reInit", onSelect);
    };
  }, [embla, onSelect]);

  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((t, i) => (
            <div
              key={i}
              className="min-w-0 shrink-0 grow-0 basis-full pr-6 md:basis-1/2 lg:basis-1/3"
            >
              <figure className="flex h-full flex-col border border-line bg-white p-8">
                <Quote className="size-6 shrink-0 text-gold" strokeWidth={1.25} />
                <blockquote className="mt-6 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 border-t border-line pt-5">
                  <p className="text-sm font-medium text-ink">{t.name}</p>
                  {t.context ? (
                    <p className="mt-0.5 text-[0.75rem] uppercase tracking-[0.12em] text-muted">
                      {t.context}
                    </p>
                  ) : null}
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => embla?.scrollTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={cn(
                "h-px w-8 transition-colors",
                i === selected ? "bg-ink" : "bg-line",
              )}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => embla?.scrollPrev()}
            aria-label="Previous testimonial"
            className="flex size-11 items-center justify-center border border-line text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
          >
            <ArrowLeft className="size-4" strokeWidth={1.5} />
          </button>
          <button
            onClick={() => embla?.scrollNext()}
            aria-label="Next testimonial"
            className="flex size-11 items-center justify-center border border-line text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
          >
            <ArrowRight className="size-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
