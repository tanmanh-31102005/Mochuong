"use client";

import React from "react";
import Link from "next/link";
import { MOCK_PRODUCTS } from "@/features/products/data/mock-products";
import { ProductCard } from "@/features/products/components/ProductCard";

export default function WishlistPage() {
  const wishlistProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-moss-dark mb-8 pb-4 border-b border-beige">
          Sản Phẩm Yêu Thích Của Bạn
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {wishlistProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
