"use client";

import React, { useState, useMemo, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FRAGRANCE_LINES,
  FragranceLineInfo,
} from "@/core/constants/fragrance-lines";
import { MOCK_PRODUCTS } from "@/features/products/data/mock-products";
import { ProductCard } from "@/features/products/components/ProductCard";
import { ProductFilter } from "@/features/products/components/ProductFilter";
import { Badge } from "@/shared/components/ui/Badge";
import { FilterState, SortOption } from "@/features/products/types";
import { ArrowUpDown, ChevronRight } from "lucide-react";

/**
 * TUYẾN ĐƯỜNG: /dong-huong/[slug]
 * CHUYÊN BIỆT: Listing sản phẩm theo từng dòng hương
 * (thao-moc-thanh-loc, hoa-diu-nhe, trai-cay-tuoi-mat, am-nong-ca-tinh)
 */
export default function FragranceLineListingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const lineInfo = FRAGRANCE_LINES[slug];

  if (!lineInfo) {
    notFound();
  }

  return <FragranceLineView lineInfo={lineInfo} />;
}

function FragranceLineView({ lineInfo }: { lineInfo: FragranceLineInfo }) {
  const [filterState, setFilterState] = useState<FilterState>({
    dongHuong: [lineInfo.id as any],
    minPrice: 0,
    maxPrice: 800000,
    congDung: [],
    minRating: 0,
    searchQuery: "",
  });
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const lineProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) => {
      // Lọc các sản phẩm có thuộc dòng hương này
      const isInLine = p.dongHuong.includes(lineInfo.id as any);
      if (!isInLine) return false;

      const price = p.giaKhuyenMai ?? p.gia;
      if (price > filterState.maxPrice) return false;

      if (
        filterState.congDung.length > 0 &&
        (!p.congDung ||
          !filterState.congDung.some((c) => p.congDung?.includes(c)))
      ) {
        return false;
      }

      if (filterState.minRating > 0 && p.danhGiaSao < filterState.minRating) {
        return false;
      }

      if (filterState.searchQuery) {
        const q = filterState.searchQuery.toLowerCase();
        const matchName = p.tenMuiHuong.toLowerCase().includes(q);
        const matchDesc = p.moTaNgan.toLowerCase().includes(q);
        if (!matchName && !matchDesc) return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.giaKhuyenMai ?? a.gia;
      const priceB = b.giaKhuyenMai ?? b.gia;
      if (sortBy === "price-asc") return priceA - priceB;
      if (sortBy === "price-desc") return priceB - priceA;
      if (sortBy === "best-seller") return b.soLuongDanhGia - a.soLuongDanhGia;
      if (sortBy === "name-az") return a.tenMuiHuong.localeCompare(b.tenMuiHuong);
      return 0;
    });
  }, [lineInfo, filterState, sortBy]);

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-ink/60 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-moss">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5 text-ink/40" />
          <Link href="/san-pham" className="hover:text-moss">Sản phẩm</Link>
          <ChevronRight className="w-3.5 h-3.5 text-ink/40" />
          <span className="text-ink font-bold">{lineInfo.title}</span>
        </nav>

        {/* Banner đầu trang dòng hương */}
        <div
          className={`bg-linear-to-r ${lineInfo.bgGradient} p-8 sm:p-12 rounded-3xl border border-beige mb-10 text-center relative overflow-hidden shadow-soft`}
        >
          <div className="max-w-2xl mx-auto space-y-3 z-1 relative">
            <Badge variant="moss" size="md">
              {lineInfo.badge}
            </Badge>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-moss-dark">
              {lineInfo.title}
            </h1>
            <p className="text-sm sm:text-base font-serif italic text-terracotta">
              &ldquo;{lineInfo.subtitle}&rdquo;
            </p>
            <p className="text-xs sm:text-sm text-ink/80 leading-relaxed font-normal">
              {lineInfo.description}
            </p>
            <div className="pt-1">
              <span className="text-xs font-bold text-moss-dark bg-white/80 px-3 py-1 rounded-full border border-beige inline-block">
                Tâm trạng khơi gợi: {lineInfo.mood}
              </span>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar Lọc + Lưới sản phẩm */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <div className="lg:col-span-1">
            <ProductFilter
              filterState={filterState}
              onFilterChange={setFilterState}
              onReset={() =>
                setFilterState({
                  dongHuong: [lineInfo.id as any],
                  minPrice: 0,
                  maxPrice: 800000,
                  congDung: [],
                  minRating: 0,
                  searchQuery: "",
                })
              }
            />
          </div>

          <div className="lg:col-span-3 space-y-6">
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-beige flex flex-col sm:flex-row items-center justify-between gap-4 shadow-soft">
              <span className="text-xs text-ink/70">
                Hiển thị <strong>{lineProducts.length}</strong> sản phẩm trong dòng {lineInfo.title}
              </span>

              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-moss shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-cream border border-beige rounded-xl px-3 py-1.5 text-xs text-ink font-semibold focus:outline-none focus:border-moss cursor-pointer"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="best-seller">Bán chạy nhất</option>
                  <option value="price-asc">Giá: Thấp đến cao</option>
                  <option value="price-desc">Giá: Cao đến thấp</option>
                  <option value="name-az">Tên: A - Z</option>
                </select>
              </div>
            </div>

            {/* Lưới sản phẩm */}
            {lineProducts.length === 0 ? (
              <div className="bg-white rounded-3xl border border-beige p-12 text-center">
                <p className="font-serif font-bold text-lg text-ink">
                  Không tìm thấy sản phẩm nào trong dòng hương này theo tiêu chí lọc.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-7">
                {lineProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    isComboView={p.laSetQuaTang}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
