import type { MetadataRoute } from "next";
import { isProductionSite, siteUrl } from "./site-seo";
import { marketingPaths } from "./site-routes";

// Legal launch pages remain noindex and outside the marketing inventory.
export default function sitemap(): MetadataRoute.Sitemap {
  if (!isProductionSite()) return [];
  // Omit lastModified until we have real per-page modification dates.
  // Rebuilding unrelated code does not mean every page's content changed.
  return marketingPaths.map(path => ({ url: new URL(path, siteUrl).href }));
}
