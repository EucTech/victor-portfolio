import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { faqs } from "@/data/faqs";
import { pageMeta, JsonLd, breadcrumbSchema } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Frequently Asked Questions: Buying Property in Rwanda",
  description:
    "Answers to common questions about buying and selling property in Rwanda, foreign ownership, legal documentation, investment and property financing.",
  path: "/faqs",
});

/** FAQPage schema — this is what produces rich results in Google. */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  ),
};

export default function FaqsPage() {
  return (
    <>
      <PageHero
        title="Questions, Answered Plainly"
        intro="The questions clients ask most often. If yours isn't here, ask me directly. I'd rather answer it properly than have you guess."
      />

      <section className="py-24 md:py-32">
        <Container>
          <div className="space-y-20">
            {faqs.map((group, gi) => (
              <Reveal key={group.category} delay={gi * 60}>
                <div className="grid gap-8 md:grid-cols-12 md:gap-12">
                  <div className="md:col-span-4">
                    <h2 className="font-display text-2xl leading-snug text-ink md:sticky md:top-32">
                      {group.category}
                    </h2>
                  </div>
                  <div className="md:col-span-8">
                    <Accordion type="single" collapsible className="border-t border-line">
                      {group.items.map((item, i) => (
                        <AccordionItem key={i} value={`${gi}-${i}`}>
                          <AccordionTrigger>{item.q}</AccordionTrigger>
                          <AccordionContent>{item.a}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Still have a question?"
        text="Ask me directly. No obligation, and no sales pressure, just a straight answer."
      />
      <JsonLd data={faqSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "FAQs", path: "/faqs" },
        ])}
      />
    </>
  );
}
