import { products } from "@/data/store-data";

export const CART_STORAGE_KEY = "new-pakistan-sanitary-cart";

export type CartEntry = {
  productId: string;
  quantity: number;
};

export type CartProduct = (typeof products)[number] & {
  quantity: number;
};

export function readCart(): CartEntry[] {
  try {
    const stored: unknown = JSON.parse(
      window.localStorage.getItem(CART_STORAGE_KEY) ?? "[]",
    );
    if (!Array.isArray(stored)) return [];
    return stored.filter(
      (entry): entry is CartEntry =>
        typeof entry === "object" &&
        entry !== null &&
        "productId" in entry &&
        typeof entry.productId === "string" &&
        "quantity" in entry &&
        typeof entry.quantity === "number" &&
        Number.isInteger(entry.quantity) &&
        entry.quantity > 0 &&
        products.some((product) => product.id === entry.productId),
    );
  } catch {
    return [];
  }
}

export function getCartProducts(entries: CartEntry[]): CartProduct[] {
  return entries.flatMap((entry) => {
    const product = products.find((item) => item.id === entry.productId);
    return product ? [{ ...product, quantity: entry.quantity }] : [];
  });
}

export function saveCart(entries: CartEntry[]) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(entries));
  window.dispatchEvent(new Event("cart-change"));
}

export function formatPrice(amount: number): string {
  return `Rs. ${amount.toLocaleString("en-PK")}`;
}
