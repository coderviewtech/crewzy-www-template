import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "../site-seo";

/* See app/solutions/layout.tsx for why metadata lives in a layout here. */
export const metadata: Metadata = createPageMetadata({
  title: "Early Access & Design Partners",
  description: "Explore Crewzy with sample data, discuss your people management and compliance workflows, and help shape a more connected workspace through early-access conversations.",
  canonical: "/customers",
});

export default function CustomersLayout({ children }: { children: ReactNode }) {
  return children;
}
