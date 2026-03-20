const express = require("express");
const router = express.Router();
const { requireAuth, requireRole } = require("../middleware/auth");
const adminCafeController = require("../controllers/adminCafeController");

router.use(requireAuth);
router.use(requireRole(["cafe_admin", "super_admin"]));

router.get("/", adminCafeController.getCafe);
router.patch("/", adminCafeController.updateCafe);

module.exports = router;
