import { cn } from "@/lib/cn";

type Tone = "neutral" | "accent" | "navy";

const tones: Record<Tone, string> = {
  neutral: "border-line bg-canvas text-muted",
  accent: "border-accent/25 bg-accent/8 text-accent-ink",
  navy: "border-white/15 bg-white/5 text-on-navy",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.8125rem] font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
