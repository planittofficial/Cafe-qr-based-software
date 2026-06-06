/**
 * Fallback list used when the cafe has no admin-configured quickOrderCategories.
 * Once admins save their own list, this is no longer used.
 */
export const DEFAULT_QUICK_ORDER_CATEGORIES = [
  "All Day Favourite",
  "On The Rocks",
  "Cold Brews",
  "Special Cups of Coffee",
  "Hot Chocolate",
];

/**
 * Build a case-insensitive lookup map from an ordered category list.
 * Returns a Map<lowercaseName, canonicalName>.
 */
export function buildQuickOrderCategoryLookup(categories) {
  return new Map(
    (categories || []).map((category) => [category.toLowerCase(), category]),
  );
}

export function normalizeQuickOrderCategory(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

/**
 * Canonicalize a category value against a dynamic list of categories.
 * @param {string} value       – raw category value from a menu item
 * @param {Map}    [lookupMap] – result of buildQuickOrderCategoryLookup(); falls back to defaults
 */
export function canonicalizeQuickOrderCategory(value, lookupMap) {
  const normalized = normalizeQuickOrderCategory(value);
  if (!normalized) return null;
  const map = lookupMap || buildQuickOrderCategoryLookup(DEFAULT_QUICK_ORDER_CATEGORIES);
  return map.get(normalized.toLowerCase()) || null;
}

export function isQuickOrderMatchCategory(value, lookupMap) {
  return Boolean(canonicalizeQuickOrderCategory(value, lookupMap));
}

/**
 * Resolve the active category list from cafeInfo, falling back to defaults.
 */
export function resolveQuickOrderCategories(cafeInfo) {
  const list = Array.isArray(cafeInfo?.quickOrderCategories)
    ? cafeInfo.quickOrderCategories.filter((c) => typeof c === "string" && c.trim())
    : [];
  return list.length > 0 ? list : DEFAULT_QUICK_ORDER_CATEGORIES;
}
