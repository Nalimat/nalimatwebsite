/**
 * Company-wide settings. Edit this file to change contact details, navigation
 * and social links across the whole website.
 *
 * Convention: any value wrapped in [square brackets] is a placeholder that must
 * be replaced with verified company information before launch.
 * Run `npm run check:placeholders` to list every remaining placeholder.
 * Placeholder values are never shown on the website; they are hidden instead.
 */
import { confirmedValue } from "@/lib/placeholder";
import { insights } from "./insights";
import { roles } from "./careers";

export const site = {
  name: "Nalimat",
  url: "https://nalimat.com",
  tagline: "Building Technology for a Smarter Business Future.",
  description:
    "Nalimat builds digital products and delivers technology solutions that help businesses simplify operations, innovate, and grow.",
  locale: "en_US",

  contact: {
    email: "[hello@nalimat.com]",
    phone: "[+00 00000 00000]",
    address: ["[Office address line 1]", "[City, State, Postal code]", "[Country]"],
    hours: "[Monday to Friday, 9:00 to 18:00 local time]",
  },

  /** Leave a URL empty ("") to hide that link everywhere on the site. */
  social: {
    linkedin: "",
    github: "",
    x: "",
  },

  legal: {
    registeredName: "[Registered company name]",
  },
} as const;

/**
 * Contact details as shown on the website. Unconfirmed [placeholder] values
 * are null, so they are hidden rather than displayed.
 */
export const contactDetails = {
  email: confirmedValue(site.contact.email),
  phone: confirmedValue(site.contact.phone),
  address: confirmedValue(site.contact.address),
  hours: confirmedValue(site.contact.hours),
};

export type NavItem = { label: string; href: string };

/**
 * Header navigation. Insights and Careers join the header once they have
 * published articles or open roles; until then they stay reachable from the
 * footer and sitemap without being promoted as fully populated sections.
 */
export const mainNav: NavItem[] = [
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  ...(insights.length > 0 ? [{ label: "Insights", href: "/insights" }] : []),
  ...(roles.length > 0 ? [{ label: "Careers", href: "/careers" }] : []),
];

export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About Nalimat", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "What we do",
    links: [
      { label: "Products", href: "/products" },
      { label: "Services", href: "/services" },
      { label: "Industries", href: "/industries" },
      { label: "Start a project", href: "/contact?topic=project" },
    ],
  },
];
