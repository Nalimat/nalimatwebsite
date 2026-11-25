import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Tone = "canvas" | "surface" | "navy";

const tones: Record<Tone, string> = {
  canvas: "bg-canvas text-navy",
  surface: "bg-surface text-navy",
  navy: "bg-navy text-white",
};

/** Page section with consistent vertical rhythm. */
export function Section({
  id,
  tone = "canvas",
  className,
  containerClassName,
  labelledBy,
  reveal = false,
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  labelledBy?: string;
  /** Fade the content in once on first view (needs <SectionReveal /> on the page). */
  reveal?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("py-20 sm:py-24 lg:py-28", tones[tone], className)}
    >
      <Container className={containerClassName}>{reveal ? <div data-reveal="">{children}</div> : children}</Container>
    </section>
  );
}

/**
 * Section heading: a title with an optional short intro, laid out as a
 * left-aligned two-column block on wide screens.
 */
export function SectionHeading({
  id,
  title,
  intro,
  action,
  tone = "light",
  className,
}: {
  id?: string;
  title: string;
  intro?: string;
  action?: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={cn("mb-12 grid gap-6 lg:mb-16 lg:grid-cols-12 lg:items-end", className)}>
      <h2 id={id} className="text-h2 lg:col-span-6">
        {title}
      </h2>
      {(intro || action) && (
        <div className="flex flex-col gap-5 lg:col-span-5 lg:col-start-8">
          {intro && (
            <p className={cn("max-w-prose", tone === "dark" ? "text-on-navy" : "text-muted")}>{intro}</p>
          )}
          {action}
        </div>
      )}
    </div>
  );
}
