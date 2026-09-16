"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Gift, ShoppingBag, Check, Eye, Sparkles, ArrowRight } from "lucide-react";
import { Product } from "@/features/products/types";
import { formatCurrency } from "@/shared/utils/format";
import { Badge } from "@/shared/components/ui/Badge";
import { RatingStars } from "@/shared/components/ui/RatingStars";
import { useCartStore } from "@/features/cart/store/cart-store";
import { cn } from "@/shared/utils/cn";

export interface GiftSetCardProps {
  product: Product;
  className?: string;
}

export const GiftSetCard: React.FC<GiftSetCardProps> = ({
  product,
  className,
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const currentPrice = product.giaKhuyenMai ?? product.gia;
  const hasDiscount = product.giaKhuyenMai && product.giaKhuyenMai < product.gia;
  const bottleCount = product.includedItems?.length || product.requiredBottleCount || 3;
  const isCustom = product.isConfigurable || product.productKind === "GIFT_SET_CUSTOM";

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div
      className={cn(
        "group relative bg-white rounded-2xl border border-[#E3DACB] overflow-hidden hover:border-terracotta/45 hover:shadow-[0_14px_34px_rgba(74,74,74,0.09)] transition-all duration-300 flex flex-col justify-between",
        className
      )}
    >
      {/* Visual Gift Box Top */}
      <div className="relative w-full pt-[75%] bg-linear-to-b from-[#FAF4EB] via-[#FFF9F2] to-[#FAF7F2] overflow-hidden flex items-center justify-center p-6 border-b border-beige/60">
        <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1.5 items-start">
          <Badge variant="terracotta" size="sm">
            {isCustom ? "TỰ CHỌN MÙI HƯƠNG" : "SET CỐ ĐỊNH CHỦ ĐỀ"}
          </Badge>
          <span className="bg-[#63493A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
            <Gift className="w-3 h-3" />
            Set {bottleCount} chai 30ml
          </span>
        </div>

        {/* Visual Gift Box Presentation */}
        <Link
          href={`/set-qua-tang/${product.slug}`}
          className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-500"
        >
          {product.hinhAnh?.nhan && !product.hinhAnh.nhan.includes("placeholder") ? (
            <Image
              src={product.hinhAnh.nhan}
              alt={product.tenMuiHuong}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
              loading="eager"
              unoptimized
            />
          ) : (
            <div className="relative w-44 h-32 bg-[#EFE4D6] rounded-2xl border-2 border-[#D8C2AA] shadow-lg flex flex-col items-center justify-center p-3">
              <div className="absolute top-0 bottom-0 w-4 bg-[#A63C38] left-1/2 -translate-x-1/2 shadow-xs" />
              <div className="absolute left-0 right-0 h-4 bg-[#A63C38] top-1/2 -translate-y-1/2 shadow-xs" />
              <div className="w-7 h-7 rounded-full bg-[#8C2C28] text-white flex items-center justify-center z-1 shadow-md text-[9px] font-serif font-bold">
                MH
              </div>
              <div className="absolute bottom-2 right-2 bg-white/95 px-2 py-0.5 rounded-md text-[8px] font-bold text-ink border border-beige shadow-xs z-1">
                {bottleCount} Chai 30ml
              </div>
            </div>
          )}
        </Link>

        {/* Quick View Button */}
        <Link
          href={`/set-qua-tang/${product.slug}`}
          className="absolute bottom-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-10 hidden sm:flex items-center gap-1.5 bg-white/95 hover:bg-terracotta hover:text-white text-ink text-xs font-bold px-3 py-1.5 rounded-full shadow-md"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{isCustom ? "Tự chọn mùi" : "Xem chi tiết"}</span>
        </Link>
      </div>

      {/* Info Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-bold text-terracotta uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Set Quà Tặng
            </span>
            <RatingStars rating={product.danhGiaSao} size="sm" showNumber={false} />
          </div>

          <Link href={`/set-qua-tang/${product.slug}`}>
            <h3 className="font-serif font-bold text-base sm:text-lg text-moss-dark hover:text-terracotta transition-colors line-clamp-1">
              {product.tenMuiHuong}
            </h3>
          </Link>

          <p className="text-xs text-ink/80 line-clamp-2 mt-1.5 leading-relaxed">
            {product.moTaNgan}
          </p>

          {/* Included Accessories */}
          {product.accessoriesIncluded && (
            <div className="mt-3 pt-3 border-t border-beige/60">
              <span className="text-[11px] font-bold text-ink/80 block mb-1">
                Kèm theo phụ kiện:
              </span>
              <div className="flex flex-wrap gap-1">
                {product.accessoriesIncluded.map((item, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-[#FAF4EB] text-terracotta border border-[#F0E0CA] px-2 py-0.5 rounded-md font-medium"
                  >
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Fixed bottles list if fixed */}
          {!isCustom && product.includedItems && (
            <div className="mt-2.5">
              <span className="text-[11px] font-bold text-moss-dark block mb-1">
                3 Mùi hương có sẵn:
              </span>
              <div className="flex flex-wrap gap-1">
                {product.includedItems.map((item, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-moss/10 text-moss px-2 py-0.5 rounded-md font-medium"
                  >
                    • {item.scentName}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Price & Action Button */}
        <div className="mt-5 pt-3.5 border-t border-beige/60 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif font-bold text-lg sm:text-xl text-terracotta">
                {formatCurrency(currentPrice)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-ink/40 line-through">
                  {formatCurrency(product.gia)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-moss-dark font-semibold block">
              Bao gồm trọn gói hộp & phụ kiện
            </span>
          </div>

          {isCustom ? (
            <Link
              href={`/set-qua-tang/${product.slug}`}
              className="h-9 px-3.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all duration-200 bg-terracotta hover:bg-terracotta/90 text-white shadow-xs"
            >
              <span>Chọn {bottleCount} mùi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleQuickAdd}
              disabled={isAdded}
              className={cn(
                "h-9 px-3.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all duration-200 cursor-pointer shadow-xs",
                isAdded
                  ? "bg-moss text-white"
                  : "bg-terracotta/10 hover:bg-terracotta hover:text-white text-terracotta"
              )}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Đã thêm</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Thêm set quà</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
