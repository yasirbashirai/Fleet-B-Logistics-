import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/company";
import { SERVICES } from "@/data/services";
import { REGIONS } from "@/data/regions";
import { INDUSTRIES } from "@/data/industries";
import { BLOG_POSTS } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
    "",
    "/about",
    "/services",
    "/owner-operators",
    "/apply",
    "/onboarding",
    "/resources",
    "/quote",
    "/contact",
    "/reviews",
    "/blog",
    "/areas",
    "/industries",
  ].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : p === "/owner-operators" || p === "/quote" ? 0.9 : 0.7,
  }));

  return [
    ...staticPages,
    ...SERVICES.map((s) => ({ url: `${SITE_URL}/services/${s.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...REGIONS.map((r) => ({ url: `${SITE_URL}/areas/${r.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...INDUSTRIES.map((i) => ({ url: `${SITE_URL}/industries/${i.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...BLOG_POSTS.map((b) => ({ url: `${SITE_URL}/blog/${b.slug}`, lastModified: new Date(b.date), changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
