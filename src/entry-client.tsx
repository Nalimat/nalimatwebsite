import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { App } from "./App";
import "./fonts.css";
import "./globals.css";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Prerendered pages hydrate; the dev server's shell (only the <!--app-html-->
// placeholder comment, no elements) renders from scratch.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
