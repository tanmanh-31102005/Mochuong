"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/core/config/site.config";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-moss uppercase tracking-widest block mb-2">
            Kết Nối Cùng Mộc Hương
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-moss-dark">
            Liên Hệ &amp; Hỗ Trợ Khách Hàng
          </h1>
          <p className="text-xs sm:text-sm text-ink/70 mt-2">
            Bạn cần tư vấn chọn nốt hương phù hợp hay đặt set quà tặng số lượng lớn? Hãy gửi lời nhắn cho chúng tôi nhé!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cột Trái: Thông Tin Liên Hệ */}
          <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-beige shadow-soft space-y-6">
            <h3 className="font-serif font-bold text-xl text-moss-dark pb-3 border-b border-beige">
              Văn Phòng &amp; Showroom
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-ink/80">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center text-moss shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-moss-dark">Địa chỉ:</strong>
                  <span>{siteConfig.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center text-terracotta shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-moss-dark">Hotline CSKH / Đặt hàng:</strong>
                  <a
                    href={`tel:${siteConfig.hotline.replace(/\D/g, "")}`}
                    className="font-bold text-terracotta hover:underline block"
                  >
                    {siteConfig.hotline}
                  </a>
                  <p className="text-xs text-ink/50 mt-0.5">
                    Zalo tư vấn:{" "}
                    <a
                      href={`https://zalo.me/${siteConfig.zalo.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-moss font-semibold hover:underline"
                    >
                      {siteConfig.zalo}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center text-moss shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-moss-dark">Email hỗ trợ:</strong>
                  <span>{siteConfig.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center text-moss shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-moss-dark">Giờ làm việc:</strong>
                  <span>Thứ Hai — Thứ Bảy: 08:30 - 20:30 (Chủ Nhật: 09:00 - 18:00)</span>
                </div>
              </div>

              {/* Mạng xã hội chính thức */}
              <div className="pt-3 border-t border-beige">
                <strong className="block text-moss-dark mb-2">Kênh mạng xã hội chính thức:</strong>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href={siteConfig.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-cream/60 hover:bg-cream border border-beige text-xs font-medium text-ink hover:text-moss transition-colors"
                  >
                    <svg className="w-4 h-4 text-[#1877F2] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="truncate">Facebook Fanpage</span>
                  </a>
                  <a
                    href={siteConfig.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-cream/60 hover:bg-cream border border-beige text-xs font-medium text-ink hover:text-moss transition-colors"
                  >
                    <svg className="w-4 h-4 text-ink shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.46V11.8a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-2.9-1.23z"/>
                    </svg>
                    <span className="truncate">Kênh TikTok</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Cột Phải: Form Gửi Tin Nhắn */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-beige shadow-soft">
            <h3 className="font-serif font-bold text-xl text-moss-dark pb-3 border-b border-beige mb-6">
              Gửi Tin Nhắn Cho Mộc Hương
            </h3>

            {submitted ? (
              <div className="p-8 bg-moss/10 rounded-2xl border border-moss/30 text-center space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-moss mx-auto" />
                <h4 className="font-serif font-bold text-lg text-moss-dark">
                  Cảm ơn bạn đã liên hệ!
                </h4>
                <p className="text-xs text-ink/70 max-w-sm mx-auto">
                  Chuyên viên mùi hương của Mộc Hương sẽ phản hồi lại bạn qua số điện thoại hoặc email trong vòng 2 giờ làm việc.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Họ và tên" required placeholder="VD: Trần Mai Anh" />
                  <Input label="Số điện thoại" required type="tel" placeholder="VD: 0909123456" />
                </div>

                <Input label="Email" type="email" placeholder="VD: maianh@email.com" />

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink/80 mb-1.5">
                    Nội dung lời nhắn <span className="text-terracotta">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Bạn cần tư vấn mùi hương cho không gian nào hoặc có câu hỏi gì cần hỗ trợ..."
                    className="w-full rounded-xl border border-beige bg-white px-3.5 py-2.5 text-sm text-ink focus:border-moss focus:ring-2 focus:ring-moss/20 outline-none"
                  />
                </div>

                <Button type="submit" variant="primary" size="lg">
                  <Send className="w-4 h-4 mr-2" />
                  <span>Gửi tin nhắn</span>
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
