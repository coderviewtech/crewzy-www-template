import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "../site-seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Us & Book an HR Platform Demo",
  description: "Book a Crewzy demo to explore HR, compliance, time tracking and invoicing for your team. Contact sales or get help with an existing workspace.",
  canonical: "/contact",
});
export default function ContactLayout({ children }: { children: ReactNode }) { return children; }
