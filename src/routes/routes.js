const express = require("express");
const userRoute = require("./userRoutes");
const productRoute = require("./productRoute");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

module.exports = (app) => {
  // Middleware
  app.use(express.static(path.join(__dirname, "public")));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  // Routes
  app.use("/user", userRoute);
  app.use("/product", productRoute);
};
