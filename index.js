const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send({
    test: "tes12"
  });
});

app.listen("5000");
