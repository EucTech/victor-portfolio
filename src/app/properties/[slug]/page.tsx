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
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { PropertyCard } from "@/components/property-card";
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
    title: `${p.name}, ${p.location} — ${formatPrice(p.price, p.currency)}`,
    description: p.shortDescription,
    path: `/properties/${p.slug}`,
    image: p.images[0],
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
    datePosted: new Date().toISOString().slice(0, 10),
    offers: {
      "@type": "Offer",
      price: p.price,
      priceCurrency: p.currency,
      availability:
        p.status === "Sold"
          ? "https://schema.org/SoldOut"
          : "https://schema.org/InStock",
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

  const gallery = p.images.length ? p.images : ["", "", ""];

  return (
    <>
      {/* Gallery */}
      <section className="pt-24 md:pt-28">
        <Container size="wide">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 py-6 text-[0.75rem] uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-3.5" strokeWidth={1.5} />
            All properties
          </Link>

          <div className="grid gap-2 md:grid-cols-3">
            <Media
              src={gallery[0]}
              alt={p.name}
              label="Main photo"
              priority
              className="aspect-[16/10] w-full md:col-span-2 md:row-span-2"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            <Media
              src={gallery[1]}
              alt={`${p.name} — additional view`}
              label="Photo"
              className="hidden aspect-[4/3] w-full md:block"
              sizes="33vw"
            />
            <Media
              src={gallery[2]}
              alt={`${p.name} — additional view`}
              label="Photo"
              className="hidden aspect-[4/3] w-full md:block"
              sizes="33vw"
            />
          </div>
        </Container>
      </section>

      {/* Detail */}
      <section className="py-16 md:py-24">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              <Reveal>
                <span className="inline-block border border-line px-3 py-1.5 text-[0.625rem] uppercase tracking-[0.16em] text-gold-deep">
                  {p.status} · {p.type}
                </span>
                <h1 className="mt-6 font-display text-[1.875rem] leading-[1.12] text-ink sm:text-[2.25rem] md:text-[3rem]">
                  {p.name}
                </h1>
                <p className="mt-3 flex items-center gap-2 text-[0.9375rem] text-muted">
                  <MapPin className="size-4 text-gold-deep" strokeWidth={1.5} />
                  {p.location}, {p.city}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4 border-y border-line py-6">
                  {p.bedrooms > 0 ? (
                    <Stat icon={<BedDouble className="size-4" strokeWidth={1.5} />} label="Bedrooms" value={p.bedrooms} />
                  ) : null}
                  {p.bathrooms > 0 ? (
                    <Stat icon={<Bath className="size-4" strokeWidth={1.5} />} label="Bathrooms" value={p.bathrooms} />
                  ) : null}
                  {p.sizeSqm ? (
                    <Stat icon={<Maximize className="size-4" strokeWidth={1.5} />} label="Built area" value={`${p.sizeSqm} m²`} />
                  ) : null}
                  {p.plotSqm ? (
                    <Stat icon={<Maximize className="size-4" strokeWidth={1.5} />} label="Plot" value={`${p.plotSqm} m²`} />
                  ) : null}
                </div>
              </Reveal>

              <Reveal delay={80} className="mt-12">
                <h2 className="font-display text-2xl text-ink">About this property</h2>
                <div className="mt-5 space-y-4 text-[0.9375rem] leading-relaxed text-muted">
                  {p.description.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={100} className="mt-12">
                <h2 className="font-display text-2xl text-ink">Features & amenities</h2>
                <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[0.9375rem] text-muted">
                      <Check className="mt-0.5 size-4 shrink-0 text-gold-deep" strokeWidth={1.5} />
                      {f}
                    </li>
                  ))}
                </ul>
              </Reveal>

              {p.videoUrl ? (
                <Reveal delay={110} className="mt-12">
                  <h2 className="font-display text-2xl text-ink">Video walkthrough</h2>
                  <div className="mt-6 aspect-video w-full">
                    <iframe
                      src={p.videoUrl}
                      title={`${p.name} video walkthrough`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="size-full border border-line"
                    />
                  </div>
                </Reveal>
              ) : null}

              {p.floorPlans?.length ? (
                <Reveal delay={115} className="mt-12">
                  <h2 className="font-display text-2xl text-ink">Floor plans</h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {p.floorPlans.map((fp, i) => (
                      <Media
                        key={i}
                        src={fp}
                        alt={`${p.name} floor plan ${i + 1}`}
                        label="Floor plan"
                        className="aspect-[4/3] w-full"
                        sizes="50vw"
                      />
                    ))}
                  </div>
                </Reveal>
              ) : null}

              <Reveal delay={120} className="mt-12">
                <h2 className="font-display text-2xl text-ink">What&apos;s nearby</h2>
                <ul className="mt-6 space-y-3">
                  {p.nearby.map((n) => (
                    <li
                      key={n}
                      className="flex items-start gap-3 border-b border-line pb-3 text-[0.9375rem] text-muted last:border-0"
                    >
                      <MapPin className="mt-0.5 size-4 shrink-0 text-gold-deep" strokeWidth={1.5} />
                      {n}
                    </li>
                  ))}
                </ul>
              </Reveal>

              {p.investmentHighlights?.length ? (
                <Reveal delay={130} className="mt-12 border border-line bg-cream p-8 md:p-10">
                  <p className="label mb-4">Investment highlights</p>
                  <ul className="space-y-3">
                    {p.investmentHighlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 text-[0.9375rem] text-ink-soft">
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
              <div className="lg:sticky lg:top-32">
                <div className="border border-line p-8">
                  <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                    {p.priceQualifier ?? "Price"}
                  </p>
                  <p className="mt-2 font-display text-[2.25rem] leading-none text-ink">
                    {formatPrice(p.price, p.currency)}
                  </p>

                  <div className="mt-7 flex flex-col gap-3">
                    <ButtonLink
                      href={whatsappLink(
                        `Hello Victor, I'd like to book a viewing for ${p.name} in ${p.location}.`,
                      )}
                      external
                      className="w-full"
                    >
                      <CalendarDays className="size-4" strokeWidth={1.5} />
                      Book a Viewing
                    </ButtonLink>
                    {p.brochureUrl ? (
                      <ButtonLink href={p.brochureUrl} external variant="outline" className="w-full">
                        <Download className="size-4" strokeWidth={1.5} />
                        Download Brochure
                      </ButtonLink>
                    ) : null}
                  </div>

                  <p className="mt-7 border-t border-line pt-6 text-[0.8125rem] leading-relaxed text-muted">
                    Speak to Victor directly:{" "}
                    <a href={`tel:${site.phone}`} className="text-ink underline underline-offset-4">
                      {site.phoneDisplay}
                    </a>
                  </p>
                </div>

                <div className="mt-6 border border-line p-8">
                  <h2 className="font-display text-xl text-ink">Enquire about this property</h2>
                  <ContactForm propertyName={`${p.name}, ${p.location}`} className="mt-6" />
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Related */}
      {related.length ? (
        <section className="border-t border-line bg-cream py-24">
          <Container size="wide">
            <h2 className="font-display text-[1.75rem] text-ink md:text-[2.25rem]">
              You may also like
            </h2>
            <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
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

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div>
      <p className="flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
        <span className="text-gold-deep">{icon}</span>
        {label}
      </p>
      <p className="mt-1.5 font-display text-xl text-ink">{value}</p>
    </div>
  );
}
