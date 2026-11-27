// Technical SEO checks on the prerendered site. Runs after `npm run build`
// (see "postbuild" in package.json) and fails the build on any error.
//
// Per page: one <title> and one description, both unique and of a sensible
// length; a self-referencing canonical; Open Graph and Twitter tags; one <h1>
// and no skipped heading levels; alt text on images; valid JSON-LD; internal
// links that resolve. Site-wide: sitemap.xml lists exactly the indexable pages,
// robots.txt allows crawling and points to the sitemap, the 404 page is noindex.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const dist = "dist";
if (!existsSync(dist)) {
  console.error(`check-seo: ${dist} not found. Run "npm run build" first.`);
  process.exit(1);
}

const errors = [];
const warnings = [];
const err = (page, msg) => errors.push(`${page}: ${msg}`);
const warn = (page, msg) => warnings.push(`${page}: ${msg}`);

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* htmlFiles(path);
    else if (name.endsWith(".html")) yield path;
  }
}

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
const attr = (tag, name) => decode(tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1] ?? "");
const metaTags = (html) => [...html.matchAll(/<meta\b[^>]*>/g)].map((m) => m[0]);
const metaContent = (html, key, value) =>
  metaTags(html)
    .filter((t) => attr(t, key) === value)
    .map((t) => attr(t, "content"));

// Every prerendered route, keyed by URL path ("/", "/about", "/insights/x").
const pages = new Map();
for (const file of htmlFiles(dist)) {
  const rel = relative(dist, file).split(sep).join("/");
  const path = rel === "index.html" ? "/" : `/${rel.replace(/\.html$/, "")}`;
  pages.set(path, readFileSync(file, "utf8"));
}

const robots = existsSync(join(dist, "robots.txt")) ? readFileSync(join(dist, "robots.txt"), "utf8") : "";
const sitemap = existsSync(join(dist, "sitemap.xml")) ? readFileSync(join(dist, "sitemap.xml"), "utf8") : "";
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1]));
const origin = sitemapUrls[0] ? new URL(sitemapUrls[0]).origin : "";

const titles = new Map();
const descriptions = new Map();
const indexable = [];

