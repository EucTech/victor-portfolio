import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { properties } from "@/data/properties";
import { insights } from "@/data/insights";
import { neighborhoods } from "@/data/neighborhoods";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    { path: "/", priority: 1, freq: "weekly" as const },
    { path: "/properties", priority: 0.9, freq: "daily" as const },
    { path: "/about", priority: 0.8, freq: "monthly" as const },
    { path: "/services", priority: 0.8, freq: "monthly" as const },
    { path: "/neighborhoods", priority: 0.8, freq: "monthly" as const },
    { path: "/insights", priority: 0.7, freq: "weekly" as const },
    { path: "/testimonials", priority: 0.6, freq: "monthly" as const },
    { path: "/faqs", priority: 0.7, freq: "monthly" as const },
    { path: "/contact", priority: 0.7, freq: "yearly" as const },
    { path: "/privacy", priority: 0.2, freq: "yearly" as const },
  ];

  return [
    ...staticPages.map((p) => ({
      url: `${site.url}${p.path}`,
      lastModified: now,
      changeFrequency: p.freq,
      priority: p.priority,
    })),
    ...properties.map((p) => ({
      url: `${site.url}/properties/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...neighborhoods.map((n) => ({
      url: `${site.url}/neighborhoods/${n.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...insights.map((i) => ({
      url: `${site.url}/insights/${i.slug}`,
      lastModified: new Date(i.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
