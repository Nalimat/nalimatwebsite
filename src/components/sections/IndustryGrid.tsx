import type { Industry } from "@/content/industries";
import { cn } from "@/lib/cn";

/** Who We Work With: one card per audience, lifting slightly on hover. */
export function IndustryGrid({ industries, detailed = false }: { industries: Industry[]; detailed?: boolean }) {
  return (
    <ul
      className={cn(
        "reveal-stagger grid gap-5 sm:grid-cols-2",
        // Fill complete rows: four entries form one row, otherwise rows of three.
        industries.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
      )}
    >
      {industries.map((ind, i) => {
        const Icon = ind.icon;
        return (
          <li
            key={ind.slug}
            id={detailed ? ind.slug : undefined}
            className="spotlight group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-line bg-surface p-7 transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-navy/20 hover:shadow-[0_24px_44px_-32px_rgb(16_36_58/0.55)] motion-reduce:transform-none"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-[0.875rem] bg-cream text-navy transition-colors duration-300 group-hover:bg-navy group-hover:text-white">
                <Icon size={22} strokeWidth={1.75} aria-hidden />
              </span>
              <span aria-hidden className="eyebrow text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-8 text-h3">{ind.name}</h3>
            <p className="mt-3 text-[0.9375rem] text-muted">{ind.summary}</p>
            {detailed && ind.needs.length > 0 && (
              <ul className="mt-6 space-y-2 border-t border-line pt-5 text-[0.9375rem]">
                {ind.needs.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            )}
            <span
              aria-hidden
              className="absolute inset-x-7 bottom-0 h-0.5 origin-left scale-x-0 rounded-full bg-accent transition-transform duration-500 group-hover:scale-x-100 motion-reduce:transition-none"
            />
          </li>
        );
      })}
    </ul>
  );
}
