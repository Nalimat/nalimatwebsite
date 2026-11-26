/**
 * Software products built by NALIMAT Technology.
 *
 * Source: NALIMAT Technology Website Content & Brand Messaging (section 04).
 * The document notes that product features are content suggestions: confirm
 * features and status before changing a product to "Available".
 *
 * A product that still contains any [placeholder] is treated as unconfirmed
 * and hidden from every page. Set `featured: true` to show it on the homepage.
 */
import { confirmed } from "../lib/placeholder";

/**
 * "Available" products get a "Request a demo" button. Products that are still
 * being built only invite questions, so nothing is presented as available.
 */
export type ProductStatus = "Available" | "Currently developing" | "Upcoming project";

export type Product = {
  slug: string;
  name: string;
  category: string;
  /** Short line under the product name. */
  tagline: string;
  /** One line used on homepage cards. */
  summary: string;
  description: string;
  audience: string;
  /** Heading for the feature list, e.g. "Key features" or "Potential features". */
  featuresLabel: string;
  capabilities: string[];
  /** Closing product statement. */
  statement: string;
  status: ProductStatus;
  /** External product site or demo link. Leave empty when there is none. */
  url: string;
  featured: boolean;
};

const allProducts: Product[] = [
  {
    slug: "invoicy",
    name: "Invoicy",
    category: "Quotation & Invoice Management",
    tagline: "Simplify your business billing.",
    summary: "Simplify your business billing.",
    description:
      "Invoicy is a quotation and invoice management application designed for small businesses, shop owners, freelancers and service providers. Create professional quotations, generate invoices, manage customer details and organize your billing workflow in one convenient application.",
    audience: "Small businesses, shop owners, freelancers and service providers",
    featuresLabel: "Key features",
    capabilities: [
      "Create professional quotations",
      "Generate tax invoices",
      "Manage customer and business details",
      "Track quotation and invoice statuses",
      "Generate business-ready documents",
      "Letterhead-based document formats",
    ],
    statement: "A smarter way to manage your business paperwork.",
    status: "Currently developing",
    url: "",
    featured: true,
  },
  {
    slug: "studata",
    name: "Studata",
    category: "Student Monitoring & Management",
    tagline: "A better way to monitor student progress.",
    summary: "A better way to monitor student progress.",
    description:
      "Studata is an upcoming digital platform designed to help educational institutions monitor, manage and organize student information, activities and progress through a centralized system.",
    audience: "Educational institutions",
    featuresLabel: "Potential features",
    capabilities: [
      "Student profile management",
      "Attendance tracking",
      "Academic progress monitoring",
      "Student activity tracking",
      "Reports and analytics",
      "Parent, teacher and institution communication",
    ],
    statement: "Designed to bring student information and monitoring together.",
    status: "Upcoming project",
    url: "",
    featured: true,
  },
];

/** Products with confirmed information only. */
export const products = confirmed(allProducts);

export const featuredProducts = products.filter((p) => p.featured);
