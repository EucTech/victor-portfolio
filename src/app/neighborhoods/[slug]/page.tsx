import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { PageHero } from "@/components/page-hero";
import { PropertyCard } from "@/components/property-card";
import { CtaBand } from "@/components/cta-band";
import { neighborhoods, getNeighborhood } from "@/data/neighborhoods";
import { properties } from "@/data/properties";
import { pageMeta, JsonLd, breadcrumbSchema } from "@/lib/seo";

export function generateStaticParams() {
  return neighborhoods.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const n = getNeighborhood(slug);
  if (!n) return pageMeta({ title: "Neighborhood not found", description: "" });

  return pageMeta({
    title: `${n.name}, Kigali — Neighborhood Guide`,
    description: `${n.tagline}. A guide to living and buying property in ${n.name}, Kigali — who it suits, what to expect and current price guidance.`,
    path: `/neighborhoods/${n.slug}`,
    image: n.image,
  });
}

export default async function NeighborhoodPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const n = getNeighborhood(slug);
  if (!n) notFound();

  const listings = properties.filter((p) => p.location === n.name);

  return (
    <>
      <PageHero label="Neighborhood guide" title={n.name} intro={n.tagline} image={n.image} />

      <section className="py-20 md:py-28">
        <Container size="wide">
          <Link
            href="/neighborhoods"
            className="inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-3.5" strokeWidth={1.5} />
            All neighborhoods
          </Link>

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-7">
              <div className="space-y-5 text-[1.0625rem] leading-[1.75] text-ink-soft">
                {n.intro.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-5">
              <div className="border border-line bg-cream p-8">
                <p className="label">Best suited to</p>
                <ul className="mt-5 space-y-3">
                  {n.bestFor.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[0.9375rem] text-ink-soft">
                      <Check className="mt-0.5 size-4 shrink-0 text-gold-deep" strokeWidth={1.5} />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 border-t border-line pt-6">
                  <p className="label">Price guidance</p>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                    {n.priceGuide}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {listings.length ? (
        <section className="border-t border-line bg-cream py-24">
          <Container size="wide">
            <h2 className="font-display text-[1.75rem] text-ink md:text-[2.25rem]">
              Available in {n.name}
            </h2>
            <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((p) => (
                <PropertyCard key={p.slug} property={p} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CtaBand
        title={`Thinking about ${n.name}?`}
        text="I can walk you through the area in person and show you what's available — including properties that never reach the listings."
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Neighborhoods", path: "/neighborhoods" },
          { name: n.name, path: `/neighborhoods/${n.slug}` },
        ])}
      />
    </>
  );
}
