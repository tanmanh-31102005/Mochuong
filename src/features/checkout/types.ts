export type ShippingMethod = "standard" | "express" | "store";

export type PaymentMethod = "cod" | "bank" | "vnpay" | "momo" | "card";

export interface CheckoutFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  notes: string;
}

export interface OrderConfirmation {
  orderCode: string;
  total: number;
  createdAt: string;
  customer: CheckoutFormData;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
}
