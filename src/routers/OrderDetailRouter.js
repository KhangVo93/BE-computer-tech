const express = require("express");

const router = express.Router();

const { getOneOrderDetail, deleteOrderDetailById, updateOrderDetailById  } = require("../controllers/OrderDetailController");

router.get("/:orderDetailId", getOneOrderDetail);
router.delete("/:orderDetailId", deleteOrderDetailById);
router.put("/:orderDetailId", updateOrderDetailById);

module.exports = router;