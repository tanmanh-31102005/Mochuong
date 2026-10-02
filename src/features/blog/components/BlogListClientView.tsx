"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight, Tag, AlertCircle } from "lucide-react";
import { BlogPost } from "../types";
import { useBlogStore } from "../store/blog-store";
import { Badge } from "@/shared/components/ui/Badge";

interface BlogListClientViewProps {
  initialPosts: BlogPost[];
}

export function BlogListClientView({ initialPosts }: BlogListClientViewProps) {
  const storePosts = useBlogStore((state) => state.posts);
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("Tất cả");

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const posts = isHydrated && storePosts.length > 0 ? storePosts : initialPosts;

  const categories = [
    "Tất cả",
    ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean))),
  ];

  const filteredPosts =
    activeCategory === "Tất cả"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-10">
      {/* Category Filter Pills */}
      {categories.length > 2 && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#59683A] text-white shadow-xs"
                  : "bg-white text-ink/70 hover:bg-cream border border-beige"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredPosts.map((post) => {
          const postSlug = (post.seo?.slug || post.slug).replace(/^\/+/, "");
          const coverImage = post.coverImage || "/images/banner/banner.jpg";

          return (
            <Link
              key={post.id}
              href={`/blog/${postSlug}`}
              className="group bg-white rounded-2xl border border-[#E3DACB] overflow-hidden shadow-[0_8px_24px_rgba(74,74,74,0.05)] hover:shadow-[0_14px_34px_rgba(74,74,74,0.09)] transition-all duration-300 flex flex-col relative"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-cream">
                <Image
                  src={coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {post.status === "draft" && (
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/90 backdrop-blur-xs text-white shadow-xs">
                    <AlertCircle className="w-2.5 h-2.5" />
                    <span>Bản nháp</span>
                  </span>
                )}
              </div>

              <div className="p-6 space-y-4 flex-1">
                <div className="flex items-center gap-3 text-xs text-ink-muted">
                  <Badge variant="moss" size="sm">
                    {post.category || "Mẹo hay"}
                  </Badge>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime || "3 phút đọc"}
                  </span>
                </div>

                <h2 className="font-serif font-bold text-lg sm:text-xl text-moss-dark group-hover:text-terracotta transition-colors leading-snug line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {post.seo?.focusKeyword && (
                  <div className="pt-1 flex items-center gap-1 text-[11px] text-moss font-medium">
                    <Tag className="w-3 h-3" />
                    <span>{post.seo.focusKeyword}</span>
                  </div>
                )}
              </div>

              <div className="px-6 py-4 bg-cream/50 border-t border-beige/60 flex items-center justify-between text-xs font-bold text-moss-dark group-hover:bg-cream transition-colors">
                <span>Đọc bài viết chi tiết</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
