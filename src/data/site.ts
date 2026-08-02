/**
 * Global site configuration.
 * Edit this file to change contact details, social links and SEO defaults.
 */
export const site = {
  name: "Victor Chiemerie",
  role: "Realtor — Kigali, Rwanda",
  tagline: "Helping You Make Confident Property Decisions in Rwanda",
  description:
    "Victor Chiemerie is a Kigali-based realtor helping buyers, sellers and investors make confident property decisions in Rwanda with honest advice and local market expertise.",

  // TODO: replace with the live domain once purchased
  url: "https://victorchiemerie.com",

  phone: "+250795026599",
  phoneDisplay: "+250 795 026 599",
  whatsapp: "250795026599", // digits only, no + — used in wa.me links
  email: "victorchiemerie012@gmail.com",

  // TODO: add the office street address for the contact page + Google Map
  address: {
    line1: "",
    city: "Kigali",
    country: "Rwanda",
  },

  // TODO: replace the "#" placeholders with the real profile URLs.
  socials: {
    instagram: "#",
    youtube: "#",
  },

  brandStatement:
    "Helping people make informed property decisions through trusted advice, local expertise, and a commitment to lasting relationships.",
} as const;

/** Every page, in order. Used by the footer and the mobile menu. */
export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Properties", href: "/properties" },
  { label: "Neighborhoods", href: "/neighborhoods" },
  { label: "Services", href: "/services" },
  { label: "Insights", href: "/insights" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Desktop header links only — deliberately short.
 * Services, Insights, Testimonials and FAQs live in the footer and the
 * mobile menu so the top bar stays uncluttered.
 */
export const primaryNav = [
  { label: "About", href: "/about" },
  { label: "Properties", href: "/properties" },
  { label: "Neighborhoods", href: "/neighborhoods" },
] as const;

export const whatsappLink = (message = "Hello Victor, I'd like to talk about a property.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
