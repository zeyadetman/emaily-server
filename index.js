const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./models/User");
require("./services/passport");

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ["testtesttest"]
  })
);

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require("./routes/auth");
mongoose.connect(
  "mongodb+srv://zeyad:admin123@cluster0-7tkvq.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
