import { ArrowUpRight } from "lucide-react";
import { site, whatsappLink } from "@/data/site";
import { Container } from "./ui/container";
import { ButtonLink } from "./ui/button";
import { Reveal } from "./ui/reveal";
import { SplitText } from "./motion/split-text";
import { Magnetic } from "./motion/magnetic";

export function CtaBand({
  title = "Let's Talk About Your Next Move",
  text = "Whether you're ready to buy, sell, or simply explore your options, I'd be happy to help you take the next step.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="py-16 md:py-24">
      <Container size="wide">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-20 text-white md:rounded-[2.5rem] md:px-16 md:py-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(192,160,98,0.22),transparent_65%)]"
          />
          <div className="relative grid gap-12 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <SplitText
                as="h2"
                text={title}
                stagger={0.05}
                className="font-display text-[2.25rem] leading-[1.04] sm:text-[2.75rem] md:text-[4rem]"
              />
              <Reveal delay={200}>
                <p className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-white/60">{text}</p>
                <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.8125rem] text-white/45">
                  <a href={`tel:${site.phone}`} className="transition-colors hover:text-gold">
                    {site.phoneDisplay}
                  </a>
                  <a href={`mailto:${site.email}`} className="transition-colors hover:text-gold">
                    {site.email}
                  </a>
                </p>
              </Reveal>
            </div>
            <Reveal delay={250} className="flex flex-wrap items-center gap-4 md:col-span-4 md:justify-end">
              <Magnetic>
                <ButtonLink href="/contact" variant="gold" size="lg" data-cursor="Talk">
                  Contact Me
                  <ArrowUpRight className="size-4" strokeWidth={1.5} />
                </ButtonLink>
              </Magnetic>
              <ButtonLink href={whatsappLink()} external variant="ghostLight" size="lg">
                WhatsApp
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
