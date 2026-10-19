import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { toStoreProduct } from "@/lib/product-utils";

const productColumns =
  "id, name, brand, category, price, image_url, description, variants, created_at";

export async function loadAdminProduct(id: string) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("products")
    .select(productColumns)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`Could not load product for editing: ${error.message}`);
  }
  if (!data) notFound();

  return toStoreProduct(data);
}
