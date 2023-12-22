//imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const router = require("./routers/router");
const path = require("path");

const app = express();
const port = 4000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "assets")));

//router
app.use(router);

// Error Handler
app.use((req, res, next) => {
  res.send('<h1 style="color:red;">Requested url was not found!</h1>');
});

app.use((err, req, res, next) => {
  if (res.headersSend) {
    next("Already Header Send. There was a problem.");
  } else {
    if (err.message) {
      res.status(500).send(err.message);
    } else {
      res.send("There was wrong!");
    }
  }
});

app.listen(4000, () => {
  console.log(`Starting server on port ${port}`);
});
