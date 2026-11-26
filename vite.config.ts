import { fileURLToPath, URL } from "node:url";
import { Readable } from "node:stream";
import { existsSync, readFileSync } from "node:fs";
import type { IncomingMessage, ServerResponse } from "node:http";
import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

type Handler = (request: Request) => Promise<Response>;

/** Bridges a Node request to the Web-standard handler used by the Vercel function. */
async function runHandler(handler: Handler, req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);
  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) if (typeof v === "string") headers.set(k, v);
  const hasBody = req.method !== "GET" && req.method !== "HEAD";
  const request = new Request(url, {
    method: req.method,
    headers,
    body: hasBody ? (Readable.toWeb(req) as ReadableStream) : undefined,
    // @ts-expect-error Node's fetch needs duplex for streamed bodies
    duplex: "half",
  });
  const response = await handler(request);
  res.statusCode = response.status;
  response.headers.forEach((v, k) => res.setHeader(k, v));
  res.end(Buffer.from(await response.arrayBuffer()));
}

/**
 * Serves POST /api/contact locally so `npm run dev` and `npm run preview`
 * behave like the Vercel deployment. Server env vars (CONTACT_WEBHOOK_URL)
 * come from .env files via loadEnv and are never exposed to client code,
 * because only VITE_-prefixed variables are bundled.
 */
function contactApi(): Plugin {
  const mount = (load: () => Promise<Handler>) => (server: { middlewares: ViteDevServer["middlewares"] }) => {
    server.middlewares.use("/api/contact", (req, res, next) => {
      load()
        .then((handler) => runHandler(handler, req, res))
        .catch(next);
    });
  };
  let dev: ViteDevServer;
  return {
    name: "nalimat-contact-api",
    config(_, { mode }) {
      const env = loadEnv(mode, process.cwd(), "");
      if (env.CONTACT_WEBHOOK_URL && !process.env.CONTACT_WEBHOOK_URL)
        process.env.CONTACT_WEBHOOK_URL = env.CONTACT_WEBHOOK_URL;
    },
    configureServer(server) {
      dev = server;
      mount(async () => (await dev.ssrLoadModule("/server/contact.ts")).handleContactRequest as Handler)(server);
    },
    configurePreviewServer(server) {
      // Like Vercel: a page URL with no prerendered file gets dist/404.html with status 404
      // (instead of Vite's default SPA fallback to the homepage).
      const dist = fileURLToPath(new URL("./dist", import.meta.url));
      server.middlewares.use((req, res, next) => {
        const url = new URL(req.url ?? "/", "http://x");
        const path = decodeURIComponent(url.pathname);
        if (req.method !== "GET" || path.startsWith("/api/") || /\.[a-z0-9]+$/i.test(path)) return next();
        // trailingSlash: false (Vercel) and the Next.js default: /about/ -> 308 /about
        if (path.length > 1 && path.endsWith("/")) {
          res.statusCode = 308;
          res.setHeader("Location", path.replace(/\/+$/, "") + url.search);
          return res.end();
        }
        if (path === "/") return next();
        // cleanUrls (Vercel): /about is served from dist/about.html
        if (existsSync(`${dist}${path}.html`)) {
          req.url = `${path}.html${url.search}`;
          return next();
        }
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.end(readFileSync(`${dist}/404.html`));
      });
      // The SSR bundle re-exports the handler (see src/entry-server.tsx).
      mount(async () => {
        const mod = await import(/* @vite-ignore */ new URL("./dist-ssr/entry-server.js", import.meta.url).href);
        return mod.handleContactRequest as Handler;
      })(server);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), contactApi()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  server: { port: 5173 },
  preview: { port: 4173 },
});
