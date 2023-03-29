const errorHandlerMiddleware = (err, req, res, next) => {
  res.status(500).json({ msg: err.message || "There was an error" });
};
module.exports = errorHandlerMiddleware;
