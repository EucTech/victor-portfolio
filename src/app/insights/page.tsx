import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import { Reveal } from "@/components/ui/reveal";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { insights } from "@/data/insights";
import { formatDate } from "@/lib/utils";
import { pageMeta, JsonLd, breadcrumbSchema } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Insights — Kigali Property Market Notes",
  description:
    "Practical articles on buying, selling and investing in property in Kigali, Rwanda — written for people making real decisions.",
  path: "/insights",
});

export default function InsightsPage() {
  const sorted = [...insights].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  const [lead, ...rest] = sorted;

  return (
    <>
      <PageHero
        label="Insights"
        title="Notes on Property in Kigali"
        intro="Written to inform rather than to sell. If an article changes how you approach a decision, it has done its job."
      />

      <section className="py-24 md:py-28">
        <Container size="wide">
          {/* Lead article */}
          {lead ? (
            <Reveal>
              <Link
                href={`/insights/${lead.slug}`}
                className="group grid gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <Media
                  src={lead.image}
                  alt={lead.title}
                  label="Article image"
                  priority
                  className="aspect-[4/3] w-full"
                  imageClassName="transition-transform duration-[900ms] group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="flex flex-col justify-center">
                  <p className="label">{lead.category}</p>
                  <h2 className="mt-4 font-display text-[2rem] leading-tight text-ink transition-colors group-hover:text-gold-deep md:text-[2.75rem]">
                    {lead.title}
                  </h2>
                  <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">
                    {lead.excerpt}
                  </p>
                  <p className="mt-6 text-[0.75rem] uppercase tracking-[0.14em] text-muted/80">
                    {formatDate(lead.date)} · {lead.readMinutes} min read
                  </p>
                </div>
              </Link>
            </Reveal>
          ) : null}

          {/* Remaining */}
          {rest.length ? (
            <div className="mt-24 grid gap-x-8 gap-y-14 border-t border-line pt-16 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, i) => (
                <Reveal key={post.slug} delay={i * 80}>
                  <Link href={`/insights/${post.slug}`} className="group block">
                    <Media
                      src={post.image}
                      alt={post.title}
                      label="Article image"
                      className="aspect-[3/2] w-full"
                      imageClassName="transition-transform duration-[900ms] group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <p className="mt-5 text-[0.6875rem] uppercase tracking-[0.16em] text-gold-deep">
                      {post.category}
                    </p>
                    <h3 className="mt-3 font-display text-xl leading-snug text-ink transition-colors group-hover:text-gold-deep">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                      {post.excerpt}
                    </p>
                    <p className="mt-4 text-[0.75rem] text-muted/80">
                      {formatDate(post.date)} · {post.readMinutes} min read
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : null}
        </Container>
      </section>

      <CtaBand title="Have a question an article didn't answer?" />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
        ])}
      />
    </>
  );
}
