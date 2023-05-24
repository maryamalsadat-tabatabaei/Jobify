const jwt = require("jsonwebtoken");
const HttpError = require("../model/http-error");
const StatusCodes = require("http-status-codes");
require("dotenv").config;

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = req.query.token || (authHeader && authHeader.split(" ")[1]);

  //   const token = req.query.token || (authHeader && authHeader.split(" ")[1]);
  //   if (!authHeader || !authHeader.startsWith("Bearer")) {

  if (!token) {
    const error = new HttpError(
      "Authentication Invalid",
      StatusCodes.UNAUTHORIZED
    );
    return next(error);
  }

  try {
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
