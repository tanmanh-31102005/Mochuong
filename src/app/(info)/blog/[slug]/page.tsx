import React from "react";
import type { Metadata } from "next";
import { MOCK_BLOGS } from "@/features/blog/data/mock-blogs";
import { BlogDetailClientView } from "@/features/blog/components/BlogDetailClientView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cleanSlug = (slug || "").trim().replace(/^\/+|\/+$/g, "").toLowerCase();
  const post = MOCK_BLOGS.find(
    (b) =>
      b.slug.replace(/^\/+|\/+$/g, "").toLowerCase() === cleanSlug ||
      b.seo?.slug?.replace(/^\/+|\/+$/g, "").toLowerCase() === cleanSlug
  );

  if (!post) {
    const formattedTitle = cleanSlug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    return {
      title: `${formattedTitle || "Bài Viết"} | Mộc Hương Xịt Thơm Quần Áo`,
      description:
        "Cẩm nang hướng dẫn mẹo xịt thơm quần áo tự nhiên và phong cách sống xanh từ Mộc Hương.",
    };
  }

  const title = post.seo?.seoTitle || post.title;
  const description = post.seo?.seoDescription || post.excerpt;

  return {
    title: `${title} | Mộc Hương`,
    description,
    keywords: [
      post.seo?.focusKeyword || "xịt thơm quần áo",
      "Mộc Hương",
      post.category,
      "tinh dầu thiên nhiên",
    ],
    alternates: {
      canonical:
        post.seo?.canonicalUrl || `https://mochuong.vn/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://mochuong.vn/blog/${post.slug}`,
      siteName: "Mộc Hương",
      locale: "vi_VN",
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cleanSlug = (slug || "").trim().replace(/^\/+|\/+$/g, "").toLowerCase();
  const post =
    MOCK_BLOGS.find(
      (b) =>
        b.slug.replace(/^\/+|\/+$/g, "").toLowerCase() === cleanSlug ||
        b.seo?.slug?.replace(/^\/+|\/+$/g, "").toLowerCase() === cleanSlug
    ) || null;

  return <BlogDetailClientView slug={cleanSlug} initialPost={post} />;
}
