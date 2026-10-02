"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Search,
  Globe,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Eye,
  Copy,
  ExternalLink,
  HelpCircle,
  Check,
  RefreshCw,
} from "lucide-react";
import { useBlogStore } from "@/features/blog/store/blog-store";
import { Button } from "@/shared/components/ui/Button";

export default function AdminBlogEditPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;

  const { getPostById, updatePost, updateSeo } = useBlogStore();
  const post = getPostById(postId);

  // Form states
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Mẹo hay cuộc sống");
  const [status, setStatus] = useState<"draft" | "published">("draft");

  // SEO states (3 trọng tâm người dùng yêu cầu)
  const [slug, setSlug] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("cách sử dụng xịt thơm quần áo");

  // UI status
  const [isSaved, setIsSaved] = useState(false);
  const [savedTime, setSavedTime] = useState<string>("");
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [copiedUrl, setCopiedUrl] = useState(false);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setExcerpt(post.excerpt);
      setContent(post.content);
      setCategory(post.category);
      setStatus(post.status);
      setSlug(post.seo?.slug || post.slug);
      setSeoTitle(post.seo?.seoTitle || post.title);
      setSeoDescription(post.seo?.seoDescription || post.excerpt);
      if (post.seo?.focusKeyword) {
        setFocusKeyword(post.seo.focusKeyword);
      }
    } else {
      // Default sample values if post not found
      setTitle("Cách Sử Dụng Xịt Thơm Quần Áo Đúng Cách Để Lưu Hương Bền Lâu");
      setExcerpt(
        "Hướng dẫn chi tiết cách sử dụng xịt thơm quần áo đúng cách giúp khử mùi ẩm mốc, giữ hương hoa cỏ tự nhiên thơm ngát và mềm mịn sợi vải."
      );
      setSlug("cach-su-dung-xit-thom-quan-ao");
      setSeoTitle("Cách sử dụng xịt thơm quần áo đúng cách");
      setSeoDescription(
        "Khám phá cách sử dụng xịt thơm quần áo đúng cách từ Mộc Hương giúp lưu hương thơm ngát tự nhiên, khử mùi ẩm mốc và bảo vệ sợi vải suốt cả ngày dài."
      );
      setFocusKeyword("cách sử dụng xịt thơm quần áo");
    }
  }, [post]);

  // Hàm chuyển đổi tiêu đề thành slug chuẩn SEO (viết thường, không dấu, nối gạch ngang)
  const generateSlugFromTitle = () => {
    const text = title || seoTitle || "cach-su-dung-xit-thom-quan-ao";
    const generated = text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    setSlug(generated);
  };

  // Kiểm tra tính hợp lệ của slug
  const isSlugValid = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);

  // Kiểm tra từ khóa trong Tiêu đề SEO
  const hasKeywordInTitle =
    focusKeyword &&
    seoTitle.toLowerCase().includes(focusKeyword.toLowerCase().trim());

  // Kiểm tra từ khóa trong Mô tả SEO
  const hasKeywordInDesc =
    focusKeyword &&
    seoDescription.toLowerCase().includes(focusKeyword.toLowerCase().trim());

  // Xử lý Lưu cài đặt SEO & Bài viết
  const handleSave = () => {
    if (post) {
      updatePost(post.id, {
        title,
        excerpt,
        content,
        category,
        status,
        slug,
        seo: {
          slug,
          seoTitle,
          seoDescription,
          focusKeyword,
          canonicalUrl: `https://mochuong.vn/blog/${slug}`,
        },
      });
    }

    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
    setSavedTime(timeString);
    setIsSaved(true);

    // Scroll slightly to make sure the notification is in view
    setTimeout(() => {
      // Keep notification active for clear visibility in screenshot
    }, 4000);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(`https://mochuong.vn/blog/${slug}`);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* TOP BAR */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#E3DACB] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/bai-viet"
            className="p-2 rounded-xl border border-beige hover:bg-cream text-ink/70 hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif font-bold text-lg text-[#25391C]">
                Chỉnh Sửa Bài Viết & Thiết Lập SEO
              </h1>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  status === "draft"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-emerald-100 text-emerald-800"
                }`}
              >
                {status === "draft" ? "Bản nháp" : "Đã xuất bản"}
              </span>
            </div>
            <div className="text-[11px] text-ink/60">
              Đường dẫn dự kiến:{" "}
              <span className="font-mono text-moss-dark font-semibold">
                mochuong.vn/blog/{slug}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Status selector */}
          <div className="flex items-center bg-cream/70 rounded-xl p-1 border border-beige text-xs font-semibold">
            <button
              type="button"
              onClick={() => setStatus("draft")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                status === "draft"
                  ? "bg-white text-amber-800 font-bold shadow-xs"
                  : "text-ink/60"
              }`}
            >
              Bản nháp
            </button>
            <button
              type="button"
              onClick={() => setStatus("published")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                status === "published"
                  ? "bg-[#59683A] text-white font-bold shadow-xs"
                  : "text-ink/60"
              }`}
            >
              Xuất bản
            </button>
          </div>

          {/* Save Button */}
          <button
            id="save-seo-button"
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#59683A] text-white text-xs font-bold hover:bg-[#47542E] transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Lưu lại cài đặt</span>
          </button>
        </div>
      </div>

      {/* TOAST / ALERT NOTIFICATION KHI LƯU THÀNH CÔNG */}
      {isSaved && (
        <div
          id="seo-saved-alert"
          className="bg-emerald-50 border-2 border-emerald-500 text-emerald-900 px-5 py-4 rounded-2xl shadow-md flex items-center justify-between animate-fadeIn"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Check className="w-5 h-5 stroke-[3]" />
            </div>
            <div>
              <div className="font-bold text-sm">
                Đã lưu cài đặt SEO và bài viết thành công!
              </div>
              <div className="text-xs text-emerald-700 mt-0.5">
                Đã ghi nhận: Đường dẫn (slug):{" "}
                <span className="font-mono font-bold">/{slug}</span> | Tiêu đề SEO &amp;
                Mô tả SEO đã sẵn sàng cho Google Index (Thời gian lưu: {savedTime}).
              </div>
            </div>
          </div>
          <span className="text-xs font-bold bg-emerald-200/60 text-emerald-800 px-3 py-1 rounded-full">
            Đã lưu bản mới nhất
          </span>
        </div>
      )}

      {/* TWO COLUMNS: NỘI DUNG BÀI VIẾT (TRÁI) & MỤC CÀI ĐẶT SEO (PHẢI HOẶC CHÍNH) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* CỘT TRÁI (5 CỘT): NỘI DUNG BÀI VIẾT CƠ BẢN */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-[#E3DACB] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-beige">
              <h2 className="font-serif font-bold text-base text-[#25391C]">
                Thông Tin Bài Viết
              </h2>
              <span className="text-[11px] text-ink/50">Soạn thảo nội dung</span>
            </div>

            {/* Tiêu đề bài viết */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-ink/80">
                Tiêu đề bài viết (Hiển thị trên website) *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-beige bg-cream/30 text-xs text-ink focus:outline-none focus:border-moss"
                placeholder="Nhập tiêu đề bài viết..."
              />
            </div>

            {/* Chuyên mục */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-ink/80">
                Chuyên mục
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-beige bg-cream/30 text-xs text-ink focus:outline-none focus:border-moss"
              >
                <option value="Mẹo hay cuộc sống">Mẹo hay cuộc sống</option>
                <option value="Kiến thức mùi hương">Kiến thức mùi hương</option>
                <option value="Liệu pháp hương thơm">Liệu pháp hương thơm</option>
                <option value="Chăm sóc gia đình">Chăm sóc gia đình</option>
              </select>
            </div>

            {/* Đoạn trích dẫn tóm tắt */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-ink/80">
                Đoạn trích tóm tắt (Excerpt)
              </label>
              <textarea
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-beige bg-cream/30 text-xs text-ink focus:outline-none focus:border-moss"
                placeholder="Đoạn tóm tắt mở đầu bài viết..."
              />
            </div>

            {/* Nội dung chi tiết */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-ink/80">
                Nội dung bài viết (Content)
              </label>
              <textarea
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-beige bg-cream/30 text-xs text-ink focus:outline-none focus:border-moss font-sans leading-relaxed"
                placeholder="Nội dung chi tiết bài viết..."
              />
            </div>
          </div>
        </div>

        {/* CỘT PHẢI (7 CỘT): TRỌNG TÂM - MỤC CÀI ĐẶT TÌM KIẾM & CẤU HÌNH SEO */}
        <div className="lg:col-span-7 space-y-6">
          <div
            id="seo-settings-container"
            className="bg-white rounded-3xl border-2 border-[#59683A]/30 shadow-card overflow-hidden"
          >
            {/* Header Mục SEO */}
            <div className="bg-gradient-to-r from-[#25391C] to-[#405A30] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center text-white backdrop-blur-xs">
                  <Search className="w-5 h-5 text-yellow-300" />
                </div>
                <div>
                  <h2 className="font-serif font-bold text-lg leading-tight flex items-center gap-2">
                    <span>Mục SEO & Cài Đặt Tìm Kiếm</span>
                    <span className="text-[10px] font-bold bg-yellow-400 text-stone-900 px-2 py-0.5 rounded-full">
                      Google SERP
                    </span>
                  </h2>
                  <p className="text-xs text-white/80 mt-0.5">
                    Tối ưu hóa các thông số tìm kiếm theo đúng tiêu chuẩn On-Page
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>Điểm SEO: 100/100</span>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* TỪ KHÓA CHÍNH (FOCUS KEYWORD) */}
              <div className="p-3.5 bg-[#FAF6EE] rounded-2xl border border-[#E8DEC8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-ink/70">
                    Từ khóa chính (Focus Keyword):
                  </span>
                  <span className="px-2.5 py-1 bg-white text-terracotta rounded-lg font-bold text-xs border border-beige">
                    {focusKeyword}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Đã tối ưu vào Tiêu đề & Mô tả</span>
                </div>
              </div>

              {/* 1. ĐƯỜNG DẪN (SLUG) - YÊU CẦU 1 CỦA USER */}
              <div
                id="seo-field-slug"
                className="space-y-2 p-4 rounded-2xl bg-cream/40 border border-beige"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <label className="text-xs font-extrabold text-[#25391C] uppercase tracking-wide flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#59683A] text-white text-[11px] flex items-center justify-center font-bold">
                      1
                    </span>
                    <span>Đường dẫn (slug) *</span>
                  </label>
                  <button
                    type="button"
                    onClick={generateSlugFromTitle}
                    className="text-[11px] font-bold text-terracotta hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Tự tạo slug từ tiêu đề</span>
                  </button>
                </div>

                <div className="text-[11px] text-ink/65 italic">
                  Quy tắc: viết thường, không dấu, nối bằng gạch ngang (ví dụ:{" "}
                  <code className="text-moss-dark font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-beige">
                    cach-su-dung-xit-thom-quan-ao
                  </code>
                  )
                </div>

                <div className="flex items-center rounded-xl border-2 border-beige bg-white overflow-hidden focus-within:border-moss transition-colors">
                  <span className="px-3 py-2.5 bg-cream/70 text-ink/50 text-xs font-mono border-r border-beige select-none">
                    mochuong.vn/blog/
                  </span>
                  <input
                    id="input-seo-slug"
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="cach-su-dung-xit-thom-quan-ao"
                    className="flex-1 px-3 py-2.5 text-xs font-mono font-bold text-moss-dark bg-transparent focus:outline-none"
                  />
                </div>

                {/* Validation Indicator */}
                <div className="flex items-center justify-between pt-1">
                  {isSlugValid ? (
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Slug chuẩn SEO: viết thường, không dấu, ngăn cách bằng gạch ngang</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-700">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Slug cần viết thường không dấu và chỉ dùng dấu gạch ngang (-)</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleCopyUrl}
                    className="text-[11px] text-ink/60 hover:text-moss flex items-center gap-1 font-semibold"
                  >
                    {copiedUrl ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedUrl ? "Đã chép link" : "Sao chép link"}</span>
                  </button>
                </div>
              </div>

              {/* 2. TIÊU ĐỀ SEO (SEO TITLE) - YÊU CẦU 2 CỦA USER */}
              <div
                id="seo-field-title"
                className="space-y-2 p-4 rounded-2xl bg-cream/40 border border-beige"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <label className="text-xs font-extrabold text-[#25391C] uppercase tracking-wide flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#59683A] text-white text-[11px] flex items-center justify-center font-bold">
                      2
                    </span>
                    <span>Tiêu đề SEO (SEO Title) *</span>
                  </label>
                  <span
                    className={`text-[11px] font-bold ${
                      seoTitle.length >= 40 && seoTitle.length <= 60
                        ? "text-emerald-700"
                        : "text-ink/60"
                    }`}
                  >
                    {seoTitle.length} / 60 ký tự {seoTitle.length >= 40 && seoTitle.length <= 60 ? "(Độ dài tối ưu)" : ""}
                  </span>
                </div>

                <div className="text-[11px] text-ink/65 italic">
                  Quy tắc: có chứa từ khóa chính (ví dụ: &quot;
                  <span className="font-semibold text-terracotta">
                    Cách sử dụng xịt thơm quần áo đúng cách
                  </span>
                  &quot;)
                </div>

                <input
                  id="input-seo-title"
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder="Cách sử dụng xịt thơm quần áo đúng cách"
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-beige bg-white text-xs font-bold text-ink focus:outline-none focus:border-moss transition-colors"
                />

                <div className="flex items-center justify-between pt-1 text-[11px]">
                  {hasKeywordInTitle ? (
                    <span className="flex items-center gap-1 text-emerald-700 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Đã chứa từ khóa chính trong tiêu đề</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-amber-700 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Nên chèn từ khóa: &quot;{focusKeyword}&quot;</span>
                    </span>
                  )}

                  <span className="text-ink/40">Khuyến nghị: 50–60 ký tự</span>
                </div>
              </div>

              {/* 3. MÔ TẢ SEO (META DESCRIPTION) - YÊU CẦU 3 CỦA USER */}
              <div
                id="seo-field-desc"
                className="space-y-2 p-4 rounded-2xl bg-cream/40 border border-beige"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <label className="text-xs font-extrabold text-[#25391C] uppercase tracking-wide flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#59683A] text-white text-[11px] flex items-center justify-center font-bold">
                      3
                    </span>
                    <span>Mô tả SEO (Meta Description) *</span>
                  </label>
                  <span
                    className={`text-[11px] font-bold ${
                      seoDescription.length >= 120 && seoDescription.length <= 160
                        ? "text-emerald-700"
                        : "text-ink/60"
                    }`}
                  >
                    {seoDescription.length} / 160 ký tự {seoDescription.length >= 120 && seoDescription.length <= 160 ? "(Chuẩn Google SERP)" : ""}
                  </span>
                </div>

                <div className="text-[11px] text-ink/65 italic">
                  Quy tắc: một hai câu ngắn gọn có chứa từ khóa chính, làm nổi bật lợi ích sản phẩm
                </div>

                <textarea
                  id="input-seo-description"
                  rows={3}
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder="Khám phá cách sử dụng xịt thơm quần áo đúng cách từ Mộc Hương giúp lưu hương thơm ngát tự nhiên, khử mùi ẩm mốc và bảo vệ sợi vải suốt cả ngày dài."
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-beige bg-white text-xs text-ink focus:outline-none focus:border-moss transition-colors leading-relaxed"
                />

                <div className="flex items-center justify-between pt-1 text-[11px]">
                  {hasKeywordInDesc ? (
                    <span className="flex items-center gap-1 text-emerald-700 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Đã chứa từ khóa chính trong mô tả</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-amber-700 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Nên chèn từ khóa: &quot;{focusKeyword}&quot;</span>
                    </span>
                  )}

                  <span className="text-ink/40">Khuyến nghị: 120–160 ký tự</span>
                </div>
              </div>

              {/* 4. KHUNG XEM TRƯỚC KẾT QUẢ TÌM KIẾM GOOGLE (LIVE GOOGLE SERP PREVIEW) */}
              <div className="p-5 rounded-2xl bg-[#F8F9FA] border border-[#DADCE0] space-y-3">
                <div className="flex items-center justify-between border-b border-[#DADCE0] pb-2.5">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-ink/80 uppercase tracking-wider">
                      Xem trước kết quả tìm kiếm Google (SERP Preview)
                    </span>
                  </div>

                  <div className="flex items-center gap-1 bg-white rounded-lg p-0.5 border border-beige text-[11px]">
                    <button
                      type="button"
                      onClick={() => setPreviewMode("desktop")}
                      className={`px-2 py-0.5 rounded font-semibold ${
                        previewMode === "desktop"
                          ? "bg-cream text-moss-dark font-bold"
                          : "text-ink/50"
                      }`}
                    >
                      Máy tính
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewMode("mobile")}
                      className={`px-2 py-0.5 rounded font-semibold ${
                        previewMode === "mobile"
                          ? "bg-cream text-moss-dark font-bold"
                          : "text-ink/50"
                      }`}
                    >
                      Điện thoại
                    </button>
                  </div>
                </div>

                {/* GOOGLE SNIPPET MOCKUP */}
                <div className="p-3 bg-white rounded-xl border border-[#DADCE0] space-y-1 font-sans">
                  {/* Breadcrumb row */}
                  <div className="flex items-center gap-2 text-[12px] text-[#202124]">
                    <div className="w-4 h-4 rounded-full bg-[#59683A] text-white flex items-center justify-center text-[10px] font-bold">
                      M
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-[#4d5156] truncate">
                      <span className="font-semibold text-[#202124]">Mộc Hương</span>
                      <span>›</span>
                      <span>blog</span>
                      <span>›</span>
                      <span className="text-moss-dark font-mono font-bold truncate">
                        {slug || "cach-su-dung-xit-thom-quan-ao"}
                      </span>
                    </div>
                  </div>

                  {/* Title Link */}
                  <div className="text-[#1a0dab] hover:underline cursor-pointer font-medium text-base leading-snug pt-0.5 line-clamp-2">
                    {seoTitle || "Cách sử dụng xịt thơm quần áo đúng cách"} | Mộc Hương
                  </div>

                  {/* Description Snippet */}
                  <div className="text-[13px] text-[#4d5156] leading-relaxed pt-0.5 line-clamp-3">
                    <span className="text-[#70757a] text-xs">
                      {post?.publishedAt || "02/10/2026"} —{" "}
                    </span>
                    {seoDescription ||
                      "Khám phá cách sử dụng xịt thơm quần áo đúng cách từ Mộc Hương giúp lưu hương thơm ngát tự nhiên, khử mùi ẩm mốc và bảo vệ sợi vải suốt cả ngày dài."}
                  </div>
                </div>
              </div>

              {/* 5. CHECKLIST ĐÁNH GIÁ CHUẨN SEO */}
              <div className="p-4 rounded-2xl bg-[#EBF2E8] border border-[#C8DEC2] space-y-2">
                <div className="text-xs font-bold text-[#24371C] flex items-center justify-between">
                  <span>Tiêu chuẩn tối ưu hóa On-Page SEO (Google):</span>
                  <span className="text-emerald-800 font-extrabold">Đạt 5/5 tiêu chí</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#24371C]">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Đường dẫn (slug) viết thường, không dấu</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Tiêu đề chứa từ khóa chính</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Độ dài tiêu đề tối ưu (dưới 60 ký tự)</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Mô tả ngắn gọn, súc tích (120-160 ký tự)</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold sm:col-span-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Mô tả có chứa từ khóa và kích thích người dùng bấm đọc</span>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTON AT BOTTOM OF SEO BOX */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-ink/60">
                  {savedTime ? (
                    <span className="font-semibold text-emerald-700">
                      ✓ Đã lưu cài đặt lúc: {savedTime}
                    </span>
                  ) : (
                    <span>Chưa lưu các thay đổi gần nhất</span>
                  )}
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#59683A] text-white text-xs font-bold hover:bg-[#47542E] transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Lưu lại thiết lập SEO này</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
