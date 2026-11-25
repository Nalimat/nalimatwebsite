import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="text-sm font-medium text-accent-ink">404</p>
      <h1 className="mt-4 text-h1">This page does not exist</h1>
      <p className="mt-5 max-w-lg text-lead text-muted">
        The link may be out of date, or the page may have moved. Use the links below to find what you need.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/">Go to the homepage</ButtonLink>
        <ButtonLink href="/contact" variant="secondary">
          Contact us
        </ButtonLink>
      </div>
    </Container>
  );
}
