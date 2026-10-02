import React from "react";
import type { Metadata } from "next";
import { MOCK_BLOGS } from "@/features/blog/data/mock-blogs";
import { BlogListClientView } from "@/features/blog/components/BlogListClientView";

export const metadata: Metadata = {
  title: "Góc Thảo Dược & Mẹo Dùng Xịt Thơm Quần Áo | Mộc Hương",
  description:
    "Cẩm nang hướng dẫn cách sử dụng xịt thơm quần áo đúng cách, mẹo ướp hương trang phục tự nhiên bền lâu và thư giãn tinh thần với liệu pháp hương thơm thảo mộc.",
  keywords: [
    "xịt thơm quần áo",
    "mẹo dùng xịt thơm quần áo",
    "Mộc Hương",
    "thảo mộc tự nhiên",
    "chăm sóc trang phục",
  ],
};

export default function BlogListPage() {
  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-moss uppercase tracking-widest block mb-2">
            Góc Thảo Dược &amp; Phong Cách Sống
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-moss-dark">
            Kiến Thức &amp; Nghệ Thuật Mùi Hương
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted mt-2">
            Cùng Mộc Hương tìm hiểu các bí quyết ướp thơm quần áo tự nhiên, khử sạch mùi ẩm mốc và nâng niu từng sợi vải gia đình.
          </p>
        </div>

        <BlogListClientView initialPosts={MOCK_BLOGS} />
      </div>
    </div>
  );
}
