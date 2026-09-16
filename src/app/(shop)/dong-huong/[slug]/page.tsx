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
import { ArrowUpDown, ChevronRight, SlidersHorizontal, X } from "lucide-react";

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
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [filterState, setFilterState] = useState<FilterState>({
    dongHuong: [lineInfo.id as any],
    minPrice: 0,
    maxPrice: 800000,
    congDung: [],
    minRating: 0,
    searchQuery: "",
  });
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const resetFilters = () =>
    setFilterState({
      dongHuong: [lineInfo.id as any],
      minPrice: 0,
      maxPrice: 800000,
      congDung: [],
      minRating: 0,
      searchQuery: "",
    });

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
        <nav className="text-xs text-ink/70 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-moss-dark">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5 text-ink/40" />
          <Link href="/san-pham" className="hover:text-moss-dark">Sản phẩm</Link>
          <ChevronRight className="w-3.5 h-3.5 text-ink/40" />
          <span className="text-ink font-bold">{lineInfo.title}</span>
        </nav>

        {/* Banner đầu trang dòng hương */}
        <div
          className={`bg-linear-to-r ${lineInfo.bgGradient} p-8 sm:p-11 rounded-2xl border border-[#E3DACB] mb-10 text-center relative overflow-hidden shadow-[0_10px_30px_rgba(74,74,74,0.05)]`}
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
          <div className="hidden lg:block lg:col-span-1 sticky top-24">
            <ProductFilter
              filterState={filterState}
              onFilterChange={setFilterState}
              onReset={resetFilters}
            />
          </div>

          <div className="lg:col-span-3 space-y-6">
            {/* Toolbar */}
            <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-[#E3DACB] flex items-center justify-between gap-3 shadow-[0_6px_18px_rgba(74,74,74,0.04)]">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-cream border border-[#E3DACB] text-xs font-bold text-ink"
              >
                <SlidersHorizontal className="w-4 h-4 text-moss-dark" />
                Bộ lọc
              </button>

              <span className="text-xs text-ink/70 hidden sm:inline">
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
              <div className="bg-white rounded-2xl border border-[#E3DACB] p-12 text-center">
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

        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <button
              type="button"
              aria-label="Đóng bộ lọc"
              className="fixed inset-0 bg-black/40 backdrop-blur-xs"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <div className="relative ml-auto w-full max-w-sm h-full bg-white shadow-2xl flex flex-col z-10">
              <div className="p-4 border-b border-[#E3DACB] flex items-center justify-between">
                <span className="font-serif font-bold text-base text-ink-dark">Bộ lọc sản phẩm</span>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  aria-label="Đóng bộ lọc"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-ink hover:bg-beige/50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 overflow-y-auto flex-1">
                <ProductFilter
                  filterState={filterState}
                  onFilterChange={setFilterState}
                  onReset={resetFilters}
                  isMobileDrawer
                  onCloseMobile={() => setIsMobileFilterOpen(false)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
