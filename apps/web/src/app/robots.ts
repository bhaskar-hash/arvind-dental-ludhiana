import type { MetadataRoute } from "next";
import { business } from "@/lib/business";

export default function robots(): MetadataRoute.Robots {
  return {
    // Named rules for the AI search crawlers make the intent explicit; "*" covers the rest.
    rules: [
      {
        userAgent: [
          "OAI-SearchBot",
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "Perplexity-User",
          "Googlebot",
          "Google-Extended",
          "ClaudeBot",
          "anthropic-ai",
          "Claude-Web",
          "Applebot",
          "Applebot-Extended",
          "Bingbot",
        ],
        allow: ["/", "/llms.txt", "/llms-full.txt"],
      },
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${business.siteUrl}/sitemap.xml`,
  };
}
