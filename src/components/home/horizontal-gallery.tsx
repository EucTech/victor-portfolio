"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { PropertyImage } from "@/data/properties";
import { cn } from "@/lib/utils";

/**
 * Vertical scroll drives a horizontal walk through one property's photos.
 * The section pins while the strip travels its own width.
 */
export function HorizontalGallery({
  title,
  href,
  images,
}: {
  title: string;
  href: string;
  images: PropertyImage[];
}) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const bar = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <section ref={section} style={{ height: `calc(100svh + ${Math.round(distance * 0.7)}px)` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-10 flex w-full max-w-[1400px] items-end justify-between gap-6 px-6 md:mb-14 md:px-10">
          <div>
            <h2 className="max-w-xl font-display text-[2rem] leading-[1.05] text-ink sm:text-[2.5rem] md:text-[3.25rem]">
              {title}
            </h2>
          </div>
          <Link
            href={href}
            className="group hidden items-center gap-3 text-[0.8125rem] text-ink sm:flex"
          >
            See the full listing
            <span className="flex size-10 items-center justify-center rounded-full border border-ink/15 transition-colors duration-300 group-hover:bg-ink group-hover:text-white">
              <ArrowUpRight className="size-4" strokeWidth={1.5} />
            </span>
          </Link>
        </div>

        <motion.div ref={track} style={{ x }} className="flex w-max gap-4 pl-6 pr-[10vw] md:gap-6 md:pl-10">
          {images.map((img, i) => (
            <figure
              key={img.src}
              className={cn(
                "group relative shrink-0 overflow-hidden rounded-[1.5rem] bg-stone",
                i % 3 === 0
                  ? "h-[52svh] w-[78vw] md:w-[46vw]"
                  : i % 3 === 1
                    ? "h-[40svh] w-[62vw] self-end md:w-[30vw]"
                    : "h-[46svh] w-[70vw] md:w-[36vw]",
              )}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 80vw, 46vw"
                className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
              />
              <figcaption className="glass absolute bottom-3 left-3 rounded-full px-3.5 py-1.5 text-[0.75rem] text-ink opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {img.alt}
              </figcaption>
            </figure>
          ))}
        </motion.div>

        <div className="mx-auto mt-10 flex w-full max-w-[1400px] items-center gap-4 px-6 md:px-10">
          <span className="text-[0.6875rem] tabular-nums text-muted">01</span>
          <div className="h-px flex-1 bg-line">
            <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-ink" />
          </div>
          <span className="text-[0.6875rem] tabular-nums text-muted">
            {String(images.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
