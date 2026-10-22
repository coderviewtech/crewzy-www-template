import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "../site-seo";

/* See app/solutions/layout.tsx for why metadata lives in a layout here. */
export const metadata: Metadata = createPageMetadata({
  title: "Security, Trust & People Management Resources",
  description: "Explore Crewzy access controls, AI safeguards, privacy information and service terms alongside connected people management workflows.",
  canonical: "/resources",
});

export default function ResourcesLayout({ children }: { children: ReactNode }) {
  return children;
}
