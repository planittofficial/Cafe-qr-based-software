/**
 * Per-table visit session so a new party at the same physical table does not see prior orders.
 * Stored in sessionStorage (tab-scoped; clears when the tab closes).
 */

export function visitStorageKey(cafeId, tableNumber) {
  return `qrdine:visit:${cafeId}:table:${tableNumber}`;
}

export function getOrCreateVisitId(cafeId, tableNumber) {
  if (typeof window === "undefined" || !cafeId || tableNumber == null) return "";
  try {
    const key = visitStorageKey(cafeId, tableNumber);
    let v = sessionStorage.getItem(key);
    if (!v) {
      v = crypto.randomUUID();
      sessionStorage.setItem(key, v);
    }
    return v;
  } catch {
    return "";
  }
}

export function rotateVisitId(cafeId, tableNumber) {
  if (typeof window === "undefined" || !cafeId || tableNumber == null) return "";
  try {
    const key = visitStorageKey(cafeId, tableNumber);
    const v = crypto.randomUUID();
    sessionStorage.setItem(key, v);
    return v;
  } catch {
    return "";
  }
}

export function peekVisitId(cafeId, tableNumber) {
  if (typeof window === "undefined" || !cafeId || tableNumber == null) return "";
  try {
    return sessionStorage.getItem(visitStorageKey(cafeId, tableNumber)) || "";
  } catch {
    return "";
  }
}
