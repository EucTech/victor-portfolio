"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function NewsletterForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    // TODO: connect a newsletter provider (Brevo, Mailchimp, Resend audiences).
    await new Promise((r) => setTimeout(r, 600));
    setState("done");
    setEmail("");
  }

  if (state === "done") {
    return (
      <p className={cn("text-sm text-gold", className)}>
        Thank you — you&apos;re on the list.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("flex items-center gap-0", className)}>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className="h-11 w-full min-w-0 border border-white/20 bg-transparent px-4 text-sm text-white placeholder:text-white/35 focus:border-gold focus:outline-none"
      />
      <button
        type="submit"
        disabled={state === "sending"}
        aria-label="Subscribe"
        className="flex h-11 w-12 shrink-0 items-center justify-center border border-l-0 border-white/20 text-white transition-colors hover:border-gold hover:bg-gold hover:text-ink disabled:opacity-50"
      >
        <ArrowRight className="size-4" strokeWidth={1.5} />
      </button>
    </form>
  );
}
