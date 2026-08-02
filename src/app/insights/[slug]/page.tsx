import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import { ButtonLink } from "@/components/ui/button";
import { CtaBand } from "@/components/cta-band";
import { insights, getInsight } from "@/data/insights";
import { site } from "@/data/site";
import { formatDate } from "@/lib/utils";
import { pageMeta, JsonLd, breadcrumbSchema } from "@/lib/seo";

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) return pageMeta({ title: "Article not found", description: "" });

  return pageMeta({
    title: post.title,
    description: post.excerpt,
    path: `/insights/${post.slug}`,
    image: post.image,
    type: "article",
    publishedTime: post.date,
  });
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) notFound();

  const more = insights.filter((i) => i.slug !== post.slug).slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: site.name, url: `${site.url}/about` },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/insights/${post.slug}`,
    articleSection: post.category,
  };

  return (
    <>
      <article>
        <Container size="narrow">
          <div className="pt-36 md:pt-44">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink"
            >
              <ArrowLeft className="size-3.5" strokeWidth={1.5} />
              All insights
            </Link>

            <p className="label mt-10">{post.category}</p>
            <h1 className="mt-4 font-display text-[1.875rem] leading-[1.12] text-ink sm:text-[2.25rem] md:text-[3.25rem]">
              {post.title}
            </h1>
            <p className="mt-6 text-[0.75rem] uppercase tracking-[0.14em] text-muted">
              {formatDate(post.date)} · {post.readMinutes} min read · By {site.name}
            </p>
          </div>
        </Container>

        <Container size="wide">
          <Media
            src={post.image}
            alt={post.title}
            label="Article image"
            priority
            className="mt-14 aspect-[21/9] w-full"
            sizes="100vw"
          />
        </Container>

        <Container size="narrow">
          <div className="py-16 md:py-20">
            <p className="border-l-2 border-gold pl-6 font-display text-xl leading-relaxed text-ink md:text-2xl">
              {post.excerpt}
            </p>

            <div className="mt-12 space-y-6">
              {post.body.map((block, i) =>
                block.startsWith("## ") ? (
                  <h2
                    key={i}
                    className="pt-6 font-display text-[1.625rem] leading-snug text-ink md:text-[2rem]"
                  >
                    {block.replace("## ", "")}
                  </h2>
                ) : (
                  <p key={i} className="text-[1.0625rem] leading-[1.75] text-ink-soft">
                    {block}
                  </p>
                ),
              )}
            </div>

            <div className="mt-16 border-t border-line pt-10">
              <p className="font-display text-xl text-ink">
                Have a question about this?
              </p>
              <p className="mt-2 text-[0.9375rem] text-muted">
                I&apos;m happy to talk it through in relation to your own situation.
              </p>
              <ButtonLink href="/contact" variant="outline" className="mt-6">
                Get in Touch
              </ButtonLink>
            </div>
          </div>
        </Container>
      </article>

      {more.length ? (
        <section className="border-t border-line bg-cream py-20">
          <Container size="wide">
            <h2 className="font-display text-2xl text-ink">Keep reading</h2>
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              {more.map((m) => (
                <Link key={m.slug} href={`/insights/${m.slug}`} className="group block">
                  <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-gold-deep">
                    {m.category}
                  </p>
                  <h3 className="mt-2 font-display text-xl text-ink transition-colors group-hover:text-gold-deep">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] text-muted">{m.excerpt}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CtaBand />
      <JsonLd data={articleSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: post.title, path: `/insights/${post.slug}` },
        ])}
      />
    </>
  );
}
