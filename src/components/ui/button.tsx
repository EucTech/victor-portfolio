import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-[0.75rem] font-medium uppercase tracking-[0.16em] transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep",
  {
    variants: {
      variant: {
        primary: "bg-ink text-white hover:bg-ink-soft",
        outline: "border border-ink text-ink hover:bg-ink hover:text-white",
        ghostLight:
          "border border-white/60 text-white hover:bg-white hover:text-ink",
        gold: "bg-gold text-ink hover:bg-gold-deep hover:text-white",
        quiet: "text-ink hover:text-gold-deep",
      },
      size: {
        sm: "h-10 px-5",
        md: "h-12 px-8",
        lg: "h-14 px-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type BaseProps = VariantProps<typeof buttonVariants> & { className?: string };

export function Button({
  className,
  variant,
  size,
  ...props
}: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

export function ButtonLink({
  className,
  variant,
  size,
  href,
  external,
  ...props
}: BaseProps &
  Omit<React.ComponentProps<typeof Link>, "href"> & {
    href: string;
    external?: boolean;
  }) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }
  return <Link href={href} className={classes} {...props} />;
}

export { buttonVariants };
