/**
 * Industries Nalimat serves. Keep this list to sectors the company actually
 * works in or is actively pursuing; set `active: false` to hide one.
 */
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  GraduationCap,
  HeartPulse,
  Landmark,
  ShoppingBag,
  Truck,
} from "lucide-react";

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
    slug: "retail-ecommerce",
    name: "Retail and e-commerce",
    icon: ShoppingBag,
    summary: "Online storefronts, inventory and order systems that keep stock, sales and customers in step.",
    needs: ["Storefronts and checkout", "Inventory and order management", "Customer loyalty apps"],
    active: true,
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    icon: HeartPulse,
    summary: "Scheduling, patient communication and records tools designed with privacy and reliability first.",
    needs: ["Appointment and clinic tools", "Patient portals", "Secure data handling"],
    active: true,
  },
  {
    slug: "education",
    name: "Education",
    icon: GraduationCap,
    summary: "Learning platforms and administration tools for schools, training providers and edtech teams.",
    needs: ["Learning management", "Student and staff portals", "Assessment and reporting"],
    active: true,
  },
  {
    slug: "finance",
    name: "Finance and fintech",
    icon: Landmark,
    summary: "Secure, auditable software for payments, lending, accounting and customer onboarding.",
    needs: ["Customer onboarding", "Payments and reconciliation", "Reporting and compliance tooling"],
    active: true,
  },
  {
    slug: "logistics",
    name: "Logistics and supply chain",
    icon: Truck,
    summary: "Tracking, dispatch and warehouse systems that give teams one accurate view of what is moving.",
    needs: ["Fleet and dispatch tools", "Shipment tracking", "Warehouse workflows"],
    active: true,
  },
  {
    slug: "real-estate",
    name: "Real estate and property",
    icon: Building2,
    summary: "Listing, leasing and property management software for agencies, developers and facility teams.",
    needs: ["Listings and lead management", "Tenant and lease portals", "Maintenance requests"],
    active: true,
  },
];

export const industries = allIndustries.filter((i) => i.active);
