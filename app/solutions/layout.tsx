import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "../site-seo";

// Server layout supplies metadata for the client-rendered page.
export const metadata: Metadata = createPageMetadata({
  title: "HR Software for Agencies, Consultancies & SMEs",
  description: "Connect employee administration, billable time, invoicing and document renewals. Explore Crewzy for agencies, consultancies and insurance teams.",
  canonical: "/solutions",
});

export default function SolutionsLayout({ children }: { children: ReactNode }) {
  return children;
}
