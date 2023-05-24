const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config;
const User = require("../model/user-model");

//create googleoauth startegy
function extractProfile(profile) {
  let imageUrl = "";
  if (profile.photos && profile.photos.length) {
    imageUrl = profile.photos[0].value;
  }

  return {
    name: profile.displayName,
    email: profile.emails[0].value,
    image: imageUrl,
  };
}

const googleOptions = {
  callbackURL: "/auth/google/callback",
  clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  // Proxy: true,
  scope: ["profile", "email"],
  passReqToCallback: true,
};
const googleLogin = new GoogleStrategy(
  googleOptions,
  async (req, accessToken, res, refreshToken, profile, done) => {
    const { name, email, image } = extractProfile(profile);
    try {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const createdUser = new User({
        googleId: profile.id,
        name,
        email,
        image,
        places: [],
      });

      try {
        await createdUser.save();
      } catch (err) {
        const error = new HttpError(
          "Signing in failed, please try again.",
          500
        );
        return next(error);
      }
      done(null, createdUser);
    } catch (err) {
      done(err, null);
    }
  }
);

passport.use(googleLogin);
