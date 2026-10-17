"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
  FiMessageCircle,
  FiShield,
  FiTruck,
  FiUsers,
} from "react-icons/fi";
import { brands, reviews, type StoreProduct } from "@/data/store-data";
import { CartEntry, readCart } from "@/lib/cart";
import { readFavorites } from "@/lib/favorites";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

const brandLogoImages: Record<string, string> = {
  Stylo: "/stylo-logo.png",
  Shahzad: "/shahzad.png",
  "Faisal Sanitary": "/faisal-sanitary.png",
};
const heroImage =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90";
const helpImage =
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1500&q=85";
const aboutImage =
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85";

function Stars() {
  return (
    <span className="stars" aria-label="5 out of 5 stars">
      ★★★★★
    </span>
  );
}

export default function Storefront({ products }: { products: StoreProduct[] }) {
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [reviewStart, setReviewStart] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const visibleReviews = showAllReviews
    ? reviews
    : Array.from({ length: Math.min(3, reviews.length) }, (_, index) =>
        reviews[(reviewStart + index) % reviews.length],
      );

  useEffect(() => {
    const updateCart = () => setCart(readCart());
    updateCart();
    window.addEventListener("cart-change", updateCart);
    window.addEventListener("storage", updateCart);
    return () => {
      window.removeEventListener("cart-change", updateCart);
      window.removeEventListener("storage", updateCart);
    };
  }, []);

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

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <SiteHeader
        cartCount={cartCount}
        favoriteCount={favoriteIds.length}
        search={search}
        onSearchChange={setSearch}
        initialProducts={products}
      />

      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="hero-copy-inner">
            <p className="eyebrow">Premium sanitary ware & bathroom solutions</p>
            <h1>Modern Bathrooms<br />for a Better Tomorrow</h1>
            <p className="hero-description">
              High-quality sanitary products, elegant designs and reliable brands — all in one place.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/shop">Shop Now <FiArrowRight /></Link>
              <a className="button button-outline" href="#brands">Explore Brands</a>
            </div>
          </div>
        </div>
        <div className="hero-photo" style={{ backgroundImage: `url("${heroImage}")` }} role="img" aria-label="Calm contemporary bathroom with a freestanding bathtub" />
        <div className="hero-caption">Better spaces.<br />Better living.</div>
      </section>

      <section className="section site-container" id="brands">
        <div className="section-heading">
          <div>
            <h2>Shop by Brand</h2>
            <p>Explore products from trusted brands</p>
          </div>
          <Link className="text-link" href="/shop">Shop All Products <FiArrowRight /></Link>
        </div>
        <div className="brand-grid">
          {brands.map((brand) => {
            const logo = brandLogoImages[brand];
            return (
              <Link
                className="brand-card"
                href={`/shop?brand=${encodeURIComponent(brand)}`}
                key={brand}
                aria-label={`Shop ${brand} products`}
              >
                {logo ? (
                  <Image src={logo} alt={`${brand} logo`} width={180} height={72} />
                ) : (
                  <span className="brand-card-wordmark">{brand}</span>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="help-section site-container">
        <div className="help-banner" style={{ backgroundImage: `linear-gradient(90deg, rgba(0, 67, 69, .97) 0%, rgba(0, 67, 69, .9) 38%, rgba(0, 67, 69, .12) 76%), url("${helpImage}")` }}>
          <div className="help-copy">
            <h2>Need Help Choosing?</h2>
            <p>Our experts are here to help you find the perfect products for your bathroom.</p>
            <a href="https://wa.me/923001234567" className="whatsapp-link" target="_blank" rel="noreferrer">
              <FiMessageCircle /> Chat on WhatsApp
            </a>
          </div>
        </div>
        <div className="service-benefits">
          <div><FiShield /><span><strong>Premium Quality</strong><small>100% Original Products</small></span></div>
          <div><FiCheck /><span><strong>Secure Payments</strong><small>Safe & Reliable</small></span></div>
          <div><FiTruck /><span><strong>Fast Delivery</strong><small>Across Pakistan</small></span></div>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="site-container">
          <div className="about-heading">
            <p className="eyebrow">Our story</p>
            <h2>A Name You Can Trust</h2>
          </div>
          <div className="about-content">
            <div className="about-copy">
              <p className="about-story-text">At New Pakistan Sanitary Shop, our story is built on quality products, thoughtful service, and expert advice. We bring together dependable sanitary ware and timeless designs, helping you choose the right products to create a bathroom that feels right for your home.</p>
              <a href="#contact" className="button button-primary">Learn More <FiArrowRight /></a>
            </div>
            <div className="about-photo" style={{ backgroundImage: `url("${aboutImage}")` }} role="img" aria-label="Elegant finished bathroom interior" />
          </div>
          <div className="stats-panel">
            <div><FiUsers /><strong>10+</strong><span>Years of Experience</span></div>
            <div><FiUsers /><strong>5000+</strong><span>Happy Customers</span></div>
            <div><FiShield /><strong>100%</strong><span>Original Products</span></div>
          </div>
        </div>
      </section>

      <section className="section reviews-section site-container" id="reviews">
        <div className="section-heading">
          <div>
            <h2>What Our Customers Say</h2>
            <p>Real people. Real experiences.</p>
          </div>
          <div className="review-controls">
            {!showAllReviews && (
              <>
                <button type="button" aria-label="Previous reviews" onClick={() => setReviewStart((start) => (start - 1 + reviews.length) % reviews.length)}><FiChevronLeft /></button>
                <button type="button" aria-label="Next reviews" onClick={() => setReviewStart((start) => (start + 1) % reviews.length)}><FiChevronRight /></button>
              </>
            )}
            <button className="text-link" type="button" onClick={() => setShowAllReviews((showing) => !showing)}>
              {showAllReviews ? "Show Featured Reviews" : "View All Reviews"} <FiArrowRight />
            </button>
          </div>
        </div>
        <div className="review-grid">
          {visibleReviews.map((review) => (
            <article className="review-card" key={review.name}>
              <div className="review-person">
                <Image src={review.image} alt="" width={42} height={42} />
                <div><h3>{review.name}</h3><Stars /></div>
              </div>
              <p>“{review.quote}”</p>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
