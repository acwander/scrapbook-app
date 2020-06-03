const express = require("express");
const user = express.Router();

user.get("/", (req, res) => res.send("User Page!"));

module.exports = user;
