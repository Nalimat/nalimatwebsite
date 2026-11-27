/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** GA4 measurement ID (G-XXXXXXXXXX). Optional: analytics is off without it. */
  readonly VITE_GA_MEASUREMENT_ID?: string;
  /** "true" sends events to GA4 DebugView and enables analytics in `npm run dev`. */
  readonly VITE_GA_DEBUG?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
