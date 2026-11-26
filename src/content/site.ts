/**
 * Company-wide settings. Edit this file to change contact details, navigation
 * and social links across the whole website.
 *
 * Convention: any value wrapped in [square brackets] is a placeholder that must
 * be replaced with verified company information before launch.
 * Run `npm run check:placeholders` to list every remaining placeholder.
 * Placeholder values are never shown on the website; they are hidden instead.
 */
import { confirmedValue } from "../lib/placeholder";

export const site = {
  name: "NALIMAT Technology",
  url: "https://nalimat.com",
  tagline: "Technology that simplifies business.",
  description:
    "We help small businesses, shops and growing companies simplify their operations through thoughtfully designed websites, applications and digital solutions.",
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
 * Header navigation, as set in the brand content document:
 * Home | About | Services | Products | Contact. Contact is the header's
 * "Contact us" button (and the last item of the mobile menu). Who we work
 * with, Insights and Careers stay reachable from the footer and sitemap.
 */
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
];

export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About NALIMAT", href: "/about" },
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
      { label: "Who we work with", href: "/industries" },
      { label: "Start a Project", href: "/contact?topic=project" },
    ],
  },
];
