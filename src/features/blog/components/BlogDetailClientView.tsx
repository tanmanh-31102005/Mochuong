"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  ArrowLeft,
  Calendar,
  User,
  Share2,
  Check,
  Tag,
  Sparkles,
  BookOpen,
  ArrowRight,
  AlertCircle,
  ShoppingBag,
} from "lucide-react";
import { BlogPost } from "../types";
import { useBlogStore } from "../store/blog-store";
import { MOCK_BLOGS } from "../data/mock-blogs";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";

interface BlogDetailClientViewProps {
  slug: string;
  initialPost: BlogPost | null;
}

export function BlogDetailClientView({
  slug,
  initialPost,
}: BlogDetailClientViewProps) {
  const storePosts = useBlogStore((state) => state.posts);
  const [isHydrated, setIsHydrated] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const cleanSlug = (slug || "").trim().replace(/^\/+|\/+$/g, "").toLowerCase();

  // Find post from store (client-first to reflect user edits in Admin CMS),
  // fallback to initialPost (from SSR), then fallback to MOCK_BLOGS.
  const clientPost = storePosts.find((p) => {
    const pSlug = (p.slug || "").trim().replace(/^\/+|\/+$/g, "").toLowerCase();
    const seoSlug = (p.seo?.slug || "").trim().replace(/^\/+|\/+$/g, "").toLowerCase();
    return pSlug === cleanSlug || seoSlug === cleanSlug;
  });

  const post: BlogPost | undefined =
    clientPost ||
    initialPost ||
    MOCK_BLOGS.find((p) => {
      const pSlug = (p.slug || "").trim().replace(/^\/+|\/+$/g, "").toLowerCase();
      const seoSlug = (p.seo?.slug || "").trim().replace(/^\/+|\/+$/g, "").toLowerCase();
      return pSlug === cleanSlug || seoSlug === cleanSlug;
    });

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // State: Loading skeleton if not yet hydrated and no initial post
  if (!isHydrated && !initialPost) {
    return (
      <div className="py-12 sm:py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
        <div className="h-4 w-32 bg-beige rounded" />
        <div className="space-y-4">
          <div className="h-6 w-24 bg-beige rounded-full" />
          <div className="h-10 w-full bg-beige rounded" />
          <div className="h-4 w-48 bg-beige rounded" />
        </div>
        <div className="aspect-[16/8] bg-beige rounded-2xl" />
        <div className="space-y-3">
          <div className="h-4 w-full bg-beige rounded" />
          <div className="h-4 w-5/6 bg-beige rounded" />
          <div className="h-4 w-4/6 bg-beige rounded" />
        </div>
      </div>
    );
  }

  // State: Post not found
  if (isHydrated && !post) {
    return (
      <div className="py-16 sm:py-24 max-w-2xl mx-auto px-4 text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-moss-dark">
            Không Tìm Thấy Bài Viết
          </h1>
          <p className="text-sm text-ink/70">
            Bài viết có đường dẫn <code className="bg-cream px-2 py-0.5 rounded text-moss-dark font-mono">/blog/{cleanSlug}</code> chưa được tạo hoặc đã thay đổi đường dẫn.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link href="/blog">
            <Button variant="primary">
              <BookOpen className="w-4 h-4 mr-2" />
              <span>Xem tất cả bài viết</span>
            </Button>
          </Link>
          <Link href="/admin/bai-viet">
            <Button variant="outline">
              <span>Trang quản trị bài viết</span>
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!post) return null;

  const coverImage = post.coverImage || "/images/banner/banner.jpg";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.seo?.seoTitle || post.title,
    description: post.seo?.seoDescription || post.excerpt,
    author: {
      "@type": "Person",
      name: post.author || "Mộc Hương",
    },
    publisher: {
      "@type": "Organization",
      name: "Mộc Hương",
      logo: {
        "@type": "ImageObject",
        url: "https://mochuong.vn/images/logo/logo-clean.png",
      },
    },
    datePublished: post.publishedAt,
    mainEntityOfPage: `https://mochuong.vn/blog/${post.slug}`,
  };

  // Other related posts
  const relatedPosts = (storePosts.length > 0 ? storePosts : MOCK_BLOGS)
    .filter((p) => p.id !== post.id && p.status === "published")
    .slice(0, 3);

  // Parse raw text into structured paragraphs, headings and lists
  const renderContent = (content: string) => {
    if (!content) {
      return (
        <p className="italic text-ink/60">Nội dung bài viết đang được cập nhật...</p>
      );
    }

    const lines = content.split("\n");
    const blocks: React.ReactNode[] = [];
    let currentParagraph: string[] = [];

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(" ").trim();
        if (text) {
          blocks.push(
            <p key={`p-${blocks.length}`} className="leading-relaxed">
              {text}
            </p>
          );
        }
        currentParagraph = [];
      }
    };

    lines.forEach((rawLine, idx) => {
      const line = rawLine.trim();

      if (!line) {
        flushParagraph();
        return;
      }

      // Heading 1 or 2: # or ## or "1. ", "2. "
      if (line.startsWith("# ")) {
        flushParagraph();
        blocks.push(
          <h2
            key={`h1-${idx}`}
            className="font-serif font-bold text-xl sm:text-2xl text-moss-dark pt-4"
          >
            {line.replace(/^#\s*/, "")}
          </h2>
        );
      } else if (line.startsWith("## ") || line.startsWith("### ")) {
        flushParagraph();
        blocks.push(
          <h3
            key={`h2-${idx}`}
            className="font-serif font-bold text-lg sm:text-xl text-moss-dark pt-3"
          >
            {line.replace(/^###?\s*/, "")}
          </h3>
        );
      } else if (/^\d+\.\s/.test(line)) {
        flushParagraph();
        blocks.push(
          <h3
            key={`num-h-${idx}`}
            className="font-serif font-bold text-base sm:text-lg text-moss-dark pt-4 text-emerald-950 flex items-center gap-2"
          >
            <span className="w-6 h-6 rounded-full bg-moss/10 text-moss flex items-center justify-center text-xs font-mono font-bold">
              {line.match(/^\d+/)?.[0]}
            </span>
            <span>{line.replace(/^\d+\.\s*/, "")}</span>
          </h3>
        );
      } else if (line.startsWith("- ") || line.startsWith("• ") || line.startsWith("* ")) {
        flushParagraph();
        const bulletText = line.replace(/^[-•*]\s*/, "");
        blocks.push(
          <div
            key={`bullet-${idx}`}
            className="flex items-start gap-2.5 pl-2 text-ink/80 leading-relaxed"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-moss mt-2 shrink-0" />
            <span>{bulletText}</span>
          </div>
        );
      } else {
        currentParagraph.push(line);
      }
    });

    flushParagraph();
    return blocks;
  };

  return (
    <div className="py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation & Status bar */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-moss hover:text-moss-dark transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Quay lại cẩm nang mẹo thơm</span>
          </Link>

          {post.status === "draft" && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              <AlertCircle className="w-3 h-3" />
              <span>Bản xem trước (Nháp)</span>
            </span>
          )}
        </div>

        {/* Header bài viết */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="moss" size="md">
              {post.category || "Mẹo hay cuộc sống"}
            </Badge>

            {post.seo?.focusKeyword && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-cream text-moss-dark border border-beige">
                <Tag className="w-3 h-3 text-moss" />
                <span>{post.seo.focusKeyword}</span>
              </span>
            )}
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-moss-dark leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-ink/60 pb-4 border-b border-beige">
            <span className="flex items-center gap-1 font-medium text-ink/80">
              <User className="w-3.5 h-3.5 text-moss" />
              {post.author || "Mộc Hương Team"}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.publishedAt || "02/10/2026"}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime || "3 phút đọc"}
            </span>
          </div>
        </div>

        {/* Ảnh bìa */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-[#E3DACB] shadow-[0_10px_30px_rgba(74,74,74,0.06)] bg-cream">
          <Image
            src={coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        {/* Nội dung chi tiết */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E3DACB] shadow-[0_10px_30px_rgba(74,74,74,0.05)] space-y-6 text-sm sm:text-base text-ink/85 leading-relaxed">
          {post.excerpt && (
            <div className="p-4 rounded-xl bg-[#FAF6EE] border-l-4 border-moss text-moss-dark font-serif italic text-base sm:text-lg leading-relaxed">
              {post.excerpt}
            </div>
          )}

          <div className="space-y-4 pt-2">
            {renderContent(post.content)}
          </div>

          {/* Social share & copy link */}
          <div className="pt-8 border-t border-beige flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-ink/60">
              Chủ đề: <strong className="text-moss-dark">{post.seo?.focusKeyword || "Xịt thơm quần áo"}</strong>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="text-xs flex items-center gap-1.5"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-moss" />
                    <span className="text-moss font-bold">Đã sao chép link!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Chia sẻ bài viết</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Banner CTA */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#25391C] to-[#39502A] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-[0_12px_30px_rgba(37,57,28,0.2)]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#EAE4D9] uppercase font-bold tracking-wider">
              <Sparkles className="w-4 h-4 text-[#D8B168]" />
              <span>Sản phẩm khuyên dùng</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold">
              Trải nghiệm Xịt Thơm Quần Áo Mộc Hương 30ml
            </h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-md">
              Chiết xuất 100% thảo mộc hữu cơ. Khử sạch mùi ẩm mốc, giữ nếp vải thơm ngát suốt ngày dài.
            </p>
          </div>
          <Link href="/san-pham" className="shrink-0">
            <Button
              variant="secondary"
              className="bg-[#D8B168] hover:bg-[#c9a154] text-moss-dark font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-md"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              <span>Xem sản phẩm</span>
            </Button>
          </Link>
        </div>

        {/* Gợi ý bài viết khác */}
        {relatedPosts.length > 0 && (
          <div className="pt-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif font-bold text-xl text-moss-dark">
                Bài viết liên quan
              </h2>
              <Link
                href="/blog"
                className="text-xs font-bold text-moss hover:text-moss-dark flex items-center gap-1"
              >
                <span>Xem tất cả</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.seo?.slug || related.slug}`}
                  className="group bg-white p-4 rounded-xl border border-beige hover:border-moss/40 shadow-xs transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-moss uppercase tracking-wider">
                      {related.category}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-moss-dark group-hover:text-terracotta transition-colors line-clamp-2">
                      {related.title}
                    </h4>
                  </div>
                  <div className="text-[11px] text-ink/50 pt-3 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{related.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
