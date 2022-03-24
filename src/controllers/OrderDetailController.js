const mongoose = require("mongoose");

const { OrderDetailModel } = require("../models/OrderDetailModel");
const { OrderModel } = require("../models/OrderModel");
const { ProductModel } = require("../models/ProductModel");

function createOrderDetail(request, response) {
    const orderDetail = new OrderDetailModel({
        _id: mongoose.Types.ObjectId(),
        Order: request.params.orderId,
        Product: request.params.productId,
        Name: request.body.Name,
        ImgUrl: request.body.ImgUrl,
        Quantity: request.body.Quantity,
        PriceEach: request.body.PriceEach
    });

    orderDetail.save()
        // Sau khi tạo review thành công
        .then(function (newOrder) {
            // Lấy courseId từ params URL (Khác với Query URL (sau ?))
            var orderId = request.params.orderId;

            // Gọi hàm CourseModel .findOneAndUpdate truyền vào điều kiện (_id = ?) và thêm _id của review mới tạo vào mảng reviews
            return OrderModel.findOneAndUpdate({ _id: orderId }, { $push: { OrderDetail: newOrder._id } }, { new: true });
        })
        .then((newOrderDetail) => {
            return response.status(200).json({
                message: 'create order detail success',
                orderDetail: newOrderDetail
            })
        })
        .catch((error) => {
            return response.status(500).json({
                message: 'create order detail fail',
                error: error.message
            })
        })
}

function getAllOrderDetailOfOrder(request, response) {
    // Lấy customerId từ params URL (Khác với Query URL (sau ?))
    const orderId = request.params.orderId;

    // Gọi hàm .find để tìm kiếm tất cả order của customer đó            
    OrderDetailModel.find({ Order: orderId })
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
                message: 'This order does not exist',
                error: err.message,
            });
        });
}

function getOneOrderDetail(request, response) {
    const orderDetailId = request.params.orderDetailId;

    OrderDetailModel.findById(orderDetailId)
        .then((singleOrder) => {
            response.status(200).json({
                success: true,
                message: `Get data on OrderDetail`,
                Order: singleOrder,
            });
        })
        .catch((err) => {
            response.status(500).json({
                success: false,
                message: 'This Order detail does not exist',
                error: err.message,
            });
        });
}

function updateOrderDetailById(request, response) {
    const orderDetailId = request.params.orderDetailId;

    const updateObj = request.body;
    if (mongoose.Types.ObjectId.isValid(orderDetailId)) {
        OrderDetailModel.findByIdAndUpdate(orderDetailId, updateObj)
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

function deleteOrderDetailById(request, response) {
    const orderDetailId = request.params.orderDetailId;

    if (mongoose.Types.ObjectId.isValid(orderDetailId)) {
        OrderDetailModel.findByIdAndDelete(orderDetailId)
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
            error: "order Id is not valid"
        })
    }
}
module.exports = { createOrderDetail, getAllOrderDetailOfOrder, getOneOrderDetail, updateOrderDetailById, deleteOrderDetailById }