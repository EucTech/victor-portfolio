"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { nav, primaryNav, site, whatsappLink } from "@/data/site";
import { cn } from "@/lib/utils";
import { InstagramIcon, LinkedInIcon, TikTokIcon, WhatsAppIcon, YoutubeIcon } from "./ui/social-icons";

const ease = [0.16, 1, 0.3, 1] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 240 && y > prev && !open);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.6, ease }}
        className={cn("fixed inset-x-0 top-0", open ? "z-[70]" : "z-50")}
      >
        <div className="mx-auto flex h-20 w-full max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 md:h-24 md:px-10">
          {/* Logo */}
          <Link
            href="/"
            aria-label={`${site.name}, home`}
            onClick={() => setOpen(false)}
            className={cn(
              "group relative z-[70] flex shrink-0 items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4 transition-all duration-500",
              scrolled && !open && "glass shadow-[0_8px_30px_rgba(10,10,10,0.06)]",
            )}
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-ink md:size-11">
              <Image
                src="/brand/logo-mark.png"
                alt=""
                width={227}
                height={174}
                priority
                className="h-6 w-auto transition-transform duration-700 group-hover:scale-110 md:h-7"
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[1.05rem] tracking-[0.04em] text-ink md:text-lg">
                Victor Chiemerie
              </span>
              <span className="mt-1 text-[0.5rem] uppercase tracking-[0.26em] text-gold-deep md:text-[0.5625rem]">
                Real Estate, Kigali
              </span>
            </span>
          </Link>

          {/* Desktop pill nav */}
          <nav
            aria-label="Main"
            className="glass hidden items-center gap-1 rounded-full p-1.5 shadow-[0_8px_30px_rgba(10,10,10,0.06)] xl:flex"
          >
            {primaryNav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-[0.8125rem] transition-colors duration-300",
                    active ? "text-white" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {active ? (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-ink"
                    />
                  ) : null}
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right */}
          <div className="relative z-[70] flex items-center gap-2">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className={cn(
                "group hidden items-center gap-3 rounded-full bg-ink py-1.5 pl-5 pr-1.5 text-[0.8125rem] text-white transition-colors duration-300 hover:bg-ink-soft sm:flex",
                open && "sm:hidden",
              )}
            >
              Book a viewing
              <span className="flex size-8 items-center justify-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="size-4" strokeWidth={1.5} />
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={cn(
                "flex size-11 items-center justify-center rounded-full transition-colors duration-300",
                open ? "bg-ink text-white" : "glass text-ink shadow-[0_8px_30px_rgba(10,10,10,0.06)]",
              )}
            >
              <span className="relative block h-3 w-5">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-500",
                    open && "translate-y-1.5 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px w-5 bg-current transition-transform duration-500",
                    open ? "-translate-y-1.5 -rotate-45" : "w-3",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? <FullMenu pathname={pathname} onClose={() => setOpen(false)} /> : null}
      </AnimatePresence>
    </>
  );
}

function FullMenu({ pathname, onClose }: { pathname: string; onClose: () => void }) {
  return (
    <motion.div
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.8, ease: [0.83, 0, 0.17, 1] }}
      className="fixed inset-0 z-[60] overflow-y-auto bg-white"
      data-lenis-prevent
    >
      <div className="mx-auto grid min-h-full max-w-[1400px] gap-12 px-6 pb-12 pt-32 md:grid-cols-12 md:px-10 md:pt-40">
        <nav aria-label="All pages" className="md:col-span-8">
          <ul>
            {nav.map((item, i) => (
              <li key={item.href} className="overflow-hidden border-b border-line">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.25 + i * 0.045, ease }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="group flex items-baseline justify-between gap-6 py-3 md:py-4"
                  >
                    <span className="flex items-baseline gap-5">
                      <span className="w-6 text-[0.6875rem] tabular-nums text-gold-deep">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "font-display text-[2rem] leading-none transition-all duration-500 group-hover:translate-x-3 group-hover:italic sm:text-[2.75rem] md:text-[3.5rem]",
                          pathname === item.href ? "text-gold-deep" : "text-ink",
                        )}
                      >
                        {item.label}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="size-6 -translate-x-3 text-ink opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                      strokeWidth={1}
                    />
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
        </nav>

        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease }}
          className="flex flex-col justify-end gap-10 md:col-span-4"
        >
          <div>
            <p className="label">Speak to Victor</p>
            <div className="mt-5 space-y-3 text-[0.9375rem]">
              <a href={`tel:${site.phone}`} className="flex items-center gap-3 text-ink hover:text-gold-deep">
                <Phone className="size-4 text-gold-deep" strokeWidth={1.5} />
                {site.phoneDisplay}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 break-all text-ink hover:text-gold-deep"
              >
                <Mail className="size-4 shrink-0 text-gold-deep" strokeWidth={1.5} />
                {site.email}
              </a>
            </div>
          </div>
          <div className="flex gap-3">
            <MenuSocial href={site.socials.instagram} label="Instagram">
              <InstagramIcon className="size-4" />
            </MenuSocial>
            <MenuSocial href={site.socials.tiktok} label="TikTok">
              <TikTokIcon className="size-4" />
            </MenuSocial>
            <MenuSocial href={site.socials.linkedin} label="LinkedIn">
              <LinkedInIcon className="size-4" />
            </MenuSocial>
            <MenuSocial href={site.socials.youtube} label="YouTube">
              <YoutubeIcon className="size-4" />
            </MenuSocial>
            <MenuSocial href={whatsappLink()} label="WhatsApp">
              <WhatsAppIcon className="size-4" />
            </MenuSocial>
          </div>
          <p className="max-w-xs text-[0.875rem] leading-relaxed text-muted">{site.brandStatement}</p>
        </motion.aside>
      </div>
    </motion.div>
  );
}

function MenuSocial({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-11 items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white"
    >
      {children}
    </a>
  );
}
