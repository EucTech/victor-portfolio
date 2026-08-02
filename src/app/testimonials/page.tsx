import { Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { testimonials } from "@/data/testimonials";
import { pageMeta, JsonLd, breadcrumbSchema } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Client Testimonials",
  description:
    "What clients say about working with Victor Chiemerie — buyers, sellers and investors in Kigali, Rwanda.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  const videos = testimonials.filter((t) => t.videoUrl);

  return (
    <>
      <PageHero
        label="Client experiences"
        title="In Their Words"
        intro="The clearest measure of how I work is what clients say afterwards."
      />

      {videos.length ? (
        <section className="py-20">
          <Container size="wide">
            <div className="grid gap-8 md:grid-cols-2">
              {videos.map((t, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="aspect-video w-full">
                    <iframe
                      src={t.videoUrl}
                      title={`Testimonial from ${t.name}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="size-full border border-line"
                    />
                  </div>
                  <p className="mt-4 text-sm font-medium text-ink">{t.name}</p>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="py-24 md:py-32">
        <Container size="wide">
          <div className="columns-1 gap-8 md:columns-2 lg:columns-3">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={(i % 3) * 70} className="mb-8 break-inside-avoid">
                <figure className="border border-line p-8">
                  <Quote className="size-5 text-gold" strokeWidth={1.25} />
                  <blockquote className="mt-5 text-[0.9375rem] leading-relaxed text-ink-soft">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-6 border-t border-line pt-5">
                    <p className="text-sm font-medium text-ink">{t.name}</p>
                    {t.context ? (
                      <p className="mt-0.5 text-[0.75rem] uppercase tracking-[0.12em] text-muted">
                        {t.context}
                      </p>
                    ) : null}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand title="Let's add your story to this page" />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Testimonials", path: "/testimonials" },
        ])}
      />
    </>
  );
}
