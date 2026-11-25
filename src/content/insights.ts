/**
 * Insights / blog articles.
 *
 * Add an article object to publish it. `body` is a list of paragraphs; a
 * paragraph beginning with "## " renders as a sub-heading.
 * When the list is empty the Insights page shows a "first articles coming"
 * state rather than fake posts.
 */
import { confirmed } from "@/lib/placeholder";
export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date, e.g. "2026-12-01" */
  date: string;
  author: string;
  topic: string;
  readingMinutes: number;
  body: string[];
};

const allInsights: Insight[] = [
  // {
  //   slug: "example-article",
  //   title: "[Article title]",
  //   excerpt: "[One or two sentence summary shown on the listing page.]",
  //   date: "2026-12-01",
  //   author: "[Author name]",
  //   topic: "Engineering",
  //   readingMinutes: 5,
  //   body: ["[Opening paragraph]", "## [Sub-heading]", "[Paragraph]"],
  // },
];

/** Published articles. Entries containing a [placeholder] are not published. */
export const insights = confirmed(allInsights);

export const insightTopics = ["Engineering", "Product", "Design", "Cloud", "AI and automation"];

export function getInsight(slug: string) {
  return insights.find((i) => i.slug === slug);
}

export const sortedInsights = [...insights].sort((a, b) => b.date.localeCompare(a.date));
