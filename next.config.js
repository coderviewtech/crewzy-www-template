/** @type {import('next').NextConfig} */

// Marketing site only. No API routes, no backend calls, no auth — so the
// header set here is deliberately stricter than the product's.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];
const buildContext = process.env.CONTEXT ?? "local";
const configuredAppOrigin = process.env.NEXT_PUBLIC_APP_ORIGIN ?? "https://app.crewzy.io";
const signupFrameAncestors = buildContext === "production"
  && /^https:\/\/[a-z0-9.-]+(?::[0-9]+)?\/?$/i.test(configuredAppOrigin)
  ? new URL(configuredAppOrigin).origin : "'none'";
const indexingHeaders = buildContext === "production"
  ? []
  : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];

const nextConfig = {
  reactStrictMode: true,
  // Keep even an empty _rsc hash through pricing rewrites on Netlify.
  // Next's RSC hash validation and the adapter's cache variants remain enabled.
  skipProxyUrlNormalize: true,
  // Public build context must survive in dynamic server routes on Netlify.
  // CONTEXT itself is only guaranteed during the build. This value is not secret.
  env: { CREWZY_SITE_BUILD_CONTEXT: buildContext },
  images: {
    // Keep default quality for small assets; use 90 for the editorial photo.
    qualities: [75, 85, 90],
  },
  async headers() {
    return [
      { source: "/:path*", headers: [...securityHeaders, ...indexingHeaders] },
      { source: "/:path((?!analytics/signup$).*)", headers: [{ key: "X-Frame-Options", value: "DENY" }] },
      { source: "/analytics/signup", headers: [
        { key: "Content-Security-Policy", value: `frame-ancestors ${signupFrameAncestors}` },
        { key: "X-Robots-Tag", value: "noindex, nofollow" },
      ] },
    ];
  },
};

module.exports = nextConfig;
