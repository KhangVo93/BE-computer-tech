// import thư viện mongoose
const mongoose = require("mongoose");

// Sử dụng phép gán phá hủy cấu trúc đổi tượng để lấy thuộc tính Schema của mongoose
const { Schema } = mongoose;

// Khởi tạo Courst Schema MongoDB
const commentSchema = new Schema({
    _id: Schema.Types.ObjectId, // trường _id có kiểu dữ liệu objectid, 16 ký tự
    text: {
        type: String
    },
    nameCustomer: {
        type: String
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'customer'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    dateCreate: {
        type: String
    }

})

// Tạo course model
const CommentModel = mongoose.model("comment", commentSchema);

// Export course model
module.exports = { CommentModel };