"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { mainNav } from "@/content/site";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "./Logo";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const topSentinel = useRef<HTMLSpanElement>(null);
  const menuId = useId();
  // The homepage has its own sticky section navigation, so the site header
  // scrolls away there and only one bar is ever pinned to the top.
  const isHome = pathname === "/";

  // Close the mobile menu on route change.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Show the header border once the page has scrolled (observer, no scroll listener).
  useEffect(() => {
    const el = topSentinel.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <span ref={topSentinel} aria-hidden className="pointer-events-none absolute top-2 left-0 h-px w-px" />
      <header
        className={cn(
          "top-0 z-50 border-b bg-canvas/90 backdrop-blur-md transition-colors",
          isHome ? "relative" : "sticky",
          (scrolled && !isHome) || open ? "border-line" : "border-transparent",
        )}
      >
        <Container className="flex h-[72px] items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative rounded-md px-3 py-2 text-[0.9375rem] font-medium transition-colors",
                        active ? "text-navy" : "text-muted hover:text-navy",
                      )}
                    >
                      {item.label}
                      {active && (
                        <span aria-hidden className="absolute inset-x-3 -bottom-[17px] h-0.5 rounded-full bg-accent" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <ButtonLink href="/contact">Contact us</ButtonLink>
            </div>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-control text-navy hover:bg-navy/5 lg:hidden"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </Container>

        <AnimatePresence>
          {open && (
            <motion.div
              id={menuId}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute inset-x-0 top-[72px] h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-canvas lg:hidden"
            >
              <Container as="nav" className="py-6">
                <ul className="flex flex-col">
                  {[...mainNav, { label: "Contact", href: "/contact" }].map((item) => {
                    const active = isActive(pathname, item.href);
                    return (
                      <li key={item.href} className="border-b border-line">
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex items-center justify-between py-4 text-xl font-medium tracking-tight",
                            active ? "text-accent-ink" : "text-navy",
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <ButtonLink href="/contact?topic=project" size="lg" className="mt-8 w-full">
                  Start a project
                </ButtonLink>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
