/**
 * Technology expertise. List only tools the team uses in production work.
 */
export type TechGroup = { area: string; items: string[] };

export const technologies: TechGroup[] = [
  { area: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { area: "Backend", items: ["Node.js", "Python", "REST and GraphQL APIs", "PostgreSQL"] },
  { area: "Mobile", items: ["React Native", "Flutter", "iOS", "Android"] },
  { area: "Cloud and DevOps", items: ["AWS", "Microsoft Azure", "Docker", "CI/CD pipelines"] },
  { area: "AI and data", items: ["LLM integration", "Workflow automation", "Data pipelines", "Analytics"] },
];
