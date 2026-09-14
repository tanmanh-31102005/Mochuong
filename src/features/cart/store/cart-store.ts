"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartState, CartItem } from "../types";
import { Product } from "@/features/products/types";
import { MOCK_PRODUCTS } from "@/features/products/data/mock-products";
import { PRODUCT_SHARED_CONFIG } from "@/core/config/product-shared.config";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      voucherCode: null,
      discountPercent: 0,
      fixedDiscount: 0,
      shippingFee: 30000, // Phí ship mặc định 30k
      freeShippingThreshold: 300000, // Freeship từ 300k

      // Add-ons state
      handwrittenCard: {
        enabled: false,
        message: "",
      },
      deliverySchedule: {
        enabled: false,
        date: "",
        timeSlot: "slot-morning",
      },

      addItem: (product: Product, quantity = 1, selectedProductIds?: string[]) => {
        set((state) => {
          // Xây dựng cart item ID duy nhất
          let cartItemId = product.id;
          let selectedProducts: Product[] | undefined = undefined;

          if (selectedProductIds && selectedProductIds.length > 0) {
            const sortedIds = [...selectedProductIds].sort();
            cartItemId = `${product.id}__${sortedIds.join("_")}`;
            selectedProducts = sortedIds
              .map((id) => MOCK_PRODUCTS.find((p) => p.id === id))
              .filter((p): p is Product => Boolean(p));
          }

          const existingIndex = state.items.findIndex(
            (item) => item.id === cartItemId || (item.id === product.id && (!selectedProductIds || selectedProductIds.length === 0))
          );

          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex] = {
              ...updatedItems[existingIndex],
              quantity: updatedItems[existingIndex].quantity + quantity,
            };
            return { items: updatedItems, isOpen: true };
          }

          const newItem: CartItem = {
            id: cartItemId,
            product,
            quantity,
            selectedProductIds,
            selectedProducts,
          };

          return {
            items: [...state.items, newItem],
            isOpen: true,
          };
        });
      },

      removeItem: (cartItemId: string) => {
        set((state) => ({
          items: state.items.filter(
            (item) => item.id !== cartItemId && item.product?.id !== cartItemId
          ),
        }));
      },

      updateQuantity: (cartItemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(cartItemId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === cartItemId || item.product?.id === cartItemId
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => {
        set({
          items: [],
          voucherCode: null,
          discountPercent: 0,
          fixedDiscount: 0,
          handwrittenCard: { enabled: false, message: "" },
          deliverySchedule: { enabled: false, date: "", timeSlot: "slot-morning" },
        });
      },

      setIsOpen: (isOpen: boolean) => set({ isOpen }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      applyVoucher: (code: string) => {
        const cleanCode = code.trim().toUpperCase();
        if (cleanCode === "MOCHUONG10") {
          set({
            voucherCode: cleanCode,
            discountPercent: 10,
            fixedDiscount: 0,
          });
          return { success: true, message: "Áp dụng thành công mã giảm giá 10%!" };
        } else if (cleanCode === "FREESHIP") {
          set({
            voucherCode: cleanCode,
            discountPercent: 0,
            fixedDiscount: 30000,
          });
          return { success: true, message: "Áp dụng thành công mã miễn phí vận chuyển 30.000đ!" };
        } else if (cleanCode === "TRIAN50K") {
          set({
            voucherCode: cleanCode,
            discountPercent: 0,
            fixedDiscount: 50000,
          });
          return { success: true, message: "Áp dụng mã tri ân giảm 50.000đ cho đơn hàng!" };
        }

        return {
          success: false,
          message: "Mã giảm giá không hợp lệ. Hãy thử: MOCHUONG10 hoặc FREESHIP",
        };
      },

      removeVoucher: () => {
        set({ voucherCode: null, discountPercent: 0, fixedDiscount: 0 });
      },

      // Add-on mutations
      setHandwrittenCard: (card) => {
        set((state) => ({
          handwrittenCard: {
            ...state.handwrittenCard,
            ...card,
            message: card.message !== undefined ? card.message : state.handwrittenCard.message,
          },
        }));
      },

      setDeliverySchedule: (schedule) => {
        set((state) => ({
          deliverySchedule: {
            ...state.deliverySchedule,
            ...schedule,
          },
        }));
      },

      // Computed helpers
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.giaKhuyenMai ?? item.product.gia;
          return total + price * item.quantity;
        }, 0);
      },

      getDiscountAmount: () => {
        const subtotal = get().getSubtotal();
        const { discountPercent, fixedDiscount } = get();

        if (discountPercent > 0) {
          return Math.round((subtotal * discountPercent) / 100);
        }
        return Math.min(fixedDiscount, subtotal);
      },

      getFinalShippingFee: () => {
        const subtotal = get().getSubtotal();
        const { shippingFee, freeShippingThreshold, voucherCode } = get();

        if (subtotal >= freeShippingThreshold || voucherCode === "FREESHIP") {
          return 0;
        }
        return subtotal > 0 ? shippingFee : 0;
      },

      hasGiftSet: () => {
        return get().items.some(
          (item) =>
            item.product.productType === "GIFT_SET" ||
            item.product.productKind === "GIFT_SET_CUSTOM" ||
            item.product.productKind === "GIFT_SET_FIXED"
        );
      },

      getHandwrittenCardFee: () => {
        const { handwrittenCard } = get();
        if (!handwrittenCard.enabled) return 0;
        // Miễn phí nếu giỏ hàng có Gift Set
        if (get().hasGiftSet()) {
          return PRODUCT_SHARED_CONFIG.addons.handwrittenCard.giftSetFee; // 0đ
        }
        // Phụ thu 10.000đ nếu chỉ có sản phẩm lẻ / combo / collection
        return PRODUCT_SHARED_CONFIG.addons.handwrittenCard.standardFee; // 10.000đ
      },

      getDeliveryScheduleFee: () => {
        const { deliverySchedule } = get();
        if (!deliverySchedule.enabled) return 0;

        const { fees } = PRODUCT_SHARED_CONFIG.addons.deliverySchedule;

        // Kiểm tra xem ngày chọn có phải cuối tuần (Thứ 7 = 6, Chủ nhật = 0)
        if (deliverySchedule.date) {
          const dateObj = new Date(deliverySchedule.date);
          const dayOfWeek = dateObj.getDay();
          if (dayOfWeek === 0 || dayOfWeek === 6) {
            return fees.weekend; // 20.000đ
          }
        }

        // Kiểm tra khung giờ
        if (deliverySchedule.timeSlot === "slot-early") {
          return fees.earlyMorning; // 15.000đ
        }
        if (deliverySchedule.timeSlot === "slot-evening") {
          return fees.evening; // 15.000đ
        }
        if (deliverySchedule.timeSlot === "slot-weekend") {
          return fees.weekend; // 20.000đ
        }

        return fees.standard; // 0đ
      },

      getAddonTotalFee: () => {
        return get().getHandwrittenCardFee() + get().getDeliveryScheduleFee();
      },

      getFinalTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscountAmount();
        const shipping = get().getFinalShippingFee();
        const addonTotal = get().getAddonTotalFee();
        return Math.max(0, subtotal - discount + shipping + addonTotal);
      },
    }),
    {
      name: "mochuong-cart-storage",
      storage: createJSONStorage(() => localStorage),
      version: 1,
      migrate: (persistedState: unknown) => {
        if (!persistedState || typeof persistedState !== "object") return persistedState as CartState;
        const state = persistedState as Partial<CartState>;
        if (Array.isArray(state.items)) {
          state.items = state.items.map((item: CartItem, idx: number) => {
            if (!item.id) {
              const selectedIds = item.selectedProductIds?.length
                ? `__${[...item.selectedProductIds].sort().join("_")}`
                : "";
              item.id = `${item.product?.id || `item-${idx}`}${selectedIds || `_${idx}`}`;
            }
            return item;
          });
        }
        return state as CartState;
      },
      onRehydrateStorage: () => (state) => {
        if (state?.items && Array.isArray(state.items)) {
          state.items = state.items.map((item: CartItem, idx: number) => {
            if (!item.id) {
              const selectedIds = item.selectedProductIds?.length
                ? `__${[...item.selectedProductIds].sort().join("_")}`
                : "";
              item.id = `${item.product?.id || `item-${idx}`}${selectedIds || `_${idx}`}`;
            }
            return item;
          });
        }
      },
      partialize: (state) => ({
        items: state.items,
        voucherCode: state.voucherCode,
        discountPercent: state.discountPercent,
        fixedDiscount: state.fixedDiscount,
        handwrittenCard: state.handwrittenCard,
        deliverySchedule: state.deliverySchedule,
      }),
    }
  )
);
