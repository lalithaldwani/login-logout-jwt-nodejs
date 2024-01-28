var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let User = new Schema({
  name: {
    type: String,
    trim: true,
    default: "",
    required: true,
  },
  password: {
    type: String,
    trim: true,
    default: "",
    required: true,
  },
  tokens: [],
  created_on: {
    type: Date,
    default: Date.now,
  },
});

User.statics.userToken = function (userId, token) {
  let result = this.findOne({ _id: userId, tokens: token });
  return result;
};

let collectionName =
  process.env.NODE_ENV === "test"
    ? process.env.NODE_ENV + "_" + "users"
    : "users";

module.exports = mongoose.model(collectionName, User);
