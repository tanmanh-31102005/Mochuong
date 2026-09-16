"use client";

import React from "react";
import { Filter, RotateCcw } from "lucide-react";
import { FilterState, CongDung } from "../types";
import { formatCurrency } from "@/shared/utils/format";

export interface ProductFilterProps {
  filterState: FilterState;
  onFilterChange: (newState: FilterState) => void;
  onReset: () => void;
  className?: string;
  isMobileDrawer?: boolean;
  onCloseMobile?: () => void;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  filterState,
  onFilterChange,
  onReset,
  className,
  isMobileDrawer = false,
  onCloseMobile,
}) => {
  const congDungOptions: { value: CongDung; label: string }[] = [
    { value: "thu-gian", label: "Thư giãn, an dịu" },
    { value: "tuoi-mat", label: "Tươi mát, thanh lọc" },
    { value: "tinh-tao", label: "Tỉnh táo, tập trung" },
    { value: "am-ap", label: "Ấm áp, sang trọng" },
  ];

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filterState,
      maxPrice: Number(e.target.value),
    });
  };

  const handleCongDungToggle = (val: CongDung) => {
    const exists = filterState.congDung.includes(val);
    const updated = exists
      ? filterState.congDung.filter((c) => c !== val)
      : [...filterState.congDung, val];
    onFilterChange({ ...filterState, congDung: updated });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({
      ...filterState,
      minRating: filterState.minRating === rating ? 0 : rating,
    });
  };

  const activeFiltersCount =
    (filterState.maxPrice < 800000 ? 1 : 0) +
    filterState.congDung.length +
    (filterState.minRating > 0 ? 1 : 0);

  return (
    <div
      className={`bg-white rounded-2xl border border-[#E3DACB] p-5 sm:p-6 shadow-[0_8px_24px_rgba(74,74,74,0.05)] space-y-6 ${className || ""}`}
    >
      <div className="flex items-center justify-between pb-3.5 border-b border-beige/70">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-moss-dark" />
          <h3 className="font-serif font-bold text-base text-ink-dark">
            Bộ Lọc Sản Phẩm
          </h3>
          {activeFiltersCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-moss text-white text-[10px] font-bold flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-ink-muted hover:text-terracotta flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Đặt lại</span>
        </button>
      </div>

      {/* Lọc theo khoảng giá */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-moss-dark">
            Khoảng Giá Tối Đa
          </h4>
          <span className="font-bold text-xs text-terracotta">
            Dưới {formatCurrency(filterState.maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min={100000}
          max={800000}
          step={20000}
          value={filterState.maxPrice}
          onChange={handlePriceChange}
          aria-label="Lọc theo giá tối đa"
          className="w-full accent-moss cursor-pointer h-1.5 bg-beige rounded-lg"
        />
        <div className="flex justify-between text-[11px] text-ink-muted">
          <span>{formatCurrency(100000)}</span>
          <span>{formatCurrency(800000)}</span>
        </div>
      </div>

      {/* Lọc theo công dụng */}
      <div className="space-y-3 pt-3 border-t border-beige/70">
        <h4 className="text-xs font-bold uppercase tracking-wider text-moss-dark">
          Theo Công Dụng
        </h4>
        <div className="space-y-2">
          {congDungOptions.map((opt) => {
            const checked = filterState.congDung.includes(opt.value);
            return (
              <label
                key={opt.value}
                className="flex items-center gap-2.5 text-xs text-ink/85 cursor-pointer hover:text-moss-dark select-none py-0.5"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleCongDungToggle(opt.value)}
                  className="rounded-md border-beige text-moss focus:ring-moss/30 accent-moss w-4 h-4 cursor-pointer"
                />
                <span>{opt.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Lọc theo đánh giá sao */}
      <div className="space-y-3 pt-3 border-t border-beige/70">
        <h4 className="text-xs font-bold uppercase tracking-wider text-moss-dark">
          Đánh Giá Khách Hàng
        </h4>
        <div className="space-y-1.5">
          {[5, 4, 3].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleRatingChange(star)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                filterState.minRating === star
                  ? "bg-moss/10 text-moss-dark font-bold border border-moss/30"
                  : "text-ink/80 hover:bg-beige/50 border border-transparent"
              }`}
            >
              <span>Từ {star} sao trở lên</span>
              <span className="text-amber-500 text-xs">{"★".repeat(star)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Dung tích ghi chú */}
      <div className="pt-2 border-t border-beige/70 bg-cream/70 p-3 rounded-xl text-[11px] text-ink-muted leading-relaxed">
        <strong className="text-moss-dark block mb-0.5 font-bold">Dung tích đồng nhất:</strong>
        Tất cả xịt thơm Mộc Hương được đóng chai 30ml tiêu chuẩn bỏ túi tiện lợi.
      </div>

      {isMobileDrawer && onCloseMobile && (
        <button
          type="button"
          onClick={onCloseMobile}
          className="w-full py-3 bg-moss hover:bg-moss-dark text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          Xem kết quả
        </button>
      )}
    </div>
  );
};
