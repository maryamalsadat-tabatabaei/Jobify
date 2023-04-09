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
    required: [true, "Please provide password"],
    minLength: 3,
    maxLength: 20,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: 6,
    select: false,
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
  resetToken: String,
  resetTokenExpiration: Date,
});

UserSchema.pre("save", async function (next) {
  const user = this;
  try {
    if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
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
