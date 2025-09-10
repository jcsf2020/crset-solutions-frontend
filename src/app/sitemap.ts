import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/services-config";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://crset.pt";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const staticRoutes = ["/", "/servicos", "/precos", "/centro-de-ajuda"];

  return [
    ...staticRoutes.map((p) => ({
      url: `${BASE_URL}${p}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    })),
    ...getAllSlugs().map((slug) => ({
      url: `${BASE_URL}/servicos/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    })),
  ];
}
