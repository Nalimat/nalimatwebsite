import Link from "next/link";
import { contactDetails, footerNav, site } from "@/content/site";
import { services } from "@/content/services";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

const socialLabels: Record<keyof typeof site.social, string> = {
  linkedin: "LinkedIn",
  github: "GitHub",
  x: "X",
};

export function Footer() {
  const socials = (Object.keys(site.social) as Array<keyof typeof site.social>).filter((k) => site.social[k]);

  return (
    <footer className="bg-navy text-on-navy">
      <Container className="grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
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
              <h2 className="text-sm font-semibold text-white">{group.title}</h2>
              <ul className="mt-4 space-y-3 text-[0.9375rem]">
                {group.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="text-sm font-semibold text-white">Services</h2>
            <ul className="mt-4 space-y-3 text-[0.9375rem]">
              {services.slice(0, 5).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services#${s.slug}`} className="hover:text-white">
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

/** Year is resolved at build time and cached; rebuilds keep it current. */
async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}
