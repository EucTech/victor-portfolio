import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import { Reveal } from "@/components/ui/reveal";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { site, whatsappLink } from "@/data/site";
import { InstagramIcon, LinkedInIcon, TikTokIcon, YoutubeIcon } from "@/components/ui/social-icons";
import { pageMeta, JsonLd, breadcrumbSchema } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact Victor Chiemerie, Realtor in Kigali",
  description:
    "Get in touch with Victor Chiemerie about buying, selling or investing in property in Kigali, Rwanda. Call, email or message on WhatsApp.",
  path: "/contact",
});

export default function ContactPage() {
  const hasAddress = Boolean(site.address.line1);
  const mapQuery = encodeURIComponent(
    hasAddress
      ? `${site.address.line1}, ${site.address.city}, ${site.address.country}`
      : "Kigali, Rwanda",
  );

  return (
    <>
      <PageHero
        title="Let's Talk"
        intro="Tell me what you're trying to do. I'll tell you honestly whether I can help and what I'd suggest."
      />

      <section className="py-24 md:py-32">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            {/* Details */}
            <Reveal className="lg:col-span-5">
              <Media
                src={site.portrait}
                alt="Victor Chiemerie, realtor in Kigali"
                label="Professional portrait"
                imageClassName="object-[50%_25%]"
                className="aspect-[4/5] w-full rounded-[2rem]"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />

              <div className="mt-10 space-y-6">
                <ContactRow
                  icon={<Phone className="size-4" strokeWidth={1.5} />}
                  label="Phone"
                  value={site.phoneDisplay}
                  href={`tel:${site.phone}`}
                />
                <ContactRow
                  icon={<MessageCircle className="size-4" strokeWidth={1.5} />}
                  label="WhatsApp"
                  value={site.phoneDisplay}
                  href={whatsappLink()}
                  external
                />
                <ContactRow
                  icon={<Mail className="size-4" strokeWidth={1.5} />}
                  label="Email"
                  value={site.email}
                  href={`mailto:${site.email}`}
                />
                <ContactRow
                  icon={<MapPin className="size-4" strokeWidth={1.5} />}
                  label="Office"
                  value={
                    hasAddress
                      ? `${site.address.line1}, ${site.address.city}`
                      : `${site.address.city}, ${site.address.country}`
                  }
                />
              </div>

              <div className="mt-10">
                <p className="label">Follow Victor</p>
                <div className="mt-4 flex gap-3">
                  {[
                    { href: site.socials.instagram, label: "Instagram", Icon: InstagramIcon },
                    { href: site.socials.tiktok, label: "TikTok", Icon: TikTokIcon },
                    { href: site.socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
                    { href: site.socials.youtube, label: "YouTube", Icon: YoutubeIcon },
                  ].map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Victor on ${label}`}
                      className="flex size-12 items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white"
                    >
                      <Icon className="size-4" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={100} className="lg:col-span-7">
              <h2 className="font-display text-[2rem] leading-tight text-ink md:text-[2.5rem]">
                Send a message
              </h2>
              <p className="mt-6 text-[0.9375rem] leading-relaxed text-muted">
                I read every message personally and reply within one business day.
                For anything urgent, WhatsApp is fastest.
              </p>
              <ContactForm className="mt-10" />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Map */}
      <section className="border-t border-line">
        <div className="h-[420px] w-full bg-cream">
          <iframe
            title="Office location map"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="size-full border-0 grayscale-[35%]"
          />
        </div>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
    </>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <>
      <span className="mt-0.5 text-gold-deep">{icon}</span>
      <span>
        <span className="block text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
          {label}
        </span>
        <span className="mt-1 block break-all text-[0.9375rem] text-ink">{value}</span>
      </span>
    </>
  );

  if (!href) {
    return <div className="flex items-start gap-4 border-b border-line pb-6">{content}</div>;
  }

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex items-start gap-4 border-b border-line pb-6 transition-colors hover:text-gold-deep"
    >
      {content}
    </a>
  );
}
