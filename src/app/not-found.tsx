import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center py-40">
      <Container size="narrow">
        <div className="text-center">
          <p className="label">404</p>
          <h1 className="mt-5 font-display text-[2rem] leading-tight text-ink sm:text-[2.5rem] md:text-[3.5rem]">
            This page doesn&apos;t exist
          </h1>
          <p className="mx-auto mt-6 max-w-md text-[0.9375rem] leading-relaxed text-muted">
            The page may have moved, or the property may no longer be available.
          </p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:gap-4">
            <ButtonLink href="/">Back to Home</ButtonLink>
            <ButtonLink href="/properties" variant="outline">
              Browse Properties
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
