"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Gift, Package, HeartHandshake, Sparkles, ChevronRight, SlidersHorizontal } from "lucide-react";
import { GIFT_SET_PRODUCTS } from "@/features/products/data/mock-products";
import { GiftSetCard } from "@/features/gift-sets/components/GiftSetCard";
import { Badge } from "@/shared/components/ui/Badge";
import { cn } from "@/shared/utils/cn";

/**
 * TUYẾN ĐƯỜNG: /set-qua-tang
 * Hiển thị 4 Set Quà Tặng chính thức: 2 Set tự chọn (Mini 99k, Tinh Tế 189k) + 2 Set cố định (Thư Giãn Ngủ Ngon 169k, Tỉnh Táo 159k)
 */
export default function GiftSetsListingPage() {
  const [filterTab, setFilterTab] = useState<"all" | "custom" | "fixed">("all");

  const customSets = GIFT_SET_PRODUCTS.filter((p) => p.isConfigurable || p.productKind === "GIFT_SET_CUSTOM");
  const fixedSets = GIFT_SET_PRODUCTS.filter((p) => !p.isConfigurable && p.productKind !== "GIFT_SET_CUSTOM");

  const displayedSets =
    filterTab === "all"
      ? GIFT_SET_PRODUCTS
      : filterTab === "custom"
      ? customSets
      : fixedSets;

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-ink/70 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-moss-dark">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5 text-ink/40" />
          <span className="text-ink font-bold">Set quà tặng</span>
        </nav>

        {/* Banner đầu trang set quà tặng */}
        <div className="bg-white p-8 sm:p-11 rounded-2xl border border-[#E3DACB] mb-10 text-center relative overflow-hidden shadow-[0_10px_30px_rgba(74,74,74,0.05)]">
          <div className="max-w-2xl mx-auto space-y-3 z-1 relative">
            <Badge variant="terracotta" size="md">
              QUÀ TẶNG Ý NGHĨA
            </Badge>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-moss-dark">
              Set Quà Tặng Tinh Dầu Mộc Hương
            </h1>
            <p className="text-sm sm:text-base font-serif italic text-terracotta">
              &ldquo;Món quà tinh tế gói trọn ân tình gửi trao người thương quý&rdquo;
            </p>
            <p className="text-xs sm:text-sm text-ink/80 leading-relaxed font-normal">
              Trao gửi sự chăm sóc chu đáo qua từng set quà xịt thơm 30ml thiên nhiên. Tùy chọn set tự phối mùi theo sở thích người nhận hoặc các set chủ đề thiết kế sẵn chuẩn liệu pháp thư giãn.
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#E3DACB] overflow-x-auto gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFilterTab("all")}
              className={cn(
                "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer",
                filterTab === "all"
                  ? "bg-terracotta text-white shadow-xs"
                  : "bg-white text-ink/80 hover:bg-beige border border-[#E3DACB]"
              )}
            >
              Tất cả set quà (4)
            </button>
            <button
              type="button"
              onClick={() => setFilterTab("custom")}
              className={cn(
                "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer",
                filterTab === "custom"
                  ? "bg-terracotta text-white shadow-xs"
                  : "bg-white text-ink/80 hover:bg-beige border border-[#E3DACB]"
              )}
            >
              Set quà tự chọn mùi (2)
            </button>
            <button
              type="button"
              onClick={() => setFilterTab("fixed")}
              className={cn(
                "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer",
                filterTab === "fixed"
                  ? "bg-terracotta text-white shadow-xs"
                  : "bg-white text-ink/80 hover:bg-beige border border-[#E3DACB]"
              )}
            >
              Set chủ đề phối sẵn (2)
            </button>
          </div>

          <span className="text-xs text-ink-muted hidden sm:inline">
            Tất cả set quà đều được miễn phí thiệp viết tay
          </span>
        </div>

        {/* Lưới danh sách các set quà tặng */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
          {displayedSets.map((set) => (
            <GiftSetCard key={set.id} product={set} />
          ))}
        </div>

        {/* Khối Dịch Vụ Quà Tặng Doanh Nghiệp & Cá Nhân */}
        <div className="mt-16 bg-white rounded-2xl border border-[#E3DACB] p-8 sm:p-10 shadow-[0_10px_30px_rgba(74,74,74,0.05)]">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-terracotta uppercase tracking-widest block mb-1">
              Chỉn Chu Từng Chi Tiết
            </span>
            <h2 className="font-serif text-2xl font-bold text-moss-dark">
              Dịch Vụ Quà Tặng Từ Mộc Hương
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-xl bg-cream border border-[#E3DACB] space-y-2">
              <div className="w-12 h-12 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mx-auto">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-ink">Đóng Gói Thủ Công Chỉn Chu</h3>
              <p className="text-xs text-ink/80">
                Hộp quà dập nhũ vàng, thắt nơ ruy băng lụa sang trọng, sẵn sàng để bạn trao tay người nhận.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-cream border border-[#E3DACB] space-y-2">
              <div className="w-12 h-12 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mx-auto">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-ink">Viết Thiệp Tay Miễn Phí</h3>
              <p className="text-xs text-ink/80">
                Hỗ trợ viết thiệp tay mộc mạc theo từng lời chúc riêng mà bạn muốn nhắn gửi đến người nhận quà.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-cream border border-[#E3DACB] space-y-2">
              <div className="w-12 h-12 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-ink">Set Quà Doanh Nghiệp (B2B)</h3>
              <p className="text-xs text-ink/80">
                Nhận in ấn logo doanh nghiệp và thiết kế riêng cho đơn vị tri ân đối tác và nhân viên.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
