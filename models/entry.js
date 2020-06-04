const mongoose = require("mongoose");

var entrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    memory: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1543095834-7445b8af8c2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1302&q=80",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Entry", entrySchema);
