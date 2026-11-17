import type { MetadataRoute } from "next";
import { isProductionSite, siteUrl } from "./site-seo";

/* Public content and rendering assets stay crawlable. Internal links and the
   sitemap help discovery; indexing remains the search engine's decision. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    // Preview pages remain crawlable so their noindex meta tag can be read.
    ...(isProductionSite() ? { sitemap: `${siteUrl}/sitemap.xml`, host: siteUrl } : {}),
  };
}
