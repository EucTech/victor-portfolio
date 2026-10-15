"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowUpRight, Bath, BedDouble, MapPin } from "lucide-react";
import type { Property } from "@/data/properties";
import { formatPrice } from "@/lib/utils";

/**
 * Each featured listing is a full-height photo card. Cards pin and stack
 * as you scroll; the one underneath sinks back and dims.
 */
export function ListingShowcase({ listings }: { listings: Property[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className="relative">
      {listings.map((p, i) => (
        <ShowcaseCard
          key={p.slug}
          property={p}
          index={i}
          total={listings.length}
          progress={scrollYProgress}
        />
      ))}
    </div>
  );
}

function ShowcaseCard({
  property: p,
  index,
  total,
  progress,
}: {
  property: Property;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const imageScale = useTransform(enter, [0, 1], [1.25, 1]);

  const start = index / total;
  const targetScale = 1 - (total - 1 - index) * 0.05;
  const scale = useTransform(progress, [start, 1], [1, targetScale]);
  const dim = useTransform(progress, [start, Math.min(1, start + 1 / total)], [0, index === total - 1 ? 0 : 0.35]);

  const cover = p.images[0];
  const second = p.images[1];

  return (
    <div ref={ref} className="sticky top-0 flex h-[100svh] items-center justify-center px-3 py-20 md:px-6 md:py-24">
      <motion.div
        style={{ scale, top: `calc(${index * 22}px)` }}
        className="relative h-full w-full max-w-[1400px] origin-top"
      >
        <Link
          href={`/properties/${p.slug}`}
          data-cursor="View"
          className="group relative block h-full w-full overflow-hidden rounded-[1.75rem] bg-stone md:rounded-[2.5rem]"
        >
          {cover ? (
            <motion.div style={{ scale: imageScale }} className="absolute inset-0">
              <Image
                src={cover.src}
                alt={cover.alt}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]"
              />
            </motion.div>
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
          <motion.div style={{ opacity: dim }} className="absolute inset-0 bg-ink" />

          {/* Index + status */}
          <div className="absolute left-5 right-5 top-5 flex items-start justify-between md:left-8 md:right-8 md:top-8">
            <span className="glass-dark rounded-full px-4 py-2 text-[0.6875rem] uppercase tracking-[0.18em] text-white">
              {p.status}
            </span>
            <span className="font-display text-lg text-white/80">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>

          {/* Title block */}
          <div className="absolute bottom-6 left-5 right-5 md:bottom-10 md:left-10 md:right-auto md:max-w-2xl">
            <p className="flex items-center gap-2 text-[0.8125rem] text-white/75">
              <MapPin className="size-3.5" strokeWidth={1.5} />
              {p.location}, {p.city}
            </p>
            <h3 className="mt-3 font-display text-[2.25rem] leading-[1] text-white sm:text-[3rem] md:text-[4.5rem]">
              {p.name}
            </h3>
            <p className="mt-4 hidden max-w-lg text-[0.9375rem] leading-relaxed text-white/75 sm:block">
              {p.headline}
            </p>
          </div>

          {/* Floating info card */}
          <div className="glass absolute bottom-10 right-10 hidden w-[20rem] rounded-[1.5rem] p-3 shadow-[0_30px_60px_rgba(0,0,0,0.25)] transition-transform duration-700 group-hover:-translate-y-2 lg:block">
            {second ? (
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.1rem]">
                <Image src={second.src} alt={second.alt} fill sizes="320px" className="object-cover" />
              </div>
            ) : null}
            <div className="px-2 pb-2 pt-4">
              <p className="text-[0.625rem] uppercase tracking-[0.18em] text-muted">
                {p.priceQualifier ?? "Asking price"}
              </p>
              <p className="mt-1 font-display text-[1.75rem] leading-none text-ink">
                {formatPrice(p.price, p.currency)}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
                <div className="flex gap-4 text-[0.8125rem] text-ink-soft">
                  {p.bedrooms > 0 ? (
                    <span className="flex items-center gap-1.5">
                      <BedDouble className="size-4" strokeWidth={1.5} />
                      {p.bedrooms}
                    </span>
                  ) : null}
                  {p.bathrooms > 0 ? (
                    <span className="flex items-center gap-1.5">
                      <Bath className="size-4" strokeWidth={1.5} />
                      {p.bathrooms}
                    </span>
                  ) : null}
                  <span>{p.type}</span>
                </div>
                <span className="flex size-10 items-center justify-center rounded-full bg-ink text-white transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="size-4" strokeWidth={1.5} />
                </span>
              </div>
            </div>
          </div>

          {/* Mobile price */}
          <div className="glass absolute right-5 top-16 rounded-full px-4 py-2 font-display text-lg text-ink lg:hidden">
            {formatPrice(p.price, p.currency)}
            {p.priceQualifier === "per month" ? (
              <span className="font-sans text-[0.6875rem] text-muted"> /month</span>
            ) : null}
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
