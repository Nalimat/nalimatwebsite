import { AppLink as Link } from "@/components/ui/AppLink";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-control font-medium whitespace-nowrap transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-px active:translate-y-0 motion-reduce:transform-none disabled:translate-y-0 disabled:shadow-none disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "btn-sheen bg-accent-strong text-white shadow-[0_1px_0_rgb(255_255_255/0.18)_inset] hover:bg-accent-ink hover:shadow-[0_10px_24px_-12px_rgb(200_75_18/0.8)]",
  secondary: "border border-line bg-surface text-navy hover:border-navy/40 hover:shadow-[0_8px_20px_-14px_rgb(16_36_58/0.45)]",
  ghost: "text-navy hover:bg-navy/5",
  inverse: "btn-sheen border border-white/25 text-white hover:border-white/45 hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-13 px-6 text-base",
};

// Shared class helper (unchanged from the Next.js version); fast refresh falls back to a full reload for this file.
// eslint-disable-next-line react-refresh/only-export-components
export function buttonStyles(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type CommonProps = { variant?: Variant; size?: Size; className?: string; children: React.ReactNode };

export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  ...rest
}: CommonProps & { href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link href={href} className={buttonStyles(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant,
  size,
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={buttonStyles(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
