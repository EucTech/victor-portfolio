/**
 * PROPERTY LISTINGS
 * ------------------------------------------------------------------
 * To add a listing: copy a block, change the values, give it a unique
 * `slug`. Put photos in /public/images/properties/<slug>/ and reference
 * them as "/images/properties/<slug>/01.jpg". The first image is the cover.
 *
 * Leave `images` empty and a branded placeholder renders instead.
 *
 * DRAFT: the two listings below have real photos and prices. Bedroom and
 * bathroom counts, sizes, features and descriptions were written from the
 * photos and must be confirmed by Victor before launch. A count of 0 hides
 * that field on the site.
 */

export type PropertyStatus = "For Sale" | "For Rent" | "Under Offer" | "Sold";
export type PropertyType = "House" | "Apartment" | "Villa" | "Land" | "Commercial";

export interface PropertyImage {
  src: string;
  alt: string;
}

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
  bedrooms: number;          // 0 hides it
  bathrooms: number;         // 0 hides it
  sizeSqm?: number;
  plotSqm?: number;
  featured: boolean;
  headline: string;          // one short line used on large showcase panels
  shortDescription: string;
  description: string[];     // one string per paragraph
  features: string[];
  nearby: string[];
  investmentHighlights?: string[];
  images: PropertyImage[];   // first image is the cover
  floorPlans?: string[];
  videoUrl?: string;         // YouTube embed URL
  brochureUrl?: string;      // e.g. "/brochures/name.pdf"
}

const villa = (n: number, alt: string): PropertyImage => ({
  src: `/images/properties/kiyovu-villa/${String(n).padStart(2, "0")}.jpg`,
  alt,
});

const flat = (n: number, alt: string): PropertyImage => ({
  src: `/images/properties/nyarutarama-furnished-2br/${String(n).padStart(2, "0")}.jpg`,
  alt,
});

