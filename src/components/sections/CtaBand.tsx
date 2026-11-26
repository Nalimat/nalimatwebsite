import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { SplitReveal } from "@/components/ui/SplitReveal";

/** Closing call to action shared by most pages (brand document, section 08). */
export function CtaBand({
  title = "Have an Idea? Let's Build It.",
  body = "Whether you're a small business looking for a website, a company planning an application or an entrepreneur with an idea, we're ready to help you turn it into a digital solution.",
  primary = { label: "Start a Project", href: "/contact?topic=project" },
  secondary = { label: "Explore Our Solutions", href: "/services" },
}: {
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section aria-labelledby="cta-title" className="bg-canvas py-16 sm:py-20">
      <Container>
        <div
          data-reveal=""
          className="stage-dark glow-border relative isolate grid gap-10 overflow-hidden rounded-[1.75rem] bg-navy px-6 py-12 text-white sm:px-12 sm:py-16 lg:grid-cols-12 lg:items-center lg:px-16 lg:py-20"
        >
          {/* Decorative: grid, glow and orbit rings */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="grid-lines absolute inset-0 [mask-image:linear-gradient(90deg,transparent,black_55%)]" />
            <div
              className="absolute inset-0"
              style={{ background: "radial-gradient(30rem 22rem at 88% 50%, rgb(240 96 32 / 0.22), transparent 70%)" }}
            />
            <svg viewBox="0 0 400 400" className="absolute top-1/2 -right-24 hidden w-[30rem] -translate-y-1/2 lg:block">
              <circle cx="200" cy="200" r="190" fill="none" stroke="#fff" strokeOpacity="0.07" />
              <circle cx="200" cy="200" r="140" fill="none" stroke="#F06020" strokeOpacity="0.4" strokeDasharray="2 7" />
              <circle cx="200" cy="200" r="90" fill="none" stroke="#fff" strokeOpacity="0.08" />
              <circle cx="60" cy="200" r="3" fill="#F06020" />
              <circle cx="200" cy="60" r="2.5" fill="#F2E8D5" fillOpacity="0.8" />
            </svg>
          </div>

          <div className="lg:col-span-7">
            <Eyebrow tone="dark">Let&apos;s create something meaningful together.</Eyebrow>
            <h2 id="cta-title" className="mt-5 text-h2">
              <SplitReveal text={title} />
            </h2>
            <p className="mt-5 max-w-xl text-on-navy">{body}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <ButtonLink href={primary.href} size="lg">
              {primary.label}
            </ButtonLink>
            <ButtonLink href={secondary.href} size="lg" variant="inverse">
              {secondary.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
