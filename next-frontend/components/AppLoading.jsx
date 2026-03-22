"use client";

/**
 * Full-area loading state — use after mount for client pages to avoid hydration issues.
 */
export function AppLoading({ label = "Loading", className = "" }) {
  return (
    <div
      className={`flex min-h-[40vh] flex-col items-center justify-center gap-6 px-6 py-16 ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative h-20 w-20">
        <div className="absolute inset-0 rounded-full border-2 border-orange-200/80" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-orange-500 border-r-amber-400" />
        <div className="absolute inset-3 rounded-full bg-gradient-to-br from-orange-400/30 to-amber-300/20 blur-sm" />
      </div>
      <div className="text-center">
        <p className="font-display text-lg font-semibold tracking-tight text-slate-800">{label}</p>
        <p className="mt-1 text-sm text-slate-500">Preparing your experience…</p>
      </div>
    </div>
  );
}

/** Compact inline loader for cards and sections. */
export function AppLoadingInline({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-3 py-8 ${className}`} role="status" aria-busy="true">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-200 border-t-orange-500" />
      <span className="text-sm font-medium text-slate-600">Loading…</span>
    </div>
  );
}
