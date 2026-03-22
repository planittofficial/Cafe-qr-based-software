/**
 * Multi-tenant access: non–super-admin users may only act on their own cafe.
 * @param {{ role: string, cafeId?: string | null }} user - req.user from auth middleware
 * @param {string|import("mongoose").Types.ObjectId} cafeId - target cafe id
 * @returns {boolean}
 */
function canAccessCafe(user, cafeId) {
  if (!user || cafeId == null || cafeId === "") return false;
  if (user.role === "super_admin") return true;
  if (!user.cafeId) return false;
  return String(user.cafeId) === String(cafeId);
}

/**
 * @param {import("express").Response} res
 * @returns {import("express").Response}
 */
function forbiddenTenant(res) {
  return res.status(403).json({ message: "Forbidden: cannot access this cafe" });
}

module.exports = { canAccessCafe, forbiddenTenant };
