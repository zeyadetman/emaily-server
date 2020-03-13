const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID || "90d8e4c7e4729284896b",
      clientSecret:
        process.env.GITHUB_CLIENT_SECRET ||
        "4af58abd0a1972f3a303e85b8e43fa2fe1fc4684",
      callbackURL: "/auth/github/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log({
        accessToken,
        refreshToken,
        profile,
        cb
      });
    }
  )
);
