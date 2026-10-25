import PricingContent from "./pricing-content";

// A static, currency-neutral fallback outside the Netlify geo-routing proxy.
export const dynamic = "error";

export default function PricingPage() {
  return <PricingContent market={null} />;
}
