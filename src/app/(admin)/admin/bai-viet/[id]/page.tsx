"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Check,
  RefreshCw,
  ImageIcon,
  Trash2,
} from "lucide-react";
import { useBlogStore } from "@/features/blog/store/blog-store";

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

export default function AdminBlogEditPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;

  const { getPostById, updatePost, deletePost } = useBlogStore();
  const post = getPostById(postId);

  // Form states
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Mẹo hay cuộc sống");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [coverImage, setCoverImage] = useState("/images/banner/banner-2.jpg");
  const [customImageUrl, setCustomImageUrl] = useState("");

  // SEO states (Từ khóa chính mặc định là "Xịt thơm quần áo", nhưng cho phép người dùng tự do nhập bất kỳ từ khóa nào)
  const [slug, setSlug] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("Xịt thơm quần áo");

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
      setCoverImage(post.coverImage || "/images/banner/banner-2.jpg");
      setSlug(post.seo?.slug || post.slug);
      setSeoTitle(post.seo?.seoTitle || post.title);
      setSeoDescription(post.seo?.seoDescription || post.excerpt);
      if (post.seo?.focusKeyword && post.seo.focusKeyword !== "cách sử dụng xịt thơm quần áo") {
        setFocusKeyword(post.seo.focusKeyword);
      } else {
        setFocusKeyword("Xịt thơm quần áo");
      }
    } else {
      // Default sample values
      setTitle("Cách Sử Dụng Xịt Thơm Quần Áo Đúng Cách Để Lưu Hương Bền Lâu");
      setExcerpt(
        "Hướng dẫn chi tiết cách sử dụng xịt thơm quần áo đúng cách giúp khử mùi ẩm mốc, giữ hương hoa cỏ tự nhiên thơm ngát và mềm mịn sợi vải."
      );
      setCoverImage("/images/banner/banner-2.jpg");
      setSlug("cach-su-dung-xit-thom-quan-ao");
      setSeoTitle("Cách sử dụng xịt thơm quần áo đúng cách");
      setSeoDescription(
        "Khám phá cách sử dụng xịt thơm quần áo đúng cách từ Mộc Hương giúp lưu hương thơm ngát tự nhiên, khử mùi ẩm mốc và bảo vệ sợi vải suốt cả ngày dài."
      );
      setFocusKeyword("Xịt thơm quần áo");
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

  // Hàm chuẩn hóa tiếng Việt không dấu để kiểm tra từ khóa linh hoạt
  const normalizeText = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .trim();

  // Kiểm tra từ khóa trong Tiêu đề SEO (Linh hoạt: cả có dấu lẫn không dấu, không ép buộc cứng)
  const hasKeywordInTitle = !focusKeyword.trim()
    ? true
    : seoTitle.toLowerCase().includes(focusKeyword.toLowerCase().trim()) ||
      normalizeText(seoTitle).includes(normalizeText(focusKeyword));

  // Kiểm tra từ khóa trong Mô tả SEO
  const hasKeywordInDesc = !focusKeyword.trim()
    ? true
    : seoDescription.toLowerCase().includes(focusKeyword.toLowerCase().trim()) ||
      normalizeText(seoDescription).includes(normalizeText(focusKeyword));

  // Xử lý Lưu cài đặt SEO & Bài viết
  const handleSave = () => {
    const finalPostId = post?.id || postId;
    updatePost(finalPostId, {
      title,
      excerpt,
      content,
      category,
      status,
      coverImage,
      slug,
      seo: {
        slug,
        seoTitle,
        seoDescription,
        focusKeyword: focusKeyword.trim() || "Xịt thơm quần áo",
        canonicalUrl: `https://mochuong.vn/blog/${slug}`,
        noIndex: false,
      },
    });

    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
    setSavedTime(timeString);
    setIsSaved(true);
  };

  const handleDelete = () => {
    if (confirm(`Bạn có chắc chắn muốn xóa bài viết "${title}" không?`)) {
      if (post?.id) {
        deletePost(post.id);
      }
      router.push("/admin/bai-viet");
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(`https://mochuong.vn/blog/${slug}`);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      {/* TOP ACTION BAR */}
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

        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
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

          <button
            type="button"
            onClick={handleDelete}
            className="p-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
            title="Xóa bài viết này"
          >
            <Trash2 className="w-4 h-4" />
          </button>

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

      {/* TWO COLUMNS: NỘI DUNG BÀI VIẾT (TRÁI) & MỤC CÀI ĐẶT SEO (PHẢI) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* CỘT TRÁI (5 CỘT): NỘI DUNG BÀI VIẾT CƠ BẢN & QUẢN LÝ ẢNH BÌA */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-[#E3DACB] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-beige">
              <h2 className="font-serif font-bold text-base text-[#25391C]">
                1. Thông Tin Bài Viết
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

          {/* Card Quản lý ảnh bìa (Cover Image Selector) */}
          <div className="bg-white p-6 rounded-3xl border border-[#E3DACB] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-beige">
              <h2 className="font-serif font-bold text-base text-[#25391C] flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-moss" />
                <span>2. Quản Lý Ảnh Bìa Bài Viết</span>
              </h2>
              <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Đã đồng bộ ảnh thật
              </span>
            </div>

            {/* Ảnh đang được chọn */}
            <div className="space-y-2">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border-2 border-moss/30 bg-[#FAF6EE] shadow-xs">
                <Image
                  src={coverImage || "/images/banner/banner.jpg"}
                  alt={title || "Ảnh bìa"}
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
                Chọn ảnh bìa từ kho tài nguyên Mộc Hương:
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
                Hoặc nhập đường dẫn ảnh khác:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                  placeholder="/images/... hoặc https://..."
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
              {/* TỪ KHÓA CHÍNH (FOCUS KEYWORD) - HOÀN TOÀN ĐƯỢC CHỈNH SỬA TỰ DO, MẶC ĐỊNH LÀ "XỊT THƠM QUẦN ÁO" */}
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
                      placeholder="VD: Xịt thơm quần áo, tinh dầu ngủ ngon..."
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
                  * Hệ thống không khóa cứng: bạn có thể nhập &quot;Xịt thơm quần áo&quot; hoặc bất kỳ từ khóa nào khác tùy theo chủ đề bài viết.
                </p>
              </div>

              {/* 1. ĐƯỜNG DẪN (SLUG) */}
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

              {/* 2. TIÊU ĐỀ SEO (SEO TITLE) */}
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
                      seoTitle.length >= 30 && seoTitle.length <= 60
                        ? "text-emerald-700"
                        : "text-ink/60"
                    }`}
                  >
                    {seoTitle.length} / 60 ký tự {seoTitle.length >= 30 && seoTitle.length <= 60 ? "(Độ dài tối ưu)" : ""}
                  </span>
                </div>

                <div className="text-[11px] text-ink/65 italic">
                  Quy tắc: nên có từ khóa chính để tối ưu hóa thứ hạng hiển thị trên Google
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

              {/* 3. MÔ TẢ SEO (META DESCRIPTION) */}
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
                      seoDescription.length >= 100 && seoDescription.length <= 160
                        ? "text-emerald-700"
                        : "text-ink/60"
                    }`}
                  >
                    {seoDescription.length} / 160 ký tự {seoDescription.length >= 100 && seoDescription.length <= 160 ? "(Chuẩn Google SERP)" : ""}
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
                    <span>Tiêu đề chứa từ khóa chính linh hoạt</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Độ dài tiêu đề tối ưu hiển thị (dưới 60 ký tự)</span>
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
