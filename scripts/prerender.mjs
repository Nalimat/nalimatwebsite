// Build-time prerendering (static site generation), replacing Next.js static
// rendering. Renders every route with the SSR bundle, moves the metadata
// React hoists (<title>, <meta>, <link>) into <head>, and writes:
//   dist/index.html, dist/<route>.html          one file per page (served at /<route>)
//   dist/404.html                             served for unknown URLs (status 404)
//   dist/sitemap.xml, dist/robots.txt         formerly src/app/sitemap.ts / robots.ts
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const { render, sitemapEntries, site } = await import(pathToFileURL(join(root, "dist-ssr/entry-server.js")).href);

const template = readFileSync(join(dist, "index.html"), "utf8");
if (!template.includes("<!--app-head-->") || !template.includes("<!--app-html-->")) {
  throw new Error("prerender: dist/index.html is missing the <!--app-head--> / <!--app-html--> markers");
}

/** React 19 emits hoistable metadata first when rendering a fragment; split it off. */
const HOISTED = /^(?:<title>[^<]*<\/title>|<meta\b[^>]*\/>|<link\b[^>]*\/>)+/;

function page(url) {
  const html = render(url);
  const head = html.match(HOISTED)?.[0] ?? "";
  if (!head.includes("<title>")) throw new Error(`prerender: no <title> rendered for ${url}`);
  return template.replace("<!--app-head-->", head).replace("<!--app-html-->", html.slice(head.length));
}

function write(file, contents) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, contents);
}

const paths = sitemapEntries.map((e) => e.path);
for (const path of paths) {
  write(path === "/" ? join(dist, "index.html") : join(dist, `${path}.html`), page(path));
}
write(join(dist, "404.html"), page("/404"));

const xml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const loc = (path) => (path === "/" ? site.url : `${site.url}${path}`);
write(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries
    .map(
      (e) =>
        `<url>\n<loc>${xml(loc(e.path))}</loc>\n${e.lastModified ? `<lastmod>${new Date(e.lastModified).toISOString()}</lastmod>\n` : ""}<changefreq>${e.changeFrequency}</changefreq>\n<priority>${e.priority}</priority>\n</url>`,
    )
    .join("\n")}\n</urlset>\n`,
);
write(join(dist, "robots.txt"), `User-Agent: *\nAllow: /\n\nHost: ${site.url}\nSitemap: ${site.url}/sitemap.xml\n`);

// The SSR bundle is only needed at build time and for `vite preview`.
rmSync(join(dist, ".vite"), { recursive: true, force: true });
console.log(`prerender: ${paths.length} pages, 404.html, sitemap.xml and robots.txt written to dist/`);
