const express = require("express");
const app = express.Router();

//Landing Page
app.get("/", (req, res) => {
  res.render("../views/main/landing.ejs");
});

//Home
app.get("/home", (req, res) => {
  res.render("../views/main/index.ejs");
});

//Create
app.get("/new", (req, res) => {
  res.render("../views/main/new.ejs");
});

//Show
app.get("/:id", (req, res) => {
  res.send("Show Scrapbook");
});

module.exports = app;
