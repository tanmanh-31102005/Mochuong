import React, { Suspense } from "react";
import { AuthGuard } from "@/features/auth/components/AuthGuard";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center text-xs text-ink/60">
          Đang tải trang tài khoản...
        </div>
      }
    >
      <AuthGuard>{children}</AuthGuard>
    </Suspense>
  );
}
