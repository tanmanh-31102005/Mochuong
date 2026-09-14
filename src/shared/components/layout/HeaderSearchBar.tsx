"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ChevronRight, Sparkles } from "lucide-react";
import { MOCK_PRODUCTS } from "@/features/products/data/mock-products";
import { Product, getProductUrl } from "@/features/products/types";

// Hàm chuẩn hóa tiếng Việt không dấu để tìm kiếm thông minh
function removeVietnameseTones(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

// Hàm format tiền tệ VNĐ
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
}

// Component làm nổi bật từ khóa tìm kiếm trong tên sản phẩm
function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <span>{text}</span>;

  const normalizedText = removeVietnameseTones(text);
  const normalizedQuery = removeVietnameseTones(query);
  const index = normalizedText.indexOf(normalizedQuery);

  if (index === -1) {
    return <span>{text}</span>;
  }

  const before = text.substring(0, index);
  const match = text.substring(index, index + query.length);
  const after = text.substring(index + query.length);

  return (
    <span>
      {before}
      <strong className="font-extrabold text-terracotta underline decoration-terracotta/40">
        {match}
      </strong>
      {after}
    </span>
  );
}

interface HeaderSearchBarProps {
  onItemSelect?: () => void;
  className?: string;
  placeholder?: string;
}

