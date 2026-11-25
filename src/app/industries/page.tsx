import { industries } from "@/content/industries";
import { PageHeader } from "@/components/sections/PageHeader";
import { IndustryGrid } from "@/components/sections/IndustryGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industries",
  description:
    "Nalimat builds software for retail, healthcare, education, finance, logistics and real estate businesses.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        title="Software for the way your industry works"
        intro="Each sector has its own rules, users and pressures. We start by learning yours, then apply proven engineering to fit them."
      />
      <Section labelledBy="ind-title">
        <h2 id="ind-title" className="sr-only">
          Industries we serve
        </h2>
        <IndustryGrid industries={industries} detailed />
        <p className="mt-10 max-w-2xl text-muted">
          Don&apos;t see your industry? Most of what we build (portals, workflow tools, integrations and mobile apps)
          applies across sectors. Tell us about your business and we will say honestly whether we are a good fit.
        </p>
      </Section>
      <CtaBand title="Let's talk about your industry" />
    </>
  );
}
