const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID || "85c5a816e3c56de6dbed",
      clientSecret:
        process.env.GITHUB_CLIENT_SECRET ||
        "f5098402f2621e6b6d055693fdd2999e1eddf0db",
      callbackURL: "/auth/github/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log({
        accessToken,
        refreshToken,
        profile,
        cb
      });
      new User({
        githubId: profile.id,
        name: profile.username
      }).save();
    }
  )
);
