import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { InstagramIcon, YoutubeIcon, WhatsAppIcon } from "./ui/social-icons";
import { nav, site, whatsappLink } from "@/data/site";
import { Container } from "./ui/container";
import { Media } from "./ui/media";
import { NewsletterForm } from "./newsletter-form";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <Container size="wide">
        <div className="grid gap-14 py-20 md:grid-cols-12 md:py-24">
          {/* Brand */}
          <div className="md:col-span-5">
            <Image
              src="/brand/logo-mark.png"
              alt="Victor Chiemerie"
              width={227}
              height={174}
              className="h-16 w-auto"
            />
            <div className="mt-7 flex items-start gap-5">
              <Media
                src=""
                alt="Victor Chiemerie"
                dark
                label="Headshot"
                className="size-20 shrink-0 rounded-full"
              />
              <div>
                <p className="font-display text-2xl">{site.name}</p>
                <p className="mt-1 text-[0.625rem] uppercase tracking-[0.24em] text-gold">
                  {site.role}
                </p>
              </div>
            </div>
            <p className="mt-8 max-w-sm text-[0.9375rem] leading-relaxed text-white/60">
              {site.brandStatement}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SocialLink href={site.socials.instagram} label="Instagram">
                <InstagramIcon className="size-4" />
              </SocialLink>
              <SocialLink href={site.socials.youtube} label="YouTube">
                <YoutubeIcon className="size-4" />
              </SocialLink>
              <SocialLink href={whatsappLink()} label="WhatsApp">
                <WhatsAppIcon className="size-4" />
              </SocialLink>
              <SocialLink href={`mailto:${site.email}`} label="Email Victor">
                <Mail className="size-4" strokeWidth={1.5} />
              </SocialLink>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3">
            <p className="text-[0.625rem] uppercase tracking-[0.22em] text-gold">
              Explore
            </p>
            <ul className="mt-6 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] text-white/65 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + newsletter */}
          <div className="md:col-span-4">
            <p className="text-[0.625rem] uppercase tracking-[0.22em] text-gold">
              Get in touch
            </p>
            <ul className="mt-6 space-y-3 text-[0.9375rem] text-white/65">
              <li>
                <a
                  href={`tel:${site.phone}`}
                  className="flex items-center gap-3 transition-colors hover:text-white"
                >
                  <Phone className="size-3.5 text-gold" strokeWidth={1.5} />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 break-all transition-colors hover:text-white"
                >
                  <Mail className="size-3.5 shrink-0 text-gold" strokeWidth={1.5} />
                  {site.email}
                </a>
              </li>
              <li className="pt-1 text-white/50">
                {site.address.line1 ? `${site.address.line1}, ` : ""}
                {site.address.city}, {site.address.country}
              </li>
            </ul>

            <div className="mt-10">
              <p className="text-[0.625rem] uppercase tracking-[0.22em] text-gold">
                Newsletter
              </p>
              <p className="mt-4 text-sm text-white/55">
                Occasional market notes and new listings. No noise.
              </p>
              <NewsletterForm className="mt-5" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-8 text-[0.8125rem] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <Link href="/privacy" className="transition-colors hover:text-white/70">
            Privacy Policy
          </Link>
        </div>
      </Container>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={label}
      title={label}
      className="flex size-11 items-center justify-center border border-white/20 text-white/70 transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-ink"
    >
      {children}
    </a>
  );
}
