/**
 * Global site configuration.
 * Edit this file to change contact details, social links and SEO defaults.
 */
export const site = {
  name: "Victor Chiemerie",
  role: "Realtor in Kigali, Rwanda",
  tagline: "Helping You Make Confident Property Decisions in Rwanda",
  description:
    "Victor Chiemerie is a Kigali-based realtor helping buyers, sellers and investors make confident property decisions in Rwanda with honest advice and local market expertise.",

  // TODO: replace with the live domain once purchased
  url: "https://victorchiemerie.com",

  phone: "+250795026599",
  phoneDisplay: "+250 795 026 599",
  whatsapp: "250795026599", // digits only, no + — used in wa.me links
  email: "victorchiemerie012@gmail.com",

  // Professional portrait used on the home, about and contact pages
  portrait: "/images/victor/portrait.jpg",

  // TODO: add the office street address for the contact page + Google Map
  address: {
    line1: "",
    city: "Kigali",
    country: "Rwanda",
  },

  // Social profiles, shown in the footer, the menu and on the contact page
  socials: {
    instagram: "https://www.instagram.com/victr_chiemerie",
    tiktok: "https://www.tiktok.com/@victor_chiemerie1",
    linkedin: "https://www.linkedin.com/in/victor710",
    youtube: "https://www.youtube.com/channel/UCTHx5pLWCZL4tXi_sDadadg",
  },

  brandStatement:
    "Helping people make informed property decisions through trusted advice, local expertise, and a commitment to lasting relationships.",
} as const;

/** Every page, in order. Used by the footer and the mobile menu. */
export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Properties", href: "/properties" },
  // { label: "Neighborhoods", href: "/neighborhoods" }, // hidden for now
  { label: "Services", href: "/services" },
  // { label: "Insights", href: "/insights" }, // hidden for now
  // { label: "Testimonials", href: "/testimonials" }, // hidden until real client quotes exist
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Desktop header pill. Testimonials, FAQs and Contact live in the footer
 * and the full screen menu so the bar stays uncluttered.
 */
export const primaryNav = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  // { label: "Neighborhoods", href: "/neighborhoods" }, // hidden for now
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  // { label: "Insights", href: "/insights" }, // hidden for now
] as const;

export const whatsappLink = (message = "Hello Victor, I'd like to talk about a property.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
