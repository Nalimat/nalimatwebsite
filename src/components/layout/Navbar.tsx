import { AppLink as Link } from "@/components/ui/AppLink";
import { useLocation } from "react-router";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { mainNav } from "@/content/site";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "./Logo";

function isActive(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

/**
 * Site header: a navy bar that joins the navy hero and page headers.
 * Links get an orange underline that grows on hover; the active page's
 * underline slides between items on navigation.
 */
export function Navbar() {
  const { pathname } = useLocation();
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
          "stage-dark top-0 z-50 border-b bg-navy text-white transition-[border-color,box-shadow] duration-300",
          isHome ? "relative" : "sticky",
          (scrolled && !isHome) || open
            ? "border-white/10 shadow-[0_10px_30px_-18px_rgb(5_14_25/0.9)]"
            : "border-transparent",
        )}
      >
        <Container className="flex h-[72px] items-center justify-between gap-6">
          <Logo tone="light" />

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
                        "group relative block rounded-md px-3.5 py-2 text-[0.9375rem] font-medium transition-colors",
                        active ? "text-white" : "text-on-navy hover:text-white",
                      )}
                    >
                      {item.label}
                      {active ? (
                        <motion.span
                          layoutId="nav-active"
                          aria-hidden
                          className="absolute inset-x-3.5 -bottom-[17px] h-0.5 rounded-full bg-accent"
                          transition={{ type: "spring", stiffness: 420, damping: 36 }}
                        />
                      ) : (
                        <span
                          aria-hidden
                          className="absolute inset-x-3.5 -bottom-[17px] h-0.5 origin-left scale-x-0 rounded-full bg-white/40 transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
                        />
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
              className="inline-flex h-11 w-11 items-center justify-center rounded-control text-white transition-colors hover:bg-white/10 lg:hidden"
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
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute inset-x-0 top-[72px] h-[calc(100dvh-72px)] overflow-y-auto border-t border-white/10 bg-navy lg:hidden"
            >
              <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 opacity-60" />
              <Container as="nav" className="relative py-6">
                <ul className="flex flex-col">
                  {[...mainNav, { label: "Contact", href: "/contact" }].map((item, i) => {
                    const active = isActive(pathname, item.href);
                    return (
                      <motion.li
                        key={item.href}
                        className="border-b border-white/10"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: 0.04 * i, ease: "easeOut" }}
                      >
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex items-center justify-between py-4 text-xl font-medium tracking-tight",
                            active ? "text-accent" : "text-white",
                          )}
                        >
                          {item.label}
                          <span aria-hidden className="eyebrow text-on-navy">
                            0{i + 1}
                          </span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
                <ButtonLink href="/contact?topic=project" size="lg" className="mt-8 w-full">
                  Start a Project
                </ButtonLink>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
