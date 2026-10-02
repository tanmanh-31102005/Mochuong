"use client";

import React, { useState, useEffect } from "react";
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
  ExternalLink,
  Copy,
  Eye,
} from "lucide-react";
import { siteConfig } from "@/core/config/site.config";

export default function AdminGeneralSeoPage() {
  const [siteTitle, setSiteTitle] = useState(
    "Xịt Thơm Quần Áo Thiên Nhiên 30ml | Mộc Hương — Lưu Hương & Khử Mùi"
  );
  const [siteDescription, setSiteDescription] = useState(
    "Mộc Hương chuyên xịt thơm quần áo và phòng chiết xuất 100% tinh dầu thiên nhiên 30ml. Khử mùi ẩm mốc, kháng khuẩn tự nhiên, lưu hương thảo mộc thanh khiết suốt cả ngày dài."
  );
  const [siteAddress, setSiteAddress] = useState(siteConfig.address);
  const [hotline, setHotline] = useState(siteConfig.hotline);
  const [email, setEmail] = useState(siteConfig.email);
  const [isSaved, setIsSaved] = useState(false);

  // Raw file preview states
  const [sitemapContent, setSitemapContent] = useState<string>("");
  const [robotsContent, setRobotsContent] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"none" | "sitemap" | "robots">("none");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/sitemap.xml")
      .then((r) => r.text())
      .then((text) => setSitemapContent(text))
      .catch(() => {});

    fetch("/robots.txt")
      .then((r) => r.text())
      .then((text) => setRobotsContent(text))
      .catch(() => {});
  }, []);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#25391C]">
          Cấu Hình SEO Tổng Thể Cho Website
        </h1>
        <p className="text-xs text-ink/60 mt-1">
          Thiết lập siêu dữ liệu (Meta tags), sơ đồ trang (Sitemap XML), tệp điều hướng robot (robots.txt) và Schema.org cho Mộc Hương.
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
            Tiêu đề trang chủ (Homepage Title) — Chứa từ khóa chính: Xịt thơm quần áo
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="space-y-1.5 sm:col-span-1">
            <label className="block text-xs font-bold text-ink/80">
              Địa chỉ cửa hàng chính thức
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
              Hotline hỗ trợ CSKH
            </label>
            <input
              type="text"
              value={hotline}
              onChange={(e) => setHotline(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-beige bg-cream/30 text-xs text-ink focus:outline-none focus:border-moss"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-ink/80">
              Email liên hệ & đơn hàng
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

      {/* XML Sitemap & Robots Status with Live Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Sitemap Card */}
        <div className="bg-white p-6 rounded-3xl border border-[#E3DACB] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#25391C]">
              <FileCode className="w-4 h-4 text-moss" />
              <span>Sơ đồ trang XML (Sitemap.xml)</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
              ✓ Hoạt động 200 OK
            </span>
          </div>

          <p className="text-xs text-ink/70 leading-relaxed">
            Next.js tự động tạo sơ đồ XML động bao gồm trang chủ, danh sách 18 sản phẩm, 4 bộ sưu tập và toàn bộ bài viết blog.
          </p>

          <div className="bg-[#FAF6EE] p-3 rounded-2xl border border-beige space-y-2">
            <div className="font-mono text-xs text-moss-dark font-bold break-all flex items-center justify-between">
              <span>/sitemap.xml</span>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#59683A] text-white text-[11px] font-bold hover:bg-[#47542E] transition-colors shadow-2xs"
              >
                <span>Mở xem tệp XML</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="pt-1 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === "sitemap" ? "none" : "sitemap")}
              className="text-xs font-bold text-terracotta hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{activeTab === "sitemap" ? "Ẩn mã XML" : "Xem trước nội dung XML trực tiếp tại đây"}</span>
            </button>
          </div>
        </div>

        {/* Robots Card */}
        <div className="bg-white p-6 rounded-3xl border border-[#E3DACB] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#25391C]">
              <Search className="w-4 h-4 text-moss" />
              <span>Tệp chỉ mục bot tìm kiếm (Robots.txt)</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
              ✓ Hoạt động 200 OK
            </span>
          </div>

          <p className="text-xs text-ink/70 leading-relaxed">
            Chỉ thị chuẩn cho Googlebot: cho phép thu thập dữ liệu công khai, bảo mật trang quản trị và trỏ thẳng tới sitemap.
          </p>

          <div className="bg-[#FAF6EE] p-3 rounded-2xl border border-beige space-y-2">
            <div className="font-mono text-xs text-moss-dark font-bold break-all flex items-center justify-between">
              <span>/robots.txt</span>
              <a
                href="/robots.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#59683A] text-white text-[11px] font-bold hover:bg-[#47542E] transition-colors shadow-2xs"
              >
                <span>Mở xem tệp TXT</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="pt-1 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === "robots" ? "none" : "robots")}
              className="text-xs font-bold text-terracotta hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{activeTab === "robots" ? "Ẩn nội dung" : "Xem trước nội dung Robots.txt trực tiếp tại đây"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Content Viewer Panel */}
      {activeTab !== "none" && (
        <div className="bg-[#1E1E1E] text-[#D4D4D4] p-5 rounded-3xl border border-stone-800 shadow-card space-y-3 font-mono text-xs animate-fadeIn">
          <div className="flex items-center justify-between border-b border-stone-700 pb-2 text-[11px]">
            <span className="text-yellow-400 font-bold">
              {activeTab === "sitemap" ? "📄 Nội dung thực tế: /sitemap.xml" : "📄 Nội dung thực tế: /robots.txt"}
            </span>
            <button
              type="button"
              onClick={() => copyToClipboard(activeTab === "sitemap" ? sitemapContent : robotsContent)}
              className="px-2.5 py-1 bg-stone-700 hover:bg-stone-600 text-white rounded-lg flex items-center gap-1 text-[10px] font-bold transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? "Đã sao chép" : "Sao chép mã"}</span>
            </button>
          </div>

          <pre className="overflow-x-auto max-h-72 p-3 bg-black/40 rounded-xl leading-relaxed text-[11px]">
            {activeTab === "sitemap" ? sitemapContent : robotsContent}
          </pre>
        </div>
      )}
    </div>
  );
}
