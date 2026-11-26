import { products } from "@/content/products";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProductFeature, ProductsPending } from "@/components/sections/ProductCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";
import { Seo } from "@/components/layout/Seo";

const metadata = pageMetadata({
  title: "Products",
  description:
    "Invoicy, a quotation and invoice management application currently in development, and Studata, an upcoming student monitoring and management platform, from NALIMAT Technology.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <Seo {...metadata} />
      <PageHeader
        eyebrow="Our products"
        title="Solutions Designed to Solve Real Problems."
        intro="We develop digital products that make everyday tasks simpler, more organized and more efficient."
      >
        {products.length > 1 && (
          <nav aria-label="Products on this page" className="flex flex-wrap gap-2">
            {products.map((p) => (
              <a
                key={p.slug}
                href={`#${p.slug}`}
                className="rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-[0.9375rem] text-white transition-colors hover:border-white/50 hover:bg-white/10"
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

      <CtaBand />
    </>
  );
}
