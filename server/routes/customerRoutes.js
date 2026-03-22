const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.get("/me", customerController.getMe);
router.get("/me/favorites", customerController.getFavorites);

module.exports = router;
