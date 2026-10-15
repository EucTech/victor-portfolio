import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Media } from "@/components/ui/media";
import { Reveal } from "@/components/ui/reveal";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { CtaBand } from "@/components/cta-band";
import { Hero } from "@/components/home/hero";
import { ScrollStatement } from "@/components/home/scroll-statement";
import { ListingShowcase } from "@/components/home/listing-showcase";
import { HorizontalGallery } from "@/components/home/horizontal-gallery";
import { HoverRows } from "@/components/home/hover-rows";
import { Tilt } from "@/components/motion/tilt";
import { Magnetic } from "@/components/motion/magnetic";
import { featuredProperties, properties } from "@/data/properties";
import { testimonials } from "@/data/testimonials";
// import { recentInsights } from "@/data/insights";
import { differentiators, services } from "@/data/services";
import { neighborhoods } from "@/data/neighborhoods";
import { site } from "@/data/site";
// import { formatDate } from "@/lib/utils";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: `${site.name} | Realtor in Kigali, Rwanda`,
  description: site.description,
  path: "/",
});

/** Alternate photos from each listing so the ring mixes both homes. */
function ringPhotos(limit = 14) {
  const lists = properties.map((p) => p.images.map((img) => ({ ...img, slug: p.slug })));
  const out: { src: string; alt: string; slug: string }[] = [];
  for (let i = 0; out.length < limit && lists.some((l) => l[i]); i++) {
    for (const l of lists) if (l[i] && out.length < limit) out.push(l[i]);
  }
  return out;
}

// function listingCount(location: string) {
//   const n = properties.filter((p) => p.location === location).length;
//   return n ? `${n} live listing${n === 1 ? "" : "s"}` : undefined;
// }

const marqueeWords = [
  "Buying",
  "Selling",
  "Investment guidance",
  ...neighborhoods.map((n) => n.name),
  "Kiyovu",
];

