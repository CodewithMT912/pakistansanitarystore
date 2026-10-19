"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiHeadphones,
  FiMapPin,
  FiPlus,
  FiShield,
  FiStar,
  FiTarget,
  FiTruck,
  FiUsers,
} from "react-icons/fi";
import { readCart } from "@/lib/cart";
import { readFavorites } from "@/lib/favorites";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import SiteHero from "@/components/SiteHero";
const storyImage =
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85";
const faqImage =
  "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1000&q=85";

const values = [
  {
    title: "Our Mission",
    icon: FiShield,
    description:
      "To provide high-quality sanitary ware and bathroom solutions that bring comfort, style and value to every home and business in Pakistan.",
  },
  {
    title: "Our Vision",
    icon: FiTarget,
    description:
      "To become Pakistan’s most trusted sanitary shop, known for quality, reliability and excellent customer service.",
  },
  {
    title: "Our Values",
    icon: FiUsers,
    description:
      "Quality, Trust, Customer Satisfaction, Innovation and Long-Term Relationships.",
  },
];

const reasons = [
  { title: "Premium Quality Products", icon: FiStar },
  { title: "Trusted Brand Partner", icon: FiShield },
  { title: "Safe & Secure Delivery", icon: FiTruck },
  { title: "Customer Support", icon: FiHeadphones },
  { title: "Across Pakistan", icon: FiMapPin },
];

const faqs = [
  {
    question: "What is the delivery time for orders?",
    answer:
      "Delivery times vary by location and product availability. Our team will confirm an estimated delivery date when your order is placed.",
  },
  {
    question: "Do you offer installation services?",
    answer:
      "Please contact our team to discuss installation options and recommendations for your selected products.",
  },
  {
    question: "Are your products original and genuine?",
    answer:
      "Yes. We work with trusted brands and source genuine products for our customers.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Our team will share the currently available payment options when confirming your order.",
  },
  {
    question: "Can I return or exchange a product?",
    answer:
      "Return and exchange requests are reviewed according to the product’s condition and our store policy. Contact us with your order details for help.",
  },
  {
    question: "Do you provide warranty on products?",
    answer:
      "Warranty coverage depends on the brand and product. The applicable warranty details are provided with eligible products.",
  },
];

export default function AboutPage() {
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

      <div className="about-breadcrumb site-container" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">About Us</span>
      </div>

      <SiteHero />

      <section className="about-story-section">
        <div className="site-container about-story-layout">
          <div
            className="about-story-image"
            style={{ backgroundImage: `url("${storyImage}")` }}
            role="img"
            aria-label="Quality bathroom fittings in a finished bathroom"
          />
          <div className="about-story-copy">
            <p className="eyebrow">Our Story</p>
            <h2>A Journey of Quality and Trust</h2>
            <p>
              New Pakistan Sanitary Shop started with a simple vision — to
              provide high-quality sanitary ware and bathroom solutions to every
              home and business in Pakistan. What began as a small local shop has
              grown into a trusted name, serving thousands of happy customers,
              homeowners and builders across the country.
            </p>
            <p>
              Over the years, we have built our reputation on quality products,
              reliable service and a commitment to making modern living more
              comfortable and convenient.
            </p>
          </div>
        </div>
      </section>

      <section className="about-values-section">
        <div className="site-container">
          <div className="about-section-heading">
            <p className="eyebrow">Our Mission &amp; Values</p>
            <h2>Building Better Bathrooms</h2>
          </div>
          <div className="about-values-grid">
            {values.map(({ title, icon: Icon, description }) => (
              <article className="about-value-card" key={title}>
                <span className="about-value-icon"><Icon aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-reasons-section">
        <div className="site-container">
          <div className="about-section-heading">
            <p className="eyebrow">Why Choose Us</p>
            <h2>More Than Just a Store</h2>
          </div>
          <div className="about-reasons-grid">
            {reasons.map(({ title, icon: Icon }) => (
              <article className="about-reason-card" key={title}>
                <span className="about-reason-icon"><Icon aria-hidden="true" /></span>
                <h3>{title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-faq-section">
        <div className="site-container">
          <div className="about-faq-intro">
            <div>
              <p className="eyebrow">Frequently Asked Questions</p>
              <h2>Got Questions? We’re Here to Help</h2>
              <p>
                Find quick answers to the most common questions about our
                products, services and ordering process.
              </p>
            </div>
            <div
              className="about-faq-image"
              style={{ backgroundImage: `url("${faqImage}")` }}
              role="img"
              aria-label="Modern bathroom basin and fittings"
            />
          </div>
          <div className="about-faq-list">
            {faqs.map(({ question, answer }) => (
              <details className="about-faq-item" key={question}>
                <summary>
                  <span>{question}</span>
                  <FiPlus aria-hidden="true" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
