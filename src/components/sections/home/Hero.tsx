import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow, StageBackdrop } from "@/components/ui/Section";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { HeroVisual } from "./HeroVisual";

const ease = [0.22, 1, 0.36, 1] as const;

/** Staggered entrance for the hero's supporting elements. */
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

/**
 * Navy hero: drifting aurora light, a cursor spotlight, a word-by-word
 * headline and the connected-operations illustration. As the hero scrolls
 * away, the illustration drifts up slower than the page and the text softens
 * (scroll-linked, never scroll-jacking). Reduced motion keeps it static.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.35]);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="stage-dark spotlight spotlight-hero relative isolate overflow-hidden bg-navy text-white"
    >
      {/* Aurora: slow drifting light fields (decorative) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <div
          className="aurora-a absolute -top-1/3 right-[-10%] h-[52rem] w-[52rem] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgb(240 96 32 / 0.24), transparent)" }}
        />
        <div
          className="aurora-b absolute -bottom-1/2 left-[-15%] h-[46rem] w-[46rem] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgb(117 133 107 / 0.22), transparent)" }}
        />
      </div>
      <StageBackdrop glow="right" />

      <Container className="grid items-center gap-12 pt-14 pb-16 sm:pt-20 lg:grid-cols-12 lg:gap-8 lg:pt-20 lg:pb-24">
        <motion.div className="lg:col-span-6" style={{ opacity: textOpacity }}>
          <motion.div {...rise(0)}>
            <Eyebrow tone="dark">Software &amp; Digital Solutions</Eyebrow>
          </motion.div>
          <h1 id="hero-title" className="mt-6 text-display">
            <SplitReveal text="Technology Built for the Way You Work." mode="mount" delay={0.1} stagger={0.07} />
          </h1>
          <motion.p className="mt-7 max-w-[34rem] text-lead text-on-navy" {...rise(0.55)}>
            {site.description}
          </motion.p>
          <motion.div className="mt-10 flex flex-col gap-3 sm:flex-row" {...rise(0.68)}>
            <ButtonLink href="/services" size="lg">
              Explore Our Solutions
            </ButtonLink>
            <ButtonLink href="/contact?topic=project" size="lg" variant="inverse">
              Start a Project
            </ButtonLink>
          </motion.div>
          <motion.ul
            aria-label="What we do"
            className="eyebrow mt-12 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-6 text-on-navy"
            {...rise(0.8)}
          >
            {services.map((s) => (
              <li key={s.slug} className="flex items-center gap-2">
                <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
                {s.name}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div className="lg:col-span-6" style={{ y: visualY }}>
          <HeroVisual />
        </motion.div>
      </Container>
    </section>
  );
}
