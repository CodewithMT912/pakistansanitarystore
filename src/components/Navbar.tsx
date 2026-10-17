
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "../styles/navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="sanitary-navbar">
      <div className="sanitary-nav-container">
        <Link href="/" className="sanitary-brand" onClick={closeMenu}>
          
          <Image
  src="/logo.png.jpeg"
  alt="New Pakistan Sanitary Logo"
  width={55}
  height={55}
  className="brand-logo"
/>


          <span className="brand-text">
            <span className="brand-name">NEW PAKISTAN</span>
            <span className="brand-subtitle">SANITARY </span>
          </span>
        </Link>

        <button
          className="sanitary-menu-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"}`}></i>
        </button>

        <div className={`sanitary-nav-content ${menuOpen ? "menu-open" : ""}`}>
          <div className="sanitary-nav-links">
            <Link href="/" onClick={closeMenu}>Home</Link>
            <Link href="/products" onClick={closeMenu}>Products</Link>
            <Link href="/about" onClick={closeMenu}>About Us</Link>
            <Link href="/contact" onClick={closeMenu}>Contact</Link>
          </div>

          <div className="sanitary-nav-actions">
            <Link href="/products" className="sanitary-search-link" aria-label="Search products">
              <i className="bi bi-search"></i>
            </Link>

            <Link href="/contact" className="sanitary-nav-cta" onClick={closeMenu}>
              Get in Touch <i className="bi bi-arrow-up-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
