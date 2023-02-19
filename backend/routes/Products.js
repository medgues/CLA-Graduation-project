const express = require("express");
const {
  getProducts,
  getUserProducts,
  getProductbyId,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/ProductsControllers");
const { AddProductToFav } = require("../controllers/FavController");
const checkAuth = require("../middleware/AuthMiddleware");

const router = express.Router();
// get all products Router
router.get("/", getProducts);
router.get("/profile/:username", getUserProducts);
//check authorisation
router.use(checkAuth);

router.post("/", createProduct);
router.post("/addtofav", AddProductToFav);
router.get("/:username", getUserProducts);
router.get("/product/:id", getProductbyId);
router.delete("/:id", deleteProduct);
router.patch("/:id", updateProduct);

module.exports = router;
