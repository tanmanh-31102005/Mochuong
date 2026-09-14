"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { WishlistState } from "../types";
import { Product } from "@/features/products/types";

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) => {
        set((state) => {
          if (state.items.some((i) => i.id === product.id)) return state;
          return { items: [...state.items, product] };
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== productId),
        }));
      },

      toggleItem: (product: Product) => {
        set((state) => {
          const exists = state.items.some((i) => i.id === product.id);
          if (exists) {
            return { items: state.items.filter((i) => i.id !== product.id) };
          }
          return { items: [...state.items, product] };
        });
      },

      hasItem: (productId: string) => {
        return get().items.some((i) => i.id === productId);
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "moc-huong-wishlist",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
