import { NextResponse, type NextRequest } from "next/server.js";
import { isPricingMarket, marketForCountry } from "./app/pricing/pricing-model";

type PricingPlatform = typeof globalThis & {
  Netlify?: { context?: { geo?: { country?: { code?: unknown } } } };
};

/** Route public display prices only; the app owns billing-country enforcement. */
export function proxy(request: NextRequest) {
  const target = new URL(request.url);
  if (target.pathname !== "/pricing" && target.pathname !== "/pricing/") {
    // Market paths are implementation details, never a public currency selector.
    target.pathname = "/pricing";
    const response = NextResponse.redirect(target, 307);
    response.headers.set("Cache-Control", "private, no-store");
    return response;
  }

  // Netlify runs native Next proxy at the edge and supplies this trusted context.
  // Missing geo is deliberately unknown; browser headers/cookies cannot select it.
  const country = (globalThis as PricingPlatform).Netlify?.context?.geo?.country?.code;
  let market = typeof country === "string" && country.length === 2 && /^[A-Z]{2}$/.test(country)
    ? marketForCountry(country)
    : null;
  if (process.env.NODE_ENV === "development") {
    const preview = target.searchParams.get("previewMarket");
    market = isPricingMarket(preview) ? preview : market ?? "UK";
  }

  target.pathname = `/pricing/market/${market ?? "unknown"}`;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.delete("x-crewzy-pricing-country");
  // Preserve all Next router headers and the complete query (including _rsc).
  // Native rewrites let the adapter keep public URL metadata and distinct cache keys.
  return NextResponse.rewrite(target, { request: { headers: requestHeaders } });
}

export const config = { matcher: "/pricing/:path*" };
