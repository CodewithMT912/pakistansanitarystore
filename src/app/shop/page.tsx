import { Suspense } from "react";
import ShopPage from "@/components/ShopPage";
import { getProducts } from "@/lib/products";

export default async function Shop() {
  const products = await getProducts();

  return (
    <Suspense fallback={<main className="shop-loading" aria-label="Loading shop" />}>
      <ShopPage products={products} />
    </Suspense>
  );
}
