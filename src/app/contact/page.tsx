import { Suspense } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { contactDetails } from "@/content/site";
import { PageHeader } from "@/components/sections/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Nalimat to start a project, request a product demo or ask a question. We reply to every enquiry.",
  path: "/contact",
});

export default function ContactPage() {
  // Only confirmed details are shown; unconfirmed [placeholder] values are null.
  const contact = contactDetails;
  const hasDirectContact = Object.values(contact).some(Boolean);

  return (
    <>
      <PageHeader
        title="Let's talk about what you need"
        intro="Tell us about your project, product question or idea. A member of our team will reply by email."
      />
      <Section className="!pt-14">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Suspense fallback={<FormSkeleton />}>
              <ContactForm />
            </Suspense>
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
          <div key={i} className="h-[78px] rounded-control bg-canvas" />
        ))}
        <div className="h-[78px] rounded-control bg-canvas sm:col-span-2" />
        <div className="h-44 rounded-control bg-canvas sm:col-span-2" />
      </div>
    </div>
  );
}
