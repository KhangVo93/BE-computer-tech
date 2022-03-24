const express = require("express");

const router = express.Router();

const {  updateCartById } = require("../controllers/CartController");

router.put("/:cartId", updateCartById);
module.exports = router;