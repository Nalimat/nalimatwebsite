import { services } from "@/content/services";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ServiceList } from "@/components/sections/ServiceList";
import { TechStack } from "@/components/sections/TechStack";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { pageMetadata, servicesJsonLd } from "@/lib/seo";
import { Seo } from "@/components/layout/Seo";

const metadata = pageMetadata({
  title: "Website, App & Software Development | NALIMAT Technology",
  description:
    "Website development, mobile app development, custom business software and UI/UX product design for small businesses, shops, startups and institutions.",
  path: "/services",
  crumb: "Services",
  jsonLd: [servicesJsonLd(services)],
});

export default function ServicesPage() {
  return (
    <>
      <Seo {...metadata} />
      <PageHeader
        eyebrow="Services"
        title="What We Do"
        intro="Websites, mobile applications, custom software and UI/UX for small businesses, shops, startups, companies and educational institutions."
      >
        <div>
          <ButtonLink href="/contact?topic=project">Start a Project</ButtonLink>
        </div>
      </PageHeader>

      <Section labelledBy="svc-title">
        <h2 id="svc-title" className="sr-only">
          Our services
        </h2>
        <ServiceList services={services} detailed />
      </Section>

      <Section tone="cream" labelledBy="process-title" className="border-y border-line">
        <SectionHeading id="process-title" eyebrow="How we work" title="Our Process" />
        <div className="rounded-[1.75rem] border border-line bg-surface px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
          <ProcessTimeline />
        </div>
      </Section>

      <Section labelledBy="tech-title">
        <SectionHeading id="tech-title" eyebrow="Technology" title="Technology we work with" />
        <TechStack tone="light" />
      </Section>

      <CtaBand />
    </>
  );
}
