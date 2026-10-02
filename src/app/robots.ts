import { MetadataRoute } from "next";
import { siteConfig } from "@/core/config/site.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/tai-khoan/", "/gio-hang/", "/thanh-toan/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
