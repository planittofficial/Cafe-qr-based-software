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
    if (typeof req.body.taxPercent !== "undefined") updates.taxPercent = Number(req.body.taxPercent || 0);
    if (typeof req.body.discountType === "string") updates.discountType = req.body.discountType;
    if (typeof req.body.discountValue !== "undefined") {
      updates.discountValue = Number(req.body.discountValue || 0);
    } else if (typeof req.body.discountPercent !== "undefined") {
      updates.discountType = "percent";
      updates.discountValue = Number(req.body.discountPercent || 0);
    }

    const cafe = await Cafe.findByIdAndUpdate(cafeId, updates, { new: true });
    if (!cafe) return res.status(404).json({ message: "Cafe not found" });

    return res.json(cafe);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
