const jwt = require("jsonwebtoken");
const HttpError = require("../model/http-error");
const StatusCodes = require("http-status-codes");
require("dotenv").config;

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    const error = new HttpError(
      "Authentication Invalid",
      StatusCodes.UNAUTHORIZED
    );
    return next(error);
  }

  try {
    const token = authHeader.split(" ")[1];
    const { userId, email } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId, email };
    next();
  } catch (err) {
    const error = new HttpError(
      "Authentication Invalid",
      StatusCodes.UNAUTHORIZED
    );
    return next(error);
  }
};

module.exports = auth;
