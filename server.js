//Dependencies
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const app = express();
const db = mongoose.connection;
require("dotenv").config();

// Port
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3333;

// Database
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// Error / success
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongo disconnected"));

// Middleware
// use public folder for static assets
app.use(express.static("public"));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false })); // extended: false - does not allow nested objects in query strings
app.use(express.json()); // returns middleware that only parses JSON - may or may not need it depending on your project

// use method override
app.use(methodOverride("_method")); // allow POST, PUT and DELETE from a form

// Controllers
const appController = require("./controllers/app_controller.js");
app.use("/scrapbook", appController);

const entriesController = require("./controllers/entries_controller.js");
app.use("/entries", entriesController);

// Routes
//localhost:3000
app.get("/", (req, res) => {
  res.redirect("/scrapbook");
});

// Listener
app.listen(PORT, () => console.log("Listening on port:", PORT));
