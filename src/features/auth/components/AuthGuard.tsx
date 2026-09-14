"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useAuthStore } from "../store/auth-store";
import { Sparkles } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
  returnUrl?: string;
}

function AuthGuardInner({
  children,
  returnUrl,
}: {
  children: React.ReactNode;
  returnUrl?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated) {
      const targetUrl =
        returnUrl ||
        (searchParams?.toString() ? `${pathname}?${searchParams.toString()}` : pathname);
      router.replace(`/dang-nhap?returnUrl=${encodeURIComponent(targetUrl)}`);
    }
  }, [isHydrated, isAuthenticated, pathname, searchParams, router, returnUrl]);

  // Trong lúc đợi hydration từ localStorage hoặc đang chuyển hướng
  if (!isHydrated || !isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-cream border border-beige flex items-center justify-center text-moss mb-4 animate-bounce">
          <Sparkles className="w-6 h-6 text-terracotta" />
        </div>
        <h3 className="font-serif font-bold text-lg text-moss-dark">
          Đang xác thực tài khoản Mộc Hương...
        </h3>
        <p className="text-xs text-ink/60 mt-1">
          Vui lòng đợi trong giây lát
        </p>
      </div>
    );
  }

  return <>{children}</>;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children, returnUrl }) => {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-cream border border-beige flex items-center justify-center text-moss mb-4">
            <Sparkles className="w-6 h-6 text-terracotta" />
          </div>
          <h3 className="font-serif font-bold text-lg text-moss-dark">
            Đang tải...
          </h3>
        </div>
      }
    >
      <AuthGuardInner returnUrl={returnUrl}>{children}</AuthGuardInner>
    </Suspense>
  );
};
