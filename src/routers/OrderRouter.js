const express = require("express");

const router = express.Router();

const { getAllOrder, getOneOrder, updateOrderById } = require("../controllers/OrderController");

router.get("/", getAllOrder);
router.get("/:orderId", getOneOrder);
router.put("/:orderId", updateOrderById);

const { createOrderDetail, getAllOrderDetailOfOrder } = require("../controllers/OrderDetailController");

router.post("/:orderId/:productId/orderDetail", createOrderDetail);
router.get("/:orderId/orderDetail", getAllOrderDetailOfOrder);

module.exports = router;