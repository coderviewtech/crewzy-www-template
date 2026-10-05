import type { MetadataRoute } from "next";
import { isProductionSite, siteUrl } from "./site-seo";

/* Generated at build time into /robots.txt.
   Everything here is public marketing content, so everything is crawlable —
   the point of this file is to advertise the sitemap, which is how a crawler
   discovers /solutions, /resources and /customers reliably rather than only
   by following navigation links. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    // Preview pages remain crawlable so their noindex meta tag can be read.
    ...(isProductionSite() ? { sitemap: `${siteUrl}/sitemap.xml`, host: siteUrl } : {}),
  };
}