export const HeaderSearchBar: React.FC<HeaderSearchBarProps> = ({
  onItemSelect,
  className = "",
  placeholder = "Bạn đang tìm gì hôm nay? (Oải hương, Sả chanh, Xịt thơm...)",
}) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Lọc sản phẩm thời gian thực khi gõ chữ cái
  const searchResults = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return [];

    const normQuery = removeVietnameseTones(trimmed);
    const words = normQuery.split(/\s+/).filter(Boolean);

    return MOCK_PRODUCTS.filter((product) => {
      const normName = removeVietnameseTones(product.tenMuiHuong);
      const normDesc = removeVietnameseTones(product.moTaNgan);
      const normDetail = removeVietnameseTones(product.thanhPhanCongDung);
      const normNotes = (product.notHuong || [])
        .map((n) => removeVietnameseTones(n))
        .join(" ");

      const fullSearchContent = `${normName} ${normDesc} ${normDetail} ${normNotes}`;

      // Khớp nếu tất cả các từ trong query đều xuất hiện
      return words.every((w) => fullSearchContent.includes(w));
    }).slice(0, 8); // Giới hạn tối đa 8 kết quả nhanh nhất
  }, [query]);

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Xử lý gửi tìm kiếm
  const handleSubmitSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    if (selectedIndex >= 0 && searchResults[selectedIndex]) {
      const selected = searchResults[selectedIndex];
      router.push(getProductUrl(selected));
    } else {
      router.push(`/san-pham?search=${encodeURIComponent(query.trim())}`);
    }

    setIsOpen(false);
    if (onItemSelect) onItemSelect();
  };

  // Điều hướng phím mũi tên & Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || searchResults.length === 0) {
      if (e.key === "Enter") {
        handleSubmitSearch();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : searchResults.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSubmitSearch();
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Khung ô nhập tìm kiếm phong cách hiện đại Sasana */}
      <form onSubmit={handleSubmitSearch} className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          placeholder={placeholder}
          aria-label="Tìm kiếm sản phẩm Mộc Hương"
          className="w-full bg-white/95 text-ink text-xs sm:text-sm pl-4 sm:pl-5 pr-20 py-2 sm:py-2.5 rounded-full border border-beige hover:border-moss/40 focus:border-moss focus:outline-hidden focus:ring-2 focus:ring-moss/20 shadow-2xs transition-all placeholder:text-ink/50"
        />

        {/* Nút xóa nhanh & Nút Tìm kiếm */}
        <div className="absolute right-1.5 flex items-center gap-1">
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setIsOpen(false);
                inputRef.current?.focus();
              }}
              className="p-1 rounded-full text-ink/40 hover:text-ink hover:bg-beige/50 transition-colors"
              aria-label="Xóa từ khóa"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="submit"
            className="w-8 h-8 rounded-full bg-moss hover:bg-moss-dark text-white flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
            aria-label="Tìm kiếm"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* ========================================================================= */}
      {/* BẢNG GỢI Ý KẾT QUẢ TỰ ĐỘNG THEO TỪNG CHỮ CÁI (SASANA STYLE)                */}
      {/* ========================================================================= */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-beige overflow-hidden z-50 animate-fadeIn">
          {searchResults.length > 0 ? (
            <div>
              {/* Tiêu đề thanh gợi ý */}
              <div className="px-4 py-2 bg-[#f8f9f4] border-b border-beige/80 flex items-center justify-between text-[11px] text-ink/70 font-semibold">
                <span className="flex items-center gap-1.5 text-moss font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-terracotta" />
                  Gợi ý sản phẩm ({searchResults.length})
                </span>
                <span>Nhấn Enter để tìm</span>
              </div>

              {/* Danh sách sản phẩm gợi ý dạng scroll */}
              <div className="max-h-[380px] overflow-y-auto divide-y divide-beige/40">
                {searchResults.map((product, idx) => {
                  const isSelected = idx === selectedIndex;
                  const price = product.giaKhuyenMai ?? product.gia;
                  const hasDiscount = Boolean(product.giaKhuyenMai);

                  return (
                    <Link
                      key={product.id}
                      href={getProductUrl(product)}
                      onClick={() => {
                        setIsOpen(false);
                        if (onItemSelect) onItemSelect();
                      }}
                      className={`flex items-center gap-3.5 px-4 py-3 transition-colors ${
                        isSelected
                          ? "bg-moss/10"
                          : "hover:bg-[#fbfbf8]"
                      }`}
                    >
                      {/* Icon chai xịt thơm thu nhỏ theo dòng hương */}
                      <div className="w-11 h-11 rounded-xl bg-cream shrink-0 border border-beige flex items-center justify-center shadow-2xs">
                        <div className="flex flex-col items-center">
                          <div className="w-2.5 h-1 bg-[#2C2C2C] rounded-t-2xs" />
                          <div className="w-3.5 h-0.5 bg-[#D4AF37]" />
                          <div
                            className={`w-4 h-6 rounded-b-xs border flex items-center justify-center text-[7px] font-bold shadow-2xs ${
                              product.dongHuong.includes("hoa")
                                ? "bg-[#FDF2F4] border-[#F0D5DA] text-rose-700"
                                : product.dongHuong.includes("trai-cay")
                                ? "bg-[#FFF7ED] border-[#FED7AA] text-amber-700"
                                : product.dongHuong.includes("am-nong")
                                ? "bg-[#FAF5EE] border-[#E8DCC9] text-amber-900"
                                : "bg-[#F0FDF4] border-[#DCFCE7] text-emerald-800"
                            }`}
                          >
                            MH
                          </div>
                        </div>
                      </div>

                      {/* Thông tin tên mùi hương & mô tả ngắn */}
                      <div className="flex-1 min-w-0 text-left">
                        <div className="text-xs sm:text-sm font-bold text-ink truncate">
                          <HighlightMatch
                            text={product.tenMuiHuong}
                            query={query}
                          />
                        </div>
                        <p className="text-[11px] text-ink/65 truncate mt-0.5">
                          {product.moTaNgan}
                        </p>
                      </div>

                      {/* Giá bán nổi bật & badge dung tích */}
                      <div className="text-right shrink-0">
                        <div className="text-xs sm:text-sm font-bold text-terracotta">
                          {formatCurrency(price)}
                        </div>
                        {hasDiscount && (
                          <div className="text-[10px] text-ink/40 line-through">
                            {formatCurrency(product.gia)}
                          </div>
                        )}
                        <span className="inline-block mt-0.5 text-[9px] px-1.5 py-0.2 rounded-md bg-moss/10 text-moss font-semibold">
                          {product.dungTich}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Chân thanh gợi ý: Xem toàn bộ kết quả */}
              <button
                type="button"
                onClick={() => handleSubmitSearch()}
                className="w-full py-2.5 px-4 bg-[#f3f5ec] hover:bg-moss/15 text-moss-dark text-xs font-bold text-center border-t border-beige flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Xem tất cả kết quả cho &quot;{query.trim()}&quot;</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            /* Trạng thái không có kết quả */
            <div className="p-6 text-center text-xs text-ink/70 space-y-2">
              <p>
                Không tìm thấy sản phẩm nào khớp với{" "}
                <strong className="text-ink font-bold">&quot;{query}&quot;</strong>
              </p>
              <div className="pt-2 text-[11px] text-ink/60">
                Gợi ý tìm kiếm:{" "}
                <button
                  type="button"
                  onClick={() => setQuery("Oải Hương")}
                  className="text-moss hover:underline font-bold mr-2 cursor-pointer"
                >
                  Oải Hương
                </button>
                <button
                  type="button"
                  onClick={() => setQuery("Sả Chanh")}
                  className="text-moss hover:underline font-bold mr-2 cursor-pointer"
                >
                  Sả Chanh
                </button>
                <button
                  type="button"
                  onClick={() => setQuery("Bạc Hà")}
                  className="text-moss hover:underline font-bold mr-2 cursor-pointer"
                >
                  Bạc Hà
                </button>
                <button
                  type="button"
                  onClick={() => setQuery("Quà tặng")}
                  className="text-moss hover:underline font-bold cursor-pointer"
                >
                  Quà tặng
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
