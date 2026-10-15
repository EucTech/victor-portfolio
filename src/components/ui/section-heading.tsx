import { cn } from "@/lib/utils";
import { SplitText } from "../motion/split-text";
import { Reveal } from "./reveal";

export function SectionHeading({
  title,
  intro,
  align = "left",
  className,
}: {
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <SplitText
        as="h2"
        text={title}
        stagger={0.04}
        className="font-display text-[2rem] leading-[1.08] tracking-[-0.01em] text-ink sm:text-[2.375rem] md:text-[3.25rem]"
      />
      {intro ? (
        <Reveal delay={200}>
          <p className="mt-6 text-[0.975rem] leading-relaxed text-muted">{intro}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
