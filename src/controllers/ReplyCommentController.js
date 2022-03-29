const mongoose = require("mongoose");

const { CommentModel } = require("../models/CommentModel");
const { ReplyCommentModel } = require("../models/ReplyCommentModel")

function createReplyComment(request, response) {
    const replyComment = new ReplyCommentModel({
        _id: mongoose.Types.ObjectId(),
        nameCustomer: request.body.nameCustomer,
        dateCreate: request.body.dateCreate,
        text: request.body.text
    });

    replyComment.save()
        // Sau khi tạo review thành công
        .then(function (newReplyComment) {
            // Lấy courseId từ params URL (Khác với Query URL (sau ?))
            var commentId = request.params.commentId;

            // Gọi hàm CourseModel .findOneAndUpdate truyền vào điều kiện (_id = ?) và thêm _id của review mới tạo vào mảng reviews
            return CommentModel.findOneAndUpdate({ _id: commentId }, { $push: { replyComments: newReplyComment._id } }, { new: true });
        })
        // Sau khi update course thành công trả ra status 200 - Success
        .then((updateComment) => {
            return response.status(200).json({
                success: true,
                message: 'New reply comment created successfully on comment',
                Comment: updateComment,
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

function getAllReplyCommentOfComment(request, response) {
    // Lấy customerId từ params URL (Khác với Query URL (sau ?))
    const commentId = request.params.commentId;

    // Gọi hàm .find để tìm kiếm tất cả order của customer đó            
    ReplyCommentModel.find({ product: commentId })
        .sort({ dateCreate: -1 })
        // Nếu thành công trả ra status 200 - Success
        .then((replyComments) => {
            response.status(200).json({
                success: true,
                ReplyComments: replyComments
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


module.exports = { createReplyComment, getAllReplyCommentOfComment }