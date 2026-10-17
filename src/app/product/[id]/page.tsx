import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { products } from "@/data/store-data";

export function generateStaticParams() {
  return products.map(({ id }) => ({ id }));
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<main className="product-detail-loading" aria-label="Loading product" />}>
      {params.then(({ id }) => <ProductPageContent productId={id} />)}
    </Suspense>
  );
}

function ProductPageContent({ productId }: { productId: string }) {
  const product = products.find((item) => item.id === productId);

  if (!product) notFound();

  return <ProductDetail product={product} />;
}
