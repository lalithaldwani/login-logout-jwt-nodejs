let express = require("express");
router = express.Router();
const productController = require("../controllers/productController");
const auth = require("../middleware/auth");

/**Api to list product */
router.get("/listProduct", auth, (req, res) => {
  productController.productList(req.body, (data) => {
    res.send(data);
  });
});

module.exports = router;
