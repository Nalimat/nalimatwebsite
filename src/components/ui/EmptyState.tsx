import { cn } from "@/lib/cn";

/** Shown when a content list (articles, roles, case studies) has no entries yet. */
export function EmptyState({
  title,
  body,
  action,
  className,
}: {
  title: string;
  body: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-4 rounded-panel border border-dashed border-line bg-surface p-8 sm:p-10",
        className,
      )}
    >
      <h3 className="text-h3">{title}</h3>
      <p className="max-w-xl text-muted">{body}</p>
      {action}
    </div>
  );
}
