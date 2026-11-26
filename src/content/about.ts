/**
 * About page content.
 *
 * Story, mission, vision and facts come from NALIMAT Technology Website
 * Content & Brand Messaging (section 02 and the brand positioning table).
 * Story paragraphs and leadership entries containing a [placeholder] are
 * hidden until confirmed. Add facts (such as the founding year or
 * headquarters) only once they are verified.
 */
import { confirmed } from "../lib/placeholder";

export const about = {
  story: confirmed([
    "NALIMAT Technology is a technology-driven company focused on creating digital solutions that help businesses, entrepreneurs and institutions work smarter.",
    "From building websites and mobile applications to developing our own software products, we combine technology, design and innovation to solve real-world challenges. Our goal is to make technology accessible, efficient and meaningful for businesses of every size.",
  ]),
  mission:
    "To simplify everyday business and organizational operations through accessible, reliable and user-friendly technology.",
  vision:
    "To become a trusted technology partner for businesses and institutions by building innovative digital products that make everyday work easier.",
  values: [
    { title: "Clarity", body: "Plain language, written decisions and honest estimates." },
    { title: "Craft", body: "Careful design and engineering that holds up over years, not weeks." },
    { title: "Ownership", body: "We stay accountable for what we build after launch." },
    { title: "Partnership", body: "Your goals set the priorities; we bring the expertise to reach them." },
  ],
  facts: [
    { label: "Industry", value: "Software & Digital Solutions" },
    { label: "Core services", value: "Websites, mobile applications, custom software & UI/UX" },
    { label: "Audience", value: "Small businesses, shops, startups, companies & educational institutions" },
    { label: "Current product", value: "Invoicy" },
    { label: "Upcoming product", value: "Studata" },
  ],
  /** Add team members once approved for publication. */
  leadership: confirmed([] as { name: string; role: string }[]),
};
