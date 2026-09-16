"use client";

import React, { useState } from "react";
import Link from "next/link";
import { KeyRound, Mail, ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";
import { authService } from "@/features/auth/services/mock-auth-service";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    try {
      const res = await authService.requestPasswordReset(email);
      setMessage(res.message);
      setIsSubmitted(true);
    } catch {
      setMessage("Có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-md bg-white rounded-3xl border border-beige p-6 sm:p-10 shadow-card space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-cream border border-beige flex items-center justify-center text-moss mx-auto">
              <KeyRound className="w-6 h-6 text-terracotta" />
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-moss-dark">
              Khôi Phục Mật Khẩu
            </h1>
            <p className="text-xs sm:text-sm text-ink/65">
              Nhập email đã đăng ký để nhận mã và hướng dẫn đặt lại mật khẩu mới
            </p>
          </div>

          {isSubmitted ? (
            <div className="space-y-5 text-center py-2 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-moss/10 text-moss flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-moss-dark">
                  Đã Gửi Hướng Dẫn
                </h3>
                <p className="text-xs sm:text-sm text-ink/80 leading-relaxed">
                  {message}
                </p>
              </div>
              <div className="pt-3">
                <Link href="/dang-nhap" className="block w-full">
                  <Button variant="primary" size="md" fullWidth>
                    <ArrowLeft className="w-4 h-4 mr-1.5" />
                    <span>Quay lại Đăng nhập</span>
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Địa chỉ Email của bạn"
                type="email"
                required
                autoComplete="email"
                placeholder="VD: nguyenvana@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span>Đang gửi...</span>
                  ) : (
                    <>
                      <span>Gửi liên kết khôi phục</span>
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </>
                  )}
                </Button>
              </div>

              <div className="pt-4 border-t border-beige text-center">
                <Link
                  href="/dang-nhap"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-moss hover:underline"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Quay lại Đăng nhập</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
