import { AppLink as Link } from "@/components/ui/AppLink";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/content/services";
import { ServiceArt } from "@/components/visuals/ServiceArt";
import { cn } from "@/lib/cn";

const number = (i: number) => String(i + 1).padStart(2, "0");

/**
 * Services with an editorial illustration each.
 * - Compact (homepage): a 2×2 grid of cards that lift on hover.
 * - Detailed (Services page): large alternating rows with anchor ids.
 */
export function ServiceList({ services, detailed = false }: { services: Service[]; detailed?: boolean }) {
  if (!detailed) {
    return (
      <ul className="reveal-stagger grid gap-5 sm:grid-cols-2">
        {services.map((s, i) => (
          <li
            key={s.slug}
            className="spotlight group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-line bg-surface p-3 transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-navy/20 hover:shadow-[0_28px_50px_-34px_rgb(16_36_58/0.55)] motion-reduce:transform-none"
          >
            <div className="grid-lines-light rounded-[1.1rem] bg-canvas px-6 pt-6 pb-3 sm:px-10">
              <ServiceArt slug={s.slug} />
            </div>
            <div className="flex flex-1 flex-col px-4 pt-6 pb-4 sm:px-5">
              <p className="eyebrow text-accent-ink">{number(i)}</p>
              <h3 className="mt-3 text-[1.375rem] leading-snug font-semibold tracking-tight">
                <Link href={`/services#${s.slug}`} className="after:absolute after:inset-0 after:rounded-[1.5rem]">
                  {s.name}
                </Link>
              </h3>
              <p className="mt-2.5 text-muted">{s.summary}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.9375rem] font-medium">
                Learn more
                <ArrowRight
                  size={16}
                  aria-hidden
                  className="text-accent-ink transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </span>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="reveal-stagger flex flex-col gap-6 lg:gap-8">
      {services.map((s, i) => (
        <li
          key={s.slug}
          id={s.slug}
          className="spotlight group relative grid items-center gap-8 rounded-[1.75rem] border border-line bg-surface p-3 sm:p-4 lg:grid-cols-12 lg:gap-12"
        >
          <div
            className={cn(
              "grid-lines-light rounded-[1.25rem] bg-canvas px-6 pt-8 pb-5 sm:px-12 lg:col-span-6",
              i % 2 === 1 && "lg:order-2",
            )}
          >
            <ServiceArt slug={s.slug} />
          </div>
          <div className={cn("px-4 pb-6 sm:px-6 lg:col-span-6 lg:py-6", i % 2 === 1 ? "lg:order-1 lg:pl-8" : "lg:pr-10")}>
            <p className="eyebrow text-accent-ink">Service {number(i)}</p>
            <h3 className="mt-4 text-h2">{s.name}</h3>
            <p className="mt-5 text-lead text-muted">{s.summary}</p>
            {s.includes.length > 0 && (
              <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {s.includes.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[0.9375rem]">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-sage" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
