const mongoose = require("mongoose");

const { OrderModel } = require("../models/OrderModel");
const { CustomerModel } = require("../models/CustomerModel");

function createOrder(request, response) {
    const order = new OrderModel({
        _id: mongoose.Types.ObjectId(),
        Customer: request.params.customerId,
        OrderDate: request.body.OrderDate,
        RequiredDate: request.body.RequiredDate,
        ShippedDate: request.body.ShippedDate,
        Note: request.body.Note,
        Status: request.body.Status,
        OrderDetail: request.body.OrderDetail,
        TimeCreated: request.body.TimeCreated,
        TimeUpdated: request.body.TimeUpdated,
    });

    order.save()
        // Sau khi tạo review thành công
        .then(function (newOrder) {
            // Lấy courseId từ params URL (Khác với Query URL (sau ?))
            var customerId = request.params.customerId;

            // Gọi hàm CourseModel .findOneAndUpdate truyền vào điều kiện (_id = ?) và thêm _id của review mới tạo vào mảng reviews
            return CustomerModel.findOneAndUpdate({ _id: customerId }, { $push: { Orders: newOrder._id } }, { new: true });
        })
        .then((neworder) => {
            return response.status(200).json({
                message: 'create order success',
                order: neworder
            })
        })
        .catch((error) => {
            return response.status(500).json({
                message: 'create order fail',
                error: error.message
            })
        })
}

function getAllOrder(request, response) {
    OrderModel.find()
        .select("_id Customer OrderDate RequiredDate ShippedDate Note Status TimeCreated TimeUpdated")
        .then((orderList) => {
            return response.status(200).json({
                message: 'load data success',
                order: orderList
            })
        })
        .catch((error) => {
            return response.status(500).json({
                message: 'load data fail',
                error: error.message
            })
        })
}

function getAllOrderOfCustomer(request, response) {
    // Lấy customerId từ params URL (Khác với Query URL (sau ?))
    const customerId = request.params.customerId;

    // Gọi hàm .find để tìm kiếm tất cả order của customer đó            
    OrderModel.find({ Customer: customerId })
        // Nếu thành công trả ra status 200 - Success
        .then((orders) => {
            response.status(200).json({
                success: true,
                Order: orders
            });
        })
        // Xử lý lỗi trả ra 500 - Server Internal Error
        .catch((err) => {
            response.status(500).json({
                success: false,
                message: 'This customer does not exist',
                error: err.message,
            });
        });
}

function getOneOrder(request, response) {
    const orderId = request.params.orderId;

    OrderModel.findById(orderId)
        .then((singleOrder) => {
            response.status(200).json({
                success: true,
                message: `Get data on Order`,
                Order: singleOrder,
            });
        })
        .catch((err) => {
            response.status(500).json({
                success: false,
                message: 'This Order does not exist',
                error: err.message,
            });
        });
}

function updateOrderById(request, response) {
    const orderId = request.params.orderId;

    const updateObj = request.body;
    if (mongoose.Types.ObjectId.isValid(orderId)) {
        OrderModel.findByIdAndUpdate(orderId, updateObj)
            .then((updateObj) => {
                return response.status(200).json({
                    message: 'update data by id success',
                    updateObj: updateObj
                })
            })
            .catch((error) => {
                return response.status(500).json({
                    message: 'update data by id fail',
                    error: error.message
                })
            })
    }
    else {
        // Nếu không phải objectId thì trả ra lỗi 400 - bad request
        response.status(400).json({
            message: "fail",
            error: "order Id is not valid"
        })
    }
}

function deleteOrderById(request, response) {
    const orderId = request.params.orderId;

    if (mongoose.Types.ObjectId.isValid(orderId)) {
        OrderModel.findByIdAndDelete(orderId)
            .then(() => {
                // Lấy courseId từ params URL (Khác với Query URL (sau ?))
                var customerId = request.params.customerId;

                // Gọi hàm CourseModel .findOneAndUpdate truyền vào điều kiện (_id = ?) và thêm _id của review mới tạo vào mảng reviews
                return CustomerModel.findOneAndUpdate({ _id: customerId }, { $pull: { Orders: orderId } }, { new: true });
            })
            .then(() => {
                return response.status(200).json({
                    message: 'delete data by id success',
                })
            })
            .catch((error) => {
                return response.status(500).json({
                    message: 'delete data by id fail',
                    error: error.message
                })
            })
    }
    else {
        // Nếu không phải objectId thì trả ra lỗi 400 - bad request
        response.status(400).json({
            message: "fail",
            error: "cart Id is not valid"
        })
    }
}
module.exports = { createOrder, getAllOrder, getAllOrderOfCustomer, getOneOrder, updateOrderById, deleteOrderById }