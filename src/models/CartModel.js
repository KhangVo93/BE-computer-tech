// import thư viện mongoose
const mongoose = require("mongoose");

// Sử dụng phép gán phá hủy cấu trúc đổi tượng để lấy thuộc tính Schema của mongoose
const { Schema } = mongoose;

// Khởi tạo Courst Schema MongoDB
const cartSchema = new Schema({
    _id: Schema.Types.ObjectId, // trường _id có kiểu dữ liệu objectid, 16 ký tự
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    amount: {
        type: Number,
    },
    price: {
        type: Number,
    },
    name: {
        type: String
    },
    imgAvatar: {
        type: String
    }

})

// Tạo course model
const CartModel = mongoose.model("cart", cartSchema);

// Export course model
module.exports = { CartModel };