import { technologies } from "@/content/technologies";

export function TechStack({ tone = "navy" }: { tone?: "navy" | "light" }) {
  const dark = tone === "navy";
  return (
    <dl
      className={
        dark
          ? "reveal-stagger divide-y divide-white/10 border-y border-white/10"
          : "reveal-stagger divide-y divide-line border-y border-line"
      }
    >
      {technologies.map((g) => (
        <div key={g.area} className="grid gap-3 py-6 sm:grid-cols-12 sm:items-baseline">
          <dt className={`font-medium sm:col-span-3 ${dark ? "text-white" : "text-navy"}`}>{g.area}</dt>
          <dd className="sm:col-span-9">
            <ul className="flex flex-wrap gap-2">
              {g.items.map((t) => (
                <li
                  key={t}
                  className={
                    dark
                      ? "rounded-full border border-white/15 px-3.5 py-1 text-[0.9375rem] text-on-navy transition-colors duration-300 hover:border-accent/70 hover:bg-white/5 hover:text-white"
                      : "rounded-full border border-line bg-surface px-3.5 py-1 text-[0.9375rem] text-muted transition-colors duration-300 hover:border-navy/30 hover:text-navy"
                  }
                >
                  {t}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}
