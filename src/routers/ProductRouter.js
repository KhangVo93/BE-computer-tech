const express = require("express");

const router = express.Router();

const { createProduct, getAllProduct, getProductByPrice, getProductByTypeAndName, getQuantityProductById, getProductByType, getProductById, updateProductById, deleteProductById } = require("../controllers/ProductController");

router.post("/", createProduct);
router.get("/", getAllProduct);

router.get('/:productId/quantity', getQuantityProductById)
router.get("/:productId", getProductById);
router.put("/:productId", updateProductById);
router.delete("/:productId", deleteProductById)

router.get("/type/:type", getProductByType);
router.get("/type/:type/:condition", getProductByPrice);
router.get("/type/:type/name/:name", getProductByTypeAndName);

module.exports = router;