import { industries } from "@/content/industries";
import { PageHeader } from "@/components/sections/PageHeader";
import { IndustryGrid } from "@/components/sections/IndustryGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";
import { Seo } from "@/components/layout/Seo";

const metadata = pageMetadata({
  title: "Who We Work With",
  description:
    "NALIMAT Technology works with retail shops and stores, small businesses, growing companies, and schools and educational institutions.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <Seo {...metadata} />
      <PageHeader
        eyebrow="Who we work with"
        title="Who We Work With"
        intro="Small businesses, shops, startups, companies and educational institutions."
      />
      <Section labelledBy="ind-title">
        <h2 id="ind-title" className="sr-only">
          Who we work with
        </h2>
        <IndustryGrid industries={industries} detailed />
        <p className="mt-10 max-w-2xl text-muted">
          Whether you&apos;re a small business looking for a website, a company planning an application or an
          entrepreneur with an idea, we&apos;re ready to help you turn it into a digital solution.
        </p>
      </Section>
      <CtaBand />
    </>
  );
}
