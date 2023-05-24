const express = require("express");
const passport = require("passport");
const router = express.Router();
require("dotenv").config;

router.get(
  "/",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);
router.get(
  "/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = req.user.generateJWT();
    res.redirect(
      `http://localhost:3000/register?token=${token}&user=${JSON.stringify(
        req.user
      )}`
    );
  }
);

// Success route
router.get("/success", (req, res) => {
  // Redirect to a success page or send the JWT token to the client
  console.log("req.user", user);
  res.cookie("x-auth-cookie", token);
  res.redirect(
    `http://localhost:3000?token=${token}&user=${JSON.stringify(req.user)}`
  );
});

// Failure route
router.get("/failure", (req, res) => {
  res.redirect("/auth/login");
});

module.exports = router;
