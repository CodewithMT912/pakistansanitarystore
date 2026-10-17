import { products } from "@/data/store-data";

export const FAVORITES_STORAGE_KEY = "new-pakistan-sanitary-favorites";

export function readFavorites(): string[] {
  const stored = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
  if (!stored) return [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(stored);
  } catch {
    return [];
  }

  if (!Array.isArray(parsed)) return [];
  return [...new Set(parsed)].filter(
    (productId): productId is string =>
      typeof productId === "string" &&
      products.some((product) => product.id === productId),
  );
}

export function saveFavorites(productIds: string[]) {
  const validIds = [...new Set(productIds)].filter((productId) =>
    products.some((product) => product.id === productId),
  );
  window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(validIds));
  window.dispatchEvent(new Event("favorites-change"));
  return validIds;
}

export function toggleFavorite(productId: string): string[] {
  const favorites = readFavorites();
  const updated = favorites.includes(productId)
    ? favorites.filter((id) => id !== productId)
    : [...favorites, productId];
  return saveFavorites(updated);
}
