"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound, redirect, useRouter } from "next/navigation";
import { MOCK_PRODUCTS } from "@/features/products/data/mock-products";
import { MOCK_REVIEWS } from "@/features/reviews/data/mock-reviews";
import { ProductCard } from "@/features/products/components/ProductCard";
import { Button } from "@/shared/components/ui/Button";
import { Badge } from "@/shared/components/ui/Badge";
import { RatingStars } from "@/shared/components/ui/RatingStars";
import { useCartStore } from "@/features/cart/store/cart-store";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { formatCurrency } from "@/shared/utils/format";
import { Product } from "@/features/products/types";
import { PRODUCT_SHARED_CONFIG } from "@/core/config/product-shared.config";
import {
  ShoppingBag,
  Check,
  ShieldCheck,
  RotateCcw,
  Truck,
  Plus,
  Minus,
  ArrowRight,
} from "lucide-react";

/**
 * TUYẾN ĐƯỜNG: /san-pham/[slug]
 * CHUYÊN BIỆT: Chi tiết sản phẩm đơn lẻ (30ml)
 * Tuyệt đối KHÔNG còn Dynamic Dispatcher danh mục dòng hương tại đây.
 */
export default function SingleProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const product = MOCK_PRODUCTS.find(
    (p) =>
      p.slug === slug ||
      (p.id === "prod-sa-chanh" && (slug === "sa-chanh-30ml" || slug === "sa-chanh-thanh-loc-30ml")) ||
      (p.id === "prod-bac-ha" && (slug === "bac-ha-30ml" || slug === "bac-ha-tuoi-mat-30ml")) ||
      (p.id === "prod-chanh" && (slug === "chanh-30ml" || slug === "chanh-sang-khoai-30ml"))
  );

  if (!product) {
    notFound();
  }

  // Nếu người dùng vô tình truy cập URL combo bộ sưu tập hoặc set quà tại /san-pham/
  // Tự động chuyển hướng về route chuẩn SEO tương ứng
  if (product.productType === "COLLECTION") {
    redirect(`/bo-suu-tap/${product.slug}`);
  }
  if (product.productType === "GIFT_SET") {
    redirect(`/set-qua-tang/${product.slug}`);
  }

  return <SingleProductDetailView product={product} />;
}

