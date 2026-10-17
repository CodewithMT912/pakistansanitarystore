import { cacheLife, cacheTag } from "next/cache";
import type { StoreProduct } from "@/data/store-data";
import { toStoreProduct } from "@/lib/product-utils";
import { createClient } from "@/lib/supabase/server";

const productColumns =
  "id, name, brand, category, price, image_url, description, created_at";

export async function getProducts(): Promise<StoreProduct[]> {
  "use cache";
  cacheTag("products");
  cacheLife("minutes");

  const client = createClient();
  const { data, error } = await client
    .from("products")
    .select(productColumns)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Could not load products from Supabase: ${error.message}`);
  }

  return data.map(toStoreProduct);
}

export async function getProduct(id: string): Promise<StoreProduct | null> {
  "use cache";
  cacheTag("products");
  cacheLife("minutes");

  const client = createClient();
  const { data, error } = await client
    .from("products")
    .select(productColumns)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`Could not load product "${id}" from Supabase: ${error.message}`);
  }

  return data ? toStoreProduct(data) : null;
}
