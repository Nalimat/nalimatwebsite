import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** True after hydration; false while prerendering and during hydration. */
function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

/**
 * Renders `fallback` in the prerendered HTML and `children` once running in
 * the browser. Replaces the <Suspense> boundary Next.js used around the
 * contact form (useSearchParams made Next prerender the skeleton fallback).
 */
export function ClientOnly({ fallback, children }: { fallback: React.ReactNode; children: React.ReactNode }) {
  return useHydrated() ? children : fallback;
}
