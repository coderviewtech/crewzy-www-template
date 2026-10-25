import { notFound } from "next/navigation";
import PricingContent from "../../pricing-content";
import { isPricingMarket, PRICING_MARKETS } from "../../pricing-model";

export const dynamic = "error";
export const dynamicParams = false;

export function generateStaticParams() {
  return [...Object.keys(PRICING_MARKETS), "unknown"].map(market => ({ market }));
}

export default async function PricingMarketPage({ params }: {
  params: Promise<{ market: string }>;
}) {
  const { market } = await params;
  if (market !== "unknown" && !isPricingMarket(market)) notFound();
  // Inherit /pricing metadata: the edge rewrite serves this at the public URL.
  return <PricingContent market={isPricingMarket(market) ? market : null} />;
}
