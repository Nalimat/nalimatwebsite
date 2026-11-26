import { motion, type Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Reveals text word by word: each word rises out of a clipping mask.
 * - mode "mount": plays on page load (hero and page headers).
 * - mode "inView": plays once when the heading scrolls into view.
 *
 * The whole phrase is observed (not each word: a word starts outside its
 * clipping mask, so it would never count as visible) and cues its words via
 * variants. Words stay real text, so headings read normally with assistive
 * technology. With reduced motion, or without JavaScript, every word is shown
 * in place (see .split-word in globals.css and the <noscript> style in
 * index.html).
 */
export function SplitReveal({
  text,
  mode = "inView",
  delay = 0,
  stagger = 0.055,
}: {
  text: string;
  mode?: "mount" | "inView";
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  const word: Variants = {
    hidden: { y: "110%" },
    show: (i: number) => ({ y: "0%", transition: { duration: 0.95, delay: delay + i * stagger, ease } }),
  };
  const play =
    mode === "mount"
      ? { animate: "show" }
      : { whileInView: "show", viewport: { once: true, margin: "0px 0px -8% 0px" } };

  return (
    <motion.span initial="hidden" {...play}>
      {words.map((w, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
            <motion.span className="split-word inline-block will-change-transform" variants={word} custom={i}>
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </motion.span>
  );
}
