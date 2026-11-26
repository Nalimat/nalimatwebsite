/**
 * Open positions. Add a role to publish it; when empty the Careers page
 * invites general applications instead.
 */
import { confirmed } from "../lib/placeholder";
export type Role = {
  slug: string;
  title: string;
  team: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  summary: string;
};

const allRoles: Role[] = [
  // {
  //   slug: "frontend-engineer",
  //   title: "[Role title]",
  //   team: "Engineering",
  //   location: "[City or Remote]",
  //   type: "Full-time",
  //   summary: "[Two sentences on the role and who will thrive in it.]",
  // },
];

/** Published roles. Entries containing a [placeholder] are not published. */
export const roles = confirmed(allRoles);

/** How NALIMAT works. Edit to reflect the team's real practices. */
export const workingPrinciples = [
  {
    title: "Ownership from idea to release",
    body: "Engineers and designers work close to the problem and see their work through to production.",
  },
  {
    title: "Products and client work side by side",
    body: "The team builds NALIMAT's own products and delivers client projects, so skills grow in both directions.",
  },
  {
    title: "Clear, written communication",
    body: "Decisions, scope and trade-offs are written down, so everyone can work with context and fewer meetings.",
  },
  {
    title: "Time to learn",
    body: "New tools are evaluated on real problems, and what the team learns is shared openly.",
  },
];

/** Hiring steps, in order. */
export const hiringSteps = [
  { title: "Apply", body: "Send your CV and, if you have one, a link to work you are proud of." },
  { title: "Introductory call", body: "A conversation about your experience and what you are looking for." },
  { title: "Skills conversation", body: "A practical discussion or short exercise related to the role." },
  { title: "Meet the team", body: "Talk with the people you would work with, then receive our decision." },
];
