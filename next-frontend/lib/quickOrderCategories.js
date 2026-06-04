export const QUICK_ORDER_CATEGORY_ORDER = [
  "All Day Favourite",
  "On The Rocks",
  "Cold Brews",
  "Special Cups of Coffee",
  "Hot Chocolate",
];

const QUICK_ORDER_CATEGORY_LOOKUP = new Map(
  QUICK_ORDER_CATEGORY_ORDER.map((category) => [category.toLowerCase(), category]),
);

export function normalizeQuickOrderCategory(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

export function canonicalizeQuickOrderCategory(value) {
  const normalized = normalizeQuickOrderCategory(value);
  if (!normalized) return null;
  return QUICK_ORDER_CATEGORY_LOOKUP.get(normalized.toLowerCase()) || null;
}

export function isQuickOrderMatchCategory(value) {
  return Boolean(canonicalizeQuickOrderCategory(value));
}
