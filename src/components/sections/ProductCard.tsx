import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import type { Product, ProductStatus } from "@/content/products";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/cn";

const statusTone: Record<ProductStatus, "accent" | "neutral"> = {
  Available: "accent",
  "In beta": "neutral",
  "In development": "neutral",
};

/** Compact product card for listings (homepage). */
export function ProductCard({ product, className }: { product: Product; className?: string }) {
  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-panel border border-line bg-surface p-7 transition-colors hover:border-navy/30",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted">{product.category}</p>
        <Badge tone={statusTone[product.status]}>{product.status}</Badge>
      </div>
      <h3 className="mt-10 text-h3">
        <Link href={`/products#${product.slug}`} className="after:absolute after:inset-0">
          {product.name}
        </Link>
      </h3>
      <p className="mt-3 text-muted">{product.summary}</p>
      <span className="mt-8 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-navy group-hover:text-accent-ink">
        View product
        <ArrowUpRight size={16} aria-hidden />
      </span>
    </article>
  );
}

/** Full-width product feature used on the Products page. */
export function ProductFeature({ product, index }: { product: Product; index: number }) {
  const external = product.url.length > 0;
  return (
    <article
      id={product.slug}
      className="grid gap-10 rounded-panel border border-line bg-surface p-7 sm:p-10 lg:grid-cols-12"
    >
      <div className="lg:col-span-7">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm text-muted">{product.category}</p>
          <Badge tone={statusTone[product.status]}>{product.status}</Badge>
        </div>
        <h2 className="mt-6 text-h2">{product.name}</h2>
        <p className="mt-5 text-lead text-muted">{product.description}</p>
        <p className="mt-6 text-[0.9375rem]">
          <span className="font-medium">Built for: </span>
          <span className="text-muted">{product.audience}</span>
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {external ? (
            <ButtonLink href={product.url} target="_blank" rel="noopener noreferrer">
              Visit product site
              <ArrowUpRight size={16} aria-hidden />
            </ButtonLink>
          ) : (
            <ButtonLink href={`/contact?topic=demo&product=${product.slug}`}>Request a demo</ButtonLink>
          )}
          <ButtonLink href={`/contact?topic=product&product=${product.slug}`} variant="secondary">
            Ask a question
          </ButtonLink>
        </div>
      </div>
      <div className="rounded-[0.875rem] bg-canvas p-6 sm:p-8 lg:col-span-5">
        <h3 className="text-sm font-semibold">What it does</h3>
        <ul className="mt-5 space-y-4">
          {product.capabilities.map((c, i) => (
            <li key={`${product.slug}-${i}`} className="flex gap-3">
              <Check size={18} className="mt-1 shrink-0 text-accent" aria-hidden />
              <span>{c}</span>
            </li>
          ))}
        </ul>
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
      body="Full product pages will be published here soon. To learn what Nalimat offers today, ask our team for a walkthrough."
      action={
        <ButtonLink href="/contact?topic=product" variant="secondary">
          Ask about our products
        </ButtonLink>
      }
    />
  );
}
