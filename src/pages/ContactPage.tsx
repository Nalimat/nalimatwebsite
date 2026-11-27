import { ClientOnly } from "@/components/ui/ClientOnly";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { contactDetails } from "@/content/site";
import { PageHeader } from "@/components/sections/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";
import { Seo } from "@/components/layout/Seo";

const metadata = pageMetadata({
  title: "Contact NALIMAT Technology: Start Your Website or App Project",
  description:
    "Have an idea? Let's build it. Contact NALIMAT Technology about a website, a mobile application, business software or a product demo.",
  path: "/contact",
  crumb: "Contact",
  pageType: "ContactPage",
});

export default function ContactPage() {
  // Only confirmed details are shown; unconfirmed [placeholder] values are null.
  const contact = contactDetails;
  const hasDirectContact = Object.values(contact).some(Boolean);

  return (
    <>
      <Seo {...metadata} />
      <PageHeader
        eyebrow="Contact"
        title="Have an Idea? Let's Build It."
        intro="Whether you're a small business looking for a website, a company planning an application or an entrepreneur with an idea, we're ready to help you turn it into a digital solution. Let's create something meaningful together."
      />
      <Section className="!pt-14">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <ClientOnly fallback={<FormSkeleton />}>
              <ContactForm />
            </ClientOnly>
          </div>

          <aside aria-labelledby={hasDirectContact ? "direct-title" : undefined} className="lg:col-span-4">
            {hasDirectContact && (
              <>
                <h2 id="direct-title" className="text-h3">
                  Contact us directly
                </h2>
                <ul className="mt-6 mb-6 divide-y divide-line border-y border-line">
                  {contact.email && (
                    <li className="flex gap-4 py-5">
                      <Mail size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                      <div>
                        <p className="text-sm text-muted">Email</p>
                        <a href={`mailto:${contact.email}`} className="font-medium hover:text-accent-ink">
                          {contact.email}
                        </a>
                      </div>
                    </li>
                  )}
                  {contact.phone && (
                    <li className="flex gap-4 py-5">
                      <Phone size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                      <div>
                        <p className="text-sm text-muted">Phone</p>
                        <a
                          href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                          className="font-medium hover:text-accent-ink"
                        >
                          {contact.phone}
                        </a>
                      </div>
                    </li>
                  )}
                  {contact.address && (
                    <li className="flex gap-4 py-5">
                      <MapPin size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                      <div>
                        <p className="text-sm text-muted">Office</p>
                        <address className="font-medium not-italic">
                          {contact.address.map((line) => (
                            <span key={line} className="block">
                              {line}
                            </span>
                          ))}
                        </address>
                      </div>
                    </li>
                  )}
                  {contact.hours && (
                    <li className="flex gap-4 py-5">
                      <Clock size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                      <div>
                        <p className="text-sm text-muted">Hours</p>
                        <p className="font-medium">{contact.hours}</p>
                      </div>
                    </li>
                  )}
                </ul>
              </>
            )}
            <p className="text-[0.9375rem] text-muted">
              Looking for a job? Choose “Careers” in the form and include a link to your CV or portfolio.
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}

function FormSkeleton() {
  return (
    <div aria-hidden className="rounded-panel border border-line bg-surface p-6 sm:p-10">
      <div className="grid animate-pulse gap-6 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-[78px] rounded-control bg-cream" />
        ))}
        <div className="h-[78px] rounded-control bg-cream sm:col-span-2" />
        <div className="h-44 rounded-control bg-cream sm:col-span-2" />
      </div>
    </div>
  );
}
