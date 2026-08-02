import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import { Reveal } from "@/components/ui/reveal";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { services } from "@/data/services";
import { pageMeta, JsonLd, breadcrumbSchema } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata = pageMeta({
  title: "Services — Buying, Selling & Investment Guidance in Kigali",
  description:
    "Buying, selling and property investment guidance in Kigali, Rwanda. Professional representation from first conversation through to closing and beyond.",
  path: "/services",
});

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title,
      description: s.summary,
      areaServed: { "@type": "City", name: "Kigali" },
      provider: { "@type": "RealEstateAgent", name: site.name },
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title="How I Can Help"
        intro="Three areas of focus, each built on the same principle — clear advice, given honestly, in your interest."
      />

      <section className="py-24 md:py-32">
        <Container size="wide">
          <div className="space-y-24 md:space-y-32">
            {services.map((s, i) => (
              <Reveal key={s.slug} id={s.slug}>
                <div
                  className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <Media
                    src=""
                    alt={s.title}
                    label="Section image"
                    className="aspect-[4/3] w-full"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div>
                    <p className="label mb-4">
                      0{i + 1} — Service
                    </p>
                    <h2 className="font-display text-[2rem] leading-tight text-ink md:text-[2.5rem]">
                      {s.title}
                    </h2>
                    <div className="mt-6 h-px w-12 bg-gold" />
                    <p className="mt-7 text-[0.9375rem] leading-relaxed text-ink-soft">
                      {s.summary}
                    </p>
                    <div className="mt-5 space-y-4 text-[0.9375rem] leading-relaxed text-muted">
                      {s.detail.map((d, j) => (
                        <p key={j}>{d}</p>
                      ))}
                    </div>
                    <ul className="mt-8 space-y-3 border-t border-line pt-8">
                      {s.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-3 text-[0.9375rem] text-ink-soft"
                        >
                          <Check
                            className="mt-0.5 size-4 shrink-0 text-gold-deep"
                            strokeWidth={1.5}
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand title="Not sure which you need?" text="Start with a conversation. I'll tell you honestly what I think makes sense for your situation." />
      <JsonLd data={serviceSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
    </>
  );
}
