/**
 * INSIGHTS / ARTICLES
 * ------------------------------------------------------------------
 * DRAFT ARTICLES — these are outlines written as placeholders so the
 * section renders. Replace the body of each with Victor's own writing.
 *
 * To add an article: copy a block and give it a unique `slug`.
 * `body` is an array of paragraphs; a string starting with "## "
 * renders as a subheading.
 */
export type InsightCategory =
  | "Buying Property"
  | "Selling Property"
  | "Investing"
  | "Market Updates"
  | "Neighborhood Guides"
  | "Lifestyle";

export interface Insight {
  slug: string;
  title: string;
  excerpt: string;
  category: InsightCategory;
  date: string;      // ISO, e.g. "2026-07-14"
  readMinutes: number;
  image: string;     // "" renders a placeholder
  body: string[];
}

export const insights: Insight[] = [
  {
    slug: "buying-property-in-kigali-what-to-check-first",
    title: "Buying Property in Kigali: What to Check First",
    excerpt:
      "Before you fall in love with a house, there are four checks that decide whether the purchase is sound. Most problems I see began with one of them being skipped.",
    category: "Buying Property",
    date: "2026-07-14",
    readMinutes: 6,
    image: "",
    body: [
      "DRAFT: Replace with Victor's own article.",
      "## Start with the title, not the tiles",
      "The single most common mistake is falling for a property before verifying who legally owns it. A registry search confirms the registered owner, the plot boundaries and whether anything is registered against the property. This costs very little and prevents the expensive problems.",
      "## Understand what the plot actually is",
      "Boundaries on the ground and boundaries on paper do not always agree. Walk the plot with the documents in hand.",
      "## Check utilities honestly",
      "Water pressure, power reliability and internet availability vary meaningfully between neighborhoods and even between streets. Ask neighbors rather than relying on the seller.",
      "## Model the real monthly cost",
      "Beyond the purchase price, budget for security, maintenance, water storage and standby power. A house that is cheap to buy is not always cheap to run.",
    ],
  },
  {
    slug: "selling-your-home-the-first-two-weeks-decide-everything",
    title: "Selling Your Home: The First Two Weeks Decide Everything",
    excerpt:
      "Pricing and presentation in the opening fortnight shape the entire sale. Here is why a property that lingers loses value in buyers' eyes.",
    category: "Selling Property",
    date: "2026-06-22",
    readMinutes: 5,
    image: "",
    body: [
      "DRAFT: Replace with Victor's own article.",
      "## Attention is highest on day one",
      "Every serious buyer currently looking will see your property in its first fortnight. That attention does not come back later.",
      "## Over-pricing costs more than it gains",
      "Starting high and reducing later signals weakness. Buyers notice how long a listing has been available and adjust their offers downward accordingly.",
      "## Presentation is cheap leverage",
      "Repairs, decluttering and proper photography cost comparatively little and change the pool of buyers who take the property seriously.",
    ],
  },
  {
    slug: "why-investors-are-looking-at-kigali",
    title: "Why Investors Are Looking at Kigali",
    excerpt:
      "Stability, urban planning and a growing services sector have put Kigali on the map for regional investors. What that means in practice for a property buyer.",
    category: "Investing",
    date: "2026-05-30",
    readMinutes: 7,
    image: "",
    body: [
      "DRAFT: Replace with Victor's own article, and verify any figures before publishing.",
      "## The case investors make",
      "Kigali is frequently cited for security, cleanliness and predictable governance, qualities that matter to anyone holding an illiquid asset for a decade.",
      "## Where the demand comes from",
      "Rental demand concentrates around the diplomatic, institutional and corporate sectors, which is why location matters more than finish quality for income properties.",
      "## The honest risks",
      "Liquidity is thinner than in larger markets, and exits can take time. Currency and financing costs deserve careful attention. Any investment case should hold up when these are included.",
    ],
  },
];

export const recentInsights = [...insights]
  .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  .slice(0, 3);

export function getInsight(slug: string) {
  return insights.find((i) => i.slug === slug);
}
