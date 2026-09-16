"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  ShieldCheck,
  RotateCcw,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { siteConfig } from "@/core/config/site.config";
import { FOOTER_LINKS } from "@/core/constants/navigation";

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <footer className="bg-[#F2EBDD] text-ink border-t border-[#E0D6C7] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges / Guarantees banner inside Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-ink/10">
          <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-[#E3DACB] shadow-[0_8px_20px_rgba(74,74,74,0.04)]">
            <div className="w-12 h-12 rounded-xl bg-moss/10 flex items-center justify-center text-moss shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-sm text-moss-dark">100% Tinh dầu thiên nhiên</p>
              <p className="text-xs text-ink-muted">An toàn, lành tính, không hương liệu tổng hợp</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-[#E3DACB] shadow-[0_8px_20px_rgba(74,74,74,0.04)]">
            <div className="w-12 h-12 rounded-xl bg-moss/10 flex items-center justify-center text-moss shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-sm text-moss-dark">Đổi trả trong 7 ngày</p>
              <p className="text-xs text-ink-muted">Đổi mới miễn phí nếu lỗi do nhà sản xuất</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-[#E3DACB] shadow-[0_8px_20px_rgba(74,74,74,0.04)]">
            <div className="w-12 h-12 rounded-xl bg-moss/10 flex items-center justify-center text-moss shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-sm text-moss-dark">Giao nhanh toàn quốc</p>
              <p className="text-xs text-ink-muted">Miễn phí giao hàng cho đơn từ 300.000đ</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group" aria-label="Mộc Hương">
              <div className="relative aspect-[754/513] h-[80px] sm:h-[95px]">
                <Image
                  src="/images/logo/logo-clean.png"
                  alt="Mộc Hương — Hương thơm từ thiên nhiên"
                  fill
                  className="object-contain object-left group-hover:scale-[1.03] transition-transform duration-200"
                />
              </div>
            </Link>

            <p className="text-sm text-ink-muted leading-relaxed max-w-md">
              Mộc Hương ra đời từ mong muốn mang đến những khoảnh khắc thư giãn giản đơn trong cuộc sống bận rộn hằng ngày, qua 18 nốt hương xịt thơm 30ml thuần khiết từ thiên nhiên.
            </p>

            <div className="space-y-2 text-xs text-ink-muted pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-moss shrink-0 mt-0.5" />
                <span>Địa chỉ: {siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-terracotta shrink-0" />
                <a
                  href={`tel:${siteConfig.hotline.replace(/\D/g, "")}`}
                  className="font-bold text-terracotta hover:underline"
                >
                  Hotline: {siteConfig.hotline}
                </a>
                <span className="text-ink/40">|</span>
                <a
                  href={`https://zalo.me/${siteConfig.zalo.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-moss-dark hover:underline"
                >
                  Zalo: {siteConfig.zalo}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-moss shrink-0" />
                <span>Email: {siteConfig.email}</span>
              </div>
            </div>
          </div>

          {/* Dòng hương */}
          <div className="space-y-3">
            <h2 className="font-serif font-bold text-base text-moss-dark tracking-wide">
              4 Dòng Hương (30ml)
            </h2>
            <ul className="space-y-2 text-sm">
              {FOOTER_LINKS.fragranceLines.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ink-muted hover:text-moss-dark hover:translate-x-1 inline-block transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Chính sách */}
          <div className="space-y-3">
            <h2 className="font-serif font-bold text-base text-moss-dark tracking-wide">
              Chính Sách &amp; Hỗ Trợ
            </h2>
            <ul className="space-y-2 text-sm">
              {FOOTER_LINKS.policies.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ink-muted hover:text-moss-dark hover:translate-x-1 inline-block transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Đăng ký nhận tin & Bản tin */}
          <div className="space-y-4">
            <h2 className="font-serif font-bold text-base text-moss-dark tracking-wide">
              Đăng Ký Nhận Tin
            </h2>
            <p className="text-xs text-ink-muted leading-relaxed">
              Nhận ngay voucher <strong>10%</strong> cho đơn hàng đầu tiên và thông tin sản phẩm mới từ Mộc Hương.
            </p>

            {subscribed ? (
              <div className="bg-moss/15 border border-moss/30 p-3 rounded-xl flex items-center gap-2 text-moss text-xs font-bold animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Cảm ơn bạn! Thông tin đăng ký đã được ghi nhận.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Nhập email của bạn..."
                    className="w-full bg-white border border-beige rounded-xl px-3.5 py-2.5 text-xs text-ink placeholder:text-ink/40 focus:outline-none focus:border-moss focus:ring-2 focus:ring-moss/20 pr-10"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-terracotta hover:bg-terracotta-dark text-white rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Gửi email đăng ký"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            <div className="pt-2">
              <p className="text-xs font-bold text-moss-dark mb-2">Mạng xã hội chính thức:</p>
              <div className="flex flex-col gap-2">
                <a
                  href={siteConfig.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white hover:bg-moss/10 border border-[#E3DACB] text-xs font-semibold text-ink-muted hover:text-moss-dark transition-all group shadow-2xs"
                  aria-label="Fanpage Facebook Mộc Hương"
                >
                  <svg className="w-4 h-4 text-[#1877F2] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="truncate">{siteConfig.socials.facebookText}</span>
                </a>
                <a
                  href={siteConfig.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white hover:bg-moss/10 border border-[#E3DACB] text-xs font-semibold text-ink-muted hover:text-moss-dark transition-all group shadow-2xs"
                  aria-label="Kênh TikTok Mộc Hương Handmade"
                >
                  <svg className="w-4 h-4 text-ink shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.46V11.8a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-2.9-1.23z"/>
                  </svg>
                  <span className="truncate">{siteConfig.socials.tiktokText}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-ink/15 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ink-muted gap-4">
          <p>© {new Date().getFullYear()} Mộc Hương. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Tinh dầu thiên nhiên nguyên chất 30ml</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
