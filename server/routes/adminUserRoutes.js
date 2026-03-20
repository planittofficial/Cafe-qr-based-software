const express = require("express");
const router = express.Router();
const { requireAuth, requireRole } = require("../middleware/auth");
const adminUserController = require("../controllers/adminUserController");

router.use(requireAuth);
router.use(requireRole(["cafe_admin", "super_admin"]));

router.get("/", adminUserController.listStaffUsers);
router.post("/", adminUserController.createStaffUser);
router.patch("/:id/password", adminUserController.resetStaffPassword);
router.delete("/:id", adminUserController.deleteStaffUser);

module.exports = router;
