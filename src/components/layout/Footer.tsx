import { AppLink as Link } from "@/components/ui/AppLink";
import { contactDetails, footerNav, site } from "@/content/site";
import { services } from "@/content/services";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "./Logo";

const socialLabels: Record<keyof typeof site.social, string> = {
  linkedin: "LinkedIn",
  github: "GitHub",
  x: "X",
};

const linkClass =
  "relative inline-block transition-colors hover:text-white after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:scale-x-100 motion-reduce:after:transition-none";

export function Footer() {
  const socials = (Object.keys(site.social) as Array<keyof typeof site.social>).filter((k) => site.social[k]);

  return (
    <footer className="stage-dark relative isolate overflow-hidden bg-navy text-on-navy">
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
      />

      {/* Brand statement */}
      <Container className="flex flex-col gap-8 border-b border-white/10 pt-16 pb-12 lg:flex-row lg:items-end lg:justify-between lg:pt-20">
        <p className="max-w-2xl text-h2 text-white">{site.tagline}</p>
        <ButtonLink href="/contact?topic=project" size="lg" className="self-start lg:self-auto">
          Start a Project
        </ButtonLink>
      </Container>

      <Container className="grid gap-12 py-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-5 max-w-xs text-[0.9375rem]">{site.description}</p>
          {contactDetails.email && (
            <address className="mt-6 text-[0.9375rem] not-italic">
              <a href={`mailto:${contactDetails.email}`} className="text-white hover:text-accent">
                {contactDetails.email}
              </a>
            </address>
          )}
        </div>

        <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
          {footerNav.map((group) => (
            <div key={group.title}>
              <h2 className="eyebrow text-white">{group.title}</h2>
              <ul className="mt-5 space-y-3 text-[0.9375rem]">
                {group.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="eyebrow text-white">Services</h2>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              {services.slice(0, 5).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services#${s.slug}`} className={linkClass}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {site.name}. All rights reserved.
          </p>
          {socials.length > 0 && (
            <ul className="flex gap-5">
              {socials.map((k) => (
                <li key={k}>
                  <a href={site.social[k]} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    {socialLabels[k]}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </div>
    </footer>
  );
}

/** Year is resolved when the page is prerendered and again in the browser. */
function CopyrightYear() {
  return <>{new Date().getFullYear()}</>;
}
