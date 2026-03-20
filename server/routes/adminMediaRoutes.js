const express = require("express");
const multer = require("multer");
const { requireAuth, requireRole } = require("../middleware/auth");
const adminMediaController = require("../controllers/adminMediaController");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

router.use(requireAuth);
router.use(requireRole(["cafe_admin", "super_admin"]));

router.post("/image", upload.single("file"), adminMediaController.uploadImage);

module.exports = router;
