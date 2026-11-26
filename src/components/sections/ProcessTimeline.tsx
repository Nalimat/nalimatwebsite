import { processSteps } from "@/content/approach";

/**
 * "Our Process" as a timeline: numbered nodes joined by a line that draws in
 * when the section is revealed (see .timeline-line in globals.css). Vertical
 * on small screens, horizontal from lg. Content: brand document, section 07.
 */
export function ProcessTimeline({ stepHeading: Step = "h3" }: { stepHeading?: "h3" | "h4" }) {
  return (
    <div className="relative">
      {/* Horizontal connector (lg+) */}
      <div
        aria-hidden
        className="timeline-line absolute top-[22px] right-[10%] left-[10%] hidden h-0.5 rounded-full bg-[linear-gradient(90deg,var(--color-accent),var(--color-sage))] lg:block"
      />
      {/* Vertical connector (below lg) */}
      <div aria-hidden className="absolute top-3 bottom-3 left-[21px] w-px bg-line lg:hidden" />

      <ol className="reveal-stagger grid gap-8 lg:grid-cols-5 lg:gap-6">
        {processSteps.map((s, i) => (
          <li key={s.title} className="relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
            <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-surface font-mono text-sm font-semibold text-accent-ink shadow-[0_0_0_6px_var(--color-canvas)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="pt-1.5 lg:mt-5 lg:px-2 lg:pt-0">
              <Step className="text-h3">{s.title}</Step>
              <p className="mt-2 text-[0.9375rem] text-muted">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
