const express = require("express");
const billingController = require("../controller/billing-controller");
const router = express.Router();
const rateLimiter = require("express-rate-limit");

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

router.post("/charge", apiLimiter, billingController.chargeUser);

module.exports = router;
