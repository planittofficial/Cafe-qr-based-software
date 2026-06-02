import { apiFetch } from "./api";

const MENU_CACHE_PREFIX = "qrdine:menu:";
const MENU_CACHE_TTL_MS = 5 * 60 * 1000;
const MENU_UPDATE_SIGNAL_PREFIX = "qrdine:menu:updated:";

function getMenuCacheKey(cafeId) {
  return `${MENU_CACHE_PREFIX}${cafeId}`;
}

export function getMenuUpdateSignalKey(cafeId) {
  return `${MENU_UPDATE_SIGNAL_PREFIX}${cafeId}`;
}

function writeMenuCache(cafeId, data) {
  if (!cafeId || typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(
      getMenuCacheKey(cafeId),
      JSON.stringify({ ts: Date.now(), data }),
    );
  } catch {
    // Ignore cache write errors.
  }
}

function broadcastMenuUpdate(cafeId) {
  if (!cafeId || typeof window === "undefined") return;
  try {
    window.localStorage.setItem(getMenuUpdateSignalKey(cafeId), String(Date.now()));
  } catch {
    // Ignore cross-tab notification errors.
  }
}

export function primeMenuCache(cafeId, data, options = {}) {
  if (!cafeId) return;
  writeMenuCache(cafeId, Array.isArray(data) ? data : []);
  if (options.broadcast) broadcastMenuUpdate(cafeId);
}

export function invalidateMenuCache(cafeId, options = {}) {
  if (!cafeId || typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(getMenuCacheKey(cafeId));
  } catch {
    // Ignore cache removal errors.
  }
  if (options.broadcast) broadcastMenuUpdate(cafeId);
}

export async function getMenuWithCache(cafeId, options = {}) {
  if (!cafeId) return [];

  const force = Boolean(options.force);
  const cacheKey = getMenuCacheKey(cafeId);

  if (!force && typeof window !== "undefined") {
    try {
      const raw = window.sessionStorage.getItem(cacheKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        const ts = Number(parsed?.ts || 0);
        if (Array.isArray(parsed?.data) && Date.now() - ts < MENU_CACHE_TTL_MS) {
          return parsed.data;
        }
      }
    } catch {
      // fall through to network
    }
  }

  const data = await apiFetch(`/api/menu/${cafeId}`);
  const list = Array.isArray(data) ? data : [];

  writeMenuCache(cafeId, list);

  return list;
}
