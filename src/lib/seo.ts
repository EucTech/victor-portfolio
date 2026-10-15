import type { Metadata } from "next";
import { site } from "@/data/site";

/**
 * Builds page metadata with canonical URL, Open Graph and Twitter cards.
 * Every page should use this rather than hand-writing a metadata object.
 */
export function pageMeta({
  title,
  description,
  path = "/",
  image,
  type = "website",
  publishedTime,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
}): Metadata {
  const url = `${site.url}${path}`;
  const ogImage = image ?? "/og-default.png";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type,
      locale: "en_RW",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/** Organisation-level schema, rendered once in the root layout. */
export const realEstateAgentSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": `${site.url}/#agent`,
  name: site.name,
  description: site.description,
  url: site.url,
  image: `${site.url}${site.portrait}`,
  telephone: site.phone,
  email: site.email,
  areaServed: {
    "@type": "City",
    name: "Kigali",
    containedInPlace: { "@type": "Country", name: "Rwanda" },
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line1 || undefined,
    addressLocality: site.address.city,
    addressCountry: "RW",
  },
  knowsLanguage: ["en"],
  sameAs: Object.values(site.socials),
};

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export { JsonLd } from "@/components/json-ld";
