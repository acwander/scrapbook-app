const express = require("express");
const entries = express.Router();
const Entry = require("../models/entry.js");
const Scrapbook = require("../models/scrapbook.js");

// New
entries.get("/new", (req, res) => {
  Scrapbook.find({}, (err, allBooks) => {
    if (err) {
      res.send("Error:" + err);
    }
    res.render("../views/entries/new.ejs", {
      scrapbooks: allBooks,
    });
  });
});

// Show
entries.get("/:id", (req, res) => {
  Entry.findById(req.params.id, (err, foundEntry) => {
    Scrapbook.findOne({ "entries.id": req.params.id }, (err, foundBook) => {
      res.render("../views/entries/show.ejs", {
        scrapbook: foundBook,
        entry: foundEntry,
      });
    });
  });
});

// Create
entries.post("/", (req, res) => {
  Scrapbook.findById(req.body.bookId, (err, foundBook) => {
    Entry.create(req.body, (err, createdEntry) => {
      foundBook.entries.push(createdEntry);
      foundBook.save((err, data) => {
        res.redirect("/scrapbook/" + req.body.bookId);
      });
    });
  });
});

module.exports = entries;
