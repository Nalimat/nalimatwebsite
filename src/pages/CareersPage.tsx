import { hiringSteps, roles, workingPrinciples } from "@/content/careers";
import { contactDetails } from "@/content/site";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { pageMetadata } from "@/lib/seo";
import { Seo } from "@/components/layout/Seo";

const metadata = pageMetadata({
  title: "Careers at NALIMAT Technology: Design & Engineering",
  description:
    "Join NALIMAT Technology and work on our own software products and client projects across design and engineering. See how we work and how we hire.",
  path: "/careers",
  crumb: "Careers",
});

export default function CareersPage() {
  return (
    <>
      <Seo {...metadata} />
      <PageHeader
        eyebrow="Careers"
        title="Build products and solve real business problems with us"
        intro="At NALIMAT you work on our own software and on client projects, with a team that values clear thinking and careful work."
      >
        {roles.length > 0 && (
          <div>
            <ButtonLink href="#open-roles">View open roles</ButtonLink>
          </div>
        )}
      </PageHeader>

      <Section labelledBy="work-title">
        <SectionHeading id="work-title" title="How we work" />
        <ul className="grid gap-x-10 gap-y-10 md:grid-cols-2">
          {workingPrinciples.map((p) => (
            <li key={p.title} className="border-t-2 border-navy pt-5">
              <h3 className="text-h3">{p.title}</h3>
              <p className="mt-2 max-w-lg text-muted">{p.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="open-roles" tone="cream" labelledBy="roles-title" className="border-y border-line">
        <SectionHeading id="roles-title" title="Open roles" />
        {roles.length === 0 ? (
          <EmptyState
            title="No open roles right now"
            body="We are always glad to hear from thoughtful engineers, designers and consultants. Send your CV and a short note about the work you enjoy, and we will be in touch when a suitable role opens."
            action={
              <ButtonLink href="/contact?topic=careers" variant="secondary">
                Send a general application
              </ButtonLink>
            }
          />
        ) : (
          <ul className="divide-y divide-line border-y border-line">
            {roles.map((r) => (
              <li key={r.slug} className="grid gap-4 py-8 md:grid-cols-12 md:items-center">
                <div className="md:col-span-7">
                  <h3 className="text-h3">{r.title}</h3>
                  <p className="mt-2 text-muted">{r.summary}</p>
                </div>
                <div className="flex flex-wrap gap-2 md:col-span-3">
                  <Badge>{r.team}</Badge>
                  <Badge>{r.location}</Badge>
                  <Badge>{r.type}</Badge>
                </div>
                <div className="md:col-span-2 md:text-right">
                  <ButtonLink href={`/contact?topic=careers&role=${r.slug}`} variant="secondary">
                    Apply
                  </ButtonLink>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section labelledBy="hiring-title">
        <SectionHeading
          id="hiring-title"
          title="Our hiring process"
          intro={
            contactDetails.email
              ? `Questions about a role or the process? Write to ${contactDetails.email}.`
              : "Questions about a role or the process? Send them through our contact form."
          }
        />
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {hiringSteps.map((s, i) => (
            <li key={s.title}>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent-ink">
                {i + 1}
              </span>
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
