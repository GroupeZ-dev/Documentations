import type { MetadataRoute } from "next";
import manifest from "@/.generated/manifest.json";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  return [
    { url: siteUrl },
    { url: `${siteUrl}/fr` },
    ...manifest.map((page) => ({ url: `${siteUrl}${page.url}` })),
  ];
}
