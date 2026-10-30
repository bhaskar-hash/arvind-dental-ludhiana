import type { MetadataRoute } from "next";
import { business } from "@/lib/business";

export default function robots(): MetadataRoute.Robots {
  return {
    // Named rules for the AI search crawlers make the intent explicit; "*" covers the rest.
    rules: [
      { userAgent: ["OAI-SearchBot", "PerplexityBot", "Bingbot", "Googlebot"], allow: "/" },
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${business.siteUrl}/sitemap.xml`,
  };
}
