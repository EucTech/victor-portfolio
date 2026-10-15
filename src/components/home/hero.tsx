"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Property } from "@/data/properties";
import { site } from "@/data/site";
import { formatPrice } from "@/lib/utils";
import { SplitText } from "../motion/split-text";
import { Magnetic } from "../motion/magnetic";
import type { RingPhoto } from "./hero-ring";

const HeroRing = dynamic(() => import("./hero-ring"), { ssr: false });

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero({ photos, listings }: { photos: RingPhoto[]; listings: Property[] }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<RingPhoto | null>(null);
  const [active, setActive] = useState(0);
  const onScreen = useInView(ref, { margin: "100px 0px 100px 0px" });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const ringY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const ringScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    if (listings.length < 2) return;
    const id = setInterval(() => setActive((i) => (i + 1) % listings.length), 6000);
    return () => clearInterval(id);
  }, [listings.length]);

  const listing = listings[active];

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-white pt-28 md:pt-32"
    >
      {/* Warm light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[80%] bg-[radial-gradient(60%_60%_at_50%_30%,rgba(192,160,98,0.12),transparent_70%)]"
      />

      {/* Headline */}
      <motion.div style={reduce ? undefined : { opacity: fade }} className="relative z-10">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <SplitText
                as="h1"
                text="Confident property decisions in Rwanda"
                onView={false}
                delay={0.25}
                stagger={0.07}
                wordClassName={(w) => (w === "Confident" ? "italic text-gold-deep" : undefined)}
                className="max-w-[18ch] font-display text-[2.75rem] leading-[0.98] tracking-[-0.015em] text-ink sm:text-[3.5rem] md:text-[4.25rem] lg:text-[5.25rem]"
              />
            </div>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease }}
              className="max-w-sm text-[0.9375rem] leading-relaxed text-muted md:pb-3"
            >
              Whether you&apos;re searching for a home, growing an investment portfolio
              or preparing to sell, {site.name} makes the process clear, honest and
              personal.
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* 3D ring */}
      <motion.div
        style={reduce ? undefined : { y: ringY, scale: ringScale }}
        data-cursor={hover ? "View" : undefined}
        className="relative -mt-6 h-[42vh] min-h-[290px] w-full cursor-grab active:cursor-grabbing md:absolute md:inset-x-0 md:bottom-0 md:top-[16%] md:h-auto"
      >
        <HeroRing photos={photos} onHover={setHover} active={onScreen} />
        <AnimatePresence>
          {hover ? (
            <motion.p
              key={hover.src}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute bottom-4 left-1/2 z-20 hidden md:bottom-[14%] md:block -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-4 py-2 text-[0.75rem] text-white"
            >
              {hover.alt}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </motion.div>

      {/* Bottom row */}
      <div className="relative z-10 mx-auto mt-auto w-full max-w-[1400px] px-6 pb-8 md:px-10 md:pb-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease }}
            className="flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <Link
                href="/properties"
                className="group flex items-center gap-3 rounded-full bg-ink py-1.5 pl-6 pr-1.5 text-[0.8125rem] text-white transition-colors hover:bg-ink-soft"
              >
                Explore properties
                <span className="flex size-9 items-center justify-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:translate-x-0.5">
                  <ArrowRight className="size-4" strokeWidth={1.5} />
                </span>
              </Link>
            </Magnetic>
            <Link
              href="/contact"
              className="glass rounded-full px-6 py-3.5 text-[0.8125rem] text-ink transition-colors hover:bg-white"
            >
              Let&apos;s talk
            </Link>
          </motion.div>

          {/* Floating listing card */}
          {listing ? (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, delay: 1.15, ease }}
              className="glass w-full rounded-[1.5rem] p-2.5 shadow-[0_24px_60px_rgba(10,10,10,0.12)] md:w-[27rem]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={listing.slug}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.5, ease }}
                  className="flex items-center gap-4"
                >
                  <div className="relative size-24 shrink-0 overflow-hidden rounded-[1.1rem] bg-stone">
                    {listing.images[0] ? (
                      <Image
                        src={listing.images[0].src}
                        alt={listing.images[0].alt}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1 py-1 pr-2">
                    <p className="text-[0.75rem] text-muted">
                      {listing.status}, {listing.location}
                    </p>
                    <p className="mt-1 line-clamp-2 font-display text-[1.25rem] leading-[1.1] text-ink">
                      {listing.name}
                    </p>
                    <p className="mt-1 text-[0.875rem] text-ink-soft">
                      {formatPrice(listing.price, listing.currency)}
                      {listing.priceQualifier ? (
                        <span className="text-muted"> {listing.priceQualifier}</span>
                      ) : null}
                    </p>
                  </div>
                  <Link
                    href={`/properties/${listing.slug}`}
                    aria-label={`View ${listing.name}`}
                    className="group mr-1 flex size-11 shrink-0 items-center justify-center rounded-full bg-ink text-white"
                  >
                    <ArrowUpRight
                      className="size-4 transition-transform duration-500 group-hover:rotate-45"
                      strokeWidth={1.5}
                    />
                  </Link>
                </motion.div>
              </AnimatePresence>
              {listings.length > 1 ? (
                <div className="mt-2.5 flex gap-1.5 px-2 pb-1">
                  {listings.map((l, i) => (
                    <button
                      key={l.slug}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Show ${l.name}`}
                      className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-ink/10"
                    >
                      {i === active ? (
                        <motion.span
                          key={active}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 6, ease: "linear" }}
                          className="absolute inset-0 origin-left bg-ink"
                        />
                      ) : null}
                    </button>
                  ))}
                </div>
              ) : null}
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
