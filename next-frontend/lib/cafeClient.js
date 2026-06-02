import { apiFetch } from "./api";

const CAFE_CACHE_PREFIX = "qrdine:cafe:";
const CAFE_CACHE_TTL_MS = 5 * 60 * 1000;
const CAFE_UPDATE_SIGNAL_PREFIX = "qrdine:cafe:updated:";

function getCafeCacheKey(cafeId) {
  return `${CAFE_CACHE_PREFIX}${cafeId}`;
}

export function getCafeUpdateSignalKey(cafeId) {
  return `${CAFE_UPDATE_SIGNAL_PREFIX}${cafeId}`;
}

function writeCafeCache(cafeId, data) {
  if (!cafeId || typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(
      getCafeCacheKey(cafeId),
      JSON.stringify({ ts: Date.now(), data }),
    );
  } catch {
    // Ignore cache write errors.
  }
}

function broadcastCafeUpdate(cafeId) {
  if (!cafeId || typeof window === "undefined") return;
  try {
    window.localStorage.setItem(getCafeUpdateSignalKey(cafeId), String(Date.now()));
  } catch {
    // Ignore cross-tab notification errors.
  }
}

export function primeCafeCache(cafeId, data, options = {}) {
  if (!cafeId) return;
  writeCafeCache(cafeId, data);
  if (options.broadcast) broadcastCafeUpdate(cafeId);
}

export function invalidateCafeCache(cafeId, options = {}) {
  if (!cafeId || typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(getCafeCacheKey(cafeId));
  } catch {
    // Ignore cache removal errors.
  }
  if (options.broadcast) broadcastCafeUpdate(cafeId);
}

export async function getCafeWithCache(cafeId, options = {}) {
  if (!cafeId) return null;

  const force = Boolean(options.force);
  const cacheKey = getCafeCacheKey(cafeId);

  if (!force && typeof window !== "undefined") {
    try {
      const raw = window.sessionStorage.getItem(cacheKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        const ts = Number(parsed?.ts || 0);
        if (parsed?.data && Date.now() - ts < CAFE_CACHE_TTL_MS) {
          return parsed.data;
        }
      }
    } catch {
      // Ignore cache read errors and fall back to network.
    }
  }

  const data = await apiFetch(`/api/cafe/${cafeId}`);

  writeCafeCache(cafeId, data);

  return data;
}
