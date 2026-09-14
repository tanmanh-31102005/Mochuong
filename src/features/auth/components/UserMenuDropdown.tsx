"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  UserRound,
  Package,
  Heart,
  LogOut,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useAuthStore, getUserInitials } from "../store/auth-store";
import { Button } from "@/shared/components/ui/Button";

interface UserMenuDropdownProps {
  className?: string;
  onItemClick?: () => void;
}

export const UserMenuDropdown: React.FC<UserMenuDropdownProps> = ({
  className = "",
  onItemClick,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user, isAuthenticated, logout } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Xử lý click ra ngoài để đóng dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    onItemClick?.();
    // Nếu đang ở trang yêu cầu login, chuyển hướng về trang chủ
    if (pathname.startsWith("/tai-khoan") || pathname.startsWith("/thanh-toan")) {
      router.push("/");
    }
  };

  const handleNavigate = () => {
    setIsOpen(false);
    onItemClick?.();
  };

  // Tránh hydration mismatch giữa server và client
  const authenticated = isHydrated && isAuthenticated && !!user;
  const initials = getUserInitials(user?.name);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button trên Header */}
      {!authenticated ? (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-ink/80 hover:text-moss hover:bg-beige/50 rounded-xl transition-all cursor-pointer flex items-center justify-center"
          aria-label="Tài khoản khách hàng"
          aria-expanded={isOpen}
          title="Tài khoản"
        >
          <UserRound className="w-5 h-5" />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 rounded-xl hover:bg-beige/50 transition-all cursor-pointer flex items-center gap-1.5 focus:outline-none"
          aria-label="Menu tài khoản"
          aria-expanded={isOpen}
          title={`Tài khoản: ${user.name}`}
        >
          <div className="w-8 h-8 rounded-full bg-moss text-white font-bold text-xs flex items-center justify-center border border-moss-dark/10 shadow-2xs hover:scale-105 transition-transform">
            {initials}
          </div>
        </button>
      )}

      {/* DROPDOWN MENU */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-3xl border border-beige shadow-card p-4 z-50 animate-scaleUp">
          {!authenticated ? (
            /* GIAO DIỆN KHI CHƯA ĐĂNG NHẬP (YÊU CẦU 1) */
            <div className="space-y-3.5 text-left">
              <div className="flex items-start gap-2.5 pb-2 border-b border-beige">
                <div className="w-9 h-9 rounded-2xl bg-cream border border-beige flex items-center justify-center text-moss shrink-0">
                  <Sparkles className="w-4 h-4 text-terracotta" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-moss-dark">
                    Chào mừng bạn đến với Mộc Hương
                  </h4>
                  <p className="text-[11px] text-ink/65 leading-relaxed mt-1">
                    Đăng nhập để theo dõi đơn hàng, lưu địa chỉ và mùi hương yêu thích.
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <Link
                  href="/dang-nhap"
                  onClick={handleNavigate}
                  className="block w-full"
                >
                  <Button variant="primary" size="sm" fullWidth>
                    Đăng nhập
                  </Button>
                </Link>

                <Link
                  href="/dang-ky"
                  onClick={handleNavigate}
                  className="block w-full"
                >
                  <Button variant="outline" size="sm" fullWidth>
                    Tạo tài khoản
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            /* GIAO DIỆN KHI ĐÃ ĐĂNG NHẬP (YÊU CẦU 6) */
            <div className="space-y-3 text-left">
              {/* Thông tin chào đón */}
              <div className="flex items-center gap-3 p-2 bg-cream/70 rounded-2xl border border-beige/60">
                <div className="w-10 h-10 rounded-full bg-moss text-white font-bold text-sm flex items-center justify-center shrink-0">
                  {initials}
                </div>
                <div className="overflow-hidden">
                  <div className="text-[10px] text-ink/50 uppercase tracking-wider font-semibold">
                    Xin chào,
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-moss-dark truncate">
                    {user.name}
                  </h4>
                  <p className="text-[11px] text-ink/60 truncate">{user.email}</p>
                </div>
              </div>

              {/* Danh sách liên kết nhanh */}
              <div className="space-y-1 pt-1 border-t border-beige">
                <Link
                  href="/tai-khoan"
                  onClick={handleNavigate}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-ink hover:bg-beige/40 hover:text-moss transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <UserRound className="w-4 h-4 text-moss" />
                    <span>Thông tin tài khoản</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-ink/30" />
                </Link>

                <Link
                  href="/tai-khoan/don-hang"
                  onClick={handleNavigate}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-ink hover:bg-beige/40 hover:text-moss transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Package className="w-4 h-4 text-moss" />
                    <span>Đơn hàng của tôi</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-ink/30" />
                </Link>

                <Link
                  href="/tai-khoan/yeu-thich"
                  onClick={handleNavigate}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-ink hover:bg-beige/40 hover:text-moss transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Heart className="w-4 h-4 text-terracotta" />
                    <span>Danh sách yêu thích</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-ink/30" />
                </Link>
              </div>

              {/* Nút Đăng xuất */}
              <div className="pt-2 border-t border-beige">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
