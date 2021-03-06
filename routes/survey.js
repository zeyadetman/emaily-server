const { Path } = require("path-parser");
const { URL } = require("url");
const _ = require("lodash");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const mongoose = require("mongoose");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");
module.exports = (app) => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find(
      { _user: req.user._id },
      { recipients: 0 }
    );
    res.status(200).send({ surveys });
  });
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, body, subject, recipients } = req.body;

    const survey = new Survey({
      title,
      body,
      subject,
      recipients: recipients.split(",").map((email) => ({ email })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();

      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");
    const events = req.body
      .map(({ url, email, event }) => {
        if (event === "click") {
          const { pathname } = new URL(url);
          const match = p.test(pathname);
          if (match) {
            return { email, ...match };
          }
        }
      })
      .filter(Boolean);
    const uniqueEvents = _.uniqBy(events, ["email", "surveyId"]);
    uniqueEvents.forEach(({ surveyId, email, choice }) => {
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: { email, checked: false },
          },
        },
        {
          $inc: { [choice]: 1 },
          $set: { "recipients.$.checked": true },
          lastResponded: new Date(),
        }
      ).exec();
    });

    res.send({});
  });
};
