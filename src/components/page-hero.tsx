import { Container } from "./ui/container";
import { SplitText } from "./motion/split-text";
import { Reveal } from "./ui/reveal";
import { ParallaxImage } from "./motion/parallax-image";

/**
 * Standard hero used on every inner page: white canvas, oversized serif
 * title that rises word by word, and an optional photo below it.
 */
export function PageHero({
  title,
  intro,
  image,
}: {
  title: string;
  intro?: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden pt-36 md:pt-44">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(192,160,98,0.14),transparent_65%)]"
      />
      <Container size="wide">
        <div className="relative grid gap-10 pb-14 md:grid-cols-12 md:pb-20">
          <div className="md:col-span-8">
            <SplitText
              as="h1"
              text={title}
              onView={false}
              delay={0.1}
              className="font-display text-[2.5rem] leading-[1.02] tracking-[-0.01em] text-ink sm:text-[3.25rem] md:text-[4.75rem]"
            />
          </div>
          {intro ? (
            <Reveal delay={350} className="self-end md:col-span-4">
              <p className="text-[0.9875rem] leading-relaxed text-muted">{intro}</p>
            </Reveal>
          ) : null}
        </div>
      </Container>
      {image ? (
        <Container size="wide">
          <ParallaxImage
            src={image}
            alt={title}
            priority
            className="aspect-[16/9] w-full rounded-[1.75rem] md:aspect-[21/9]"
          />
        </Container>
      ) : (
        <Container size="wide">
          <div className="h-px w-full bg-line" />
        </Container>
      )}
    </section>
  );
}
