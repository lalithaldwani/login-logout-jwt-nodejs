const Models = require("../models/userModel");

//Insert Users data in DB
var userSignup = function (objToSave) {
  return new Models(objToSave).save();
};

//Get user exist or not by name
var getUserName = async function (criteria, projection, options) {
  options.lean = true;
  let userName = await Models.findOne(criteria, projection, options);
  return userName;
};

//Get User data
var getUser = async function (criteria, projection, options) {
  options.lean = true;
  let user = await Models.findOne(criteria, projection, options);
  return user;
};

//save the token against user
var saveToken = async function (criteria, dataToSet, options) {
  options.lean = true;
  options.new = true;
  await Models.findOneAndUpdate(criteria, { $set: dataToSet }, options);
};

module.exports = {
  userSignup: userSignup,
  getUserName: getUserName,
  getUser: getUser,
  saveToken: saveToken,
};
