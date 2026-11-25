import Link from "next/link";
import type { Service } from "@/content/services";
import { cn } from "@/lib/cn";

/**
 * Services as a ruled list rather than a card grid: services are capabilities,
 * so they read as an index, distinct from product showcases.
 */
export function ServiceList({ services, detailed = false }: { services: Service[]; detailed?: boolean }) {
  return (
    <ul className="border-t border-line">
      {services.map((s) => {
        const Icon = s.icon;
        return (
          <li
            key={s.slug}
            id={detailed ? s.slug : undefined}
            className={cn("grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-8", detailed && "py-12")}
          >
            <div className="flex items-start gap-4 md:col-span-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-control border border-line bg-surface text-navy">
                <Icon size={20} aria-hidden strokeWidth={1.75} />
              </span>
              <h3 className={cn("pt-2", detailed ? "text-h3 sm:text-2xl sm:tracking-tight" : "text-h3")}>
                {detailed ? (
                  s.name
                ) : (
                  <Link href={`/services#${s.slug}`} className="hover:text-accent-ink">
                    {s.name}
                  </Link>
                )}
              </h3>
            </div>
            <div className="md:col-span-7 md:pt-2">
              <p className="text-muted">{s.summary}</p>
              {detailed && (
                <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {s.includes.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[0.9375rem]">
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
