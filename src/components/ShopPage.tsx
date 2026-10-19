"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import {
  brands,
  shopCategories,
  type ProductVariant,
  type StoreProduct,
} from "@/data/store-data";
import {
  addProductToCart,
  readCart,
  saveCartAddedNotice,
  saveCart,
  type CartEntry,
} from "@/lib/cart";
import { readFavorites } from "@/lib/favorites";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import SiteHero from "@/components/SiteHero";

export default function ShopPage({ products }: { products: StoreProduct[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") ?? "";
  const brandParam = searchParams.get("brand") ?? "";
  const searchParam = searchParams.get("search") ?? "";
  const selectedCategory = categoryParam || "all";
  const [cartCount, setCartCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [search, setSearch] = useState(searchParam);
  const [selectedVariantSizes, setSelectedVariantSizes] = useState<Record<string, string>>({});
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
  }, [products, search, selectedBrands, selectedCategory, sort]);

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

  function addToCart(
    product: StoreProduct,
    variant?: ProductVariant,
  ) {
    const current: CartEntry[] = readCart();
    const updated = addProductToCart(current, product, 1, variant);
    saveCart(updated);
    setCartCount(updated.reduce((total, item) => total + item.quantity, 0));
    saveCartAddedNotice(product.name);
    router.push("/cart");
  }

  return (
    <main className="shop-page">
      <SiteHeader
        cartCount={cartCount}
        favoriteCount={favoriteCount}
        search={search}
        onSearchChange={setSearch}
        initialProducts={products}
      />

      <nav className="shop-breadcrumb site-container" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Shop</span>
      </nav>
      <SiteHero />

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
              {visibleProducts.map((product) => {
                const selectedVariant =
                  product.variants?.find(
                    (variant) => variant.size === selectedVariantSizes[product.id],
                  ) ?? product.variants?.[0];
                return (
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
                      {product.variants && selectedVariant && (
                        <label className="shop-product-variant">
                          <span>Size</span>
                          <select
                            value={selectedVariant.size}
                            onChange={(event) =>
                              setSelectedVariantSizes((current) => ({
                                ...current,
                                [product.id]: event.target.value,
                              }))
                            }
                          >
                            {product.variants.map((variant, index) => (
                              <option key={`${variant.size}-${index}`} value={variant.size}>
                                {variant.size}
                              </option>
                            ))}
                          </select>
                        </label>
                      )}
                      <strong className="shop-product-price">
                        {selectedVariant
                          ? `Rs. ${selectedVariant.priceAmount.toLocaleString("en-PK")}`
                          : product.price}
                      </strong>
                      <div className="shop-product-rating">
                        <span aria-label={`${product.rating} out of 5 stars`}>★★★★★</span>
                        <small>{product.rating.toFixed(1)}</small>
                      </div>
                      <button
                        className="shop-add-cart"
                        type="button"
                        onClick={() => addToCart(product, selectedVariant)}
                      >
                        <FiShoppingCart aria-hidden="true" /> Add to Cart
                      </button>
                    </div>
                  </article>
                );
              })}
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
