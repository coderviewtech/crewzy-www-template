import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "../site-seo";

/* See app/solutions/layout.tsx for why metadata lives in a layout here. */
export const metadata: Metadata = createPageMetadata({
  title: "HR Platform Resources, Security & Workflows",
  description: "Learn how Crewzy connects HR, timesheets, leave and finance. Explore employee permissions, document reviews, audit history and security controls.",
  canonical: "/resources",
});

export default function ResourcesLayout({ children }: { children: ReactNode }) {
  return children;
}
