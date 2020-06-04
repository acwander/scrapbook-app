const express = require("express");
const entry = express.Router();
const Scrapbook = require("../models/scrapbook.js");

// New
entry.get("/", (req, res) => {
  res.render("../views/entries/new.ejs", {});
});

module.exports = entry;
