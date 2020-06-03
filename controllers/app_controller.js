const express = require("express");
const app = express.Router();
const Scrapbook = require("../models/scrapbook.js");

//Landing Page
app.get("/", (req, res) => {
  res.render("../views/main/landing.ejs");
});

//Home
app.get("/home", (req, res) => {
  Scrapbook.find({}, (err, allBooks) => {
    if (err) {
      res.send("Error:" + err);
    }
    res.render("../views/main/index.ejs", {
      scrapbooks: allBooks,
    });
  });
});

//New
app.get("/new", (req, res) => {
  res.render("../views/main/new.ejs");
});

//Show
app.get("/:id", (req, res) => {
  res.send("Show Scrapbook");
});

//Create
app.post("/", (req, res) => {
  Scrapbook.create(req.body, (err, createdBook) => {
    if (err) {
      res.send("Error:" + err);
    }
    res.redirect("/scrapbook/home");
  });
});

module.exports = app;
