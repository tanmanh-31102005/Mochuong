"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Search,
  Globe,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Eye,
  Check,
  RefreshCw,
  ImageIcon,
  Plus,
} from "lucide-react";
import { useBlogStore } from "@/features/blog/store/blog-store";
import { BlogPost } from "@/features/blog/types";

const AVAILABLE_IMAGES = [
  { url: "/images/banner/banner.jpg", label: "Banner 1 - Thiên nhiên hoa cỏ" },
  { url: "/images/banner/banner-2.jpg", label: "Banner 2 - Ưu đãi ra mắt" },
  { url: "/images/banner/banner-3.jpg", label: "Banner 3 - Xịt thơm quần áo" },
  { url: "/images/collections/bo-suu-tap-thao-moc.jpg", label: "Bộ sưu tập Thảo mộc" },
  { url: "/images/collections/bo-suu-tap-hoa.jpg", label: "Bộ sưu tập Hoa dịu nhẹ" },
  { url: "/images/collections/bo-suu-tap-trai-cay.jpg", label: "Bộ sưu tập Trái cây" },
  { url: "/images/collections/bo-suu-tap-am-nong.jpg", label: "Bộ sưu tập Ấm nồng" },
  { url: "/images/products/sa-chanh-30ml.jpg", label: "Sản phẩm Sả Chanh 30ml" },
  { url: "/images/products/bac-ha-30ml.jpg", label: "Sản phẩm Bạc Hà 30ml" },
];

