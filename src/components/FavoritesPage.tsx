"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiHeart } from "react-icons/fi";
import { products } from "@/data/store-data";
import { readFavorites, toggleFavorite } from "@/lib/favorites";

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    const updateFavorites = () => setFavoriteIds(readFavorites());
    updateFavorites();
    window.addEventListener("favorites-change", updateFavorites);
    window.addEventListener("storage", updateFavorites);
    return () => {
      window.removeEventListener("favorites-change", updateFavorites);
      window.removeEventListener("storage", updateFavorites);
    };
  }, []);

  function removeFavorite(productId: string) {
    setFavoriteIds(toggleFavorite(productId));
  }

  const favoriteProducts = favoriteIds.flatMap((id) => {
    const product = products.find((item) => item.id === id);
    return product ? [product] : [];
  });

  return (
    <main className="favorites-page">
      <div className="site-container">
        <div className="favorites-header">
          <h1>Liked Products</h1>
          <Link className="favorites-back-link" href="/shop">
            <FiArrowLeft /> Continue shopping
          </Link>
        </div>

        {favoriteProducts.length > 0 ? (
          <div className="product-grid favorites-grid">
            {favoriteProducts.map((product) => (
              <article className="product-card favorites-product-card" key={product.id}>
                <div
                  className="product-image favorites-product-image"
                >
                  <Link
                    className="favorites-product-image-link"
                    href={`/product/${product.id}`}
                    aria-label={`View ${product.name}`}
                  >
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      fill
                      loading="eager"
                      sizes="(max-width: 640px) 50vw, (max-width: 1000px) 33vw, 16vw"
                    />
                  </Link>
                </div>
                <div className="product-details favorites-product-details">
                  <div className="favorites-product-copy">
                    <h3><Link href={`/product/${product.id}`}>{product.name}</Link></h3>
                    <p className="product-price">{product.price}</p>
                  </div>
                  <button
                    className="liked-product-toggle"
                    type="button"
                    aria-label={`Remove ${product.name} from liked products`}
                    aria-pressed="true"
                    onClick={() => removeFavorite(product.id)}
                  >
                    <FiHeart />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="favorites-empty">
            <p>You haven’t liked any products yet.</p>
            <Link href="/shop">Explore products</Link>
          </div>
        )}
      </div>
    </main>
  );
}
