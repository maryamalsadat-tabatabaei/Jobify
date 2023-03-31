const express = require("express");
const authController = require("../controller/auth-controller");
const authenticateUser = require("../middleware/auth");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.patch("/updateUser", authenticateUser, authController.updateUser);

module.exports = router;
