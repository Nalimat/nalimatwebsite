import { AppLink as Link } from "@/components/ui/AppLink";
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
      aria-label="NALIMAT Technology home"
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

/** Simple round logo badge for the site header: the N monogram on a white disc. */
export function LogoBadge({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="NALIMAT Technology home"
      className={cn(
        "inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-navy shadow-[0_8px_24px_-10px_rgb(0_0_0/0.5)] transition-transform duration-200 ease-out hover:scale-[1.04] motion-reduce:transition-none",
        className,
      )}
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-7 w-7">
        <path d="M7.5 25V7h3.2l9.3 12.6V7h3.6v18h-3.2l-9.3-12.6V25H7.5Z" fill="currentColor" />
        <rect x="24.5" y="21.5" width="3.5" height="3.5" rx="0.7" fill="#F06020" />
      </svg>
    </Link>
  );
}
