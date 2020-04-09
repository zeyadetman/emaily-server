const passport = require("passport");
const requireLogin = require("../middlewares/requireLogin");
require("../services/passport");

module.exports = (app) => {
  app.get(
    "/auth/github/callback",
    passport.authenticate("github"),
    async (req, res) => {
      const user = await req.user.save();
      res.redirect("http://localhost:3000/");
    }
  );

  app.get("/auth/github", passport.authenticate("github"));

  app.get("/api/logout", requireLogin, (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", requireLogin, (req, res) => {
    res.send({ user: req.user, test: 1 });
  });

  app.get("/", (req, res) => {
    res.send({});
  });
};
