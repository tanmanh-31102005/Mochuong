"use client";

import React, { use } from "react";
import { notFound } from "next/navigation";
import { MOCK_PRODUCTS } from "@/features/products/data/mock-products";
import { CollectionDetailView } from "@/features/collections/components/CollectionDetailView";

/**
 * TUYẾN ĐƯỜNG: /bo-suu-tap/[slug]
 * CHUYÊN BIỆT: Chi tiết từng combo bộ sưu tập
 */
export default function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const product = MOCK_PRODUCTS.find(
    (p) =>
      p.slug === slug &&
      (p.productType === "COLLECTION" || p.id.startsWith("combo-"))
  );

  if (!product) {
    notFound();
  }

  return <CollectionDetailView product={product} />;
}
