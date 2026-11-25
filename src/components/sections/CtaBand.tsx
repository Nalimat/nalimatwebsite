import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/** Closing call to action shared by most pages. */
export function CtaBand({
  title = "Have a product idea or a process to improve?",
  body = "Tell us what you are working on. We will reply with questions, a suggested approach and the next step.",
  primary = { label: "Start a project", href: "/contact?topic=project" },
  secondary = { label: "Explore our products", href: "/products" },
}: {
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section aria-labelledby="cta-title" className="bg-canvas py-20 sm:py-24">
      <Container>
        <div
          data-reveal=""
          className="grid gap-10 rounded-panel bg-navy px-6 py-12 text-white sm:px-12 sm:py-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <h2 id="cta-title" className="text-h2">
              {title}
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
