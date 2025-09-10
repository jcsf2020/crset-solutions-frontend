import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://crset.pt";

export default function robots(): MetadataRoute.Robots {
  // Vercel define: 'production' | 'preview' | 'development'
  const vercelEnv = process.env.VERCEL_ENV;
  const isProd = vercelEnv === "production";

  if (!isProd) {
    // Bloqueia indexação em preview/dev
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  // Produção: permite e aponta o sitemap para o domínio público
  const host = new URL(BASE_URL).host;
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host,
  };
}
