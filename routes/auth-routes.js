const express = require("express");
const authController = require("../controller/auth-controller");
const authenticateUser = require("../middleware/auth");
const router = express.Router();
import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

router.post("/register", apiLimiter, authController.register);
router.post("/login", apiLimiter, authController.login);
router.patch("/updateUser", authenticateUser, authController.updateUser);

module.exports = router;
