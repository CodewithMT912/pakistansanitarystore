
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "../styles/hero.css";

const banners = [
  {
    image: "/banner1.jpeg",
    eyebrow: "WELCOME TO NEW PAKISTAN SANITARY",
    title: "A Modern Bathroom",
    highlight:  "Better Tomorrow.",
    description:
      "Discover quality sanitary fittings and modern designs that bring comfort and elegance to your home.",
  },
  {
    image: "/banner1.jpeg",
    eyebrow: "STYLE MEETS FUNCTION",
    title: "Upgrade Your",
    highlight: "Everyday Living.",
    description:
      "Explore stylish bathroom fittings designed to make every space feel special.",
  },
  {
    image: "/banner1.jpeg",
    eyebrow: "QUALITY YOU CAN TRUST",
    title: "Designed for Comfort.",
    highlight: "Made to Last.",
    description:
      "Find practical, beautiful sanitary solutions for your home and your lifestyle.",
  },
  {
    image: "/banner1.jpeg",
    eyebrow: "YOUR HOME, YOUR STYLE",
    title: "Create Your Dream",
    highlight: "Bathroom Today.",
    description:
      "Explore modern designs and find the right finishing touches for your bathroom.",
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % banners.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const activeBanner = banners[activeIndex];

  return (
    <section className="sanitary-hero">
      <div
        key={activeBanner.image}
        className="hero-background"
        style={{
          backgroundImage: `url("${activeBanner.image}")`,
        }}
      />

      <div className="hero-overlay" />

      <div className="container hero-content">
        <div key={activeIndex} className="hero-text">
          <span className="hero-eyebrow">
            <span className="hero-eyebrow-line" />
            {activeBanner.eyebrow}
          </span>

          <h1>
            {activeBanner.title}
            <br />
            <span>{activeBanner.highlight}</span>
          </h1>

          <p>{activeBanner.description}</p>

          <Link href="/products" className="hero-shop-button">
            Shop Now
            <i className="bi bi-arrow-right" />
          </Link>
        </div>
      </div>

      <div className="hero-indicators" aria-label="Choose banner">
        {banners.map((banner, index) => (
          <button
            key={banner.image}
            type="button"
            className={`hero-indicator ${
              activeIndex === index ? "active" : ""
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show banner ${index + 1}`}
            aria-current={activeIndex === index ? "true" : undefined}
          />
        ))}
      </div>

      <div className="hero-slide-count">
        <span>{String(activeIndex + 1).padStart(2, "0")}</span>
        <span className="hero-count-divider" />
        <span>{String(banners.length).padStart(2, "0")}</span>
      </div>
    </section>
  );
}
