"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, UserRound, Sparkles, ArrowRight, UserPlus } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";

interface AuthPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  returnUrl?: string;
}

export const AuthPromptModal: React.FC<AuthPromptModalProps> = ({
  isOpen,
  onClose,
  returnUrl = "/thanh-toan",
}) => {
  // Đóng bằng phím Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const loginHref = `/dang-nhap?returnUrl=${encodeURIComponent(returnUrl)}`;
  const registerHref = `/dang-ky?returnUrl=${encodeURIComponent(returnUrl)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-md bg-white rounded-3xl border border-beige p-6 sm:p-8 shadow-card z-10 animate-scaleUp text-center space-y-5">
        {/* Nút đóng */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-ink/40 hover:text-ink hover:bg-beige/40 rounded-full transition-colors cursor-pointer"
          aria-label="Đóng hộp thoại"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Biểu tượng thương hiệu */}
        <div className="w-16 h-16 rounded-full bg-cream border border-beige flex items-center justify-center mx-auto text-moss relative">
          <UserRound className="w-8 h-8" />
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-terracotta text-white flex items-center justify-center">
            <Sparkles className="w-3 h-3" />
          </span>
        </div>

        {/* Tiêu đề & Nội dung theo đúng yêu cầu */}
        <div className="space-y-2">
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-moss-dark">
            Đăng nhập để đặt hàng
          </h3>
          <p className="text-xs sm:text-sm text-ink/70 leading-relaxed max-w-xs mx-auto">
            Đăng nhập hoặc tạo tài khoản để theo dõi đơn hàng, lưu địa chỉ và nhận ưu đãi.
          </p>
        </div>

        {/* 2 Nút hành động */}
        <div className="space-y-3 pt-2">
          <Link href={loginHref} className="block w-full" onClick={onClose}>
            <Button variant="primary" size="md" fullWidth>
              <span>Đăng nhập</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>

          <Link href={registerHref} className="block w-full" onClick={onClose}>
            <Button variant="outline" size="md" fullWidth>
              <UserPlus className="w-4 h-4 mr-1.5" />
              <span>Tạo tài khoản mới</span>
            </Button>
          </Link>
        </div>

        <p className="text-[11px] text-ink/45 pt-1">
          Giỏ hàng của bạn vẫn được lưu giữ an toàn trong suốt quá trình.
        </p>
      </div>
    </div>
  );
};
