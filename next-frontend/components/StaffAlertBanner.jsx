"use client";

export default function StaffAlertBanner({ message, variant = "info" }) {
  if (!message) return null;
  const cls =
    variant === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
      : variant === "warn"
        ? "border-amber-200 bg-amber-50 text-amber-900"
        : "border-sky-200 bg-sky-50 text-sky-900";
  return (
    <div className={`rounded-2xl border px-4 py-3 text-sm font-semibold shadow-sm ${cls}`} role="status">
      {message}
    </div>
  );
}
