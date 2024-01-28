var mongoose = require("mongoose");
//mongoose.set("debug", true);
var config = require("./config").config;

module.exports = function () {
  mongoose.Promise = require("bluebird");
  console.log(config.DB_URL.url);
  var db = mongoose
    .connect("mongodb://localhost:27017/eminence")
    .then(() => console.log("Connected to mongodb..."))
    .catch((err) => console.error("Could not connect to mongodb...", err));
  return db;
};
