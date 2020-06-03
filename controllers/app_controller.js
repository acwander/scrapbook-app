const express = require("express");
const app = express.Router();

// Landing Page
app.get("/", (req, res) => {
  res.render("../views/main/landing.ejs");
});

// Home Page
app.get("/home", (req, res) => {
  res.render("../views/main/index.ejs");
});

module.exports = app;
