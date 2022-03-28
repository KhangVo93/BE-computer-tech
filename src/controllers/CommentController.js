const mongoose = require("mongoose");

const { CommentModel } = require("../models/CommentModel");
const { ProductModel } = require("../models/ProductModel");

function createComment(request, response) {
    const comment = new CommentModel({
        _id: mongoose.Types.ObjectId(),
        customer: request.params.customerId,
        product: request.params.productId,
        nameCustomer: request.body.nameCustomer,
        text: request.body.text
    });

    comment.save()
        // Sau khi tạo review thành công
        .then(function (newComment) {
            // Lấy courseId từ params URL (Khác với Query URL (sau ?))
            var productId = request.params.productId;

            // Gọi hàm CourseModel .findOneAndUpdate truyền vào điều kiện (_id = ?) và thêm _id của review mới tạo vào mảng reviews
            return ProductModel.findOneAndUpdate({ _id: productId }, { $push: { Comments: newComment._id } }, { new: true });
        })
        // Sau khi update course thành công trả ra status 200 - Success
        .then((updateProduct) => {
            return response.status(200).json({
                success: true,
                message: 'New comment created successfully on product',
                product: updateProduct,
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

function getAllCommentOfProduct(request, response) {
    // Lấy customerId từ params URL (Khác với Query URL (sau ?))
    const productId = request.params.productId;

    // Gọi hàm .find để tìm kiếm tất cả order của customer đó            
    CommentModel.find({ product: productId })
        .sort({ dateCreate: -1 })
        // Nếu thành công trả ra status 200 - Success
        .then((comments) => {
            response.status(200).json({
                success: true,
                Comments: comments
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


module.exports = { createComment, getAllCommentOfProduct }