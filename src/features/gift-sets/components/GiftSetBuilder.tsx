"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Check, Plus, X, Gift, ShoppingBag, Sparkles, Heart } from "lucide-react";
import { Product } from "@/features/products/types";
import { SINGLE_PRODUCTS } from "@/features/products/data/mock-products";
import { FRAGRANCE_LINE_TABS } from "@/core/constants/fragrance-lines";
import { formatCurrency } from "@/shared/utils/format";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { useCartStore } from "@/features/cart/store/cart-store";
import { cn } from "@/shared/utils/cn";

export interface GiftSetBuilderProps {
  giftSet: Product;
}

export const GiftSetBuilder: React.FC<GiftSetBuilderProps> = ({ giftSet }) => {
  const maxBottles = giftSet.requiredBottleCount || 2;
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [isAdded, setIsAdded] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const isComplete = selectedIds.length === maxBottles;

  const selectedProducts = useMemo(() => {
    return selectedIds
      .map((id) => SINGLE_PRODUCTS.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p));
  }, [selectedIds]);

  const filteredProducts = useMemo(() => {
    if (activeTab === "all") return SINGLE_PRODUCTS;
    return SINGLE_PRODUCTS.filter((p) => p.dongHuong === activeTab);
  }, [activeTab]);

  const handleToggleProduct = (product: Product) => {
    if (selectedIds.includes(product.id)) {
      setSelectedIds((prev) => prev.filter((id) => id !== product.id));
    } else {
      if (selectedIds.length >= maxBottles) return;
      setSelectedIds((prev) => [...prev, product.id]);
    }
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedIds((prev) => prev.filter((id) => id !== productId));
  };

  const handleAddToCart = () => {
    if (!isComplete) return;
    addItem(giftSet, 1, selectedIds);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* 1. Gift Set Hero Header */}
      <div className="bg-linear-to-br from-[#FAF7F2] via-white to-[#F9EFE9] p-6 sm:p-10 rounded-3xl border border-beige shadow-soft">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="terracotta" size="md">
              HỘP QUÀ TẶNG TỰ CHỌN
            </Badge>
            <span className="bg-moss text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
              Chọn {maxBottles} chai mùi hương tùy ý
            </span>
          </div>

          <h1 className="font-serif font-bold text-2xl sm:text-4xl text-moss-dark tracking-tight">
            {giftSet.tenMuiHuong}
          </h1>

          <p className="text-sm sm:text-base text-ink/80 mt-2 leading-relaxed">
            {giftSet.moTaNgan}
          </p>

          {/* Phụ kiện hộp quà kèm theo */}
          {giftSet.accessoriesIncluded && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs font-bold text-moss-dark flex items-center gap-1.5 mr-1">
                <Gift className="w-3.5 h-3.5 text-terracotta" /> Kèm theo:
              </span>
              {giftSet.accessoriesIncluded.map((acc, i) => (
                <span
                  key={i}
                  className="text-xs bg-white text-ink/80 border border-beige px-2.5 py-1 rounded-lg font-medium shadow-2xs"
                >
                  ✓ {acc}
                </span>
              ))}
            </div>
          )}

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-serif font-bold text-3xl sm:text-4xl text-terracotta">
              {formatCurrency(giftSet.giaKhuyenMai ?? giftSet.gia)}
            </span>
            {giftSet.giaKhuyenMai && giftSet.giaKhuyenMai < giftSet.gia && (
              <span className="text-sm text-ink/50 line-through">
                {formatCurrency(giftSet.gia)}
              </span>
            )}
            <span className="text-xs font-semibold text-moss bg-moss/10 px-2.5 py-1 rounded-md">
              Đã bao gồm hộp quà & đóng gói chỉn chu
            </span>
          </div>
        </div>
      </div>

      {/* 2. Sticky Selection Tray */}
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
                {isComplete ? `Đã chọn đủ ${maxBottles} chai!` : `Vui lòng chọn thêm ${maxBottles - selectedIds.length} chai nữa`}
              </h3>
              <p className="text-xs text-ink/60">
                {isComplete
                  ? "Sẵn sàng đóng gói set quà chỉn chu gửi đến người thương"
                  : `Chọn ${maxBottles} mùi hương từ 18 chai 30ml bên dưới`}
              </p>
            </div>
          </div>

          {/* Slots */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
            {Array.from({ length: maxBottles }).map((_, index) => {
              const product = selectedProducts[index];
              return (
                <div
                  key={index}
                  className={cn(
                    "relative w-32 sm:w-40 h-14 rounded-xl border flex items-center p-2 gap-2 transition-all",
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
                          {product.dongHuongLabel}
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

          {/* Action Button */}
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
                  <span>Đã thêm set quà</span>
                </>
              ) : isComplete ? (
                <>
                  <Gift className="w-4 h-4" />
                  <span>Thêm Set Quà ({formatCurrency(giftSet.giaKhuyenMai ?? giftSet.gia)})</span>
                </>
              ) : (
                <span>Chọn đủ {maxBottles} chai ({selectedIds.length}/{maxBottles})</span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* 3. Fragrance Line Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-moss-dark">
            Chọn mùi hương cho set quà
          </h2>
          <span className="text-xs text-ink/60 hidden sm:inline">
            18 mùi hương nguyên chất 30ml
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

              {/* Selection Action */}
              <div className="mt-4 pt-3 border-t border-beige/60 flex items-center justify-between">
                <span className="text-xs font-bold text-ink/60">Dung tích 30ml</span>
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
