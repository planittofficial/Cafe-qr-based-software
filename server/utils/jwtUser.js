let jwt = null;
try {
  // eslint-disable-next-line global-require
  jwt = require("jsonwebtoken");
} catch {
  jwt = null;
}

const User = require("../models/User");

/**
 * Verify JWT and return a minimal user object for tenant checks (socket, etc.).
 * @param {string} token
 * @returns {Promise<{ id: string, role: string, cafeId: string | null } | null>}
 */
async function getUserFromSocketToken(token) {
  if (!jwt || !token || !process.env.JWT_SECRET) return null;
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub).select("role cafeId email username");
    if (!user) return null;
    return {
      id: String(user._id),
      role: user.role,
      cafeId: user.cafeId ? String(user.cafeId) : null,
    };
  } catch {
    return null;
  }
}

module.exports = { getUserFromSocketToken };
