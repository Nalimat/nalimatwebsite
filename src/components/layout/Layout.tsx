import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { motion } from "framer-motion";
import { MotionProvider } from "./MotionProvider";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollManager } from "./ScrollManager";
import { ScrollProgress } from "./ScrollProgress";
import { ErrorBoundary } from "./ErrorBoundary";
import { SectionReveal } from "@/components/ui/SectionReveal";

/**
 * One delegated pointer listener drives every `.spotlight` card: it sets the
 * --mx/--my custom properties that position the card's glow (globals.css).
 */
function useSpotlight() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = (e.target as Element | null)?.closest?.<HTMLElement>(".spotlight");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
}

/** Root layout (formerly src/app/layout.tsx). <html>/<head> live in index.html. */
export function Layout() {
  const { pathname } = useLocation();
  useSpotlight();

  // Fade pages in on client-side navigation only: the first, prerendered
  // page is never hidden. Opacity only, so fixed-position bars inside a page
  // keep their positioning.
  const [lastPath, setLastPath] = useState(pathname);
  const [navigated, setNavigated] = useState(false);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setNavigated(true);
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-control bg-navy px-4 py-3 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <ScrollManager />
      <MotionProvider>
        <ScrollProgress />
        <Navbar />
        <main id="main" className="flex-1">
          <ErrorBoundary resetKey={pathname}>
            <motion.div
              key={pathname}
              initial={navigated ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Outlet />
            </motion.div>
          </ErrorBoundary>
        </main>
        <Footer />
        {/* Re-run the one-time section reveal for each page. */}
        <SectionReveal key={pathname} />
      </MotionProvider>
    </>
  );
}
