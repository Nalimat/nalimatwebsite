import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { processSteps } from "@/content/approach";
import { cn } from "@/lib/cn";

// useLayoutEffect warns during the server prerender; fall back to useEffect there.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const STEP_MS = 520;
const EASE = [0.22, 1, 0.36, 1] as const;

type Point = { x: number; y: number };

/**
 * "Our Process" as a relay timeline. When it scrolls into view the steps light
 * up one after another: the line fills to each node, the node turns orange with
 * a small pop and a ripple, and its text brightens and rises. Once all steps are
 * lit, a soft glow travels along the line every few seconds. Hovering a step
 * lifts its node. Horizontal from lg, vertical below; the line runs between the
 * measured node centres so it fits either layout. Reduced motion shows every
 * step lit, with no sequence or glow. Content: brand document, section 07.
 */
export function ProcessTimeline({ stepHeading: Step = "h3" }: { stepHeading?: "h3" | "h4" }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const inView = useInView(rootRef, { once: true, amount: 0.45 });
  const reduce = useReducedMotion();
  const total = processSteps.length;

  const [lit, setLit] = useState(0);
  const [centres, setCentres] = useState<Point[]>([]);
  const shown = reduce ? total : lit;

  // Light the steps one by one once the timeline is in view.
  useEffect(() => {
    if (!inView || reduce) return;
    let n = 0;
    const id = window.setInterval(() => {
      n += 1;
      setLit(n);
      if (n >= total) window.clearInterval(id);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [inView, reduce, total]);

  // Measure node centres (relative to the root) for the line, on mount and resize.
  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const measure = () => {
      const base = root.getBoundingClientRect();
      setCentres(
        nodeRefs.current.map((el) => {
          const r = el?.getBoundingClientRect();
          return r ? { x: r.left - base.left + r.width / 2, y: r.top - base.top + r.height / 2 } : { x: 0, y: 0 };
        }),
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    return () => ro.disconnect();
  }, []);

  const first = centres[0];
  const last = centres[total - 1];
  const horizontal = !!first && !!last && Math.abs(last.x - first.x) > Math.abs(last.y - first.y);
  const reach = shown > 0 && centres[shown - 1] ? centres[shown - 1] : first;
  const span = first && last ? (horizontal ? last.x - first.x : last.y - first.y) : 0;
  const filled = first && reach ? (horizontal ? reach.x - first.x : reach.y - first.y) : 0;
  const done = shown >= total;

  return (
    <div ref={rootRef} className="relative">
      {first && last && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {/* Track */}
          <div
            className={cn("absolute rounded-full bg-line", horizontal ? "h-0.5 -translate-y-1/2" : "w-0.5 -translate-x-1/2")}
            style={horizontal ? { left: first.x, top: first.y, width: span } : { left: first.x, top: first.y, height: span }}
          />
          {/* Fill, growing to the last lit node */}
          <motion.div
            className={cn(
              "absolute rounded-full",
              horizontal
                ? "h-0.5 -translate-y-1/2 bg-[linear-gradient(90deg,var(--color-accent),var(--color-sage))]"
                : "w-0.5 -translate-x-1/2 bg-[linear-gradient(180deg,var(--color-accent),var(--color-sage))]",
            )}
            style={horizontal ? { left: first.x, top: first.y } : { left: first.x, top: first.y }}
            initial={false}
            animate={horizontal ? { width: filled } : { height: filled }}
            transition={{ duration: reduce ? 0 : STEP_MS / 1000, ease: EASE }}
          />
          {/* Travelling glow once every step is lit */}
          {done && !reduce && span > 0 && (
            <motion.span
              className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_4px_rgb(240_96_32/0.45)]"
              initial={{ left: first.x, top: first.y, opacity: 0 }}
              animate={{
                left: horizontal ? [first.x, last.x] : first.x,
                top: horizontal ? first.y : [first.y, last.y],
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 2.6, delay: 0.6 }}
            />
          )}
        </div>
      )}

      <ol className="relative grid gap-8 lg:grid-cols-5 lg:gap-6">
        {processSteps.map((s, i) => {
          const on = i < shown;
          return (
            <li key={s.title} className="group relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
              <span
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                className="relative z-10 shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-1 motion-reduce:transition-none"
              >
                {/* Ripple when the step lights */}
                {on && !reduce && (
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full border-2 border-accent"
                    initial={{ scale: 1, opacity: 0.7 }}
                    animate={{ scale: 1.9, opacity: 0 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                  />
                )}
                <motion.span
                  className={cn(
                    "relative flex h-11 w-11 items-center justify-center rounded-full border font-mono text-sm font-semibold shadow-[0_0_0_6px_var(--color-surface)] transition-[background-color,border-color,color,box-shadow] duration-300",
                    on
                      ? "border-transparent bg-accent-strong text-white group-hover:shadow-[0_0_0_6px_var(--color-surface),0_10px_22px_-8px_rgb(200_75_18/0.7)]"
                      : "border-accent/40 bg-surface text-accent-ink",
                  )}
                  initial={false}
                  animate={on && !reduce ? { scale: [1, 1.16, 1] } : { scale: 1 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.span>
              </span>
              <motion.div
                className="pt-1.5 lg:mt-5 lg:px-2 lg:pt-0"
                initial={false}
                animate={on ? { opacity: 1, y: 0 } : { opacity: 0.35, y: 8 }}
                transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
              >
                <Step className="text-h3">{s.title}</Step>
                <p className="mt-2 text-[0.9375rem] text-muted">{s.body}</p>
              </motion.div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
