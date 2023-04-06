const Survey = require("../model/survey-model");
const Mailer = require("../service/mail-service");
const surveyTemplate = require("../service/email-templates/survey-template");
const StatusCodes = require("http-status-codes");
const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");

exports.getFeedback = (req, res, next) => {
  res.status(StatusCodes.OK).json("Thanks for your feedback");
};
exports.createSurvey = async (req, res, next) => {
  const { title, subject, body, recipients } = req.body;

  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(",").map((email) => ({ email: email.trim() })),
    _user: req.user.userId,
  });

  //send email
  const mailer = new Mailer(survey, surveyTemplate(survey));
  let user;
  try {
    await mailer.send();
    await survey.save();
    req.user.credits -= 1;
    user = await req.user.save();
  } catch (error) {
    return next(error);
  }

  res.status(StatusCodes.OK).json({ user });
};

exports.webhookFeedbackSurvey = (req, res, next) => {
  const pathPattern = new Path("/api/surveys/:surveyId/:choice");

  _.chain(req.body)
    .map(({ email, url }) => {
      const match = pathPattern.test(new URL(url).pathname);
      if (match) {
        return { email, surveyId: match.surveyId, choice: match.choice };
      }
    })
    .compact()
    .uniqBy("email", "surveyId")
    .each(({ surveyId, email, choice }) => {
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false },
          },
        },
        {
          $inc: { [choice]: 1 },
          $set: { "recipients.$.responded": true },
          lastResponded: new Date(),
        }
      ).exec();
    })
    .value();

  res.status(StatusCodes.OK).json({});
};
