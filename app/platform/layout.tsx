import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "../site-seo";

export const metadata: Metadata = createPageMetadata({
  title: "HR Platform, Timesheets & Document Compliance",
  description: "Explore Crewzy’s employee records, recruitment, time tracking, leave management, invoices and document expiry workflows, connected in one HR platform.",
  canonical: "/platform",
});
export default function PlatformLayout({ children }: { children: ReactNode }) { return children; }
