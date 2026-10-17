"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiSend,
} from "react-icons/fi";
import { readCart } from "@/lib/cart";
import { readFavorites } from "@/lib/favorites";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

const phoneNumber = "+923001171152";
const whatsappUrl = "https://wa.me/923001171152";
const locationQuery = "Gulshan Ravi, Lahore, Pakistan";
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationQuery)}`;
const contactHeroImage =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=90";
const helpBannerImage =
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1500&q=85";

const contactMethods = [
  {
    title: "Phone",
    detail: "+92 300 1171152",
    note: "Mon - Sat, 9:00 AM - 8:00 PM",
    icon: FiPhone,
    href: `tel:${phoneNumber}`,
  },
  {
    title: "Email",
    detail: "info@newpakistansanitaryshop.pk",
    note: "We reply within 24 hours",
    icon: FiMail,
    href: "mailto:info@newpakistansanitaryshop.pk",
  },
  {
    title: "Our Location",
    detail: locationQuery,
    note: "Visit our store for assistance",
    icon: FiMapPin,
    href: mapUrl,
  },
  {
    title: "WhatsApp",
    detail: "+92 300 1171152",
    note: "Chat with us anytime",
    icon: FiMessageCircle,
    href: whatsappUrl,
  },
];

export default function ContactPage() {
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

  function submitMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = [
      "New contact message",
      `Name: ${String(formData.get("name") ?? "").trim()}`,
      `Email: ${String(formData.get("email") ?? "").trim()}`,
      `Subject: ${String(formData.get("subject") ?? "").trim()}`,
      `Message: ${String(formData.get("message") ?? "").trim()}`,
    ].join("\n");
    window.open(`${whatsappUrl}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <SiteHeader
        cartCount={cartCount}
        favoriteCount={favoriteCount}
        search={search}
        onSearchChange={setSearch}
      />

      <div className="contact-breadcrumb site-container" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Contact</span>
      </div>

      <section className="contact-hero">
        <div className="contact-hero-copy">
          <div className="contact-hero-inner">
            <h1>Get In Touch</h1>
            <p>
              Have a question, need support, or want to discuss your project?
              We’re here to help. Reach out to us and we’ll get back to you as
              soon as possible.
            </p>
            <a className="button button-primary" href="#contact-form">
              <FiMail /> Send Us a Message <FiArrowRight />
            </a>
          </div>
        </div>
        <div
          className="contact-hero-image"
          style={{ backgroundImage: `url("${contactHeroImage}")` }}
          role="img"
          aria-label="Modern bathroom with bathtub and basin"
        >
          <span>Better Spaces<br />Better Living</span>
        </div>
      </section>

      <section className="contact-main-section site-container">
        <div className="contact-info-column">
          <div className="contact-section-heading">
            <p className="eyebrow">Contact Information</p>
            <h2>Get In Touch With Us</h2>
            <p>You can reach us through any of the following methods. We’re always happy to help!</p>
          </div>
          <div className="contact-method-grid">
            {contactMethods.map(({ title, detail, note, icon: Icon, href }) => (
              <a
                className="contact-method-card"
                href={href}
                key={title}
                target={title === "Our Location" || title === "WhatsApp" ? "_blank" : undefined}
                rel={title === "Our Location" || title === "WhatsApp" ? "noreferrer" : undefined}
              >
                <span className="contact-method-icon"><Icon aria-hidden="true" /></span>
                <h3>{title}</h3>
                <span className="contact-method-detail">{detail}</span>
                <span className="contact-method-note">
                  {title === "Our Location" ? <FiArrowUpRight aria-hidden="true" /> : null}
                  {note}
                </span>
              </a>
            ))}
          </div>
        </div>

        <form className="contact-form" id="contact-form" onSubmit={submitMessage}>
          <h2>Send Us a Message</h2>
          <p>Fill out the form below and we’ll get back to you shortly.</p>
          <label>
            Full Name *
            <input name="name" type="text" autoComplete="name" placeholder="Enter your full name" required />
          </label>
          <label>
            Email Address *
            <input name="email" type="email" autoComplete="email" placeholder="Enter your email address" required />
          </label>
          <label>
            Subject *
            <select name="subject" defaultValue="" required>
              <option value="" disabled>Select a subject</option>
              <option value="Product inquiry">Product inquiry</option>
              <option value="Order support">Order support</option>
              <option value="Delivery question">Delivery question</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label>
            Message *
            <textarea name="message" rows={4} placeholder="Write your message here..." required />
          </label>
          <button className="button button-primary contact-submit-button" type="submit">
            <FiSend /> Send Message
          </button>
        </form>
      </section>

      <section className="contact-map-section site-container">
        <div className="contact-map-card">
          <span className="contact-method-icon"><FiMapPin aria-hidden="true" /></span>
          <h2>Visit Our Store</h2>
          <p>We are located in Lahore, Pakistan. Feel free to visit our store for product viewing and assistance.</p>
          <a className="contact-map-address" href={mapUrl} target="_blank" rel="noreferrer">
            <FiMapPin /> {locationQuery}
          </a>
          <a className="button button-primary contact-directions-button" href={mapUrl} target="_blank" rel="noreferrer">
            <FiArrowUpRight /> Get Directions
          </a>
        </div>
        <iframe
          className="contact-map-frame"
          title="Map showing Gulshan Ravi, Lahore, Pakistan"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(locationQuery)}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      <section className="contact-help-section site-container">
        <div
          className="contact-help-banner"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(4, 59, 61, .98) 0%, rgba(4, 59, 61, .91) 48%, rgba(4, 59, 61, .14) 100%), url("${helpBannerImage}")`,
          }}
        >
          <div className="contact-help-copy">
            <p className="eyebrow">Need Help?</p>
            <h2>We’re Here to Assist You</h2>
            <p>Have a question or need product advice? Contact us now — we’re just a message away.</p>
            <a className="button button-outline contact-whatsapp-button" href={whatsappUrl} target="_blank" rel="noreferrer">
              <FiMessageCircle /> Chat on WhatsApp <FiArrowRight />
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
