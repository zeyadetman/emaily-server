require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./models/User");
require("./models/Survey");
require("./services/passport");

app.use(
  cors({ origin: process.env.CLIENT_SIDE_PATH, optionsSuccessStatus: 200 })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SESSION_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/auth")(app);
require("./routes/payment")(app);
require("./routes/survey")(app);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
