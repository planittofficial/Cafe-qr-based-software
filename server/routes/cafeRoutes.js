const express = require("express");
const router = express.Router();
const cafeController = require("../controllers/cafeController");
const { requireAuth, requireRole } = require("../middleware/auth");

router.get("/", cafeController.listCafes);
router.post("/", cafeController.createCafe);
router.get("/:id", cafeController.getCafeById);
router.post("/reset-sessions", cafeController.resetTableSessions);
router.patch("/:id", requireAuth, requireRole(["super_admin"]), cafeController.updateCafe);
router.delete("/:id", requireAuth, requireRole(["super_admin"]), cafeController.deleteCafe);

module.exports = router;

