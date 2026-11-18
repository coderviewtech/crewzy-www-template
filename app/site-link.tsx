"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { useSmoothScroll } from "./smooth-scroll";
import { cancelSmoothScroll } from "./anchor-navigation";

type SiteLinkProps = Omit<ComponentProps<"a">, "href"> & { href: string };

/** Prefetch page routes; leave same-page fragments to the scroll coordinator. */
export function SiteLink({ href, children, ...props }: SiteLinkProps) {
  const pathname = usePathname();
  const scroller = useSmoothScroll();
  const localRoute = href.startsWith("/") && !href.startsWith("//");
  const samePageHash = href.startsWith("#") || (href.includes("#") && href.split("#")[0] === pathname);
  if (!localRoute || samePageHash || props.download !== undefined) return <a {...props} href={href}>{children}</a>;
  return <Link {...props} href={href} onNavigate={() => {
    // Stop inertia before Next changes the route or restores its scroll position.
    if (scroller.current) cancelSmoothScroll(scroller.current);
  }}>{children}</Link>;
}
