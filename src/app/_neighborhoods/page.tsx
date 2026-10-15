import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import { Reveal } from "@/components/ui/reveal";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { neighborhoods } from "@/data/neighborhoods";
import { pageMeta, JsonLd, breadcrumbSchema } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Kigali Neighborhood Guides",
  description:
    "Guides to Kigali's residential neighborhoods: Nyarutarama, Kacyiru, Kibagabaga and Gacuriro. Who each area suits, what it costs, and what to expect.",
  path: "/neighborhoods",
});

export default function NeighborhoodsPage() {
  return (
    <>
      <PageHero
        title="Know the Area Before the Address"
        intro="The right house in the wrong neighborhood is still the wrong decision. These guides cover who each area suits and what it realistically costs."
      />

      <section className="py-24 md:py-32">
        <Container size="wide">
          <div className="space-y-6">
            {neighborhoods.map((n, i) => (
              <Reveal key={n.slug} delay={i * 70}>
                <Link
                  href={`/neighborhoods/${n.slug}`}
                  className="group grid items-center gap-8 border border-line p-6 transition-colors hover:bg-cream md:grid-cols-12 md:gap-12 md:p-8"
                >
                  <Media
                    src={n.image}
                    alt={n.name}
                    label="Neighborhood"
                    className="aspect-[4/3] w-full md:col-span-4"
                    imageClassName="transition-transform duration-[900ms] group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="md:col-span-8">
                    <p className="label">{n.tagline}</p>
                    <h2 className="mt-3 flex items-center gap-3 font-display text-[1.75rem] text-ink transition-colors group-hover:text-gold-deep md:text-[2.25rem]">
                      {n.name}
                      <ArrowUpRight
                        className="size-5 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                        strokeWidth={1.5}
                      />
                    </h2>
                    <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-muted">
                      {n.intro[0]}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {n.bestFor.map((b) => (
                        <span
                          key={b}
                          className="border border-line bg-white px-3 py-1.5 text-[0.6875rem] uppercase tracking-[0.12em] text-muted"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand title="Not sure which area fits you?" text="Tell me how you live (commute, schools, weekends) and I'll tell you where to look." />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Neighborhoods", path: "/neighborhoods" },
        ])}
      />
    </>
  );
}
