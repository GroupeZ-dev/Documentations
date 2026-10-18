import type { MetadataRoute } from "next";
import { official, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(official ? { allow: "/" } : { disallow: "/" }),
    },
    ...(official && siteUrl ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
