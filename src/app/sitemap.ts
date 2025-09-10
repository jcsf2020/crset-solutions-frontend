import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/services-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3005").replace(/\/+$/,"");
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now },
    { url: `${baseUrl}/precos`, lastModified: now },
    { url: `${baseUrl}/servicos`, lastModified: now },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = getAllSlugs().map((slug) => ({
    url: `${baseUrl}/servicos/${slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
