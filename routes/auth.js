const passport = require("passport");
require("../services/passport");

module.exports = app => {
  app.get("/", (req, res) => {
    res.send({
      test: "tes12"
    });
  });

  app.get("/auth/github/callback", passport.authenticate("github"));

  app.get("/auth/github", passport.authenticate("github"));
};
