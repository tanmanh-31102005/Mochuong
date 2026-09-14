"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  UserRound,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Phone,
  Sparkles,
  LogOut,
} from "lucide-react";
import { MAIN_NAVIGATION } from "@/core/constants/navigation";
import { siteConfig } from "@/core/config/site.config";
import { useCartStore } from "@/features/cart/store/cart-store";
import { useAuthStore, getUserInitials } from "@/features/auth/store/auth-store";
import { UserMenuDropdown } from "@/features/auth/components/UserMenuDropdown";
import { HeaderSearchBar } from "./HeaderSearchBar";
import { cn } from "@/shared/utils/cn";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const [mobileProductDropdownOpen, setMobileProductDropdownOpen] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleCart = useCartStore((state) => state.toggleCart);
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <>
      {/* 
        HEADER ĐƯỢC KHÓA CỐ ĐỊNH HOÀN TOÀN (STICKY TOP-0 Z-50):
        - Topbar nằm trọn vẹn bên trong header cố định, không bị cuộn trượt mất hay đẩy header di chuyển.
        - Chiều cao & padding được khóa cố định, loại bỏ hoàn toàn hiện tượng co giãn/nhảy giật khi cuộn trang.
      */}
      <header className="sticky top-0 z-50 w-full bg-cream/98 backdrop-blur-md border-b border-beige shadow-xs select-none">
        {/* Topbar thông báo ưu đãi - Căn tràn đều toàn màn hình */}
        <div className="bg-moss-dark text-white/90 text-xs py-1.5 px-4 sm:px-6 lg:px-10 border-b border-black/10">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-terracotta-light animate-pulse" />
              <span>
                Ưu đãi ra mắt: <strong>Miễn phí vận chuyển</strong> toàn quốc cho đơn từ 300.000đ | Nhập <strong>MOCHUONG10</strong> giảm 10%
              </span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-xs font-medium">
              <a
                href={`tel:${siteConfig.hotline.replace(/\D/g, "")}`}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Phone className="w-3 h-3 text-terracotta-light" />
                <span>Hotline CSKH: {siteConfig.hotline}</span>
              </a>
              <span className="text-white/40">|</span>
              <Link href="/ve-chung-toi" className="hover:text-white transition-colors">
                Câu chuyện thương hiệu
              </Link>
            </div>
          </div>
        </div>

        {/* 
          HÀNG 1: 
          - LOGO SÁT TRÁI
          - THANH TÌM KIẾM Ở GIỮA (CÂN ĐỐI, THẨM MỸ)
          - CỤM TIỆN ÍCH SÁT PHẢI (HOTLINE, YÊU THÍCH, TÀI KHOẢN, GIỎ HÀNG)
        */}
        <div className="w-full px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4 sm:gap-6 py-2">
          {/* Cụm Logo SÁT MÉP TRÁI */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-ink hover:text-moss transition-colors"
              aria-label="Mở menu điều hướng"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo Mộc Hương kích thước cố định, sắc nét, không thay đổi kích cỡ khi cuộn */}
            <Link
              href="/"
              className="group inline-flex items-center shrink-0"
              aria-label="Mộc Hương — Hương thơm từ thiên nhiên"
            >
              <div className="relative aspect-[754/513] h-[68px] sm:h-[78px] md:h-[84px]">
                <Image
                  src="/images/logo/logo-clean.png"
                  alt="Mộc Hương — Hương thơm từ thiên nhiên"
                  fill
                  className="object-contain object-left transition-transform duration-200 group-hover:scale-[1.02]"
                  priority
                  sizes="(max-width: 640px) 140px, (max-width: 1024px) 180px, 200px"
                />
              </div>
            </Link>
          </div>

          {/* THANH TÌM KIẾM Ở TRUNG TÂM — Căn giữa thẩm mỹ, gợi ý trực tiếp theo chữ cái */}
          <div className="hidden md:flex flex-1 max-w-xl xl:max-w-2xl mx-4 lg:mx-8">
            <HeaderSearchBar placeholder="Bạn đang tìm gì hôm nay? (Oải hương, Sả chanh, Xịt thơm...)" />
          </div>

          {/* Cụm Tiện Ích SÁT MÉP PHẢI: Hotline CSKH, Yêu Thích, Tài Khoản, Giỏ Hàng */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Hotline CSKH */}
            <a
              href={`tel:${siteConfig.hotline.replace(/\D/g, "")}`}
              className="hidden xl:flex items-center gap-2 text-ink/80 hover:text-moss px-2.5 py-1.5 rounded-xl hover:bg-beige/40 transition-colors"
              title="Hotline hỗ trợ khách hàng"
            >
              <div className="w-8 h-8 rounded-full bg-moss/10 flex items-center justify-center text-moss">
                <Phone className="w-4 h-4 text-moss" />
              </div>
              <div className="text-left text-xs leading-tight">
                <div className="text-[10px] text-ink/60 font-medium">Hotline CSKH</div>
                <div className="font-extrabold text-moss-dark">{siteConfig.hotline}</div>
              </div>
            </a>

            {/* Nút Yêu thích */}
            <Link
              href="/tai-khoan/yeu-thich"
              className="p-2 text-ink/80 hover:text-moss hover:bg-beige/50 rounded-xl transition-all relative hidden sm:flex"
              aria-label="Sản phẩm yêu thích"
              title="Danh sách yêu thích"
            >
              <Heart className="w-5 h-5" />
            </Link>

            {/* Nút Tài khoản & Dropdown (Guest & Logged-in) */}
            <UserMenuDropdown />

            {/* Nút Giỏ hàng với Badge số lượng */}
            <button
              type="button"
              onClick={toggleCart}
              className="p-2 sm:px-3.5 sm:py-2 bg-moss/10 hover:bg-moss text-moss hover:text-white rounded-xl transition-all flex items-center gap-2 relative shadow-2xs active:scale-95 cursor-pointer"
              aria-label="Giỏ hàng"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {isMounted && totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-terracotta text-white text-[10px] font-extrabold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="text-xs font-bold hidden sm:inline">Giỏ hàng</span>
            </button>
          </div>
        </div>

        {/* Thanh tìm kiếm trên thiết bị di động (hiển thị dưới Logo) */}
        <div className="md:hidden px-4 pb-2.5 pt-1">
          <HeaderSearchBar placeholder="Tìm mùi hương (Oải hương, Sả chanh...)" />
        </div>

        {/* HÀNG 2: Thanh Menu Điều Hướng Danh Mục — Thiết kế nhỏ xíu vừa vặn ôm sát dòng chữ */}
        <div className="w-full px-4 sm:px-6 lg:px-10 border-t border-beige/60">
          <nav className="hidden lg:flex items-center justify-center gap-0.5 xl:gap-1.5 py-1">
            {MAIN_NAVIGATION.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              if (item.children) {
                return (
                  <div key={item.label} className="relative group">
                    <Link
                      href={item.href}
                      className={cn(
                        "inline-flex items-center gap-1 px-3 py-1 text-xs xl:text-[13px] font-bold transition-all rounded-md leading-tight",
                        isActive
                          ? "text-moss bg-moss/10"
                          : "text-ink/85 hover:text-moss hover:bg-beige/40"
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
                    </Link>

                    {/* Mega Dropdown for Products */}
                    <div className="absolute left-0 top-full pt-1.5 opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 w-80 z-50">
                      <div className="bg-white rounded-2xl shadow-card border border-beige p-3 space-y-1">
                        <div className="px-3 py-1.5 text-[11px] font-bold tracking-wider text-moss uppercase">
                          4 Dòng Hương Tự Nhiên
                        </div>
                        {item.children.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block px-3 py-2 rounded-xl hover:bg-cream transition-colors group/item"
                          >
                            <div className="text-sm font-bold text-ink group-hover/item:text-moss flex items-center justify-between">
                              <span>{sub.label}</span>
                              <span className="text-xs text-moss opacity-0 group-hover/item:opacity-100 transition-opacity">
                                →
                              </span>
                            </div>
                            {sub.desc && (
                              <p className="text-xs text-ink/60 mt-0.5 line-clamp-1">
                                {sub.desc}
                              </p>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "relative inline-flex items-center px-3 py-1 text-xs xl:text-[13px] font-bold transition-all rounded-md leading-tight",
                    isActive
                      ? "text-moss bg-moss/10"
                      : "text-ink/85 hover:text-moss hover:bg-beige/40"
                  )}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="absolute -top-1 -right-0.5 bg-terracotta text-white text-[8px] font-extrabold px-1.5 py-0.2 rounded-full shadow-2xs">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-out Menu Panel */}
          <div className="relative w-4/5 max-w-sm bg-cream h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-10 animate-slideInLeft">
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-4 border-b border-beige">
                <div className="relative aspect-[754/513] h-14">
                  <Image
                    src="/images/logo/logo-clean.png"
                    alt="Logo Mộc Hương"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-ink/70 hover:text-ink"
                  aria-label="Đóng menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Thanh tìm kiếm trong drawer */}
              <div className="mt-4 mb-2">
                <HeaderSearchBar onItemSelect={() => setMobileMenuOpen(false)} />
              </div>

              {/* Navigation Links */}
              <nav className="mt-4 space-y-1">
                {MAIN_NAVIGATION.map((item) => {
                  if (item.children) {
                    return (
                      <div key={item.label} className="border-b border-beige/60 py-2">
                        <button
                          type="button"
                          onClick={() =>
                            setMobileProductDropdownOpen(!mobileProductDropdownOpen)
                          }
                          className="w-full flex items-center justify-between py-2 text-sm font-bold text-ink hover:text-moss"
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 transition-transform",
                              mobileProductDropdownOpen && "rotate-180 text-moss"
                            )}
                          />
                        </button>
                        {mobileProductDropdownOpen && (
                          <div className="pl-4 space-y-2 mt-2">
                            {item.children.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block py-1.5 text-xs font-semibold text-ink/75 hover:text-moss"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between py-3 text-sm font-bold text-ink hover:text-moss border-b border-beige/60"
                    >
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="bg-terracotta text-white text-[10px] px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Info inside Drawer */}
            <div className="pt-6 border-t border-beige space-y-3">
              <a
                href={`tel:${siteConfig.hotline.replace(/\D/g, "")}`}
                className="flex items-center gap-2 text-sm text-ink/80 hover:text-moss font-semibold"
              >
                <Phone className="w-4 h-4 text-terracotta" />
                <span>Hotline: {siteConfig.hotline}</span>
              </a>
              {/* Khu vực Tài khoản / Đăng nhập trong Mobile Drawer */}
              {isMounted && isAuthenticated && user ? (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2.5 p-2.5 bg-white rounded-2xl border border-beige">
                    <div className="w-9 h-9 rounded-full bg-moss text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {getUserInitials(user.name)}
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-bold text-xs text-moss-dark truncate">
                        {user.name}
                      </div>
                      <div className="text-[10px] text-ink/60 truncate">
                        {user.email}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/tai-khoan"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2 text-center text-xs font-bold rounded-xl border border-moss text-moss hover:bg-moss hover:text-white transition-colors"
                    >
                      Tài khoản
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="py-2 text-center text-xs font-bold rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Link
                    href="/dang-nhap"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 text-center text-xs font-bold rounded-xl border border-moss text-moss hover:bg-moss hover:text-white transition-colors"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    href="/dang-ky"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 text-center text-xs font-bold rounded-xl bg-moss text-white hover:bg-moss-dark transition-colors"
                  >
                    Tạo tài khoản
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
