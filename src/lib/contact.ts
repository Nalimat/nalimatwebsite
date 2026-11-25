/**
 * Contact form schema and validation, shared by the client form and the
 * server action so both apply exactly the same rules.
 */

export const enquiryTopics = [
  { value: "project", label: "Start a project" },
  { value: "demo", label: "Product demo" },
  { value: "product", label: "Product question" },
  { value: "partnership", label: "Partnership" },
  { value: "careers", label: "Careers" },
  { value: "general", label: "General enquiry" },
] as const;

export type EnquiryTopic = (typeof enquiryTopics)[number]["value"];

export type ContactInput = {
  name: string;
  email: string;
  company: string;
  phone: string;
  topic: string;
  message: string;
  consent: boolean;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d\s-]{6,20}$/;

export const limits = { name: 100, email: 200, company: 150, phone: 20, message: 4000, messageMin: 20 };

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const message = input.message.trim();

  if (!name) errors.name = "Enter your name.";
  else if (name.length > limits.name) errors.name = `Use ${limits.name} characters or fewer.`;

  if (!email) errors.email = "Enter your email address.";
  else if (!EMAIL.test(email) || email.length > limits.email)
    errors.email = "Enter an email address in the format name@company.com.";

  if (input.company.trim().length > limits.company) errors.company = `Use ${limits.company} characters or fewer.`;

  if (input.phone.trim() && !PHONE.test(input.phone.trim()))
    errors.phone = "Enter a phone number using digits, spaces, +, - or brackets.";

  if (!enquiryTopics.some((t) => t.value === input.topic)) errors.topic = "Choose what your enquiry is about.";

  if (!message) errors.message = "Tell us a little about what you need.";
  else if (message.length < limits.messageMin)
    errors.message = `Add a little more detail (at least ${limits.messageMin} characters).`;
  else if (message.length > limits.message) errors.message = `Keep your message under ${limits.message} characters.`;

  if (!input.consent) errors.consent = "Confirm we may use these details to reply to you.";

  return errors;
}

export function readContactForm(formData: FormData): ContactInput & { website: string } {
  const str = (key: string) => {
    const v = formData.get(key);
    return typeof v === "string" ? v : "";
  };
  return {
    name: str("name"),
    email: str("email"),
    company: str("company"),
    phone: str("phone"),
    topic: str("topic"),
    message: str("message"),
    consent: formData.get("consent") === "on",
    // Honeypot: real visitors never see or fill this field.
    website: str("website"),
  };
}
