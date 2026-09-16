"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Gift,
  ShoppingBag,
  Check,
  ShieldCheck,
  RotateCcw,
  Truck,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  Heart,
  Package,
} from "lucide-react";
import { Product } from "@/features/products/types";
import { formatCurrency } from "@/shared/utils/format";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { RatingStars } from "@/shared/components/ui/RatingStars";
import { useCartStore } from "@/features/cart/store/cart-store";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { GiftSetBuilder } from "./GiftSetBuilder";
import { IncludedItemsList } from "./IncludedItemsList";
import { PRODUCT_SHARED_CONFIG } from "@/core/config/product-shared.config";

export interface GiftSetDetailViewProps {
  product: Product;
}

export const GiftSetDetailView: React.FC<GiftSetDetailViewProps> = ({
  product,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"hopqua" | "thiep" | "chinhsach">("hopqua");

  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Nếu là Set quà tự chọn -> Render GiftSetBuilder
  if (product.isConfigurable || product.productKind === "GIFT_SET_CUSTOM") {
    return (
      <div className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-ink/60 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-moss">Trang chủ</Link>
            <span>/</span>
            <Link href="/set-qua-tang" className="hover:text-moss">Set quà tặng</Link>
            <span>/</span>
            <span className="text-ink font-bold">{product.tenMuiHuong}</span>
          </nav>
          <GiftSetBuilder giftSet={product} />
        </div>
      </div>
    );
  }

  const currentPrice = product.giaKhuyenMai ?? product.gia;
  const hasDiscount = product.giaKhuyenMai && product.giaKhuyenMai < product.gia;
  const bottleCount = product.includedItems?.length || 3;

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
    <div className="py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Đường dẫn trang" className="text-xs text-ink-muted mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-moss-dark">Trang chủ</Link>
          <span>/</span>
          <Link href="/set-qua-tang" className="hover:text-moss-dark">Set quà tặng</Link>
          <span>/</span>
          <span className="text-ink font-bold">{product.tenMuiHuong}</span>
        </nav>

        {/* Khung Chi Tiết Chính: Gift Visual Gallery + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 bg-white p-5 sm:p-8 rounded-2xl border border-[#E3DACB] shadow-[0_10px_30px_rgba(74,74,74,0.05)]">
          {/* Cột Trái: Visual Hộp Quà Sang Trọng */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] bg-[#F8F1E7] rounded-2xl border border-[#E3DACB] overflow-hidden shadow-xs group">
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
                <Badge variant="terracotta" size="md">
                  SET QUÀ CHỦ ĐỀ CỐ ĐỊNH
                </Badge>
                <span className="bg-[#63493A] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5" />
                  {bottleCount} chai 30ml tuyển chọn
                </span>
              </div>

              {/* Mô phỏng hộp quà kèm chai bên trong / Ảnh thật hộp quà */}
              {product.hinhAnh?.nhan && !product.hinhAnh.nhan.includes("placeholder") ? (
                <div className="absolute inset-0">
                  <Image
                    src={product.hinhAnh.nhan}
                    alt={product.tenMuiHuong}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center scale-95 sm:scale-105 transition-transform">
                  <div className="w-64 h-52 bg-[#EFE4D6] rounded-3xl border-2 border-[#D8C2AA] shadow-2xl flex flex-col items-center justify-center p-4 relative overflow-hidden">
                    <div className="absolute top-0 bottom-0 w-6 bg-[#A63C38] left-1/2 -translate-x-1/2 shadow-xs" />
                    <div className="absolute left-0 right-0 h-6 bg-[#A63C38] top-1/2 -translate-y-1/2 shadow-xs" />
                    
                    <div className="w-12 h-12 rounded-full bg-[#8C2C28] text-white flex items-center justify-center z-2 shadow-lg text-xs font-serif font-bold border-2 border-white/40">
                      MH
                    </div>

                    <div className="absolute bottom-3 right-3 bg-white/95 px-3 py-1.5 rounded-xl text-[10px] font-bold text-ink border border-beige shadow-sm z-2 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-terracotta" />
                      <span>Bộ {bottleCount} chai x 30ml</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <p className="text-center text-xs text-ink-muted italic">
              * Đã bao gồm hộp quà thủ công, nơ lụa và thiệp chúc viết tay nắn nót
            </p>
          </div>

          {/* Cột Phải: Thông tin quà tặng & Nút mua */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-terracotta flex items-center gap-1">
                  <Gift className="w-3.5 h-3.5" />
                  Hộp Quà Trao Gửi Yêu Thương
                </span>
                <span className="text-xs font-bold bg-moss/10 text-moss px-2.5 py-1 rounded-full">
                  Freeship toàn quốc
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-moss-dark leading-tight">
                {product.tenMuiHuong}
              </h1>

              <div className="flex items-center gap-3">
                <RatingStars rating={product.danhGiaSao} size="md" />
                <span className="text-xs text-ink-muted">
                  · {product.soLuongDanhGia} khách hàng đã tặng quà
                </span>
              </div>

              {/* Khối Giá */}
              <div className="p-4 bg-cream rounded-2xl border border-beige flex items-center gap-4">
                <span className="font-serif font-bold text-2xl sm:text-3xl text-terracotta">
                  {formatCurrency(currentPrice)}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-ink/40 line-through">
                    {formatCurrency(product.gia)}
                  </span>
                )}
                <Badge variant="moss" size="sm">
                  Trọn bộ hộp quà cao cấp
                </Badge>
              </div>

              <p className="text-xs sm:text-sm text-ink/80 leading-relaxed italic border-l-2 border-terracotta pl-3">
                &ldquo;{product.moTaNgan}&rdquo;
              </p>

              {/* DANH SÁCH CHI TIẾT CÁC CHAI 30ml BÊN TRONG HỘP QUÀ */}
              {product.includedItems && (
                <IncludedItemsList
                  items={product.includedItems}
                  title={`Các chai xịt thơm (${bottleCount} chai × 30ml) bên trong set quà:`}
                />
              )}
            </div>

            {/* Thao tác mua quà */}
            <div className="space-y-4 pt-4 border-t border-beige">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-ink/80">Số lượng set:</span>
                <div className="flex items-center border border-beige rounded-xl overflow-hidden bg-cream">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 flex items-center justify-center text-ink/70 hover:bg-beige"
                    aria-label="Giảm số lượng set quà"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-12 text-center text-sm font-bold">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center text-ink/70 hover:bg-beige"
                    aria-label="Tăng số lượng set quà"
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
                      <span>Thêm set quà</span>
                    </>
                  )}
                </Button>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleBuyNow}
                  fullWidth
                >
                  <span>Đặt mua set quà</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-ink-muted text-center">
                <div className="p-2 rounded-xl bg-cream flex flex-col items-center gap-1">
                  <Package className="w-4 h-4 text-moss" />
                  <span>Đóng gói 3 lớp</span>
                </div>
                <div className="p-2 rounded-xl bg-cream flex flex-col items-center gap-1">
                  <Gift className="w-4 h-4 text-moss" />
                  <span>Tặng kèm thiệp viết</span>
                </div>
                <div className="p-2 rounded-xl bg-cream flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-moss" />
                  <span>Giao tận tay người nhận</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Khối Tabs Chi Tiết Hộp Quà */}
        <div className="mt-10 bg-white rounded-2xl border border-[#E3DACB] p-6 sm:p-8 shadow-[0_10px_30px_rgba(74,74,74,0.05)]">
          <div className="flex border-b border-beige gap-6 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab("hopqua")}
              className={`pb-4 text-xs sm:text-sm font-bold transition-all border-b-2 cursor-pointer ${
                activeTab === "hopqua"
                  ? "border-moss text-moss"
                  : "border-transparent text-ink-muted hover:text-ink"
              }`}
            >
              Quy Cách Đóng Gói Hộp Quà
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("thiep")}
              className={`pb-4 text-xs sm:text-sm font-bold transition-all border-b-2 cursor-pointer ${
                activeTab === "thiep"
                  ? "border-moss text-moss"
                  : "border-transparent text-ink-muted hover:text-ink"
              }`}
            >
              Dịch Vụ Viết Thiệp &amp; Giao Hẹn Giờ
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("chinhsach")}
              className={`pb-4 text-xs sm:text-sm font-bold transition-all border-b-2 cursor-pointer ${
                activeTab === "chinhsach"
                  ? "border-moss text-moss"
                  : "border-transparent text-ink-muted hover:text-ink"
              }`}
            >
              Bảo Đảm An Toàn Vận Chuyển
            </button>
          </div>

          <div className="pt-6 text-xs sm:text-sm text-ink/80 leading-relaxed">
            {activeTab === "hopqua" && (
              <div className="space-y-4">
                <p>{product.thanhPhanCongDung}</p>
                <div className="p-4 bg-cream rounded-2xl border border-beige">
                  <h2 className="font-bold text-moss-dark mb-2">
                    Trọn bộ hộp quà gửi đến người nhận bao gồm:
                  </h2>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-ink-muted">
                    <li>Hộp quà cứng cáp tone be mộc sang trọng, thắt nơ ruy băng thủ công.</li>
                    <li>Lớp lót rơm gỗ tự nhiên và hoa oải hương khô Pháp thoảng hương nhẹ khi mở hộp.</li>
                    <li>{bottleCount} chai xịt thơm 30ml cao cấp với nhãn in ép kim sắc nét.</li>
                    <li>Thiệp chúc viết tay và túi xách giấy Mộc Hương quai dù lịch sự.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "thiep" && (
              <div className="space-y-3">
                <p>
                  <strong>Dịch vụ viết thiệp tay miễn phí:</strong> Bạn có thể ghi lời chúc muốn gửi gắm khi thanh toán. Đội ngũ Mộc Hương sẽ nắn nót viết tay từng nét chữ lên thiệp mộc mạc gửi đến người nhận (miễn phí khi mua Set Quà).
                </p>
                <p>
                  <strong>Giao hàng hẹn giờ:</strong> Chúng tôi hỗ trợ giao quà đúng ngày sinh nhật, ngày kỷ niệm mà không kèm theo hóa đơn giá tiền bên trong hộp quà.
                </p>
              </div>
            )}

            {activeTab === "chinhsach" && (
              <div className="space-y-3">
                <p>
                  <strong>Đóng gói chống sốc 3 lớp:</strong> Mỗi chai 30ml được bảo vệ bằng màng xốp khí bọc kín, hộp quà ngoài cùng được chèn đệm hơi chống va đập 100% trên mọi cung đường vận chuyển.
                </p>
                <p>
                  <strong>Cam kết hoàn tiền hoặc gửi mới:</strong> Nếu hộp quà hoặc chai xịt gặp bất kỳ sự cố do vận chuyển, Mộc Hương cam kết gửi lại set quà mới hỏa tốc hoàn toàn miễn phí.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
