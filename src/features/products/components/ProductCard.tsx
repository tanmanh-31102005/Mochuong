"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Check, Eye } from "lucide-react";
import { Product, getProductUrl } from "../types";
import { formatCurrency } from "@/shared/utils/format";
import { Badge } from "@/shared/components/ui/Badge";
import { RatingStars } from "@/shared/components/ui/RatingStars";
import { useCartStore } from "@/features/cart/store/cart-store";
import { cn } from "@/shared/utils/cn";

export interface ProductCardProps {
  product: Product;
  className?: string;
  isComboView?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className,
  isComboView = false,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const currentPrice = product.giaKhuyenMai ?? product.gia;
  const hasDiscount = product.giaKhuyenMai && product.giaKhuyenMai < product.gia;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  // Tone màu nhã nhặn đại diện cho chai tinh dầu theo từng dòng hương
  const getBottleStyles = () => {
    if (product.dongHuong.includes("thao-moc")) {
      return {
        bg: "bg-linear-to-b from-[#EDF4E8] via-[#DFECCF] to-[#CEE2BC]",
        border: "border-[#B5CFA3]",
        accent: "#5C7548",
        glow: "rgba(138, 154, 91, 0.12)",
      };
    }
    if (product.dongHuong.includes("hoa")) {
      return {
        bg: "bg-linear-to-b from-[#FDF0F3] via-[#F8DEE5] to-[#F1CAD6]",
        border: "border-[#DDB3C2]",
        accent: "#8B5263",
        glow: "rgba(201, 124, 93, 0.12)",
      };
    }
    if (product.dongHuong.includes("trai-cay")) {
      return {
        bg: "bg-linear-to-b from-[#FFF5E8] via-[#FDE5CA] to-[#F9D2A5]",
        border: "border-[#E8BA85]",
        accent: "#9A6328",
        glow: "rgba(217, 140, 60, 0.12)",
      };
    }
    if (product.dongHuong.includes("am-nong")) {
      return {
        bg: "bg-linear-to-b from-[#F7EFE8] via-[#EEDCCF] to-[#DFC4B0]",
        border: "border-[#C8A892]",
        accent: "#76533E",
        glow: "rgba(118, 83, 62, 0.12)",
      };
    }
    return {
      bg: "bg-linear-to-b from-[#F5F2EB] via-[#ECE6D8] to-[#DDD4C1]",
      border: "border-[#C5BCAB]",
      accent: "#665E50",
      glow: "rgba(102, 94, 80, 0.1)",
    };
  };

  const bottleStyle = getBottleStyles();

