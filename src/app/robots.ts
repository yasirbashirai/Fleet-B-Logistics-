import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/company";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/php-api/", "/admin/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
