"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Check, Sparkles, ArrowRight, Eye, Layers } from "lucide-react";
import { Product } from "@/features/products/types";
import { SINGLE_PRODUCTS } from "@/features/products/data/mock-products";
import { formatCurrency } from "@/shared/utils/format";
import { Badge } from "@/shared/components/ui/Badge";
import { RatingStars } from "@/shared/components/ui/RatingStars";
import { useCartStore } from "@/features/cart/store/cart-store";
import { cn } from "@/shared/utils/cn";

export interface CollectionCardProps {
  product: Product;
  className?: string;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
  product,
  className,
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const collectionPrice = product.giaKhuyenMai ?? product.gia;
  const singleRetailPrice = product.giaLeGoc ?? product.giaLeCongDon ?? product.gia;
  const savingsAmount = product.soTienTietKiem ?? (singleRetailPrice - collectionPrice);
  const statedSavingsPercent = Number.parseInt(product.tietKiem?.match(/\d+/)?.[0] ?? "", 10);
  const savingsPercent = product.phanTramTietKiem ?? (
    Number.isNaN(statedSavingsPercent)
      ? Math.round((savingsAmount / singleRetailPrice) * 100)
      : statedSavingsPercent
  );
  const bottleCount = product.includedItems?.length || product.soChai || 3;

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
        "group relative bg-white rounded-2xl border border-[#E3DACB] hover:border-moss/45 hover:shadow-[0_14px_34px_rgba(74,74,74,0.09)] transition-all duration-300 flex flex-col justify-between overflow-hidden",
        className
      )}
    >
      {/* Visual Header */}
      <div className="relative w-full pt-[75%] bg-linear-to-b from-[#F7F4EE] to-[#FAF7F2] overflow-hidden flex items-center justify-center p-6 border-b border-beige/60">
        {/* Badges */}
        <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1.5 items-start">
          <Badge variant="terracotta" size="sm">
            TIẾT KIỆM {savingsPercent}%
          </Badge>
          <span className="bg-moss text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
            Trọn bộ {bottleCount} chai 30ml
          </span>
        </div>

        {/* Visual Multi-Bottle Layout or Real Image */}
        <Link
          href={`/bo-suu-tap/${product.slug}`}
          className="absolute inset-0 flex items-center justify-center gap-1.5 sm:gap-2 group-hover:scale-105 transition-transform duration-500"
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
            <div className="grid grid-cols-3 w-full h-full">
              {SINGLE_PRODUCTS.slice(0, 3).map((preview) => (
                <div key={preview.id} className="relative h-full overflow-hidden border-r border-white/70 last:border-r-0">
                  <Image
                    src={preview.hinhAnh.nhan}
                    alt={preview.tenMuiHuong}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 33vw, 17vw"
                    loading="eager"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          )}
        </Link>

        {/* Quick View Link */}
        <Link
          href={`/bo-suu-tap/${product.slug}`}
          className="absolute bottom-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-10 hidden sm:flex items-center gap-1.5 bg-white/95 hover:bg-moss hover:text-white text-ink text-xs font-bold px-3 py-1.5 rounded-full shadow-md"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Xem trọn bộ</span>
        </Link>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-bold text-moss uppercase tracking-wider">
              {product.dongHuongLabel || "Bộ sưu tập"}
            </span>
            <RatingStars rating={product.danhGiaSao} size="sm" showNumber={false} />
          </div>

          <Link href={`/bo-suu-tap/${product.slug}`}>
            <h3 className="font-serif font-bold text-base sm:text-lg text-moss-dark hover:text-moss transition-colors line-clamp-1">
              {product.tenMuiHuong}
            </h3>
          </Link>

          <p className="text-xs text-ink/80 line-clamp-2 mt-1 leading-relaxed">
            {product.moTaNgan}
          </p>

          {/* Included Bottles List */}
          {product.includedItems && (
            <div className="mt-3.5 pt-3 border-t border-beige/60">
              <span className="text-[11px] font-bold text-ink/80 block mb-1.5">
                Các chai trong bộ ({product.includedItems.length} chai 30ml):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.includedItems.map((item, i) => (
                  <span
                    key={i}
                    className="text-[11px] bg-beige/60 text-ink/80 px-2 py-0.5 rounded-md font-medium"
                  >
                    ✓ {item.scentName}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Link mua lẻ từng chai */}
          {product.includedItems && (
            <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px]">
              <span className="text-ink/70">Mua lẻ từng chai:</span>
              {product.includedItems.map((item, i) => (
                <Link
                  key={i}
                  href={`/san-pham/${item.slug}`}
                  className="text-moss-dark font-semibold hover:underline"
                >
                  {item.scentName}
                  {i < (product.includedItems?.length ?? 0) - 1 ? "," : ""}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Price & Action Section */}
        <div className="mt-5 pt-3.5 border-t border-beige/60 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif font-bold text-lg sm:text-xl text-terracotta">
                {formatCurrency(collectionPrice)}
              </span>
              <span className="text-xs text-ink/50 line-through">
                {formatCurrency(singleRetailPrice)}
              </span>
            </div>
            <span className="text-[11px] text-moss-dark font-bold block">
              Tiết kiệm {formatCurrency(savingsAmount)} (-{savingsPercent}%)
            </span>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={isAdded}
            className={cn(
              "h-10 px-4 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all duration-200 cursor-pointer shadow-xs",
              isAdded
                ? "bg-moss text-white"
                : "bg-moss/10 hover:bg-moss hover:text-white text-moss"
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
                <span>Thêm trọn bộ</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
