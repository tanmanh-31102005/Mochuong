"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Sparkles } from "lucide-react";
import { useCartStore } from "../store/cart-store";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { formatCurrency } from "@/shared/utils/format";
import { Button } from "@/shared/components/ui/Button";
import { Product } from "@/features/products/types";

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeItem,
    getSubtotal,
    getTotalItems,
  } = useCartStore();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Khóa scroll body khi Drawer mở
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const totalItems = getTotalItems();
  const subtotal = getSubtotal();

  const getProductUrl = (product: Product) => {
    if (product.productType === "COLLECTION" || product.id.startsWith("combo-")) {
      return `/bo-suu-tap/${product.slug}`;
    }
    if (product.productType === "GIFT_SET" || product.laSetQuaTang) {
      return `/set-qua-tang/${product.slug}`;
    }
    return `/san-pham/${product.slug}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        className="relative w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-modal="true"
        aria-label="Giỏ hàng của bạn"
      >
        {/* Header */}
        <div className="p-5 border-b border-beige bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-moss" />
            <h3 className="font-serif font-bold text-lg text-moss-dark">
              Giỏ hàng của bạn
            </h3>
            <span className="bg-moss/10 text-moss text-xs font-bold px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-cream text-ink/70 hover:text-ink transition-colors"
            aria-label="Đóng giỏ hàng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center text-moss/50 mb-2">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-base text-ink">Giỏ hàng đang trống</h4>
                <p className="text-xs text-ink/60 mt-1 max-w-xs">
                  Hãy khám phá 4 dòng hương tự nhiên để chọn cho mình mùi hương yêu thích nhé!
                </p>
              </div>
              <Button
                variant="primary"
                size="md"
                onClick={() => setIsOpen(false)}
              >
                <Link href="/san-pham">Khám phá sản phẩm</Link>
              </Button>
            </div>
          ) : (
            items.map((item, index) => {
              if (!item || !item.product) return null;
              const currentPrice = item.product.giaKhuyenMai ?? item.product.gia;
              const itemKey = item.id || `${item.product.id || "cart-item"}-${index}`;

              return (
                <div
                  key={itemKey}
                  className="bg-white p-3.5 rounded-2xl border border-beige flex gap-3 shadow-xs"
                >
                  {/* Image Bottle representation */}
                  <div className="relative w-16 h-20 bg-[#FAF7F2] rounded-xl overflow-hidden shrink-0 border border-beige flex items-center justify-center">
                    <div className="w-8 h-14 bg-linear-to-b from-moss/20 to-moss/40 rounded-t-sm rounded-b-md border border-moss/40 flex flex-col items-center justify-center p-1">
                      <div className="w-3 h-2 bg-ink/70 rounded-xs mb-1" />
                      <span className="text-[7px] font-bold text-moss-dark text-center leading-tight line-clamp-2">
                        {item.product.tenMuiHuong.slice(0, 10)}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          href={getProductUrl(item.product)}
                          onClick={() => setIsOpen(false)}
                          className="font-bold text-xs text-ink hover:text-moss line-clamp-1"
                        >
                          {item.product.tenMuiHuong}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id || itemKey)}
                          className="text-ink/40 hover:text-red-500 p-1 transition-colors"
                          aria-label="Xóa sản phẩm"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-[11px] text-ink/50 block">
                        {item.selectedProducts && item.selectedProducts.length > 0
                          ? `${item.selectedProducts.length} chai × 30ml`
                          : `Dung tích: ${item.product.dungTich}`}
                      </span>

                      {/* Hiển thị các chai đã chọn trong combo/gift set */}
                      {item.selectedProducts && item.selectedProducts.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {item.selectedProducts.map((sp, idx) => (
                            <span
                              key={`${itemKey}-sp-${sp?.id || idx}-${idx}`}
                              className="text-[9px] bg-moss/10 text-moss font-bold px-1.5 py-0.5 rounded-sm"
                            >
                              ✓ {sp?.tenMuiHuong || "Mùi hương"}
                            </span>
                          ))}
                        </div>
                      )}

                      <span className="text-xs font-bold text-terracotta block mt-0.5">
                        {formatCurrency(currentPrice)}
                      </span>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-beige/40">
                      <div className="flex items-center border border-beige rounded-lg overflow-hidden bg-cream">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id || itemKey, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-ink/70 hover:bg-beige text-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id || itemKey, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-ink/70 hover:bg-beige text-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-ink/80">
                        {formatCurrency(currentPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer with Subtotal & CTA */}
        {items.length > 0 && (
          <div className="p-5 border-t border-beige bg-white space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-ink/70">Tạm tính:</span>
              <span className="font-serif font-bold text-lg text-moss-dark">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <p className="text-[11px] text-ink/50">
              Phí vận chuyển và mã giảm giá sẽ được tính ở trang thanh toán.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                href="/gio-hang"
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                <Button variant="outline" size="md" fullWidth>
                  Xem giỏ hàng
                </Button>
              </Link>
              <Link
                href={isAuthenticated ? "/thanh-toan" : "/dang-nhap?returnUrl=/thanh-toan"}
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                <Button variant="primary" size="md" fullWidth>
                  <span>Thanh toán</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
