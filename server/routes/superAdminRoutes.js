const express = require("express");
const router = express.Router();
const { requireAuth, requireRole } = require("../middleware/auth");
const superAdminController = require("../controllers/superAdminController");

router.use(requireAuth);
router.use(requireRole(["super_admin"]));

router.get("/overview", superAdminController.getOverview);

module.exports = router;
