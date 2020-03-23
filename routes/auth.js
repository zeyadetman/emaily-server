const passport = require("passport");
require("../services/passport");

module.exports = app => {
  app.get("/", (req, res) => {
    res.send({});
  });

  app.get(
    "/auth/github/callback",
    passport.authenticate("github"),
    (req, res) => {
      console.log(req.user);
      res.redirect("http://localhost:3000/");
    }
  );

  app.get("/auth/github", passport.authenticate("github"));

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    console.log("req.user");
    console.log(req.user);
    res.send({ user: req.user, test: 1 });
  });
};
