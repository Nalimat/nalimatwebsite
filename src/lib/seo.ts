import { site, contactDetails } from "@/content/site";

/**
 * Page metadata.
 *
 * Static tags shared by every page (charset, viewport, theme-color,
 * application-name, icon, optional Search Console verification) live in
 * index.html. Everything that varies per page is rendered by <Seo>: React 19
 * hoists <title>, <meta> and <link> into <head>, and the build-time prerender
 * writes them into each page's static HTML. JSON-LD is rendered in the body,
 * which Google reads the same way as JSON-LD in <head>.
 *
 * Writing guidelines (checked by scripts/check-seo.mjs after every build):
 * - Every indexable page has a unique title (about 30 to 60 characters) and a
 *   unique description (about 70 to 160 characters).
 * - Describe what the page actually offers. Do not repeat keywords or claim
 *   anything (locations, clients, awards, ratings) that is not confirmed.
 */
export type Meta = { name?: string; property?: string; content: string };
export type JsonLd = Record<string, unknown>;

export type SeoData = {
  title: string;
  description: string;
  /** Absolute canonical URL, or omitted for no canonical link (404 pages). */
  canonical?: string;
  meta: Meta[];
  /** schema.org structured data blocks rendered as application/ld+json. */
  jsonLd?: JsonLd[];
};

export const absoluteUrl = (path: string) => (path === "/" || path === "" ? site.url : `${site.url}${path}`);

const ogImageUrl = `${site.url}/og-image.png`;
const imageAlt = `${site.name}: ${site.tagline}`;
const orgId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;

const socialImage: Meta[] = [
  { property: "og:image", content: ogImageUrl },
  { property: "og:image:type", content: "image/png" },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { property: "og:image:alt", content: imageAlt },
  { name: "twitter:image", content: ogImageUrl },
  { name: "twitter:image:alt", content: imageAlt },
];

function socialMeta({
  title,
  description,
  url,
  type,
}: {
  title: string;
  description: string;
  url: string;
  type: "website" | "article";
}): Meta[] {
  const xHandle = xHandleFrom(site.social.x);
  return [
    { property: "og:type", content: type },
    { property: "og:site_name", content: site.name },
    { property: "og:locale", content: site.locale },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    ...(xHandle ? [{ name: "twitter:site", content: xHandle }] : []),
    ...socialImage,
  ];
}

/** "https://x.com/nalimat" -> "@nalimat"; empty when no profile is configured. */
function xHandleFrom(url: string) {
  const handle = url.match(/(?:x|twitter)\.com\/@?([A-Za-z0-9_]{1,15})\/?$/)?.[1];
  return handle ? `@${handle}` : "";
}

const sameAs = Object.values(site.social).filter(Boolean);

/** The company, referenced by @id from every other block. Only confirmed details are included. */
export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    image: ogImageUrl,
    description: site.description,
    ...(sameAs.length ? { sameAs } : {}),
    ...(contactDetails.email || contactDetails.phone
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            ...(contactDetails.email ? { email: contactDetails.email } : {}),
            ...(contactDetails.phone ? { telephone: contactDetails.phone } : {}),
          },
        }
      : {}),
  };
}

function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": orgId },
  };
}

export type Crumb = { name: string; path: string };

/** Breadcrumb trail for an inner page: Home > ... > this page. */
function breadcrumbJsonLd(crumbs: Crumb[]): JsonLd {
  const trail = [{ name: "Home", path: "/" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

function webPageJsonLd({ title, description, path, type = "WebPage" }: { title: string; description: string; path: string; type?: string }): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description,
    inLanguage: "en",
    isPartOf: { "@id": websiteId },
    about: { "@id": orgId },
  };
}

/** Homepage: site-wide title, Organization and WebSite structured data. */
export function homeMetadata(): SeoData {
  const title = `${site.name}: Websites, Mobile Apps & Business Software`;
  const description = site.description;
  return {
    title,
    description,
    canonical: absoluteUrl("/"),
    meta: socialMeta({ title, description, url: absoluteUrl("/"), type: "website" }),
    jsonLd: [organizationJsonLd(), websiteJsonLd()],
  };
}

/** 404 and "not found" pages: never indexed, no canonical, no structured data. */
export function notFoundMetadata(title: string): SeoData {
  const full = `${title} | ${site.name}`;
  return {
    title: full,
    description: site.description,
    meta: [{ name: "robots", content: "noindex, follow" }],
  };
}

/**
 * Inner page metadata. `title` is the complete <title> (the site name is
 * appended unless the title already contains it). `crumb` is the page's short
 * name in the breadcrumb trail.
 */
export function pageMetadata({
  title,
  description,
  path,
  crumb,
  pageType,
  jsonLd = [],
}: {
  title: string;
  description: string;
  path: string;
  crumb: string;
  /** schema.org WebPage subtype, e.g. "AboutPage", "ContactPage", "CollectionPage". */
  pageType?: string;
  jsonLd?: JsonLd[];
}): SeoData {
  const full = title.includes(site.name) ? title : `${title} | ${site.name}`;
  return {
    title: full,
    description,
    canonical: absoluteUrl(path),
    meta: socialMeta({ title: full, description, url: absoluteUrl(path), type: "website" }),
    jsonLd: [webPageJsonLd({ title: full, description, path, type: pageType }), breadcrumbJsonLd([{ name: crumb, path }]), ...jsonLd],
  };
}

/** Article metadata (insight posts): Open Graph article tags and BlogPosting structured data. */
export function articleMetadata(post: {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  author: string;
  topic?: string;
}): SeoData {
  const path = `/insights/${post.slug}`;
  const url = absoluteUrl(path);
  const full = `${post.title} | ${site.name}`;
  return {
    title: full,
    description: post.excerpt,
    canonical: url,
    meta: [
      ...socialMeta({ title: post.title, description: post.excerpt, url, type: "article" }),
      { property: "article:published_time", content: post.date },
      { property: "article:author", content: post.author },
      ...(post.topic ? [{ property: "article:section", content: post.topic }] : []),
    ],
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.excerpt,
        url,
        mainEntityOfPage: url,
        datePublished: post.date,
        image: ogImageUrl,
        inLanguage: "en",
        author: { "@type": "Person", name: post.author },
        publisher: { "@id": orgId, "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${site.url}/icon.svg` } },
        ...(post.topic ? { articleSection: post.topic } : {}),
      },
      breadcrumbJsonLd([
        { name: "Insights", path: "/insights" },
        { name: post.title, path },
      ]),
    ],
  };
}

/** Services offered, as schema.org Service entries provided by the organization. */
export function servicesJsonLd(services: { slug: string; name: string; summary: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Services from ${site.name}`,
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        "@id": `${absoluteUrl("/services")}#${s.slug}`,
        name: s.name,
        description: s.summary,
        url: `${absoluteUrl("/services")}#${s.slug}`,
        provider: { "@id": orgId },
      },
    })),
  };
}
