const express = require("express");

const router = express.Router();

const { createProduct, getAllProduct, getProductByPrice, getProductByTypeAndName, getQuantityProductById, getProductByType, getProductById, updateProductById, deleteProductById } = require("../controllers/ProductController");
const { createComment, getCommentsOfProduct } = require("../controllers/CommentController")
router.post("/", createProduct);
router.get("/", getAllProduct);

router.get('/:productId/quantity', getQuantityProductById)
router.get("/:productId", getProductById);
router.put("/:productId", updateProductById);
router.delete("/:productId", deleteProductById)

router.post('/:productId/createComment',createComment)
router.get('/:productId/getComment',getCommentsOfProduct);

router.get("/type/:type", getProductByType);
router.get("/type/:type/:condition", getProductByPrice);
router.get("/type/:type/name/:name", getProductByTypeAndName);

module.exports = router;