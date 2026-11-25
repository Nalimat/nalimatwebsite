import { caseStudies } from "@/content/case-studies";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

/** Featured work. Falls back to an honest empty state until case studies are approved. */
export function CaseStudies() {
  if (caseStudies.length === 0) {
    return (
      <EmptyState
        title="Client work, shared with permission"
        body="We publish case studies only when our clients approve them. If you would like to see work similar to your project, ask us and we will walk you through relevant examples on a call."
        action={
          <ButtonLink href="/contact?topic=project" variant="secondary">
            Ask for relevant examples
          </ButtonLink>
        }
      />
    );
  }

  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {caseStudies.map((c) => (
        <li key={c.slug} className="flex flex-col rounded-panel border border-line bg-surface p-7 sm:p-8">
          <p className="text-sm text-muted">
            {c.client}, {c.industry}
          </p>
          <h3 className="mt-6 text-h3">{c.title}</h3>
          <p className="mt-3 text-muted">{c.summary}</p>
          {c.outcome && <p className="mt-5 border-l-2 border-accent pl-4 font-medium">{c.outcome}</p>}
          <div className="mt-auto flex flex-wrap gap-2 pt-8">
            {c.services.map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
