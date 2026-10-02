"use client";

import React, { useState } from "react";
import {
  Search,
  Globe,
  CheckCircle2,
  FileCode,
  Share2,
  Save,
  Check,
  Building2,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/core/config/site.config";

export default function AdminGeneralSeoPage() {
  const [siteTitle, setSiteTitle] = useState(
    "Mộc Hương — Xịt Thơm Phòng & Quần Áo Thiên Nhiên 30ml"
  );
  const [siteDescription, setSiteDescription] = useState(
    siteConfig.description
  );
  const [siteAddress, setSiteAddress] = useState(siteConfig.address);
  const [hotline, setHotline] = useState(siteConfig.hotline);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#25391C]">
          Cấu Hình SEO Tổng Thể Cho Website
        </h1>
        <p className="text-xs text-ink/60 mt-1">
          Thiết lập siêu dữ liệu (Meta tags), sơ đồ trang (Sitemap XML), tệp robot (robots.txt) và Schema.org cho Mộc Hương.
        </p>
      </div>

      {isSaved && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-bold animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Đã lưu thành công cấu hình SEO tổng thể cho trang chủ và sơ đồ web!</span>
        </div>
      )}

      {/* Main SEO Form */}
      <div className="bg-white p-6 rounded-3xl border border-[#E3DACB] shadow-xs space-y-5">
        <h2 className="font-serif font-bold text-base text-[#25391C] flex items-center gap-2">
          <Globe className="w-4 h-4 text-moss" />
          <span>Thẻ Meta Toàn Trang (Global Metadata)</span>
        </h2>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-ink/80">
            Tiêu đề trang chủ (Homepage Title)
          </label>
          <input
            type="text"
            value={siteTitle}
            onChange={(e) => setSiteTitle(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-beige bg-cream/30 text-xs text-ink focus:outline-none focus:border-moss"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-ink/80">
            Mô tả trang chủ (Homepage Meta Description)
          </label>
          <textarea
            rows={3}
            value={siteDescription}
            onChange={(e) => setSiteDescription(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-beige bg-cream/30 text-xs text-ink focus:outline-none focus:border-moss"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-ink/80">
              Địa chỉ doanh nghiệp (Schema LocalBusiness)
            </label>
            <input
              type="text"
              value={siteAddress}
              onChange={(e) => setSiteAddress(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-beige bg-cream/30 text-xs text-ink focus:outline-none focus:border-moss"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-ink/80">
              Hotline hỗ trợ khách hàng
            </label>
            <input
              type="text"
              value={hotline}
              onChange={(e) => setHotline(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-beige bg-cream/30 text-xs text-ink focus:outline-none focus:border-moss"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#59683A] text-white text-xs font-bold hover:bg-[#47542E] transition-all shadow-xs cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Lưu cấu hình tổng thể</span>
          </button>
        </div>
      </div>

      {/* XML Sitemap & Robots Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-3xl border border-[#E3DACB] shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#25391C]">
            <FileCode className="w-4 h-4 text-moss" />
            <span>Sơ đồ trang XML (Sitemap.xml)</span>
          </div>
          <p className="text-xs text-ink/70">
            Tự động tạo sitemap cho tất cả 18 sản phẩm, 4 bộ sưu tập và các bài viết blog.
          </p>
          <div className="bg-[#FAF6EE] p-2.5 rounded-xl border border-beige font-mono text-[11px] text-moss-dark flex items-center justify-between">
            <span>https://mochuong.vn/sitemap.xml</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              Hoạt động
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E3DACB] shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#25391C]">
            <Search className="w-4 h-4 text-moss" />
            <span>Tệp chỉ mục bot tìm kiếm (Robots.txt)</span>
          </div>
          <p className="text-xs text-ink/70">
            Cho phép Googlebot lập chỉ mục toàn bộ nội dung công khai và chặn các trang quản trị.
          </p>
          <div className="bg-[#FAF6EE] p-2.5 rounded-xl border border-beige font-mono text-[11px] text-moss-dark flex items-center justify-between">
            <span>https://mochuong.vn/robots.txt</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              Hoạt động
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
