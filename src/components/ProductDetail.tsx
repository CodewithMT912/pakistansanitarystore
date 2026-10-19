"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";
import type { StoreProduct } from "@/data/store-data";
import {
  addProductToCart,
  readCart,
  saveCartAddedNotice,
  saveCart,
  type CartEntry,
} from "@/lib/cart";
import { readFavorites } from "@/lib/favorites";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export default function ProductDetail({
  product,
  products,
}: {
  product: StoreProduct;
  products: StoreProduct[];
}) {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [search, setSearch] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [variantSize, setVariantSize] = useState(product.variants?.[0]?.size ?? "");
  const selectedVariant =
    product.variants?.find((variant) => variant.size === variantSize) ??
    product.variants?.[0];

  useEffect(() => {
    const updateCounts = () => {
      setCartCount(
        readCart().reduce((total, item) => total + item.quantity, 0),
      );
      setFavoriteCount(readFavorites().length);
    };
    updateCounts();
    window.addEventListener("cart-change", updateCounts);
    window.addEventListener("favorites-change", updateCounts);
    window.addEventListener("storage", updateCounts);
    return () => {
      window.removeEventListener("cart-change", updateCounts);
      window.removeEventListener("favorites-change", updateCounts);
      window.removeEventListener("storage", updateCounts);
    };
  }, []);

  function addToCart() {
    const current: CartEntry[] = readCart();
    const updated = addProductToCart(current, product, quantity, selectedVariant);
    saveCart(updated);
    setCartCount(updated.reduce((total, item) => total + item.quantity, 0));
    saveCartAddedNotice(product.name);
    router.push("/cart");
  }

  return (
    <main className="product-detail-page">
      <SiteHeader
        cartCount={cartCount}
        favoriteCount={favoriteCount}
        search={search}
        onSearchChange={setSearch}
        initialProducts={products}
      />
      <div className="site-container product-detail-container">
        <nav className="product-detail-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/shop">Shop</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{product.name}</span>
        </nav>
        <section className="product-detail">
          <div className="product-detail-image">
            <Image
              src={product.image}
              alt={product.imageAlt}
              width={900}
              height={760}
              priority
            />
          </div>
          <div className="product-detail-copy">
            <p className="eyebrow">{product.category}</p>
            <h1>{product.name}</h1>
            {product.brand && (
              <p className="product-detail-brand">{product.brand}</p>
            )}
            {product.variants && selectedVariant && (
              <label className="product-detail-variant">
                Size
                <select
                  value={selectedVariant.size}
                  onChange={(event) => setVariantSize(event.target.value)}
                >
                  {product.variants.map((variant, index) => (
                    <option key={`${variant.size}-${index}`} value={variant.size}>
                      {variant.size}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <strong className="product-detail-price">
              {selectedVariant
                ? `Rs. ${selectedVariant.priceAmount.toLocaleString("en-PK")}`
                : product.price}
            </strong>
            <div className="product-detail-quantity">
              <span>Quantity</span>
              <div className="quantity-control" aria-label="Select product quantity">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                >
                  <FiMinus />
                </button>
                <span aria-live="polite">{quantity}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((current) => current + 1)}
                >
                  <FiPlus />
                </button>
              </div>
            </div>
            <button
              className="product-detail-add-cart"
              type="button"
              onClick={addToCart}
            >
              <FiShoppingCart aria-hidden="true" /> Add to Cart
            </button>
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
