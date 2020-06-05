const express = require("express");
const app = express.Router();
const Entry = require("../models/entry.js");
const Scrapbook = require("../models/scrapbook.js");

// Landing Page
app.get("/", (req, res) => {
  res.render("../views/main/landing.ejs");
});

// Home
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

// New
app.get("/new", (req, res) => {
  res.render("../views/main/new.ejs");
});

// Edit
app.get("/:id/edit", (req, res) => {
  Scrapbook.findById(req.params.id, (err, foundBook) => {
    res.render("../views/main/edit.ejs", {
      scrapbook: foundBook,
    });
  });
});

// Show
app.get("/:id", (req, res) => {
  Scrapbook.findById(req.params.id, (err, foundBook) => {
    if (err) {
      res.send("Error:" + err);
    }
    res.render("../views/main/show.ejs", {
      scrapbook: foundBook,
    });
  });
});

// Create
app.post("/", (req, res) => {
  Scrapbook.create(req.body, (err, createdBook) => {
    if (err) {
      res.send("Error:" + err);
    }
    res.redirect("/scrapbook/home");
  });
});

// Update
app.put("/:id", (req, res) => {
  Scrapbook.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedBook) => {
      if (err) {
        res.send("Error:" + err);
      }
      res.redirect("/scrapbook/" + req.params.id);
    }
  );
});

// Delete
app.delete("/:id", (req, res) => {
  Scrapbook.findByIdAndDelete(req.params.id, (err, deletedBook) => {
    if (err) {
      res.send("Error:" + err);
    }
    // Delete entries associated with deleted book from db
    const entriesIds = [];
    for (let i = 0; i < deletedBook.entries.length; i++) {
      entriesIds.push(deletedBook.entries[i]._id);
    }
    Entry.remove(
      {
        _id: {
          $in: entriesIds,
        },
      },
      (err, data) => {
        res.redirect("/scrapbook/home");
      }
    );
  });
});

module.exports = app;
