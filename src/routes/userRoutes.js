let express = require("express");
router = express.Router();
const usersController = require("../controllers/userController");
const auth = require("../middleware/auth");

/**Api to create user registration */
router.post("/signup", (req, res) => {
  usersController.userSignup(req.body, (data) => {
    res.send(data);
  });
});

/**Api for user login */
router.post("/signin", (req, res) => {
  usersController.userSignin(req.body, (data) => {
    res.send(data);
  });
});

/**Api to logout the user */
router.get("/logout", auth, (req, res) => {
  usersController.userLogout(req, (data) => {
    res.send(data);
  });
});

module.exports = router;
