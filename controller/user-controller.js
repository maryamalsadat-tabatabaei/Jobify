const User = require("../model/user-model");
const HttpError = require("../model/http-error");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");
const StatusCodes = require("http-status-codes");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

exports.resetPassword = async (req, res, next) => {
  const { email } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError("Loggin failed, please try again later.", 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Could not identify user, credentials seem to be wrong.",
      403
    );
    return next(error);
  }

  let resetToken;
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      const error = new HttpError(
        "Reset password failed, please try again later.",
        500
      );
      return next(error);
    }
    resetToken = buffer.toString("hex");
  });

  existingUser.resetToken = resetToken;
  existingUser.resetTokenExpiration = Date.now() + 3600000;

  try {
    await existingUser.save();
  } catch (err) {
    const error = new HttpError(
      "Reset password failed, please try again.",
      500
    );
    return next(error);
  }
  transporter.sendMail({
    to: email,
    from: "node@node-complete.com",
    subject: "Password reset",
    html: `
            <p>You requested a password reset</p>
            <p>Click this <a href="http://localhost:3000/user/reset-password/${resetToken}">link</a> to set a new password.</p>
          `,
  });

  res.json({
    message: "Email for reseting password sent. Please check your email.",
  });
};

exports.getNewPassword = async (req, res, next) => {
  const token = req.params.token;

  let existingUser;
  try {
    existingUser = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });
  } catch (err) {
    const error = new HttpError(
      "Reset Password failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Could not identify user, credentials seem to be wrong.",
      403
    );
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    token,
  });
};

exports.postNewPassword = async (req, res, next) => {
  const { newPassword, passwordToken, userId } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({
      resetToken: passwordToken,
      resetTokenExpiration: { $gt: Date.now() },
      _id: userId,
    });
  } catch (err) {
    const error = new HttpError(
      "Reset Password failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Could not identify user, credentials seem to be wrong.",
      403
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(newPassword, 12);
  } catch (err) {
    const error = new HttpError("Could not create user.Please try again!", 422);
    return next(error);
  }

  existingUser.password = hashedPassword;
  existingUser.resetToken = undefined;
  existingUser.resetTokenExpiration = undefined;
  try {
    await existingUser.save();
  } catch (err) {
    const error = new HttpError(
      "Reset password failed, please try again.",
      500
    );
    return next(error);
  }

  res.json({
    message: "Password Successfuly changed",
  });
};
