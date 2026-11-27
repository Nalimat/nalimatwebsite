import type { SeoData } from "@/lib/seo";

/** JSON for an inline <script>: "<" is escaped so content can never close the tag. */
const safeJson = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");

/**
 * Renders a page's metadata. React 19 hoists <title>, <meta> and <link> into
 * <head> (and replaces them on client-side navigation); the prerender step
 * writes them into each page's static HTML for crawlers and link previews.
 * Structured data stays in the body as application/ld+json scripts.
 */
export function Seo({ title, description, canonical, meta, jsonLd = [] }: SeoData) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      {meta.map((m) => (
        <meta key={`${m.name ?? m.property}:${m.content}`} name={m.name} property={m.property} content={m.content} />
      ))}
      {jsonLd.map((block, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(block) }} />
      ))}
    </>
  );
}
