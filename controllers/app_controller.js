const express = require("express");
const app = express.Router();

app.get("/", (req, res) => {
  res.render("../views/main/landing.ejs");
});

module.exports = app;
