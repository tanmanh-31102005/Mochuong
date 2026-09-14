"use client";

import React from "react";
import Link from "next/link";
import { Package, Truck, CheckCircle2, ChevronRight } from "lucide-react";
import { formatCurrency } from "@/shared/utils/format";
import { Button } from "@/shared/components/ui/Button";

export default function OrderHistoryPage() {
  const mockOrders = [
    {
      code: "MH-892143",
      date: "10/02/2026",
      status: "Đã giao hàng thành công",
      statusColor: "text-moss bg-moss/10",
      total: 399000,
      items: ["Set Quà Tặng Bình Yên (3 chai 30ml)"],
    },
    {
      code: "MH-541290",
      date: "25/01/2026",
      status: "Đang vận chuyển",
      statusColor: "text-blue-600 bg-blue-50",
      total: 260000,
      items: ["Oải Hương Vỗ Về 30ml", "Bạc Hà Tươi Mát 30ml"],
    },
  ];

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-moss-dark mb-8 pb-4 border-b border-beige">
          Đơn Hàng Của Tôi
        </h1>

        <div className="space-y-4">
          {mockOrders.map((order) => (
            <div
              key={order.code}
              className="bg-white p-6 rounded-3xl border border-beige shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-serif font-bold text-base text-moss-dark">
                    Đơn hàng: {order.code}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${order.statusColor}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-xs text-ink/60">Ngày đặt: {order.date}</p>
                <p className="text-xs text-ink/80 font-medium">
                  Sản phẩm: {order.items.join(", ")}
                </p>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-beige">
                <div className="text-right">
                  <span className="text-[11px] text-ink/50 block">Tổng tiền:</span>
                  <span className="font-bold text-terracotta text-sm sm:text-base">
                    {formatCurrency(order.total)}
                  </span>
                </div>
                <Button variant="outline" size="sm">
                  Chi tiết
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
