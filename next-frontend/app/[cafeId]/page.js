"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { apiFetch } from "../../lib/api";

export default function CafeEntryPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const cafeId = params.cafeId;

  const tableNumber = useMemo(() => {
    const t = searchParams.get("table");
    return t ? parseInt(t, 10) : null;
  }, [searchParams]);

  const [cafe, setCafe] = useState(null);
  const [splash, setSplash] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setSplash(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await apiFetch(`/api/cafe/${cafeId}`);
        if (!cancelled) setCafe(data);
      } catch (e) {
        if (!cancelled) setError(e.message || "Failed to load cafe");
      }
    }
    if (cafeId) load();
    return () => {
      cancelled = true;
    };
  }, [cafeId]);

  useEffect(() => {
    if (splash) return;
    if (!tableNumber) {
      setError("Missing table number (?table=1)");
      return;
    }
    if (cafeId) {
      router.replace(`/${cafeId}/menu?table=${tableNumber}`);
    }
  }, [splash, cafeId, tableNumber, router]);

  if (splash) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: cafe?.brandImageUrl ? `url(${cafe.brandImageUrl})` : "none",
        }}
      >
        <div className="min-h-screen w-full bg-black/50 backdrop-blur-sm flex items-center justify-center px-6">
          <div className="text-center text-white">
            {cafe?.logoUrl ? (
              <img src={cafe.logoUrl} alt={cafe?.name || "Cafe"} className="mx-auto mb-4 h-20 w-20 rounded-2xl object-cover border border-white/30" />
            ) : (
              <div className="mx-auto mb-4 h-20 w-20 rounded-2xl bg-white/20 flex items-center justify-center text-3xl font-extrabold">
                Q
              </div>
            )}
            <div className="text-4xl font-extrabold">{cafe?.name || "QRDine"}</div>
            <div className="mt-2 text-sm font-semibold text-white/80">Loading menu…</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="text-center">
        <div className="text-lg font-semibold text-gray-700">Redirecting to menu…</div>
        {error && <div className="mt-3 text-red-600 font-semibold">{error}</div>}
      </div>
    </div>
  );
}
