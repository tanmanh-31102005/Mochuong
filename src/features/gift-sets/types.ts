import { Product, IncludedItem } from "@/features/products/types";

export interface GiftSetItem extends Product {
  productType: "GIFT_SET";
  includedItems: IncludedItem[];
  boxStyle?: string;
  hasGreetingCard?: boolean;
}
