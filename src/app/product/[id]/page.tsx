import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { getProduct, getProducts } from "@/lib/products";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <main className="product-detail-loading" aria-label="Loading product" />
      }
    >
      <ProductPageContent params={params} />
    </Suspense>
  );
}

async function ProductPageContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, products] = await Promise.all([getProduct(id), getProducts()]);

  if (!product) notFound();

  return <ProductDetail product={product} products={products} />;
}
