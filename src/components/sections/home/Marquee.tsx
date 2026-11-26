import { products } from "@/content/products";
import { services } from "@/content/services";
import { site } from "@/content/site";

/**
 * Brand ticker under the hero: services, products and the tagline scroll
 * slowly in a loop (pauses on hover; static with reduced motion).
 * The list is announced once; the duplicate that makes the loop seamless is
 * hidden from assistive technology.
 */
export function Marquee() {
  const items = [...services.map((s) => s.name), ...products.map((p) => p.name), site.tagline.replace(/\.$/, "")];

  const row = (key: string) => (
    <ul key={key} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-7 whitespace-nowrap sm:px-9">{item}</span>
          <svg viewBox="0 0 12 12" aria-hidden className="h-2.5 w-2.5 shrink-0 text-accent">
            <path d="M6 0 L7.4 4.6 L12 6 L7.4 7.4 L6 12 L4.6 7.4 L0 6 L4.6 4.6 Z" fill="currentColor" />
          </svg>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-navy-800 py-5 text-white">
      <p className="sr-only">{items.join(", ")}</p>
      <div aria-hidden className="eyebrow flex w-max text-[0.9375rem] tracking-[0.18em] text-on-navy anim-marquee">
        {row("a")}
        {row("b")}
      </div>
      {/* Edge fades */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-navy-800 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-navy-800 to-transparent" />
    </div>
  );
}
