/**
 * PROPERTY LISTINGS
 * ------------------------------------------------------------------
 * To add a listing: copy a block, change the values, give it a unique
 * `slug`. Put photos in /public/images/properties/ and reference them
 * as "/images/properties/your-file.jpg".
 *
 * Leave `images` empty and an elegant placeholder renders instead —
 * nothing breaks.
 */

export type PropertyStatus = "For Sale" | "For Rent" | "Under Offer" | "Sold";
export type PropertyType = "House" | "Apartment" | "Villa" | "Land" | "Commercial";

export interface Property {
  slug: string;
  name: string;
  location: string;          // neighborhood, e.g. "Nyarutarama"
  city: string;
  price: number;
  currency: "USD" | "RWF";
  priceQualifier?: string;   // e.g. "Starting from", "per month"
  status: PropertyStatus;
  type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  sizeSqm?: number;
  plotSqm?: number;
  featured: boolean;
  shortDescription: string;
  description: string[];     // one string per paragraph
  features: string[];
  nearby: string[];
  investmentHighlights?: string[];
  images: string[];          // first image is the cover
  floorPlans?: string[];
  videoUrl?: string;         // YouTube embed URL
  brochureUrl?: string;      // e.g. "/brochures/name.pdf"
}

export const properties: Property[] = [
  {
    slug: "nyarutarama-hillside-villa",
    name: "Hillside Villa",
    location: "Nyarutarama",
    city: "Kigali",
    price: 685000,
    currency: "USD",
    status: "For Sale",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 5,
    sizeSqm: 480,
    plotSqm: 1200,
    featured: true,
    shortDescription:
      "A five-bedroom villa on a quiet ridge in Nyarutarama, with terraced gardens and long views across the valley.",
    description: [
      "Set on a mature 1,200 sqm plot, this villa balances generous entertaining space with the privacy of a walled garden. Reception rooms open onto a covered terrace that runs the length of the house.",
      "The upper floor holds four bedroom suites, each with built-in storage and en-suite bathrooms. A separate ground-floor suite works well as a guest room or home office.",
      "Staff quarters, a double garage and a standby generator complete the property.",
    ],
    features: [
      "Walled and gated compound",
      "Covered entertaining terrace",
      "Fitted kitchen with pantry",
      "Standby generator",
      "Borehole and water storage",
      "Double garage",
      "Staff quarters",
      "Landscaped garden",
    ],
    nearby: [
      "Kigali Golf Club — 5 min",
      "International schools — 10 min",
      "Kigali Heights — 12 min",
      "Kigali International Airport — 20 min",
    ],
    investmentHighlights: [
      "Established diplomatic and expatriate rental corridor",
      "Consistent demand for four- and five-bedroom family homes",
      "Low vacancy relative to newer developments",
    ],
    images: [], // TODO: add photos
  },
  {
    slug: "kacyiru-skyline-apartment",
    name: "Skyline Residence",
    location: "Kacyiru",
    city: "Kigali",
    price: 245000,
    currency: "USD",
    priceQualifier: "Starting from",
    status: "For Sale",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    sizeSqm: 145,
    featured: true,
    shortDescription:
      "Three-bedroom apartments in a managed building minutes from the city's main business district.",
    description: [
      "A limited release of three-bedroom apartments in a well-managed building, walking distance from Kacyiru's government and business district.",
      "Each unit has an open-plan living and dining area, a fitted kitchen and a private balcony. The building offers secure parking, a backup generator and full-time security.",
    ],
    features: [
      "Private balcony",
      "Fitted kitchen",
      "Secure underground parking",
      "24-hour security",
      "Backup generator",
      "Lift access",
      "Shared rooftop terrace",
    ],
    nearby: [
      "Kigali Convention Centre — 8 min",
      "Embassies and government offices — 5 min",
      "Supermarkets and pharmacies — walking distance",
    ],
    investmentHighlights: [
      "Strong short-let and corporate rental demand",
      "Managed building reduces owner overhead",
      "Walk-to-work location for the diplomatic sector",
    ],
    images: [],
  },
  {
    slug: "kibagabaga-family-home",
    name: "Garden Family Home",
    location: "Kibagabaga",
    city: "Kigali",
    price: 320000,
    currency: "USD",
    status: "For Sale",
    type: "House",
    bedrooms: 4,
    bathrooms: 3,
    sizeSqm: 260,
    plotSqm: 700,
    featured: true,
    shortDescription:
      "A four-bedroom home on a level garden plot in a settled residential neighborhood.",
    description: [
      "A practical, well-built family house on a level 700 sqm plot. The layout keeps living areas on the ground floor and bedrooms above, with a garden that is genuinely usable rather than ornamental.",
      "The neighborhood is settled and quiet, with good tarmac access and established neighbors.",
    ],
    features: [
      "Level garden plot",
      "Separate dining room",
      "Fitted kitchen",
      "Water storage tanks",
      "Carport for two vehicles",
      "Boundary wall with gate",
    ],
    nearby: [
      "Kibagabaga Hospital — 6 min",
      "Local markets — 5 min",
      "Primary and secondary schools — 10 min",
    ],
    images: [],
  },
  {
    slug: "gacuriro-modern-townhouse",
    name: "Modern Townhouse",
    location: "Gacuriro",
    city: "Kigali",
    price: 1800,
    currency: "USD",
    priceQualifier: "per month",
    status: "For Rent",
    type: "House",
    bedrooms: 3,
    bathrooms: 3,
    sizeSqm: 180,
    featured: true,
    shortDescription:
      "A furnished three-bedroom townhouse in a gated estate with shared gardens and a pool.",
    description: [
      "Available furnished or unfurnished, this townhouse sits within a gated estate offering shared gardens, a swimming pool and a children's play area.",
      "Well suited to relocating families and professionals on assignment in Kigali.",
    ],
    features: [
      "Gated estate with shared pool",
      "Furnished or unfurnished",
      "Fibre internet ready",
      "Estate security and maintenance",
      "Allocated parking",
    ],
    nearby: [
      "Vision City — 5 min",
      "International schools — 12 min",
      "City centre — 15 min",
    ],
    images: [],
  },
  {
    slug: "kanombe-investment-plot",
    name: "Development Plot",
    location: "Kanombe",
    city: "Kigali",
    price: 95000,
    currency: "USD",
    status: "For Sale",
    type: "Land",
    bedrooms: 0,
    bathrooms: 0,
    plotSqm: 1500,
    featured: false,
    shortDescription:
      "A 1,500 sqm titled plot with road frontage, suitable for residential development.",
    description: [
      "A clean, titled 1,500 sqm plot with direct road frontage and utilities at the boundary. Zoned for residential development.",
      "Suited to a buyer building a family home or a small residential scheme.",
    ],
    features: [
      "Freehold title deed",
      "Road frontage",
      "Electricity and water at boundary",
      "Level to gently sloping",
    ],
    nearby: [
      "Kigali International Airport — 8 min",
      "Main tarmac road — 2 min",
    ],
    investmentHighlights: [
      "Airport-corridor location with steady infrastructure investment",
      "Clean title, ready for immediate transfer",
    ],
    images: [],
  },
  {
    slug: "remera-commercial-space",
    name: "Commercial Floor",
    location: "Remera",
    city: "Kigali",
    price: 4500,
    currency: "USD",
    priceQualifier: "per month",
    status: "Under Offer",
    type: "Commercial",
    bedrooms: 0,
    bathrooms: 2,
    sizeSqm: 320,
    featured: false,
    shortDescription:
      "An open-plan commercial floor on a busy Remera junction, fitted and ready for occupation.",
    description: [
      "A 320 sqm open-plan floor suitable for offices, a clinic or a showroom, on a high-visibility junction in Remera.",
      "Fitted with partitioning that can be retained or removed to suit the incoming tenant.",
    ],
    features: [
      "Open-plan with flexible partitioning",
      "Dedicated parking",
      "Backup power",
      "Two washrooms",
      "High street visibility",
    ],
    nearby: ["Amahoro Stadium — 5 min", "Airport road — 3 min"],
    images: [],
  },
];

export const featuredProperties = properties.filter((p) => p.featured).slice(0, 6);

export function getProperty(slug: string) {
  return properties.find((p) => p.slug === slug);
}

/** Unique values used to build the filter dropdowns */
export const propertyFilters = {
  locations: [...new Set(properties.map((p) => p.location))].sort(),
  types: [...new Set(properties.map((p) => p.type))].sort(),
  statuses: [...new Set(properties.map((p) => p.status))],
};
