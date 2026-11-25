/**
 * About page content. Story paragraphs and leadership entries containing a
 * [placeholder] are hidden until confirmed. Add company facts (such as the
 * founding year or headquarters) to `facts` only once they are verified.
 */
import { confirmed } from "@/lib/placeholder";

export const about = {
  story: confirmed([
    "Nalimat is a technology company that builds its own software products and delivers technology services to businesses.",
    "We work on both sides of software: as product owners who live with what we ship, and as a delivery partner for companies that need systems built around their own processes. Each side makes us better at the other.",
    "[Add the company story here: when and why Nalimat was founded, where the team is based, and the moments that shaped how the company works today.]",
  ]),
  mission:
    "To build dependable technology that helps businesses simplify operations, innovate and grow.",
  vision: "A future where every business, whatever its size, can use software that truly fits the way it works.",
  values: [
    { title: "Clarity", body: "Plain language, written decisions and honest estimates." },
    { title: "Craft", body: "Careful design and engineering that holds up over years, not weeks." },
    { title: "Ownership", body: "We stay accountable for what we build after launch." },
    { title: "Partnership", body: "Your goals set the priorities; we bring the expertise to reach them." },
  ],
  facts: [
    { label: "Focus", value: "Products and IT services" },
  ],
  /** Add team members once approved for publication. */
  leadership: confirmed([] as { name: string; role: string }[]),
};
