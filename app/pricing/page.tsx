import { headers } from "next/headers";
import PricingContent from "./pricing-content";
import { isPricingMarket, marketForCountry } from "./pricing-model";

export const dynamic = "force-dynamic";

export default async function PricingPage({ searchParams }: {
  searchParams: Promise<{ previewMarket?: string }>;
}) {
  // Netlify's edge function replaces this header using its own country signal.
  // It is only a public display hint, never subscription billing authority.
  const requestHeaders = await headers();
  let market = marketForCountry(requestHeaders.get("x-crewzy-pricing-country"));
  if (process.env.NODE_ENV === "development") {
    // Local-only visual QA. This query is deliberately ignored in production.
    const { previewMarket } = await searchParams;
    market = isPricingMarket(previewMarket) ? previewMarket : market ?? "UK";
  }
  return <PricingContent market={market} />;
}
