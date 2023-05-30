const User = require("../model/user-model");
const HttpError = require("../model/http-error");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");
require("dotenv").config();

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
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

  try {
    const createdResetToken = await new Promise((resolve, reject) => {
      crypto.randomBytes(32, (err, buffer) => {
        if (err) {
          reject(
            new HttpError("Reset password failed, please try again later.", 500)
          );
        }
        resolve(buffer.toString("hex"));
      });
    });

    existingUser.resetPasswordToken = createdResetToken;
    existingUser.resetPasswordTokenExpiration = Date.now() + 3600000;

    await existingUser.save();

    const info = await transporter.sendMail({
      to: email,
      from: "maryamtabatabaiii@gmail.com",
      subject: "Password reset",
      html: `
            <p>You requested a password reset</p>
            <p>Click this <a href="http://localhost:3000/reset-password/${createdResetToken}">link</a> to set a new password.</p>
          `,
    });

    console.log("Email sent successfully");
    console.log(JSON.stringify(info));

    res.json({
      message: "Email for resetting password sent. Please check your email.",
    });
  } catch (err) {
    const error = new HttpError(
      "Reset password failed, please try again.",
      500
    );
    return next(error);
  }
};

exports.getNewPassword = async (req, res, next) => {
  const token = req.params.token;
  console.log("token", token);
  let existingUser;
  try {
    existingUser = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiration: { $gt: Date.now() },
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
    userId: existingUser._id,
    token,
  });
};

exports.postNewPassword = async (req, res, next) => {
  const { password: newPassword, passwordToken, userId } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({
      resetPasswordToken: passwordToken,
      resetPasswordTokenExpiration: { $gt: Date.now() },
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

  existingUser.password = newPassword;
  existingUser.resetPasswordToken = undefined;
  existingUser.resetPasswordTokenExpiration = undefined;
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