export default function CreateNewPostPage() {
  const router = useRouter();
  const addPost = useBlogStore((state) => state.addPost);

  // Form states
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Mẹo hay cuộc sống");
  const [status, setStatus] = useState<"draft" | "published">("published");
  const [coverImage, setCoverImage] = useState("/images/banner/banner-3.jpg");
  const [author, setAuthor] = useState("Mộc Hương Team");

  // SEO states
  const [slug, setSlug] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("Xịt thơm quần áo");

  // UI state
  const [isSaved, setIsSaved] = useState(false);
  const [customImageUrl, setCustomImageUrl] = useState("");

  // Tự động tạo slug và SEO title khi nhập Tiêu đề bài viết
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!seoTitle) {
      setSeoTitle(newTitle);
    }

    // Auto generate slug if slug is not manually altered
    const autoSlug = newTitle
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    setSlug(autoSlug);
  };

  const generateSlugManually = () => {
    const text = title || seoTitle || "bai-viet-moi";
    const autoSlug = text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    setSlug(autoSlug);
  };

  const isSlugValid = slug ? /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) : false;

  // Chuẩn hóa tiếng Việt không dấu để so khớp từ khóa linh hoạt
  const normalizeText = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .trim();

  // Kiểm tra linh hoạt (không bắt buộc cứng, người dùng có thể đổi từ khóa tùy ý)
  const hasKeywordInTitle = !focusKeyword.trim()
    ? true
    : seoTitle.toLowerCase().includes(focusKeyword.toLowerCase().trim()) ||
      normalizeText(seoTitle).includes(normalizeText(focusKeyword));

  const hasKeywordInDesc = !focusKeyword.trim()
    ? true
    : seoDescription.toLowerCase().includes(focusKeyword.toLowerCase().trim()) ||
      normalizeText(seoDescription).includes(normalizeText(focusKeyword));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Vui lòng nhập tiêu đề bài viết!");
      return;
    }

    const rawSlug =
      slug.trim() ||
      title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[đĐ]/g, "d")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
    const finalSlug = rawSlug.replace(/^\/+|\/+$/g, "");

    const finalSeoTitle = seoTitle.trim() || title.trim();
    const finalSeoDesc = seoDescription.trim() || excerpt.trim() || "Bài viết chia sẻ từ Mộc Hương.";

    const now = new Date();
    const dateStr = `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${now.getFullYear()}`;

    const newPost: BlogPost = {
      id: `blog-${Date.now()}`,
      slug: finalSlug,
      title: title.trim(),
      excerpt: excerpt.trim() || title.trim(),
      content: content.trim() || "Nội dung bài viết đang được cập nhật...",
      category,
      publishedAt: dateStr,
      readTime: "4 phút đọc",
      coverImage: coverImage || "/images/banner/banner.jpg",
      author,
      status,
      seo: {
        slug: finalSlug,
        seoTitle: finalSeoTitle,
        seoDescription: finalSeoDesc,
        focusKeyword: focusKeyword.trim() || "xịt thơm quần áo",
        canonicalUrl: `https://mochuong.vn/blog/${finalSlug}`,
        noIndex: false,
      },
    };

    addPost(newPost);
    setIsSaved(true);

    setTimeout(() => {
      router.push("/admin/bai-viet");
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-20 max-w-7xl mx-auto">
      {/* Top action header */}
      <div className="bg-white p-5 rounded-3xl border border-[#E3DACB] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/bai-viet"
            className="p-2 rounded-xl border border-beige hover:bg-cream text-ink/70 hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-serif font-bold text-lg text-[#25391C]">
              Tạo Bài Viết & Thiết Lập SEO Mới
            </h1>
            <p className="text-xs text-ink/60">
              Nhập nội dung bài viết, chọn ảnh bìa đại diện và cấu hình đầy đủ 3 trường SEO chuẩn Google.
            </p>
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
              Xuất bản ngay
            </button>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#59683A] text-white text-xs font-bold hover:bg-[#47542E] transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo bài viết & Lưu SEO</span>
          </button>
        </div>
      </div>

      {isSaved && (
        <div className="bg-emerald-50 border-2 border-emerald-500 text-emerald-900 px-5 py-4 rounded-2xl shadow-md flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Check className="w-5 h-5 stroke-[3]" />
            </div>
            <div>
              <div className="font-bold text-sm">
                Đã thêm bài viết mới và lưu cài đặt SEO thành công!
              </div>
              <div className="text-xs text-emerald-700 mt-0.5">
                Bài viết đã được lưu vào hệ thống Mộc Hương. Đang chuyển hướng về danh sách bài viết...
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* CỘT TRÁI (5 CỘT): NỘI DUNG & ẢNH BÌA */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card Thông tin nội dung */}
          <div className="bg-white p-6 rounded-3xl border border-[#E3DACB] shadow-xs space-y-4">
            <h2 className="font-serif font-bold text-base text-[#25391C] pb-2 border-b border-beige">
              1. Thông Tin Bài Viết
            </h2>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-ink/80">
                Tiêu đề bài viết *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="VD: Cách sử dụng xịt thơm quần áo đúng cách..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-beige bg-cream/30 text-xs text-ink focus:outline-none focus:border-moss"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-ink/80">
                  Chuyên mục
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-beige bg-cream/30 text-xs text-ink focus:outline-none focus:border-moss"
                >
                  <option value="Mẹo hay cuộc sống">Mẹo hay cuộc sống</option>
                  <option value="Kiến thức mùi hương">Kiến thức mùi hương</option>
                  <option value="Liệu pháp hương thơm">Liệu pháp hương thơm</option>
                  <option value="Chăm sóc gia đình">Chăm sóc gia đình</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-ink/80">
                  Tác giả
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-beige bg-cream/30 text-xs text-ink focus:outline-none focus:border-moss"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-ink/80">
                Đoạn trích tóm tắt (Excerpt)
              </label>
              <textarea
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Tóm tắt ngắn gọn nội dung bài viết..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-beige bg-cream/30 text-xs text-ink focus:outline-none focus:border-moss"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-ink/80">
                Nội dung chi tiết (Content)
              </label>
              <textarea
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Nội dung bài viết chi tiết..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-beige bg-cream/30 text-xs text-ink focus:outline-none focus:border-moss font-sans leading-relaxed"
              />
            </div>
          </div>

          {/* Card Quản lý ảnh bìa (Cover Image Picker) */}
          <div className="bg-white p-6 rounded-3xl border border-[#E3DACB] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-beige">
              <h2 className="font-serif font-bold text-base text-[#25391C] flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-moss" />
                <span>2. Quản Lý Ảnh Bìa Đại Diện</span>
              </h2>
              <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Ảnh thật chất lượng cao
              </span>
            </div>

            {/* Preview ảnh đang chọn */}
            <div className="space-y-2">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border-2 border-moss/30 bg-[#FAF6EE] shadow-xs">
                <Image
                  src={coverImage || "/images/banner/banner.jpg"}
                  alt="Ảnh bìa bài viết"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs truncate max-w-[90%]">
                  {coverImage}
                </div>
              </div>
            </div>

            {/* Thư viện ảnh chọn nhanh */}
            <div className="space-y-2 pt-1">
              <label className="block text-xs font-bold text-ink/70">
                Chọn nhanh từ kho ảnh Mộc Hương:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {AVAILABLE_IMAGES.map((img) => (
                  <button
                    key={img.url}
                    type="button"
                    onClick={() => setCoverImage(img.url)}
                    className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all p-0.5 ${
                      coverImage === img.url
                        ? "border-[#59683A] ring-2 ring-[#59683A]/30 scale-[1.03]"
                        : "border-beige hover:border-moss/60 opacity-80 hover:opacity-100"
                    }`}
                    title={img.label}
                  >
                    <Image
                      src={img.url}
                      alt={img.label}
                      fill
                      className="object-cover rounded-lg"
                    />
                    {coverImage === img.url && (
                      <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#59683A] text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tùy chỉnh URL ảnh */}
            <div className="space-y-1.5 pt-1">
              <label className="block text-[11px] font-bold text-ink/60">
                Hoặc nhập link ảnh khác:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                  placeholder="/images/banner/banner.jpg hoặc https://..."
                  className="flex-1 px-3 py-1.5 rounded-xl border border-beige bg-cream/30 text-xs text-ink focus:outline-none focus:border-moss"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customImageUrl.trim()) {
                      setCoverImage(customImageUrl.trim());
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-cream border border-beige text-xs font-bold text-moss-dark hover:bg-cream/80 cursor-pointer"
                >
                  Áp dụng
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI (7 CỘT): CẤU HÌNH SEO CHUYÊN SÂU */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border-2 border-[#59683A]/30 shadow-card overflow-hidden">
            {/* Header SEO */}
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
                    Thiết lập 3 thông số SEO chuẩn mực để bài viết lên top Google
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>Chuẩn SEO On-Page</span>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Focus Keyword */}
              <div className="p-4 bg-[#FAF6EE] rounded-2xl border border-[#E8DEC8] space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2">
                    <label className="text-xs font-bold text-ink/80 shrink-0 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-terracotta" />
                      <span>Từ khóa chính (Focus Keyword):</span>
                    </label>
                    <input
                      type="text"
                      value={focusKeyword}
                      onChange={(e) => setFocusKeyword(e.target.value)}
                      placeholder="VD: Xịt thơm quần áo, tinh dầu bưởi, xịt phòng..."
                      className="w-full sm:w-64 px-3 py-1.5 bg-white text-terracotta font-bold text-xs rounded-xl border border-beige focus:outline-none focus:border-moss shadow-2xs"
                    />
                  </div>
                  <div className="text-[11px] text-ink/70">
                    {focusKeyword.trim() ? (
                      hasKeywordInTitle && hasKeywordInDesc ? (
                        <span className="flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Từ khóa &quot;{focusKeyword}&quot; đã tối ưu chuẩn On-Page</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-amber-700 font-medium bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Gợi ý chèn thêm &quot;{focusKeyword}&quot; vào Tiêu đề/Mô tả</span>
                        </span>
                      )
                    ) : (
                      <span className="text-ink/50 italic">Có thể tùy chọn nhập từ khóa theo nhu cầu</span>
                    )}
                  </div>
                </div>
                <p className="text-[11px] text-ink/50">
                  * Hệ thống không khóa cứng: mặc định gợi ý &quot;Xịt thơm quần áo&quot;, bạn có thể nhập bất kỳ từ khóa nào khác tùy theo chủ đề bài viết.
                </p>
              </div>

              {/* 1. Đường dẫn (slug) */}
              <div className="space-y-2 p-4 rounded-2xl bg-cream/40 border border-beige">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <label className="text-xs font-extrabold text-[#25391C] uppercase tracking-wide flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#59683A] text-white text-[11px] flex items-center justify-center font-bold">
                      1
                    </span>
                    <span>Đường dẫn (slug) *</span>
                  </label>
                  <button
                    type="button"
                    onClick={generateSlugManually}
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
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="cach-su-dung-xit-thom-quan-ao"
                    className="flex-1 px-3 py-2.5 text-xs font-mono font-bold text-moss-dark bg-transparent focus:outline-none"
                  />
                </div>

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
                </div>
              </div>

              {/* 2. Tiêu đề SEO */}
              <div className="space-y-2 p-4 rounded-2xl bg-cream/40 border border-beige">
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
                  Quy tắc: nên có từ khóa chính để tối ưu hóa thứ hạng hiển thị trên Google
                </div>

                <input
                  type="text"
                  required
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder="Cách sử dụng xịt thơm quần áo đúng cách"
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-beige bg-white text-xs font-bold text-ink focus:outline-none focus:border-moss transition-colors"
                />

                <div className="flex items-center justify-between pt-1 text-[11px]">
                  {hasKeywordInTitle ? (
                    <span className="flex items-center gap-1 text-emerald-700 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{focusKeyword ? `Đã chứa từ khóa chính "${focusKeyword}"` : "Tiêu đề hợp lệ"}</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-amber-700 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Gợi ý chèn từ khóa: &quot;{focusKeyword}&quot;</span>
                    </span>
                  )}
                  <span className="text-ink/40">Khuyến nghị: 50–60 ký tự</span>
                </div>
              </div>

              {/* 3. Mô tả SEO */}
              <div className="space-y-2 p-4 rounded-2xl bg-cream/40 border border-beige">
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
                  rows={3}
                  required
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder="Khám phá cách sử dụng xịt thơm quần áo đúng cách từ Mộc Hương giúp lưu hương thơm ngát tự nhiên, khử mùi ẩm mốc và bảo vệ sợi vải suốt cả ngày dài."
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-beige bg-white text-xs text-ink focus:outline-none focus:border-moss transition-colors leading-relaxed"
                />

                <div className="flex items-center justify-between pt-1 text-[11px]">
                  {hasKeywordInDesc ? (
                    <span className="flex items-center gap-1 text-emerald-700 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{focusKeyword ? `Đã chứa từ khóa chính "${focusKeyword}"` : "Mô tả hợp lệ"}</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-amber-700 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Gợi ý chèn từ khóa: &quot;{focusKeyword}&quot;</span>
                    </span>
                  )}
                  <span className="text-ink/40">Khuyến nghị: 120–160 ký tự</span>
                </div>
              </div>

              {/* 4. Google SERP Preview */}
              <div className="p-5 rounded-2xl bg-[#F8F9FA] border border-[#DADCE0] space-y-3">
                <div className="flex items-center gap-2 border-b border-[#DADCE0] pb-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-ink/80 uppercase tracking-wider">
                    Xem trước kết quả tìm kiếm Google (SERP Preview)
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#DADCE0] space-y-1 font-sans">
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
                        {slug || "bai-viet-moi"}
                      </span>
                    </div>
                  </div>

                  <div className="text-[#1a0dab] hover:underline cursor-pointer font-medium text-base leading-snug pt-0.5 line-clamp-2">
                    {seoTitle || "Tiêu đề bài viết"} | Mộc Hương
                  </div>

                  <div className="text-[13px] text-[#4d5156] leading-relaxed pt-0.5 line-clamp-3">
                    <span className="text-[#70757a] text-xs">Vừa xong — </span>
                    {seoDescription || "Mô tả SEO tóm tắt bài viết hiển thị trên Google..."}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#59683A] text-white text-xs font-bold hover:bg-[#47542E] transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tạo bài viết & Lưu cấu hình SEO</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
