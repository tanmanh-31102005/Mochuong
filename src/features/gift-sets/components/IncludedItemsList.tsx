"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, CheckCircle2, Package, Droplets } from "lucide-react";
import { IncludedItem } from "@/features/products/types";
import { SINGLE_PRODUCTS } from "@/features/products/data/mock-products";

export interface IncludedItemsListProps {
  items: IncludedItem[];
  className?: string;
  title?: string;
}

export const IncludedItemsList: React.FC<IncludedItemsListProps> = ({
  items,
  className = "",
  title = "Danh sách chai bên trong hộp quà:",
}) => {
  if (!items || items.length === 0) return null;

  return (
    <div className={`p-4 sm:p-5 bg-[#FAF4EB] rounded-2xl border border-[#F0E0CA] space-y-3 ${className}`}>
      <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-terracotta">
        <Sparkles className="w-4 h-4 shrink-0" />
        <span>{title} ({items.length} chai x 30ml)</span>
      </div>

      <div className="space-y-2.5">
        {items.map((item, idx) => {
          const singleProd = SINGLE_PRODUCTS.find(
            (p) => p.id === item.productId || p.tenMuiHuong === item.scentName
          );
          const hasRealImg =
            singleProd?.hinhAnh?.nhan && !singleProd.hinhAnh.nhan.includes("placeholder");

          return (
            <div
              key={item.productId ? `${item.productId}-${idx}` : `${item.scentName}-${idx}`}
              className="p-3 bg-white/90 rounded-xl border border-beige/80 flex items-start sm:items-center justify-between gap-3 text-xs shadow-2xs"
            >
              <div className="flex items-start gap-2.5">
                {hasRealImg ? (
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#FAF7F2] border border-beige flex items-center justify-center shrink-0 relative overflow-hidden p-0.5">
                    <Image
                      src={singleProd.hinhAnh.nhan}
                      alt={item.scentName}
                      fill
                      className="object-contain"
                      sizes="40px"
                    />
                  </div>
                ) : (
                  /* Placeholder chai (Chanh - Chưa có ảnh thật) */
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#FFF5E8] border border-dashed border-[#E8BA85] flex flex-col items-center justify-center shrink-0 p-0.5 text-center">
                    <span className="text-[8px] font-serif font-bold text-[#9A6328] leading-none">
                      {item.scentName}
                    </span>
                    <span className="text-[6px] text-ink/50 mt-0.5 font-medium">Mock</span>
                  </div>
                )}
                <div>
                <span className="font-bold text-ink sm:text-sm block sm:inline">
                  {item.scentName}
                </span>
                <span className="text-[11px] font-bold text-moss bg-moss/10 px-2 py-0.5 rounded-md ml-0 sm:ml-2 inline-block">
                  Dung tích {item.capacity}
                </span>
                {item.description && (
                  <p className="text-[11px] text-ink-muted mt-0.5 leading-snug">
                    {item.description}
                  </p>
                )}
              </div>
            </div>

            <span className="text-xs font-bold text-terracotta bg-terracotta/10 px-2 py-1 rounded-md shrink-0">
              Số lượng: {item.quantity}
            </span>
          </div>
        );
      })}
    </div>

      <div className="pt-2 border-t border-[#F0E0CA]/60 flex flex-wrap items-center gap-4 text-[11px] text-ink-muted">
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-moss" />
          Hộp quà thủ công &amp; nơ lụa
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-moss" />
          Hoa oải hương khô thơm
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-moss" />
          Thiệp viết tay Mộc Hương
        </span>
      </div>
    </div>
  );
};
