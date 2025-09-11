import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/services-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const isProd = process.env.VERCEL_ENV === "production";
  if (!isProd) return []; // previews/dev: sitemap vazio

  const now = new Date().toISOString();
  const staticRoutes = ["/", "/servicos", "/precos", "/centro-de-ajuda"];

  return [
    ...staticRoutes.map((p) => ({
      url: p, // relativo - o Next prefixa com o host
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...getAllSlugs().map((slug) => ({
      url: `/servicos/${slug}`, // relativo
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
