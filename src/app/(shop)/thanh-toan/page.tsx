"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Truck,
  CreditCard,
  Banknote,
  QrCode,
  ArrowRight,
  ShoppingBag,
  Mail,
  Calendar,
  Clock,
  Sparkles,
} from "lucide-react";
import { useCartStore } from "@/features/cart/store/cart-store";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { AuthGuard } from "@/features/auth/components/AuthGuard";
import { formatCurrency } from "@/shared/utils/format";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { PRODUCT_SHARED_CONFIG } from "@/core/config/product-shared.config";
import { SITE_CONFIG } from "@/core/config/site.config";

function CheckoutContent() {
  const {
    items,
    getSubtotal,
    getDiscountAmount,
    getFinalShippingFee,
    hasGiftSet,
    getHandwrittenCardFee,
    getDeliveryScheduleFee,
    getAddonTotalFee,
    getFinalTotal,
    handwrittenCard,
    setHandwrittenCard,
    deliverySchedule,
    setDeliverySchedule,
    clearCart,
  } = useCartStore();

  const user = useAuthStore((state) => state.user);

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
    address: user?.address || "",
    city: "Hồ Chí Minh",
    notes: "",
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.name || "",
        phone: prev.phone || user.phone || "",
        email: prev.email || user.email || "",
        address: prev.address || user.address || "",
      }));
    }
  }, [user]);

  const [shippingMethod, setShippingMethod] = useState<"standard" | "express" | "store">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bank" | "vnpay" | "momo" | "card">("cod");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderCode, setOrderCode] = useState("");

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = shippingMethod === "store" ? 0 : shippingMethod === "express" ? 45000 : getFinalShippingFee();
  
  const cardFee = getHandwrittenCardFee();
  const deliveryFee = getDeliveryScheduleFee();
  const addonTotal = cardFee + deliveryFee;
  const isGiftSetInCart = hasGiftSet();

  const total = Math.max(0, subtotal - discount + shipping + addonTotal);

  const todayStr = new Date().toISOString().split("T")[0];

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert("Vui lòng điền đầy đủ thông tin nhận hàng!");
      return;
    }

    const code = "MH-" + Math.floor(100000 + Math.random() * 900000);
    setOrderCode(code);
    setIsSubmitted(true);
    clearCart();
  };

  if (!isMounted) {
    return (
      <div className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse space-y-6">
          <div className="h-8 w-48 bg-beige/60 rounded-xl" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 h-96 bg-cream/60 rounded-3xl" />
            <div className="lg:col-span-5 h-96 bg-cream/60 rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="py-16 sm:py-24">
        <div className="max-w-xl mx-auto px-4 text-center space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-beige shadow-card">
          <div className="w-20 h-20 rounded-full bg-moss/10 text-moss mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-moss uppercase tracking-widest block mb-1">
              Đặt Hàng Thành Công
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-moss-dark">
              Cảm Ơn Bạn Đã Chọn Mộc Hương!
            </h1>
            <p className="text-xs sm:text-sm text-ink/70 mt-2">
              Mã đơn hàng của bạn là: <strong className="text-terracotta text-base">{orderCode}</strong>
            </p>
          </div>

          <div className="p-4 bg-cream rounded-2xl border border-beige text-left text-xs space-y-2 text-ink/80">
            <p><strong>Người nhận:</strong> {formData.fullName} ({formData.phone})</p>
            <p><strong>Địa chỉ giao hàng:</strong> {formData.address}, {formData.city}</p>
            {handwrittenCard.enabled && (
              <p>
                <strong>Thiệp viết tay:</strong> &ldquo;{handwrittenCard.message || "(Để trống lời chúc)"}&rdquo;
                {isGiftSetInCart ? " (Miễn phí theo Set Quà)" : " (+10.000đ)"}
              </p>
            )}
            {deliverySchedule.enabled && (
              <p>
                <strong>Giao hẹn giờ:</strong> {deliverySchedule.date || "Chưa chọn ngày"} ({deliverySchedule.timeSlot})
                {deliveryFee > 0 && ` (+${formatCurrency(deliveryFee)})`}
              </p>
            )}
            <p><strong>Phương thức thanh toán:</strong> {
              paymentMethod === "cod" ? "Thanh toán khi nhận hàng (COD)" :
              paymentMethod === "bank" ? "Chuyển khoản ngân hàng" :
              paymentMethod === "vnpay" ? "Cổng thanh toán VNPAY" :
              paymentMethod === "momo" ? "Ví điện tử Momo" : "Thẻ tín dụng / Ghi nợ"
            }</p>
            <p><strong>Tổng tiền:</strong> <strong className="text-terracotta font-bold">{formatCurrency(total)}</strong></p>
          </div>

          <p className="text-xs text-ink/60">
            Đội ngũ Mộc Hương sẽ gọi điện thoại hoặc gửi email xác nhận đơn hàng trong vòng 15 phút.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button variant="primary" size="md">
                Quay về trang chủ
              </Button>
            </Link>
            <Link href="/san-pham">
              <Button variant="outline" size="md">
                Tiếp tục mua sắm
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-moss-dark mb-8 pb-4 border-b border-beige">
          Thanh Toán Đơn Hàng
        </h1>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cột Trái: Các Bước Điền Thông Tin */}
          <div className="lg:col-span-7 space-y-8">
            {/* BƯỚC 1: THÔNG TIN KHÁCH HÀNG */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-beige/80 shadow-xs space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-beige/70">
                <span className="w-7 h-7 rounded-full bg-moss text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="font-serif font-bold text-lg text-ink-dark">
                  Thông Tin Người Nhận
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Họ và tên"
                  required
                  placeholder="VD: Nguyễn Văn An"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
                <Input
                  label="Số điện thoại"
                  required
                  type="tel"
                  placeholder="VD: 0912345678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Email (để nhận hóa đơn & tracking)"
                  type="email"
                  placeholder="VD: an.nguyen@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink/80 mb-1.5">
                    Tỉnh / Thành phố <span className="text-terracotta">*</span>
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full rounded-xl border border-beige bg-white px-3.5 py-2.5 text-sm text-ink focus:border-moss focus:ring-2 focus:ring-moss/20 outline-none"
                  >
                    <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Hà Nội">TP. Hà Nội</option>
                    <option value="Đà Nẵng">TP. Đà Nẵng</option>
                    <option value="Cần Thơ">TP. Cần Thơ</option>
                    <option value="Hải Phòng">TP. Hải Phòng</option>
                    <option value="Khác">Tỉnh thành khác</option>
                  </select>
                </div>
              </div>

              <Input
                label="Địa chỉ chi tiết (Số nhà, tên đường, phường/xã)"
                required
                placeholder="VD: 123 Lê Lợi, Phường Bến Thành, Quận 1"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink/80 mb-1.5">
                  Ghi chú đơn hàng (tuỳ chọn)
                </label>
                <textarea
                  rows={2}
                  placeholder="VD: Giao giờ hành chính, gọi trước khi đến..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full rounded-xl border border-beige bg-white px-3.5 py-2 text-sm text-ink focus:border-moss focus:ring-2 focus:ring-moss/20 outline-none"
                />
              </div>
            </div>

            {/* BƯỚC 2: DỊCH VỤ GIA TĂNG (ADD-ONS: THIỆP VIẾT TAY & GIAO HẸN GIỜ) */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-beige/80 shadow-xs space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-beige/70">
                <span className="w-7 h-7 rounded-full bg-moss text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <div>
                  <h3 className="font-serif font-bold text-lg text-ink-dark flex items-center gap-2">
                    <span>Dịch Vụ Gia Tăng (Add-on)</span>
                    <Sparkles className="w-4 h-4 text-terracotta" />
                  </h3>
                  <p className="text-xs text-ink/60">
                    Tùy chọn viết thiệp tay và giao hàng hẹn giờ chuẩn xác
                  </p>
                </div>
              </div>

              {/* 1. Add-on Thiệp Viết Tay */}
              <div className="p-4 rounded-2xl border border-beige bg-[#FAF7F2] space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={handwrittenCard.enabled}
                      onChange={(e) => setHandwrittenCard({ enabled: e.target.checked })}
                      className="accent-moss w-4 h-4 mt-0.5"
                    />
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-ink flex items-center gap-2">
                        <span>Thiệp viết tay lời chúc theo yêu cầu</span>
                        {isGiftSetInCart ? (
                          <span className="text-[10px] bg-moss text-white font-bold px-2 py-0.5 rounded-full">
                            Miễn phí kèm Set Quà
                          </span>
                        ) : (
                          <span className="text-[10px] bg-terracotta/10 text-terracotta font-bold px-2 py-0.5 rounded-full">
                            +10.000đ
                          </span>
                        )}
                      </h4>
                      <p className="text-[11px] text-ink/60 mt-0.5">
                        {PRODUCT_SHARED_CONFIG.addons.handwrittenCard.description}
                      </p>
                    </div>
                  </label>
                </div>

                {handwrittenCard.enabled && (
                  <div className="pt-2">
                    <label className="block text-xs font-bold text-ink/80 mb-1">
                      Lời chúc của bạn muốn Mộc Hương viết tay lên thiệp:
                    </label>
                    <textarea
                      rows={3}
                      value={handwrittenCard.message}
                      onChange={(e) => setHandwrittenCard({ enabled: true, message: e.target.value })}
                      placeholder="VD: Chúc bạn luôn an yên, thơm ngát và tràn đầy năng lượng mỗi ngày..."
                      className="w-full rounded-xl border border-beige bg-white p-3 text-xs text-ink focus:border-moss focus:ring-2 focus:ring-moss/20 outline-none"
                    />
                  </div>
                )}
              </div>

              {/* 2. Add-on Giao Hẹn Giờ */}
              <div className="p-4 rounded-2xl border border-beige bg-[#FAF7F2] space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={deliverySchedule.enabled}
                      onChange={(e) => setDeliverySchedule({ enabled: e.target.checked })}
                      className="accent-moss w-4 h-4 mt-0.5"
                    />
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-ink flex items-center gap-2">
                        <span>Dịch vụ giao hàng hẹn ngày &amp; khung giờ</span>
                        <span className="text-[10px] bg-moss/10 text-moss font-bold px-2 py-0.5 rounded-full">
                          Đúng giờ cam kết
                        </span>
                      </h4>
                      <p className="text-[11px] text-ink/60 mt-0.5">
                        {PRODUCT_SHARED_CONFIG.addons.deliverySchedule.description}
                      </p>
                    </div>
                  </label>
                </div>

                {deliverySchedule.enabled && (
                  <div className="pt-3 border-t border-beige/60 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-ink/80 mb-1 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-moss" />
                          <span>Ngày mong muốn nhận:</span>
                        </label>
                        <input
                          type="date"
                          min={todayStr}
                          value={deliverySchedule.date}
                          onChange={(e) =>
                            setDeliverySchedule({ enabled: true, date: e.target.value })
                          }
                          className="w-full rounded-xl border border-beige bg-white px-3 py-2 text-xs text-ink focus:border-moss outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-ink/80 mb-1 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-moss" />
                          <span>Khung giờ nhận:</span>
                        </label>
                        <select
                          value={deliverySchedule.timeSlot}
                          onChange={(e) =>
                            setDeliverySchedule({ enabled: true, timeSlot: e.target.value })
                          }
                          className="w-full rounded-xl border border-beige bg-white px-3 py-2 text-xs text-ink focus:border-moss outline-none"
                        >
                          {PRODUCT_SHARED_CONFIG.addons.deliverySchedule.timeSlots.map((slot) => (
                            <option key={slot.id} value={slot.id}>
                              {slot.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="text-[11px] text-ink/60 bg-cream p-2.5 rounded-xl border border-beige flex items-center justify-between">
                      <span>Phụ phí khung giờ đã chọn:</span>
                      <strong className="text-terracotta">
                        {deliveryFee === 0 ? "0đ (Miễn phụ phí)" : `+${formatCurrency(deliveryFee)}`}
                      </strong>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* BƯỚC 3: PHƯƠNG THỨC GIAO HÀNG */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-beige/80 shadow-xs space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-beige/70">
                <span className="w-7 h-7 rounded-full bg-moss text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="font-serif font-bold text-lg text-ink-dark">
                  Phương Thức Vận Chuyển
                </h3>
              </div>

              <div className="space-y-3">
                <label
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    shippingMethod === "standard"
                      ? "border-moss bg-moss/5"
                      : "border-beige hover:border-moss/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === "standard"}
                      onChange={() => setShippingMethod("standard")}
                      className="accent-moss w-4 h-4"
                    />
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-ink">Giao Hàng Tiêu Chuẩn</h4>
                      <p className="text-[11px] text-ink/60">Từ 2–3 ngày làm việc (Miễn phí từ 300k)</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-moss">
                    {subtotal >= 300000 ? "Miễn phí" : "30.000đ"}
                  </span>
                </label>

                <label
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    shippingMethod === "express"
                      ? "border-moss bg-moss/5"
                      : "border-beige hover:border-moss/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === "express"}
                      onChange={() => setShippingMethod("express")}
                      className="accent-moss w-4 h-4"
                    />
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-ink">Giao Nhanh Hỏa Tốc (24h)</h4>
                      <p className="text-[11px] text-ink/60">Giao ngay trong ngày nội thành</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-ink">45.000đ</span>
                </label>

                <label
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    shippingMethod === "store"
                      ? "border-moss bg-moss/5"
                      : "border-beige hover:border-moss/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === "store"}
                      onChange={() => setShippingMethod("store")}
                      className="accent-moss w-4 h-4"
                    />
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-ink">Nhận Tại Điểm Phân Phối Mộc Hương</h4>
                      <p className="text-[11px] text-ink/60">Địa chỉ: Đang cập nhật (Liên hệ xác nhận qua email)</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-moss">Miễn phí</span>
                </label>
              </div>
            </div>

            {/* BƯỚC 4: PHƯƠNG THỨC THANH TOÁN */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-beige/80 shadow-xs space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-beige/70">
                <span className="w-7 h-7 rounded-full bg-moss text-white text-xs font-bold flex items-center justify-center">
                  4
                </span>
                <h3 className="font-serif font-bold text-lg text-ink-dark">
                  Phương Thức Thanh Toán
                </h3>
              </div>

              <div className="space-y-3">
                <label
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "border-moss bg-moss/5"
                      : "border-beige/80 hover:border-moss/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="accent-moss w-4 h-4 cursor-pointer"
                    />
                    <div className="flex items-center gap-2">
                      <Banknote className="w-5 h-5 text-moss" />
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-ink">
                          Thanh toán khi nhận hàng (COD)
                        </h4>
                        <p className="text-[11px] text-ink/60">Kiểm tra mùi hương trước khi thanh toán</p>
                      </div>
                    </div>
                  </div>
                </label>

                <label
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === "bank"
                      ? "border-moss bg-moss/5"
                      : "border-beige/80 hover:border-moss/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "bank"}
                      onChange={() => setPaymentMethod("bank")}
                      className="accent-moss w-4 h-4 cursor-pointer"
                    />
                    <div className="flex items-center gap-2">
                      <QrCode className="w-5 h-5 text-moss" />
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-ink">
                          Chuyển khoản ngân hàng (QR Code)
                        </h4>
                        <p className="text-[11px] text-ink/60">Vietcombank / Techcombank / MBBank</p>
                      </div>
                    </div>
                  </div>
                </label>

                <label
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === "vnpay"
                      ? "border-moss bg-moss/5"
                      : "border-beige/80 hover:border-moss/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "vnpay"}
                      onChange={() => setPaymentMethod("vnpay")}
                      className="accent-moss w-4 h-4 cursor-pointer"
                    />
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-ink">
                          Cổng thanh toán VNPAY / Ví MoMo
                        </h4>
                        <p className="text-[11px] text-ink/60">Quét mã VNPAY-QR hoặc ví điện tử</p>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Cột Phải: Tóm Tắt Đơn Hàng & Đặt Hàng */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-beige/80 shadow-xs space-y-5 sticky top-24">
              <h3 className="font-serif font-bold text-lg text-ink-dark pb-3 border-b border-beige/70">
                Sản Phẩm Đặt Mua ({items.length})
              </h3>

              <div className="max-h-60 overflow-y-auto space-y-3 divide-y divide-beige/60 pr-1">
                {items.map((item, index) => {
                  if (!item || !item.product) return null;
                  const itemKey = item.id || `${item.product.id || "item"}-${index}`;
                  return (
                    <div key={itemKey} className="pt-3 first:pt-0 flex justify-between items-start text-xs">
                      <div className="max-w-[70%]">
                        <h4 className="font-bold text-ink">{item.product.tenMuiHuong}</h4>
                        <span className="text-[11px] text-ink/50 block">
                          {item.selectedProducts && item.selectedProducts.length > 0
                            ? `${item.selectedProducts.length} chai × 30ml`
                            : `${item.product.dungTich}`} × {item.quantity}
                        </span>
                        {item.selectedProducts && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.selectedProducts.map((sp, idx) => (
                              <span key={`${itemKey}-sp-${sp?.id || idx}-${idx}`} className="text-[9px] bg-moss/10 text-moss font-semibold px-1 rounded">
                                {sp?.tenMuiHuong || "Mùi hương"}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <span className="font-bold text-ink shrink-0">
                        {formatCurrency(
                          (item.product.giaKhuyenMai ?? item.product.gia) * item.quantity
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Chi tiết tiền & Phụ thu Add-on */}
              <div className="pt-4 border-t border-beige space-y-2 text-xs text-ink/80">
                <div className="flex justify-between">
                  <span>Tiền hàng:</span>
                  <span>{formatCurrency(subtotal)}</span>
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

                {/* Add-on: Thiệp viết tay */}
                {handwrittenCard.enabled && (
                  <div className="flex justify-between text-moss font-semibold">
                    <span>Thiệp viết tay:</span>
                    <span>{cardFee === 0 ? "Miễn phí (Set quà)" : formatCurrency(cardFee)}</span>
                  </div>
                )}

                {/* Add-on: Giao hẹn giờ */}
                {deliverySchedule.enabled && (
                  <div className="flex justify-between text-moss font-semibold">
                    <span>Giao hàng hẹn giờ:</span>
                    <span>{deliveryFee === 0 ? "0đ" : formatCurrency(deliveryFee)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-beige flex justify-between items-baseline">
                  <span className="text-sm font-bold text-moss-dark">Tổng thanh toán:</span>
                  <span className="font-serif font-bold text-2xl text-terracotta">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              {/* Nút Hoàn Tất Đặt Hàng */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                >
                  <span>Hoàn tất đặt hàng ({formatCurrency(total)})</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              <div className="p-3 bg-cream rounded-xl text-[11px] text-ink/60 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-moss shrink-0" />
                <span>Mộc Hương cam kết bảo mật 100% thông tin đặt hàng.</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <AuthGuard returnUrl="/thanh-toan">
      <CheckoutContent />
    </AuthGuard>
  );
}
