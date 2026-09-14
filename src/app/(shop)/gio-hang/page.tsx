"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Ticket,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/features/cart/store/cart-store";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { AuthPromptModal } from "@/features/auth/components/AuthPromptModal";
import { formatCurrency } from "@/shared/utils/format";
import { Button } from "@/shared/components/ui/Button";
import { MOCK_PRODUCTS } from "@/features/products/data/mock-products";
import { getProductUrl } from "@/features/products/types";

export default function CartPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    getSubtotal,
    getDiscountAmount,
    getFinalShippingFee,
    getFinalTotal,
    voucherCode,
    applyVoucher,
    removeVoucher,
    freeShippingThreshold,
    addItem,
  } = useCartStore();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [inputVoucher, setInputVoucher] = useState("");
  const [voucherMessage, setVoucherMessage] = useState<{
    success: boolean;
    text: string;
  } | null>(null);

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getFinalShippingFee();
  const total = getFinalTotal();

  const progressPercent = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );
  const remainingForFreeShip = Math.max(0, freeShippingThreshold - subtotal);

  // Cross-sell items (chai xịt thơm chưa có trong giỏ để đủ bộ 3)
  const crossSellProducts = MOCK_PRODUCTS.filter(
    (p) => !p.laSetQuaTang && !items.some((item) => item.product.id === p.id)
  ).slice(0, 3);

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVoucher) return;
    const res = applyVoucher(inputVoucher);
    setVoucherMessage({ success: res.success, text: res.message });
  };

  if (!isMounted) {
    return (
      <div className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse space-y-6">
          <div className="h-8 w-48 bg-beige/60 rounded-xl" />
          <div className="h-64 bg-white rounded-3xl border border-beige" />
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header trang */}
        <div className="flex items-center justify-between pb-6 border-b border-beige mb-8">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-moss-dark">
              Giỏ Hàng Của Bạn
            </h1>
            <p className="text-xs sm:text-sm text-ink/60 mt-1">
              Đang có <strong>{items.length}</strong> loại sản phẩm trong giỏ hàng
            </p>
          </div>
          {items.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="text-xs text-ink/50 hover:text-red-500 transition-colors cursor-pointer"
            >
              Xóa toàn bộ giỏ
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl border border-beige p-12 text-center max-w-md mx-auto space-y-4 shadow-soft">
            <div className="w-16 h-16 rounded-full bg-cream mx-auto flex items-center justify-center text-moss">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-serif font-bold text-xl text-ink">
              Giỏ hàng của bạn đang trống
            </h2>
            <p className="text-xs text-ink/60 leading-relaxed">
              Hãy chọn cho mình và gia đình những nốt hương xịt thơm thảo mộc tự nhiên an lành nhé.
            </p>
            <div className="pt-2">
              <Link href="/san-pham">
                <Button variant="primary" size="md">
                  Khám phá sản phẩm ngay
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cột Trái: Danh Sách Sản Phẩm */}
            <div className="lg:col-span-8 space-y-6">
              {/* Thanh tiến trình Freeship */}
              <div className="bg-[#FAF4EB] p-4 rounded-2xl border border-[#F0E0CA]">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="flex items-center gap-1.5 text-ink/80 font-medium">
                    <Sparkles className="w-4 h-4 text-terracotta" />
                    {remainingForFreeShip > 0 ? (
                      <>
                        Mua thêm{" "}
                        <strong className="text-terracotta">
                          {formatCurrency(remainingForFreeShip)}
                        </strong>{" "}
                        để nhận <strong>Miễn phí vận chuyển</strong>
                      </>
                    ) : (
                      <strong className="text-moss">
                        Tuyệt vời! Đơn hàng của bạn đã đủ điều kiện FREESHIP toàn quốc
                      </strong>
                    )}
                  </span>
                  <span className="font-bold text-moss">{progressPercent}%</span>
                </div>
                <div className="w-full bg-white h-2.5 rounded-full overflow-hidden border border-beige/60">
                  <div
                    className="bg-moss h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Danh Sách Items */}
              <div className="bg-white rounded-3xl border border-beige p-6 shadow-soft divide-y divide-beige">
                {items.map((item, index) => {
                  if (!item || !item.product) return null;
                  const currentPrice =
                    item.product.giaKhuyenMai ?? item.product.gia;
                  const itemKey = item.id || `${item.product.id || "item"}-${index}`;

                  return (
                    <div
                      key={itemKey}
                      className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        {/* Placeholder chai visual */}
                        <div className="w-16 h-20 bg-[#FAF7F2] rounded-xl border border-beige flex items-center justify-center shrink-0">
                          <div className="w-8 h-14 bg-linear-to-b from-moss/20 to-moss/40 rounded-t-sm rounded-b-md border border-moss/40 flex flex-col items-center justify-center p-1">
                            <div className="w-3 h-2 bg-ink/70 rounded-xs mb-1" />
                            <span className="text-[7px] font-bold text-moss-dark text-center leading-tight">
                              {item.product.tenMuiHuong.slice(0, 8)}
                            </span>
                          </div>
                        </div>

                        <div>
                          <Link
                            href={getProductUrl(item.product)}
                            className="font-serif font-bold text-sm sm:text-base text-moss-dark hover:text-moss"
                          >
                            {item.product.tenMuiHuong}
                          </Link>
                          <p className="text-xs text-ink/50 mt-0.5">
                            {item.selectedProducts && item.selectedProducts.length > 0
                              ? `${item.selectedProducts.length} chai × 30ml`
                              : `Dung tích: ${item.product.dungTich}`} · Tinh dầu thiên nhiên
                          </p>

                          {/* Danh sách chai đã chọn cho combo / set quà */}
                          {item.selectedProducts && item.selectedProducts.length > 0 && (
                            <div className="mt-1 flex flex-wrap gap-1">
                              <span className="text-[11px] text-ink/60 font-medium">Chai đã chọn:</span>
                              {item.selectedProducts.map((sp, idx) => (
                                <span
                                  key={`${itemKey}-sp-${sp?.id || idx}-${idx}`}
                                  className="text-[10px] bg-moss/10 text-moss font-bold px-1.5 py-0.5 rounded"
                                >
                                  ✓ {sp?.tenMuiHuong || "Mùi hương"}
                                </span>
                              ))}
                            </div>
                          )}

                          <span className="text-xs font-bold text-terracotta mt-1 block">
                            {formatCurrency(currentPrice)}
                          </span>
                        </div>
                      </div>

                      {/* Bộ chọn số lượng & Thành tiền */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-beige/40">
                        <div className="flex items-center border border-beige rounded-xl overflow-hidden bg-cream">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id || itemKey, item.quantity - 1)
                            }
                            className="w-8 h-8 flex items-center justify-center text-ink/70 hover:bg-beige"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-10 text-center text-xs font-bold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id || itemKey, item.quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center text-ink/70 hover:bg-beige"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="font-bold text-sm text-ink min-w-[100px] text-right">
                          {formatCurrency(currentPrice * item.quantity)}
                        </span>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id || itemKey)}
                          className="text-ink/40 hover:text-red-500 p-1.5 transition-colors cursor-pointer"
                          aria-label="Xóa sản phẩm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Gợi ý: Thêm 1 chai để đủ bộ 3 (Cross-sell) */}
              {crossSellProducts.length > 0 && (
                <div className="bg-white rounded-3xl border border-beige p-6 shadow-soft space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-terracotta" />
                    <h3 className="font-serif font-bold text-sm sm:text-base text-moss-dark">
                      Gợi Ý: Thêm 1 Chai Để Đủ Bộ 3 Hương Thơm Toàn Diện
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {crossSellProducts.map((cp) => (
                      <div
                        key={cp.id}
                        className="p-3.5 rounded-2xl border border-beige bg-cream/50 flex flex-col justify-between space-y-2"
                      >
                        <div>
                          <span className="text-[10px] font-bold text-moss uppercase tracking-wider block">
                            {cp.dungTich}
                          </span>
                          <h4 className="font-bold text-xs text-ink line-clamp-1 mt-0.5">
                            {cp.tenMuiHuong}
                          </h4>
                          <span className="text-xs font-bold text-terracotta block mt-1">
                            {formatCurrency(cp.giaKhuyenMai ?? cp.gia)}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          fullWidth
                          onClick={() => addItem(cp, 1)}
                        >
                          + Thêm vào giỏ
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Cột Phải: Tổng Kết & Voucher */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl border border-beige p-6 shadow-soft space-y-5">
                <h3 className="font-serif font-bold text-lg text-moss-dark pb-3 border-b border-beige">
                  Tóm Tắt Đơn Hàng
                </h3>

                {/* Nhập mã Voucher */}
                <form onSubmit={handleApplyVoucher} className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-moss-dark block">
                    Mã Giảm Giá / Voucher
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputVoucher}
                      onChange={(e) => setInputVoucher(e.target.value)}
                      placeholder="VD: MOCHUONG10, FREESHIP"
                      className="flex-1 uppercase bg-cream border border-beige rounded-xl px-3 py-2 text-xs font-bold text-ink focus:outline-none focus:border-moss"
                    />
                    <Button type="submit" variant="secondary" size="sm">
                      Áp dụng
                    </Button>
                  </div>
                  {voucherMessage && (
                    <p
                      className={`text-xs font-medium flex items-center gap-1 ${
                        voucherMessage.success ? "text-moss" : "text-red-500"
                      }`}
                    >
                      {voucherMessage.success ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5" />
                      )}
                      <span>{voucherMessage.text}</span>
                    </p>
                  )}
                  {voucherCode && (
                    <div className="flex items-center justify-between text-xs bg-moss/10 text-moss px-3 py-1.5 rounded-xl mt-1 font-bold">
                      <span>Đang dùng mã: {voucherCode}</span>
                      <button
                        type="button"
                        onClick={removeVoucher}
                        className="text-ink/50 hover:text-red-500"
                      >
                        Gỡ bỏ
                      </button>
                    </div>
                  )}
                </form>

                {/* Chi tiết chi phí */}
                <div className="space-y-3 pt-3 border-t border-beige text-xs text-ink/80">
                  <div className="flex justify-between">
                    <span>Tạm tính tiền hàng:</span>
                    <span className="font-bold text-ink">{formatCurrency(subtotal)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-terracotta font-bold">
                      <span>Giảm giá voucher:</span>
                      <span>-{formatCurrency(discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span>
                      {shipping === 0 ? (
                        <strong className="text-moss">Miễn phí</strong>
                      ) : (
                        formatCurrency(shipping)
                      )}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-beige flex justify-between items-baseline">
                    <span className="text-sm font-bold text-moss-dark">Tổng thanh toán:</span>
                    <span className="font-serif font-bold text-2xl text-terracotta">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>

                {/* Nút Tiến Hành Thanh Toán */}
                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={() => {
                      if (!isAuthenticated) {
                        setIsAuthModalOpen(true);
                      } else {
                        router.push("/thanh-toan");
                      }
                    }}
                  >
                    <span>Tiến hành thanh toán</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>

                <div className="p-3 bg-cream rounded-xl text-[11px] text-ink/60 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-moss shrink-0" />
                  <span>Bảo mật thông tin thanh toán 100% qua chuẩn SSL.</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Auth Prompt Modal khi khách chưa đăng nhập bấm Thanh toán */}
      <AuthPromptModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        returnUrl="/thanh-toan"
      />
    </div>
  );
}
