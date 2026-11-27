import { useEffect } from "react";
import { useLocation } from "react-router";
import { initAnalytics, trackPageView } from "@/lib/analytics";

/**
 * Sends a GA4 page view on first load and after every client-side navigation.
 * Renders nothing. Runs after React commits, so document.title is already the
 * new page's title (React 19 hoists <title> during the same commit).
 */
export function Analytics() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackPageView(pathname + search);
  }, [pathname, search]);

  return null;
}
