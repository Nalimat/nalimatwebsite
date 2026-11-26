/**
 * Server-side contact form handling. Replaces the Next.js server action
 * (src/app/contact/actions.ts) with the same validation, honeypot and
 * webhook delivery. Runs only on the server: in the Vercel function
 * (api/contact.ts) and in the Vite dev/preview middleware. It reads
 * CONTACT_WEBHOOK_URL from the server environment, so the URL never
 * reaches the browser bundle.
 *
 * Imports are relative (no "@/" alias) so the Vercel function bundler can
 * resolve them without the Vite config.
 */
import { contactDetails } from "../src/content/site";
import { readContactForm, validateContact, type ContactErrors, type ContactInput } from "../src/lib/contact";

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

export async function submitContact(formData: FormData): Promise<ContactState> {
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

const MAX_BODY_BYTES = 64 * 1024;

/** HTTP handler: POST multipart/urlencoded form data, responds with ContactState JSON. */
export async function handleContactRequest(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405, headers: { Allow: "POST" } });
  }
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return Response.json({ error: "Payload too large" }, { status: 413 });
  }
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: "Invalid form data" }, { status: 400 });
  }
  const state = await submitContact(formData);
  return Response.json(state, { headers: { "Cache-Control": "no-store" } });
}
