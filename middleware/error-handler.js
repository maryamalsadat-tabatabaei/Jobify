const StatusCodes = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log("errrrrrrrrrrrrr", err);

  const defaultError = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    msg: "Something went wrong, please try again later.",
  };

  if (err._message === "User validation failed") {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }
  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.message = `${Object.keys(
      err.keyValue
    )} field has to be unique`;
  }

  res.status(err.statusCode || defaultError.statusCode).json({
    msg: err.message || defaultError.msg,
  });
};

module.exports = errorHandlerMiddleware;
