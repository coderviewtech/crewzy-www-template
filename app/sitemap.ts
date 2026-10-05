import type { MetadataRoute } from "next";
import { isProductionSite, siteUrl } from "./site-seo";

/* Generated at build time into /sitemap.xml, and pointed at by /robots.ts.
   Keep this list in step when a route is added — it is the only place that
   tells a crawler the full set of pages, since the site has no other index. */
const ROUTES = [
  { path: "", priority: 1.0 },
  { path: "/platform", priority: 0.9 },
  { path: "/solutions", priority: 0.8 },
  { path: "/resources", priority: 0.7 },
  { path: "/customers", priority: 0.6 },
  { path: "/contact", priority: 0.6 },
  { path: "/about", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isProductionSite()) return [];
  // Omit lastModified until we have real per-page modification dates.
  // Rebuilding unrelated code does not mean every page's content changed.
  return ROUTES.map(({ path, priority }) => ({
    url: `${siteUrl}${path || "/"}`,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
