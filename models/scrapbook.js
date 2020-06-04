const mongoose = require("mongoose");
const Entry = require("./entry.js");

const scrapbookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    entries: [Entry.schema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Scrapbook", scrapbookSchema);
