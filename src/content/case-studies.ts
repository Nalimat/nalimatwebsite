/**
 * Client projects and case studies.
 *
 * Only publish work you have permission to share, with results you can verify.
 * While this array is empty, the homepage shows an honest "case studies coming
 * soon" panel instead of the section grid.
 */
import { confirmed } from "@/lib/placeholder";
export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  title: string;
  summary: string;
  services: string[];
  /** Only verified, client-approved outcomes. */
  outcome?: string;
};

const allCaseStudies: CaseStudy[] = [
  // Example entry. Uncomment and replace once a client approves publication.
  // {
  //   slug: "client-project",
  //   client: "[Client name]",
  //   industry: "[Industry]",
  //   title: "[What was built, in one line]",
  //   summary: "[The problem, the approach and what changed for the client.]",
  //   services: ["Web application development", "UI/UX design"],
  //   outcome: "[Verified outcome, approved by the client]",
  // },
];

/** Published case studies. Entries containing a [placeholder] are not published. */
export const caseStudies = confirmed(allCaseStudies);
