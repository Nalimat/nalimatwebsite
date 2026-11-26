import { cn } from "@/lib/cn";

type Tone = "neutral" | "accent" | "navy";

const tones: Record<Tone, string> = {
  neutral: "border-line bg-canvas text-muted",
  accent: "border-accent/25 bg-accent/8 text-accent-ink",
  navy: "border-white/15 bg-white/5 text-on-navy",
};

const dots = { accent: "bg-accent", sage: "bg-sage" } as const;

export function Badge({
  tone = "neutral",
  dot,
  className,
  children,
}: {
  tone?: Tone;
  /** Optional status dot before the label. */
  dot?: keyof typeof dots;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.8125rem] font-medium",
        tones[tone],
        className,
      )}
    >
      {dot && <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", dots[dot])} />}
      {children}
    </span>
  );
}
