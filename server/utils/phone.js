/** Normalize phone for uniqueness (digits only, keep leading country digits). */
function normalizePhone(input) {
  if (!input || typeof input !== "string") return "";
  const digits = input.replace(/\D/g, "");
  return digits;
}

module.exports = { normalizePhone };
