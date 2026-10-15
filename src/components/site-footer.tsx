import Link from "next/link";
import { BrandMark } from "./ui/brand-mark";
import { Mail, Phone } from "lucide-react";
import { InstagramIcon, LinkedInIcon, TikTokIcon, WhatsAppIcon, YoutubeIcon } from "./ui/social-icons";
import { nav, site, whatsappLink } from "@/data/site";
import { Magnetic } from "./motion/magnetic";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden rounded-t-[2rem] bg-ink text-white md:rounded-t-[3rem]">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Invitation */}
        <div className="flex flex-col gap-10 border-b border-white/10 py-20 md:flex-row md:items-end md:justify-between md:py-28">
          <h2 className="max-w-3xl font-display text-[2.5rem] leading-[1.02] sm:text-[3.5rem] md:text-[5rem]">
            Let&apos;s find the place <em className="text-gold">that fits</em> your life.
          </h2>
          <Magnetic strength={0.4}>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Start a conversation with Victor on WhatsApp"
              data-cursor="Chat"
              className="group flex size-36 shrink-0 flex-col items-center justify-center gap-2 rounded-full bg-gold text-center text-[0.75rem] uppercase tracking-[0.16em] text-ink transition-colors duration-500 hover:bg-white md:size-44"
            >
              <WhatsAppIcon className="size-6 transition-transform duration-500 group-hover:scale-110" />
              Start a
              <br />
              conversation
            </a>
          </Magnetic>
        </div>

        <div className="grid gap-14 py-16 md:grid-cols-12 md:py-20">
          <div className="md:col-span-4">
            <div className="flex items-center gap-4">
              <BrandMark title="Victor Chiemerie" className="size-14 text-white" />
              <span className="font-display text-[1.75rem] leading-none text-white">Victor Chiemerie</span>
            </div>
            <p className="mt-8 max-w-sm text-[0.9375rem] leading-relaxed text-white/60">
              {site.brandStatement}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SocialLink href={site.socials.instagram} label="Instagram">
                <InstagramIcon className="size-4" />
              </SocialLink>
              <SocialLink href={site.socials.tiktok} label="TikTok">
                <TikTokIcon className="size-4" />
              </SocialLink>
              <SocialLink href={site.socials.linkedin} label="LinkedIn">
                <LinkedInIcon className="size-4" />
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

          <div className="md:col-span-3 md:col-start-6">
            <p className="text-[0.875rem] font-medium text-white">Explore</p>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline text-[0.9375rem] text-white/65 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-[0.875rem] font-medium text-white">Get in touch</p>
            <ul className="mt-6 space-y-3 text-[0.9375rem] text-white/65">
              <li>
                <a href={`tel:${site.phone}`} className="flex items-center gap-3 transition-colors hover:text-white">
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
          </div>
        </div>
      </div>


      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 border-t border-white/10 px-6 py-8 text-[0.8125rem] text-white/40 sm:flex-row sm:items-center sm:justify-between md:px-10">
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <Link href="/privacy" className="transition-colors hover:text-white/70">
          Privacy Policy
        </Link>
      </div>
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
      className="flex size-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-ink"
    >
      {children}
    </a>
  );
}
