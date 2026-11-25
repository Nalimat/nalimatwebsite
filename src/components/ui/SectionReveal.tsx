"use client";

import { useEffect } from "react";

/**
 * One-time section fade, as on the Microsoft 365 product pages.
 *
 * Elements marked `data-reveal` that start below the fold are hidden after
 * hydration and fade in (opacity only, see globals.css) the first time they
 * scroll into view, then are left alone. Content already on screen is never
 * hidden, nothing happens without JavaScript, and visitors who prefer
 * reduced motion see everything immediately.
 *
 * Render once on a page whose sections use `<Section reveal>`.
 */
export function SectionReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.reveal = "shown";
          observer.unobserve(entry.target);
        }
      },
      // Start the fade once the content is a little way into the viewport.
      { rootMargin: "0px 0px -10% 0px" },
    );

    const fold = window.innerHeight * 0.9;
    for (const el of elements) {
      // Already visible (or scrolled past, e.g. after a #link): leave it shown.
      if (el.getBoundingClientRect().top < fold) continue;
      el.dataset.reveal = "pending";
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
      for (const el of elements) if (el.dataset.reveal === "pending") el.dataset.reveal = "";
    };
  }, []);

  return null;
}
