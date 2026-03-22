export function setCssVarsFromCafe(cafe) {
  if (typeof document === "undefined" || !cafe) return;
  const root = document.documentElement;
  const primary = cafe.primaryColor?.trim();
  const accent = cafe.accentColor?.trim();
  if (primary) {
    root.style.setProperty("--venue-primary", primary);
    root.style.setProperty("--color-orange-500", primary);
  }
  if (accent) {
    root.style.setProperty("--venue-accent", accent);
    root.style.setProperty("--color-amber-400", accent);
  }
}

export function clearVenueTheme() {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.style.removeProperty("--venue-primary");
  root.style.removeProperty("--venue-accent");
}
