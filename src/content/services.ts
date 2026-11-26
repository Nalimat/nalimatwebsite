/**
 * Services NALIMAT Technology delivers to clients.
 *
 * Source: NALIMAT Technology Website Content & Brand Messaging (section 03,
 * "What We Do"). `includes` lists specific deliverables on the Services page;
 * leave it empty unless the deliverables are confirmed.
 * Set `offered: false` to hide a service from every page without deleting it.
 */
import type { LucideIcon } from "lucide-react";
import { Blocks, Globe, PenTool, Smartphone } from "lucide-react";

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
    slug: "website-development",
    name: "Website Development",
    icon: Globe,
    summary:
      "Professional, responsive websites for businesses, shops, startups and brands to establish their digital presence.",
    includes: [],
    offered: true,
  },
  {
    slug: "mobile-applications",
    name: "Mobile Applications",
    icon: Smartphone,
    summary:
      "User-friendly mobile applications designed to streamline operations, improve accessibility and connect customers.",
    includes: [],
    offered: true,
  },
  {
    slug: "business-software",
    name: "Business Software",
    icon: Blocks,
    summary: "Digital tools for billing, management, monitoring, tracking and business workflows.",
    includes: [],
    offered: true,
  },
  {
    slug: "ui-ux-product-design",
    name: "UI/UX & Product Design",
    icon: PenTool,
    summary: "Simple, intuitive and thoughtfully designed digital experiences for websites, apps and software.",
    includes: [],
    offered: true,
  },
];

export const services = allServices.filter((s) => s.offered);
