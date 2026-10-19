"use client";

import { createClient } from "@/lib/supabase/client";
import { toStoreProduct } from "@/lib/product-utils";

const productColumns =
  "id, name, brand, category, price, image_url, description, variants, created_at";

export async function getBrowserProducts() {
  const { data, error } = await createClient()
    .from("products")
    .select(productColumns)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Could not load products from Supabase: ${error.message}`);
  }

  return data.map(toStoreProduct);
}
