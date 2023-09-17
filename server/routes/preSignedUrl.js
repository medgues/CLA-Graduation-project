const checkAuth = require("../middleware/AuthMiddleware");
const express = require("express");
const { uploadImage } = require("../controllers/uploadController");

const router = express.Router();

// router.use(checkAuth);

router.get("/:filename", uploadImage);

module.exports = router;
