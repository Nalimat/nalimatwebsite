# Nalimat website (Vite + React)

The official website for **Nalimat** ([nalimat.com](https://nalimat.com)), migrated from Next.js to
Vite 8, React 19, React Router 8, TypeScript, Tailwind CSS v4, Lucide icons and Framer Motion.
Every route is prerendered to static HTML at build time, so pages, metadata and link previews work
without JavaScript, and React hydrates them in the browser.

## Getting started

```bash
npm install
npm run dev          # http://localhost:5173
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server (includes `/api/contact`) |
| `npm run build` | Client build, SSR build, prerender of every route, then the placeholder check |
| `npm run preview` | Serve the production build locally (http://localhost:4173), with `/api/contact` and Vercel-style 404s |
| `npm run lint` / `npm run typecheck` | Code quality checks |
| `npm run check:placeholders` | List content that still needs real company information |
| `npm run check:seo` | Technical SEO checks on `dist/` (also runs automatically after every build) |

## Editing content

All company content lives in `src/content/`. Pages read from these files, so most updates need no component changes.

| File | Controls |
| --- | --- |
| `site.ts` | Company name, contact details, social links, navigation |
| `products.ts` | Products (Products page and homepage featured products) |
| `services.ts` | Services (set `offered: false` to hide one) |
| `industries.ts` | Industries served (set `active: false` to hide one) |
| `technologies.ts` | Technology expertise list |
| `approach.ts` | "Why Nalimat" reasons and delivery process |
| `about.ts` | Story, mission, vision, values, company facts, leadership |
| `case-studies.ts` | Client work (empty state shown until entries are added) |
| `insights.ts` | Blog articles (empty state shown until entries are added) |
| `careers.ts` | Open roles, working principles, hiring steps |

**Placeholders:** any value in `[square brackets]` is unconfirmed company information. It is never shown on the
website: products, articles, roles, case studies, story paragraphs and contact details that contain a placeholder
are hidden automatically and reappear once every bracketed value is replaced. `npm run check:placeholders` lists
what still needs confirming. As a safety net, `npm run build` runs `scripts/check-build-output.mjs` afterwards and
fails if any bracketed placeholder reaches a generated page. Do not publish statistics, testimonials, client names
or certifications that cannot be verified.

**Insights and Careers** stay reachable from the footer and sitemap, and join the header navigation automatically
once there is at least one published article or open role. New articles are prerendered and added to the sitemap
automatically.

**Logo:** the monogram in `src/components/layout/Logo.tsx`, `public/icon.svg` and the social image
`public/og-image.png` (1200×630) is a stand-in. Replace them with the official logo files.

## How it fits together

```
index.html               HTML shell: static head tags, Search Console tag slot, #root
src/
  entry-client.tsx       Hydrates prerendered pages (BrowserRouter)
  entry-server.tsx       Renders a URL to HTML at build time (StaticRouter)
  App.tsx                Routes (formerly the src/app directory)
  routes.ts              Prerendered URLs and sitemap data
  pages/                 One component per route, each with its <Seo> metadata
  components/layout/     Layout, Navbar, Footer, SectionNav, Seo, ScrollManager, ErrorBoundary
  lib/seo.ts             Page metadata, Open Graph/Twitter tags and JSON-LD structured data
  lib/analytics.ts       Google Analytics 4 (page views, contact form events); off without an ID
  lib/contact-client.ts  Posts the contact form to /api/contact
server/contact.ts        Contact validation + webhook delivery (server only)
api/contact.ts           Vercel Function: POST /api/contact
scripts/prerender.mjs    Writes dist/<route>.html, 404.html, sitemap.xml, robots.txt
scripts/check-seo.mjs    Technical SEO checks on dist/ after every build
public/                  icon.svg, og-image.png (social sharing image)
vercel.json              Vercel build settings, clean URLs, asset caching
```

## Contact form

The form validates in the browser and again on the server (`src/lib/contact.ts`, shared by both).
Enquiries are sent as JSON to `CONTACT_WEBHOOK_URL`. The variable is read only by server code
(`server/contact.ts`); it has no `VITE_` prefix, so Vite never puts it in the browser bundle.

- **Development (`npm run dev`):** without the variable, enquiries are printed to the terminal.
  To test delivery locally, put `CONTACT_WEBHOOK_URL=...` in `.env.local` (git-ignored).
- **Production:** the variable is required. Without it, visitors see an error asking them to email
  you directly, so enquiries are never silently lost.

## Deployment (Vercel)

1. Import the repository in Vercel (Root Directory: the repository root). Vercel reads `vercel.json`
   (framework Vite, `npm run build`, output `dist`) and deploys `api/contact.ts` as a function.
2. Add `CONTACT_WEBHOOK_URL` under **Settings > Environment Variables** (Production and Preview).
   Add `VITE_GA_MEASUREMENT_ID` (and, only if you use the HTML-tag method, `GOOGLE_SITE_VERIFICATION`)
   to **Production** only, so preview deployments do not send analytics. See [SEO and Google](#seo-and-google).
3. Deploy, then add `nalimat.com` (and `www.nalimat.com`, redirected to the apex) under
   **Settings > Domains** and set the DNS records Vercel shows at your domain registrar.
4. Set up Google Search Console and submit the sitemap (see [SEO and Google](#seo-and-google)).

Unknown URLs are served `404.html` with a real 404 status. `/about/` redirects to `/about`.

## SEO and Google

### What the build does

- **Per page metadata** (`src/lib/seo.ts`, used by each page in `src/pages/`): a unique title and
  description, a self-referencing canonical URL, Open Graph and Twitter card tags with the shared
  1200×630 social image (`public/og-image.png`).
- **Structured data (JSON-LD):** Organization and WebSite on the homepage; WebPage and BreadcrumbList on
  every inner page (AboutPage, ContactPage and CollectionPage where they apply); the service list on
  /services; BlogPosting on articles. Only confirmed company details are included (contact details and
  social profiles appear automatically once they are filled in `src/content/site.ts`).
- **sitemap.xml and robots.txt** are generated by `scripts/prerender.mjs` from `src/routes.ts`. New
  articles are added automatically. The 404 page is `noindex` and has no canonical.
- **`scripts/check-seo.mjs`** runs after every build and fails it on: missing or duplicate titles and
  descriptions, wrong canonicals, missing social tags, not exactly one `<h1>`, skipped heading levels,
  images without `alt`, invalid JSON-LD, broken internal links, and a sitemap or robots.txt that does
  not match the pages. It warns on title/description lengths and unlabelled inline SVGs.
- **Performance:** hero and page-header entrances are CSS animations, so the prerendered text paints
  without waiting for JavaScript; Inter has a metric-matched fallback and is preloaded (no font CLS).

Writing guidance: describe what the page actually offers, keep titles to about 60 characters and
descriptions to about 155, do not repeat keywords, and do not claim locations, clients, ratings or
awards that are not confirmed.

### Google Analytics 4

`src/lib/analytics.ts` loads gtag.js only when `VITE_GA_MEASUREMENT_ID` is set at build time, and
only in production builds (or when `VITE_GA_DEBUG=true`). It sends:

| Event | When | Parameters |
| --- | --- | --- |
| `page_view` | First load and every client-side navigation | `page_path`, `page_location`, `page_title` |
| `generate_lead` | Contact form sent successfully | `form_name`, `enquiry_topic` |
| `contact_form_error` | Contact form could not be sent | `form_name` |

No personal data (name, email, phone, company, message) is ever sent to Google.

Setup:

1. In [Google Analytics](https://analytics.google.com), create a GA4 property for nalimat.com and a
   **Web** data stream for `https://nalimat.com`. Copy its **Measurement ID** (`G-…`).
2. In the stream's **Enhanced measurement** settings, open *Page views* > *Show advanced settings* and
   turn off **"Page changes based on browser history events"**. The site sends page views itself;
   leaving this on counts each navigation twice.
3. Set `VITE_GA_MEASUREMENT_ID` in Vercel (Production) and redeploy.
4. Verify: open the live site, then GA4 **Reports > Realtime** should show you. For event detail, build
   with `VITE_GA_DEBUG=true` and use **Admin > DebugView**.
5. Mark `generate_lead` as a **key event** (Admin > Events, or Admin > Key events) once it has appeared,
   so enquiries are reported as conversions.

Privacy: if the site will have visitors from the EU/UK or other regions that require consent for
analytics cookies, add a consent banner (Google Consent Mode) before enabling GA4, and mention
analytics in the privacy policy.

### Google Search Console

1. In [Search Console](https://search.google.com/search-console), add a **Domain** property for
   `nalimat.com` and verify it with the **DNS TXT record** Google shows, added at your domain
   registrar or DNS host. This covers http/https and www, and needs no code change.
   Alternative: a **URL-prefix** property for `https://nalimat.com` with the **HTML tag** method. Set
   `GOOGLE_SITE_VERIFICATION` to just the tag's `content` value in Vercel (Production), redeploy,
   then click Verify. Keep the variable set afterwards: removing the tag un-verifies the property.
2. **Sitemaps** > submit `sitemap.xml` (`https://nalimat.com/sitemap.xml`).
3. **URL Inspection** > test the homepage and one inner page: "URL is available to Google", the
   rendered HTML shows the page content, and the "Google-selected canonical" matches the URL.
   Use **Request indexing** for the main pages.
4. After a few days, check **Pages** (indexing report) for errors and **Core Web Vitals** once there
   is enough traffic for field data. Optionally link Search Console to GA4 (GA4 Admin > Product links).

### Testing checklist (before each production release)

- [ ] `npm run lint`, `npm run typecheck` and `npm run build` pass (the build includes the
      placeholder and SEO checks).
- [ ] `npm run check:placeholders` reviewed; launch content confirmed.
- [ ] `npm run preview`: every page in the sitemap opens; `/no-such-page` returns 404;
      `/robots.txt` and `/sitemap.xml` load and use `https://nalimat.com`.
- [ ] View source on the homepage and one inner page: title, description, canonical, `og:*`,
      `twitter:*` and JSON-LD are present in the HTML (not only after JavaScript runs).
- [ ] [Rich Results Test](https://search.google.com/test/rich-results) and
      [Schema Markup Validator](https://validator.schema.org) on the homepage, /services and an article:
      no errors.
- [ ] Share preview: paste a page URL into LinkedIn Post Inspector / an X post draft; image, title and
      description appear.
- [ ] Lighthouse (mobile) on the homepage, /services and /contact: Accessibility, Best Practices and SEO
      at 100 or explained; LCP under 2.5 s and CLS under 0.1 in a throttled mobile trace.
- [ ] GA4 (after the measurement ID is set): Realtime shows a visit; navigating between pages adds one
      `page_view` each; a test enquiry adds one `generate_lead` with no personal data.
- [ ] Search Console (after verification): sitemap status "Success"; URL Inspection passes for the
      homepage and one inner page.

### Other static hosts

`dist/` is plain static files plus one serverless endpoint. On another host, serve `dist/` with
"clean URLs" (`/about` -> `about.html`), use `404.html` as the not-found page, and run
`server/contact.ts`'s `handleContactRequest` as a function at `/api/contact`.

## Previous Next.js version

The original Next.js implementation is preserved at the Git tag `nextjs-final` (commit `60857a0`):
`git checkout nextjs-final` to inspect it, or `git switch -c nextjs-restore nextjs-final` to work from it.
