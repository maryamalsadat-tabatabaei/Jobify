require("dotenv").config();
const StatusCodes = require("http-status-codes");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.chargeUser = async (req, res, next) => {
  const charge = await stripe.charges.create({
    amount: 500,
    currency: "usd",
    description: "$5 for 5 credits",
    source: req.body.id,
  });
  req.user.credits += 5;
  let user;
  try {
    user = await req.user.save();
  } catch (error) {
    return next(error);
  }

  res.status(StatusCodes.OK).json({ user });
};
