import {
  products,
  type ProductVariant,
  type StoreProduct,
} from "@/data/store-data";

export const CART_STORAGE_KEY = "new-pakistan-sanitary-cart";
const CART_ADDED_NOTICE_KEY = "new-pakistan-sanitary-cart-added-notice";

export type CartEntry = {
  productId: string;
  quantity: number;
  variantSize?: string;
  priceAmount?: number;
  productSnapshot?: StoreProduct;
};

export type CartProduct = StoreProduct & {
  productId: string;
  quantity: number;
  variantSize?: string;
};

function isStoreProduct(value: unknown, productId: string): value is StoreProduct {
  if (typeof value !== "object" || value === null) return false;
  const product = value as Partial<StoreProduct>;
  return (
    product.id === productId &&
    typeof product.name === "string" &&
    typeof product.brand === "string" &&
    typeof product.price === "string" &&
    typeof product.priceAmount === "number" &&
    Number.isFinite(product.priceAmount) &&
    typeof product.image === "string" &&
    typeof product.imageAlt === "string"
  );
}

export function readCart(): CartEntry[] {
  try {
    const stored: unknown = JSON.parse(
      window.localStorage.getItem(CART_STORAGE_KEY) ?? "[]",
    );
    if (!Array.isArray(stored)) return [];
    return stored.filter((entry): entry is CartEntry => {
      if (typeof entry !== "object" || entry === null) return false;
      const candidate = entry as Partial<CartEntry>;
      if (
        typeof candidate.productId !== "string" ||
        typeof candidate.quantity !== "number" ||
        !Number.isInteger(candidate.quantity) ||
        candidate.quantity < 1
      ) {
        return false;
      }
      return (
        isStoreProduct(candidate.productSnapshot, candidate.productId) ||
        products.some(
          (product) =>
            product.id === candidate.productId ||
            product.variants?.some(
              (variant) => variant.productId === candidate.productId,
            ),
        )
      );
    });
  } catch {
    return [];
  }
}

export function addProductToCart(
  entries: CartEntry[],
  product: StoreProduct,
  quantity: number,
  variant?: ProductVariant,
): CartEntry[] {
  const variantSize = variant?.size;
  const existing = entries.find(
    (entry) =>
      entry.productId === product.id && entry.variantSize === variantSize,
  );
  if (existing) {
    return entries.map((entry) =>
      entry === existing
        ? { ...entry, quantity: entry.quantity + quantity }
        : entry,
    );
  }
  return [
    ...entries,
    {
      productId: product.id,
      quantity,
      ...(variant
        ? { variantSize: variant.size, priceAmount: variant.priceAmount }
        : {}),
      productSnapshot: product,
    },
  ];
}

export function cartEntryKey(entry: Pick<CartEntry, "productId" | "variantSize">) {
  return `${entry.productId}\u0000${entry.variantSize ?? ""}`;
}

export function getCartProducts(entries: CartEntry[]): CartProduct[] {
  return entries.flatMap((entry) => {
    const product =
      entry.productSnapshot ??
      products.find(
        (item) =>
          item.id === entry.productId ||
          item.variants?.some(
            (variant) => variant.productId === entry.productId,
          ),
      );
    if (!product) return [];
    const legacyVariant = product.variants?.find(
      (variant) => variant.productId === entry.productId,
    );
    const priceAmount =
      entry.priceAmount ?? legacyVariant?.priceAmount ?? product.priceAmount;
    const variantSize = entry.variantSize ?? legacyVariant?.size;
    return [{
      ...product,
      productId: entry.productId,
      price: formatPrice(priceAmount),
      priceAmount,
      quantity: entry.quantity,
      ...(variantSize ? { variantSize } : {}),
    }];
  });
}

export function saveCart(entries: CartEntry[]) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(entries));
  window.dispatchEvent(new Event("cart-change"));
}

export function saveCartAddedNotice(productName: string) {
  window.sessionStorage.setItem(CART_ADDED_NOTICE_KEY, productName);
}

export function takeCartAddedNotice(): string | null {
  const productName = window.sessionStorage.getItem(CART_ADDED_NOTICE_KEY);
  if (productName !== null) {
    window.sessionStorage.removeItem(CART_ADDED_NOTICE_KEY);
  }
  return productName;
}

export function formatPrice(amount: number): string {
  return `Rs. ${amount.toLocaleString("en-PK")}`;
}
