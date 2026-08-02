import { cn } from "@/lib/utils";

export function SectionHeading({
  label,
  title,
  intro,
  align = "left",
  className,
}: {
  label?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {label ? <p className="label mb-4">{label}</p> : null}
      <h2 className="font-display text-[1.75rem] leading-[1.18] tracking-tight text-ink sm:text-[2rem] md:text-[2.75rem]">
        {title}
      </h2>
      <div
        className={cn("mt-6 h-px w-12 bg-gold", align === "center" && "mx-auto")}
      />
      {intro ? (
        <p className="mt-6 text-[0.975rem] leading-relaxed text-muted">{intro}</p>
      ) : null}
    </div>
  );
}
