"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const interests = [
  "Buying a property",
  "Selling a property",
  "Renting",
  "Investment guidance",
  "Something else",
];

const fieldClass =
  "h-12 w-full border border-line bg-white px-4 text-[0.9375rem] text-ink placeholder:text-muted/70 transition-colors focus:border-ink focus:outline-none";

export function ContactForm({
  className,
  propertyName,
}: {
  className?: string;
  propertyName?: string;
}) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setState("done");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className={cn("border border-line bg-cream p-10 text-center", className)}>
        <p className="font-display text-2xl text-ink">Thank you for reaching out.</p>
        <p className="mt-3 text-[0.9375rem] text-muted">
          I&apos;ll be in touch shortly. For anything urgent, WhatsApp is fastest.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("space-y-4", className)}>
      {propertyName ? (
        <input type="hidden" name="property" value={propertyName} />
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="sr-only">
            Full name
          </label>
          <input
            id="name"
            name="name"
            required
            placeholder="Full name *"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Email *"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="sr-only">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Phone"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="interest" className="sr-only">
            I&apos;m interested in
          </label>
          <select
            id="interest"
            name="interest"
            defaultValue=""
            className={cn(fieldClass, "appearance-none bg-white")}
          >
            <option value="" disabled>
              I&apos;m interested in…
            </option>
            {interests.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="How can I help?"
          className="w-full border border-line bg-white px-4 py-3.5 text-[0.9375rem] text-ink placeholder:text-muted/70 transition-colors focus:border-ink focus:outline-none"
        />
      </div>

      <label className="flex items-start gap-3 text-[0.8125rem] leading-relaxed text-muted">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 size-4 shrink-0 accent-[#0a0a0a]"
        />
        <span>
          I agree to be contacted by Victor Chiemerie by phone, email or WhatsApp
          regarding my enquiry. Your details are never sold or shared.
        </span>
      </label>

      {state === "error" ? (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again, or reach me directly on WhatsApp.
        </p>
      ) : null}

      <Button type="submit" disabled={state === "sending"} className="w-full sm:w-auto">
        {state === "sending" ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
