"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  Search,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Globe,
  Settings,
  Edit3,
} from "lucide-react";
import { useBlogStore } from "@/features/blog/store/blog-store";
import { Badge } from "@/shared/components/ui/Badge";

export default function AdminDashboardPage() {
  const posts = useBlogStore((state) => state.posts);
  const draftPost = posts.find((p) => p.status === "draft") || posts[0];

  const publishedCount = posts.filter((p) => p.status === "published").length;
  const draftCount = posts.filter((p) => p.status === "draft").length;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#25391C] to-[#3B542C] text-white rounded-3xl p-6 sm:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Hệ Thống Tối Ưu SEO Google On-Page</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
            Quản Trị Bài Viết & Cài Đặt Tìm Kiếm SEO
          </h1>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Kiểm tra và thiết lập đường dẫn (slug), tiêu đề SEO chứa từ khóa và mô tả meta hấp dẫn để tối đa hóa thứ hạng hiển thị trên Google Tìm Kiếm.
          </p>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row gap-3">
          <Link
            href={`/admin/bai-viet/${draftPost.id}`}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-[#25391C] font-bold text-xs sm:text-sm hover:bg-[#FAF6EE] transition-all shadow-md"
          >
            <Edit3 className="w-4 h-4 text-terracotta" />
            <span>Mở bài viết bản nháp & Thiết lập SEO</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-[#E3DACB] shadow-xs space-y-3">
          <div className="flex items-center justify-between text-ink/60">
            <span className="text-xs font-bold uppercase tracking-wider">
              Tổng số bài viết
            </span>
            <div className="w-8 h-8 rounded-xl bg-cream flex items-center justify-center text-moss">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-serif font-black text-[#25391C]">
            {posts.length}
          </div>
          <div className="text-xs text-ink/60">
            Bao gồm {publishedCount} đã xuất bản, {draftCount} bản nháp
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E3DACB] shadow-xs space-y-3">
          <div className="flex items-center justify-between text-ink/60">
            <span className="text-xs font-bold uppercase tracking-wider">
              Bản nháp đang soạn
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-serif font-black text-amber-600">
            {draftCount}
          </div>
          <div className="text-xs text-amber-700/80 font-medium">
            Có sẵn bài viết hướng dẫn xịt thơm
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E3DACB] shadow-xs space-y-3">
          <div className="flex items-center justify-between text-ink/60">
            <span className="text-xs font-bold uppercase tracking-wider">
              Điểm SEO Onpage
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-serif font-black text-emerald-600">
            98/100
          </div>
          <div className="text-xs text-emerald-700 font-medium">
            Đạt chuẩn Google SERP 2026
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E3DACB] shadow-xs space-y-3">
          <div className="flex items-center justify-between text-ink/60">
            <span className="text-xs font-bold uppercase tracking-wider">
              Sitemap & Robot
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg font-serif font-bold text-moss-dark pt-1">
            Đã đồng bộ
          </div>
          <div className="text-xs text-ink/60">
            Tự động cập nhật khi đổi Slug
          </div>
        </div>
      </div>

      {/* Featured Section: Quick access to the targeted draft */}
      <div className="bg-white rounded-3xl border border-[#E3DACB] p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-beige">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif font-bold text-lg text-[#25391C]">
                Bài Viết Mục Tiêu Cần Thiết Lập SEO
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                Bản nháp
              </span>
            </div>
            <p className="text-xs text-ink/60 mt-1">
              Bài viết được yêu cầu kiểm tra và hoàn thiện 3 mục: Slug, Tiêu đề SEO và Mô tả SEO.
            </p>
          </div>

          <Link
            href={`/admin/bai-viet/${draftPost.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#59683A] text-white text-xs font-bold hover:bg-[#47542E] transition-colors shadow-xs shrink-0"
          >
            <span>Mở chỉnh sửa SEO bài này</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#FAF6EE] p-4 rounded-2xl border border-[#E8DEC8]">
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-ink/50 uppercase tracking-wider">
              1. Đường dẫn (slug)
            </div>
            <div className="font-mono text-xs font-bold text-moss-dark bg-white px-3 py-2 rounded-xl border border-beige truncate">
              {draftPost.seo.slug}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-bold text-ink/50 uppercase tracking-wider">
              2. Tiêu đề SEO
            </div>
            <div className="text-xs font-bold text-[#25391C] bg-white px-3 py-2 rounded-xl border border-beige truncate">
              {draftPost.seo.seoTitle}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-bold text-ink/50 uppercase tracking-wider">
              3. Mô tả SEO (Meta Description)
            </div>
            <div className="text-xs text-ink/80 bg-white px-3 py-2 rounded-xl border border-beige truncate">
              {draftPost.seo.seoDescription}
            </div>
          </div>
        </div>
      </div>

      {/* Post List Section */}
      <div className="bg-white rounded-3xl border border-[#E3DACB] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-base text-[#25391C]">
            Danh Sách Tất Cả Bài Viết ({posts.length})
          </h3>
          <Link
            href="/admin/bai-viet"
            className="text-xs font-bold text-terracotta hover:underline flex items-center gap-1"
          >
            <span>Xem chi tiết danh sách</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="divide-y divide-beige">
          {posts.map((post) => (
            <div
              key={post.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      post.status === "draft"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {post.status === "draft" ? "Bản nháp" : "Đã xuất bản"}
                  </span>
                  <span className="text-xs font-serif font-bold text-[#25391C]">
                    {post.title}
                  </span>
                </div>
                <div className="text-[11px] text-ink/50 flex items-center gap-3">
                  <span>Slug: /{post.seo.slug}</span>
                  <span>·</span>
                  <span>Từ khóa: {post.seo.focusKeyword || "Chưa đặt"}</span>
                </div>
              </div>

              <Link
                href={`/admin/bai-viet/${post.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-beige bg-cream/50 text-xs font-bold text-moss-dark hover:bg-cream transition-colors shrink-0"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Chỉnh sửa SEO</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
