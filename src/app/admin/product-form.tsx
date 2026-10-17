"use client";

import Image from "next/image";
import { useActionState } from "react";
import {
  createProduct,
  updateProduct,
  type AdminFormState,
} from "@/app/admin/actions";
import type { StoreProduct } from "@/data/store-data";

type Option = { name: string };

export default function AdminProductForm({
  brands,
  categories,
  product,
}: {
  brands: string[];
  categories: Option[];
  product?: StoreProduct;
}) {
  const action = product
    ? updateProduct.bind(null, product.id)
    : createProduct;
  const [state, formAction, pending] = useActionState<AdminFormState, FormData>(
    action,
    {},
  );

  return (
    <form className="admin-form admin-product-form" action={formAction}>
      <label>
        Product image {product ? "(optional; leave empty to keep the current image)" : ""}
        <input
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          required={!product}
        />
      </label>
      {product?.image && (
        <Image
          className="admin-current-image"
          src={product.image}
          alt={`Current image of ${product.name}`}
          width={90}
          height={72}
        />
      )}
      <label>
        Product name
        <input name="name" type="text" maxLength={200} defaultValue={product?.name} required />
      </label>
      <label>
        Price (Rs.)
        <input name="price" type="number" min="0" step="0.01" defaultValue={product?.priceAmount} required />
      </label>
      <label>
        Brand
        <select name="brand" defaultValue={product?.brand ?? ""} required>
          <option value="" disabled>Select a brand</option>
          {brands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
        </select>
      </label>
      <label>
        Category
        <select name="category" defaultValue={product?.category ?? ""} required>
          <option value="" disabled>Select a category</option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>{category.name}</option>
          ))}
        </select>
      </label>
      {state.error && <p className="admin-form-error" role="alert">{state.error}</p>}
      <button className="admin-primary-button" type="submit" disabled={pending}>
        {pending ? "Saving..." : product ? "Save changes" : "Create product"}
      </button>
    </form>
  );
}
