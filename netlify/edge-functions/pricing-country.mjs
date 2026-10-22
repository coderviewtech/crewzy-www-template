/** Public pricing display only. Never use this signal to authorize a paid plan. */
export default async function pricingCountry(request, context) {
  const requestHeaders = new Headers(request.headers);
  // A browser-supplied country header must never override the hosting signal.
  requestHeaders.delete("x-crewzy-pricing-country");
  const country = context.geo?.country?.code;
  if (typeof country === "string" && /^[A-Z]{2}$/.test(country)) {
    requestHeaders.set("x-crewzy-pricing-country", country);
  }
  const response = await context.next(new Request(request, { headers: requestHeaders }));
  const responseHeaders = new Headers(response.headers);
  // Prevent a shared CDN/browser cache from serving one country's prices to another.
  responseHeaders.set("Cache-Control", "private, no-store");
  responseHeaders.set("CDN-Cache-Control", "no-store");
  responseHeaders.set("Netlify-CDN-Cache-Control", "no-store");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers: responseHeaders });
}
