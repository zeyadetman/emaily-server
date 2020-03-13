const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./models/User");
require("./services/passport");

const authRoutes = require("./routes/auth");
mongoose.connect(
  "mongodb+srv://zeyad:admin123@cluster0-7tkvq.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
