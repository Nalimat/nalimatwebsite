import { AppLink as Link } from "@/components/ui/AppLink";
import { Seo } from "@/components/layout/Seo";
import { defaultMetadata } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/sections/home/Hero";
import { Marquee } from "@/components/sections/home/Marquee";
import { SectionNav, type SectionLink } from "@/components/layout/SectionNav";
import { ProductCard, ProductsPending } from "@/components/sections/ProductCard";
import { ServiceList } from "@/components/sections/ServiceList";
import { IndustryGrid } from "@/components/sections/IndustryGrid";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { TechStack } from "@/components/sections/TechStack";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { CtaBand } from "@/components/sections/CtaBand";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { cn } from "@/lib/cn";
import { featuredProducts } from "@/content/products";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { reasons } from "@/content/approach";

/** Homepage sections listed in the sticky section navigation, in page order. */
const homeSections: SectionLink[] = [
  { id: "overview", label: "Overview" },
  { id: "products", label: "Products" },
  { id: "services", label: "Services" },
  { id: "why-nalimat", label: "Why NALIMAT" },
  { id: "industries", label: "Who we work with" },
  { id: "technology", label: "Technology" },
  { id: "work", label: "Our work" },
];

const overviewLinks = [
  {
    title: "Products",
    body: "Our own digital products: Invoicy, a quotation and invoice management application, and Studata, a student monitoring and management platform.",
    href: "/products",
    cta: "See our products",
  },
  {
    title: "Services",
    body: "Websites, mobile applications, business software and UI/UX & product design for businesses, shops, startups and institutions.",
    href: "/services",
    cta: "See our services",
  },
];

export default function HomePage() {
  return (
    <>
      <Seo {...defaultMetadata()} />
      <Hero />
      <Marquee />

      <SectionNav sections={homeSections} />

      {/* Overview */}
      <Section id="overview" labelledBy="intro-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>NALIMAT Technology</Eyebrow>
            <h2
              id="intro-title"
              className="mt-6 text-[clamp(2.25rem,1.4rem+3vw,3.75rem)] leading-[1.04] font-semibold tracking-[-0.035em]"
            >
              <SplitReveal text="Technology that simplifies business." />
            </h2>
            <p className="mt-6 max-w-xl text-lead text-muted">
              From custom digital experiences to practical business software, we turn everyday challenges into simple,
              effective technology.
            </p>
          </div>
          <ul className="reveal-stagger flex flex-col gap-4 lg:col-span-5">
            {overviewLinks.map((l) => (
              <li
                key={l.title}
                className="spotlight group relative rounded-[1.25rem] border border-line bg-surface p-6 transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-navy/20 hover:shadow-[0_20px_40px_-30px_rgb(16_36_58/0.5)] motion-reduce:transform-none"
              >
                <h3 className="text-h3">{l.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-muted">{l.body}</p>
                <Link
                  href={l.href}
                  className="mt-4 inline-flex items-center gap-2 text-[0.9375rem] font-medium after:absolute after:inset-0 after:rounded-[1.25rem]"
                >
                  {l.cta}
                  <ArrowRight
                    size={16}
                    aria-hidden
                    className="text-accent-ink transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Products: navy showcase stage */}
      <Section id="products" tone="navy" labelledBy="products-title">
        <SectionHeading
          id="products-title"
          tone="dark"
          eyebrow="Our products"
          title="Solutions Designed to Solve Real Problems."
          intro="We develop digital products that make everyday tasks simpler, more organized and more efficient."
          action={
            featuredProducts.length > 0 ? (
              <ButtonLink href="/products" variant="inverse" className="self-start">
                All products
              </ButtonLink>
            ) : undefined
          }
        />
        {featuredProducts.length > 0 ? (
          <div className={cn("reveal-stagger grid gap-6 md:grid-cols-2", featuredProducts.length > 2 && "lg:grid-cols-3")}>
            {featuredProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <ProductsPending />
        )}
      </Section>

      {/* Services */}
      <Section id="services" tone="cream" labelledBy="services-title">
        <SectionHeading
          id="services-title"
          eyebrow="Services"
          title="What We Do"
          intro="Websites, mobile applications, custom software and UI/UX, from idea and design to development and deployment."
          action={
            <ButtonLink href="/services" variant="secondary" className="self-start">
              Explore services
            </ButtonLink>
          }
        />
        <ServiceList services={services} />
      </Section>

      {/* Why NALIMAT and Our Process */}
      <Section id="why-nalimat" labelledBy="why-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>Why NALIMAT</Eyebrow>
              <h2 id="why-title" className="mt-5 text-h2">
                <SplitReveal text="Why Choose NALIMAT?" />
              </h2>
            </div>
          </div>
          <ol className="reveal-stagger divide-y divide-line border-y border-line lg:col-span-8">
            {reasons.map((r, i) => (
              <li key={r.title} className="group grid gap-2 py-7 sm:grid-cols-[4.5rem_1fr] sm:gap-6">
                <span className="font-mono text-sm font-semibold text-accent-ink sm:pt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[1.375rem] leading-snug font-semibold tracking-tight transition-colors duration-300 group-hover:text-accent-ink">
                    {r.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-muted">{r.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-20 rounded-[1.75rem] border border-line bg-surface px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
          <Eyebrow>Our process</Eyebrow>
          <h3 className="mt-4 mb-10 text-[1.75rem] leading-tight font-semibold tracking-tight lg:mb-14">Our Process</h3>
          <ProcessTimeline stepHeading="h4" />
        </div>
      </Section>

      {/* Who we work with */}
      <Section id="industries" tone="cream" labelledBy="industries-title">
        <SectionHeading
          id="industries-title"
          eyebrow="Who we work with"
          title="Who We Work With"
          intro="Small businesses, shops, startups, companies and educational institutions."
          action={
            <ButtonLink href="/industries" variant="secondary" className="self-start">
              Learn more
            </ButtonLink>
          }
        />
        <IndustryGrid industries={industries} />
      </Section>

      {/* Technology */}
      <Section id="technology" tone="navy" labelledBy="tech-title">
        <SectionHeading
          id="tech-title"
          tone="dark"
          eyebrow="Technology"
          title="Technology expertise"
          intro="We choose established, well-supported technology, so what we build is secure, maintainable and easy to hire for."
        />
        <TechStack />
      </Section>

      {/* Case studies */}
      <Section id="work" labelledBy="work-title">
        <SectionHeading
          id="work-title"
          eyebrow="Our work"
          title="Selected work"
          intro="Projects we have delivered for clients, described with their permission."
        />
        <CaseStudies />
      </Section>

      <CtaBand />
    </>
  );
}
