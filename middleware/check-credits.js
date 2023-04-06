const HttpError = require("../model/http-error");
const StatusCodes = require("http-status-codes");

const checkCredits = (req, res, next) => {
  if (req.user.credits < 1) {
    const error = new HttpError("Not enough credits!", StatusCodes.FORBIDDEN);
    return next(error);
  }
  next();
};

module.exports = checkCredits;
