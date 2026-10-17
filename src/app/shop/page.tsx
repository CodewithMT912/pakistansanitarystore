import { Suspense } from "react";
import ShopPage from "@/components/ShopPage";

export default function Shop() {
  return (
    <Suspense fallback={<main className="shop-loading" aria-label="Loading shop" />}>
      <ShopPage />
    </Suspense>
  );
}
