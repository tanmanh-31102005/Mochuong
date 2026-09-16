"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  Check,
  ShieldCheck,
  RotateCcw,
  Truck,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Layers,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { Product } from "@/features/products/types";
import { SINGLE_PRODUCTS } from "@/features/products/data/mock-products";
import { formatCurrency } from "@/shared/utils/format";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { RatingStars } from "@/shared/components/ui/RatingStars";
import { useCartStore } from "@/features/cart/store/cart-store";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { ComboBuilder } from "@/features/products/components/ComboBuilder";
import { PRODUCT_SHARED_CONFIG } from "@/core/config/product-shared.config";

export interface CollectionDetailViewProps {
  product: Product;
}

export const CollectionDetailView: React.FC<CollectionDetailViewProps> = ({
  product,
}) => {
  // Nếu là Combo 3 chai tự chọn -> Render ComboBuilder
  if (product.id === "combo-3-chai-tu-chon" || product.productKind === "CONFIGURABLE_COMBO") {
    return (
      <div className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-ink/60 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-moss">Trang chủ</Link>
            <span>/</span>
            <Link href="/bo-suu-tap" className="hover:text-moss">Bộ sưu tập</Link>
            <span>/</span>
            <span className="text-ink font-bold">Combo 3 chai tự chọn</span>
          </nav>
          <ComboBuilder comboOffer={product} />
        </div>
      </div>
    );
  }

  return <CollectionFixedDetailView product={product} />;
};

