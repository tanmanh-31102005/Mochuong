import { MetadataRoute } from "next";
import { MOCK_BLOGS } from "@/features/blog/data/mock-blogs";
import { siteConfig } from "@/core/config/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Trang tĩnh chính
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/san-pham",
    "/bo-suu-tap",
    "/set-qua-tang",
    "/ve-chung-toi",
    "/lien-he",
    "/blog",
    "/faq",
    "/chinh-sach/doi-tra",
    "/chinh-sach/van-chuyen",
    "/chinh-sach/bao-mat",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Trang bài viết blog
  const blogRoutes: MetadataRoute.Sitemap = MOCK_BLOGS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
