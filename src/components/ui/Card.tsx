import { cn } from "@/lib/cn";

/** Base white panel used for product, industry and content cards. */
export function Card({
  as: Tag = "div",
  className,
  children,
}: {
  as?: "div" | "article" | "li";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag className={cn("rounded-panel border border-line bg-surface p-6 sm:p-8", className)}>{children}</Tag>
  );
}