const CollectionFixedDetailView: React.FC<{ product: Product }> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"combo" | "huongdan" | "chinhsach">("combo");
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const thumbnailContainerRef = React.useRef<HTMLDivElement>(null);

  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const collectionPrice = product.giaKhuyenMai ?? product.gia;
  const singleRetailPrice = product.giaLeGoc ?? product.giaLeCongDon ?? product.gia;
  const bottleCount = product.includedItems?.length || product.soChai || 4;
  const savingsAmount = product.soTienTietKiem ?? (singleRetailPrice - collectionPrice);
  const savingsPercent = product.phanTramTietKiem ?? Math.round((savingsAmount / singleRetailPrice) * 100);
  const hasSavings = savingsAmount > 0;

  // Xây dựng danh sách các slide hiển thị trọn bộ và từng chai đơn
  const gallerySlides = React.useMemo(() => {
    const slides: Array<{
      id: string;
      title: string;
      type: "cover" | "single";
      imageUrl: string;
      badge: string;
      badgeVariant: "terracotta" | "moss";
      subtitle?: string;
      slug?: string;
    }> = [];

    // 1. Slide Ảnh Chụp Trọn Bộ (Cover)
    if (product.hinhAnh?.nhan && !product.hinhAnh.nhan.includes("placeholder")) {
      slides.push({
        id: "cover",
        title: "Ảnh Chụp Trọn Bộ",
        type: "cover",
        imageUrl: product.hinhAnh.nhan,
        badge: hasSavings ? `TIẾT KIỆM ${savingsPercent}%` : "BỘ SƯU TẬP TRỌN BỘ",
        badgeVariant: "terracotta",
        subtitle: `Trọn bộ ${bottleCount} chai 30ml nguyên chất từ thiên nhiên`,
      });
    }

    // 2. Slide từng chai đơn trong bộ sưu tập
    product.includedItems?.forEach((item, idx) => {
      const singleProd = SINGLE_PRODUCTS.find(
        (p) => p.id === item.productId || p.tenMuiHuong === item.scentName
      );
      const img = singleProd?.hinhAnh?.nhan;
      if (img && !img.includes("placeholder")) {
        slides.push({
          id: `bottle-${idx}`,
          title: item.scentName,
          type: "single",
          imageUrl: img,
          badge: `CHAI ${idx + 1}/${bottleCount}: ${item.scentName.toUpperCase()}`,
          badgeVariant: "moss",
          subtitle: item.description || singleProd?.congDungNoiBat || `Dung tích ${item.capacity || "30ml"}`,
          slug: item.slug || singleProd?.slug,
        });
      }
    });

    return slides;
  }, [product, savingsPercent, bottleCount, hasSavings]);

  const currentSlide = gallerySlides[activeSlideIndex] || gallerySlides[0];

  const handleScrollThumbnails = (direction: "up" | "down") => {
    if (thumbnailContainerRef.current) {
      thumbnailContainerRef.current.scrollBy({
        top: direction === "up" ? -110 : 110,
        left: direction === "up" ? -110 : 110,
        behavior: "smooth",
      });
    }
  };

  const handlePrevSlide = () => {
    setActiveSlideIndex((prev) => (prev > 0 ? prev - 1 : gallerySlides.length - 1));
  };

  const handleNextSlide = () => {
    setActiveSlideIndex((prev) => (prev < gallerySlides.length - 1 ? prev + 1 : 0));
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    if (!isAuthenticated) {
      router.push("/dang-nhap?returnUrl=/thanh-toan");
    } else {
      router.push("/thanh-toan");
    }
  };

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Đường dẫn trang" className="text-xs text-ink-muted mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-moss-dark">Trang chủ</Link>
          <span>/</span>
          <Link href="/bo-suu-tap" className="hover:text-moss-dark">Bộ sưu tập</Link>
          <span>/</span>
          <span className="text-ink font-bold">{product.tenMuiHuong}</span>
        </nav>

        {/* Khung Thông Tin Chính: Visual Combo + Purchase Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 bg-white p-5 sm:p-8 rounded-2xl border border-[#E3DACB] shadow-[0_10px_30px_rgba(74,74,74,0.05)]">
          {/* Cột Trái: Visual Gallery Cuộn Dọc & Ảnh Tràn Viền (Theo đúng mẫu Image 1 & Image 3) */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 items-stretch">
              {/* Dải Thumbnails (Cuộn dọc trên Desktop, cuộn ngang trên Mobile) */}
              <div className="flex sm:flex-col items-center w-full sm:w-20 lg:w-22 shrink-0 gap-1.5 sm:gap-2">
                {/* Nút Cuộn Lên (Desktop) */}
                <button
                  type="button"
                  onClick={() => handleScrollThumbnails("up")}
                  aria-label="Cuộn xem ảnh trước"
                  className="hidden sm:flex w-7 h-7 rounded-lg bg-[#FAF6EE] hover:bg-beige text-ink/70 hover:text-ink items-center justify-center border border-beige/80 transition-colors cursor-pointer shadow-2xs"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>

                {/* Danh Sách Thumbnail Cuộn */}
                <div
                  ref={thumbnailContainerRef}
                  className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto w-full max-h-[360px] sm:max-h-[420px] py-1 px-0.5 scrollbar-thin scrollbar-thumb-[#D8C7B0] scrollbar-track-transparent snap-x sm:snap-y"
                  style={{ scrollbarWidth: "thin" }}
                >
                  {gallerySlides.map((slide, idx) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setActiveSlideIndex(idx)}
                      className={cn(
                        "relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer group snap-start bg-white shadow-2xs",
                        activeSlideIndex === idx
                          ? "border-moss ring-2 ring-moss/40 shadow-md scale-102"
                          : "border-beige/90 opacity-70 hover:opacity-100 hover:border-moss/50"
                      )}
                    >
                      <Image
                        src={slide.imageUrl}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        sizes="90px"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-black/65 text-white text-[8px] sm:text-[9px] font-bold py-0.5 px-0.5 truncate text-center leading-tight">
                        {slide.type === "cover" ? "Trọn bộ" : slide.title}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Nút Cuộn Xuống (Desktop) */}
                <button
                  type="button"
                  onClick={() => handleScrollThumbnails("down")}
                  aria-label="Cuộn xem ảnh tiếp theo"
                  className="hidden sm:flex w-7 h-7 rounded-lg bg-[#FAF6EE] hover:bg-beige text-ink/70 hover:text-ink items-center justify-center border border-beige/80 transition-colors cursor-pointer shadow-2xs"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* Khung Ảnh Lớn Chính (Main Viewport): Tràn Viền 100%, Khớp Khung Ngoài, Không Khoảng Trắng Thừa */}
              <div className="relative flex-1 w-full aspect-square sm:aspect-[4/3] bg-[#FAF6EE] rounded-2xl sm:rounded-3xl border border-[#ECE4D8] overflow-hidden shadow-xs group">
                {/* Badge góc trên bên trái */}
                <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-20 flex flex-col gap-1.5 items-start pointer-events-none">
                  <Badge
                    variant={currentSlide.badgeVariant}
                    size="md"
                    className="shadow-md ring-1.5 ring-white/80 font-extrabold tracking-wide uppercase"
                  >
                    {currentSlide.badge}
                  </Badge>
                </div>

                {/* Số trang slide góc trên bên phải */}
                <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 bg-black/55 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs border border-white/20">
                  {activeSlideIndex + 1} / {gallerySlides.length}
                </div>

                {/* Ảnh Lớn: Tràn Đầy Khung Khớp Khung Ngoài (object-cover object-center w-full h-full) */}
                <div className="relative w-full h-full">
                  <Image
                    key={currentSlide.id}
                    src={currentSlide.imageUrl}
                    alt={currentSlide.title}
                    fill
                    className="object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* Mũi tên Next / Prev chuyển ảnh */}
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  aria-label="Xem ảnh trước"
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-ink shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer hover:scale-110"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextSlide}
                  aria-label="Xem ảnh tiếp theo"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-ink shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer hover:scale-110"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Khung Thông Tin Nổi Bên Dưới Viewport */}
                <div className="absolute inset-x-3 bottom-3 z-20 bg-white/95 backdrop-blur-md p-3 sm:p-3.5 rounded-xl border border-beige/80 shadow-md flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-serif font-bold text-sm sm:text-base text-moss-dark truncate">
                      {currentSlide.title}
                    </p>
                    <p className="text-[11px] text-ink-muted truncate">
                      {currentSlide.subtitle}
                    </p>
                  </div>
                  {currentSlide.slug && currentSlide.type === "single" && (
                    <Link
                      href={`/san-pham/${currentSlide.slug}`}
                      className="shrink-0 text-xs font-bold text-terracotta hover:text-terracotta-dark flex items-center gap-1 bg-terracotta/10 hover:bg-terracotta/15 px-2.5 py-1 rounded-lg transition-colors"
                    >
                      <span>Mua lẻ chai này</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Quick helper note dưới gallery */}
            <p className="text-center text-xs text-ink/60 italic pt-1">
              * Nhấp vào từng ảnh thumbnail bên trái hoặc danh sách bên phải để xem chi tiết từng chai trong bộ
            </p>
          </div>

          {/* Cột Phải: Thông tin combo & Nút mua */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-moss">
                  Bộ sưu tập trọn bộ theo dòng hương
                </span>
                {hasSavings && (
                  <span className="text-xs font-bold bg-terracotta/10 text-terracotta px-2.5 py-1 rounded-full">
                    Tiết kiệm {formatCurrency(savingsAmount)}
                  </span>
                )}
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-moss-dark">
                {product.tenMuiHuong}
              </h1>

              <div className="flex items-center gap-3">
                <RatingStars rating={product.danhGiaSao} size="md" />
                <span className="text-xs text-ink/60">
                  · {product.soLuongDanhGia} khách hàng đã đánh giá
                </span>
              </div>

              {/* Khối Giá */}
              <div className="p-4 bg-cream rounded-2xl border border-beige flex flex-wrap items-baseline gap-3">
                <span className="font-serif font-bold text-2xl sm:text-3xl text-terracotta">
                  {formatCurrency(collectionPrice)}
                </span>
                {hasSavings && (
                  <>
                    <span className="text-sm text-ink/50 line-through">
                      {formatCurrency(singleRetailPrice)}
                    </span>
                    <Badge variant="terracotta" size="sm">
                      TIẾT KIỆM {savingsPercent}%
                    </Badge>
                  </>
                )}
              </div>

              <p className="text-xs sm:text-sm text-ink/80 leading-relaxed italic border-l-2 border-moss pl-3">
                &ldquo;{product.moTaNgan}&rdquo;
              </p>

              {/* Danh Sách Chai Con 30ml Chi Tiết & Link Mua Lẻ Từng Chai */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-moss-dark block flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-terracotta" />
                  Danh Sách {bottleCount} Chai (30ml) Trong Bộ Sưu Tập:
                </span>
                <div className="space-y-2">
                  {product.includedItems?.map((item, idx) => {
                    const isSelected = activeSlideIndex === idx + 1;
                    return (
                      <div
                        key={idx}
                        onClick={() => setActiveSlideIndex(idx + 1)}
                        className={cn(
                          "p-3 rounded-xl border flex items-center justify-between text-xs transition-all cursor-pointer",
                          isSelected
                            ? "bg-[#F7EFE1] border-terracotta/60 ring-1 ring-terracotta/40 shadow-xs"
                            : "bg-[#FAF7F2] hover:bg-[#F3ECE0] border-beige"
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2
                            className={cn(
                              "w-4 h-4 shrink-0 transition-colors",
                              isSelected ? "text-terracotta" : "text-moss"
                            )}
                          />
                          <div>
                            <span className={cn("font-bold", isSelected ? "text-terracotta-dark" : "text-ink")}>
                              {item.scentName}
                            </span>
                            <span className="text-ink/60 ml-2 font-normal">
                              ({item.capacity || "30ml"})
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              "text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md",
                              isSelected
                                ? "bg-terracotta text-white"
                                : "text-moss bg-moss/10 group-hover:bg-moss/20"
                            )}
                          >
                            {isSelected ? "Đang xem ảnh" : "Xem ảnh chai"}
                          </span>

                          {item.slug && (
                            <Link
                              href={`/san-pham/${item.slug}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-ink-muted hover:text-terracotta font-bold text-xs flex items-center gap-1 hover:underline"
                            >
                              <span>Mua lẻ</span>
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Thao tác mua hàng */}
            <div className="space-y-4 pt-4 border-t border-beige">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-ink/80">Số lượng bộ:</span>
                <div className="flex items-center border border-beige rounded-xl overflow-hidden bg-cream">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 flex items-center justify-center text-ink/70 hover:bg-beige"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-12 text-center text-sm font-bold">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center text-ink/70 hover:bg-beige"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  fullWidth
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      <span>Đã thêm vào giỏ</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      <span>Thêm trọn bộ</span>
                    </>
                  )}
                </Button>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleBuyNow}
                  fullWidth
                >
                  <span>Mua trọn bộ ngay</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-ink/70 text-center">
                <div className="p-2 rounded-xl bg-cream flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-moss" />
                  <span>100% Thiên nhiên</span>
                </div>
                <div className="p-2 rounded-xl bg-cream flex flex-col items-center gap-1">
                  <RotateCcw className="w-4 h-4 text-moss" />
                  <span>Đổi trả 7 ngày</span>
                </div>
                <div className="p-2 rounded-xl bg-cream flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-moss" />
                  <span>Giao nhanh toàn quốc</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab thông tin bổ sung: Hướng dẫn sử dụng & Thành phần chuẩn */}
        <div className="mt-10 bg-white rounded-2xl border border-[#E3DACB] p-6 sm:p-8 shadow-[0_10px_30px_rgba(74,74,74,0.05)]">
          <div className="flex border-b border-beige gap-6 mb-6">
            <button
              type="button"
              onClick={() => setActiveTab("combo")}
              className={`pb-3 text-sm font-bold transition-all relative ${
                activeTab === "combo"
                  ? "text-moss border-b-2 border-moss"
                  : "text-ink/60 hover:text-ink"
              }`}
            >
              Thành phần tự nhiên
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("huongdan")}
              className={`pb-3 text-sm font-bold transition-all relative ${
                activeTab === "huongdan"
                  ? "text-moss border-b-2 border-moss"
                  : "text-ink/60 hover:text-ink"
              }`}
            >
              Hướng dẫn sử dụng chung
            </button>
          </div>

          {activeTab === "combo" ? (
            <div className="space-y-4 text-xs sm:text-sm text-ink/80 leading-relaxed max-w-3xl">
              <p className="font-semibold text-moss-dark">
                {PRODUCT_SHARED_CONFIG.ingredients.summary}
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                {PRODUCT_SHARED_CONFIG.ingredients.details.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="space-y-3 text-xs sm:text-sm text-ink/80 leading-relaxed max-w-3xl">
              <ol className="list-decimal pl-5 space-y-2">
                {PRODUCT_SHARED_CONFIG.usageInstructions.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
