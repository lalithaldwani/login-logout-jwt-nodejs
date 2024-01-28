const express = require("express");
const app = express();
const env = require("dotenv");
env.config(); // set environmental values
const port = process.env.PORT;
const util = require("./src/utilities/util");
const mongoose = require("./src/config/mongooseConfig")();
const Routes = require("./src/routes/routes")(app);

/* Error handler middleware */
app.use(function (err, req, res, next) {
  console.log("checking 500 error");
  return res.send({
    statusCode: util.statusCode.FIVE_ZERO_ZERO,
    statusMessage: util.statusMessage.SOMETHING_WENT_WRONG,
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log("checking next function");
  next();
});

app.listen(port, () => {
  console.log(`server listen on ${port}`);
});
