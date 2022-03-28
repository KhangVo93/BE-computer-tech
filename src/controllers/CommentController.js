const mongoose = require("mongoose");

const { CommentModel } = require("../models/CommentModel");
const { ProductModel } = require("../models/ProductModel");

function createComment(request, response) {
    const comment = new CommentModel({
        _id: mongoose.Types.ObjectId(),
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

function getCommentsOfProduct(request, response) {
    const productId = request.params.productId;

    if (mongoose.Types.ObjectId.isValid(productId)) {
        ProductModel.findById(productId)
            .select('Comments')
            .then((data) => {
                return response.status(200).json({
                    message: 'load data by id success',
                    customer: data
                })
            })
            .catch((error) => {
                return response.status(500).json({
                    message: 'load data by id fail',
                    error: error.message
                })
            })
    }
    else {
        // Nếu không phải objectId thì trả ra lỗi 400 - bad request
        response.status(400).json({
            message: "fail",
            error: "customer Id is not valid"
        })
    }
}


module.exports = { createComment, getCommentsOfProduct }