  return (
    <div
      className={cn(
        "group relative bg-white rounded-2xl border border-[#E7DED0] p-2.5 sm:p-3 hover:border-moss/50 hover:shadow-[0_12px_28px_rgba(74,74,74,0.08)] transition-all duration-300 flex flex-col justify-between",
        className
      )}
    >
      {/* Top Visual Container: Khung nền trung gian màu kem nhạt (1.1, 1.2, 1.4) */}
      <div className="relative w-full aspect-square sm:aspect-[4/5] bg-[#F8F1E7] rounded-[14px] sm:rounded-[16px] p-2.5 sm:p-3 border border-[#ECE1D2] flex items-center justify-center overflow-hidden">
        {/* Badges Overlay (1.4, 2.3) */}
        <div className="absolute top-2.5 left-2.5 z-20 flex flex-col gap-1.5 items-start pointer-events-none">
          {product.badge && (
            <Badge
              variant={
                product.badge.includes("99K") ||
                product.badge.includes("189K") ||
                product.badge.includes("169K") ||
                product.badge.includes("159K") ||
                product.badge.includes("TIẾT KIỆM") ||
                product.badge.includes("Bán chạy")
                  ? "terracotta"
                  : "moss"
              }
              size="sm"
              className="shadow-md ring-1.5 ring-white/80 font-extrabold uppercase tracking-wide"
            >
              {product.badge}
            </Badge>
          )}
          {hasDiscount && (
            <span className="bg-terracotta text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-md shadow-md ring-1.5 ring-white/80 tracking-tight">
              -{Math.round(((product.gia - (product.giaKhuyenMai || 0)) / product.gia) * 100)}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={isWishlisted ? "Bỏ yêu thích sản phẩm" : "Thêm vào danh sách yêu thích"}
          className={cn(
            "absolute top-2.5 right-2.5 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs border border-beige/60",
            isWishlisted
              ? "text-terracotta fill-terracotta bg-white"
              : "text-ink/50 hover:text-terracotta hover:bg-white hover:scale-105"
          )}
        >
          <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
        </button>

        {/* Khung ảnh nổi khối nhẹ, bo góc, tỷ lệ chuẩn và hiệu ứng hover (1.1, 1.2, 1.4) */}
        <Link
          href={getProductUrl(product)}
          className="relative w-full h-full rounded-xl overflow-hidden border border-black/5 bg-white flex items-center justify-center"
        >
          {product.hinhAnh?.nhan && !product.hinhAnh.nhan.includes("placeholder") ? (
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={product.hinhAnh.nhan}
                alt={product.tenMuiHuong}
                fill
                unoptimized
                loading="eager"
                className="object-cover object-center scale-100 group-hover:scale-103 transition-transform duration-300 ease-out"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
          ) : (
            /* Chai xịt thơm thủ công 30ml mô phỏng đồ họa tinh tế (Placeholder) */
            <div className="relative flex flex-col items-center">
              {/* Vòi phun sương đen nhám tinh giản */}
              <div className="w-5 h-3.5 bg-[#2B2B2B] rounded-t-[3px] relative shadow-xs">
                <div className="absolute -top-1 right-1 w-2 h-1 bg-[#4A4A4A] rounded-xs" />
              </div>

              {/* Vòng đệm kim loại mạ vàng đồng champagne */}
              <div className="w-6.5 h-2 bg-linear-to-r from-[#C29B38] via-[#E8D18C] to-[#B38B2E] shadow-xs" />

              {/* Thân chai thủy tinh mờ cao cấp */}
              <div
                className={cn(
                  "w-20 h-34 sm:h-36 rounded-t-md rounded-b-2xl border shadow-sm flex flex-col items-center justify-between p-2 relative overflow-hidden",
                  bottleStyle.bg,
                  bottleStyle.border
                )}
              >
                {/* Vệt sáng thủy tinh tự nhiên */}
                <div className="absolute left-1.5 top-0 bottom-0 w-2.5 bg-linear-to-r from-white/50 to-transparent blur-[0.5px]" />
                <div className="absolute right-1 top-0 bottom-0 w-1 bg-white/25 rounded-full" />

                {/* Nhãn dán giấy Kraft/Mỹ thuật cao cấp */}
                <div className="w-full bg-[#FCFAF7]/95 rounded-sm p-1.5 text-center shadow-xs border border-[#E8DFD1] z-1 mt-5">
                  <span className="text-[7px] font-sans font-bold uppercase tracking-widest text-moss block">
                    Mộc Hương
                  </span>
                  <span className="text-[9.5px] font-serif font-bold text-ink-dark block line-clamp-1 leading-tight mt-0.5">
                    {product.tenMuiHuong}
                  </span>
                  <span className="text-[7px] text-ink-muted block mt-0.5 font-medium">
                    {product.dungTich} · Tinh dầu
                  </span>
                </div>

                {/* Điểm nhấn lá mầm sinh thái */}
                <div className="w-1.5 h-1.5 rounded-full bg-moss/60 mb-2 z-1" />
              </div>
            </div>
          )}
        </Link>

        {/* Quick View Button on Hover */}
        <Link
          href={getProductUrl(product)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-10 hidden sm:flex items-center gap-1.5 bg-white/95 hover:bg-moss hover:text-white text-ink text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-sm border border-beige/70 backdrop-blur-xs"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Xem chi tiết</span>
        </Link>
      </div>

      {/* Product Information: Tách bạch khoảng cách và tăng trọng lượng thị giác (1.3) */}
      <div className="pt-3.5 sm:pt-4 px-1 sm:px-1.5 pb-1 flex-1 flex flex-col justify-between">
        <div>
          {/* Phân loại & Rating */}
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <span className="text-[11px] font-medium text-moss-dark tracking-wide">
              {product.dungTich} · Tự nhiên
            </span>
            <div className="flex items-center gap-1 text-[11px] text-ink-muted">
              <RatingStars rating={product.danhGiaSao} size="sm" showNumber={false} />
              <span className="font-semibold text-ink-dark text-[10px] sm:text-[11px]">
                {product.danhGiaSao.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Scent Title: Tăng font-size thêm 1 bậc, font-weight 700 bold, độ tương phản sắc nét (1.3) */}
          <Link href={getProductUrl(product)}>
            <h3 className="font-serif font-bold text-base sm:text-lg text-ink-dark group-hover:text-moss transition-colors line-clamp-1 leading-snug">
              {product.tenMuiHuong}
            </h3>
          </Link>

          {/* Emotional note */}
          <p className="text-xs sm:text-[13px] text-ink/80 line-clamp-1 mt-1 leading-relaxed">
            {product.moTaNgan}
          </p>

          {/* Combo details if combo view */}
          {product.laSetQuaTang && product.chaiTrongSet && (
            <div className="mt-2 pt-2 border-t border-beige/60 text-[11px] text-moss-dark font-medium line-clamp-1">
              ✓ Hộp quà tặng kèm {product.chaiTrongSet.length} chai 30ml
            </div>
          )}
        </div>

        {/* Price & Action Button */}
        <div className="mt-3 pt-2.5 border-t border-beige/60 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="font-bold text-sm sm:text-base text-terracotta leading-none">
              {formatCurrency(currentPrice)}
            </span>
            {hasDiscount && (
              <span className="text-[10px] sm:text-[11px] text-ink-muted/70 line-through mt-0.5">
                {formatCurrency(product.gia)}
              </span>
            )}
          </div>

          {/* Quick Add to Cart Button (Min 44x44px touch target on mobile via padding/height) */}
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={isAdded}
            aria-label={`Thêm ${product.tenMuiHuong} vào giỏ hàng`}
            className={cn(
              "min-h-[42px] px-3 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all duration-200 cursor-pointer border",
              isAdded
                ? "bg-moss-dark text-white border-moss-dark"
                : "bg-moss/10 hover:bg-moss-dark text-moss-dark hover:text-white border-moss/30 hover:border-moss-dark"
            )}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="text-xs">Đã thêm</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="text-xs">Thêm</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
