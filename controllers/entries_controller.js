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

// // New
// entries.get("/:id/new", (req, res) => {
//   Scrapbook.findById(req.params.id, (err, foundBook) => {
//     res.render("../views/entries/new.ejs", {
//       scrapbook: foundBook,
//     });
//   });
// });

// Edit
entries.get("/:id/edit", (req, res) => {
  Entry.findById(req.params.id, (err, foundEntry) => {
    res.render("../views/entries/edit.ejs", {
      entry: foundEntry,
    });
  });
});

// Show
entries.get("/:id", (req, res) => {
  Entry.findById(req.params.id, (err, foundEntry) => {
    Scrapbook.findOne({ "entries._id": req.params.id }, (err, foundBook) => {
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

// Update
entries.put("/:id", (req, res) => {
  Entry.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedEntry) => {
      Scrapbook.findOne({ "entries._id": req.params.id }, (err, foundBook) => {
        foundBook.entries.id(req.params.id).remove();
        foundBook.entries.push(updatedEntry);
        foundBook.save((err, data) => {
          res.redirect("/scrapbook/" + foundBook.id);
        });
      });
    }
  );
});

// Delete
entries.delete("/:id", (req, res) => {
  Entry.findByIdAndDelete(req.params.id, (err, foundEntry) => {
    Scrapbook.findOne({ "entries._id": req.params.id }, (err, foundBook) => {
      foundBook.entries.id(req.params.id).remove();
      foundBook.save((err, data) => {
        res.redirect("/scrapbook/" + foundBook.id);
      });
    });
  });
});

module.exports = entries;
