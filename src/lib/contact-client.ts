/**
 * Browser side of the contact form. Replaces the Next.js server action call:
 * posts the form to /api/contact (server/contact.ts), which validates again
 * and delivers the enquiry to CONTACT_WEBHOOK_URL. Returns the same
 * ContactState the server action returned, for useActionState.
 */
import { contactDetails } from "@/content/site";
import { readContactForm } from "@/lib/contact";
import type { ContactState } from "../../server/contact";

export type { ContactState };

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  try {
    const res = await fetch("/api/contact", { method: "POST", body: formData });
    if (!res.ok) throw new Error(`Contact API responded with ${res.status}`);
    return (await res.json()) as ContactState;
  } catch (err) {
    console.error("[contact] Submission failed:", err);
    const { website: _website, ...input } = readContactForm(formData);
    void _website;
    return {
      status: "error",
      message: contactDetails.email
        ? `Your message could not be sent. Please try again in a moment, or email us at ${contactDetails.email}.`
        : "Your message could not be sent. Please try again in a moment.",
      values: { ...input, consent: undefined },
    };
  }
}
