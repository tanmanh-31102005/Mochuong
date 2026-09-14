import { Product } from "@/features/products/types";

export interface CartItem {
  id: string; // Unique key: either product.id or product.id + sorted selectedProductIds
  product: Product;
  quantity: number;
  selectedProductIds?: string[];
  selectedProducts?: Product[];
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  voucherCode: string | null;
  discountPercent: number; // e.g., 10 for 10%
  fixedDiscount: number; // e.g., 30000 VND
  shippingFee: number;
  freeShippingThreshold: number;

  // Add-ons state
  handwrittenCard: {
    enabled: boolean;
    message: string;
  };
  deliverySchedule: {
    enabled: boolean;
    date: string;
    timeSlot: string;
  };

  // Actions
  addItem: (
    product: Product,
    quantity?: number,
    selectedProductIds?: string[]
  ) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
  toggleCart: () => void;
  applyVoucher: (code: string) => { success: boolean; message: string };
  removeVoucher: () => void;

  // Add-ons actions
  setHandwrittenCard: (card: { enabled: boolean; message?: string }) => void;
  setDeliverySchedule: (schedule: {
    enabled: boolean;
    date?: string;
    timeSlot?: string;
  }) => void;

  // Computed helpers
  getTotalItems: () => number;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getFinalShippingFee: () => number;
  hasGiftSet: () => boolean;
  getHandwrittenCardFee: () => number;
  getDeliveryScheduleFee: () => number;
  getAddonTotalFee: () => number;
  getFinalTotal: () => number;
}
