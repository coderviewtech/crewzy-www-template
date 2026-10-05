import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "../site-seo";

/* See app/solutions/layout.tsx for why metadata lives in a layout here. */
export const metadata: Metadata = createPageMetadata({
  title: "Early Access & Design Partners",
  description: "Join Crewzy’s early-access design partners and help shape a connected HR workspace for people, time, invoicing and compliance. Talk to the founding team.",
  canonical: "/customers",
});

export default function CustomersLayout({ children }: { children: ReactNode }) {
  return children;
}
