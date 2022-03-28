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
    dateCreate: {
        type: Date,
        default: Date.now
    }

})

// Tạo course model
const CommentModel = mongoose.model("comment", commentSchema);

// Export course model
module.exports = { CommentModel };