for (const [path, html] of pages) {
  const page = path === "/404" ? "404.html" : path;
  const robotsMeta = metaContent(html, "name", "robots").join(",");
  const noindex = /noindex/.test(robotsMeta);

  if (!/<html[^>]*\slang="[a-z]{2}/.test(html)) err(page, "missing <html lang>");

  const titleTags = [...html.matchAll(/<title>([^<]*)<\/title>/g)].map((m) => decode(m[1]));
  if (titleTags.length !== 1) err(page, `expected 1 <title>, found ${titleTags.length}`);
  const title = titleTags[0] ?? "";

  const descs = metaContent(html, "name", "description");
  if (descs.length !== 1) err(page, `expected 1 meta description, found ${descs.length}`);
  const description = descs[0] ?? "";

  if (metaContent(html, "name", "robots").length > 1) err(page, "more than one robots meta tag");
  const canonicals = [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*>/g)].map((m) => attr(m[0], "href"));

  if (path === "/404") {
    if (!noindex) err(page, "404 page must be noindex");
    if (canonicals.length) err(page, "404 page must not declare a canonical URL");
    continue;
  }
  if (noindex) {
    warn(page, "page is noindex");
    continue;
  }
  indexable.push(path);

  // Titles: unique; Google shows roughly the first 60 characters.
  if (title.length < 30 || title.length > 65) warn(page, `title is ${title.length} characters (aim for 30-65): "${title}"`);
  if (titles.has(title)) err(page, `duplicate title (also on ${titles.get(title)})`);
  titles.set(title, page);

  // Descriptions: unique; snippets are cut at roughly 155-160 characters.
  if (description.length < 70 || description.length > 170)
    warn(page, `description is ${description.length} characters (aim for 70-170)`);
  if (descriptions.has(description)) err(page, `duplicate description (also on ${descriptions.get(description)})`);
  descriptions.set(description, page);

  const expected = path === "/" ? origin : `${origin}${path}`;
  if (canonicals.length !== 1) err(page, `expected 1 canonical link, found ${canonicals.length}`);
  else if (origin && canonicals[0] !== expected) err(page, `canonical is ${canonicals[0]}, expected ${expected}`);

  // Social sharing
  for (const p of ["og:title", "og:description", "og:url", "og:image", "og:type", "og:site_name"]) {
    const v = metaContent(html, "property", p);
    if (v.length !== 1 || !v[0]) err(page, `expected 1 ${p}, found ${v.length}`);
  }
  for (const n of ["twitter:card", "twitter:title", "twitter:description", "twitter:image"]) {
    const v = metaContent(html, "name", n);
    if (v.length !== 1 || !v[0]) err(page, `expected 1 ${n}, found ${v.length}`);
  }
  const ogUrl = metaContent(html, "property", "og:url")[0];
  if (ogUrl && canonicals[0] && ogUrl !== canonicals[0]) err(page, `og:url (${ogUrl}) differs from canonical`);
  for (const img of metaContent(html, "property", "og:image")) {
    if (!/^https:\/\//.test(img)) err(page, `og:image must be an absolute https URL: ${img}`);
    const local = origin && img.startsWith(origin) ? img.slice(origin.length) : "";
    if (local && !existsSync(join(dist, local))) err(page, `og:image file not found in dist: ${local}`);
  }

  // Headings: one h1, no skipped levels (h2 -> h4). Only the page body counts.
  const body = html.slice(html.indexOf("<body"));
  const levels = [...body.matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]));
  const h1s = levels.filter((l) => l === 1).length;
  if (h1s !== 1) err(page, `expected 1 <h1>, found ${h1s}`);
  if (levels[0] !== undefined && levels[0] !== 1) warn(page, `first heading is h${levels[0]}, not h1`);
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1) {
      err(page, `heading level skips from h${levels[i - 1]} to h${levels[i]}`);
      break;
    }
  }

  // Images: alt text is required (alt="" marks a decorative image).
  for (const m of body.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt="/.test(m[0])) err(page, `image without alt attribute: ${m[0].slice(0, 120)}`);
  }
  // Inline SVG: either hidden from assistive tech or given an accessible name.
  for (const m of body.matchAll(/<svg\b[^>]*>/g)) {
    const t = m[0];
    const hidden = /aria-hidden="true"/.test(t);
    const named = /role="img"/.test(t) && (/aria-label="/.test(t) || /aria-labelledby="/.test(t));
    if (!hidden && !named) warn(page, `inline <svg> without aria-hidden or role="img" + label: ${t.slice(0, 100)}`);
  }

  // Structured data
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!blocks.length) warn(page, "no JSON-LD structured data");
  for (const b of blocks) {
    try {
      const data = JSON.parse(b[1]);
      if (data["@context"] !== "https://schema.org" || !data["@type"]) err(page, "JSON-LD block missing @context or @type");
    } catch (e) {
      err(page, `invalid JSON-LD: ${e.message}`);
    }
  }

  // Internal links must resolve to a prerendered page (or a static file).
  for (const m of body.matchAll(/<a\b[^>]*\shref="(\/[^"]*)"/g)) {
    const target = decode(m[1]).split(/[?#]/)[0].replace(/\/+$/, "") || "/";
    if (!pages.has(target) && !existsSync(join(dist, target))) err(page, `broken internal link: ${m[1]}`);
  }
}

// Sitemap: exactly the indexable pages, absolute URLs on the canonical origin.
if (!sitemap) err("sitemap.xml", "missing");
else {
  if (!sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) err("sitemap.xml", "missing XML declaration");
  if (!sitemap.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) err("sitemap.xml", "missing sitemap namespace");
  const listed = new Set(sitemapUrls.map((u) => new URL(u).pathname.replace(/\/$/, "") || "/"));
  for (const p of indexable) if (!listed.has(p)) err("sitemap.xml", `indexable page not listed: ${p}`);
  for (const p of listed) if (!indexable.includes(p)) err("sitemap.xml", `lists a URL that is not an indexable page: ${p}`);
  if (sitemapUrls.some((u) => !u.startsWith("https://"))) err("sitemap.xml", "all URLs must be absolute https URLs");
}

if (!robots) err("robots.txt", "missing");
else {
  if (/^Disallow:\s*\/\s*$/im.test(robots)) err("robots.txt", "blocks the whole site (Disallow: /)");
  const sm = robots.match(/^Sitemap:\s*(\S+)/im)?.[1];
  if (!sm) err("robots.txt", "no Sitemap line");
  else if (origin && sm !== `${origin}/sitemap.xml`) err("robots.txt", `Sitemap points to ${sm}`);
}

for (const w of warnings) console.warn(`  warn  ${w}`);
for (const e of errors) console.error(`  error ${e}`);
if (errors.length) {
  console.error(`\ncheck-seo: ${errors.length} error(s), ${warnings.length} warning(s).`);
  process.exit(1);
}
console.log(`check-seo: ${indexable.length} indexable pages passed (${warnings.length} warning(s)).`);
