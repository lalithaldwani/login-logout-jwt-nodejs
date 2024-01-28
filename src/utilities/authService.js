const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const secretKey = process.env.TOKEN;
  //console.log(process.env.PORT)
  const options = { expiresIn: "1h" }; // Token expiration time

  return jwt.sign(payload, secretKey, options);
};

module.exports = {
  generateToken,
};
