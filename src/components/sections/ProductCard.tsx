import { AppLink as Link } from "@/components/ui/AppLink";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import type { Product, ProductStatus } from "@/content/products";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProductVisual } from "@/components/visuals/ProductVisual";
import { cn } from "@/lib/cn";

const statusDot: Record<ProductStatus, "accent" | "sage"> = {
  Available: "accent",
  "Currently developing": "accent",
  "Upcoming project": "sage",
};

/**
 * Product showcase card for the homepage's navy product stage: concept
 * visual on top, name, tagline and status below. The whole card links to the
 * product on the Products page; it lifts and the visual tilts on hover.
 */
export function ProductCard({ product, className }: { product: Product; className?: string }) {
  return (
    <article
      className={cn(
        "spotlight spotlight-dark group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-navy-800/50 p-3 transition-[transform,border-color,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-white/25 hover:bg-navy-800/80 motion-reduce:transform-none",
        className,
      )}
    >
      <ProductVisual product={product} className="flex-1" />
      <div className="flex flex-col px-4 pt-6 pb-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="eyebrow text-on-navy">{product.category}</p>
          <Badge tone="navy" dot={statusDot[product.status]}>
            {product.status}
          </Badge>
        </div>
        <h3 className="mt-5 text-[1.75rem] leading-tight font-semibold tracking-tight">
          <Link href={`/products#${product.slug}`} className="after:absolute after:inset-0 after:rounded-[1.5rem]">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 text-lead text-on-navy">{product.tagline}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-white">
          View product
          <ArrowRight
            size={16}
            aria-hidden
            className="text-accent transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
          />
        </span>
      </div>
    </article>
  );
}

/** Full product feature used on the Products page. */
export function ProductFeature({ product, index }: { product: Product; index: number }) {
  const external = product.url.length > 0;
  // Only an available product offers a demo; products still being built only invite questions.
  const available = product.status === "Available";
  const flip = index % 2 === 1;
  return (
    <article
      id={product.slug}
      className="spotlight group relative grid gap-8 rounded-[1.75rem] border border-line bg-surface p-3 shadow-[0_30px_60px_-50px_rgb(16_36_58/0.5)] sm:p-4 lg:grid-cols-12 lg:gap-10"
    >
      <ProductVisual product={product} className={cn("lg:col-span-6", flip && "lg:order-2")} />

      <div className={cn("px-4 pb-6 sm:px-6 lg:col-span-6 lg:py-8", flip ? "lg:order-1 lg:pl-8" : "lg:pr-8")}>
        <div className="flex flex-wrap items-center gap-3">
          <p className="eyebrow text-accent-ink">{product.category}</p>
          <Badge tone={product.status === "Upcoming project" ? "neutral" : "accent"} dot={statusDot[product.status]}>
            {product.status}
          </Badge>
        </div>
        <h2 className="mt-5 text-h2">{product.name}</h2>
        <p className="mt-2 text-h3">{product.tagline}</p>
        <p className="mt-5 text-muted">{product.description}</p>
        <p className="mt-4 text-[0.9375rem]">
          <span className="font-medium">Built for: </span>
          <span className="text-muted">{product.audience}</span>
        </p>

        <h3 className="eyebrow mt-8 text-navy">{product.featuresLabel}</h3>
        <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {product.capabilities.map((c, i) => (
            <li key={`${product.slug}-${i}`} className="flex gap-2.5 text-[0.9375rem]">
              <Check size={17} className="mt-1 shrink-0 text-sage" aria-hidden />
              <span>{c}</span>
            </li>
          ))}
        </ul>

        <p className="mt-8 border-l-2 border-accent pl-4 font-medium">{product.statement}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          {external ? (
            <ButtonLink href={product.url} target="_blank" rel="noopener noreferrer">
              Visit product site
              <ArrowUpRight size={16} aria-hidden />
            </ButtonLink>
          ) : available ? (
            <ButtonLink href={`/contact?topic=demo&product=${product.slug}`}>Request a demo</ButtonLink>
          ) : null}
          <ButtonLink
            href={`/contact?topic=product&product=${product.slug}`}
            variant={external || available ? "secondary" : "primary"}
          >
            {external || available ? "Ask a question" : `Ask about ${product.name}`}
          </ButtonLink>
        </div>
        <p className="sr-only">Product {index + 1}</p>
      </div>
    </article>
  );
}

/** Shown while no product has confirmed details. Makes no claims about specific products. */
export function ProductsPending() {
  return (
    <EmptyState
      title="Product details are being prepared"
      body="Full product pages will be published here soon. To learn what NALIMAT offers today, ask our team for a walkthrough."
      action={
        <ButtonLink href="/contact?topic=product" variant="secondary">
          Ask about our products
        </ButtonLink>
      }
    />
  );
}
