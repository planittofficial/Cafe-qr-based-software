const User = require("../models/User");

function getCafeIdFromRequest(req) {
  if (req.user?.role === "super_admin") {
    return req.body.cafeId || req.query.cafeId || null;
  }
  return req.user?.cafeId || null;
}

function sanitizeUser(user) {
  return {
    id: String(user._id),
    username: user.username || null,
    email: user.email || null,
    role: user.role,
    cafeId: user.cafeId ? String(user.cafeId) : null,
  };
}

exports.listStaffUsers = async (req, res) => {
  try {
    const cafeId = getCafeIdFromRequest(req);
    if (!cafeId) return res.status(400).json({ message: "cafeId is required" });

    const users = await User.find({
      cafeId,
      role: { $in: ["kitchen", "staff", "cafe_admin"] },
    })
      .sort({ createdAt: -1 })
      .lean();

    return res.json(users.map((user) => sanitizeUser(user)));
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

exports.createStaffUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username && !email) {
      return res.status(400).json({ message: "username or email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "password is required" });
    }
    if (!role) {
      return res.status(400).json({ message: "role is required" });
    }

    const allowedRoles = ["kitchen", "staff", "cafe_admin"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "role is not allowed" });
    }

    const cafeId = getCafeIdFromRequest(req);
    if (!cafeId) {
      return res.status(400).json({ message: "cafeId is required for this role" });
    }

    const existing = await User.findOne(
      username ? { username: String(username).toLowerCase() } : { email: String(email).toLowerCase() }
    );
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      username: username ? String(username).toLowerCase() : undefined,
      email: email ? String(email).toLowerCase() : undefined,
      password,
      role,
      cafeId,
    });

    return res.status(201).json(sanitizeUser(user));
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

exports.resetStaffPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    if (!password) return res.status(400).json({ message: "password is required" });

    const cafeId = getCafeIdFromRequest(req);
    if (!cafeId) return res.status(400).json({ message: "cafeId is required" });

    const user = await User.findOne({ _id: id, cafeId, role: { $in: ["kitchen", "staff", "cafe_admin"] } });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = password;
    await user.save();

    return res.json({ message: "Password updated", user: sanitizeUser(user) });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteStaffUser = async (req, res) => {
  try {
    const { id } = req.params;
    const cafeId = getCafeIdFromRequest(req);
    if (!cafeId) return res.status(400).json({ message: "cafeId is required" });

    const user = await User.findOne({ _id: id, cafeId, role: { $in: ["kitchen", "staff", "cafe_admin"] } });
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne();
    return res.json({ message: "User deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
