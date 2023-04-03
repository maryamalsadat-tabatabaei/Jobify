const Job = require("../model/job-model");
const HttpError = require("../model/http-error");
const StatusCodes = require("http-status-codes");
const checkPermissions = require("../middleware/check-permissions");
const mongoose = require("mongoose");

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
exports.getAllJobs = async (req, res, next) => {
  const { userId } = req.user;
  const { position, company, status, jobType, sort } = req.query;

  let queryObject = {
    createdBy: userId,
    status:
      !status || status === "all"
        ? { $in: ["interview", "declined", "pending"] }
        : {
            $regex: status,
            $options: "i",
            $in: ["interview", "declined", "pending"],
          },
    jobType:
      !jobType || jobType === "all"
        ? { $in: ["full-time", "part-time", "remote", "internship"] }
        : {
            $regex: jobType,
            $options: "i",
            $in: ["full-time", "part-time", "remote", "internship"],
          },
    position: { $regex: position || "", $options: "i" },
    company: { $regex: company || "", $options: "i" },
  };

  console.log("queryObject", queryObject);

  //no  wait for chaining conditions
  let result = Job.find(queryObject);

  // chain sort conditions
  switch (sort) {
    case "latest": {
      result = result.sort("-createdAt");
      break;
    }
    case "oldest": {
      result = result.sort("createdAt");
      break;
    }
    case "a-z": {
      result = result.sort("position company");
      break;
    }
    case "z-a": {
      result = result.sort("-position -company");
      break;
    }
    default:
      result = result.sort("-createdAt");
      break;
  }
  // setup pagination
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  try {
    const jobs = await result;
    const totalJobs = await Job.countDocuments(queryObject);
    const numberOfPages = Math.ceil(totalJobs / limit);
    res.status(StatusCodes.OK).json({ jobs, totalJobs, numberOfPages });
  } catch (error) {
    return next(error);
  }
};
exports.updateJob = async (req, res, next) => {
  const { id: jobId } = req.params;
  const { position, company } = req.body;
  if (!position || !company) {
    const error = new HttpError(
      "Please Provide All Values",
      StatusCodes.BAD_REQUEST
    );
    return next(error);
  }

  const job = await Job.findById({ _id: jobId });
  if (!job) {
    const error = new HttpError(
      `No job with id ${jobId}`,
      StatusCodes.NOT_FOUND
    );
    return next(error);
  }

  checkPermissions(req.user, job.createdBy);

  let updatedJob;
  try {
    updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    return next(error);
  }
  res.status(StatusCodes.OK).json({ updatedJob });
};
exports.deleteJob = async (req, res, next) => {
  const { id: jobId } = req.params;
  const job = await Job.findById({ _id: jobId });
  if (!job) {
    const error = new HttpError(
      `No job with id ${jobId}`,
      StatusCodes.NOT_FOUND
    );
    return next(error);
  }

  checkPermissions(req.user, job.createdBy);
  try {
    await Job.deleteOne({ _id: jobId });
  } catch (error) {
    return next(error);
  }

  res.status(StatusCodes.OK).json({ msg: "Success! Job removed" });
};
exports.showStatus = async (req, res, next) => {
  const { userId } = req.user;

  const showStatus = await Job.aggregate([
    {
      $match: { createdBy: mongoose.Types.ObjectId(userId) },
    },
    { $group: { _id: $status, count: { $sum: 1 } } },
  ]);

  const defaultStatus = showStatus.reduce((acc, curr) => {
    const { _id: statusType, count } = curr;
    acc[statusType] = count;
    return acc;
  }, {});

  let monthlyStatus = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyStatus = monthlyStatus.map((item) => {
    const {
      _id: { year, month },
      count,
    } = item;
    return { year, month, count };
  });

  res.status(StatusCodes.OK).json({ defaultStatus, monthlyStatus });
};
