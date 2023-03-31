import Job from "../models/Job.js";
const HttpError = require("../model/http-error");
const StatusCodes = require("http-status-codes");

exports.createJob = async (req, res, next) => {
  const { position, company } = req.body;
  if (!position || !company) {
    const error = new HttpError(
      "Please Provide All Values",
      StatusCodes.BAD_REQUEST
    );
    return next(error);
  }
  req.body.createdBy = req.user.userId;
  try {
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
  } catch (error) {
    return next(error);
  }
};
exports.getAllJobs = (req, res, next) => {
  res.send("getAllJobs");
};
exports.updateJob = (req, res, next) => {
  res.send("updateJob");
};
exports.deleteJob = (req, res, next) => {
  res.send("deleteJob");
};
exports.showStatus = (req, res, next) => {
  res.send("showStatus");
};
