"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, Plus, X, Sparkles, ShoppingBag, ArrowRight, ShieldCheck, Heart } from "lucide-react";
import { Product } from "@/features/products/types";
import { SINGLE_PRODUCTS, MOCK_PRODUCTS } from "@/features/products/data/mock-products";
import { FRAGRANCE_LINE_TABS } from "@/core/constants/fragrance-lines";
import { formatCurrency } from "@/shared/utils/format";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { useCartStore } from "@/features/cart/store/cart-store";
import { cn } from "@/shared/utils/cn";

export interface ComboBuilderProps {
  comboOffer?: Product;
}

export const ComboBuilder: React.FC<ComboBuilderProps> = ({
  comboOffer = MOCK_PRODUCTS.find((p) => p.id === "combo-3-chai-tu-chon") || MOCK_PRODUCTS[0],
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [isAdded, setIsAdded] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  const maxBottles = comboOffer.requiredBottleCount || 3;
  const isComplete = selectedIds.length === maxBottles;

  const selectedProducts = useMemo(() => {
    return selectedIds
      .map((id) => SINGLE_PRODUCTS.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p));
  }, [selectedIds]);

  // Lọc sản phẩm theo tab
  const filteredProducts = useMemo(() => {
    if (activeTab === "all") return SINGLE_PRODUCTS;
    return SINGLE_PRODUCTS.filter((p) => p.dongHuong === activeTab);
  }, [activeTab]);

  // Tính tổng giá gốc của các chai đã chọn
  const originalSinglesSum = useMemo(() => {
    return selectedProducts.reduce((sum, p) => sum + p.gia, 0);
  }, [selectedProducts]);

  const handleToggleProduct = (product: Product) => {
    if (selectedIds.includes(product.id)) {
      setSelectedIds((prev) => prev.filter((id) => id !== product.id));
    } else {
      if (selectedIds.length >= maxBottles) {
        return; // Đã đủ 3 chai
      }
      setSelectedIds((prev) => [...prev, product.id]);
    }
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedIds((prev) => prev.filter((id) => id !== productId));
  };

  const handleAddToCart = () => {
    if (!isComplete) return;
    addItem(comboOffer, 1, selectedIds);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* 1. Combo Hero Header */}
      <div className="bg-linear-to-br from-[#FAF7F2] via-white to-[#F0F5EC] p-6 sm:p-10 rounded-3xl border border-beige shadow-soft">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="terracotta" size="md">
              TIẾT KIỆM TỚI 15%
            </Badge>
            <span className="bg-moss text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
              Chọn đúng 3 chai 30ml
            </span>
          </div>

          <h1 className="font-serif font-bold text-2xl sm:text-4xl text-moss-dark tracking-tight">
            Combo 3 Chai Tự Chọn
          </h1>

          <p className="text-sm sm:text-base text-ink/80 mt-2 leading-relaxed">
            Tự do phối 3 mùi hương bất kỳ từ 18 sản phẩm tinh dầu xịt phòng & thơm quần áo Mộc Hương (30ml/chai). Thỏa sức sáng tạo không gian hương thơm cho từng góc nhỏ trong ngôi nhà bạn.
          </p>

          <div className="mt-5 flex flex-wrap items-baseline gap-3">
            <span className="font-serif font-bold text-3xl sm:text-4xl text-terracotta">
              {formatCurrency(comboOffer.giaKhuyenMai ?? 129000)}
            </span>
            <span className="text-sm sm:text-base text-ink/50 line-through">
              135.000đ – 165.000đ
            </span>
            <span className="text-xs font-semibold text-moss bg-moss/10 px-2.5 py-1 rounded-md">
              Giá lẻ tiết kiệm tối đa 15%
            </span>
          </div>
        </div>
      </div>

      {/* 2. Sticky Selection Tray (Thanh 3 chai đang chọn) */}
      <div className="sticky top-20 z-20 bg-white/95 backdrop-blur-md p-4 sm:p-6 rounded-2xl border-2 border-moss/30 shadow-lg transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center font-serif font-bold text-lg",
              isComplete ? "bg-moss text-white" : "bg-moss/10 text-moss"
            )}>
              {selectedIds.length}/{maxBottles}
            </div>
            <div>
              <h3 className="font-bold text-sm text-moss-dark">
                {isComplete ? "Đã chọn đủ 3 chai!" : `Vui lòng chọn thêm ${maxBottles - selectedIds.length} chai nữa`}
              </h3>
              <p className="text-xs text-ink/60">
                {isComplete
                  ? `Tổng giá lẻ tham khảo: ${formatCurrency(originalSinglesSum)} → Giá combo: 129.000đ`
                  : "Nhấp vào sản phẩm bên dưới để thêm vào combo của bạn"}
              </p>
            </div>
          </div>

          {/* 3 Slots */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
            {Array.from({ length: maxBottles }).map((_, index) => {
              const product = selectedProducts[index];
              return (
                <div
                  key={index}
                  className={cn(
                    "relative w-28 sm:w-36 h-14 rounded-xl border flex items-center p-2 gap-2 transition-all",
                    product
                      ? "border-moss bg-moss/5 shadow-xs"
                      : "border-dashed border-ink/20 bg-cream/30"
                  )}
                >
                  {product ? (
                    <>
                      <div className="relative w-8 h-10 bg-moss/10 rounded-md shrink-0 overflow-hidden flex items-center justify-center border border-moss/20">
                        {product.hinhAnh?.nhan && !product.hinhAnh.nhan.includes("placeholder") ? (
                          <Image
                            src={product.hinhAnh.nhan}
                            alt={product.tenMuiHuong}
                            fill
                            className="object-contain p-0.5"
                            sizes="32px"
                          />
                        ) : (
                          <span className="text-[10px] font-bold text-moss">30ml</span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-xs font-bold text-ink truncate block">
                          {product.tenMuiHuong}
                        </span>
                        <span className="text-[10px] text-ink/60 block">
                          {formatCurrency(product.gia)}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveProduct(product.id)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-terracotta text-white rounded-full flex items-center justify-center hover:bg-terracotta/90 transition-colors shadow-xs"
                        aria-label="Bỏ chọn"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </>
                  ) : (
                    <div className="w-full text-center">
                      <span className="text-[11px] text-ink/40 font-medium block">
                        Chai {index + 1} trống
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action CTA */}
          <div className="shrink-0">
            <Button
              variant="primary"
              size="lg"
              onClick={handleAddToCart}
              disabled={!isComplete || isAdded}
              className={cn(
                "w-full md:w-auto font-bold shadow-md",
                !isComplete && "opacity-50 cursor-not-allowed hover:bg-moss"
              )}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Đã thêm vào giỏ</span>
                </>
              ) : isComplete ? (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Thêm Combo (129.000đ)</span>
                </>
              ) : (
                <span>Chọn đủ 3 chai ({selectedIds.length}/3)</span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* 3. Fragrance Line Tabs (4 Dòng hương + Tất cả) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-moss-dark">
            Danh sách 18 mùi hương nguyên chất (30ml)
          </h2>
          <span className="text-xs text-ink/60 hidden sm:inline">
            Được chọn nhiều mùi cùng dòng hương, không chọn trùng 1 chai
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={cn(
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer",
              activeTab === "all"
                ? "bg-moss text-white shadow-xs"
                : "bg-white text-ink/70 hover:bg-beige border border-beige"
            )}
          >
            Tất cả (18 chai)
          </button>

          {FRAGRANCE_LINE_TABS.map((line) => {
            const count = SINGLE_PRODUCTS.filter((p) => p.dongHuong === line.id).length;
            return (
              <button
                key={line.id}
                type="button"
                onClick={() => setActiveTab(line.id)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5",
                  activeTab === line.id
                    ? "bg-moss text-white shadow-xs"
                    : "bg-white text-ink/70 hover:bg-beige border border-beige"
                )}
              >
                <span>{line.name}</span>
                <span className={cn(
                  "text-[10px] px-1.5 py-0.2 rounded-full",
                  activeTab === line.id ? "bg-white/20 text-white" : "bg-beige text-ink/60"
                )}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Product Grid (4 Cột Desktop / 2 Cột Mobile) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredProducts.map((product) => {
          const isSelected = selectedIds.includes(product.id);
          const isDisabled = !isSelected && selectedIds.length >= maxBottles;

          return (
            <div
              key={product.id}
              onClick={() => !isDisabled && handleToggleProduct(product)}
              className={cn(
                "group relative bg-white rounded-2xl border p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 cursor-pointer select-none",
                isSelected
                  ? "border-moss ring-2 ring-moss/30 bg-moss/3 shadow-md"
                  : isDisabled
                  ? "opacity-50 border-beige cursor-not-allowed"
                  : "border-beige hover:border-moss/40 hover:shadow-soft"
              )}
            >
              {/* Checkbox Indicator */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-moss uppercase tracking-wider">
                  {product.dongHuongLabel}
                </span>
                <div
                  className={cn(
                    "w-5 h-5 rounded-md flex items-center justify-center transition-all",
                    isSelected
                      ? "bg-moss text-white"
                      : "border border-ink/30 bg-white"
                  )}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>

              {/* Visual Bottle Representation */}
              <div className="aspect-square bg-linear-to-b from-[#FAF7F2] to-[#F2EFE9] rounded-xl flex items-center justify-center p-3 mb-3 border border-beige/60 group-hover:scale-102 transition-transform relative overflow-hidden">
                {product.hinhAnh?.nhan && !product.hinhAnh.nhan.includes("placeholder") ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={product.hinhAnh.nhan}
                      alt={product.tenMuiHuong}
                      fill
                      className="object-contain drop-shadow-sm p-2"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-3.5 h-2.5 bg-[#2C2C2C] rounded-t-xs" />
                    <div className="w-5 h-1 bg-amber-500" />
                    <div className="w-12 h-20 bg-linear-to-b from-moss/20 to-moss/40 rounded-t-sm rounded-b-lg border border-moss/40 flex flex-col items-center justify-between p-1 shadow-sm">
                      <span className="text-[6px] font-extrabold text-moss uppercase">Mộc Hương</span>
                      <span className="text-[8px] font-bold text-moss-dark text-center leading-tight line-clamp-2">
                        {product.tenMuiHuong}
                      </span>
                      <span className="text-[6px] font-bold text-ink/60">30ml</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-sm sm:text-base text-moss-dark line-clamp-1">
                  {product.tenMuiHuong}
                </h3>
                <p className="text-[11px] text-moss font-semibold line-clamp-1">
                  {product.noteHuong}
                </p>
                <p className="text-xs text-ink/60 line-clamp-2 leading-relaxed">
                  {product.congDungChinh}
                </p>
              </div>

              {/* Price & Selection Action */}
              <div className="mt-4 pt-3 border-t border-beige/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-ink/50 block">Giá lẻ 1 chai</span>
                  <span className="font-serif font-bold text-sm sm:text-base text-ink">
                    {formatCurrency(product.gia)}
                  </span>
                </div>

                <button
                  type="button"
                  disabled={isDisabled}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                    isSelected
                      ? "bg-moss text-white"
                      : isDisabled
                      ? "bg-beige/50 text-ink/30 cursor-not-allowed"
                      : "bg-moss/10 text-moss hover:bg-moss hover:text-white"
                  )}
                >
                  {isSelected ? "Đã chọn" : "Chọn chai"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
