/**
 * Technology services Nalimat delivers to clients.
 *
 * Only publish services the company actually offers: set `offered: false`
 * to hide a service from every page without deleting its copy.
 */
import type { LucideIcon } from "lucide-react";
import {
  Blocks,
  BrainCircuit,
  Cloud,
  Compass,
  Globe,
  PenTool,
  Smartphone,
} from "lucide-react";

export type Service = {
  slug: string;
  name: string;
  icon: LucideIcon;
  summary: string;
  includes: string[];
  offered: boolean;
};

const allServices: Service[] = [
  {
    slug: "custom-software",
    name: "Custom software development",
    icon: Blocks,
    summary:
      "Software built around the way your business works, from internal tools to complete platforms that replace spreadsheets and manual steps.",
    includes: ["Requirements and scoping", "Architecture and build", "Integrations with existing systems", "Maintenance and support"],
    offered: true,
  },
  {
    slug: "web-applications",
    name: "Web application development",
    icon: Globe,
    summary:
      "Fast, secure web applications and customer portals that work across browsers and devices, built on modern, well-supported frameworks.",
    includes: ["Customer and partner portals", "Dashboards and admin panels", "Progressive web apps", "Performance and accessibility"],
    offered: true,
  },
  {
    slug: "mobile-applications",
    name: "Mobile application development",
    icon: Smartphone,
    summary:
      "iOS and Android apps for customers or field teams, with offline support, notifications and a clear path to the app stores.",
    includes: ["Cross-platform and native apps", "App store release", "Offline-first data sync", "Analytics and crash reporting"],
    offered: true,
  },
  {
    slug: "ui-ux-design",
    name: "UI/UX design",
    icon: PenTool,
    summary:
      "Research-led interface design that makes complex workflows simple to learn, with design systems your developers can build on.",
    includes: ["User research and journeys", "Wireframes and prototypes", "Visual and interface design", "Design systems"],
    offered: true,
  },
  {
    slug: "cloud-devops",
    name: "Cloud and DevOps solutions",
    icon: Cloud,
    summary:
      "Infrastructure that is reliable, observable and cost-aware, with automated pipelines so releases are routine rather than risky.",
    includes: ["Cloud setup and migration", "CI/CD pipelines", "Monitoring and alerting", "Cost and security reviews"],
    offered: true,
  },
  {
    slug: "it-consulting",
    name: "IT consulting",
    icon: Compass,
    summary:
      "Independent advice on technology choices, system architecture and digital roadmaps, so investment goes where it has the most effect.",
    includes: ["Technology assessments", "Architecture reviews", "Digital roadmaps", "Vendor and build-or-buy decisions"],
    offered: true,
  },
  {
    slug: "ai-automation",
    name: "AI and automation solutions",
    icon: BrainCircuit,
    summary:
      "Practical automation and AI features that remove repetitive work, from document processing to assistants inside your own tools.",
    includes: ["Workflow automation", "Document and data extraction", "AI assistants and search", "Responsible AI practices"],
    offered: true,
  },
];

export const services = allServices.filter((s) => s.offered);
