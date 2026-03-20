const express = require("express");
const router = express.Router();
const { requireAuth, requireRole } = require("../middleware/auth");
const adminTableController = require("../controllers/adminTableController");

router.use(requireAuth);
router.use(requireRole(["cafe_admin", "super_admin"]));

router.get("/", adminTableController.listTables);
router.post("/generate", adminTableController.generateTables);

module.exports = router;
