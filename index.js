const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const mongoose = require("mongoose");
require("./models/User");
require("./services/passport");

mongoose.connect(
  "mongodb+srv://zeyad:admin123@cluster0-7tkvq.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
