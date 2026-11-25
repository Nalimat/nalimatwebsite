import { services } from "@/content/services";
import { processSteps } from "@/content/approach";
import { PageHeader } from "@/components/sections/PageHeader";
import { ServiceList } from "@/components/sections/ServiceList";
import { TechStack } from "@/components/sections/TechStack";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Custom software, web and mobile development, UI/UX design, cloud and DevOps, IT consulting and AI automation from Nalimat.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Technology services, from first sketch to production"
        intro="When your business needs software built around its own process, our team designs, builds and runs it with you."
      >
        <div>
          <ButtonLink href="/contact?topic=project">Discuss your project</ButtonLink>
        </div>
      </PageHeader>

      <Section labelledBy="svc-title">
        <h2 id="svc-title" className="sr-only">
          Our services
        </h2>
        <ServiceList services={services} detailed />
      </Section>

      <Section tone="surface" labelledBy="process-title" className="border-y border-line">
        <SectionHeading
          id="process-title"
          title="How we deliver"
          intro="A simple, transparent process. You see progress every cycle and decide priorities with us."
        />
        <ol className="grid gap-px overflow-hidden rounded-panel border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s, i) => (
            <li key={s.title} className="bg-surface p-7">
              <span className="text-sm font-semibold text-accent-ink">Step {i + 1}</span>
              <h3 className="mt-3 text-h3">{s.title}</h3>
              <p className="mt-3 text-[0.9375rem] text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section labelledBy="tech-title">
        <SectionHeading id="tech-title" title="Technology we work with" />
        <TechStack tone="light" />
      </Section>

      <CtaBand />
    </>
  );
}
