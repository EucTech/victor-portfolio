import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/page-hero";
import { PropertyFilters } from "@/components/property-filters";
import { CtaBand } from "@/components/cta-band";
import { properties } from "@/data/properties";
import { site } from "@/data/site";
import { pageMeta, JsonLd, breadcrumbSchema } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Properties for Sale & Rent in Kigali",
  description:
    "Browse houses, apartments, villas and land for sale and rent in Kigali, Rwanda. Filter by neighborhood, property type, bedrooms and price.",
  path: "/properties",
});

const listSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Properties in Kigali",
  numberOfItems: properties.length,
  itemListElement: properties.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${site.url}/properties/${p.slug}`,
    name: `${p.name}, ${p.location}`,
  })),
};

export default function PropertiesPage() {
  return (
    <>
      <PageHero
        image="/images/properties/kiyovu-villa/02.jpg"
        title="Available Properties in Kigali"
        intro="A curated selection of homes, apartments and land. Not everything I represent appears here. Tell me what you're looking for and I'll send options directly."
      />

      <section className="py-20 md:py-28">
        <Container size="wide">
          <PropertyFilters />
        </Container>
      </section>

      <CtaBand
        title="Looking for something you don't see here?"
        text="Many of the best properties in Kigali change hands before they are ever advertised. Tell me your brief and I'll come back with options."
      />
      <JsonLd data={listSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Properties", path: "/properties" },
        ])}
      />
    </>
  );
}
