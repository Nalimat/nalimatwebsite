import { products } from "@/content/products";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProductFeature, ProductsPending } from "@/components/sections/ProductCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Products",
  description:
    "Software platforms and applications designed, built and maintained by Nalimat to help businesses run more simply.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        title="Software products built and maintained by Nalimat"
        intro="Our products are ready-to-adopt platforms and applications. We own them, support them and keep improving them based on how customers use them."
      >
        {products.length > 1 && (
          <nav aria-label="Products on this page" className="flex flex-wrap gap-2">
            {products.map((p) => (
              <a
                key={p.slug}
                href={`#${p.slug}`}
                className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-[0.9375rem] hover:border-navy/40"
              >
                {p.name}
              </a>
            ))}
          </nav>
        )}
      </PageHeader>

      <Section className="!pt-16">
        <h2 className="sr-only">All products</h2>
        {products.length > 0 ? (
          <div className="flex flex-col gap-8">
            {products.map((p, i) => (
              <ProductFeature key={p.slug} product={p} index={i} />
            ))}
          </div>
        ) : (
          <ProductsPending />
        )}

        <div className="mt-16 flex flex-col items-start gap-5 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-muted">
            Need something our products do not cover? Our services team builds custom software around your process.
          </p>
          <ButtonLink href="/services" variant="secondary">
            Explore our services
          </ButtonLink>
        </div>
      </Section>

      <CtaBand
        title="See a product in action"
        body="Book a walkthrough with our team. We will show the product with your use case in mind and answer your questions."
        primary={{ label: "Request a demo", href: "/contact?topic=demo" }}
        secondary={{ label: "Talk to our team", href: "/contact" }}
      />
    </>
  );
}
