// import thư viện mongoose
const mongoose = require("mongoose");

// Sử dụng phép gán phá hủy cấu trúc đổi tượng để lấy thuộc tính Schema của mongoose
const { Schema } = mongoose;

// Khởi tạo Courst Schema MongoDB
const orderDetailSchema = new Schema({
    _id: Schema.Types.ObjectId, // trường _id có kiểu dữ liệu objectid, 16 ký tự
    Order: {
        type: Schema.Types.ObjectId,
        ref: 'order'
    },
    Product: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    Name: {
        type: String,
    },
    ImgUrl: {
        type: String
    },
    Quantity: {
        type: Number,
        required: true,
    },
    PriceEach: {
        type: Number,
    }
})

// Tạo course model
const OrderDetailModel = mongoose.model("orderDetail", orderDetailSchema);

// Export course model
module.exports = { OrderDetailModel };