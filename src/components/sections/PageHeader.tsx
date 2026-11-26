import { Container } from "@/components/ui/Container";
import { Eyebrow, StageBackdrop } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { SplitReveal } from "@/components/ui/SplitReveal";

/**
 * Top-of-page introduction on every inner page: a navy stage that continues
 * the navy header, with an eyebrow, the page title and intro, and an
 * optional illustration (`art`) on wide screens.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
  art,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro: string;
  art?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="stage-dark relative isolate overflow-hidden bg-navy text-white">
      <StageBackdrop glow="right" />
      <Container
        className={cn(
          "grid gap-8 pt-16 pb-16 sm:pt-20 lg:grid-cols-12 lg:pt-24 lg:pb-24",
          art ? "items-center lg:gap-12" : undefined,
        )}
      >
        <div className={art ? "lg:col-span-6" : "lg:col-span-7"}>
          {eyebrow && (
            <Eyebrow tone="dark" className="mb-6">
              {eyebrow}
            </Eyebrow>
          )}
          <h1 className="text-h1">
            <SplitReveal text={title} mode="mount" stagger={0.06} />
          </h1>
          {art && <p className="mt-6 max-w-xl text-lead text-on-navy">{intro}</p>}
          {art && children && <div className="mt-8">{children}</div>}
        </div>
        {art ? (
          <div className="lg:col-span-6">{art}</div>
        ) : (
          <div className="flex flex-col gap-6 lg:col-span-5 lg:pt-12">
            <p className="text-lead text-on-navy">{intro}</p>
            {children}
          </div>
        )}
      </Container>
    </header>
  );
}
