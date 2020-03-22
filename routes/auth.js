const passport = require("passport");
require("../services/passport");

module.exports = app => {
  app.get("/", (req, res) => {
    res.send({
      test: "tes12"
    });
  });

  app.get(
    "/auth/github/callback",
    passport.authenticate("github"),
    (req, res) => {
      console.log(req.user);
      console.log(res.body, req.body);
      res.redirect(process.env.CLIENT_SIDE_PATH);
    }
  );

  app.get("/auth/github", passport.authenticate("github"));

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_SIDE_PATH);
  });

  app.get("/api/current_user", (req, res) => {
    console.log(req.user);
    res.send(req.user);
  });
};
