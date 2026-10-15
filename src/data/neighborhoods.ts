/**
 * NEIGHBORHOOD GUIDES
 * ------------------------------------------------------------------
 * These pages are the strongest SEO asset on the site — people search
 * "houses in Nyarutarama" far more than they search for an agent's name.
 * The descriptions below are DRAFTS. Rewrite them in Victor's own words
 * with specifics only a local would know.
 */
export interface Neighborhood {
  slug: string;
  name: string;
  tagline: string;
  intro: string[];
  bestFor: string[];
  priceGuide: string;
  image: string; // "" renders a placeholder
}

export const neighborhoods: Neighborhood[] = [
  {
    slug: "nyarutarama",
    name: "Nyarutarama",
    tagline: "Kigali's established address",
    intro: [
      "DRAFT: Nyarutarama is where much of Kigali's diplomatic and senior professional community lives. Wide streets, mature gardens and proximity to the golf course have kept it desirable for two decades.",
      "Housing is dominated by four- and five-bedroom family homes on generous plots, with a steady rental market driven by embassies and international organisations.",
    ],
    bestFor: ["Families", "Diplomatic tenants", "Long-term capital preservation"],
    priceGuide: "DRAFT: Family homes typically from $450,000; rentals from $2,000/month.",
    image: "",
  },
  {
    slug: "kacyiru",
    name: "Kacyiru",
    tagline: "Walk to work",
    intro: [
      "DRAFT: Kacyiru holds much of the government and institutional sector, which makes it one of the few Kigali neighborhoods where people genuinely walk to work.",
      "Apartment stock has grown considerably, appealing to professionals who want to avoid a commute and investors targeting corporate tenants.",
    ],
    bestFor: ["Professionals", "Apartment investors", "Short-let income"],
    priceGuide: "DRAFT: Apartments typically from $200,000; rentals from $1,200/month.",
    image: "",
  },
  {
    slug: "kibagabaga",
    name: "Kibagabaga",
    tagline: "Settled and practical",
    intro: [
      "DRAFT: Kibagabaga offers more house for the money than the premium neighborhoods, without feeling remote. It is a settled residential area with established neighbors and good local amenities.",
      "Popular with Rwandan families and first-time buyers who want a garden and space to grow.",
    ],
    bestFor: ["First-time buyers", "Growing families", "Value per square metre"],
    priceGuide: "DRAFT: Family homes typically from $250,000.",
    image: "",
  },
  {
    slug: "gacuriro",
    name: "Gacuriro",
    tagline: "Estate living",
    intro: [
      "DRAFT: Gacuriro is defined by planned estates with shared amenities (security, maintenance, pools and play areas), which suits relocating families who want to arrive and settle quickly.",
      "The estate model also appeals to owners who want a property that is straightforward to let and maintain.",
    ],
    bestFor: ["Relocating families", "Furnished rentals", "Low-maintenance ownership"],
    priceGuide: "DRAFT: Townhouses typically from $220,000; rentals from $1,500/month.",
    image: "",
  },
];

export function getNeighborhood(slug: string) {
  return neighborhoods.find((n) => n.slug === slug);
}
