import type { Industry } from "@/content/industries";

export function IndustryGrid({ industries, detailed = false }: { industries: Industry[]; detailed?: boolean }) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-panel border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {industries.map((ind) => {
        const Icon = ind.icon;
        return (
          <li key={ind.slug} id={detailed ? ind.slug : undefined} className="bg-surface p-7 sm:p-8">
            <Icon size={22} strokeWidth={1.75} className="text-accent" aria-hidden />
            <h3 className="mt-6 text-h3">{ind.name}</h3>
            <p className="mt-3 text-[0.9375rem] text-muted">{ind.summary}</p>
            {detailed && (
              <ul className="mt-6 space-y-2 border-t border-line pt-5 text-[0.9375rem]">
                {ind.needs.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}
