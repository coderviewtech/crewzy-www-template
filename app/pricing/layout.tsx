import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "../site-seo";

export const metadata: Metadata = createPageMetadata({
  title: "Pricing: Free & Business Plans",
  description: "Compare Crewzy Free and Business. Free for up to 10 employees, with local Business pricing for India, the UK, the US and the euro area. Calculate your team’s monthly or annual cost.",
  canonical: "/pricing",
});

export default function PricingLayout({ children }: { children: ReactNode }) {
  return children;
}
