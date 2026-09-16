"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Sparkles,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  UserPlus,
} from "lucide-react";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/tai-khoan";

  const { register, isLoading } = useAuthStore();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setErrorMessage("Vui lòng điền đầy đủ họ tên, số điện thoại và email.");
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không khớp.");
      return;
    }

    if (!formData.agreeTerms) {
      setErrorMessage("Vui lòng đồng ý với Điều khoản dịch vụ của Mộc Hương.");
      return;
    }

    const result = await register({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      router.push(returnUrl);
    } else {
      setErrorMessage(result.error || "Đăng ký không thành công.");
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl border border-beige p-6 sm:p-10 shadow-card space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-cream border border-beige flex items-center justify-center text-moss mx-auto">
          <UserPlus className="w-6 h-6 text-terracotta" />
        </div>
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-moss-dark">
          Tạo Tài Khoản
        </h1>
        <p className="text-xs sm:text-sm text-ink/65">
          Đồng hành cùng Mộc Hương trong hành trình chăm sóc không gian sống
        </p>
      </div>

      {/* Thông báo lỗi */}
      {errorMessage && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-2.5 text-xs text-red-600 animate-fadeIn">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Form đăng ký */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Họ và tên"
          required
          autoComplete="name"
          placeholder="VD: Nguyễn Văn An"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Số điện thoại"
            type="tel"
            required
            autoComplete="tel"
            placeholder="VD: 0912345678"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          <Input
            label="Email"
            type="email"
            required
            autoComplete="email"
            placeholder="VD: an@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-ink/80">
            Mật khẩu <span className="text-terracotta">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              autoComplete="new-password"
              placeholder="Tối thiểu 6 ký tự"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full rounded-xl border border-beige bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/40 transition-all duration-200 outline-none focus:border-moss focus:ring-2 focus:ring-moss/20 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink transition-colors cursor-pointer"
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-ink/80">
            Xác nhận mật khẩu <span className="text-terracotta">*</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            required
            autoComplete="new-password"
            placeholder="Nhập lại mật khẩu"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="w-full rounded-xl border border-beige bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/40 transition-all duration-200 outline-none focus:border-moss focus:ring-2 focus:ring-moss/20"
          />
        </div>

        <label className="flex items-start gap-2.5 cursor-pointer pt-1">
          <input
            type="checkbox"
            checked={formData.agreeTerms}
            onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
            className="accent-moss w-4 h-4 rounded mt-0.5"
          />
          <span className="text-xs text-ink/80 leading-relaxed">
            Tôi đồng ý với{" "}
            <Link href="/chinh-sach-bao-mat" className="text-moss font-bold hover:underline">
              Chính sách bảo mật
            </Link>{" "}
            và{" "}
            <Link href="/dieu-khoan-dich-vu" className="text-moss font-bold hover:underline">
              Điều khoản dịch vụ
            </Link>{" "}
            của Mộc Hương.
          </span>
        </label>

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Đang tạo tài khoản...</span>
            ) : (
              <>
                <span>Tạo tài khoản</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Chuyển hướng tới đăng nhập */}
      <div className="pt-4 border-t border-beige text-center text-xs text-ink/70">
        <span>Đã có tài khoản Mộc Hương? </span>
        <Link
          href={`/dang-nhap${returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ""}`}
          className="font-bold text-moss hover:underline"
        >
          Đăng nhập ngay
        </Link>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <Suspense
          fallback={
            <div className="w-full max-w-md h-96 bg-white rounded-3xl border border-beige animate-pulse" />
          }
        >
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
}
