import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "../site-seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Crewzy & Request a Demo",
  description: "Request a Crewzy walkthrough covering people management, employee lifecycle workflows, document expiry tracking and compliance evidence. Talk to the team behind Crewzy.",
  canonical: "/contact",
});
export default function ContactLayout({ children }: { children: ReactNode }) { return children; }
