const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
require("./models/User");
require("./services/passport");

authRoutes(app);
mongoose.connect(
  "mongodb+srv://zeyad:admin123@cluster0-7tkvq.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
