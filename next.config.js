/** @type {import('next').NextConfig} */

// Marketing site only. No API routes, no backend calls, no auth — so the
// header set here is deliberately stricter than the product's.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig = {
  reactStrictMode: true,
  // Keep even an empty _rsc hash through pricing rewrites on Netlify.
  // Next's RSC hash validation and the adapter's cache variants remain enabled.
  skipProxyUrlNormalize: true,
  // Public build context must survive in dynamic server routes on Netlify.
  // CONTEXT itself is only guaranteed during the build. This value is not secret.
  env: { CREWZY_SITE_BUILD_CONTEXT: process.env.CONTEXT ?? "local" },
  images: {
    // Keep default quality for small assets; use 90 for the editorial photo.
    qualities: [75, 85, 90],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

module.exports = nextConfig;
