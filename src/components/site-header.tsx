"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Phone, Mail } from "lucide-react";
import { nav, primaryNav, site, whatsappLink } from "@/data/site";
import { cn } from "@/lib/utils";
import { Container } from "./ui/container";
import { ButtonLink } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { InstagramIcon, YoutubeIcon } from "./ui/social-icons";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * Every page opens with a dark hero, so until the user scrolls the header
   * sits on a dark background and all of its text must be light.
   */
  const onDark = !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-line bg-white/95 backdrop-blur-sm"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container size="wide">
        <div className="flex h-20 items-center justify-between gap-4 md:h-24">
          {/* Logo */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3"
            aria-label="Victor Chiemerie — home"
          >
            <Image
              src="/brand/logo-mark.png"
              alt=""
              width={227}
              height={174}
              priority
              className="h-9 w-auto sm:h-10 md:h-12"
            />
            <span className="flex flex-col leading-none">
              <span
                className={cn(
                  "font-display text-base tracking-[0.06em] transition-colors duration-500 sm:text-lg md:text-xl",
                  onDark ? "text-white" : "text-ink",
                )}
              >
                Victor Chiemerie
              </span>
              <span
                className={cn(
                  "mt-1 text-[0.4375rem] uppercase tracking-[0.24em] transition-colors duration-500 sm:text-[0.5rem] md:text-[0.5625rem]",
                  onDark ? "text-gold" : "text-gold-deep",
                )}
              >
                Real Estate — Kigali
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-9 lg:flex">
            {primaryNav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "link-underline text-[0.8125rem] tracking-wide transition-colors duration-300",
                    onDark
                      ? active
                        ? "text-gold"
                        : "text-white/85 hover:text-gold"
                      : active
                        ? "text-gold-deep"
                        : "text-ink-soft hover:text-gold-deep",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex shrink-0 items-center gap-3 md:gap-5">
            <a
              href={`tel:${site.phone}`}
              className={cn(
                "hidden items-center gap-2 text-[0.8125rem] transition-colors duration-300 xl:flex",
                onDark
                  ? "text-white/80 hover:text-gold"
                  : "text-ink-soft hover:text-gold-deep",
              )}
            >
              <Phone className="size-3.5" strokeWidth={1.5} />
              {site.phoneDisplay}
            </a>

            <ButtonLink
              href="/contact"
              size="sm"
              variant={onDark ? "ghostLight" : "primary"}
              className="hidden sm:inline-flex"
            >
              Let&apos;s Talk
            </ButtonLink>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <button
                  aria-label="Open menu"
                  className={cn(
                    "-mr-2 p-2 transition-colors duration-300 lg:hidden",
                    onDark ? "text-white" : "text-ink",
                  )}
                >
                  <Menu className="size-6" strokeWidth={1.5} />
                </button>
              </SheetTrigger>

              <SheetContent title="Navigation">
                <div className="flex h-full flex-col overflow-y-auto">
                  <div className="border-b border-line px-6 py-6">
                    <Image
                      src="/brand/logo-mark.png"
                      alt="Victor Chiemerie"
                      width={227}
                      height={174}
                      className="h-11 w-auto"
                    />
                  </div>

                  <nav className="flex flex-col px-6 py-2">
                    {nav.map((item) => (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "border-b border-line py-4 font-display text-2xl transition-colors last:border-0",
                            pathname === item.href
                              ? "text-gold-deep"
                              : "text-ink hover:text-gold-deep",
                          )}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>

                  <div className="mt-auto border-t border-line px-6 py-7">
                    <SheetClose asChild>
                      <ButtonLink href="/contact" className="w-full">
                        Let&apos;s Talk
                      </ButtonLink>
                    </SheetClose>

                    <div className="mt-6 space-y-2 text-[0.875rem]">
                      <a
                        href={`tel:${site.phone}`}
                        className="flex items-center gap-3 text-ink-soft transition-colors hover:text-gold-deep"
                      >
                        <Phone className="size-3.5 text-gold-deep" strokeWidth={1.5} />
                        {site.phoneDisplay}
                      </a>
                      <a
                        href={`mailto:${site.email}`}
                        className="flex items-center gap-3 break-all text-ink-soft transition-colors hover:text-gold-deep"
                      >
                        <Mail className="size-3.5 shrink-0 text-gold-deep" strokeWidth={1.5} />
                        {site.email}
                      </a>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <a
                        href={site.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="flex size-10 items-center justify-center border border-line text-ink-soft transition-colors hover:border-gold hover:text-gold-deep"
                      >
                        <InstagramIcon className="size-4" />
                      </a>
                      <a
                        href={site.socials.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="YouTube"
                        className="flex size-10 items-center justify-center border border-line text-ink-soft transition-colors hover:border-gold hover:text-gold-deep"
                      >
                        <YoutubeIcon className="size-4" />
                      </a>
                      <a
                        href={whatsappLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp"
                        className="flex size-10 items-center justify-center border border-line text-ink-soft transition-colors hover:border-gold hover:text-gold-deep"
                      >
                        <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.898 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
}
