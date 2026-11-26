import { insights } from "@/content/insights";

type ChangeFrequency = "weekly" | "monthly" | "yearly";
export type SitemapEntry = { path: string; priority: number; changeFrequency: ChangeFrequency; lastModified?: string };

/** Static pages, in sitemap order (formerly src/app/sitemap.ts). */
const pages: SitemapEntry[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/products", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/industries", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "yearly" },
  { path: "/insights", priority: 0.6, changeFrequency: "weekly" },
  { path: "/careers", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
];

/** Every URL that is prerendered to static HTML and listed in sitemap.xml. */
export const sitemapEntries: SitemapEntry[] = [
  ...pages,
  ...insights.map((post) => ({
    path: `/insights/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  })),
];
