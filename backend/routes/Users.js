const express = require("express");
const { login, signup } = require("../controllers/UserControllers");
const { checkAuth } = require("../middleware/AuthMiddleware");
const router = express.Router();

// router.use(checkAuth);
//login Route
router.post("/login", login);

//singup route
router.post("/signup", signup);

module.exports = router;
