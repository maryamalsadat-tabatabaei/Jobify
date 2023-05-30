const requireLocalAuth = require("../../middleware/auth");
const express = require("express");
const authController = require("../../controller/auth-controller");
const fileUpload = require("../../service/file-upload");
const router = express.Router();
const rateLimiter = require("express-rate-limit");
const { check } = require("express-validator");
require("dotenv").config;

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

router.post(
  "/register",
  apiLimiter,
  fileUpload.single("imageUrl"),
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  authController.register
);
router.post(
  "/login",
  apiLimiter,
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  authController.login
);
router.patch(
  "/updateUser",
  requireLocalAuth,
  fileUpload.single("imageUrl"),
  authController.updateUser
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/api/v1/register");
});

module.exports = router;
