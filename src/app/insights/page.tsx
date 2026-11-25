import Link from "next/link";
import { insightTopics, sortedInsights } from "@/content/insights";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { ButtonLink } from "@/components/ui/Button";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Insights",
  description: "Articles from the Nalimat team on software engineering, product design, cloud and automation.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageHeader
        title="Insights"
        intro="Practical writing from our team on building software products, running reliable systems and putting automation to work."
      >
        {sortedInsights.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label="Topics we write about">
            {insightTopics.map((t) => (
              <li key={t}>
                <Badge>{t}</Badge>
              </li>
            ))}
          </ul>
        )}
      </PageHeader>

      <Section labelledBy="articles-title">
        <h2 id="articles-title" className="sr-only">
          Articles
        </h2>
        {sortedInsights.length === 0 ? (
          <EmptyState
            title="Our first articles are being written"
            body="We will publish here soon. In the meantime, if there is a topic you would like us to cover, let us know."
            action={
              <ButtonLink href="/contact?topic=general" variant="secondary">
                Suggest a topic
              </ButtonLink>
            }
          />
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedInsights.map((post) => (
              <li key={post.slug}>
                <article className="relative flex h-full flex-col rounded-panel border border-line bg-surface p-7 transition-colors hover:border-navy/30">
                  <div className="flex items-center justify-between gap-3 text-sm text-muted">
                    <span>{post.topic}</span>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </div>
                  <h3 className="mt-8 text-h3">
                    <Link href={`/insights/${post.slug}`} className="after:absolute after:inset-0 hover:text-accent-ink">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-muted">{post.excerpt}</p>
                  <p className="mt-auto pt-8 text-sm text-muted">{post.readingMinutes} min read</p>
                </article>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
