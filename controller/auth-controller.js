const User = require("../model/user-model");
const HttpError = require("../model/http-error");
const StatusCodes = require("http-status-codes");

exports.register = async (req, res, next) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    const error = new HttpError(
      "Please provide all values",
      StatusCodes.BAD_REQUEST
    );
    return next(error);
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new HttpError("User already exists", StatusCodes.BAD_REQUEST);
    return next(error);
  }
  try {
    const user = await User.create({ email, name, password });
    const token = user.generateJWT();
    res.status(StatusCodes.CREATED).json({ user, token });
  } catch (error) {
    return next(error);
  }
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const error = new HttpError(
      "Please provide all values",
      StatusCodes.BAD_REQUEST
    );
    return next(error);
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    const error = new HttpError(
      "Cannot find the user",
      StatusCodes.UNAUTHORIZED
    );
    return next(error);
  }
  const isPasswordmatch = await user.comparePassword(password);
  if (!isPasswordmatch) {
    const error = new HttpError(
      "Cannot find the user with this password",
      StatusCodes.UNAUTHORIZED
    );
    return next(error);
  }
  const token = user.generateJWT();
  res.status(StatusCodes.OK).json({ user, token });
};
exports.updateUser = async (req, res, next) => {
  console.log("req.qqqqqq", req);
  const { lastName, location, name } = req.body;

  if (!lastName || !location) {
    const error = new HttpError(
      "Please provide all values",
      StatusCodes.BAD_REQUEST
    );
    return next(error);
  }

  const user = await User.findOne({ email: req.user.email });
  if (!user) {
    const error = new HttpError(
      "Cannot find the user",
      StatusCodes.UNAUTHORIZED
    );
    return next(error);
  }
  user.location = location;
  user.lastName = lastName;
  user.name = name;
  try {
    await user.save();
    // various setups
    // in this case only id,email
    // if other properties included, must re-generate
    const token = user.generateJWT();
    res.status(StatusCodes.OK).json({ user, token, location: user.location });
  } catch (error) {
    return next(error);
  }
};
