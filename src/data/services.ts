export interface Service {
  slug: string;
  title: string;
  summary: string;
  detail: string[];
  points: string[];
}

export const services: Service[] = [
  {
    slug: "buying",
    title: "Buying",
    summary:
      "Helping buyers identify properties that align with their lifestyle, goals, and budget while providing professional guidance throughout the purchasing process.",
    detail: [
      "Buying property is rarely only a financial decision. It affects where your children go to school, how long you sit in traffic, and how you feel at the end of the day.",
      "I start by understanding what you actually need, then shortlist properties worth your time — including ones that are not publicly listed. You see honest assessments, not sales pitches.",
    ],
    points: [
      "Needs assessment and budget planning",
      "Curated shortlists, including off-market listings",
      "Accompanied viewings and neighborhood orientation",
      "Due diligence on title and documentation",
      "Negotiation and offer strategy",
      "Support through transfer and handover",
    ],
  },
  {
    slug: "selling",
    title: "Selling",
    summary:
      "Helping property owners position, market, and present their properties effectively to attract qualified buyers and achieve the best possible outcome.",
    detail: [
      "A property that sits on the market loses value in the eyes of buyers. Pricing and presentation in the first two weeks determine most of the outcome.",
      "I advise on realistic pricing, prepare the property for viewings, and market it to the buyers most likely to act — then manage negotiations to protect your position.",
    ],
    points: [
      "Comparative market valuation",
      "Preparation and presentation advice",
      "Professional photography and listing copy",
      "Targeted marketing to qualified buyers",
      "Viewing management and buyer screening",
      "Negotiation and closing coordination",
    ],
  },
  {
    slug: "investment-guidance",
    title: "Investment Guidance",
    summary:
      "Providing market insights and thoughtful analysis to help clients evaluate opportunities and make informed long-term property decisions.",
    detail: [
      "Kigali rewards patient, well-informed investors. It punishes people who buy on enthusiasm alone.",
      "I help you evaluate opportunities on the numbers — yield, vacancy risk, exit options and the documentation behind the asset — so that a decision holds up years later.",
    ],
    points: [
      "Rental yield and cash-flow analysis",
      "Neighborhood and demand assessment",
      "Title and documentation verification",
      "Guidance for diaspora and foreign buyers",
      "Portfolio review and exit planning",
    ],
  },
];

/** The four cards under "Why Work With Victor" on the home page */
export const differentiators = [
  {
    title: "Local Market Knowledge",
    body: "A deep understanding of Kigali's property market, neighborhoods, and emerging opportunities.",
  },
  {
    title: "Thoughtful Guidance",
    body: "Every recommendation is based on your goals, not sales pressure.",
  },
  {
    title: "Strategic Negotiation",
    body: "Protecting your interests while working toward the best possible outcome.",
  },
  {
    title: "End-to-End Support",
    body: "From the first conversation to the day you receive your keys, and beyond.",
  },
];

/** The seven-step process shown on the About page */
export const processSteps = [
  { title: "Understand your goals", body: "We start with a conversation about what you want and why it matters." },
  { title: "Explore suitable opportunities", body: "I shortlist properties that fit your brief, including off-market options." },
  { title: "Arrange property viewings", body: "Viewings are scheduled around you, with honest commentary on each property." },
  { title: "Evaluate options together", body: "We weigh the trade-offs openly, including the reasons to walk away." },
  { title: "Negotiate strategically", body: "I represent your position firmly and protect your interests." },
  { title: "Guide you through closing", body: "Documentation, transfer and payment milestones, managed step by step." },
  { title: "Continue supporting you", body: "The relationship does not end at handover. I remain available afterwards." },
];

export const values = [
  "Integrity",
  "Transparency",
  "Professionalism",
  "Relationships",
  "Continuous Learning",
  "Attention to Detail",
];
