const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const secretKey = process.env.TOKEN;

async function auth(req, res, next) {
  let bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    let bearer = bearerHeader.split(" ");
    let bearerToken = bearer[1];
    var token = bearerToken;
  } else {
    return res.status(401).json({
      message: "Access denied. No token passed.",
    });
  }

  if (!token)
    return res.status(401).json({
      message: "Access denied. No token passed.",
    });

  try {
    let decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    var result = await User.userToken(req.user._id, token);

    if (!result) {
      throw new Error();
    }

    /*
            Now we can get id as req.user._id
            */
    next();
  } catch (ex) {
    return res.status(400).json({
      message: "Invalid token.",
    });
  }
}

module.exports = auth;