function SingleProductDetailView({ product }: { product: Product }) {
  const [selectedImageTab, setSelectedImageTab] = useState<"nhan" | "boicanh">("nhan");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"thanhphan" | "huongdan" | "chinhsach">("thanhphan");
  const [isAdded, setIsAdded] = useState(false);

  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const currentPrice = product.giaKhuyenMai ?? product.gia;
  const hasDiscount = product.giaKhuyenMai && product.giaKhuyenMai < product.gia;

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

  // Sản phẩm liên quan cùng dòng hương
  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) =>
      p.id !== product.id &&
      (p.productType === "SINGLE" || p.productKind === "SINGLE_PRODUCT") &&
      (Array.isArray(p.dongHuong)
        ? p.dongHuong.includes(product.dongHuong as any)
        : p.dongHuong === product.dongHuong)
  ).slice(0, 4);

  // Tone màu theo dòng hương
  const getBottleStyles = () => {
    if (product.dongHuong.includes("thao-moc")) {
      return {
        bg: "bg-linear-to-b from-[#EDF4E8] via-[#DFECCF] to-[#CEE2BC]",
        border: "border-[#B5CFA3]",
        labelAccent: "text-[#4E6235]",
      };
    }
    if (product.dongHuong.includes("hoa")) {
      return {
        bg: "bg-linear-to-b from-[#FDF0F3] via-[#F8DEE5] to-[#F1CAD6]",
        border: "border-[#DDB3C2]",
        labelAccent: "text-[#8B5263]",
      };
    }
    if (product.dongHuong.includes("trai-cay")) {
      return {
        bg: "bg-linear-to-b from-[#FFF5E8] via-[#FDE5CA] to-[#F9D2A5]",
        border: "border-[#E8BA85]",
        labelAccent: "text-[#9A6328]",
      };
    }
    if (product.dongHuong.includes("am-nong")) {
      return {
        bg: "bg-linear-to-b from-[#F7EFE8] via-[#EEDCCF] to-[#DFC4B0]",
        border: "border-[#C8A892]",
        labelAccent: "text-[#76533E]",
      };
    }
    return {
      bg: "bg-linear-to-b from-[#F5F2EB] via-[#ECE6D8] to-[#DDD4C1]",
      border: "border-[#C5BCAB]",
      labelAccent: "text-[#665E50]",
    };
  };

  const bottleStyle = getBottleStyles();

  return (
    <div className="py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-ink/70 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-moss-dark">Trang chủ</Link>
          <span>/</span>
          <Link href="/san-pham" className="hover:text-moss-dark">Sản phẩm</Link>
          <span>/</span>
          <span className="text-ink font-bold line-clamp-1">{product.tenMuiHuong}</span>
        </nav>

        {/* Khối Thông Tin Chính: Cột Trái Gallery + Cột Phải Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white p-5 sm:p-8 rounded-2xl border border-beige/80 shadow-xs">
          {/* Cột Trái: Visual Gallery & Zoom Representation (2.1, 2.2, 2.3) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square sm:aspect-[4/3] bg-[#FAF6EE] rounded-2xl border border-[#ECE4D8] overflow-hidden shadow-xs group">
              {/* Badge với viền trắng và bóng mờ nổi rõ trên mọi nền ảnh */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-20">
                  <Badge
                    variant="terracotta"
                    size="md"
                    className="shadow-md ring-1 ring-white/60 font-extrabold tracking-wide uppercase"
                  >
                    {product.badge}
                  </Badge>
                </div>
              )}

              {selectedImageTab === "nhan" ? (
                product.hinhAnh?.nhan && !product.hinhAnh.nhan.includes("placeholder") ? (
                  /* Ảnh lifestyle tràn viền theo đúng viền khung ngoài, loại bỏ khoảng trắng thừa */
                  <div className="relative w-full h-full">
                    <Image
                      src={product.hinhAnh.nhan}
                      alt={product.tenMuiHuong}
                      fill
                      className="object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  /* Mô phỏng chai xịt thơm 30ml chuẩn studio (Placeholder) */
                  <div className="flex items-center justify-center w-full h-full p-6">
                    <div className="flex flex-col items-center transform scale-115 sm:scale-125 transition-transform duration-500">
                      <div className="w-6 h-5 bg-[#2A2A2A] rounded-t-sm relative shadow-md">
                        <div className="absolute -top-2 right-1.5 w-3 h-2 bg-[#444] rounded-xs" />
                      </div>
                      <div className="w-8 h-3 bg-linear-to-r from-[#C29B38] via-[#E8D18C] to-[#B38B2E] shadow-sm" />
                      <div
                        className={`w-24 h-46 rounded-t-md rounded-b-3xl ${bottleStyle.bg} border ${bottleStyle.border} shadow-lg flex flex-col items-center justify-between p-3 relative overflow-hidden`}
                      >
                        <div className="absolute left-2 top-0 bottom-0 w-2.5 bg-linear-to-r from-white/50 to-transparent blur-[0.5px]" />
                        <div className="w-full bg-[#FCFAF7]/95 rounded-md p-2 text-center shadow-xs border border-[#E8DFD1] z-1 mt-7">
                          <span className="text-[8px] font-sans font-extrabold uppercase tracking-widest text-moss block">
                            Mộc Hương
                          </span>
                          <span className="text-[11px] font-serif font-bold text-ink-dark block leading-tight mt-1">
                            {product.tenMuiHuong}
                          </span>
                          <span className="text-[8px] text-ink-muted block mt-1 font-semibold">
                            Dung tích {product.dungTich} · Tự nhiên
                          </span>
                        </div>
                        <div className="w-2.5 h-2.5 rounded-full bg-moss/60 mb-2 z-1" />
                      </div>
                    </div>
                  </div>
                )
              ) : (
                /* Bối cảnh phòng ốc / không gian sống */
                <div className="flex items-center justify-center w-full h-full p-6">
                  <div className="flex flex-col items-center justify-center text-center p-6 space-y-3 max-w-sm">
                    <div className="w-14 h-14 rounded-2xl bg-white/90 border border-beige flex items-center justify-center text-moss shadow-xs">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif font-bold text-base text-ink-dark">
                      Không Gian Phù Hợp Cho {product.tenMuiHuong}
                    </h3>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      Xịt thơm gối đệm phòng ngủ, rèm cửa phòng khách hoặc tủ quần áo. Khử triệt để mùi ẩm mốc và mang lại cảm giác dễ chịu tức thì.
                    </p>
                    <div className="flex flex-wrap gap-1.5 justify-center pt-2">
                      {product.phuHopVoi?.map((place, idx) => (
                        <span key={idx} className="text-[11px] bg-white border border-beige px-2.5 py-1 rounded-md text-ink-dark font-medium">
                          ✓ {place}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnails Chọn Chế Độ Ảnh */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setSelectedImageTab("nhan")}
                className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  selectedImageTab === "nhan"
                    ? "border-moss bg-moss/10 text-moss shadow-2xs"
                    : "border-beige/80 bg-cream text-ink/70 hover:bg-beige/40"
                }`}
              >
                Chai Xịt Thơm (30ml)
              </button>
              <button
                type="button"
                onClick={() => setSelectedImageTab("boicanh")}
                className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  selectedImageTab === "boicanh"
                    ? "border-moss bg-moss/10 text-moss shadow-2xs"
                    : "border-beige/80 bg-cream text-ink/70 hover:bg-beige/40"
                }`}
              >
                Gợi Ý Không Gian Sử Dụng
              </button>
            </div>
          </div>

          {/* Cột Phải: Thông Tin Mua Hàng & Spacing chuẩn mực (2.4) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-0.5">
                <span className="text-xs font-bold uppercase tracking-wider text-moss">
                  Dòng hương: {product.dongHuongLabel || (Array.isArray(product.dongHuong) ? product.dongHuong.join(" & ") : product.dongHuong)}
                </span>
                <span className="text-xs font-bold bg-beige px-2.5 py-1 rounded-full text-ink/80">
                  Dung tích chuẩn: {product.dungTich}
                </span>
              </div>

              {/* Tên sản phẩm H1 với khoảng cách trên dưới cân đối, không dính sát (2.4) */}
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-moss-dark tracking-tight leading-tight my-1">
                {product.tenMuiHuong}
              </h1>

              {/* Đánh giá sao */}
              <div className="flex items-center gap-3 pt-0.5">
                <RatingStars rating={product.danhGiaSao} size="md" />
                <span className="text-xs text-ink/60">
                  · {product.soLuongDanhGia} khách hàng đã đánh giá
                </span>
              </div>

              {/* Khối Giá */}
              <div className="p-4 bg-cream rounded-2xl border border-beige flex items-center gap-4">
                <span className="font-serif font-bold text-2xl sm:text-3xl text-terracotta">
                  {formatCurrency(currentPrice)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-sm text-ink/40 line-through">
                      {formatCurrency(product.gia)}
                    </span>
                    <Badge variant="terracotta" size="sm">
                      Tiết kiệm {formatCurrency(product.gia - (product.giaKhuyenMai || 0))}
                    </Badge>
                  </>
                )}
              </div>

              {/* Mô tả cảm xúc ngắn */}
              <p className="text-xs sm:text-sm text-ink/80 leading-relaxed italic border-l-2 border-moss pl-3">
                &ldquo;{product.moTaNgan}&rdquo;
              </p>

              {/* Tầng Hương (Nốt hương) */}
              {product.notHuong && (
                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-moss-dark block">
                    Các Tầng Hương:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.notHuong.map((not, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-beige/80 px-2.5 py-1 rounded-lg text-ink/80"
                      >
                        {not}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Thao tác mua hàng */}
            <div className="space-y-4 pt-4 border-t border-beige">
              {/* Chọn số lượng */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-ink/80">Số lượng:</span>
                <div className="flex items-center border border-beige rounded-xl overflow-hidden bg-cream">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 flex items-center justify-center text-ink/70 hover:bg-beige cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-12 text-center text-sm font-bold">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center text-ink/70 hover:bg-beige cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Nút hành động */}
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
                      <span>Thêm vào giỏ</span>
                    </>
                  )}
                </Button>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleBuyNow}
                  fullWidth
                >
                  <span>Mua ngay</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Cam kết mua hàng */}
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
                  <span>Freeship từ 300k</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Khối Tabs Chi Tiết: Thành Phần, Hướng Dẫn, Chính Sách */}
        <div className="mt-10 bg-white rounded-2xl border border-[#E3DACB] p-6 sm:p-8 shadow-[0_10px_30px_rgba(74,74,74,0.05)]">
          <div className="flex border-b border-beige gap-2 sm:gap-6 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab("thanhphan")}
              className={`pb-4 text-xs sm:text-sm font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === "thanhphan"
                  ? "border-moss text-moss"
                  : "border-transparent text-ink/60 hover:text-ink"
              }`}
            >
              Thành Phần &amp; Công Dụng
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("huongdan")}
              className={`pb-4 text-xs sm:text-sm font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === "huongdan"
                  ? "border-moss text-moss"
                  : "border-transparent text-ink/60 hover:text-ink"
              }`}
            >
              Hướng Dẫn Sử Dụng
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("chinhsach")}
              className={`pb-4 text-xs sm:text-sm font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === "chinhsach"
                  ? "border-moss text-moss"
                  : "border-transparent text-ink/60 hover:text-ink"
              }`}
            >
              Chính Sách Đổi Trả &amp; Vận Chuyển
            </button>
          </div>

          <div className="pt-6 text-xs sm:text-sm text-ink/80 leading-relaxed">
            {activeTab === "thanhphan" && (
              <div className="space-y-4">
                <p className="font-semibold text-moss-dark">
                  {PRODUCT_SHARED_CONFIG.ingredients.summary}
                </p>
                <div className="p-4 bg-cream rounded-2xl border border-beige">
                  <h4 className="font-bold text-moss-dark mb-1.5">Chi tiết thành phần &amp; cam kết:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-ink/70">
                    {PRODUCT_SHARED_CONFIG.ingredients.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "huongdan" && (
              <div className="space-y-4">
                <h4 className="font-bold text-moss-dark mb-1">5 Bước sử dụng và bảo quản đúng cách:</h4>
                <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-ink/80">
                  {PRODUCT_SHARED_CONFIG.usageInstructions.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
                <div className="p-4 bg-[#FAF4EB] rounded-2xl border border-[#F0E0CA]">
                  <h4 className="font-bold text-terracotta mb-1">Mẹo nhỏ từ Mộc Hương:</h4>
                  <p className="text-xs text-ink/70">
                    Để hương thơm giữ lâu nhất, hãy xịt sau khi vừa ủi đồ hoặc xịt vào lớp vải lót bên trong áo khoác. Với phòng ngủ, hãy xịt lên rèm cửa hoặc vỏ gối trước khi ngủ khoảng 10–15 phút.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "chinhsach" && (
              <div className="space-y-3">
                <p>
                  <strong>Chính sách đổi trả:</strong> Mộc Hương hỗ trợ đổi sản phẩm mới hoàn toàn miễn phí trong vòng 7 ngày nếu bạn gặp bất kỳ vấn đề kích ứng hoặc sản phẩm bị lỗi vòi xịt do vận chuyển.
                </p>
                <p>
                  <strong>Chính sách vận chuyển:</strong> Giao hàng nhanh toàn quốc từ 1–3 ngày làm việc. Miễn phí vận chuyển cho mọi đơn hàng từ 300.000đ.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Khối Đánh Giá Khách Hàng */}
        <div className="mt-10 bg-white rounded-2xl border border-[#E3DACB] p-6 sm:p-8 shadow-[0_10px_30px_rgba(74,74,74,0.05)]">
          <div className="flex items-center justify-between pb-6 border-b border-beige mb-6">
            <div>
              <h3 className="font-serif font-bold text-xl text-moss-dark">
                Đánh Giá Từ Khách Hàng
              </h3>
              <p className="text-xs text-ink/60 mt-1">
                Xem trải nghiệm thực tế từ những người đã dùng xịt thơm {product.tenMuiHuong}
              </p>
            </div>
            <RatingStars rating={product.danhGiaSao} totalReviews={product.soLuongDanhGia} size="lg" />
          </div>

          <div className="space-y-4">
            {MOCK_REVIEWS.slice(0, 2).map((rev) => (
              <div key={rev.id} className="p-4 bg-cream rounded-2xl border border-beige space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-moss-dark">{rev.authorName}</span>
                    <span className="text-[10px] bg-moss/10 text-moss font-bold px-2 py-0.5 rounded-full">
                      Đã mua hàng
                    </span>
                  </div>
                  <span className="text-xs text-ink/50">{rev.date}</span>
                </div>
                <RatingStars rating={rev.rating} size="sm" showNumber={false} />
                <p className="text-xs text-ink/80 leading-relaxed italic">
                  &ldquo;{rev.content}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Khối Sản Phẩm Cùng Dòng Hương Gợi Ý */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-beige">
              <div>
                <span className="text-xs font-bold text-moss uppercase tracking-wider block">
                  Khám Phá Thêm
                </span>
                <h3 className="font-serif text-2xl font-bold text-moss-dark">
                  Mùi Hương Cùng Dòng Bạn Sẽ Thích
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
