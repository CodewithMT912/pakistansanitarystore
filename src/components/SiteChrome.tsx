"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  FiHeart,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiMenu,
  FiMessageCircle,
  FiPhone,
  FiSearch,
  FiShield,
  FiShoppingCart,
  FiTruck,
  FiX,
} from "react-icons/fi";
import { products } from "@/data/store-data";

type SiteHeaderProps = {
  cartCount: number;
  favoriteCount: number;
  search: string;
  onSearchChange: (value: string) => void;
};

export function SiteHeader({
  cartCount,
  favoriteCount,
  search,
  onSearchChange,
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchAreaRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const matchingProducts = search.trim()
    ? products
        .filter((product) =>
          `${product.name} ${product.brand}`
            .toLowerCase()
            .includes(search.trim().toLowerCase()),
        )
        .slice(0, 5)
    : [];

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!searchAreaRef.current?.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setSearchOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = search.trim();
    if (query) {
      setSearchOpen(false);
      router.push(`/shop?search=${encodeURIComponent(query)}`);
    }
  }

  function openProductResult(productId: string) {
    setSearchOpen(false);
    onSearchChange("");
    router.push(`/product/${productId}`);
  }

  return (
    <>
      <div className="topbar">
        <div className="site-container topbar-inner">
          <span><FiTruck /> Free delivery in nearby areas</span>
          <span><FiShield /> 100% Original Products</span>
          <a href="tel:+923001234567"><FiPhone /> +92 300 1234567</a>
        </div>
      </div>

      <header className="site-header">
        <div className="site-container header-inner">
          <Link className="brand" href="/" aria-label="New Pakistan Sanitary Shop home">
            <Image
              src="/logo.png.jpeg"
              alt=""
              width={48}
              height={48}
              className="brand-logo"
              priority
            />
            <span className="brand-copy">
              <strong>New Pakistan</strong>
              <small>Sanitary Shop</small>
            </span>
          </Link>

          <button
            className="mobile-menu-button"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>

          <nav className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
            <Link href="/#home" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
            <Link href="/categories" onClick={() => setMenuOpen(false)}>Categories</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </nav>

          <div className="header-actions">
            <div className="search-area" ref={searchAreaRef}>
              <form className="search-box" role="search" onSubmit={submitSearch}>
                <label className="sr-only" htmlFor="site-product-search">Search products</label>
                <input
                  id="site-product-search"
                  value={search}
                  onFocus={() => setSearchOpen(true)}
                  onChange={(event) => {
                    onSearchChange(event.target.value);
                    setSearchOpen(true);
                  }}
                  placeholder="Search for products..."
                />
                <button type="submit" aria-label="Search products"><FiSearch aria-hidden="true" /></button>
              </form>
              {searchOpen && search.trim() && (
                <div className="search-results" role="region" aria-label="Product search results">
                  {matchingProducts.length ? matchingProducts.map((product) => (
                    <button
                      type="button"
                      className="search-result"
                      key={product.id}
                      onClick={() => openProductResult(product.id)}
                    >
                      <Image src={product.image} alt="" width={48} height={48} />
                      <span>
                        <strong>{product.name}</strong>
                        {product.brand && <small>{product.brand}</small>}
                      </span>
                      <b>{product.price}</b>
                    </button>
                  )) : <p className="search-empty">No matching products.</p>}
                  <Link className="search-all-results" href={`/shop?search=${encodeURIComponent(search.trim())}`}>
                    See all search results
                  </Link>
                </div>
              )}
            </div>
            <Link
              className="icon-button favorites-link"
              href="/favorites"
              aria-label={`View ${favoriteCount} liked products`}
            >
              <FiHeart />
            </Link>
            <Link className="icon-button cart-button" href="/cart" aria-label={`Shopping cart with ${cartCount} items`}>
              <FiShoppingCart />
              <span className="cart-count">{cartCount}</span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function submitNewsletter(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email.trim()) setSubscribed(true);
  }

  return (
    <>
      <section className="newsletter">
        <div className="site-container newsletter-inner">
          <div className="newsletter-copy">
            <FiMail />
            <div><h2>Subscribe to Our Newsletter</h2><p>Get the latest updates on new arrivals, special offers and more.</p></div>
          </div>
          <form className="newsletter-form" onSubmit={submitNewsletter}>
            <label className="sr-only" htmlFor="newsletter-email">Your email address</label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setSubscribed(false);
              }}
            />
            <button type="submit">{subscribed ? "Subscribed" : "Subscribe"}</button>
          </form>
        </div>
      </section>

      <footer className="site-footer" id="contact">
        <div className="site-container footer-main">
          <div className="footer-brand">
            <Link className="brand footer-logo" href="/#home">
              <Image src="/logo.png.jpeg" alt="" width={46} height={46} />
              <span className="brand-copy"><strong>New Pakistan</strong><small>Sanitary Shop</small></span>
            </Link>
            <p>Better bathrooms. A better tomorrow.</p>
            <div className="social-links">
              <Link href="/#contact" aria-label="Facebook"><span>f</span></Link>
              <Link href="/#contact" aria-label="Instagram"><FiInstagram /></Link>
              <Link href="/#contact" aria-label="WhatsApp"><FiMessageCircle /></Link>
            </div>
          </div>
          <div className="footer-column">
            <h2>Quick Links</h2>
            <Link href="/#home">Home</Link><Link href="/shop">Shop</Link><Link href="/categories">Categories</Link><Link href="/about">About Us</Link>
          </div>
          <div className="footer-column">
            <h2>Customer Service</h2>
            <Link href="/#contact">Shipping Policy</Link><Link href="/#contact">Returns & Refund Policy</Link><Link href="/#contact">Track Your Order</Link><Link href="/#contact">Terms & Conditions</Link><Link href="/#contact">Privacy Policy</Link>
          </div>
          <div className="footer-column contact-column">
            <h2>Contact Us</h2>
            <a href="tel:+923001234567"><FiPhone /> +92 300 1234567</a>
            <a href="mailto:info@newpakistansanitaryshop.pk"><FiMail /> info@newpakistansanitaryshop.pk</a>
            <span><FiMapPin /> Main Boulevard, Lahore, Pakistan</span>
          </div>
          <div className="footer-column app-column">
            <h2>Download Our App</h2>
            <p>Get exclusive offers on mobile</p>
            <div className="app-badges">
              <span><small>GET IT ON</small>Google Play</span>
              <span><small>Download on the</small>App Store</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom site-container">
          <span>© 2025 New Pakistan Sanitary Shop. All rights reserved.</span>
          <div><Link href="/#contact">Privacy Policy</Link><i /> <Link href="/#contact">Terms & Conditions</Link></div>
        </div>
      </footer>
    </>
  );
}
