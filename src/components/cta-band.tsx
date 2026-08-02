import { site, whatsappLink } from "@/data/site";
import { Container } from "./ui/container";
import { ButtonLink } from "./ui/button";
import { Reveal } from "./ui/reveal";

export function CtaBand({
  title = "Let's Talk About Your Next Move",
  text = "Whether you're ready to buy, sell, or simply explore your options, I'd be happy to help you take the next step.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-ink py-24 text-white md:py-32">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[0.6875rem] uppercase tracking-[0.18em] text-gold">
            Get started
          </p>
          <h2 className="mt-5 font-display text-[1.875rem] leading-[1.12] sm:text-[2.25rem] md:text-[3.25rem]">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-white/60">
            {text}
          </p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <ButtonLink href="/contact" variant="gold">
              Contact Me
            </ButtonLink>
            <ButtonLink href={whatsappLink()} external variant="ghostLight">
              WhatsApp Victor
            </ButtonLink>
          </div>
          <p className="mt-8 text-[0.8125rem] text-white/40">
            <a href={`tel:${site.phone}`} className="transition-colors hover:text-gold">
              {site.phoneDisplay}
            </a>
            <span className="mx-3 text-white/20">|</span>
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-gold">
              {site.email}
            </a>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
