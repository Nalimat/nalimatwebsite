"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { submitContact, type ContactState } from "@/app/contact/actions";
import {
  enquiryTopics,
  limits,
  validateContact,
  type ContactErrors,
  type ContactInput,
} from "@/lib/contact";
import { Button } from "@/components/ui/Button";
import { products } from "@/content/products";
import { cn } from "@/lib/cn";

const fieldOrder: (keyof ContactInput)[] = ["name", "email", "company", "phone", "topic", "message", "consent"];

const inputClass =
  "block w-full rounded-control border bg-surface px-4 py-3 text-base text-navy placeholder:text-muted/70 transition-colors focus:border-navy focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent";

function initialTopic(param: string | null): string {
  return enquiryTopics.some((t) => t.value === param) ? (param as string) : "project";
}

export function ContactForm() {
  const params = useSearchParams();
  const [state, formAction, pending] = useActionState<ContactState, FormData>(submitContact, { status: "idle" });

  const [values, setValues] = useState<ContactInput>({
    name: "",
    email: "",
    company: "",
    phone: "",
    topic: initialTopic(params.get("topic")),
    message: prefillMessage(params),
    consent: false,
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactInput, boolean>>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Merge server-side validation errors once a submission returns.
  const [handled, setHandled] = useState(state);
  if (state !== handled) {
    setHandled(state);
    if (state.status === "invalid") setErrors(state.errors);
    if (state.status === "success") {
      setErrors({});
      setTouched({});
    }
  }

  useEffect(() => {
    if (state.status === "success" || state.status === "error") statusRef.current?.focus();
  }, [state]);

  function update<K extends keyof ContactInput>(key: K, value: ContactInput[K]) {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched[key] || errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: validateContact(next)[key] }));
    }
  }

  function blur(key: keyof ContactInput) {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: validateContact(values)[key] }));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    const found = validateContact(values);
    if (Object.keys(found).length > 0) {
      e.preventDefault();
      setErrors(found);
      const first = fieldOrder.find((k) => found[k]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    }
  }

  if (state.status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-panel border border-line bg-surface p-8 focus:outline-none sm:p-10"
      >
        <CheckCircle2 className="text-accent" size={28} aria-hidden />
        <h2 className="mt-5 text-h3 sm:text-2xl">Thank you, your message has been sent</h2>
        <p className="mt-3 max-w-lg text-muted">
          A member of our team will read your enquiry and reply by email.
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-8"
          onClick={() => window.location.reload()}
        >
          Send another message
        </Button>
      </div>
    );
  }

  const fieldError = (key: keyof ContactInput) => errors[key];
  const describedBy = (key: keyof ContactInput, hint?: boolean) =>
    [hint && !fieldError(key) ? `${key}-hint` : null, fieldError(key) ? `${key}-error` : null].filter(Boolean).join(" ") || undefined;

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      aria-busy={pending}
      className="rounded-panel border border-line bg-surface p-6 sm:p-10"
    >
      {state.status === "error" && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="mb-8 flex gap-3 rounded-control border border-accent/30 bg-accent/5 p-4 text-[0.9375rem] focus:outline-none"
        >
          <AlertCircle size={20} className="mt-0.5 shrink-0 text-accent-ink" aria-hidden />
          <p>{state.message}</p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Full name" required error={fieldError("name")}>
          <input
            id="name"
            name="name"
            required
            type="text"
            autoComplete="name"
            maxLength={limits.name}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            onBlur={() => blur("name")}
            aria-invalid={!!fieldError("name")}
            aria-describedby={describedBy("name")}
            className={cn(inputClass, fieldError("name") ? "border-accent" : "border-line")}
          />
        </Field>

        <Field id="email" label="Work email" required error={fieldError("email")}>
          <input
            id="email"
            name="email"
            required
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={limits.email}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => blur("email")}
            aria-invalid={!!fieldError("email")}
            aria-describedby={describedBy("email")}
            className={cn(inputClass, fieldError("email") ? "border-accent" : "border-line")}
          />
        </Field>

        <Field id="company" label="Company" error={fieldError("company")}>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={limits.company}
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            onBlur={() => blur("company")}
            aria-invalid={!!fieldError("company")}
            aria-describedby={describedBy("company")}
            className={cn(inputClass, fieldError("company") ? "border-accent" : "border-line")}
          />
        </Field>

        <Field id="phone" label="Phone" error={fieldError("phone")}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={limits.phone}
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            onBlur={() => blur("phone")}
            aria-invalid={!!fieldError("phone")}
            aria-describedby={describedBy("phone")}
            className={cn(inputClass, fieldError("phone") ? "border-accent" : "border-line")}
          />
        </Field>

        <Field id="topic" label="What is this about?" required error={fieldError("topic")} className="sm:col-span-2">
          <select
            id="topic"
            name="topic"
            required
            value={values.topic}
            onChange={(e) => update("topic", e.target.value)}
            aria-invalid={!!fieldError("topic")}
            aria-describedby={describedBy("topic")}
            className={cn(inputClass, "appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10", fieldError("topic") ? "border-accent" : "border-line")}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2352637A' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
            }}
          >
            {enquiryTopics.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="message"
          label="How can we help?"
          required
          error={fieldError("message")}
          hint="Share your goals, timeline and any systems involved. The more context, the better our reply."
          className="sm:col-span-2"
        >
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            maxLength={limits.message}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            onBlur={() => blur("message")}
            aria-invalid={!!fieldError("message")}
            aria-describedby={describedBy("message", true)}
            className={cn(inputClass, "resize-y", fieldError("message") ? "border-accent" : "border-line")}
          />
        </Field>

        {/* Honeypot field, hidden from people and assistive tech */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-[0.9375rem]">
            <input
              type="checkbox"
              name="consent"
              required
              checked={values.consent}
              onChange={(e) => update("consent", e.target.checked)}
              aria-invalid={!!fieldError("consent")}
              aria-describedby={describedBy("consent")}
              className="mt-1 h-4 w-4 shrink-0 accent-[#C84B12]"
            />
            <span className="text-muted">
              I agree that Nalimat may use these details to respond to my enquiry.
            </span>
          </label>
          {fieldError("consent") && (
            <p id="consent-error" className="mt-2 text-sm text-accent-ink">
              {fieldError("consent")}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={pending}>
          {pending && <Loader2 size={18} className="animate-spin" aria-hidden />}
          {pending ? "Sending message" : "Send message"}
        </Button>
        <p className="text-sm text-muted">Fields marked * are required.</p>
      </div>
    </form>
  );
}

function prefillMessage(params: URLSearchParams | ReturnType<typeof useSearchParams>) {
  const product = params.get("product");
  const role = params.get("role");
  const match = products.find((p) => p.slug === product);
  if (match) return `I'm interested in ${match.name}. `;
  if (role) return `I'd like to apply for the ${role.replace(/-/g, " ")} role. `;
  return "";
}

function Field({
  id,
  label,
  required,
  error,
  hint,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-[0.9375rem] font-medium">
        {label}
        {required && (
          <span className="text-accent-ink" aria-hidden>
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-accent-ink">
          {error}
        </p>
      )}
    </div>
  );
}
