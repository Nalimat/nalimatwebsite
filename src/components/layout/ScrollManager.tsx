import { useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router";

/** Root scroll-padding-top in pixels (globals.css sets 96px to clear the header). */
function scrollPaddingTop(html: HTMLElement) {
  const value = getComputedStyle(html).scrollPaddingTop;
  const n = Number.parseFloat(value);
  if (!Number.isFinite(n) || n < 0) return 0;
  if (value.endsWith("px")) return n;
  if (value.endsWith("%")) return (n / 100) * html.clientHeight;
  return 0;
}

/**
 * Reproduces Next.js 16 App Router scrolling on client-side navigation
 * (next/dist/client/components/layout-router.js):
 *
 * - a link with a #hash scrolls that element into view;
 * - otherwise, if the top of the new page is already visible, nothing moves;
 * - otherwise the document scrolls to the top.
 *
 * It runs in a layout effect after reading layout, as Next.js does, so the
 * browser has already resized the document for the new page; scrolling
 * earlier is cancelled when the old, taller page's offset gets clamped.
 * CSS scroll-behavior (smooth, or auto for reduced motion) applies as in
 * Next.js 16 without data-scroll-behavior. Back/forward keeps the browser's
 * restored position.
 */
export function ScrollManager() {
  const { pathname, search, hash, key } = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    if (navigationType === "POP") return;
    const html = document.documentElement;

    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const target = id === "top" ? document.body : (document.getElementById(id) ?? document.getElementsByName(id)[0]);
      target?.scrollIntoView();
      return;
    }

    const page = document.getElementById("main");
    if (!page) return;
    const viewportHeight = html.clientHeight;
    const pageTop = () => page.getBoundingClientRect().top;
    const top = pageTop();
    if (top >= scrollPaddingTop(html) && top <= viewportHeight) return;

    html.scrollTop = 0;
    if (!(pageTop() >= scrollPaddingTop(html) && pageTop() <= viewportHeight)) page.scrollIntoView();
  }, [pathname, search, hash, key, navigationType]);

  return null;
}
