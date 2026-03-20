const Cafe = require("../models/Cafe");

function getCafeIdFromRequest(req) {
  if (req.user?.role === "super_admin") {
    return req.query.cafeId || req.body.cafeId || null;
  }
  return req.user?.cafeId || null;
}

exports.getCafe = async (req, res) => {
  try {
    const cafeId = getCafeIdFromRequest(req);
    if (!cafeId) return res.status(400).json({ message: "cafeId is required" });

    const cafe = await Cafe.findById(cafeId).lean();
    if (!cafe) return res.status(404).json({ message: "Cafe not found" });
    return res.json(cafe);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

exports.updateCafe = async (req, res) => {
  try {
    const cafeId = getCafeIdFromRequest(req);
    if (!cafeId) return res.status(400).json({ message: "cafeId is required" });

    const updates = {};
    if (typeof req.body.name === "string") updates.name = req.body.name;
    if (typeof req.body.address === "string") updates.address = req.body.address;
    if (typeof req.body.logoUrl === "string") updates.logoUrl = req.body.logoUrl;
    if (typeof req.body.brandImageUrl === "string") updates.brandImageUrl = req.body.brandImageUrl;

    const cafe = await Cafe.findByIdAndUpdate(cafeId, updates, { new: true });
    if (!cafe) return res.status(404).json({ message: "Cafe not found" });

    return res.json(cafe);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
