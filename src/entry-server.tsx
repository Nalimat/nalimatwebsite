import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { App } from "./App";

export { sitemapEntries } from "./routes";
export { site } from "./content/site";
// Used by `vite preview` to serve /api/contact from the built bundle.
export { handleContactRequest } from "../server/contact";

/** Renders one URL to HTML at build time (see scripts/prerender.mjs). */
export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}
