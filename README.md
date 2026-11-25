# Nalimat website

The official website for **Nalimat** ([nalimat.com](https://nalimat.com)): an IT product and IT services company.

Built with Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS v4, Lucide icons and Framer Motion.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (all pages are prerendered), then a check that no placeholder reached a page |
| `npm start` | Serve the production build |
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
once there is at least one published article or open role.

**Logo:** the monogram in `src/components/layout/Logo.tsx`, `src/app/icon.svg` and
`src/app/opengraph-image.tsx` is a stand-in. Replace it with the official logo files.

## Contact form

The form validates on the client and again on the server (`src/lib/contact.ts`, `src/app/contact/actions.ts`).
There is no database. Enquiries are sent as JSON to `CONTACT_WEBHOOK_URL` (see `.env.example`), which can be an
email service, CRM, Slack, Zapier, Make or n8n endpoint.

- **Development:** without the variable, enquiries are printed to the server console.
- **Production:** the variable is required. Without it, visitors see an error asking them to email you
  directly, so enquiries are never silently lost.

The form includes a honeypot field against basic spam bots.

## Project structure

```
src/
  app/            routes, metadata, sitemap.ts, robots.ts, OG image, error/404/loading states
  components/
    layout/       Navbar, Footer, Logo, MotionProvider
    ui/           Button, Container, Section, Card, Badge, EmptyState
    sections/     Page sections (hero, product cards, service list, CTA...)
    contact/      Contact form
  content/        Editable company content
  lib/            Helpers (SEO metadata, validation, formatting)
```

## Deployment

Any Node.js host that supports Next.js works (Vercel, Netlify, AWS Amplify, a Node server or Docker).

1. Set `CONTACT_WEBHOOK_URL` in the host's environment variables.
2. `npm run build && npm start`, or connect the repository to Vercel.
3. Point `nalimat.com` at the deployment. The canonical URL is set in `src/content/site.ts`.
4. Submit `https://nalimat.com/sitemap.xml` in Google Search Console.
