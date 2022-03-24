const express = require("express");

const router = express.Router();

const { createCustomer, getAllCustomer, get_idCustomerByUsername, getCustomerByPhone, get_idCustomerByEmail, getDataForLogin, getDataForCheck, getCustomerById, updateCustomerById, deleteCustomerById } = require("../controllers/CustomerController");

const { createOrder, getAllOrderOfCustomer, deleteOrderById } = require("../controllers/OrderController");
const { createCart, getCartByCustomerId, deleteCartById } = require("../controllers/CartController");

// Thao tác với Order
router.post("/:customerId/orders", createOrder);
router.delete("/:customerId/:orderId/orders", deleteOrderById);
router.get("/:customerId/orders", getAllOrderOfCustomer);

// Thêm mới user
router.post("/", createCustomer);

// Get tất cả user
router.get("/", getAllCustomer);

// Get giỏ hàng by customerId
router.get('/:customerId/cart', getCartByCustomerId)

// Thêm mới giỏ hàng dựa vào customerId và productId
router.post('/:customerId/:productId/cart', createCart);

// Delete cart
router.delete('/:customerId/:cartId/cart', deleteCartById)

// Truyền vào properties lấy ra idUser
router.get("/getIdByEmail/:email", get_idCustomerByEmail);
router.get("/getIdByUsername/:username", get_idCustomerByUsername);
router.get("/getIdByPhone/:phonenumber", getCustomerByPhone);

// check Email 
router.get("/checkdata", getDataForCheck)
router.get("/checkdata/:username", getDataForLogin)

router.get("/:customerId", getCustomerById);
router.put("/:customerId", updateCustomerById);
router.delete("/:customerId", deleteCustomerById);

module.exports = router;