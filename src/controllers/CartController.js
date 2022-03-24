const mongoose = require("mongoose");

const { CartModel } = require("../models/CartModel");
const { CustomerModel } = require("../models/CustomerModel");

function createCart(request, response) {
    const cart = new CartModel({
        _id: mongoose.Types.ObjectId(),
        productId: request.params.productId,
        amount: request.body.amount,
        price: request.body.price,
        name: request.body.name,
        imgAvatar: request.body.imgAvatar,
    });

    cart.save()
        // Sau khi tạo review thành công
        .then(function (newCart) {
            // Lấy courseId từ params URL (Khác với Query URL (sau ?))
            var customerId = request.params.customerId;

            // Gọi hàm CourseModel .findOneAndUpdate truyền vào điều kiện (_id = ?) và thêm _id của review mới tạo vào mảng reviews
            return CustomerModel.findOneAndUpdate({ _id: customerId }, { $push: { Carts: newCart._id } }, { new: true });
        })
        // Sau khi update course thành công trả ra status 200 - Success
        .then((updatedCustomer) => {
            return response.status(200).json({
                success: true,
                message: 'New cart created successfully on customer',
                customer: updatedCustomer,
            });
        })
        // Xử lý lỗi trả ra 500 - Server Internal Error
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error.message,
            });
        });
}

function getCartByCustomerId(request, response) {
    // Lấy customerId từ params URL (Khác với Query URL (sau ?))
    const customerId = request.params.customerId;

    // Gọi hàm .findById để tìm kiếm course dựa vào ID
    CustomerModel.findById(customerId)
        // Lấy chi tiết Review dựa vào ánh xạ _id của từng phần tử trong trường reviews
        .populate({ path: 'Carts' })
        // Nếu thành công trả ra status 200 - Success
        .then((singleCourse) => {
            response.status(200).json({
                success: true,
                Carts: singleCourse.Carts
            });
        })
        // Xử lý lỗi trả ra 500 - Server Internal Error
        .catch((err) => {
            response.status(500).json({
                success: false,
                message: 'This course does not exist',
                error: err.message,
            });
        });
}

function updateCartById(request, response) {
    const cartId = request.params.cartId;

    const updateObj = request.body;
    if (mongoose.Types.ObjectId.isValid(cartId)) {
        CartModel.findByIdAndUpdate(cartId, updateObj)
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

function deleteCartById(request, response) {
    const cartId = request.params.cartId;

    if (mongoose.Types.ObjectId.isValid(cartId)) {
        CartModel.findByIdAndDelete(cartId)
            .then(() => {
                // Lấy courseId từ params URL (Khác với Query URL (sau ?))
                var customerId = request.params.customerId;

                // Gọi hàm CourseModel .findOneAndUpdate truyền vào điều kiện (_id = ?) và thêm _id của review mới tạo vào mảng reviews
                return CustomerModel.findOneAndUpdate({ _id: customerId }, { $pull: { Carts: cartId} }, { new: true });
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
module.exports = { createCart, getCartByCustomerId, updateCartById, deleteCartById }