import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Media } from "@/components/ui/media";
import { Reveal } from "@/components/ui/reveal";
import { PropertyCard } from "@/components/property-card";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { CtaBand } from "@/components/cta-band";
import { featuredProperties } from "@/data/properties";
import { testimonials } from "@/data/testimonials";
import { recentInsights } from "@/data/insights";
import { differentiators } from "@/data/services";
import { neighborhoods } from "@/data/neighborhoods";
import { site } from "@/data/site";
import { formatDate } from "@/lib/utils";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: `${site.name} | Realtor in Kigali, Rwanda`,
  description: site.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------- Hero */}
      <section className="relative">
        <Media
          src=""
          alt="Kigali skyline and contemporary architecture"
          dark
          label="Hero image or looping video"
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/60 to-ink/80" />

        <Container size="wide">
          <div className="relative flex min-h-[88vh] flex-col justify-center py-32 sm:py-36 md:py-40">
            <p className="text-[0.6875rem] uppercase tracking-[0.24em] text-gold">
              {site.role}
            </p>
            <h1 className="mt-6 max-w-4xl font-display text-[2.25rem] leading-[1.05] text-white sm:text-[2.75rem] md:text-[4.5rem] lg:text-[5rem]">
              Victor Chiemerie
              <span className="mt-3 block text-[1.375rem] leading-[1.25] text-white/85 sm:text-[1.75rem] md:text-[2.75rem]">
                Helping You Make Confident Property Decisions in Rwanda
              </span>
            </h1>
            <p className="mt-8 max-w-xl text-[0.9375rem] leading-relaxed text-white/65 md:text-base">
              Whether you&apos;re searching for a place to call home, expanding your
              investment portfolio, or preparing to sell your property in Kigali, I
              help you make the process seamless.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:mt-11 sm:flex-row sm:flex-wrap sm:gap-4">
              <ButtonLink href="/properties" variant="gold">
                Explore Properties
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghostLight">
                Let&apos;s Talk
              </ButtonLink>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-[0.8125rem]">
              <Link
                href="/neighborhoods"
                className="link-underline text-white/70 transition-colors hover:text-gold"
              >
                Neighborhoods
              </Link>
              <Link
                href="/insights/why-investors-are-looking-at-kigali"
                className="link-underline text-white/70 transition-colors hover:text-gold"
              >
                Why invest in Kigali?
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------- Featured properties */}
      <section className="py-24 md:py-32">
        <Container size="wide">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              label="Featured"
              title="A curated collection of available properties"
            />
            <Link
              href="/properties"
              className="link-underline inline-flex items-center gap-2 pb-2 text-[0.75rem] uppercase tracking-[0.16em] text-ink"
            >
              View all properties
              <ArrowRight className="size-3.5" strokeWidth={1.5} />
            </Link>
          </Reveal>

          <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <PropertyCard property={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* -------------------------------------------- Why work with me */}
      <section className="bg-cream py-24 md:py-32">
        <Container size="wide">
          <Reveal>
            <SectionHeading
              label="Why work with Victor"
              title="Buying or selling property is one of life's biggest decisions"
              intro="My role is to simplify the process, provide honest advice, offer the best property listing within your request, and help you make decisions with confidence and peace of mind."
            />
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((d, i) => (
              <Reveal key={d.title} delay={i * 80} className="bg-cream">
                <div className="h-full bg-white p-8 transition-colors duration-500 hover:bg-gold-tint md:p-10">
                  <span className="font-display text-3xl text-gold">
                    0{i + 1}
                  </span>
                  <h3 className="mt-6 font-display text-xl leading-snug text-ink">
                    {d.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                    {d.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------- Meet Victor */}
      <section className="py-24 md:py-32">
        <Container size="wide">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <Media
                src=""
                alt="Victor Chiemerie"
                label="Professional portrait"
                className="aspect-[4/5] w-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </Reveal>

            <Reveal delay={120}>
              <p className="label mb-4">Meet Victor</p>
              <h2 className="font-display text-[2rem] leading-[1.15] text-ink md:text-[2.75rem]">
                Real estate is about more than transactions
              </h2>
              <div className="mt-6 h-px w-12 bg-gold" />
              <div className="mt-8 space-y-5 text-[0.9375rem] leading-relaxed text-muted">
                <p>
                  It&apos;s about understanding people&apos;s goals and helping them
                  make decisions that shape their future.
                </p>
                <p>
                  My approach is built on listening first, offering honest advice, and
                  creating an experience that feels straightforward and personal.
                  Whether you&apos;re purchasing your first home, relocating to Rwanda,
                  or expanding your property portfolio, I leverage my knowledge,
                  experience, and every resource to ensure you receive the best
                  possible outcome.
                </p>
                <p className="text-ink">
                  Let&apos;s connect — I look forward to serving you.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <ButtonLink href="/about" variant="outline">
                  Read My Story
                </ButtonLink>
                <div className="text-[0.8125rem] text-muted">
                  <a
                    href={`tel:${site.phone}`}
                    className="block transition-colors hover:text-gold-deep"
                  >
                    {site.phoneDisplay}
                  </a>
                  <a
                    href={`mailto:${site.email}`}
                    className="block transition-colors hover:text-gold-deep"
                  >
                    {site.email}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------- Neighborhoods */}
      <section className="border-y border-line bg-cream py-24 md:py-32">
        <Container size="wide">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              label="Where to live"
              title="Know the neighborhood before you choose the house"
            />
            <Link
              href="/neighborhoods"
              className="link-underline inline-flex items-center gap-2 pb-2 text-[0.75rem] uppercase tracking-[0.16em] text-ink"
            >
              All neighborhoods
              <ArrowRight className="size-3.5" strokeWidth={1.5} />
            </Link>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {neighborhoods.map((n, i) => (
              <Reveal key={n.slug} delay={i * 70}>
                <Link href={`/neighborhoods/${n.slug}`} className="group block">
                  <Media
                    src={n.image}
                    alt={n.name}
                    label="Neighborhood"
                    className="aspect-[3/4] w-full"
                    imageClassName="transition-transform duration-[900ms] group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                  <h3 className="mt-5 flex items-center gap-2 font-display text-xl text-ink transition-colors group-hover:text-gold-deep">
                    {n.name}
                    <ArrowUpRight
                      className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                      strokeWidth={1.5}
                    />
                  </h3>
                  <p className="mt-1 text-[0.8125rem] text-muted">{n.tagline}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------- Testimonials */}
      <section className="py-24 md:py-32">
        <Container size="wide">
          <Reveal>
            <SectionHeading
              label="Client experiences"
              title="What clients say"
              align="center"
            />
          </Reveal>
          <Reveal delay={100} className="mt-16">
            <TestimonialCarousel items={testimonials} />
          </Reveal>
        </Container>
      </section>

      {/* -------------------------------------------------------- Insights */}
      <section className="bg-cream py-24 md:py-32">
        <Container size="wide">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              label="Insights"
              title="Notes on the Kigali property market"
            />
            <Link
              href="/insights"
              className="link-underline inline-flex items-center gap-2 pb-2 text-[0.75rem] uppercase tracking-[0.16em] text-ink"
            >
              View all articles
              <ArrowRight className="size-3.5" strokeWidth={1.5} />
            </Link>
          </Reveal>

          <div className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-3">
            {recentInsights.map((post, i) => (
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
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
