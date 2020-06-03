const mongoose = require("mongoose");

var scrapbookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1535954741680-a2e24eb05418?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Scrapbook", scrapbookSchema);