export const properties: Property[] = [
  {
    slug: "kiyovu-villa",
    name: "The Kiyovu Villa",
    location: "Kiyovu",
    city: "Kigali",
    price: 2300000,
    currency: "USD",
    status: "For Sale",
    type: "Villa",
    bedrooms: 0, // TODO: confirm bedroom count
    bathrooms: 0, // TODO: confirm bathroom count
    featured: true,
    headline: "A private pool, a double height living room and the whole city below.",
    shortDescription:
      "A contemporary villa in Kiyovu with a private pool, a double height living room and a long covered terrace looking out over Kigali.",
    description: [
      "Set on one of Kigali's most established hills, this villa is arranged around a private pool and a terraced garden. The main living room rises a full two storeys, lit by a wall of clerestory glass, with an open steel staircase leading to the upper floor.",
      "A long covered terrace runs along the upper level and frames an uninterrupted view across the city. Inside, a separate lounge, a fitted kitchen with an island and several bedroom suites with warm timber floors complete the house.",
      "Kiyovu sits minutes from the city centre, embassies and the Kigali Convention Centre, which keeps demand for homes like this one consistently strong.",
    ],
    features: [
      "Private swimming pool",
      "Double height living room",
      "Covered terrace with city views",
      "Open plan kitchen with island",
      "Separate upper lounge",
      "Timber floors in living areas and bedrooms",
      "Landscaped, terraced garden",
      "Gated paved courtyard and parking",
    ],
    nearby: [
      "Kigali city centre, about 5 minutes",
      "Embassies and government offices, about 5 minutes",
      "Kigali Convention Centre, about 10 minutes",
      "Kigali International Airport, about 25 minutes",
    ],
    investmentHighlights: [
      "Kiyovu is one of the most established addresses in the city",
      "Steady diplomatic and executive rental demand",
      "Limited supply of contemporary villas with pools in the area",
    ],
    images: [
      villa(1, "Front of the Kiyovu villa with its paved courtyard"),
      villa(2, "Private pool with the villa behind it"),
      villa(3, "Double height living room with an open staircase"),
      villa(4, "Covered upper terrace looking out over Kigali"),
      villa(5, "Swimming pool and pool house"),
      villa(6, "Living room seen from the staircase"),
      villa(7, "Living area opening onto the garden"),
      villa(8, "View across Kigali from the garden"),
      villa(9, "Upper lounge with tall windows"),
      villa(10, "Main living room with dining area beyond"),
      villa(11, "Fitted kitchen with a central island"),
      villa(12, "Bedroom with timber floor and wardrobe"),
      villa(13, "Bedroom with built in wardrobes"),
      villa(14, "Guest washroom"),
      villa(15, "Paved courtyard and entrance"),
      villa(16, "Terraced garden"),
      villa(17, "Garden lawn and planting"),
    ],
  },
  {
    slug: "nyarutarama-furnished-two-bedroom",
    name: "Furnished Two Bedroom Residence",
    location: "Nyarutarama",
    city: "Kigali",
    price: 2500,
    currency: "USD",
    priceQualifier: "per month",
    status: "For Rent",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 0, // TODO: confirm bathroom count
    featured: true,
    headline: "Fully furnished, ready to move into, with a balcony over the valley.",
    shortDescription:
      "A fully furnished two bedroom apartment in Nyarutarama with an open living space, a fitted kitchen and a long balcony with views across Kigali.",
    description: [
      "This apartment is furnished and ready to live in from the first day. The open living and dining space is finished with a lit coffered ceiling and sculptural ring pendants, and floor to ceiling glass opens onto a long private balcony.",
      "The fitted kitchen has a stone topped peninsula, a gas hob, an oven and a large refrigerator. Both bedrooms have upholstered beds, built in wardrobes and their own window onto the view.",
      "The building sits within a landscaped, gated residence in Nyarutarama, one of the most sought after neighborhoods for professionals and families relocating to Kigali.",
    ],
    features: [
      "Fully furnished",
      "Two bedrooms with built in wardrobes",
      "Open plan living and dining",
      "Fitted kitchen with gas hob and oven",
      "Long private balcony with city views",
      "Floor to ceiling glazing",
      "Gated residence with landscaped grounds",
      "Walk in shower",
    ],
    nearby: [
      "Kigali Golf Club, about 5 minutes",
      "International schools, about 10 minutes",
      "Kigali Heights, about 10 minutes",
      "Kigali International Airport, about 20 minutes",
    ],
    images: [
      flat(1, "Living room with sofas and a view through the balcony doors"),
      flat(2, "Open living and dining space with the kitchen in front"),
      flat(3, "Fitted kitchen with a stone topped peninsula"),
      flat(4, "Living room under a lit coffered ceiling"),
      flat(5, "Living room looking toward the dining area and kitchen"),
      flat(6, "Main bedroom with an upholstered bed"),
      flat(7, "Main bedroom with a window onto the balcony"),
      flat(8, "Second bedroom with a view of the city"),
      flat(9, "Second bedroom with a dressing table and mirror"),
      flat(10, "Bedroom with a built in wardrobe"),
      flat(11, "Bathroom with a glass walk in shower"),
      flat(12, "Long private balcony"),
      flat(13, "Landscaped grounds and the view across Kigali"),
    ],
  },
];

export const featuredProperties = properties.filter((p) => p.featured).slice(0, 6);

export function getProperty(slug: string) {
  return properties.find((p) => p.slug === slug);
}

/** Every listing photo, used by the 3D hero and the gallery strip. */
export const allPropertyImages = properties.flatMap((p) =>
  p.images.map((img) => ({ ...img, slug: p.slug, property: p.name })),
);

/** Unique values used to build the filter controls */
export const propertyFilters = {
  locations: [...new Set(properties.map((p) => p.location))].sort(),
  types: [...new Set(properties.map((p) => p.type))].sort(),
  statuses: [...new Set(properties.map((p) => p.status))],
};
