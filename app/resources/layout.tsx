import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "../site-seo";

/* See app/solutions/layout.tsx for why metadata lives in a layout here. */
export const metadata: Metadata = createPageMetadata({
  title: "HR Guides, Resources & Security Information",
  description: "Practical employee-record, document-renewal, timesheet and leave guides, alongside Crewzy's security controls, privacy information and service terms.",
  canonical: "/resources",
});

export default function ResourcesLayout({ children }: { children: ReactNode }) {
  return children;
}
