import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/services-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const isProd = process.env.VERCEL_ENV === "production";
  if (!isProd) return []; // previews/dev: sitemap vazio

  // Use NEXT_PUBLIC_SITE_URL com fallback para crsetsolutions.com
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://crsetsolutions.com';
  const now = new Date().toISOString();
  const staticRoutes = ["/", "/servicos", "/precos", "/centro-de-ajuda"];

  return [
    ...staticRoutes.map((path) => ({
      url: new URL(path, SITE_URL).href, // URL absoluto
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 0.9 : 0.7,
    })),
    ...getAllSlugs().map((slug) => ({
      url: new URL(`/servicos/${slug}`, SITE_URL).href, // URL absoluto
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
