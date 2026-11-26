import { Component, type ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Button, ButtonLink } from "@/components/ui/Button";

/** Replaces src/app/error.tsx: catches render errors in a page, with a retry. */
export class ErrorBoundary extends Component<{ children: ReactNode; resetKey: string }, { error: unknown; key: string }> {
  state = { error: null as unknown, key: this.props.resetKey };

  static getDerivedStateFromError(error: unknown) {
    return { error };
  }

  static getDerivedStateFromProps(props: { resetKey: string }, state: { error: unknown; key: string }) {
    // Leaving the page clears the error, as a new Next.js route segment would.
    return props.resetKey !== state.key ? { error: null, key: props.resetKey } : null;
  }

  componentDidCatch(error: unknown) {
    console.error(error);
  }

  render() {
    if (this.state.error === null) return this.props.children;
    return (
      <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
        <h1 className="text-h1">This page didn&apos;t load</h1>
        <p className="mt-5 max-w-lg text-lead text-muted">
          Something went wrong while loading this page. Try again, and if the problem continues, contact us.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button onClick={() => this.setState({ error: null })}>Try again</Button>
          <ButtonLink href="/" variant="secondary">
            Go to the homepage
          </ButtonLink>
        </div>
      </Container>
    );
  }
}
