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
  CheckCircle2,
  Lock,
  Mail,
} from "lucide-react";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/tai-khoan";

  const { login, isLoading } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage("Vui lòng nhập đầy đủ Email và Mật khẩu.");
      return;
    }

    const result = await login({ email, password });
    if (result.success) {
      router.push(returnUrl);
    } else {
      setErrorMessage(result.error || "Đăng nhập không thành công.");
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl border border-beige p-6 sm:p-10 shadow-card space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-cream border border-beige flex items-center justify-center text-moss mx-auto">
          <Sparkles className="w-6 h-6 text-terracotta" />
        </div>
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-moss-dark">
          Đăng Nhập
        </h1>
        <p className="text-xs sm:text-sm text-ink/65">
          Chào mừng bạn quay lại với Mộc Hương
        </p>
      </div>

      {/* Thông báo lỗi */}
      {errorMessage && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-2.5 text-xs text-red-600 animate-fadeIn">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Form đăng nhập */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Địa chỉ Email"
          type="email"
          required
          autoComplete="email"
          placeholder="VD: nguyenvana@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/80">
              Mật khẩu <span className="text-terracotta">*</span>
            </label>
            <Link
              href="/quen-mat-khau"
              className="text-xs text-ink/60 hover:text-moss transition-colors"
            >
              Quên mật khẩu?
            </Link>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Đang xử lý...</span>
            ) : (
              <>
                <span>Đăng nhập</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Chuyển hướng tới đăng ký */}
      <div className="pt-4 border-t border-beige text-center text-xs text-ink/70">
        <span>Chưa có tài khoản Mộc Hương? </span>
        <Link
          href={`/dang-ky${returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ""}`}
          className="font-bold text-moss hover:underline"
        >
          Đăng ký ngay
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <Suspense
          fallback={
            <div className="w-full max-w-md h-96 bg-white rounded-3xl border border-beige animate-pulse" />
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
