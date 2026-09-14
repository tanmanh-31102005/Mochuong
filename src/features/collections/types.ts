import { Product, IncludedItem } from "@/features/products/types";

export interface CollectionItem extends Product {
  productType: "COLLECTION";
  includedItems: IncludedItem[];
}
