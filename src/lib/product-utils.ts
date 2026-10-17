import type { StoreProduct } from "@/data/store-data";
import { shopCategories } from "@/data/store-data";
import type { ProductRow } from "@/lib/supabase/database.types";

export function toStoreProduct(row: ProductRow): StoreProduct {
  const priceAmount = Number(row.price);
  const categorySlug =
    shopCategories.find((category) => category.name === row.category)?.slug ??
    "all";

  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    category: row.category,
    categorySlug,
    price: `Rs. ${priceAmount.toLocaleString("en-PK")}`,
    priceAmount,
    rating: 4.8,
    reviewCount: 12,
    image: row.image_url,
    imageAlt: `${row.name}${row.brand ? ` by ${row.brand}` : ""}`,
    description: row.description ?? "",
  };
}
