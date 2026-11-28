import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { site } from "@/content/site";
import { services } from "@/content/services";

/**
 * Staggered entrance for the hero's supporting elements, in CSS (globals.css)
 * so it plays from the prerendered HTML at first paint, not after hydration.
 */
const rise = (delay: number, className = "", kind: "enter-rise" | "enter-slide" = "enter-rise") => ({
  className: `${kind} ${className}`.trim(),
  style: { animationDelay: `${delay}s` },
});

/** Hero background photographs, crossfaded in turn. The first is the LCP image. */
const slides = [
  { name: "city", width: 1824, height: 862, sizes: [768, 1280, 1824], position: "object-[64%_center] lg:object-center" },
  { name: "bamboo", width: 1672, height: 941, sizes: [768, 1280, 1672], position: "object-[40%_center] lg:object-center" },
  { name: "touch", width: 1672, height: 941, sizes: [768, 1280, 1672], position: "object-[60%_center] lg:object-center" },
] as const;
const SLIDE_MS = 6000;

/**
 * Navy hero over full-bleed photographs that crossfade every few seconds, a cursor spotlight and a
 * word-by-word headline. As the hero scrolls away, the photos drift up slower than the page and the text softens
 * (scroll-linked, never scroll-jacking). Reduced motion keeps it static.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setActive((i) => (i + 1) % slides.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [reduce]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.35]);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="stage-dark spotlight spotlight-hero relative isolate overflow-hidden bg-navy text-white"
    >
      {/* Full-bleed photographs (decorative), crossfading every SLIDE_MS; each settles
          from a slight zoom while it shows. A light navy wash behind the text (plus a text
          shadow) keeps the copy legible while the photo stays clear; a short fade
          into the next section. Reduced motion shows the first photograph, still. */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-x-0 -top-24 bottom-0 -z-10" style={{ y: visualY }}>
        {slides.map((slide, i) => {
          const on = i === active;
          const largest = slide.sizes[slide.sizes.length - 1];
          return (
            <motion.img
              key={slide.name}
              src={`/images/hero-${slide.name}-${largest}.webp`}
              srcSet={slide.sizes.map((w) => `/images/hero-${slide.name}-${w}.webp ${w}w`).join(", ")}
              sizes="100vw"
              alt=""
              width={slide.width}
              height={slide.height}
              fetchPriority={i === 0 ? "high" : "low"}
              decoding="async"
              initial={reduce ? false : { opacity: i === 0 ? 1 : 0, scale: 1.08 }}
              animate={{ opacity: on ? 1 : 0, scale: on || reduce ? 1 : 1.08 }}
              transition={{
                opacity: { duration: 1.4, ease: "easeInOut" },
                scale: on ? { duration: SLIDE_MS / 1000 + 1.4, ease: [0.22, 1, 0.36, 1] } : { duration: 0, delay: 1.4 },
              }}
              className={`absolute inset-0 h-full w-full object-cover ${slide.position}`}
            />
          );
        })}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-navy/45 to-navy/25 lg:from-navy/70 lg:via-navy/25 lg:via-45% lg:to-transparent" />
        <div className="absolute inset-x-0 top-24 h-56 bg-gradient-to-b from-navy/85 via-navy/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy to-transparent" />
      </motion.div>

      <Container className="grid items-center gap-12 pt-[calc(88px+3.5rem)] pb-16 sm:pt-[calc(88px+5rem)] lg:min-h-[50rem] lg:grid-cols-12 lg:gap-8 lg:pt-[calc(88px+6rem)] lg:pb-28">
        <motion.div className="lg:col-span-6 [text-shadow:0_1px_2px_rgb(0_0_0/0.45),0_4px_24px_rgb(0_0_0/0.4)]" style={{ opacity: textOpacity }}>
          <div {...rise(0)}>
            <Eyebrow tone="dark" className="text-white!">Software &amp; Digital Solutions</Eyebrow>
          </div>
          <h1 id="hero-title" className="mt-6 text-display">
            <SplitReveal text="Technology Built for the Way You Work." mode="mount" delay={0.1} stagger={0.07} />
          </h1>
          {/* The LCP element: rises but is never transparent, so it paints on the first frame. */}
          <p {...rise(0.3, "mt-7 max-w-[34rem] text-lead text-on-navy", "enter-slide")}>{site.description}</p>
          <div {...rise(0.68, "mt-10 flex flex-col gap-3 sm:flex-row")}>
            <ButtonLink href="/services" size="lg">
              Explore Our Solutions
            </ButtonLink>
            <ButtonLink href="/contact?topic=project" size="lg" variant="inverse">
              Start a Project
            </ButtonLink>
          </div>
          <ul
            aria-label="What we do"
            {...rise(0.8, "eyebrow mt-12 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-6 text-on-navy")}
          >
            {services.map((s) => (
              <li key={s.slug} className="flex items-center gap-2">
                <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
                {s.name}
              </li>
            ))}
          </ul>
        </motion.div>
      </Container>
    </section>
  );
}
