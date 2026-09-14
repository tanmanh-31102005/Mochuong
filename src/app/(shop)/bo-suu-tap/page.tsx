"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, Truck, ChevronRight, ArrowRight, Layers, Check } from "lucide-react";
import { COLLECTION_PRODUCTS, MOCK_PRODUCTS } from "@/features/products/data/mock-products";
import { CollectionCard } from "@/features/collections/components/CollectionCard";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { formatCurrency } from "@/shared/utils/format";

/**
 * TUYẾN ĐƯỜNG: /bo-suu-tap
 * Hiển thị Combo 3 chai tự chọn & 4 Bộ sưu tập trọn bộ theo dòng hương
 */
export default function CollectionsListingPage() {
  const comboOffer = MOCK_PRODUCTS.find((p) => p.id === "combo-3-chai-tu-chon");

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-ink/60 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-moss">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5 text-ink/40" />
          <span className="text-ink font-bold">Bộ sưu tập & Combo</span>
        </nav>

        {/* 1. FEATURED BANNER: COMBO 3 CHAI TỰ CHỌN */}
        <div className="bg-linear-to-br from-[#F5F2EB] via-white to-[#EBF3E8] p-8 sm:p-12 rounded-3xl border-2 border-moss/30 mb-12 shadow-soft relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="terracotta" size="md">
                  HOT OFFER · TIẾT KIỆM TỚI 15%
                </Badge>
                <span className="bg-moss text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                  Khách hàng tự chọn 3 chai 30ml
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-moss-dark">
                Combo 3 Chai Tự Chọn
              </h1>

              <p className="text-sm sm:text-base text-ink/80 leading-relaxed max-w-2xl">
                Tự do lựa chọn đúng 3 mùi hương yêu thích từ 18 sản phẩm tinh dầu xịt thơm phòng & vải Mộc Hương. Linh hoạt kết hợp thảo mộc thư thái, hương hoa dịu ngọt, trái cây sảng khoái hay ấm nồng cá tính.
              </p>

              <div className="flex flex-wrap items-baseline gap-4 pt-2">
                <span className="font-serif font-bold text-3xl sm:text-4xl text-terracotta">
                  129.000đ
                </span>
                <span className="text-sm sm:text-base text-ink/40 line-through">
                  135.000đ – 165.000đ
                </span>
                <span className="text-xs font-bold text-moss bg-moss/10 px-3 py-1 rounded-md">
                  Giá cố định chỉ 43.000đ/chai
                </span>
              </div>

              <div className="pt-3 flex flex-wrap gap-4">
                <Button variant="primary" size="lg" className="shadow-md">
                  <Link href="/bo-suu-tap/combo-3-chai-tu-chon" className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Tự chọn 3 chai ngay</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Visual 3 Chai Combo */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative flex items-center justify-center gap-2 sm:gap-3 p-6 bg-white/70 rounded-3xl border border-beige shadow-inner">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="flex flex-col items-center">
                    <div className="w-4 h-3 bg-[#2C2C2C] rounded-t-xs" />
                    <div className="w-5 h-1 bg-amber-500" />
                    <div className="w-12 h-24 bg-linear-to-b from-moss/20 to-moss/40 rounded-t-sm rounded-b-xl border border-moss/40 flex flex-col items-center justify-between p-1 shadow-sm">
                      <span className="text-[6px] font-extrabold text-moss">MỘC HƯƠNG</span>
                      <span className="text-[8px] font-bold text-moss-dark text-center">Chai #{num}</span>
                      <span className="text-[6px] font-bold text-ink/60">30ml</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2. SECTION: 4 BỘ SƯU TẬP CỐ ĐỊNH THEO DÒNG HƯƠNG */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
            <div>
              <span className="text-xs font-bold text-moss uppercase tracking-widest block mb-1">
                Trọn Bộ Chuyên Sâu
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-moss-dark">
                4 Bộ Sưu Tập Trọn Bộ Theo Dòng Hương
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-ink/70 max-w-md">
              Sở hữu đầy đủ các nốt hương của từng dòng với mức giá ưu đãi trọn bộ tiết kiệm hơn so với mua lẻ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
            {COLLECTION_PRODUCTS.map((collection) => (
              <CollectionCard key={collection.id} product={collection} />
            ))}
          </div>
        </div>

        {/* Khối Cam Kết & Lợi Ích Của Combo */}
        <div className="mt-16 bg-white rounded-3xl border border-beige p-8 sm:p-10 shadow-soft">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-moss uppercase tracking-widest block mb-1">
              Đặc Quyền Khách Hàng
            </span>
            <h2 className="font-serif text-2xl font-bold text-moss-dark">
              Lợi Ích Khi Mua Theo Bộ Sưu Tập
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-cream border border-beige space-y-2">
              <div className="w-12 h-12 rounded-full bg-moss/10 text-moss flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-ink">Tiết Kiệm Chi Phí Tối Đa</h3>
              <p className="text-xs text-ink/70">
                Giá ưu đãi trọn gói luôn tiết kiệm 11%–15% so với giá bán lẻ từng chai riêng biệt.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-cream border border-beige space-y-2">
              <div className="w-12 h-12 rounded-full bg-moss/10 text-moss flex items-center justify-center mx-auto">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-ink">Miễn Phí Giao Hàng Từ 300k</h3>
              <p className="text-xs text-ink/70">
                Mọi đơn hàng từ 300.000đ đều được hỗ trợ 100% chi phí vận chuyển toàn quốc.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-cream border border-beige space-y-2">
              <div className="w-12 h-12 rounded-full bg-moss/10 text-moss flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-ink">100% Thiên Nhiên Lành Tính</h3>
              <p className="text-xs text-ink/70">
                Tinh dầu thiên nhiên nguyên chất phối cùng cồn thực phẩm lên men từ mía đường, an toàn cho cả nhà.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
