"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FileText,
  Search,
  Settings,
  LayoutDashboard,
  ExternalLink,
  PlusCircle,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Globe,
  CheckCircle2,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Tổng quan SEO & Content",
      href: "/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: "Quản lý Bài viết & SEO",
      href: "/admin/bai-viet",
      icon: FileText,
      badge: "4 bài",
    },
    {
      label: "Viết bài mới & Cấu hình SEO",
      href: "/admin/bai-viet/them-moi",
      icon: PlusCircle,
    },
    {
      label: "Cài đặt SEO Tổng thể (Schema/Sitemap)",
      href: "/admin/cai-dat-seo",
      icon: Search,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-ink flex flex-col md:flex-row antialiased font-sans">
      {/* SIDEBAR */}
      <aside className="w-full md:w-72 bg-white border-r border-[#E3DACB] flex flex-col shrink-0">
        {/* Brand Header */}
        <div className="p-5 border-b border-[#E3DACB] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#59683A] text-white flex items-center justify-center font-serif font-black text-xl shadow-xs">
              M
            </div>
            <div>
              <div className="font-serif font-bold text-base text-[#25391C] leading-tight">
                Mộc Hương CMS
              </div>
              <div className="text-[11px] font-semibold text-terracotta flex items-center gap-1 mt-0.5">
                <Sparkles className="w-3 h-3" />
                <span>Trung tâm SEO & Quản trị</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Website Switcher */}
        <div className="p-3.5 mx-3 my-3 bg-[#FAF6EE] rounded-2xl border border-[#E8DEC8] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#25391C]">
            <Globe className="w-3.5 h-3.5 text-moss" />
            <span>mochuong.vn</span>
          </div>
          <Link
            href="/"
            target="_blank"
            className="text-[11px] font-bold text-terracotta hover:underline flex items-center gap-1"
          >
            <span>Xem web</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 space-y-1.5 py-2">
          <div className="text-[10px] font-bold text-ink/40 uppercase tracking-wider px-3 mb-2">
            Mục Quản Lý Chính
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#59683A] text-white shadow-xs"
                    : "text-ink/80 hover:bg-[#FAF6EE] hover:text-[#25391C]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-white" : "text-moss"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-[#EBF2E8] text-[#25391C]"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* SEO System Status */}
        <div className="p-4 mx-3 mb-4 rounded-2xl bg-white border border-[#E3DACB] shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#25391C]">
              Chỉ mục Google (SEO)
            </span>
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3 h-3" /> Sẵn sàng
            </span>
          </div>
          <div className="space-y-1.5 text-[11px] text-ink/70">
            <div className="flex items-center justify-between">
              <span>Sitemap XML:</span>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-moss-dark font-bold hover:underline flex items-center gap-1 bg-cream/70 px-2 py-0.5 rounded"
                title="Bấm để mở xem tệp /sitemap.xml"
              >
                <span>/sitemap.xml</span>
                <ExternalLink className="w-2.5 h-2.5 text-terracotta" />
              </a>
            </div>
            <div className="flex items-center justify-between">
              <span>Robots:</span>
              <a
                href="/robots.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-moss-dark font-bold hover:underline flex items-center gap-1 bg-cream/70 px-2 py-0.5 rounded"
                title="Bấm để mở xem tệp /robots.txt"
              >
                <span>/robots.txt</span>
                <ExternalLink className="w-2.5 h-2.5 text-terracotta" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-[#E3DACB] text-[11px] text-ink/50 flex items-center justify-between">
          <span>Phiên bản v2.6.0</span>
          <span>Mộc Hương Handmade</span>
        </div>
      </aside>

      {/* MAIN ADMIN WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-[#E3DACB] px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs text-ink/60">
            <Link href="/admin" className="hover:text-[#25391C]">
              Trang quản trị
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-bold text-[#25391C]">
              {pathname === "/admin"
                ? "Bảng điều khiển"
                : pathname.includes("bai-viet")
                ? "Quản lý Bài viết & Cài đặt tìm kiếm"
                : "Cài đặt SEO"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/bai-viet/them-moi"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#59683A] text-white text-xs font-bold hover:bg-[#47542E] transition-colors shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Tạo bài viết mới</span>
            </Link>

            <div className="h-6 w-px bg-beige" />

            <div className="flex items-center gap-2 pl-1">
              <div className="w-8 h-8 rounded-full bg-cream border border-beige flex items-center justify-center font-bold text-xs text-moss">
                AD
              </div>
              <div className="hidden sm:block text-left text-xs">
                <div className="font-bold text-moss-dark">Admin Mộc Hương</div>
                <div className="text-[10px] text-ink/50">Quản trị viên SEO</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
