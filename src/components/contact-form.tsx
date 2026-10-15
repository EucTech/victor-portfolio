"use client";

import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { site } from "@/data/site";
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
  "h-13 w-full rounded-2xl border border-line bg-white px-5 text-[0.9375rem] text-ink placeholder:text-muted/70 transition-colors hover:border-ink/30 focus:border-ink focus:outline-none";

export function ContactForm({
  className,
  propertyName,
}: {
  className?: string;
  propertyName?: string;
}) {
  // The form opens the visitor's own email app with everything filled in,
  // addressed to Victor. No email service or server is involved.
  const [mailto, setMailto] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const subject = propertyName
      ? `Enquiry about ${propertyName}`
      : `Website enquiry${get("interest") ? `: ${get("interest")}` : ""}`;

    const body = [
      `Hello Victor,`,
      ``,
      get("message") || "I'd like to talk to you about a property.",
      ``,
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      get("phone") ? `Phone: ${get("phone")}` : "",
      get("interest") ? `Interested in: ${get("interest")}` : "",
      propertyName ? `Property: ${propertyName}` : "",
    ]
      .filter((line, i, all) => line !== "" || all[i - 1] !== "")
      .join("\n")
      .trim();

    const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setMailto(href);
    window.location.href = href;
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the address is visible to copy by hand.
    }
  }

  if (mailto) {
    return (
      <div className={cn("rounded-[1.75rem] bg-stone p-8 md:p-10", className)}>
        <p className="font-display text-[1.75rem] leading-tight text-ink">
          Your email is ready to send
        </p>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
          Your email app should have opened with your message to Victor. Press send
          there and he&apos;ll reply within one business day.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={mailto}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[0.8125rem] text-white transition-colors hover:bg-ink-soft"
          >
            <Mail className="size-4" strokeWidth={1.5} />
            Open it again
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-3 text-[0.8125rem] text-ink transition-colors hover:border-ink"
          >
            {copied ? (
              <Check className="size-4" strokeWidth={1.5} />
            ) : (
              <Copy className="size-4" strokeWidth={1.5} />
            )}
            {copied ? "Copied" : "Copy email address"}
          </button>
        </div>
        <p className="mt-5 text-[0.8125rem] text-muted">
          Nothing opened? Write to{" "}
          <a href={`mailto:${site.email}`} className="text-ink underline underline-offset-4">
            {site.email}
          </a>{" "}
          from any email account.
        </p>
        <button
          type="button"
          onClick={() => setMailto(null)}
          className="mt-6 text-[0.8125rem] text-ink underline underline-offset-4"
        >
          Back to the form
        </button>
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
          className="w-full rounded-2xl border border-line bg-white px-5 py-4 text-[0.9375rem] text-ink placeholder:text-muted/70 transition-colors focus:border-ink focus:outline-none"
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


      <Button type="submit" className="w-full sm:w-auto">
        <Mail className="size-4" strokeWidth={1.5} />
        Send by email
      </Button>
    </form>
  );
}
