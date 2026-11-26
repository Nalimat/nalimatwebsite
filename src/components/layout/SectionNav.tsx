import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export type SectionLink = { id: string; label: string };
type Cta = { label: string; href: string };

/**
 * In-page section navigation, modelled on the Microsoft 365 product pages.
 *
 * 1. A full-width bar sits in the page flow below the hero and scrolls away
 *    with the page like any other content.
 * 2. Once it has scrolled past the top, a separate floating bar (solid,
 *    inset, light shadow) fades in at the top of the viewport and stays
 *    pinned while the sections scroll underneath it.
 *
 * The floating bar fades in and eases down 8px; the active underline slides
 * between links. Neither moves for visitors who prefer reduced motion.
 * Links are plain #anchors, so scrolling stays browser-native; smooth
 * scrolling and the offset that keeps headings clear of the bar come from
 * `scroll-behavior` and `scroll-padding-top` in globals.css.
 * State comes from IntersectionObserver; there are no scroll listeners.
 */
export function SectionNav({
  sections,
  cta = { label: "Contact us", href: "/contact" },
}: {
  sections: SectionLink[];
  cta?: Cta;
}) {
  const inlineRef = useRef<HTMLElement>(null);
  const floatingListRef = useRef<HTMLUListElement>(null);
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Show the floating bar once the in-page bar has scrolled above the viewport.
  useEffect(() => {
    const bar = inlineRef.current;
    if (!bar) return;
    const observer = new IntersectionObserver(([entry]) =>
      setPinned(!entry.isIntersecting && entry.boundingClientRect.top < 0),
    );
    observer.observe(bar);
    return () => observer.disconnect();
  }, []);

  // Current section: the one crossing a thin line 30% down the viewport.
  // Sections are contiguous, so at most one crosses it at a time.
  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting);
        setActive(sections.find((s) => visible.get(s.id))?.id ?? null);
      },
      { rootMargin: "-30% 0px -69% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [sections]);

  // On narrow screens the links scroll sideways inside the floating bar;
  // keep the current one in view (moves the bar's own scroll, never the page).
  useEffect(() => {
    const list = floatingListRef.current;
    if (!list || !active || list.scrollWidth <= list.clientWidth) return;
    const link = list.querySelector<HTMLElement>(`a[href="#${active}"]`);
    if (!link) return;
    list.scrollLeft = Math.max(0, link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2);
  }, [active]);

  return (
    <>
      {/* In-page bar: scrolls with the page. */}
      <nav ref={inlineRef} aria-label="Sections on this page" className="border-t border-line bg-surface">
        <div className="mx-auto flex h-14 max-w-[1200px] items-center gap-4 px-5 sm:px-8">
          <SectionLinks sections={sections} active={active} indicatorId="section-active-inline" />
          <CtaButton cta={cta} />
        </div>
      </nav>

      {/* Floating bar: pinned to the top once the in-page bar has gone. */}
      <div
        className={cn(
          "pointer-events-none fixed inset-x-0 top-3 z-40 px-3 transition-[opacity,visibility,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none motion-reduce:transition-none sm:px-8",
          pinned ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
        )}
      >
        <nav
          aria-label="Sections on this page"
          inert={!pinned}
          className="pointer-events-auto mx-auto max-w-[1136px] rounded-[0.875rem] border border-line bg-surface shadow-[0_6px_24px_-12px_rgba(16,36,58,0.25)]"
        >
          <div className="flex h-14 items-center gap-4 px-2 sm:px-3">
            <SectionLinks sections={sections} active={active} listRef={floatingListRef} indicatorId="section-active-floating" />
            <CtaButton cta={cta} />
          </div>
        </nav>
      </div>
    </>
  );
}

function SectionLinks({
  sections,
  active,
  listRef,
  indicatorId,
}: {
  sections: SectionLink[];
  active: string | null;
  listRef?: React.Ref<HTMLUListElement>;
  /** Shared layout id so the active underline slides between links. */
  indicatorId: string;
}) {
  return (
    <ul
      ref={listRef}
      className="-mx-1 flex min-w-0 flex-1 items-center gap-1 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <li key={s.id} className="shrink-0">
            <a
              href={`#${s.id}`}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "relative block rounded-md px-3 py-2 text-[0.9375rem] font-medium whitespace-nowrap transition-colors",
                isActive ? "text-navy" : "text-muted hover:text-navy",
              )}
            >
              {s.label}
              {isActive && (
                <motion.span
                  layoutId={indicatorId}
                  aria-hidden
                  className="absolute inset-x-3 bottom-0.5 h-0.5 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 420, damping: 38 }}
                />
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function CtaButton({ cta }: { cta: Cta }) {
  return (
    <div className="hidden shrink-0 sm:block">
      <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
    </div>
  );
}
