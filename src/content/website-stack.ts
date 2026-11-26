/**
 * Technology stack of this website, shown on the About page.
 *
 * Every entry is taken from the codebase itself (package.json, src/, server/,
 * api/, scripts/, index.html, vite.config.ts, vercel.json). Update it when a
 * dependency is added or removed, and list only what the site actually uses.
 * This is the website's own stack; the technologies NALIMAT works with for
 * clients are in technologies.ts.
 *
 * Text inside `backticks` is shown as inline code.
 */
export type StackItem = { name: string; usage: string };
export type StackGroup = { title: string; items: StackItem[] };

export const websiteStack: StackGroup[] = [
  {
    title: "Languages",
    items: [
      {
        name: "TypeScript (TSX)",
        usage: "Every page and interface component, written as typed React components in `src/pages/` and `src/components/`.",
      },
      {
        name: "TypeScript",
        usage:
          "Site content, SEO metadata and contact form validation in `src/content/` and `src/lib/`, and the contact API in `server/` and `api/`.",
      },
      {
        name: "JavaScript",
        usage:
          "Build scripts in `scripts/`: prerendering every route to static HTML, generating `sitemap.xml` and `robots.txt`, and checking that no unconfirmed content is published.",
      },
      {
        name: "HTML",
        usage:
          "`index.html`, the document shell with the shared meta tags, Organization structured data and the root element that React hydrates.",
      },
      {
        name: "CSS",
        usage:
          "Design tokens and base styles in `src/globals.css`, including the colour palette, type scale and focus styles, and the self-hosted typeface in `src/fonts.css`.",
      },
    ],
  },
  {
    title: "Frameworks and libraries",
    items: [
      {
        name: "React 19",
        usage:
          "Builds the interface from components. Each page is rendered to HTML at build time (`renderToString`) and hydrated in the browser (`hydrateRoot`).",
      },
      {
        name: "React Router 8",
        usage:
          "Routes for all pages, insight articles and the 404 page in `src/App.tsx`. `StaticRouter` renders each route during the build.",
      },
      {
        name: "Tailwind CSS 4",
        usage: "Utility classes for layout, spacing and responsive styling. Brand colours and typography are theme tokens.",
      },
      {
        name: "Framer Motion",
        usage:
          "The hero entrance and illustration parallax, the sliding navigation indicators and the mobile menu transition, following the visitor's reduced-motion setting.",
      },
      {
        name: "Lucide React",
        usage: "Interface icons, including the service, industry and contact icons and the menu toggle.",
      },
      {
        name: "Fontsource Inter",
        usage: "Self-hosts the Inter variable typeface, so no font is loaded from a third-party server.",
      },
    ],
  },
  {
    title: "Build, quality and hosting",
    items: [
      {
        name: "Vite 8",
        usage: "Development server with instant reload, the production bundle and the server build used for prerendering.",
      },
      {
        name: "Node.js",
        usage:
          "Runs the build and prerender scripts, and the contact API that validates enquiries and delivers them to a webhook.",
      },
      {
        name: "Vercel",
        usage:
          "Deployment configuration in `vercel.json` (clean URLs, asset caching). `api/contact.ts` runs as a Vercel Function.",
      },
      {
        name: "ESLint and tsc",
        usage: "Code checks before release: `npm run lint` for code quality and `npm run typecheck` for type safety.",
      },
    ],
  },
];
