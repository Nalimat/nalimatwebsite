/**
 * Google Analytics 4 (gtag.js), loaded only in the browser and only when
 * VITE_GA_MEASUREMENT_ID is set at build time. With no ID, every function here
 * is a no-op, so local development and preview builds send nothing.
 *
 * - Page views are sent manually on each route change (see <Analytics>), since
 *   client-side navigation does not reload the page. Automatic page views and
 *   GA4's history-based "enhanced measurement" page views are turned off so a
 *   navigation is never counted twice.
 * - The contact form sends `generate_lead` on a successful submission. No
 *   personal data (name, email, phone, message) is ever sent to Google.
 *
 * A measurement ID is not a secret: it is always visible in the page source of
 * any site that uses GA4. It comes from the environment so it is not hard-coded
 * in the repository and can differ between staging and production.
 */

type GtagArgs = [command: string, ...params: unknown[]];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArgs) => void;
  }
}

const rawId = (import.meta.env.VITE_GA_MEASUREMENT_ID ?? "").trim();
/** GA4 measurement IDs look like G-XXXXXXXXXX. Anything else is ignored. */
export const measurementId = /^G-[A-Z0-9]{4,}$/.test(rawId) ? rawId : "";
/** Sends events to GA4 DebugView (Admin > DebugView) while verifying the setup. */
const debug = import.meta.env.VITE_GA_DEBUG === "true";

export const analyticsEnabled = Boolean(measurementId) && (import.meta.env.PROD || debug);

let initialized = false;

function gtag(...args: GtagArgs) {
  window.gtag?.(...args);
}

/** Injects gtag.js once. Safe to call repeatedly; does nothing on the server. */
export function initAnalytics() {
  if (!analyticsEnabled || initialized || typeof window === "undefined") return;
  initialized = true;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag() {
    // gtag.js expects the `arguments` object itself, not an array copy.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };

  gtag("js", new Date());
  gtag("config", measurementId, {
    send_page_view: false,
    ...(debug ? { debug_mode: true } : {}),
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);
}

/** Records a page view for the current URL. Query strings are kept (e.g. ?topic=project). */
export function trackPageView(path: string) {
  if (!analyticsEnabled) return;
  gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

/** Records a custom event. Never pass personal data in `params`. */
export function trackEvent(name: string, params: Record<string, string | number | boolean> = {}) {
  if (!analyticsEnabled) return;
  gtag("event", name, params);
}
