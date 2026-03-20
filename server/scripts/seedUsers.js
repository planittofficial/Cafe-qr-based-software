const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const User = require("../models/User");
const Cafe = require("../models/Cafe");

async function ensureCafe() {
  let cafe = await Cafe.findOne({ name: "CR" });
  if (!cafe) {
    cafe = await Cafe.create({
      name: "CR",
      address: "Main Street",
      numberOfTables: 12,
      logoUrl: "",
      brandImageUrl: "",
    });
  }
  return cafe;
}

async function upsertUser({ username, password, role, cafeId }) {
  const existing = await User.findOne({ username });
  if (existing) {
    let changed = false;
    if (existing.role !== role) {
      existing.role = role;
      changed = true;
    }
    if (role !== "super_admin" && cafeId && String(existing.cafeId || "") !== String(cafeId)) {
      existing.cafeId = cafeId;
      changed = true;
    }
    if (changed) await existing.save();
    return { user: existing, created: false };
  }

  const user = await User.create({
    username,
    password,
    role,
    cafeId: role === "super_admin" ? null : cafeId,
  });
  return { user, created: true };
}

async function main() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not set in server/.env");
  }

  await mongoose.connect(process.env.MONGODB_URI);
  const cafe = await ensureCafe();

  const users = [
    { username: "superadmin", password: "SuperAdmin@123", role: "super_admin" },
    { username: "admin", password: "Admin@123", role: "cafe_admin", cafeId: cafe._id },
    { username: "chef", password: "Chef@123", role: "kitchen", cafeId: cafe._id },
    { username: "waiter", password: "Waiter@123", role: "staff", cafeId: cafe._id },
  ];

  console.log("Seeding users for cafe:", cafe.name, String(cafe._id));

  for (const item of users) {
    const result = await upsertUser(item);
    console.log(result.created ? "Created" : "Updated", item.username, "->", item.role);
  }

  console.log("\nTest credentials:");
  console.log("superadmin / SuperAdmin@123");
  console.log("admin / Admin@123");
  console.log("chef / Chef@123");
  console.log("waiter / Waiter@123");

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
