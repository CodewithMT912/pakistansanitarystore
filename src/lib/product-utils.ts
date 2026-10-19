import type { StoreProduct } from "@/data/store-data";
import { shopCategories } from "@/data/store-data";
import type { ProductRow } from "@/lib/supabase/database.types";

export function toStoreProduct(row: ProductRow): StoreProduct {
  const priceAmount = Number(row.price);
  if (!Number.isFinite(priceAmount) || priceAmount < 0) {
    throw new Error(`Product "${row.id}" has an invalid price.`);
  }
  const variants = row.variants.map((variant) => {
    const variantPrice = Number(variant.priceAmount);
    if (
      typeof variant.size !== "string" ||
      !variant.size.trim() ||
      !Number.isFinite(variantPrice) ||
      variantPrice < 0 ||
      (variant.productId !== undefined && typeof variant.productId !== "string")
    ) {
      throw new Error(`Product "${row.id}" has an invalid size or variant price.`);
    }
    return {
      size: variant.size.trim(),
      priceAmount: variantPrice,
      ...(variant.productId ? { productId: variant.productId } : {}),
    };
  });
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
    ...(variants.length ? { variants } : {}),
  };
}
