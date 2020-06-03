const express = require("express");
const session = express.Router();

session.get("/", (req, res) => res.send("Session Page!"));

module.exports = session;
