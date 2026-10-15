/**
 * FREQUENTLY ASKED QUESTIONS
 * ------------------------------------------------------------------
 * The categories come from the content document. The answers below are
 * DRAFTS written as a starting point — review every one for accuracy
 * against current Rwandan practice before publishing, and have the
 * legal and financing answers checked by a qualified professional.
 */
export interface FaqCategory {
  category: string;
  items: { q: string; a: string }[];
}

export const faqs: FaqCategory[] = [
  {
    category: "Buying Process",
    items: [
      {
        q: "What are the steps to buying a property in Rwanda?",
        a: "DRAFT: In broad terms: identify the property, verify the title, agree terms, sign a sale agreement, pay as agreed, and complete transfer at the Rwanda Land Management and Use Authority. I guide clients through each stage. Please confirm current requirements with a licensed professional.",
      },
      {
        q: "How long does a purchase usually take?",
        a: "DRAFT: Straightforward transactions with clean title commonly complete within a few weeks. Timelines extend where documentation, financing or succession issues need resolving.",
      },
      {
        q: "What costs should I budget for beyond the purchase price?",
        a: "DRAFT: Buyers typically budget for transfer and registration fees, legal or notary costs, and due diligence. Figures change, so I provide a current written estimate for each transaction.",
      },
    ],
  },
  {
    category: "Selling Process",
    items: [
      {
        q: "How do you determine the asking price?",
        a: "DRAFT: Through recent comparable sales in the same neighborhood, the property's condition and specification, and current buyer demand. I present the reasoning, not just a number.",
      },
      {
        q: "How long will it take to sell?",
        a: "DRAFT: This depends most on pricing. Correctly priced properties in established neighborhoods move considerably faster than over-priced ones, which tend to stagnate.",
      },
      {
        q: "What should I do to prepare my property?",
        a: "DRAFT: Small repairs, decluttering and a thorough clean before photography reliably return more than their cost. I advise on what is worth doing and what is not.",
      },
    ],
  },
  {
    category: "Working with Foreign Buyers",
    items: [
      {
        q: "Can non-Rwandans buy property in Rwanda?",
        a: "DRAFT: Rwanda is relatively open to foreign ownership compared with many countries in the region, though specific conditions apply depending on land category and intended use. Please seek qualified legal advice on your particular situation before committing.",
      },
      {
        q: "Can I buy without travelling to Rwanda?",
        a: "DRAFT: Yes. Many diaspora clients transact remotely using video viewings, detailed condition reports and a legally appointed representative. I document everything so decisions are made on evidence.",
      },
      {
        q: "How do I move funds for a purchase?",
        a: "DRAFT: Through formal banking channels, with proper records kept for the transfer process. Your bank and a qualified adviser should confirm the route that applies to you.",
      },
    ],
  },
  {
    category: "Investment Questions",
    items: [
      {
        q: "Which areas of Kigali offer the best rental demand?",
        a: "DRAFT: Established areas such as Nyarutarama, Kacyiru and Gacuriro attract steady expatriate and corporate tenants. Emerging areas can offer better entry pricing with a longer horizon.",
      },
      {
        q: "What rental yields are realistic?",
        a: "DRAFT: Yields vary significantly by area, property type and management quality. I model expected income and vacancy for each opportunity rather than quoting a market-wide figure.",
      },
      {
        q: "Is it better to buy land or a completed property?",
        a: "DRAFT: Land can offer a lower entry price and development upside but ties up capital and carries build risk. Completed property generates income sooner. The right answer depends on your timeline.",
      },
    ],
  },
  {
    category: "Legal Documentation",
    items: [
      {
        q: "How do I verify that a title is genuine?",
        a: "DRAFT: Through official land registry searches confirming the registered owner, plot boundaries and any encumbrances. I insist on this verification before a client commits funds.",
      },
      {
        q: "What documents should I receive at completion?",
        a: "DRAFT: The signed sale agreement, evidence of payment, and the transferred title in your name once registration completes. Keep originals securely.",
      },
    ],
  },
  {
    category: "Property Financing",
    items: [
      {
        q: "Can I get a mortgage in Rwanda?",
        a: "DRAFT: Several Rwandan banks offer mortgage products. Terms, rates and deposit requirements differ between lenders and change over time. I can introduce you to lenders, but I am not a financial adviser. Compare offers independently.",
      },
      {
        q: "How much deposit will I need?",
        a: "DRAFT: Deposit requirements vary by lender and borrower profile. Confirm current terms directly with the banks you approach.",
      },
    ],
  },
];
