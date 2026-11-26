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
index.html               HTML shell: static head tags, Organization JSON-LD, #root
src/
  entry-client.tsx       Hydrates prerendered pages (BrowserRouter)
  entry-server.tsx       Renders a URL to HTML at build time (StaticRouter)
  App.tsx                Routes (formerly the src/app directory)
  routes.ts              Prerendered URLs and sitemap data
  pages/                 One component per route, each with its <Seo> metadata
  components/layout/     Layout, Navbar, Footer, SectionNav, Seo, ScrollManager, ErrorBoundary
  lib/seo.ts             Metadata (same tags the Next.js Metadata API produced)
  lib/contact-client.ts  Posts the contact form to /api/contact
server/contact.ts        Contact validation + webhook delivery (server only)
api/contact.ts           Vercel Function: POST /api/contact
scripts/prerender.mjs    Writes dist/<route>.html, 404.html, sitemap.xml, robots.txt
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
3. Deploy, then add `nalimat.com` (and `www.nalimat.com`, redirected to the apex) under
   **Settings > Domains** and set the DNS records Vercel shows at your domain registrar.
4. Submit `https://nalimat.com/sitemap.xml` in Google Search Console.

Unknown URLs are served `404.html` with a real 404 status. `/about/` redirects to `/about`.

### Other static hosts

`dist/` is plain static files plus one serverless endpoint. On another host, serve `dist/` with
"clean URLs" (`/about` -> `about.html`), use `404.html` as the not-found page, and run
`server/contact.ts`'s `handleContactRequest` as a function at `/api/contact`.

## Previous Next.js version

The original Next.js implementation is preserved at the Git tag `nextjs-final` (commit `60857a0`):
`git checkout nextjs-final` to inspect it, or `git switch -c nextjs-restore nextjs-final` to work from it.
