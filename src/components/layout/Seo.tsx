import type { SeoData } from "@/lib/seo";

/**
 * Renders a page's metadata. React 19 hoists these elements into <head>
 * (and replaces them on client-side navigation); the prerender step writes
 * them into each page's static HTML for crawlers and link previews.
 */
export function Seo({ title, description, canonical, meta }: SeoData) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      {meta.map((m) => (
        <meta key={`${m.name ?? m.property}:${m.content}`} name={m.name} property={m.property} content={m.content} />
      ))}
    </>
  );
}
