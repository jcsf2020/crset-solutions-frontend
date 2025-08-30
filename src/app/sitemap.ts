import { MetadataRoute } from "next";
import { site } from "./metadata";
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const routes = ["", "/servicos", "/precos", "/agi-live", "/imobiliaria", "/demo", "/convite"];
  return routes.map(p => ({ url: `${site.url}${p}`, lastModified: now, changeFrequency: "weekly", priority: p===""?1:0.7 }));
}
