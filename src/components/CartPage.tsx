"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import {
  CartEntry,
  formatPrice,
  getCartProducts,
  readCart,
  saveCart,
} from "@/lib/cart";

export default function CartPage() {
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const items = getCartProducts(cart);
  const total = items.reduce(
    (sum, item) => sum + item.priceAmount * item.quantity,
    0,
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

  function changeQuantity(productId: string, quantity: number) {
    if (quantity < 1) {
      saveCart(cart.filter((entry) => entry.productId !== productId));
      setCart((current) => current.filter((entry) => entry.productId !== productId));
      return;
    }
    const updated = cart.map((entry) =>
      entry.productId === productId ? { ...entry, quantity } : entry,
    );
    setCart(updated);
    saveCart(updated);
  }

  function placeOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const lines = items.map(
      (item) =>
        `• ${item.name} x ${item.quantity} — ${formatPrice(item.priceAmount * item.quantity)}`,
    );
    const message = [
      "New Pakistan Sanitary Shop Order",
      "",
      ...lines,
      "",
      `Grand total: ${formatPrice(total)}`,
      "",
      `Name: ${customerName.trim()}`,
      `Phone: ${phone.trim()}`,
      `Address: ${address.trim()}`,
    ].join("\n");
    window.open(
      `https://wa.me/923704060104?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <main className="cart-page">
      <header className="site-header">
        <div className="site-container cart-header-inner">
          <Link className="brand" href="/">
            <Image src="/logo.png.jpeg" alt="" width={45} height={45} />
            <span className="brand-copy"><strong>New Pakistan</strong><small>Sanitary Shop</small></span>
          </Link>
          <Link href="/" className="cart-back-link"><FiArrowLeft /> Continue shopping</Link>
        </div>
      </header>
      <section className="site-container cart-content">
        <p className="eyebrow">Your selection</p>
        <h1>Shopping Cart</h1>
        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <Link href="/shop" className="button button-primary">Browse Products</Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <article className="cart-item" key={item.id}>
                  <Image src={item.image} alt={item.imageAlt} width={130} height={110} />
                  <div className="cart-item-name">
                    <h2>{item.name}</h2>
                    <span>{formatPrice(item.priceAmount)} each</span>
                  </div>
                  <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                    <button type="button" aria-label="Decrease quantity" onClick={() => changeQuantity(item.id, item.quantity - 1)}><FiMinus /></button>
                    <span>{item.quantity}</span>
                    <button type="button" aria-label="Increase quantity" onClick={() => changeQuantity(item.id, item.quantity + 1)}><FiPlus /></button>
                  </div>
                  <strong className="cart-line-total">{formatPrice(item.priceAmount * item.quantity)}</strong>
                  <button className="remove-item" type="button" aria-label={`Remove ${item.name}`} onClick={() => changeQuantity(item.id, 0)}><FiTrash2 /></button>
                </article>
              ))}
            </div>
            <div className="cart-summary">
              <span>Grand total</span><strong>{formatPrice(total)}</strong>
            </div>
            {!checkoutOpen ? (
              <button className="button button-primary checkout-button" type="button" onClick={() => setCheckoutOpen(true)}>
                Proceed to Checkout
              </button>
            ) : (
              <form className="checkout-form" onSubmit={placeOrder}>
                <h2>Delivery details</h2>
                <label>
                  Full name
                  <input required autoComplete="name" value={customerName} onChange={(event) => setCustomerName(event.target.value)} />
                </label>
                <label>
                  Phone number
                  <input required type="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} />
                </label>
                <label>
                  Full address
                  <textarea required rows={3} autoComplete="street-address" value={address} onChange={(event) => setAddress(event.target.value)} />
                </label>
                <button className="button button-primary checkout-button" type="submit">Place Order on WhatsApp</button>
              </form>
            )}
          </>
        )}
      </section>
    </main>
  );
}
