const express = require("express");
const surveyController = require("../controller/survey-controller");
const authenticateUser = require("../middleware/auth");
const checkCredits = require("../middleware/check-credits");
const router = express.Router();
const rateLimiter = require("express-rate-limit");

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

router.get("/:surveyId/:choice", surveyController.getFeedback);
router.post("/", checkCredits, apiLimiter, surveyController.createSurvey);
router.post(
  "/webhooks",
  checkCredits,
  apiLimiter,
  surveyController.webhookFeedbackSurvey
);

module.exports = router;
