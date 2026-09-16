import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { MOCK_BLOGS } from "@/features/blog/data/mock-blogs";
import { Badge } from "@/shared/components/ui/Badge";

const BLOG_IMAGES = [
  "/images/banner/banner.jpg",
  "/images/collections/bo-suu-tap-trai-cay.jpg",
  "/images/collections/bo-suu-tap-hoa.jpg",
];

export default function BlogListPage() {
  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-moss uppercase tracking-widest block mb-2">
            Góc Thảo Dược
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-moss-dark">
            Kiến Thức &amp; Nghệ Thuật Mùi Hương
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted mt-2">
            Cùng Mộc Hương tìm hiểu các liệu pháp hương thơm, mẹo ướp thơm quần áo và chăm sóc giấc ngủ gia đình.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_BLOGS.map((post, index) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl border border-[#E3DACB] overflow-hidden shadow-[0_8px_24px_rgba(74,74,74,0.05)] hover:shadow-[0_14px_34px_rgba(74,74,74,0.09)] transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-cream">
                <Image
                  src={BLOG_IMAGES[index % BLOG_IMAGES.length]}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="p-6 space-y-4 flex-1">
                <div className="flex items-center gap-3 text-xs text-ink-muted">
                  <Badge variant="moss" size="sm">
                    {post.category}
                  </Badge>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="font-serif font-bold text-lg sm:text-xl text-moss-dark group-hover:text-terracotta transition-colors leading-snug">
                  {post.title}
                </h2>

                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="px-6 py-4 bg-cream/50 border-t border-beige/60 flex items-center justify-between text-xs font-bold text-moss-dark">
                <span>Đọc bài viết chi tiết</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
