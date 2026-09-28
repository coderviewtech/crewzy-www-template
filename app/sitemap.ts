import type { MetadataRoute } from "next";

/* Generated at build time into /sitemap.xml, and pointed at by /robots.ts.
   Keep this list in step when a route is added — it is the only place that
   tells a crawler the full set of pages, since the site has no other index. */
const SITE_URL = "https://crewzy.io";

const ROUTES = [
  { path: "", priority: 1.0 },
  { path: "/platform", priority: 0.9 },
  { path: "/solutions", priority: 0.8 },
  { path: "/resources", priority: 0.7 },
  { path: "/customers", priority: 0.6 },
  { path: "/contact", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
