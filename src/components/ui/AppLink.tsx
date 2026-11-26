import { Link } from "react-router";

type AppLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

/**
 * Drop-in replacement for next/link's <Link href>. Internal paths use React
 * Router (client-side navigation); same-page #anchors, external URLs and
 * mailto:/tel: links stay plain anchors so the browser handles them natively
 * (smooth scrolling and scroll-padding come from globals.css).
 */
export function AppLink({ href, ...rest }: AppLinkProps) {
  if (/^(#|[a-z][a-z\d+.-]*:|\/\/)/i.test(href)) return <a href={href} {...rest} />;
  return <Link to={href} {...rest} />;
}
