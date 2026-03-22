/**
 * Indian mobile: exactly 10 digits, first digit 6–9.
 * Returns normalized digits-only string or null if invalid.
 */
export function normalizeIndianMobile(input) {
  if (input == null) return null;
  const digits = String(input).replace(/\D/g, "");
  if (digits.length !== 10) return null;
  if (!/^[6-9]/.test(digits)) return null;
  return digits;
}

export function isValidIndianMobile(input) {
  return normalizeIndianMobile(input) !== null;
}

export function formatIndianMobileInput(raw) {
  return String(raw || "").replace(/\D/g, "").slice(0, 10);
}
