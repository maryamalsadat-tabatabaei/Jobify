const HttpError = require("../model/http-error");
const StatusCodes = require("http-status-codes");

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;
  const error = new HttpError(
    "Not authorized to access this route",
    StatusCodes.UNAUTHORIZED
  );
  return next(error);
};

module.exports = checkPermissions;
