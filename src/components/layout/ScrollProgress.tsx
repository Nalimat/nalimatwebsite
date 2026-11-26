import { motion, useScroll, useSpring } from "framer-motion";

/** Thin orange reading-progress bar along the top of the viewport. Decorative. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-[linear-gradient(90deg,var(--color-accent),#ffb38a)]"
      style={{ scaleX }}
    />
  );
}
