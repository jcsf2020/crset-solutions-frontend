import type { MetadataRoute } from "next";

const RAW_BASE = process.env.NEXT_PUBLIC_SITE_URL || "";
const BASE_URL = (/^https?:\/\//i.test(RAW_BASE) ? RAW_BASE : "https://crset.pt").replace(/\/+$/,"");

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.VERCEL_ENV === "production";

  if (!isProd) {
    // Preview/Dev: bloquear e sem sitemap
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  // Produção: permitir e expor sitemap/host sem usar new URL()
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
