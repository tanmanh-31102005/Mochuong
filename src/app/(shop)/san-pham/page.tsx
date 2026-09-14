"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MOCK_PRODUCTS } from "@/features/products/data/mock-products";
import { ProductCard } from "@/features/products/components/ProductCard";
import { ProductFilter } from "@/features/products/components/ProductFilter";
import { FilterState, SortOption, ProductType } from "@/features/products/types";
import { ArrowUpDown, Sparkles, Gift, Package, Layers } from "lucide-react";
import { formatCurrency } from "@/shared/utils/format";

export default function AllProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center font-serif text-moss font-bold">
          Đang tải bộ sưu tập sản phẩm Mộc Hương...
        </div>
      }
    >
      <AllProductsContent />
    </Suspense>
  );
}

function AllProductsContent() {
  const searchParams = useSearchParams();
  const searchInitial = searchParams.get("search") || "";

  const [activeTab, setActiveTab] = useState<"ALL" | ProductType>("ALL");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [filterState, setFilterState] = useState<FilterState>({
    dongHuong: [],
    minPrice: 0,
    maxPrice: 800000,
    congDung: [],
    minRating: 0,
    searchQuery: searchInitial,
  });

  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      // Tab filter
      if (activeTab !== "ALL" && product.productType !== activeTab) {
        return false;
      }

      // Dòng hương filter
      if (
        filterState.dongHuong.length > 0 &&
        !filterState.dongHuong.some((dh) => product.dongHuong.includes(dh))
      ) {
        return false;
      }

      // Giá filter
      const price = product.giaKhuyenMai ?? product.gia;
      if (price > filterState.maxPrice) return false;

      // Công dụng filter
      if (
        filterState.congDung.length > 0 &&
        (!product.congDung ||
          !filterState.congDung.some((c) => product.congDung?.includes(c)))
      ) {
        return false;
      }

      // Đánh giá sao filter
      if (filterState.minRating > 0 && product.danhGiaSao < filterState.minRating) {
        return false;
      }

      // Tìm kiếm từ khóa
      if (filterState.searchQuery) {
        const q = filterState.searchQuery.toLowerCase();
        const matchName = product.tenMuiHuong.toLowerCase().includes(q);
        const matchDesc = product.moTaNgan.toLowerCase().includes(q);
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
      return 0; // Default / newest
    });
  }, [filterState, sortBy, activeTab]);

  const handleResetFilter = () => {
    setFilterState({
      dongHuong: [],
      minPrice: 0,
      maxPrice: 800000,
      congDung: [],
      minRating: 0,
      searchQuery: "",
    });
  };

  const activeFiltersCount =
    (filterState.maxPrice < 800000 ? 1 : 0) +
    filterState.congDung.length +
    (filterState.minRating > 0 ? 1 : 0);

  const singleCount = MOCK_PRODUCTS.filter((p) => p.productType === "SINGLE").length;
  const collectionCount = MOCK_PRODUCTS.filter((p) => p.productType === "COLLECTION").length;
  const giftSetCount = MOCK_PRODUCTS.filter((p) => p.productType === "GIFT_SET").length;

  return (
    <div className="py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner đầu trang */}
        <div className="bg-linear-to-r from-[#EBF2E5] via-cream to-[#FDF3E5] p-6 sm:p-10 rounded-2xl border border-beige mb-8 text-center shadow-xs">
          <span className="text-xs font-bold text-moss uppercase tracking-widest block mb-2">
            Bộ Sưu Tập Toàn Diện
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-moss-dark mb-3">
            Tất Cả Sản Phẩm Mộc Hương
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted max-w-xl mx-auto leading-relaxed">
            Khám phá 16+ nốt hương xịt thơm 30ml nguyên chất từ thiên nhiên, combo bộ sưu tập và set quà tặng chỉn chu.
          </p>

          {/* Type Switcher Tabs */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center p-1 bg-white rounded-xl border border-beige/80 shadow-xs gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("ALL")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "ALL"
                  ? "bg-moss text-white shadow-xs"
                  : "text-ink/70 hover:text-ink hover:bg-cream"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Tất cả ({MOCK_PRODUCTS.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("SINGLE")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "SINGLE"
                  ? "bg-moss text-white shadow-xs"
                  : "text-ink/70 hover:text-ink hover:bg-cream"
              }`}
            >
              <span>Chai lẻ 30ml ({singleCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("COLLECTION")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "COLLECTION"
                  ? "bg-moss text-white shadow-xs"
                  : "text-ink/70 hover:text-ink hover:bg-cream"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bộ sưu tập ({collectionCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("GIFT_SET")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "GIFT_SET"
                  ? "bg-moss text-white shadow-xs"
                  : "text-ink/70 hover:text-ink hover:bg-cream"
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Set quà tặng ({giftSetCount})</span>
            </button>
          </div>
        </div>

        {/* Layout: Desktop Sidebar Filter + Grid Products */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Sidebar Trái (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-1 sticky top-24">
            <ProductFilter
              filterState={filterState}
              onFilterChange={setFilterState}
              onReset={handleResetFilter}
            />
          </div>

          {/* Cột Phải: Toolbar & Grid Sản Phẩm */}
          <div className="lg:col-span-3 space-y-5">
            {/* Toolbar: Bộ lọc mobile toggle + Sắp xếp */}
            <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-beige/80 flex items-center justify-between gap-3 shadow-xs">
              {/* Mobile Filter Trigger */}
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-lg bg-cream border border-beige text-xs font-bold text-ink hover:border-moss transition-colors cursor-pointer"
              >
                <span>Bộ lọc</span>
                {activeFiltersCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-moss text-white text-[10px] font-bold flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <span className="text-xs text-ink-muted hidden sm:inline">
                Hiển thị <strong className="text-ink-dark">{filteredProducts.length}</strong> sản phẩm
              </span>

              <div className="flex items-center gap-2 ml-auto">
                <span className="text-xs text-ink-muted hidden sm:inline">Sắp xếp:</span>
                <div className="flex items-center gap-1.5 bg-cream border border-beige rounded-lg px-2.5 py-1.5 text-xs text-ink">
                  <ArrowUpDown className="w-3.5 h-3.5 text-moss shrink-0" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    aria-label="Sắp xếp sản phẩm"
                    className="bg-transparent text-xs text-ink font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="newest">Mới nhất</option>
                    <option value="best-seller">Bán chạy nhất</option>
                    <option value="price-asc">Giá: Thấp → Cao</option>
                    <option value="price-desc">Giá: Cao → Thấp</option>
                    <option value="name-az">Tên: A → Z</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mobile Active Filter Chips */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-1 lg:hidden">
                <span className="text-xs text-ink-muted">Đang lọc:</span>
                {filterState.maxPrice < 800000 && (
                  <span className="text-[11px] bg-beige/80 px-2 py-0.5 rounded-md text-ink font-medium">
                    &le; {formatCurrency(filterState.maxPrice)}
                  </span>
                )}
                {filterState.congDung.map((cd) => (
                  <span key={cd} className="text-[11px] bg-moss/10 text-moss px-2 py-0.5 rounded-md font-medium">
                    {cd}
                  </span>
                ))}
                {filterState.minRating > 0 && (
                  <span className="text-[11px] bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md font-medium">
                    &ge; {filterState.minRating}★
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleResetFilter}
                  className="text-xs text-terracotta underline font-semibold cursor-pointer ml-1"
                >
                  Xóa lọc
                </button>
              </div>
            )}

            {/* Grid Sản Phẩm */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-beige/80 p-10 text-center space-y-3">
                <p className="font-serif font-bold text-base sm:text-lg text-ink-dark">
                  Không tìm thấy sản phẩm nào phù hợp với bộ lọc.
                </p>
                <p className="text-xs text-ink-muted">
                  Hãy thử điều chỉnh khoảng giá hoặc bỏ bớt tiêu chí lọc.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilter}
                  className="mt-2 text-xs font-bold text-terracotta underline cursor-pointer"
                >
                  Đặt lại toàn bộ bộ lọc
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-7">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isComboView={product.laSetQuaTang}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative ml-auto w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-slideInRight">
            <div className="p-4 border-b border-beige flex items-center justify-between">
              <span className="font-serif font-bold text-base text-ink-dark">Bộ Lọc Sản Phẩm</span>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                aria-label="Đóng bộ lọc"
                className="w-8 h-8 rounded-full flex items-center justify-center text-ink hover:bg-beige/50 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              <ProductFilter
                filterState={filterState}
                onFilterChange={setFilterState}
                onReset={handleResetFilter}
                isMobileDrawer={true}
                onCloseMobile={() => setIsMobileFilterOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
