import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { blogPosts } from "@/lib/blog";
import { business } from "@/lib/business";
import { pricingApproved } from "@/lib/pricing";
import { policiesApproved } from "@/lib/policies";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: business.siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${business.siteUrl}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${business.siteUrl}/location`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${business.siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...(pricingApproved
      ? [
          {
            url: `${business.siteUrl}/cost-and-payment`,
            lastModified: now,
            changeFrequency: "monthly" as const,
            priority: 0.8,
          },
        ]
      : []),
    ...(policiesApproved
      ? [
          {
            url: `${business.siteUrl}/policies`,
            lastModified: now,
            changeFrequency: "monthly" as const,
            priority: 0.7,
          },
        ]
      : []),
    {
      url: `${business.siteUrl}/resources`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${business.siteUrl}/dental-camps`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${business.siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${business.siteUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${business.siteUrl}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${business.siteUrl}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
