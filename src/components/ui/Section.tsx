import { cn } from "@/lib/cn";
import { Container } from "./Container";
import { SplitReveal } from "./SplitReveal";

type Tone = "canvas" | "surface" | "cream" | "navy";

const tones: Record<Tone, string> = {
  canvas: "bg-canvas text-navy",
  surface: "bg-surface text-navy",
  cream: "surface-cream text-navy",
  navy: "stage-dark relative isolate overflow-hidden bg-navy text-white",
};

/** Page section with consistent vertical rhythm. */
export function Section({
  id,
  tone = "canvas",
  className,
  containerClassName,
  labelledBy,
  reveal = true,
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  labelledBy?: string;
  /** Fade and rise the content in once on first view (on by default; see SectionReveal). */
  reveal?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("py-20 sm:py-24 lg:py-28", tones[tone], className)}
    >
      {tone === "navy" && <StageBackdrop />}
      <Container className={containerClassName}>{reveal ? <div data-reveal="">{children}</div> : children}</Container>
    </section>
  );
}

/** Decorative backdrop for navy stages: faint grid fading out, with a soft orange glow. */
export function StageBackdrop({ glow = "right" }: { glow?: "right" | "left" | "center" }) {
  const pos = { right: "75% 0%", left: "15% 10%", center: "50% 0%" }[glow];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_75%)]" />
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(42rem 26rem at ${pos}, rgb(240 96 32 / 0.16), transparent 70%)` }}
      />
    </div>
  );
}

/** Small monospace label above a heading, led by the logo's orange square. */
export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "eyebrow inline-flex items-center gap-2.5",
        tone === "dark" ? "text-accent" : "text-accent-ink",
        className,
      )}
    >
      <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-[2px] bg-accent" />
      {children}
    </p>
  );
}

/**
 * Section heading: an optional eyebrow, a title and an optional short intro,
 * laid out as a left-aligned two-column block on wide screens.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  action,
  tone = "light",
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  action?: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={cn("mb-12 grid gap-6 lg:mb-16 lg:grid-cols-12 lg:items-end", className)}>
      <div className="lg:col-span-7">
        {eyebrow && (
          <Eyebrow tone={tone} className="mb-5">
            {eyebrow}
          </Eyebrow>
        )}
        <h2 id={id} className="text-h2">
          <SplitReveal text={title} />
        </h2>
      </div>
      {(intro || action) && (
        <div className="flex flex-col gap-5 lg:col-span-5 lg:col-start-8">
          {intro && (
            <p className={cn("max-w-prose text-[1.0625rem]", tone === "dark" ? "text-on-navy" : "text-muted")}>
              {intro}
            </p>
          )}
          {action}
        </div>
      )}
    </div>
  );
}
