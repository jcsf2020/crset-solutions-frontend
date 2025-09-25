import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/services-config";

function normalize(raw?: string) {
  const v = (raw ?? "").trim();
  return /^https?:\/\//i.test(v) ? v.replace(/\/+$/,"") : "https://crsetsolutions.com";
}
const BASE_URL = normalize(process.env.NEXT_PUBLIC_SITE_URL);

export default function sitemap(): MetadataRoute.Sitemap {
  const isProd = process.env.VERCEL_ENV === "production";
  if (!isProd) return [];

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
