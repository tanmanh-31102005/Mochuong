"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { User, Package, Heart, CheckCircle2 } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { useAuthStore, getUserInitials } from "@/features/auth/store/auth-store";

export default function AccountPage() {
  const { user, updateProfile } = useAuthStore();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    birthDate: "1995-08-15",
    address: "",
  });

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
        birthDate: user.birthDate || "1995-08-15",
        address:
          user.address ||
          "45/2 Nguyễn Thị Minh Khai, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
      });
    }
  }, [user]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      birthDate: formData.birthDate,
      address: formData.address,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const initials = getUserInitials(user?.name);

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-moss-dark mb-8 pb-4 border-b border-beige">
          Tài Khoản Khách Hàng
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Menu */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-beige shadow-soft space-y-2">
            <div className="flex items-center gap-3 p-3 bg-cream rounded-2xl mb-4">
              <div className="w-12 h-12 rounded-full bg-moss text-white font-bold flex items-center justify-center text-lg shrink-0">
                {initials}
              </div>
              <div className="overflow-hidden">
                <h4 className="font-bold text-sm text-moss-dark truncate">
                  {user?.name || "Khách hàng Mộc Hương"}
                </h4>
                <p className="text-xs text-ink/60 truncate">
                  {user?.email || "khachhang@mochuong.vn"}
                </p>
              </div>
            </div>

            <Link
              href="/tai-khoan"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-moss/10 text-moss font-bold text-xs"
            >
              <User className="w-4 h-4" />
              <span>Thông tin cá nhân</span>
            </Link>

            <Link
              href="/tai-khoan/don-hang"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-ink hover:bg-beige/40 font-semibold text-xs transition-colors"
            >
              <Package className="w-4 h-4 text-moss" />
              <span>Đơn hàng của tôi</span>
            </Link>

            <Link
              href="/tai-khoan/yeu-thich"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-ink hover:bg-beige/40 font-semibold text-xs transition-colors"
            >
              <Heart className="w-4 h-4 text-terracotta" />
              <span>Danh sách yêu thích</span>
            </Link>
          </div>

          {/* Nội dung thông tin cá nhân */}
          <form
            onSubmit={handleSave}
            className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-beige shadow-soft space-y-6"
          >
            <div className="flex items-center justify-between pb-3 border-b border-beige">
              <h3 className="font-serif font-bold text-xl text-moss-dark">
                Cập Nhật Thông Tin Cá Nhân
              </h3>
              {isSaved && (
                <span className="flex items-center gap-1.5 text-xs font-bold text-moss bg-moss/10 px-3 py-1 rounded-full animate-fadeIn">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Đã lưu thay đổi thành công!</span>
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Họ và tên"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <Input
                label="Số điện thoại"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <Input
                label="Ngày sinh"
                type="date"
                value={formData.birthDate}
                onChange={(e) =>
                  setFormData({ ...formData, birthDate: e.target.value })
                }
              />
            </div>

            <Input
              label="Địa chỉ mặc định"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />

            <div className="pt-4 flex justify-end">
              <Button type="submit" variant="primary" size="md">
                Lưu thay đổi
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
