import Link from "next/link";
import AdminProductForm from "@/app/admin/product-form";
import { brands, shopCategories } from "@/data/store-data";
import { loadAdminProduct } from "@/lib/admin-products";

export default async function EditAdminProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await loadAdminProduct(id);

  return (
    <>
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">Product details</p>
          <h1>Edit product</h1>
          <p>Update the information customers see in your shop.</p>
        </div>
        <Link className="admin-secondary-button" href="/admin">Back to products</Link>
      </div>
      <section className="admin-panel admin-edit-panel">
        <AdminProductForm
          brands={brands}
          categories={shopCategories.filter((category) => category.slug !== "all")}
          product={product}
        />
      </section>
    </>
  );
}
