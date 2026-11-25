/**
 * Software products built and owned by Nalimat.
 *
 * Replace each [placeholder] with the real product. A product that still
 * contains any [placeholder] is treated as unconfirmed and hidden from every
 * page; it appears automatically once all of its fields are filled in.
 * Set `featured: true` to show a product on the homepage (up to 3 look best).
 */
import { confirmed } from "@/lib/placeholder";

export type ProductStatus = "Available" | "In beta" | "In development";

export type Product = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  audience: string;
  capabilities: string[];
  status: ProductStatus;
  /** External product site or demo link. Leave empty to show "Request a demo". */
  url: string;
  featured: boolean;
};

const allProducts: Product[] = [
  {
    slug: "product-one",
    name: "[Product one name]",
    category: "[Product category, e.g. Operations platform]",
    summary: "[One-sentence summary of what the product does for its user.]",
    description:
      "[Two or three sentences describing the problem this product solves, who uses it day to day, and how it fits into their work.]",
    audience: "[Who it is for, e.g. Operations teams in mid-sized companies]",
    capabilities: ["[Key capability]", "[Key capability]", "[Key capability]", "[Key capability]"],
    status: "Available",
    url: "",
    featured: true,
  },
  {
    slug: "product-two",
    name: "[Product two name]",
    category: "[Product category]",
    summary: "[One-sentence summary of what the product does for its user.]",
    description:
      "[Two or three sentences describing the problem this product solves, who uses it day to day, and how it fits into their work.]",
    audience: "[Who it is for]",
    capabilities: ["[Key capability]", "[Key capability]", "[Key capability]"],
    status: "In beta",
    url: "",
    featured: true,
  },
  {
    slug: "product-three",
    name: "[Product three name]",
    category: "[Product category]",
    summary: "[One-sentence summary of what the product does for its user.]",
    description:
      "[Two or three sentences describing the problem this product solves, who uses it day to day, and how it fits into their work.]",
    audience: "[Who it is for]",
    capabilities: ["[Key capability]", "[Key capability]", "[Key capability]"],
    status: "In development",
    url: "",
    featured: true,
  },
];

/** Products with confirmed information only. */
export const products = confirmed(allProducts);

export const featuredProducts = products.filter((p) => p.featured);
