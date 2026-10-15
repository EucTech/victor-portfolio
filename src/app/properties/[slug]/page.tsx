import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  BedDouble,
  Bath,
  Maximize,
  MapPin,
  Check,
  Download,
  CalendarDays,
  Home,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { PropertyCard } from "@/components/property-card";
import { PropertyGallery } from "@/components/property-gallery";
import { SplitText } from "@/components/motion/split-text";
import { Magnetic } from "@/components/motion/magnetic";
import { properties, getProperty } from "@/data/properties";
import { site, whatsappLink } from "@/data/site";
import { formatPrice } from "@/lib/utils";
import { pageMeta, JsonLd, breadcrumbSchema } from "@/lib/seo";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProperty(slug);
  if (!p) return pageMeta({ title: "Property not found", description: "" });

  return pageMeta({
    title: `${p.name}, ${p.location} | ${formatPrice(p.price, p.currency)}${
      p.priceQualifier === "per month" ? " per month" : ""
    }`,
    description: p.shortDescription,
    path: `/properties/${p.slug}`,
    image: p.images[0]?.src,
  });
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProperty(slug);
  if (!p) notFound();

  const related = properties
    .filter((x) => x.slug !== p.slug && x.location === p.location)
    .concat(properties.filter((x) => x.slug !== p.slug && x.location !== p.location))
    .slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: p.name,
    description: p.shortDescription,
    url: `${site.url}/properties/${p.slug}`,
    image: p.images.map((img) => `${site.url}${img.src}`),
    offers: {
      "@type": "Offer",
      price: p.price,
      priceCurrency: p.currency,
      availability:
        p.status === "Sold" ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: p.location,
      addressRegion: p.city,
      addressCountry: "RW",
    },
    numberOfRooms: p.bedrooms || undefined,
    floorSize: p.sizeSqm
      ? { "@type": "QuantitativeValue", value: p.sizeSqm, unitCode: "MTK" }
      : undefined,
  };

  const stats = [
    { icon: Home, label: "Type", value: p.type },
    p.bedrooms > 0 ? { icon: BedDouble, label: "Bedrooms", value: p.bedrooms } : null,
    p.bathrooms > 0 ? { icon: Bath, label: "Bathrooms", value: p.bathrooms } : null,
    p.sizeSqm ? { icon: Maximize, label: "Built area", value: `${p.sizeSqm} m²` } : null,
    p.plotSqm ? { icon: Maximize, label: "Plot", value: `${p.plotSqm} m²` } : null,
  ].filter((s) => s !== null);

  return (
    <>
      {/* Title + gallery */}
      <section className="pt-28 md:pt-32">
        <Container size="wide">
          <Link
            href="/properties"
            className="group inline-flex items-center gap-2 py-4 text-[0.75rem] uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" strokeWidth={1.5} />
            All properties
          </Link>

          <div className="mb-8 mt-4 flex flex-col gap-6 md:mb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <Reveal y={12}>
                <p className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-ink px-3.5 py-1.5 text-[0.625rem] uppercase tracking-[0.16em] text-white">
                    {p.status}
                  </span>
                  <span className="flex items-center gap-1.5 text-[0.875rem] text-muted">
                    <MapPin className="size-4 text-gold-deep" strokeWidth={1.5} />
                    {p.location}, {p.city}
                  </span>
                </p>
              </Reveal>
              <SplitText
                as="h1"
                text={p.name}
                onView={false}
                delay={0.1}
                className="mt-5 font-display text-[2.5rem] leading-[1] tracking-[-0.01em] text-ink sm:text-[3.25rem] md:text-[4.5rem]"
              />
            </div>
            <Reveal delay={300} className="md:text-right">
              <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                {p.priceQualifier ?? "Asking price"}
              </p>
              <p className="mt-1 font-display text-[2.5rem] leading-none text-ink md:text-[3.25rem]">
                {formatPrice(p.price, p.currency)}
              </p>
            </Reveal>
          </div>

          <PropertyGallery images={p.images} name={p.name} />
        </Container>
      </section>

      {/* Detail */}
      <section className="py-20 md:py-28">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {stats.map((s) => (
                    <div key={s.label} className="rounded-[1.25rem] border border-line p-5">
                      <s.icon className="size-5 text-gold-deep" strokeWidth={1.25} />
                      <p className="mt-4 text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                        {s.label}
                      </p>
                      <p className="mt-1 font-display text-[1.5rem] leading-none text-ink">{s.value}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={80} className="mt-16">
                <p className="font-display text-[1.75rem] italic leading-snug text-ink md:text-[2.25rem]">
                  {p.headline}
                </p>
                <div className="mt-8 space-y-5 text-[1rem] leading-relaxed text-muted">
                  {p.description.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={100} className="mt-16">
                <h2 className="font-display text-[2rem] text-ink">Features</h2>
                <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 border-b border-line py-4 text-[0.9375rem] text-ink-soft"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-gold-deep" strokeWidth={1.5} />
                      {f}
                    </li>
                  ))}
                </ul>
              </Reveal>

              {p.videoUrl ? (
                <Reveal delay={110} className="mt-16">
                  <h2 className="font-display text-[2rem] text-ink">Video walkthrough</h2>
                  <div className="mt-6 aspect-video w-full overflow-hidden rounded-[1.5rem]">
                    <iframe
                      src={p.videoUrl}
                      title={`${p.name} video walkthrough`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="size-full"
                    />
                  </div>
                </Reveal>
              ) : null}

              {p.floorPlans?.length ? (
                <Reveal delay={115} className="mt-16">
                  <h2 className="font-display text-[2rem] text-ink">Floor plans</h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {p.floorPlans.map((fp, i) => (
                      <Media
                        key={i}
                        src={fp}
                        alt={`${p.name} floor plan ${i + 1}`}
                        label="Floor plan"
                        className="aspect-[4/3] w-full rounded-[1.25rem]"
                        sizes="50vw"
                      />
                    ))}
                  </div>
                </Reveal>
              ) : null}

              <Reveal delay={120} className="mt-16">
                <h2 className="font-display text-[2rem] text-ink">What&apos;s nearby</h2>
                <ul className="mt-6">
                  {p.nearby.map((n) => (
                    <li
                      key={n}
                      className="flex items-start gap-3 border-b border-line py-4 text-[0.9375rem] text-ink-soft"
                    >
                      <MapPin className="mt-0.5 size-4 shrink-0 text-gold-deep" strokeWidth={1.5} />
                      {n}
                    </li>
                  ))}
                </ul>
              </Reveal>

              {p.investmentHighlights?.length ? (
                <Reveal delay={130} className="mt-16 rounded-[1.75rem] bg-stone p-8 md:p-10">
                  <p className="label mb-5">Investment highlights</p>
                  <ul className="space-y-4">
                    {p.investmentHighlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 text-[0.9875rem] text-ink-soft">
                        <Check className="mt-0.5 size-4 shrink-0 text-gold-deep" strokeWidth={1.5} />
                        {h}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}
            </div>

            {/* Sticky enquiry rail */}
            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <div className="rounded-[1.75rem] bg-ink p-8 text-white">
                  <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-white/50">
                    {p.priceQualifier ?? "Asking price"}
                  </p>
                  <p className="mt-2 font-display text-[2.75rem] leading-none">
                    {formatPrice(p.price, p.currency)}
                  </p>
                  <div className="mt-8 flex flex-col gap-3">
                    <Magnetic strength={0.2} className="w-full">
                      <ButtonLink
                        href={whatsappLink(
                          `Hello Victor, I'd like to book a viewing for ${p.name} in ${p.location}.`,
                        )}
                        external
                        variant="gold"
                        className="w-full"
                      >
                        <CalendarDays className="size-4" strokeWidth={1.5} />
                        Book a Viewing
                      </ButtonLink>
                    </Magnetic>
                    {p.brochureUrl ? (
                      <ButtonLink href={p.brochureUrl} external variant="ghostLight" className="w-full">
                        <Download className="size-4" strokeWidth={1.5} />
                        Download Brochure
                      </ButtonLink>
                    ) : null}
                  </div>
                  <p className="mt-7 border-t border-white/10 pt-6 text-[0.8125rem] leading-relaxed text-white/55">
                    Speak to Victor directly:{" "}
                    <a href={`tel:${site.phone}`} className="text-white underline underline-offset-4">
                      {site.phoneDisplay}
                    </a>
                  </p>
                </div>

                <div className="mt-4 rounded-[1.75rem] border border-line p-8">
                  <h2 className="font-display text-[1.5rem] text-ink">Enquire about this property</h2>
                  <ContactForm propertyName={`${p.name}, ${p.location}`} className="mt-6" />
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {related.length ? (
        <section className="bg-stone py-24 md:py-32">
          <Container size="wide">
            <h2 className="font-display text-[2rem] text-ink md:text-[3rem]">You may also like</h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <PropertyCard key={r.slug} property={r} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <JsonLd data={schema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Properties", path: "/properties" },
          { name: p.name, path: `/properties/${p.slug}` },
        ])}
      />
    </>
  );
}
