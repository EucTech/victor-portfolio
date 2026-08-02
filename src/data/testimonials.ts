/**
 * CLIENT TESTIMONIALS
 * ------------------------------------------------------------------
 * PLACEHOLDER CONTENT — replace every entry below with real client
 * quotes before the site goes live. Never publish invented reviews.
 *
 * For video testimonials, set `videoUrl` to a YouTube embed URL.
 */
export interface Testimonial {
  quote: string;
  name: string;
  context?: string;   // e.g. "First-time buyer, Kibagabaga"
  videoUrl?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "PLACEHOLDER — replace with a real client quote. Victor was clear about what each property was worth and what it was not. That honesty saved us from a decision we would have regretted.",
    name: "Client name",
    context: "Buyer, Kigali",
  },
  {
    quote:
      "PLACEHOLDER — replace with a real client quote. We were buying from abroad and needed someone we could trust on the ground. Every question was answered properly, not just quickly.",
    name: "Client name",
    context: "Diaspora buyer",
  },
  {
    quote:
      "PLACEHOLDER — replace with a real client quote. He priced our house correctly from the start, and it was under offer within weeks. The process felt organised throughout.",
    name: "Client name",
    context: "Seller, Nyarutarama",
  },
  {
    quote:
      "PLACEHOLDER — replace with a real client quote. What stood out was the follow-through after closing. He stayed available long after the transaction ended.",
    name: "Client name",
    context: "Investor",
  },
];
