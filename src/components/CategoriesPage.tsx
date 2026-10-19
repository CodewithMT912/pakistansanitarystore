"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiBox,
  FiCircle,
  FiDroplet,
  FiHome,
  FiTool,
} from "react-icons/fi";
import { categories } from "@/data/store-data";
import { readCart } from "@/lib/cart";
import { readFavorites } from "@/lib/favorites";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import SiteHero from "@/components/SiteHero";

const categoryIcons = [
  FiHome,
  FiDroplet,
  FiCircle,
  FiBox,
  FiTool,
  FiCircle,
  FiTool,
  FiBox,
  FiTool,
];

const categoryDescriptions = [
  "Modern toilets and flush tanks for every home.",
  "Elegant basins and sinks for your space.",
  "Quality taps, showers and wall cocks for a refreshing bathroom.",
  "Practical cabinets to complete your bathroom.",
  "Reliable water motors for everyday use.",
  "Durable manhole covers.",
  "Geyser fittings, pipes and plumbing fittings.",
  "Popular and Victor pipes, fittings and other products.",
  "Tools and hardware for home and trade.",
];

export default function CategoriesPage() {
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    const updateCart = () =>
      setCartCount(readCart().reduce((total, item) => total + item.quantity, 0));
    const updateFavorites = () => setFavoriteCount(readFavorites().length);
    updateCart();
    updateFavorites();
    window.addEventListener("cart-change", updateCart);
    window.addEventListener("favorites-change", updateFavorites);
    window.addEventListener("storage", updateCart);
    window.addEventListener("storage", updateFavorites);
    return () => {
      window.removeEventListener("cart-change", updateCart);
      window.removeEventListener("favorites-change", updateFavorites);
      window.removeEventListener("storage", updateCart);
      window.removeEventListener("storage", updateFavorites);
    };
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <SiteHeader
        cartCount={cartCount}
        favoriteCount={favoriteCount}
        search={search}
        onSearchChange={setSearch}
      />

      <SiteHero />

      <section className="categories-page-section">
        <div className="site-container">
          <div className="categories-page-heading">
            <p className="eyebrow">Our Categories</p>
            <h2>Shop by Category</h2>
            <p>Explore our product categories and find the perfect solution for your space.</p>
          </div>
          <div className="categories-page-grid">
            {categories.map((category, index) => {
              const Icon = categoryIcons[index];
              return (
                <Link
                  className="categories-page-card"
                  href={`/shop?category=${encodeURIComponent(category.shopCategory)}`}
                  key={category.name}
                >
                  <div
                    className="categories-page-card-image"
                    style={{ backgroundImage: `url("${category.image}")` }}
                    role="img"
                    aria-label={category.imageAlt}
                  />
                  <div className="categories-page-card-content">
                    <span className="categories-page-card-icon"><Icon aria-hidden="true" /></span>
                    <h3>{category.name}</h3>
                    <p>{categoryDescriptions[index]}</p>
                    <span className="categories-page-card-arrow" aria-hidden="true">
                      <FiArrowRight />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
