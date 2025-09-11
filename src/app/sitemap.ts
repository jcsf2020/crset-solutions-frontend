import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/services-config";

const RAW_BASE = process.env.NEXT_PUBLIC_SITE_URL || "";
const BASE_URL = (/^https?:\/\//i.test(RAW_BASE) ? RAW_BASE : "https://crset.pt").replace(/\/+$/,"");

export default function sitemap(): MetadataRoute.Sitemap {
  const isProd = process.env.VERCEL_ENV === "production";
  if (!isProd) return []; // Preview/Dev: sitemap vazio

  const now = new Date().toISOString();
  const staticRoutes = ["/", "/servicos", "/precos", "/centro-de-ajuda"];

  return [
    ...staticRoutes.map((p) => ({
      url: `${BASE_URL}${p}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...getAllSlugs().map((slug) => ({
      url: `${BASE_URL}/servicos/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
