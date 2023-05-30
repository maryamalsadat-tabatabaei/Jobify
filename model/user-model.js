const mongoose = require("mongoose");
const validator = require("validator");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minLength: 3,
    maxLength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email address",
    },
  },
  password: {
    type: String,
    // required: [true, "Please provide password"],
    minLength: 6,
    maxLength: 20,
    select: false,
  },
  googleId: {
    type: String,
  },
  lastName: {
    type: String,
    maxLength: 20,
    trim: true,
    default: "lastname",
  },
  location: {
    type: String,
    maxLength: 20,
    trim: true,
    default: "my city",
  },
  credits: { type: Number, default: 0 },
  imageUrl: String,
  resetPasswordToken: { type: String },
  resetPasswordTokenExpiration: Date,
});

UserSchema.pre("save", async function (next) {
  const user = this;
  try {
    if (!user.isModified("password")) {
      return next();
    }
    // Check if the user has a password (local authentication) or not (Google authentication)
    if (user.password) {
      // User has a password (local authentication)
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;
    }
    // Proceed with saving the user
    next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    {
      userId: this._id,
      email: this.email,
      iat: new Date().getTime(),
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

UserSchema.methods.comparePassword = async function (candidatPassword) {
  const isMatch = await bcrypt.compare(candidatPassword, this.password);
  return isMatch;
};

// UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserSchema);
