"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  Search,
  PlusCircle,
  Edit3,
  ExternalLink,
  Eye,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { useBlogStore } from "@/features/blog/store/blog-store";
import { Badge } from "@/shared/components/ui/Badge";

export default function AdminBlogListPage() {
  const posts = useBlogStore((state) => state.posts);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [search, setSearch] = useState("");

  const filteredPosts = posts.filter((post) => {
    if (filter !== "all" && post.status !== filter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        post.title.toLowerCase().includes(q) ||
        post.seo.slug.toLowerCase().includes(q) ||
        post.seo.seoTitle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#25391C]">
            Quản Lý Bài Viết & Cài Đặt SEO
          </h1>
          <p className="text-xs text-ink/60 mt-1">
            Thiết lập tiêu đề SEO, mô tả meta và đường dẫn (slug) chuẩn Google cho từng bài viết.
          </p>
        </div>

        <Link
          href="/admin/bai-viet/them-moi"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#59683A] text-white text-xs font-bold hover:bg-[#47542E] transition-all shadow-xs self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Thêm bài viết mới</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E3DACB] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              filter === "all"
                ? "bg-[#59683A] text-white"
                : "bg-cream text-ink/70 hover:text-ink"
            }`}
          >
            Tất cả ({posts.length})
          </button>
          <button
            onClick={() => setFilter("published")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              filter === "published"
                ? "bg-[#59683A] text-white"
                : "bg-cream text-ink/70 hover:text-ink"
            }`}
          >
            Đã xuất bản ({posts.filter((p) => p.status === "published").length})
          </button>
          <button
            onClick={() => setFilter("draft")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              filter === "draft"
                ? "bg-[#59683A] text-white"
                : "bg-cream text-ink/70 hover:text-ink"
            }`}
          >
            Bản nháp ({posts.filter((p) => p.status === "draft").length})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
          <input
            type="text"
            placeholder="Tìm theo tiêu đề, slug, từ khóa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-beige bg-cream/30 text-xs text-ink placeholder:text-ink/40 focus:outline-none focus:border-moss"
          />
        </div>
      </div>

      {/* Table of posts */}
      <div className="bg-white rounded-3xl border border-[#E3DACB] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF6EE] border-b border-beige text-ink/60 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Bài viết & Tiêu đề</th>
                <th className="py-3 px-4">Đường dẫn (Slug)</th>
                <th className="py-3 px-4">Cài đặt SEO (Tiêu đề & Mô tả)</th>
                <th className="py-3 px-4 text-center">Trạng thái</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-beige">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-cream/30 transition-colors">
                  <td className="py-4 px-4 max-w-xs">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-cream border border-beige overflow-hidden shrink-0 relative">
                        <Image
                          src={post.coverImage || "/images/banner/banner.jpg"}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <div className="font-serif font-bold text-sm text-[#25391C] line-clamp-1">
                          {post.title}
                        </div>
                        <div className="text-[11px] text-ink/50 flex items-center gap-2">
                          <span>{post.category}</span>
                          <span>·</span>
                          <span>{post.publishedAt}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 font-mono text-[11px] text-moss-dark max-w-xs truncate">
                    <span className="bg-[#FAF6EE] px-2.5 py-1 rounded-lg border border-beige/80 inline-block max-w-full truncate">
                      /{post.seo.slug}
                    </span>
                  </td>

                  <td className="py-4 px-4 max-w-sm space-y-1">
                    <div className="font-bold text-ink/90 line-clamp-1">
                      {post.seo.seoTitle}
                    </div>
                    <div className="text-[11px] text-ink/60 line-clamp-1 italic">
                      {post.seo.seoDescription}
                    </div>
                  </td>

                  <td className="py-4 px-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                        post.status === "draft"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {post.status === "draft" ? (
                        <>
                          <AlertCircle className="w-3 h-3" />
                          <span>Bản nháp</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Đã xuất bản</span>
                        </>
                      )}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <Link
                        href={`/admin/bai-viet/${post.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#59683A] text-white font-bold text-xs hover:bg-[#47542E] transition-colors shadow-xs"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Chỉnh sửa SEO</span>
                      </Link>

                      <Link
                        href={`/blog/${post.seo.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-xl border border-beige text-ink/60 hover:text-moss hover:bg-cream transition-colors"
                        title="Xem bài viết trên web"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
