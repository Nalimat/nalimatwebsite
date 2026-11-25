import { Container } from "@/components/ui/Container";

/** Top-of-page introduction used on every inner page. */
export function PageHeader({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="border-b border-line bg-canvas">
      <Container className="grid gap-8 pt-16 pb-16 sm:pt-20 lg:grid-cols-12 lg:pt-24 lg:pb-20">
        <h1 className="text-h1 lg:col-span-7">{title}</h1>
        <div className="flex flex-col gap-6 lg:col-span-5 lg:pt-3">
          <p className="text-lead text-muted">{intro}</p>
          {children}
        </div>
      </Container>
    </header>
  );
}
