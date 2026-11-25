"use server";

import { contactDetails } from "@/content/site";
import { readContactForm, validateContact, type ContactErrors, type ContactInput } from "@/lib/contact";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "invalid"; errors: ContactErrors; values: Partial<ContactInput> }
  | { status: "error"; message: string; values: Partial<ContactInput> };

/**
 * Delivers an enquiry. No database is used: set CONTACT_WEBHOOK_URL to any
 * endpoint that accepts JSON (an email service, a CRM, Slack, Zapier, n8n...).
 * In development without a webhook, enquiries are logged to the server console.
 */
async function deliverEnquiry(enquiry: ContactInput) {
  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] New enquiry (CONTACT_WEBHOOK_URL not set, logging only):", enquiry);
      return;
    }
    throw new Error("CONTACT_WEBHOOK_URL is not configured");
  }

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...enquiry, source: "nalimat.com", receivedAt: new Date().toISOString() }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Webhook responded with ${res.status}`);
}

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const { website, ...input } = readContactForm(formData);
  const values = { ...input, consent: undefined };

  // Silently accept bot submissions caught by the honeypot.
  if (website) return { status: "success" };

  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) return { status: "invalid", errors, values };

  try {
    await deliverEnquiry({
      ...input,
      name: input.name.trim(),
      email: input.email.trim(),
      company: input.company.trim(),
      phone: input.phone.trim(),
      message: input.message.trim(),
    });
    return { status: "success" };
  } catch (err) {
    console.error("[contact] Delivery failed:", err);
    return {
      status: "error",
      message: contactDetails.email
        ? `Your message could not be sent. Please try again in a moment, or email us at ${contactDetails.email}.`
        : "Your message could not be sent. Please try again in a moment.",
      values,
    };
  }
}
