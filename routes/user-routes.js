const express = require("express");
const router = express.Router();
const rateLimiter = require("express-rate-limit");
require("dotenv").config;
const usersController = require("../controller/user-controller");

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

router.post("/resetPassword", apiLimiter, usersController.resetPassword);
router.get("/resetPassword/:token", apiLimiter, usersController.getNewPassword);
router.post("/new-password", apiLimiter, usersController.postNewPassword);
module.exports = router;
