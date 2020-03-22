const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const deserializedUser = await User.findById(id);
  done(null, deserializedUser);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ githubId: profile.id });
      if (user) {
        done(null, user);
      } else {
        const newUser = await new User({
          githubId: profile.id,
          name: profile.username
        }).save();
        done(null, newUser);
      }
    }
  )
);
