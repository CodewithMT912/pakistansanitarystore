"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { brands, products, shopCategories } from "@/data/store-data";
import { readCart, saveCart } from "@/lib/cart";
import { readFavorites } from "@/lib/favorites";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

const shopHeroImage =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=90";

export default function ShopPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") ?? "";
  const brandParam = searchParams.get("brand") ?? "";
  const searchParam = searchParams.get("search") ?? "";
  const selectedCategory = categoryParam || "all";
  const [cartCount, setCartCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [search, setSearch] = useState(searchParam);
  const [brandSelection, setBrandSelection] = useState(() => ({
    param: brandParam,
    selected: brands.includes(brandParam) ? [brandParam] : [],
  }));
  const selectedBrands = useMemo(
    () =>
      brandSelection.param === brandParam
        ? brandSelection.selected
        : brands.includes(brandParam)
          ? [brandParam]
          : [],
    [brandParam, brandSelection],
  );
  const [sort, setSort] = useState("popularity");

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

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.categorySlug === selectedCategory;
      const matchesBrand =
        !selectedBrands.length || selectedBrands.includes(product.brand);
      const matchesSearch =
        !query ||
        product.id === query ||
        `${product.name} ${product.brand}`.toLowerCase().includes(query);
      return matchesCategory && matchesBrand && matchesSearch;
    });

    return filtered.sort((a, b) => {
      if (sort === "price-low") return a.priceAmount - b.priceAmount;
      if (sort === "price-high") return b.priceAmount - a.priceAmount;
      return b.rating - a.rating || b.reviewCount - a.reviewCount;
    });
  }, [search, selectedBrands, selectedCategory, sort]);

  const visibleProducts = filteredProducts;

  function toggleBrand(brand: string) {
    setBrandSelection({
      param: brandParam,
      selected: selectedBrands.includes(brand)
        ? selectedBrands.filter((selected) => selected !== brand)
        : [...selectedBrands, brand],
    });
  }

  function setCategory(category: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (category && category !== "all") params.set("category", category);
    else params.delete("category");
    const query = params.toString();
    router.replace(`/shop${query ? `?${query}` : ""}`, {
      scroll: false,
    });
  }

  function clearFilters() {
    setBrandSelection({ param: "", selected: [] });
    setSearch("");
    setSort("popularity");
    router.replace("/shop", { scroll: false });
  }

  function addToCart(productId: string) {
    const current = readCart();
    const existing = current.find((entry) => entry.productId === productId);
    const updated = existing
      ? current.map((entry) =>
          entry.productId === productId
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry,
        )
      : [...current, { productId, quantity: 1 }];
    saveCart(updated);
    setCartCount(updated.reduce((total, item) => total + item.quantity, 0));
  }

  return (
    <main className="shop-page">
      <SiteHeader
        cartCount={cartCount}
        favoriteCount={favoriteCount}
        search={search}
        onSearchChange={setSearch}
      />

      <section className="shop-hero">
        <div className="shop-hero-copy">
          <div className="shop-hero-copy-inner">
            <nav className="shop-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Shop</span>
            </nav>
            <p className="eyebrow">Quality for every space</p>
            <h1>Our Shop</h1>
            <p className="shop-hero-description">
              Discover dependable sanitary ware, bathroom essentials and
              everyday plumbing products for your home.
            </p>
          </div>
        </div>
        <div
          className="shop-hero-image"
          style={{ backgroundImage: `url("${shopHeroImage}")` }}
          role="img"
          aria-label="Bright, modern bathroom"
        >
          <span>Better Spaces<br />Better Living</span>
        </div>
      </section>

      <section className="shop-layout site-container" aria-label="Shop products">
        <aside className="shop-sidebar">
          <div className="shop-filter-section">
            <h2>Categories</h2>
            <ul className="shop-category-list">
              {shopCategories.map((category) => (
                <li key={category.slug}>
                  <button
                    type="button"
                    className={selectedCategory === category.slug ? "is-selected" : ""}
                    aria-pressed={selectedCategory === category.slug}
                    onClick={() =>
                      setCategory(
                        category.slug === "all" || selectedCategory === category.slug
                          ? "all"
                          : category.slug,
                      )
                    }
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="shop-filter-section shop-brand-filter">
            <h2>Brand</h2>
            {brands.map((brand) => (
              <label key={brand}>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                />
                <span>{brand}</span>
              </label>
            ))}
          </div>
          <button className="shop-clear-filters" type="button" onClick={clearFilters}>
            Clear Filters
          </button>
        </aside>

        <div className="shop-results">
          <div className="shop-toolbar">
            <p>
              Showing {visibleProducts.length} of {filteredProducts.length} results
            </p>
            <label className="shop-sort">
              <span>Sort:</span>
              <select
                value={sort}
                onChange={(event) => {
                  setSort(event.target.value);
                }}
              >
                <option value="popularity">Popularity</option>
                <option value="price-low">Price low to high</option>
                <option value="price-high">Price high to low</option>
              </select>
            </label>
          </div>

          {visibleProducts.length ? (
            <div className="shop-product-grid">
              {visibleProducts.map((product) => (
                <article className="shop-product-card" key={product.id}>
                  <div className="shop-product-image">
                    <Link href={`/product/${product.id}`} aria-label={`View ${product.name}`}>
                      <Image
                        src={product.image}
                        alt={product.imageAlt}
                        width={440}
                        height={320}
                      />
                    </Link>
                  </div>
                  <div className="shop-product-details">
                    <Link className="shop-product-material" href={`/product/${product.id}`}>{product.name}</Link>
                    {product.brand && (
                      <p className="shop-product-brand">{product.brand}</p>
                    )}
                    <strong className="shop-product-price">{product.price}</strong>
                    <div className="shop-product-rating">
                      <span aria-label={`${product.rating} out of 5 stars`}>★★★★★</span>
                      <small>{product.rating.toFixed(1)}</small>
                    </div>
                    <button
                      className="shop-add-cart"
                      type="button"
                      onClick={() => addToCart(product.id)}
                    >
                      <FiShoppingCart aria-hidden="true" /> Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="shop-no-results">No products match these filters.</p>
          )}

        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
