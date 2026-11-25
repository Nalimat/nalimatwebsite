import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Nalimat wordmark with monogram.
 * Replace the SVG mark with the official logo file when available
 * (e.g. <Image src="/brand/nalimat-logo.svg" ... />).
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("h-8 w-8", className)}>
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <path d="M9.5 23V9h2.6l7.4 9.9V9h3v14h-2.6l-7.4-9.9V23h-3Z" fill="#fff" />
      <rect x="22.5" y="20" width="3" height="3" rx="0.6" fill="#F06020" />
    </svg>
  );
}

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Nalimat home"
      className={cn(
        "inline-flex items-center gap-2.5 text-[1.3125rem] font-semibold tracking-[-0.03em]",
        tone === "dark" ? "text-navy" : "text-white",
        className,
      )}
    >
      <LogoMark className={tone === "dark" ? "text-navy" : "text-navy-700"} />
      <span>Nalimat</span>
    </Link>
  );
}
