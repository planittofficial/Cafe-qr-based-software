const mongoose = require("mongoose");
const Cafe = require("../models/Cafe");
const Table = require("../models/Table");

function getCafeIdFromRequest(req) {
  if (req.user?.role === "super_admin") {
    return req.query.cafeId || req.body.cafeId || null;
  }
  return req.user?.cafeId || null;
}

exports.listTables = async (req, res) => {
  try {
    const cafeId = getCafeIdFromRequest(req);
    if (!cafeId) return res.status(400).json({ message: "cafeId is required" });

    const tables = await Table.find({ cafeId })
      .sort({ tableNumber: 1 })
      .lean();

    return res.json(tables);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

exports.generateTables = async (req, res) => {
  try {
    const cafeId = getCafeIdFromRequest(req);
    if (!cafeId) return res.status(400).json({ message: "cafeId is required" });

    const cafe = await Cafe.findById(cafeId);
    if (!cafe) return res.status(404).json({ message: "Cafe not found" });

    const requestedCount = Number(req.body.numberOfTables || cafe.numberOfTables || 0);
    if (!requestedCount || requestedCount < 1) {
      return res.status(400).json({ message: "numberOfTables must be >= 1" });
    }

    if (cafe.numberOfTables !== requestedCount) {
      cafe.numberOfTables = requestedCount;
      await cafe.save();
    }

    const existing = await Table.find({ cafeId }).select("tableNumber").lean();
    const existingNumbers = new Set(existing.map((t) => t.tableNumber));

    const toCreate = [];
    for (let i = 1; i <= requestedCount; i += 1) {
      if (!existingNumbers.has(i)) {
        toCreate.push({ cafeId: new mongoose.Types.ObjectId(cafeId), tableNumber: i });
      }
    }

    if (toCreate.length > 0) {
      await Table.insertMany(toCreate);
    }

    const tables = await Table.find({ cafeId }).sort({ tableNumber: 1 }).lean();
    return res.json({ created: toCreate.length, total: tables.length, tables });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
