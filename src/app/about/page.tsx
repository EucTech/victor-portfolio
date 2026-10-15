import { Container } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { processSteps, values } from "@/data/services";
import { pageMeta, JsonLd, breadcrumbSchema } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata = pageMeta({
  title: "About Victor Chiemerie, Realtor in Kigali",
  description:
    "Victor Chiemerie is a Kigali-based realtor focused on clarity, honest advice and long-term relationships. Learn his story, his approach and how he works with clients.",
  path: "/about",
});

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Realtor",
  description: site.description,
  url: `${site.url}/about`,
  telephone: site.phone,
  email: site.email,
  worksFor: { "@type": "RealEstateAgent", name: site.name },
  address: { "@type": "PostalAddress", addressLocality: "Kigali", addressCountry: "RW" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Helping People Make Better Property Decisions"
        intro="I believe the best real estate advice begins with understanding people before properties."
      />

      {/* My Story */}
      <section className="py-24 md:py-32">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <Media
                src={site.portrait}
                alt="Victor Chiemerie, realtor in Kigali"
                label="Professional portrait"
                imageClassName="object-[50%_25%]"
                className="aspect-[4/5] w-full rounded-[2rem] lg:sticky lg:top-32"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </Reveal>

            <div className="lg:col-span-7">
              <Reveal>
                <h2 className="font-display text-[2rem] leading-[1.15] text-ink md:text-[2.5rem]">
                  Understanding people before properties
                </h2>
                <div className="mt-8 space-y-5 text-[0.9375rem] leading-relaxed text-muted">
                  <p>
                    My journey into real estate has been driven by a passion for
                    helping individuals and families make confident decisions that
                    align with their goals. Along the way, I&apos;ve had the privilege
                    of working with clients from different backgrounds, each with
                    unique needs and aspirations.
                  </p>
                  <p>
                    Today, I continue to focus on creating a professional,
                    transparent, and personalized experience for every client,
                    combining local market knowledge with a genuine commitment to
                    long-term relationships.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={100} className="mt-16">
                <h3 className="font-display text-[1.75rem] leading-snug text-ink">
                  Buying or selling property shouldn&apos;t feel overwhelming
                </h3>
                <div className="mt-6 space-y-5 text-[0.9375rem] leading-relaxed text-muted">
                  <p>
                    My role is to provide clarity, answer difficult questions
                    honestly, and help clients navigate every step of the process with
                    confidence.
                  </p>
                  <p className="border-l-2 border-gold pl-6 text-ink">
                    I believe trust is earned through preparation, communication, and
                    consistency, not promises.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={140} className="mt-16">
                <h3 className="mb-6 font-display text-[1.75rem] leading-snug text-ink">My values</h3>
                <ul className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line xs:grid-cols-2 sm:grid-cols-2">
                  {values.map((v) => (
                    <li
                      key={v}
                      className="bg-white px-6 py-5 font-display text-lg text-ink"
                    >
                      {v}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* How I work */}
      <section className="border-t border-line bg-cream py-24 md:py-32">
        <Container size="wide">
          <Reveal>
            <SectionHeading
              title="How I work"
              intro="Seven steps, applied consistently, from the first conversation to long after the keys change hands."
            />
          </Reveal>

          <ol className="mt-16 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 60} className="bg-line">
                <li className="h-full bg-white p-8">
                  <span className="font-display text-3xl text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-display text-lg leading-snug text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">
                    {step.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand title="Let's start with a conversation" />
      <JsonLd data={personSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
    </>
  );
}
