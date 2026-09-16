"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ShieldCheck, Truck, ChevronRight, ArrowRight } from "lucide-react";
import { COLLECTION_PRODUCTS, MOCK_PRODUCTS } from "@/features/products/data/mock-products";
import { CollectionCard } from "@/features/collections/components/CollectionCard";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";

/**
 * TUYẾN ĐƯỜNG: /bo-suu-tap
 * Hiển thị Combo 3 chai tự chọn & 4 Bộ sưu tập trọn bộ theo dòng hương
 */
export default function CollectionsListingPage() {
  const comboPreviewProducts = MOCK_PRODUCTS.filter((p) => p.productType === "SINGLE").slice(0, 3);

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-ink/70 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-moss-dark">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5 text-ink/40" />
          <span className="text-ink font-bold">Bộ sưu tập & Combo</span>
        </nav>

        {/* 1. FEATURED BANNER: COMBO 3 CHAI TỰ CHỌN */}
        <div className="bg-white p-8 sm:p-11 rounded-2xl border border-[#D7DDC8] mb-12 shadow-[0_10px_30px_rgba(74,74,74,0.05)] relative overflow-hidden">
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
                <span className="text-xs font-bold text-moss-dark bg-moss/10 px-3 py-1 rounded-md">
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
              <div className="relative grid grid-cols-3 w-full max-w-sm aspect-[4/3] bg-cream rounded-2xl border border-[#E3DACB] overflow-hidden shadow-sm">
                {comboPreviewProducts.map((preview) => (
                  <div key={preview.id} className="relative overflow-hidden border-r border-white/70 last:border-r-0">
                    <Image
                      src={preview.hinhAnh.nhan}
                      alt={preview.tenMuiHuong}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 33vw, 12vw"
                      priority
                      unoptimized
                    />
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
              <span className="text-xs font-bold text-moss-dark uppercase tracking-widest block mb-1">
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
        <div className="mt-16 bg-white rounded-2xl border border-[#E3DACB] p-8 sm:p-10 shadow-[0_10px_30px_rgba(74,74,74,0.05)]">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-moss uppercase tracking-widest block mb-1">
              Đặc Quyền Khách Hàng
            </span>
            <h2 className="font-serif text-2xl font-bold text-moss-dark">
              Lợi Ích Khi Mua Theo Bộ Sưu Tập
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-xl bg-cream border border-[#E3DACB] space-y-2">
              <div className="w-12 h-12 rounded-full bg-moss/10 text-moss flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-ink">Tiết Kiệm Chi Phí Tối Đa</h3>
              <p className="text-xs text-ink/80">
                Giá ưu đãi trọn gói luôn tiết kiệm 11%–15% so với giá bán lẻ từng chai riêng biệt.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-cream border border-[#E3DACB] space-y-2">
              <div className="w-12 h-12 rounded-full bg-moss/10 text-moss flex items-center justify-center mx-auto">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-ink">Miễn Phí Giao Hàng Từ 300k</h3>
              <p className="text-xs text-ink/80">
                Mọi đơn hàng từ 300.000đ đều được hỗ trợ 100% chi phí vận chuyển toàn quốc.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-cream border border-[#E3DACB] space-y-2">
              <div className="w-12 h-12 rounded-full bg-moss/10 text-moss flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-ink">100% Thiên Nhiên Lành Tính</h3>
              <p className="text-xs text-ink/80">
                Tinh dầu thiên nhiên nguyên chất phối cùng cồn thực phẩm lên men từ mía đường, an toàn cho cả nhà.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
