import { about } from "@/content/about";
import { reasons } from "@/content/approach";
import { PageHeader } from "@/components/sections/PageHeader";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section, SectionHeading } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Nalimat is a technology company that builds software products and delivers IT services for businesses. Learn about our mission, values and approach.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Nalimat"
        intro="We build digital products and deliver technology services that help businesses simplify operations, innovate and grow."
      />

      <Section labelledBy="story-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="story-title" className="text-h2">
              Our story
            </h2>
            <dl className="mt-10 divide-y divide-line border-y border-line">
              {about.facts.map((f) => (
                <div key={f.label} className="flex justify-between gap-6 py-4 text-[0.9375rem]">
                  <dt className="text-muted">{f.label}</dt>
                  <dd className="text-right font-medium">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="space-y-6 text-lead lg:col-span-7 lg:col-start-6">
            {about.story.map((p, i) => (
              <p key={i} className={i === 0 ? "text-navy" : "text-muted"}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="navy" labelledBy="mission-title">
        <h2 id="mission-title" className="sr-only">
          Mission and vision
        </h2>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-accent">Mission</h3>
            <p className="mt-4 text-h3 sm:text-2xl sm:leading-snug sm:tracking-tight">{about.mission}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-accent">Vision</h3>
            <p className="mt-4 text-h3 sm:text-2xl sm:leading-snug sm:tracking-tight">{about.vision}</p>
          </div>
        </div>
      </Section>

      <Section labelledBy="values-title">
        <SectionHeading id="values-title" title="What we value" />
        <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {about.values.map((v) => (
            <li key={v.title} className="border-t-2 border-navy pt-5">
              <h3 className="text-h3">{v.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-muted">{v.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" labelledBy="how-title" className="border-y border-line">
        <SectionHeading
          id="how-title"
          title="How we work with clients"
          intro="The commitments behind every product we ship and every project we deliver."
        />
        <ul className="grid gap-6 md:grid-cols-2">
          {reasons.map((r) => (
            <li key={r.title} className="rounded-panel bg-canvas p-7">
              <h3 className="text-h3">{r.title}</h3>
              <p className="mt-3 text-muted">{r.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {about.leadership.length > 0 && (
        <Section labelledBy="team-title">
          <SectionHeading id="team-title" title="Leadership" />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {about.leadership.map((m) => (
              <li key={m.name} className="rounded-panel border border-line bg-surface p-7">
                <p className="text-h3">{m.name}</p>
                <p className="mt-1 text-muted">{m.role}</p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaBand title="Work with Nalimat" />
    </>
  );
}
