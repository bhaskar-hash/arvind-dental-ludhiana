import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { blogPosts } from "@/lib/blog";
import { business } from "@/lib/business";
import { pricingApproved } from "@/lib/pricing";
import { policiesApproved } from "@/lib/policies";

export default function sitemap(): MetadataRoute.Sitemap {
  // Draft pages (awaiting Dr. Sahu's approval) stay out of the sitemap.
  const paths = [
    "",
    "/about",
    "/location",
    "/services",
    "/blog",
    "/resources",
    "/privacy",
    ...(pricingApproved ? ["/cost-and-payment"] : []),
    ...(policiesApproved ? ["/policies"] : []),
  ];
  const staticRoutes = paths.map((path) => ({
    url: `${business.siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${business.siteUrl}/services/${service.slug}`,
    lastModified: new Date(),
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${business.siteUrl}/blog/${post.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
