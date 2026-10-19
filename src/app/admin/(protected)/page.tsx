import Link from "next/link";
import Image from "next/image";
import { deleteProduct } from "@/app/admin/actions";
import AdminProductForm from "@/app/admin/product-form";
import { brands, shopCategories } from "@/data/store-data";
import { requireAdmin } from "@/lib/admin-auth";
import { toStoreProduct } from "@/lib/product-utils";

const columns =
  "id, name, brand, category, price, image_url, description, variants, created_at";
const notices: Record<string, string> = {
  created: "Product created successfully.",
  updated: "Product updated successfully.",
  deleted: "Product deleted successfully.",
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string }>;
}) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("products")
    .select(columns)
    .order("created_at", { ascending: false });
  if (error) throw new Error(`Could not load admin products: ${error.message}`);

  const { notice } = await searchParams;
  const products = data.map(toStoreProduct);

  return (
    <>
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">Your shop</p>
          <h1>Products</h1>
          <p>Add, update, or remove products shown in your online shop.</p>
        </div>
        <span className="admin-product-count">{products.length} products</span>
      </div>

      {notice && notices[notice] && (
        <p className="admin-success" role="status">{notices[notice]}</p>
      )}

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <h2>Add a product</h2>
            <p>Choose a product photo and fill in its details.</p>
          </div>
        </div>
        <AdminProductForm
          brands={brands}
          categories={shopCategories.filter((category) => category.slug !== "all")}
        />
      </section>

      <section className="admin-panel admin-product-list">
        <div className="admin-panel-heading">
          <div>
            <h2>All products</h2>
            <p>These products are shown in your store.</p>
          </div>
        </div>
        {products.length ? (
          <div className="admin-table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Brand</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th><span className="admin-visually-hidden">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="admin-product-cell">
                        <Image src={product.image} alt="" width={44} height={40} />
                        <strong>{product.name}</strong>
                      </div>
                    </td>
                    <td>{product.brand || "—"}</td>
                    <td>{product.category}</td>
                    <td>
                      Rs. {product.priceAmount.toLocaleString("en-PK")}
                      {product.variants?.length
                        ? ` (${product.variants.length} sizes)`
                        : ""}
                    </td>
                    <td>
                      <div className="admin-row-actions">
                        <Link className="admin-secondary-button" href={`/admin/products/${encodeURIComponent(product.id)}/edit`}>Edit</Link>
                        <form action={deleteProduct}>
                          <input type="hidden" name="id" value={product.id} />
                          <button className="admin-delete-button" type="submit">Delete</button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="admin-empty">No products yet. Add your first product above.</p>
        )}
      </section>
    </>
  );
}
