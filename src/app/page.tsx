import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/sections/home/Hero";
import { SectionNav, type SectionLink } from "@/components/layout/SectionNav";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { ProductCard, ProductsPending } from "@/components/sections/ProductCard";
import { ServiceList } from "@/components/sections/ServiceList";
import { IndustryGrid } from "@/components/sections/IndustryGrid";
import { TechStack } from "@/components/sections/TechStack";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { featuredProducts } from "@/content/products";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { processSteps, reasons } from "@/content/approach";

/** Homepage sections listed in the sticky section navigation, in page order. */
const homeSections: SectionLink[] = [
  { id: "overview", label: "Overview" },
  { id: "products", label: "Products" },
  { id: "services", label: "Services" },
  { id: "why-nalimat", label: "Why Nalimat" },
  { id: "industries", label: "Industries" },
  { id: "technology", label: "Technology" },
  { id: "work", label: "Our work" },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <SectionNav sections={homeSections} />
      <SectionReveal />

      {/* Introduction */}
      <Section reveal id="overview" tone="surface" labelledBy="intro-title" className="border-y border-line">
        <div className="grid gap-12 lg:grid-cols-12">
          <h2 id="intro-title" className="text-h2 lg:col-span-6">
            One company, two ways to help your business move forward.
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-6">
            <div>
              <h3 className="text-h3">Products</h3>
              <p className="mt-3 text-muted">
                Software platforms and applications that Nalimat designs, owns and keeps improving, ready for
                businesses to adopt.
              </p>
              <Link
                href="/products"
                className="mt-5 inline-flex items-center gap-1.5 font-medium hover:text-accent-ink"
              >
                See our products <ArrowUpRight size={16} aria-hidden />
              </Link>
            </div>
            <div>
              <h3 className="text-h3">Services</h3>
              <p className="mt-3 text-muted">
                Design, engineering, cloud and consulting for companies that need software built around their own
                way of working.
              </p>
              <Link
                href="/services"
                className="mt-5 inline-flex items-center gap-1.5 font-medium hover:text-accent-ink"
              >
                See our services <ArrowUpRight size={16} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Featured products */}
      <Section reveal id="products" labelledBy="products-title">
        <SectionHeading
          id="products-title"
          title="Products built by Nalimat"
          intro="Software we develop and maintain ourselves, shaped by the problems we see businesses solve every day."
          action={
            featuredProducts.length > 0 ? (
              <ButtonLink href="/products" variant="secondary" className="self-start">
                All products
              </ButtonLink>
            ) : undefined
          }
        />
        {featuredProducts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <ProductsPending />
        )}
      </Section>

      {/* Services */}
      <Section reveal id="services" tone="surface" labelledBy="services-title" className="border-y border-line">
        <SectionHeading
          id="services-title"
          title="Technology services"
          intro="When off-the-shelf software does not fit, our team designs and builds what you need, then helps you run it."
          action={
            <ButtonLink href="/services" variant="secondary" className="self-start">
              Explore services
            </ButtonLink>
          }
        />
        <ServiceList services={services} />
      </Section>

      {/* Why Nalimat */}
      <Section reveal id="why-nalimat" labelledBy="why-title">
        <SectionHeading
          id="why-title"
          title="Why businesses work with Nalimat"
          intro="How we work matters as much as what we build. These are the commitments behind every engagement."
        />
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2">
          {reasons.map((r) => (
            <div key={r.title} className="border-t-2 border-navy pt-6">
              <h3 className="text-h3">{r.title}</h3>
              <p className="mt-3 max-w-lg text-muted">{r.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-panel border border-line bg-surface p-7 sm:p-10">
          <h3 className="text-h3">How a project runs</h3>
          <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((s, i) => (
              <li key={s.title}>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent-ink">
                  {i + 1}
                </span>
                <p className="mt-4 font-semibold">{s.title}</p>
                <p className="mt-2 text-[0.9375rem] text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Industries */}
      <Section reveal id="industries" tone="surface" labelledBy="industries-title" className="border-y border-line">
        <SectionHeading
          id="industries-title"
          title="Industries we serve"
          intro="Different sectors, similar needs: reliable systems, simpler processes and software people want to use."
          action={
            <ButtonLink href="/industries" variant="secondary" className="self-start">
              View industries
            </ButtonLink>
          }
        />
        <IndustryGrid industries={industries} />
      </Section>

      {/* Technology */}
      <Section reveal id="technology" tone="navy" labelledBy="tech-title">
        <SectionHeading
          id="tech-title"
          tone="dark"
          title="Technology expertise"
          intro="We choose established, well-supported technology, so what we build is secure, maintainable and easy to hire for."
        />
        <TechStack />
      </Section>

      {/* Case studies */}
      <Section reveal id="work" labelledBy="work-title">
        <SectionHeading
          id="work-title"
          title="Selected work"
          intro="Projects we have delivered for clients, described with their permission."
        />
        <CaseStudies />
      </Section>

      <CtaBand />
    </>
  );
}
