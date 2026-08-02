import { Container } from "./ui/container";
import { Media } from "./ui/media";

/** Standard hero used on every inner page. */
export function PageHero({
  label,
  title,
  intro,
  image,
}: {
  label: string;
  title: string;
  intro?: string;
  image?: string;
}) {
  return (
    <section className="relative">
      <Media
        src={image}
        alt={title}
        dark
        label="Header image"
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-0 bg-ink/70" />
      <Container size="wide">
        <div className="relative flex min-h-[42vh] flex-col justify-end pb-12 pt-32 sm:pt-36 md:min-h-[54vh] md:pb-20 md:pt-40">
          <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-gold">
            {label}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-[2rem] leading-[1.1] text-white sm:text-[2.5rem] md:text-[4rem]">
            {title}
          </h1>
          {intro ? (
            <p className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-white/70">
              {intro}
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
