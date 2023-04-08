const express = require("express");
const authController = require("../controller/auth-controller");
const authenticateUser = require("../middleware/auth");
const fileUpload = require("../service/file-upload");
const router = express.Router();
const rateLimiter = require("express-rate-limit");

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

router.post(
  "/register",
  apiLimiter,
  fileUpload.single("imageUrl"),
  authController.register
);
router.post("/login", apiLimiter, authController.login);
router.patch(
  "/updateUser",
  authenticateUser,
  fileUpload.single("imageUrl"),
  authController.updateUser
);

module.exports = router;