export default function HomePage() {
  const galleryProperty = featuredProperties.find((p) => p.images.length > 6);

  return (
    <>
      <Hero photos={ringPhotos()} listings={featuredProperties} />

      {/* Marquee */}
      <section aria-hidden="true" className="overflow-hidden border-y border-line py-6">
        <div className="animate-marquee flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {marqueeWords.map((w) => (
                <span key={`${copy}-${w}`} className="flex items-center">
                  <span className="px-8 font-display text-[1.75rem] italic text-ink md:text-[2.25rem]">
                    {w}
                  </span>
                  <span className="size-1.5 rounded-full bg-gold" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Statement */}
      <section className="py-28 md:py-44">
        <Container size="wide">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-10">
              <ScrollStatement
                text="Real estate is about more than transactions. It's about understanding people's goals and helping them make decisions that shape their future, with honest advice at every step."
                accent={["people's", "future"]}
              />
              <Reveal delay={100} className="mt-12">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-3 text-[0.8125rem] uppercase tracking-[0.16em] text-ink"
                >
                  <span className="link-underline">Read my story</span>
                  <span className="flex size-10 items-center justify-center rounded-full border border-ink/15 transition-colors duration-300 group-hover:bg-ink group-hover:text-white">
                    <ArrowRight className="size-4" strokeWidth={1.5} />
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured listings */}
      <section>
        <Container size="wide">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading title="Homes worth slowing down for" />
            <Reveal delay={150}>
              <Link
                href="/properties"
                className="group inline-flex items-center gap-3 pb-2 text-[0.8125rem] uppercase tracking-[0.16em] text-ink"
              >
                <span className="link-underline">All properties</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
            </Reveal>
          </div>
        </Container>
        <ListingShowcase listings={featuredProperties} />
      </section>

      {/* Walk through one home */}
      {galleryProperty ? (
        <HorizontalGallery
          title={`Take a slow walk through ${galleryProperty.name.replace(/^The /, "the ")}`}
          href={`/properties/${galleryProperty.slug}`}
          images={galleryProperty.images.slice(1, 10)}
        />
      ) : null}

      {/* Why work with Victor */}
      <section className="py-28 md:py-40">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-36">
                <SectionHeading
                  title="One of life's biggest decisions deserves a steady hand"
                  intro="My role is to simplify the process, give honest advice, find the best listings within your brief, and help you decide with confidence and peace of mind."
                />
                <Reveal delay={250} className="mt-10">
                  <ButtonLink href="/services" variant="outline">
                    How I help
                  </ButtonLink>
                </Reveal>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
              {differentiators.map((d, i) => (
                <Reveal key={d.title} delay={i * 90} className={i % 2 === 1 ? "sm:translate-y-16" : undefined}>
                  <Tilt className="group h-full">
                    <div className="flex h-full min-h-[18rem] flex-col justify-between rounded-[1.75rem] border border-line bg-white p-8 transition-colors duration-500 group-hover:border-transparent group-hover:bg-stone md:p-10">
                      <span className="font-display text-[3.5rem] leading-none text-gold [transform:translateZ(40px)]">
                        0{i + 1}
                      </span>
                      <div className="[transform:translateZ(24px)]">
                        <h3 className="font-display text-[1.625rem] leading-tight text-ink">{d.title}</h3>
                        <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{d.body}</p>
                      </div>
                    </div>
                  </Tilt>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="pb-28 md:pb-40">
        <Container size="wide">
          <SectionHeading title="Buying, selling and investing, handled personally" className="mb-14" />
          <HoverRows
            rows={services.map((s) => ({
              href: `/services#${s.slug}`,
              title: s.title,
              body: s.summary,
            }))}
          />
        </Container>
      </section>

      {/* Meet Victor */}
      <section className="bg-stone py-28 md:py-40">
        <Container size="wide">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <Tilt max={5} className="group">
                <Media
                  src={site.portrait}
                  alt="Victor Chiemerie, realtor in Kigali"
                  label="Professional portrait"
                  imageClassName="object-[50%_25%]"
                  className="aspect-[4/5] w-full rounded-[2rem]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </Tilt>
            </Reveal>
            <div className="lg:col-span-7">
              <SectionHeading title="Listening first, advising honestly" />
              <Reveal delay={150}>
                <div className="mt-8 max-w-xl space-y-5 text-[1rem] leading-relaxed text-muted">
                  <p>
                    My approach is built on listening first, offering honest advice, and
                    creating an experience that feels straightforward and personal.
                  </p>
                  <p>
                    Whether you&apos;re purchasing your first home, relocating to Rwanda, or
                    expanding your property portfolio, I bring my knowledge, experience and
                    every resource to make sure you receive the best possible outcome.
                  </p>
                  <p className="font-display text-[1.5rem] italic leading-snug text-ink">
                    Let&apos;s connect. I look forward to serving you.
                  </p>
                </div>
                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
                  <Magnetic>
                    <ButtonLink href="/about">Read my story</ButtonLink>
                  </Magnetic>
                  <div className="text-[0.875rem]">
                    <a href={`tel:${site.phone}`} className="block text-ink hover:text-gold-deep">
                      {site.phoneDisplay}
                    </a>
                    <a href={`mailto:${site.email}`} className="block text-muted hover:text-gold-deep">
                      {site.email}
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Neighborhoods section, hidden for now. To restore: uncomment this and
          listingCount above, and rename src/app/_neighborhoods back to neighborhoods.
      <section className="py-28 md:py-40">
        <Container size="wide">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading title="Know the neighborhood before you choose the house" />
            <Reveal delay={150}>
              <Link
                href="/neighborhoods"
                className="group inline-flex items-center gap-3 pb-2 text-[0.8125rem] uppercase tracking-[0.16em] text-ink"
              >
                <span className="link-underline">All neighborhoods</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
            </Reveal>
          </div>
          <HoverRows
            rows={neighborhoods.map((n) => ({
              href: `/neighborhoods/${n.slug}`,
              title: n.name,
              meta: listingCount(n.name),
              body: n.tagline,
            }))}
          />
        </Container>
      </section>
      */}

      {/* Testimonials */}
      <section className="bg-stone py-28 md:py-40">
        <Container size="wide">
          <SectionHeading title="What clients say" align="center" />
          <Reveal delay={100} className="mt-16">
            <TestimonialCarousel items={testimonials} />
          </Reveal>
        </Container>
      </section>

      {/* Insights section, hidden for now. To restore: uncomment this and its
          imports, and rename src/app/_insights back to insights.
      <section className="py-28 md:py-40">
        <Container size="wide">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading title="Notes on the Kigali property market" />
            <Reveal delay={150}>
              <Link
                href="/insights"
                className="group inline-flex items-center gap-3 pb-2 text-[0.8125rem] uppercase tracking-[0.16em] text-ink"
              >
                <span className="link-underline">All articles</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-x-6 gap-y-12 md:grid-cols-3">
            {recentInsights.map((post, i) => (
              <Reveal key={post.slug} delay={i * 90}>
                <Link href={`/insights/${post.slug}`} data-cursor="Read" className="group block">
                  <div className="relative overflow-hidden rounded-[1.5rem]">
                    <Media
                      src={post.image}
                      alt={post.title}
                      label="Article image"
                      className="aspect-[4/3] w-full"
                      imageClassName="transition-transform duration-[1.2s] group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <span className="glass absolute left-4 top-4 rounded-full px-3 py-1.5 text-[0.625rem] uppercase tracking-[0.16em] text-ink">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="mt-6 flex items-start justify-between gap-4 font-display text-[1.5rem] leading-snug text-ink">
                    {post.title}
                    <ArrowUpRight
                      className="mt-1.5 size-5 shrink-0 text-gold-deep transition-transform duration-500 group-hover:rotate-45"
                      strokeWidth={1.25}
                    />
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{post.excerpt}</p>
                  <p className="mt-4 text-[0.75rem] text-muted/80">
                    {formatDate(post.date)} · {post.readMinutes} min read
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      */}

      <CtaBand />
    </>
  );
}
