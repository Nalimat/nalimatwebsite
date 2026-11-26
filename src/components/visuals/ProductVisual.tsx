import type { Product } from "@/content/products";
import { cn } from "@/lib/cn";
import { InvoicyMockup } from "./InvoicyMockup";
import { StudataVisual } from "./StudataVisual";

/**
 * Navy stage holding a product's concept visual, with a visible label that
 * says what it is (a concept, not a shipped product or real data).
 * The parent should carry the `group` class for the hover tilt.
 */
export function ProductVisual({ product, className }: { product: Product; className?: string }) {
  const label =
    product.slug === "invoicy"
      ? "Concept preview · Sample data"
      : product.status === "Upcoming project"
        ? "Concept illustration · Upcoming project"
        : "Concept illustration";

  return (
    <div
      className={cn(
        "stage-dark relative isolate flex flex-col overflow-hidden rounded-[1.25rem] bg-navy px-5 pt-5 pb-6 sm:px-8 sm:pt-6 sm:pb-9",
        className,
      )}
    >
      <div aria-hidden className="grid-lines absolute inset-0 -z-10 opacity-80" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(28rem 16rem at 70% 100%, rgb(240 96 32 / 0.18), transparent 70%)" }}
      />
      <p className="eyebrow mb-5 text-[0.6875rem] text-on-navy sm:mb-7">{label}</p>
      <div className="mx-auto my-auto w-full max-w-[520px]">
        {product.slug === "invoicy" ? <InvoicyMockup /> : <StudataVisual />}
      </div>
    </div>
  );
}
