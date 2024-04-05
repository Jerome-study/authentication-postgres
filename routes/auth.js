const express = require("express");
const router = express.Router();
const registerController = require("../controller/registerController");
const loginController = require("../controller/loginController");
const logoutController = require("../controller/logoutController");
const { verifyAuth, verify } = require("../middleware/auth");

router.post("/login", verifyAuth, loginController);
router.post("/register", verifyAuth, registerController);
router.post("/logout",verify, logoutController);

module.exports = router