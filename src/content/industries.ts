/**
 * Who NALIMAT Technology works with (shown as "Who We Work With").
 *
 * Source: NALIMAT Technology Website Content & Brand Messaging (section 05).
 * `needs` lists examples on the Who We Work With page; leave it empty unless
 * the examples are confirmed. Set `active: false` to hide an entry.
 */
import type { LucideIcon } from "lucide-react";
import { GraduationCap, ShoppingBag, Store, TrendingUp } from "lucide-react";

export type Industry = {
  slug: string;
  name: string;
  icon: LucideIcon;
  summary: string;
  needs: string[];
  active: boolean;
};

const allIndustries: Industry[] = [
  {
    slug: "retail-shops-stores",
    name: "Retail Shops & Stores",
    icon: ShoppingBag,
    summary: "Billing tools, websites, digital catalogues and practical business solutions.",
    needs: [],
    active: true,
  },
  {
    slug: "small-businesses",
    name: "Small Businesses",
    icon: Store,
    summary: "Custom websites, applications and digital tools to improve daily operations.",
    needs: [],
    active: true,
  },
  {
    slug: "growing-companies",
    name: "Growing Companies",
    icon: TrendingUp,
    summary: "Digital platforms, management tools and custom software to support growth.",
    needs: [],
    active: true,
  },
  {
    slug: "schools-educational-institutions",
    name: "Schools & Educational Institutions",
    icon: GraduationCap,
    summary: "Student monitoring, digital management and education technology.",
    needs: [],
    active: true,
  },
];

export const industries = allIndustries.filter((i) => i.active);
